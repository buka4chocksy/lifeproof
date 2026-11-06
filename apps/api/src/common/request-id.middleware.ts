import { randomUUID } from 'node:crypto';
import type { HttpRequest, HttpResponse } from './http';

/** Matches the OpenAPI `IdempotencyKey` maxLength (128). */
const MAX_HEADER_LENGTH = 128;

function cap(value: string): string {
  return value.length > MAX_HEADER_LENGTH ? value.slice(0, MAX_HEADER_LENGTH) : value;
}

function firstHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0]?.trim() || undefined;
  }
  return value?.trim() || undefined;
}

/**
 * Establishes `X-Request-Id` on every response (echoing the client's value when
 * present, otherwise generating one) and echoes `Idempotency-Key`. The resolved
 * request id is attached to the request so the audit event can record it.
 *
 * Both reflected headers are capped to 128 chars so a maliciously long header
 * cannot be reflected unbounded into the response or `audit_events.request_id`.
 *
 * Idempotency-Key is accepted and echoed only; full 24h storage is a follow-up.
 */
export function requestIdMiddleware(req: HttpRequest, res: HttpResponse, next: () => void): void {
  const requestId = cap(firstHeaderValue(req.headers['x-request-id']) ?? randomUUID());
  const idempotencyKey = firstHeaderValue(req.headers['idempotency-key']);
  const cappedIdempotencyKey = idempotencyKey ? cap(idempotencyKey) : undefined;

  req.requestId = requestId;
  if (cappedIdempotencyKey) {
    req.idempotencyKey = cappedIdempotencyKey;
  }

  res.setHeader('x-request-id', requestId);
  if (cappedIdempotencyKey) {
    res.setHeader('idempotency-key', cappedIdempotencyKey);
  }

  next();
}
