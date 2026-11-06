import { describe, expect, it } from 'vitest';
import {
  createWorkspaceSchema,
  listWorkspacesQuerySchema,
  workspaceListSchema,
  workspaceSchema,
} from './workspace';

const validWorkspace = {
  id: '00000000-0000-4000-8000-000000000001',
  type: 'family',
  name: 'Smith Family',
  plan_id: null,
  region: 'GB',
  status: 'active',
  owner_id: '00000000-0000-4000-8000-000000000002',
  created_at: '2026-11-06T00:00:00.000Z',
  updated_at: '2026-11-06T00:00:00.000Z',
};

describe('workspaceSchema', () => {
  it('accepts a valid workspace payload', () => {
    expect(workspaceSchema.safeParse(validWorkspace).success).toBe(true);
  });

  it('rejects an invalid `type`', () => {
    expect(workspaceSchema.safeParse({ ...validWorkspace, type: 'org' }).success).toBe(false);
  });

  it('rejects an invalid `region`', () => {
    expect(workspaceSchema.safeParse({ ...validWorkspace, region: 'US' }).success).toBe(false);
  });
});

describe('createWorkspaceSchema', () => {
  it('accepts a valid payload and applies defaults', () => {
    const result = createWorkspaceSchema.safeParse({ name: 'Smith Family' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.type).toBe('family');
      expect(result.data.region).toBe('GB');
    }
  });

  it('accepts an explicit type and region', () => {
    expect(
      createWorkspaceSchema.safeParse({ name: 'Acme Ltd', type: 'business', region: 'GB' }).success,
    ).toBe(true);
  });

  it('rejects a payload missing `name`', () => {
    expect(createWorkspaceSchema.safeParse({ type: 'family' }).success).toBe(false);
  });

  it('rejects an invalid `type`', () => {
    expect(createWorkspaceSchema.safeParse({ name: 'x', type: 'org' }).success).toBe(false);
  });

  it('rejects an invalid `region`', () => {
    expect(createWorkspaceSchema.safeParse({ name: 'x', region: 'US' }).success).toBe(false);
  });
});

describe('listWorkspacesQuerySchema', () => {
  it('accepts valid cursor pagination params', () => {
    expect(listWorkspacesQuerySchema.safeParse({ cursor: 'opaque', limit: 100 }).success).toBe(
      true,
    );
  });

  it('applies the default limit when omitted', () => {
    const result = listWorkspacesQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.limit).toBe(20);
    }
  });

  it('rejects a `limit` greater than 100', () => {
    expect(listWorkspacesQuerySchema.safeParse({ limit: 101 }).success).toBe(false);
  });

  it('rejects a non-positive `limit`', () => {
    expect(listWorkspacesQuerySchema.safeParse({ limit: 0 }).success).toBe(false);
  });

  it('rejects a non-integer `limit`', () => {
    expect(listWorkspacesQuerySchema.safeParse({ limit: 1.5 }).success).toBe(false);
  });
});

describe('workspaceListSchema', () => {
  it('accepts a page of workspaces with a nullable cursor', () => {
    expect(
      workspaceListSchema.safeParse({ data: [validWorkspace], next_cursor: null, has_more: false })
        .success,
    ).toBe(true);
  });
});
