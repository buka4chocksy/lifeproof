import type { IdentityPrincipal } from '@lifeproof/contracts';

/**
 * Minimal structural types for the Express request/response objects used across the
 * walking skeleton, so the API does not depend on `@types/express` (not present in
 * this package). NestJS passes the real Express objects; we only read/write these
 * fields.
 */
export interface HttpRequest {
  headers: Record<string, string | string[] | undefined>;
  requestId?: string;
  idempotencyKey?: string;
  principal?: IdentityPrincipal;
}

export interface HttpResponse {
  setHeader(name: string, value: string | number): this;
  status(code: number): this;
  json(body: unknown): unknown;
}
