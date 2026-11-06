import { randomUUID } from 'node:crypto';
import {
  type CreateWorkspace,
  createWorkspaceSchema,
  type IdentityPrincipal,
  listWorkspacesQuerySchema,
  WORKSPACE_CREATED_EVENT,
  type Workspace,
  type WorkspaceList,
  workspaceCreatedAuditEventSchema,
  workspaceSchema,
} from '@lifeproof/contracts';
import { Injectable } from '@nestjs/common';
import type { PoolClient } from 'pg';
import { ApiException, ErrorCode, isUniqueViolation, validationError } from '../common/api-error';
import { isUuid } from '../common/uuid';
import { DatabaseService } from '../database/database.service';

interface WorkspaceRow {
  id: string;
  type: string;
  name: string;
  plan_id: string | null;
  region: string;
  status: string;
  owner_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}

const WORKSPACE_COLUMNS =
  'id, type, name, plan_id, region, status, owner_id, created_at, updated_at';

function toIso(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return new Date(value).toISOString();
}

function mapWorkspaceRow(row: WorkspaceRow): Workspace {
  return workspaceSchema.parse({
    id: row.id,
    type: row.type,
    name: row.name,
    plan_id: row.plan_id,
    region: row.region,
    status: row.status,
    owner_id: row.owner_id,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  });
}

/**
 * Cursor pagination is keyed on the workspace `id` alone (a stable total order for
 * UUIDs) rather than `(created_at, id)`, because the JS `Date` round-trip through
 * `toISOString()` truncates Postgres timestamps to milliseconds and would re-include
 * the page's last row on the next page. The packet allows `id`-only keying.
 */
function encodeCursor(row: WorkspaceRow): string {
  return Buffer.from(row.id).toString('base64url');
}

function decodeCursor(raw: string): string {
  try {
    const id = Buffer.from(raw, 'base64url').toString('utf8');
    if (!isUuid(id)) {
      throw new Error('invalid cursor');
    }
    return id;
  } catch {
    throw new ApiException(422, ErrorCode.VALIDATION_FAILED, 'Invalid cursor', [
      { field: 'cursor', reason: 'Invalid cursor' },
    ]);
  }
}

async function queryPage(
  client: PoolClient,
  cursor: string | undefined,
  limit: number,
): Promise<WorkspaceRow[]> {
  if (cursor) {
    const result = await client.query(
      `SELECT ${WORKSPACE_COLUMNS} FROM workspaces
       WHERE id > $1::uuid
       ORDER BY id ASC
       LIMIT $2`,
      [cursor, limit],
    );
    return result.rows as WorkspaceRow[];
  }
  const result = await client.query(
    `SELECT ${WORKSPACE_COLUMNS} FROM workspaces
     ORDER BY id ASC
     LIMIT $1`,
    [limit],
  );
  return result.rows as WorkspaceRow[];
}

@Injectable()
export class WorkspacesService {
  constructor(private readonly db: DatabaseService) {}

  async create(principal: IdentityPrincipal, body: unknown, requestId: string): Promise<Workspace> {
    const parsed = createWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
      throw validationError(parsed.error);
    }

    const id = randomUUID();
    const ownerId = principal.user_id;
    const input: CreateWorkspace = parsed.data;

    let row: WorkspaceRow;
    try {
      row = await this.db.withTenant(
        { currentUserId: ownerId, workspaceId: id },
        async (client) => {
          const inserted = await client.query(
            `INSERT INTO workspaces (id, type, name, region, status, owner_id)
             VALUES ($1, $2, $3, $4, 'active', $5)
             RETURNING ${WORKSPACE_COLUMNS}`,
            [id, input.type, input.name, input.region, ownerId],
          );

          await client.query(
            `INSERT INTO workspace_members (workspace_id, user_id, role, status)
             VALUES ($1, $2, 'owner', 'active')`,
            [id, ownerId],
          );

          const event = workspaceCreatedAuditEventSchema.parse({
            action: WORKSPACE_CREATED_EVENT,
            subject_type: 'workspace',
            actor_id: ownerId,
            subject_id: id,
            request_id: requestId,
            workspace_id: id,
          });

          await client.query(
            `INSERT INTO audit_events (actor_id, action, subject_type, subject_id, request_id, workspace_id)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              event.actor_id,
              event.action,
              event.subject_type,
              event.subject_id,
              event.request_id,
              event.workspace_id,
            ],
          );

          return inserted.rows[0] as WorkspaceRow;
        },
      );
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ApiException(
          409,
          ErrorCode.WORKSPACE_NAME_CONFLICT,
          `A workspace named "${input.name}" already exists`,
        );
      }
      throw error;
    }

    return mapWorkspaceRow(row);
  }

  async get(principal: IdentityPrincipal, workspaceId: string): Promise<Workspace> {
    if (!isUuid(workspaceId)) {
      throw new ApiException(404, ErrorCode.WORKSPACE_NOT_FOUND, 'Workspace not found');
    }

    const rows = await this.db.withTenant({ currentUserId: principal.user_id }, async (client) => {
      const result = await client.query(
        `SELECT ${WORKSPACE_COLUMNS} FROM workspaces WHERE id = $1`,
        [workspaceId],
      );
      return result.rows as WorkspaceRow[];
    });

    const row = rows[0];
    if (!row) {
      throw new ApiException(404, ErrorCode.WORKSPACE_NOT_FOUND, 'Workspace not found');
    }
    return mapWorkspaceRow(row);
  }

  async list(principal: IdentityPrincipal, query: Record<string, unknown>): Promise<WorkspaceList> {
    const parsed = listWorkspacesQuerySchema.safeParse(query);
    if (!parsed.success) {
      throw validationError(parsed.error);
    }

    const limit = parsed.data.limit;
    const cursor = parsed.data.cursor ? decodeCursor(parsed.data.cursor) : undefined;

    const rows = await this.db.withTenant({ currentUserId: principal.user_id }, async (client) =>
      queryPage(client, cursor, limit + 1),
    );

    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;
    let nextCursor: string | null = null;
    if (hasMore) {
      const last = page[page.length - 1];
      if (last) {
        nextCursor = encodeCursor(last);
      }
    }

    return {
      data: page.map(mapWorkspaceRow),
      next_cursor: nextCursor,
      has_more: hasMore,
    };
  }
}
