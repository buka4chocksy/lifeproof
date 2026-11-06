import type { ConfigService } from '@nestjs/config';
import { describe, expect, it, vi } from 'vitest';
import type { DatabaseService } from '../database/database.service';
import { IdentityService } from './identity.service';

function makeConfig(env: string): ConfigService {
  return {
    get: vi.fn((key: string) => (key === 'NODE_ENV' ? env : undefined)),
  } as unknown as ConfigService;
}

function makeDb(): DatabaseService {
  return { query: vi.fn().mockResolvedValue({ rows: [] }) } as unknown as DatabaseService;
}

describe('IdentityService', () => {
  it('resolves a valid dev user id and lazily upserts', async () => {
    const db = makeDb();
    const service = new IdentityService(db, makeConfig('development'));
    const id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    await expect(service.resolveDevPrincipal(id)).resolves.toEqual({
      sub: `dev|${id}`,
      user_id: id,
    });
    expect(db.query).toHaveBeenCalledOnce();
  });

  it('rejects a missing id with 401 auth.invalid_credentials', async () => {
    const service = new IdentityService(makeDb(), makeConfig('development'));
    await expect(service.resolveDevPrincipal(undefined)).rejects.toMatchObject({
      statusCode: 401,
      code: 'auth.invalid_credentials',
    });
  });

  it('rejects a non-uuid id with 401', async () => {
    const service = new IdentityService(makeDb(), makeConfig('development'));
    await expect(service.resolveDevPrincipal('not-a-uuid')).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('fails closed in production regardless of the header', async () => {
    const service = new IdentityService(makeDb(), makeConfig('production'));
    await expect(
      service.resolveDevPrincipal('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'auth.invalid_credentials',
    });
  });
});
