import { Inject, Injectable, type OnModuleDestroy } from '@nestjs/common';
import { Pool, type PoolClient, type QueryResult } from 'pg';

export const PG_POOL = Symbol('PG_POOL');

export interface TenantScope {
  currentUserId: string;
  workspaceId?: string;
}

/**
 * Shared `pg` Pool access for the walking skeleton.
 *
 * The app connects as the `lifeproof` role (a superuser, per the local .env) and
 * activates RLS per transaction via `SET LOCAL ROLE app_user` — a superuser may SET
 * ROLE to the NOLOGIN `app_user`. `users` has no RLS, so the plain `query()` path is
 * used for the dev-identity lazy upsert.
 */
@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly pool: Pool | null) {}

  private requirePool(): Pool {
    if (!this.pool) {
      throw new Error('DATABASE_URL is not configured');
    }
    return this.pool;
  }

  /** Plain (non-RLS) query — used for `users` upsert and health probes. */
  async query(text: string, values?: unknown[]): Promise<QueryResult> {
    return this.requirePool().query(text, values);
  }

  /**
   * Runs `fn` in a transaction scoped under RLS:
   *   BEGIN; SET LOCAL ROLE app_user; set_config('app.current_user_id', …, true);
   *   [set_config('app.workspace_id', …, true)]; …; COMMIT.
   *
   * GUCs are set transaction-locally via `set_config(…, true)` (parameterised, never
   * interpolated). The list/get-one paths set only `current_user_id` so the
   * `workspaces_select_member` policy is the enforcer; create sets both so the owner
   * insert + `INSERT … RETURNING` + audit insert all pass their WITH CHECK policies.
   */
  async withTenant<T>(scope: TenantScope, fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.requirePool().connect();
    try {
      await client.query('BEGIN');
      try {
        await client.query('SET LOCAL ROLE app_user');
        await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [
          scope.currentUserId,
        ]);
        if (scope.workspaceId) {
          await client.query(`SELECT set_config('app.workspace_id', $1, true)`, [
            scope.workspaceId,
          ]);
        }
        const result = await fn(client);
        await client.query('COMMIT');
        return result;
      } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        throw error;
      }
    } finally {
      client.release();
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }
}
