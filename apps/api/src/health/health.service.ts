import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export type DatabaseStatus = 'up' | 'down' | 'not_configured';

export interface HealthCheckResult {
  status: 'ok' | 'degraded';
  service: 'lifeproof-api';
  version: string;
  timestamp: string;
  checks: {
    database: DatabaseStatus;
  };
}

@Injectable()
export class HealthService implements OnModuleDestroy {
  private readonly pool: Pool | null;

  constructor(config: ConfigService) {
    const databaseUrl = config.get<string>('DATABASE_URL');
    this.pool = databaseUrl
      ? new Pool({
          connectionString: databaseUrl,
          max: 2,
          connectionTimeoutMillis: 2_000,
        })
      : null;
  }

  async check(): Promise<HealthCheckResult> {
    let database: DatabaseStatus = 'not_configured';

    if (this.pool) {
      try {
        await this.pool.query('select 1');
        database = 'up';
      } catch {
        database = 'down';
      }
    }

    return {
      status: database === 'down' ? 'degraded' : 'ok',
      service: 'lifeproof-api',
      version: process.env.npm_package_version ?? '0.1.0',
      timestamp: new Date().toISOString(),
      checks: { database },
    };
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }
}
