import { describe, expect, it } from 'vitest';
import { identityPrincipalSchema } from './identity';

describe('identityPrincipalSchema', () => {
  it('accepts a resolved principal (Auth0 sub + internal user id)', () => {
    expect(
      identityPrincipalSchema.safeParse({
        sub: 'auth0|1234567890',
        user_id: '00000000-0000-4000-8000-000000000002',
      }).success,
    ).toBe(true);
  });

  it('rejects a principal missing the Auth0 `sub`', () => {
    expect(
      identityPrincipalSchema.safeParse({ user_id: '00000000-0000-4000-8000-000000000002' })
        .success,
    ).toBe(false);
  });

  it('rejects a principal with a non-uuid `user_id`', () => {
    expect(
      identityPrincipalSchema.safeParse({ sub: 'auth0|x', user_id: 'not-a-uuid' }).success,
    ).toBe(false);
  });
});
