# Database workspace

This package owns the PostgreSQL schema, Drizzle configuration, and SQL migrations.

## Local setup

```sh
docker compose up -d postgres
pnpm db:generate   # generate SQL from src/schema.ts
pnpm db:migrate    # apply migrations
pnpm db:studio     # inspect the database
```

## Rules

- PostgreSQL 16 is the target. Local Docker uses `postgres:16-alpine`.
- Every tenant-owned table carries `workspace_id`.
- RLS is required on tenant tables. Application transactions must set
  `app.workspace_id` and `app.current_user_id`.
- Migrations are expand/contract and reversible. Destructive changes require explicit approval.
- Never store plaintext secrets, seed phrases, or private keys.
- Seeds contain synthetic data only.
- The baseline tables in `src/schema.ts` are a starting point. The DBA owns the next migration:
  RLS policies, encrypted PII columns, audit events, and the verification/release tables.
