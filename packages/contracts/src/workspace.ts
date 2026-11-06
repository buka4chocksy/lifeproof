import { z } from 'zod';

/**
 * Workspace (tenant) contract. Field names mirror the frozen `workspaces` table
 * (T-005) exactly — snake_case in JSON.
 */

export const workspaceTypeSchema = z.enum(['personal', 'family', 'business']);

export type WorkspaceType = z.infer<typeof workspaceTypeSchema>;

export const workspaceStatusSchema = z.enum(['active', 'read_only', 'suspended', 'deleted']);

export type WorkspaceStatus = z.infer<typeof workspaceStatusSchema>;

/**
 * Launch jurisdiction (D-014 / D-P0-01): defaults to `GB` (England & Wales);
 * `NG` is accepted but gated behind a proven UK release loop. The DB column is
 * `text` (not an enum) so future jurisdictions are never excluded; the API
 * contract intentionally restricts to these two values for now.
 */
export const workspaceRegionSchema = z.enum(['GB', 'NG']);

export type WorkspaceRegion = z.infer<typeof workspaceRegionSchema>;

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  type: workspaceTypeSchema,
  name: z.string().min(1).max(200),
  // Always present on a `workspaces` row; `null` while billing is deferred.
  plan_id: z.string().nullable(),
  region: workspaceRegionSchema,
  status: workspaceStatusSchema,
  owner_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Workspace = z.infer<typeof workspaceSchema>;

/** Request body for `POST /workspaces`. `type`/`region` default server-side. */
export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(200),
  type: workspaceTypeSchema.optional().default('family'),
  region: workspaceRegionSchema.optional().default('GB'),
});

export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>;

export const DEFAULT_LIST_LIMIT = 20;
export const MAX_LIST_LIMIT = 100;

/** Query params for `GET /workspaces` (cursor-paginated, limit capped at 100). */
export const listWorkspacesQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(MAX_LIST_LIMIT).optional().default(DEFAULT_LIST_LIMIT),
});

export type ListWorkspacesQuery = z.infer<typeof listWorkspacesQuerySchema>;

export const workspaceListSchema = z.object({
  data: z.array(workspaceSchema),
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
});

export type WorkspaceList = z.infer<typeof workspaceListSchema>;
