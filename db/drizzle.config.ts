import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '../.env' });

const databaseUrl =
  process.env.DATABASE_URL ?? 'postgres://lifeproof:lifeproof@127.0.0.1:5433/lifeproof';

export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});
