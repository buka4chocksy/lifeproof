import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Pool } from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../app.module';

interface JsonError {
  error: { code: string; message: string; request_id: string };
}

interface JsonWorkspace {
  id: string;
  type: string;
  name: string;
  plan_id: string | null;
  region: string;
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

interface JsonWorkspaceList {
  data: JsonWorkspace[];
  next_cursor: string | null;
  has_more: boolean;
}

describe('Workspaces API (integration)', () => {
  let app: INestApplication;
  let baseUrl: string;
  let admin: Pool;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    const config = app.get(ConfigService);
    const databaseUrl = config.get<string>('DATABASE_URL');
    expect(databaseUrl).toBeTruthy();
    admin = new Pool({ connectionString: databaseUrl });

    await app.listen(0, '127.0.0.1');
    baseUrl = `${await app.getUrl()}/v1`;
  });

  afterAll(async () => {
    await admin?.end();
    await app?.close();
  });

  async function postWorkspace(
    userId: string,
    name: string,
    requestId: string = randomUUID(),
  ): Promise<Response> {
    return fetch(`${baseUrl}/workspaces`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-dev-user-id': userId,
        'x-request-id': requestId,
        'idempotency-key': randomUUID(),
      },
      body: JSON.stringify({ name }),
    });
  }

  async function createWorkspace(userId: string, name: string): Promise<JsonWorkspace> {
    const res = await postWorkspace(userId, name);
    expect(res.status).toBe(201);
    return (await res.json()) as JsonWorkspace;
  }

  it('creates a workspace, emits an audit event, and records owner membership', async () => {
    const userId = randomUUID();
    const name = `family-${randomUUID().slice(0, 8)}`;
    const requestId = `req-${randomUUID().slice(0, 8)}`;

    const res = await postWorkspace(userId, name, requestId);

    expect(res.status).toBe(201);
    expect(res.headers.get('x-request-id')).toBe(requestId);

    const body = (await res.json()) as JsonWorkspace;
    expect(body.id).toBeTruthy();
    expect(body.name).toBe(name);
    expect(body.type).toBe('family');
    expect(body.region).toBe('GB');
    expect(body.status).toBe('active');
    expect(body.plan_id).toBeNull();
    expect(body.owner_id).toBe(userId);
    expect(typeof body.created_at).toBe('string');
    expect(typeof body.updated_at).toBe('string');

    const audit = await admin.query(
      `SELECT action, subject_type, subject_id, actor_id, request_id, workspace_id
       FROM audit_events WHERE workspace_id = $1`,
      [body.id],
    );
    expect(audit.rows).toHaveLength(1);
    expect(audit.rows[0]).toMatchObject({
      action: 'workspace.created',
      subject_type: 'workspace',
      subject_id: body.id,
      actor_id: userId,
      request_id: requestId,
      workspace_id: body.id,
    });

    const members = await admin.query(
      `SELECT role, status FROM workspace_members WHERE workspace_id = $1 AND user_id = $2`,
      [body.id, userId],
    );
    expect(members.rows).toHaveLength(1);
    expect(members.rows[0]).toMatchObject({ role: 'owner', status: 'active' });
  });

  it('returns 409 workspace.name_conflict on a duplicate name for the same owner', async () => {
    const userId = randomUUID();
    const name = `dup-${randomUUID().slice(0, 8)}`;
    await createWorkspace(userId, name);

    const res = await postWorkspace(userId, name);
    expect(res.status).toBe(409);
    expect(res.headers.get('x-request-id')).toBeTruthy();
    const body = (await res.json()) as JsonError;
    expect(body.error.code).toBe('workspace.name_conflict');
  });

  it('returns 200 for the owner and 404 for a non-member', async () => {
    const userId = randomUUID();
    const ws = await createWorkspace(userId, `owner-${randomUUID().slice(0, 8)}`);

    const ownerRes = await fetch(`${baseUrl}/workspaces/${ws.id}`, {
      headers: { 'x-dev-user-id': userId },
    });
    expect(ownerRes.status).toBe(200);
    expect(((await ownerRes.json()) as JsonWorkspace).id).toBe(ws.id);

    const otherRes = await fetch(`${baseUrl}/workspaces/${ws.id}`, {
      headers: { 'x-dev-user-id': randomUUID() },
    });
    expect(otherRes.status).toBe(404);
    expect(((await otherRes.json()) as JsonError).error.code).toBe('workspace.not_found');
  });

  it('lists only the caller workspaces (cross-tenant isolation)', async () => {
    const userA = randomUUID();
    const userB = randomUUID();
    const wsA = await createWorkspace(userA, `a-${randomUUID().slice(0, 8)}`);
    const wsB = await createWorkspace(userB, `b-${randomUUID().slice(0, 8)}`);

    const res = await fetch(`${baseUrl}/workspaces`, { headers: { 'x-dev-user-id': userA } });
    expect(res.status).toBe(200);
    const body = (await res.json()) as JsonWorkspaceList;
    const ids = body.data.map((w) => w.id);
    expect(ids).toContain(wsA.id);
    expect(ids).not.toContain(wsB.id);
  });

  it('paginates with cursor/limit', async () => {
    const userId = randomUUID();
    for (let i = 0; i < 3; i += 1) {
      await createWorkspace(userId, `p-${i}-${randomUUID().slice(0, 8)}`);
    }

    const first = await fetch(`${baseUrl}/workspaces?limit=2`, {
      headers: { 'x-dev-user-id': userId },
    });
    const firstBody = (await first.json()) as JsonWorkspaceList;
    expect(firstBody.data).toHaveLength(2);
    expect(firstBody.has_more).toBe(true);
    expect(firstBody.next_cursor).toBeTruthy();

    const second = await fetch(
      `${baseUrl}/workspaces?limit=2&cursor=${encodeURIComponent(firstBody.next_cursor ?? '')}`,
      { headers: { 'x-dev-user-id': userId } },
    );
    const secondBody = (await second.json()) as JsonWorkspaceList;
    expect(secondBody.data).toHaveLength(1);
    expect(secondBody.has_more).toBe(false);
    expect(secondBody.next_cursor).toBeNull();
  });

  it('rejects invalid input with 422 validation_failed', async () => {
    const userId = randomUUID();

    const badName = await postWorkspace(userId, '');
    expect(badName.status).toBe(422);
    expect(((await badName.json()) as JsonError).error.code).toBe('validation_failed');

    const badLimit = await fetch(`${baseUrl}/workspaces?limit=0`, {
      headers: { 'x-dev-user-id': userId },
    });
    expect(badLimit.status).toBe(422);

    const tooLarge = await fetch(`${baseUrl}/workspaces?limit=101`, {
      headers: { 'x-dev-user-id': userId },
    });
    expect(tooLarge.status).toBe(422);
  });

  it('returns 401 without a valid dev identity', async () => {
    const res = await fetch(`${baseUrl}/workspaces`, { headers: { 'x-dev-user-id': '' } });
    expect(res.status).toBe(401);
    expect(((await res.json()) as JsonError).error.code).toBe('auth.invalid_credentials');
  });
});
