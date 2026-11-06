import { createWorkspaceSchema } from '@lifeproof/contracts';
import { describe, expect, it } from 'vitest';
import { ErrorCode, isUniqueViolation } from '../common/api-error';
import type { DatabaseService } from '../database/database.service';
import { WorkspacesService } from './workspaces.service';

describe('createWorkspaceSchema', () => {
  it('accepts a minimal body and applies defaults', () => {
    expect(createWorkspaceSchema.parse({ name: 'The Smith family' })).toEqual({
      name: 'The Smith family',
      type: 'family',
      region: 'GB',
    });
  });

  it('accepts explicit type and region overrides', () => {
    expect(createWorkspaceSchema.parse({ name: 'x', type: 'business', region: 'NG' })).toEqual({
      name: 'x',
      type: 'business',
      region: 'NG',
    });
  });

  it('rejects an empty name', () => {
    expect(createWorkspaceSchema.safeParse({ name: '' }).success).toBe(false);
  });

  it('rejects a name longer than 200 characters', () => {
    expect(createWorkspaceSchema.safeParse({ name: 'a'.repeat(201) }).success).toBe(false);
  });

  it('rejects unknown type and region values', () => {
    expect(createWorkspaceSchema.safeParse({ name: 'x', type: 'team' }).success).toBe(false);
    expect(createWorkspaceSchema.safeParse({ name: 'x', region: 'US' }).success).toBe(false);
  });
});

describe('name-conflict mapping', () => {
  it('detects a Postgres unique violation (23505)', () => {
    expect(isUniqueViolation({ code: '23505' })).toBe(true);
    expect(isUniqueViolation({ code: '23502' })).toBe(false);
    expect(isUniqueViolation(new Error('boom'))).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
  });

  it('maps a unique violation during create to 409 workspace.name_conflict', async () => {
    const db = {
      withTenant: async () => {
        throw Object.assign(new Error('duplicate key value violates unique constraint'), {
          code: '23505',
        });
      },
    } as unknown as DatabaseService;

    const service = new WorkspacesService(db);
    const principal = { sub: 'dev|u', user_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' };

    await expect(service.create(principal, { name: 'dup' }, 'req-1')).rejects.toMatchObject({
      statusCode: 409,
      code: ErrorCode.WORKSPACE_NAME_CONFLICT,
    });
  });
});
