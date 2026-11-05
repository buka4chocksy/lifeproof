# LifeProof Portal — Agent Instructions

## Source of truth

Read these in order before making decisions:

1. `docs/build-plan/00_STRATEGY_KERNEL.md` — the highest authority. If anything conflicts with the kernel, the kernel wins.
2. `docs/build-plan/01_PRD.md` — product requirements and MVP definition.
3. `docs/build-plan/02_ARCHITECTURE.md` — architecture, security, data model, API, infrastructure.
4. `docs/build-plan/03A_EPICS_MVP.md` and `backlog.csv` — MVP epics, stories, acceptance criteria.
5. `docs/build-plan/04_DELIVERY_PLAN.md` — phases, sprints, gates, risks.
6. `docs/product/PRD.md` — the execution PRD maintained by the owner.
7. `docs/plan/TASKS.md`, `docs/plan/DECISIONS.md`, and `docs/handoff/HANDOFF.md` — current delivery state.

`docs/build-plan/` is an approved, read-only planning package. Do not edit it.

## Product non-negotiables

- No plaintext secrets at rest.
- No seed phrases or private keys stored by LifeProof, ever.
- No SMS OTP for vault or release operations.
- No release without identity verification, evidence, and cooling-off.
- No single admin can access document contents or trigger a release. Dual control is required.
- No launch without a completed legal opinion, penetration test, and release runbook.
- No scope expansion before the release loop is proven end-to-end.
- No feature that makes the family journey harder to understand.
- No partnership that compromises beneficiary privacy or auditability.
- No dependence on the company existing forever without a continuity plan.
- The MVP uses KMS envelope encryption. Never claim “zero-knowledge” unless the architecture actually provides it.

## Stack

- Node.js 20.19+, pnpm 8.12+.
- `apps/web`: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3, shadcn/ui + Radix.
- `apps/api`: NestJS 11 modular monolith, TypeScript.
- `db/`: PostgreSQL 16, Drizzle ORM, SQL migrations, Row-Level Security.
- Redis + BullMQ for jobs. S3 + KMS in production; add a local S3-compatible service with the document pipeline.
- OpenAPI 3.1 contract-first. Zod for shared validation.
- Vitest for unit/integration tests; Playwright and axe later.

## Working rules

- Read your assigned task file before editing. The task packet is authoritative for your scope.
- Work on one task ID per session. Do not combine tasks.
- Edit only files inside your owned paths. If you need another file, stop and report to the PM.
- Do not invent endpoints, fields, schema changes, or design decisions. Report contract gaps.
- Frozen contracts: `docs/api/openapi.yaml`, `docs/database/SCHEMA.md`, `docs/design/DESIGN.md`.
- Only the PM edits `docs/plan/TASKS.md` and `docs/plan/DECISIONS.md`. Only the owner edits `docs/product/*`.
- Do not store PII, document contents, secrets, or raw evidence in logs, analytics, errors, task packets, or chat.
- Use synthetic data in development. Never use production data or production credentials.
- Do not push, deploy, or run destructive database operations. Do not add a dependency without PM and human approval.
- High-risk areas — authentication, encryption, verification, release, billing, admin access — require reviewer review and human approval.
- If a requirement conflicts with the strategy kernel, stop and escalate. Do not guess.

## Definition of done

- Acceptance criteria met and evidenced.
- `pnpm typecheck`, `pnpm lint`, and relevant tests pass.
- Contract and documentation updates included.
- Audit/telemetry events defined for sensitive actions.
- UI work meets WCAG 2.2 AA for the affected flow.
- Report: task ID, files changed, commands run, test results, blockers, follow-ups.

## Commands

```sh
nvm use                 # Node 20.19+
pnpm install
cp .env.example .env
docker compose up -d    # PostgreSQL 16 and Redis
pnpm db:migrate
pnpm dev                # API :4000, web :3000
pnpm typecheck
pnpm lint
pnpm test
```

## Current phase

Phase 0/1 foundation. Open decisions that must not be hardcoded:

- Launch jurisdiction and beachhead market.
- Brand/trademark decision (LifeProof is an OtterBox trademark).
- Managed auth provider.
- KMS envelope encryption vs. client-side encryption timing.
- Pricing and concierge economics.
- Legal entity and Continuity Trust structure.
