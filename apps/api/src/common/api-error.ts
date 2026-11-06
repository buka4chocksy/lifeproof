import { z } from 'zod';

export interface FieldError {
  field?: string;
  reason: string;
}

/**
 * Error codes for the walking skeleton. `workspace.name_conflict` is the T-010 /
 * D-018 addition to the Appendix B list; `validation_failed` and `bad_request` cover
 * the 422 / 400 envelopes that Appendix B does not name explicitly.
 */
export const ErrorCode = {
  BAD_REQUEST: 'bad_request',
  VALIDATION_FAILED: 'validation_failed',
  AUTH_INVALID_CREDENTIALS: 'auth.invalid_credentials',
  AUTH_FORBIDDEN: 'auth.forbidden',
  WORKSPACE_NOT_FOUND: 'workspace.not_found',
  WORKSPACE_NAME_CONFLICT: 'workspace.name_conflict',
  INTERNAL_ERROR: 'internal_error',
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Domain error carrying the HTTP status and the `ErrorEnvelope` `code`. The global
 * exception filter serialises it to `{ error: { code, message, details, request_id } }`.
 */
export class ApiException extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
    readonly details?: FieldError[],
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

/** Map a Zod validation failure to a 422 `validation_failed` envelope. */
export function validationError(error: z.ZodError): ApiException {
  const details: FieldError[] = error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join('.') : undefined,
    reason: issue.message,
  }));
  return new ApiException(422, ErrorCode.VALIDATION_FAILED, 'Invalid request', details);
}

/** Postgres unique_violation (SQLSTATE 23505) type guard. */
export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && (error as { code?: unknown }).code === '23505'
  );
}
