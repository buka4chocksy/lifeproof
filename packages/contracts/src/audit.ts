import { z } from 'zod';

/**
 * Append-only audit ledger contract (mirrors the `audit_events` table, T-005).
 *
 * Audit writes are append-only: the DB role is granted SELECT + INSERT only,
 * and a trigger denies UPDATE/DELETE/TRUNCATE. Audit content is NEVER returned
 * by the API; this schema documents the shape the outbox emits.
 */
export const auditEventSchema = z.object({
  id: z.string().uuid(),
  actor_id: z.string().uuid().nullable(),
  action: z.string().min(1),
  subject_type: z.string().nullable(),
  subject_id: z.string().nullable(),
  request_id: z.string().nullable(),
  ip_hash: z.string().nullable(),
  before_hash: z.string().nullable(),
  after_hash: z.string().nullable(),
  prev_hash: z.string().nullable(),
  hash: z.string().nullable(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

export type AuditEvent = z.infer<typeof auditEventSchema>;

export const WORKSPACE_CREATED_EVENT = 'workspace.created' as const;

/**
 * The `workspace.created` domain event (outbox payload). `subject_type` is
 * `workspace` and `subject_id` is the new workspace id. `actor_id` is the
 * workspace owner; `request_id` is the `X-Request-Id` of the create request.
 */
export const workspaceCreatedAuditEventSchema = z.object({
  action: z.literal(WORKSPACE_CREATED_EVENT),
  subject_type: z.literal('workspace'),
  actor_id: z.string().uuid(),
  subject_id: z.string().uuid(),
  request_id: z.string().min(1),
  workspace_id: z.string().uuid(),
});

export type WorkspaceCreatedAuditEvent = z.infer<typeof workspaceCreatedAuditEventSchema>;
