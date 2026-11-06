import { describe, expect, it } from 'vitest';
import { auditEventSchema, workspaceCreatedAuditEventSchema } from './audit';

const workspaceId = '00000000-0000-4000-8000-000000000001';
const ownerId = '00000000-0000-4000-8000-000000000002';

describe('auditEventSchema', () => {
  it('accepts a full audit record', () => {
    expect(
      auditEventSchema.safeParse({
        id: '00000000-0000-4000-8000-000000000003',
        actor_id: ownerId,
        action: 'workspace.created',
        subject_type: 'workspace',
        subject_id: workspaceId,
        request_id: 'req_123',
        ip_hash: null,
        before_hash: null,
        after_hash: null,
        prev_hash: null,
        hash: null,
        workspace_id: workspaceId,
        created_at: '2026-11-06T00:00:00.000Z',
      }).success,
    ).toBe(true);
  });
});

describe('workspaceCreatedAuditEventSchema', () => {
  it('accepts a workspace.created event with the required fields', () => {
    expect(
      workspaceCreatedAuditEventSchema.safeParse({
        action: 'workspace.created',
        subject_type: 'workspace',
        actor_id: ownerId,
        subject_id: workspaceId,
        request_id: 'req_123',
        workspace_id: workspaceId,
      }).success,
    ).toBe(true);
  });

  it('rejects an event with a different action', () => {
    expect(
      workspaceCreatedAuditEventSchema.safeParse({
        action: 'workspace.deleted',
        subject_type: 'workspace',
        actor_id: ownerId,
        subject_id: workspaceId,
        request_id: 'req_123',
        workspace_id: workspaceId,
      }).success,
    ).toBe(false);
  });

  it('rejects an event missing `request_id`', () => {
    expect(
      workspaceCreatedAuditEventSchema.safeParse({
        action: 'workspace.created',
        subject_type: 'workspace',
        actor_id: ownerId,
        subject_id: workspaceId,
        workspace_id: workspaceId,
      }).success,
    ).toBe(false);
  });
});
