import { type IdentityPrincipal, identityPrincipalSchema } from '@lifeproof/contracts';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiException, ErrorCode } from '../common/api-error';
import { isUuid } from '../common/uuid';
import { DatabaseService } from '../database/database.service';

/**
 * Dev-mode identity (walking skeleton only). Resolves `IdentityPrincipal { sub,
 * user_id }` from an `X-Dev-User-Id: <uuid>` header, gated to
 * `NODE_ENV ∈ {development, test}`. In production it always fails closed with
 * `401 auth.invalid_credentials` (no Auth0 integration yet).
 *
 * The dev user is lazily upserted with synthetic `email_ciphertext`/`email_hash`
 * values (no real PII, no plaintext email). `users` has no RLS, so the plain
 * connection is used.
 */
@Injectable()
export class IdentityService {
  constructor(
    private readonly db: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  async resolveDevPrincipal(rawUserId: string | undefined): Promise<IdentityPrincipal> {
    const env = this.config.get<string>('NODE_ENV');
    if (env !== 'development' && env !== 'test') {
      throw new ApiException(
        401,
        ErrorCode.AUTH_INVALID_CREDENTIALS,
        'Development identity is disabled in production',
      );
    }

    if (!isUuid(rawUserId)) {
      throw new ApiException(
        401,
        ErrorCode.AUTH_INVALID_CREDENTIALS,
        'Missing or invalid X-Dev-User-Id header',
      );
    }

    await this.ensureDevUser(rawUserId);

    return identityPrincipalSchema.parse({ sub: `dev|${rawUserId}`, user_id: rawUserId });
  }

  private async ensureDevUser(userId: string): Promise<void> {
    await this.db.query(
      `INSERT INTO users (id, email_ciphertext, email_hash, name, locale, status)
       VALUES ($1, $2, $3, $4, 'en', 'active')
       ON CONFLICT (id) DO NOTHING`,
      [userId, `dev-ciphertext-${userId}`, `dev-hash-${userId}`, 'Synthetic Dev User'],
    );
  }
}
