import type { ApiFieldError, ErrorEnvelope, Workspace, WorkspaceList } from './workspace-types';

export type { ApiFieldError, Workspace, WorkspaceList } from './workspace-types';

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

/**
 * Dev-only synthetic identity (D-021). The API resolves `X-Dev-User-Id` only when
 * `NODE_ENV` is `development` or `test`; in production it fails closed with 401.
 * This is a non-secret placeholder UUID, safe to expose to the browser. Set
 * `NEXT_PUBLIC_DEV_USER_ID` to use a different synthetic dev user.
 */
export const devUserId =
  process.env.NEXT_PUBLIC_DEV_USER_ID ?? '11111111-1111-4111-8111-111111111111';

const NETWORK_ERROR_STATUS = 0;

interface ApiErrorOptions {
  status: number;
  code: string;
  message: string;
  requestId: string | null;
  details?: ApiFieldError[];
}

/** Typed failure carrying the frozen `ErrorEnvelope` fields the UI must show. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId: string | null;
  readonly details: ApiFieldError[];

  constructor({ status, code, message, requestId, details = [] }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
    this.details = details;
  }

  get isUnauthorized(): boolean {
    return this.status === 401 || this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isNetworkError(): boolean {
    return this.status === NETWORK_ERROR_STATUS;
  }
}

interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
  /** Sent as `Idempotency-Key`. Only `POST /workspaces` requires it. */
  idempotencyKey?: string;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { headers, idempotencyKey, ...init } = options;
  const requestId = crypto.randomUUID();

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      cache: init.cache ?? 'no-store',
      headers: {
        Accept: 'application/json',
        'X-Dev-User-Id': devUserId,
        'X-Request-Id': requestId,
        ...(typeof init.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
        ...headers,
      },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    throw new ApiError({
      status: NETWORK_ERROR_STATUS,
      code: 'network_error',
      message: 'The service could not be reached.',
      requestId,
    });
  }

  const payload = await readJson(response);

  if (!response.ok) {
    const envelope = payload as ErrorEnvelope | null;
    const body = envelope?.error;
    throw new ApiError({
      status: response.status,
      code: body?.code ?? 'internal_error',
      message: body?.message ?? 'The request failed.',
      requestId: body?.request_id ?? response.headers.get('x-request-id') ?? requestId,
      details: body?.details ?? [],
    });
  }

  return payload as T;
}

export interface ApiHealth {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  timestamp: string;
  checks: {
    database: 'up' | 'down' | 'not_configured';
  };
}

export async function getApiHealth(): Promise<ApiHealth> {
  const response = await fetch(`${apiBaseUrl}/health`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`API health check failed with status ${response.status}`);
  }

  return (await response.json()) as ApiHealth;
}

/** `WorkspaceCreate` body. `type`/`region` default server-side to family/GB. */
export interface CreateWorkspaceInput {
  name: string;
  type?: Workspace['type'];
  region?: Workspace['region'];
}

export interface CreateWorkspaceOptions {
  /**
   * Client-generated key, reused only when retrying the identical submission
   * attempt (design §9.1). The form owns key lifetime.
   */
  idempotencyKey: string;
  signal?: AbortSignal;
}

export function createWorkspace(
  input: CreateWorkspaceInput,
  { idempotencyKey, signal }: CreateWorkspaceOptions,
): Promise<Workspace> {
  return request<Workspace>('/workspaces', {
    method: 'POST',
    body: JSON.stringify(input),
    idempotencyKey,
    signal,
  });
}

export function getWorkspace(workspaceId: string, options: { signal?: AbortSignal } = {}) {
  return request<Workspace>(`/workspaces/${encodeURIComponent(workspaceId)}`, {
    signal: options.signal,
  });
}

export interface ListWorkspacesParams {
  cursor?: string;
  limit?: number;
}

export function listWorkspaces(
  params: ListWorkspacesParams = {},
  options: { signal?: AbortSignal } = {},
): Promise<WorkspaceList> {
  const query = new URLSearchParams();
  if (params.cursor) {
    query.set('cursor', params.cursor);
  }
  if (params.limit !== undefined) {
    query.set('limit', String(params.limit));
  }
  const search = query.toString();

  return request<WorkspaceList>(`/workspaces${search ? `?${search}` : ''}`, {
    signal: options.signal,
  });
}
