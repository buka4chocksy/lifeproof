import { z } from 'zod';

/**
 * Identity/session model (D-003 / D-P0-03).
 *
 * `Authorization: Bearer <token>` carries an Auth0-issued access token. The
 * identity module verifies the token and maps the Auth0 `sub` claim to the
 * internal `users.id` (exposed here as `user_id`). The web client may instead
 * authenticate via the `lifeproof_session` HttpOnly cookie.
 *
 * For the walking skeleton only, a dev-mode session stub is permitted. It MUST
 * live behind the identity module abstraction and resolve to this same shape —
 * controllers never bypass it. No SMS OTP is used anywhere (PRD §6).
 */
export const identityPrincipalSchema = z.object({
  sub: z.string().min(1),
  user_id: z.string().uuid(),
});

export type IdentityPrincipal = z.infer<typeof identityPrincipalSchema>;
