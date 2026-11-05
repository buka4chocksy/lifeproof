# LifeProof Portal

LifeProof is a verified-release infrastructure company with a family-facing vault. The vault is the hook; the release is the product; verification and legal acceptance are the moat.

This repository is the Phase 1 MVP monorepo. It was scaffolded from the approved build plan in [`docs/build-plan/`](./docs/build-plan/), which contains the strategy kernel, PRD, architecture, epics, delivery plan, and business plan.

> **Current status:** foundation scaffold. Product discovery, launch-market selection, and the first contracts are still open. Do not treat the UI as a finished product.

## Stack

| Layer | Choice |
|---|---|
| Web | Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3 |
| API | NestJS 11 modular monolith, TypeScript |
| Database | PostgreSQL 16, Drizzle ORM, SQL migrations, RLS |
| Cache/jobs | Redis, BullMQ (wired in a later task) |
| Storage | S3 + KMS in production; a local S3-compatible service is added with the document pipeline |
| Contracts | OpenAPI 3.1, Zod |
| Tests | Vitest; Playwright and axe in later tasks |

## Quickstart

Prerequisites: Node 20.19+, pnpm 8.12+, Docker Desktop.

```sh
nvm use
pnpm install
cp .env.example .env
docker compose up -d
pnpm db:migrate
pnpm dev
```

- Web: <http://localhost:3000>
- API health: <http://localhost:4000/v1/health>
- Local PostgreSQL: `127.0.0.1:5433`; local Redis: `127.0.0.1:6381`. The ports are offset because the
  host may already run PostgreSQL on 5432 and Redis on 6379.

If Docker is not available, start a PostgreSQL 16 instance locally and update `DATABASE_URL` in `.env`.

## Workspace layout

```text
apps/
  api/                 NestJS API
  web/                 Next.js web app
packages/
  contracts/           Shared Zod schemas and API types
  design-tokens/       Design tokens
  ui/                  Shared React components
db/                    Drizzle schema and SQL migrations
docs/
  build-plan/          Approved source planning package (read-only)
  product/             Execution PRD and roadmap
  plan/                Task board, decisions, task packets
  design/              UX/UI specs
  database/            Schema documentation
  api/                 OpenAPI contract
  handoff/             End-of-session state
.opencode/
  agents/              Owner, PM, designer, DBA, backend, frontend, reviewer
  commands/            /kickoff, /plan, /next, /status, /review, /handoff
```

## Agent team

This repo is designed to be developed by a small agent team with separated ownership:

- **owner** — product scope and acceptance; never writes code.
- **pm** — delivery orchestration, task board, integration, quality gates; never writes application code.
- **designer** — UX flows, visual system, component specs, design review.
- **dba** — schema, migrations, RLS, seeds, data documentation.
- **backend** — NestJS API, OpenAPI contract, backend tests.
- **frontend** — Next.js app, UI states, accessibility, frontend tests.
- **reviewer** — read-only security, quality, contract, and ownership review.

Start with the owner, then move to the PM:

```text
opencode
/agents        → owner
/kickoff
```

Then start a fresh session for delivery:

```text
/new
/agents        → pm
/plan
```

After that, the loop is `/next`, `/review`, `/handoff`.

## Security and data rules

- Never store plaintext secrets, seed phrases, or private keys.
- Never use production data or production credentials in development.
- No SMS OTP for vault or release operations.
- No release without identity verification, evidence, and cooling-off.
- No single admin can access document contents or trigger a release.
- The MVP uses KMS envelope encryption; it is not zero-knowledge.

See [`AGENTS.md`](./AGENTS.md) for the complete rules and [`docs/build-plan/00_STRATEGY_KERNEL.md`](./docs/build-plan/00_STRATEGY_KERNEL.md) for the authoritative strategy.
