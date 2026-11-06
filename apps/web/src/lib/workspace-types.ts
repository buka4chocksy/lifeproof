/**
 * Local mirror of the frozen workspace contract
 * (`packages/contracts/src/workspace.ts`, `docs/api/openapi.yaml`).
 *
 * `apps/web` does not declare `@lifeproof/contracts` as a dependency yet, so it
 * cannot import the shared types (adding a dependency needs PM approval). Keep
 * this file byte-for-byte aligned with the frozen shapes; do not add fields.
 */
export type WorkspaceType = 'personal' | 'family' | 'business';

export type WorkspaceStatus = 'active' | 'read_only' | 'suspended' | 'deleted';

export type WorkspaceRegion = 'GB' | 'NG';

export interface Workspace {
  id: string;
  type: WorkspaceType;
  name: string;
  plan_id: string | null;
  region: WorkspaceRegion;
  status: WorkspaceStatus;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceList {
  data: Workspace[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface ApiFieldError {
  field?: string;
  reason: string;
}

export interface ErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: ApiFieldError[];
    request_id: string;
  };
}
