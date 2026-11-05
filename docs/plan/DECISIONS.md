# LifeProof Portal — Decisions

Architecture and delivery decisions. The PM owns this file. Each entry records context, decision,
alternatives, and consequences. The strategy kernel wins over every decision.

## D-001 — Modular monolith, not microservices

**Status:** accepted

Use a NestJS modular monolith with strong domain boundaries. Modules communicate through application
services and domain events, not direct table access.

**Why:** speed for a small team, strong boundaries, one deployable.

**Consequences:** extract services only when scale or security requires it. Keep module boundaries
honest so extraction remains possible.

## D-002 — PostgreSQL with row-level security

**Status:** accepted

Use PostgreSQL 16 with `workspace_id` on every tenant-owned table and RLS policies. Application
transactions set `app.workspace_id` and `app.current_user_id`.

**Why:** defense in depth for tenant isolation; ACID; JSONB; full-text search.

**Consequences:** every query path must set session variables correctly; RLS must be tested, not assumed.

## D-003 — Managed authentication behind an abstraction

**Status:** accepted

Buy authentication (passkeys/WebAuthn, TOTP, email verification, session management) from a managed
provider and wrap it in an internal identity module.

**Why:** custom auth and custom cryptography are unacceptable security risks.

**Consequences:** vendor dependency and data-residency review. The provider is an open Phase 0 decision.

## D-004 — KMS envelope encryption for MVP

**Status:** accepted

Each document gets a random data key; the document is encrypted with AES-256-GCM; the data key is
wrapped by KMS. Sensitive PII fields are encrypted separately.

**Why:** simple, auditable, low operational risk.

**Consequences:** the MVP is not zero-knowledge. Never use that term in product or partner claims.
Client-side encryption is a Phase 2 high-security tier.

## D-005 — S3-compatible object storage

**Status:** accepted

Use S3 with SSE-KMS in production. Presigned upload/download URLs are short-lived. No content
indexing; metadata search only. Local S3-compatible storage is deferred to the document-pipeline task
rather than faked with a non-production adapter.

## D-006 — Manual verification and release for MVP

**Status:** accepted

Ops reviews every verification case. No automated release. A confidence score is advisory only.

**Why:** prove the process before automating it.

**Consequences:** SLAs, runbooks, staffing, and an ops console are product requirements, not support
afterthoughts. Dual approval and cooling-off are mandatory.

## D-007 — Never store seed phrases or private keys

**Status:** accepted

Crypto continuity is a Phase 2 partner-led module. LifeProof stores inventory and instructions, not
secrets. Prohibited-secret detection is a P0 control.

## D-008 — OpenAPI 3.1 contract-first

**Status:** accepted

The API contract is written before or with implementation. Breaking changes require a new version and
a deprecation window. Web and partner clients consume the contract; they do not invent endpoints.

## D-009 — Separate admin surface

**Status:** accepted, implementation deferred

Admin authentication and the ops console live on a separate domain with separate sessions, hardware-key
MFA, and a 15-minute idle timeout. Do not put admin routes behind customer sessions.

## D-010 — ECS Fargate over Kubernetes

**Status:** accepted for production

Use ECS Fargate, RDS, ElastiCache, S3, SQS/EventBridge, KMS, and Terraform. Kubernetes is unnecessary
complexity for the MVP.

## D-011 — Continuity Trust and open recovery are Phase 1–2 trust work

**Status:** accepted

The promise must survive the company. Plan the Continuity Trust, escrow material, source escrow, and
open recovery client. Do not make company survival the single point of failure.

## D-012 — Scaffold stack

**Status:** accepted

Next.js 15 App Router + React 19 + TypeScript + Tailwind 3; NestJS 11; PostgreSQL 16; Drizzle ORM +
SQL migrations; pnpm workspaces; Vitest; Biome. Local services run in Docker Compose.

## D-013 — Local development data is synthetic

**Status:** accepted

No production data or production credentials in development. Seeds are synthetic. Evidence and
documents used in tests are fake.

## D-014 — Launch jurisdiction is not yet chosen

**Status:** open

Do not hardcode UK, Nigeria, or any other jurisdiction into schema defaults, copy, pricing, or legal
flows until the owner records the Phase 0 decision. The `workspaces.region` column is required but has
no default.

## D-015 — Local service ports are offset

**Status:** accepted

The host already runs PostgreSQL on 5432 and Redis on 6379. Docker Compose binds LifeProof PostgreSQL to
`127.0.0.1:5433` and Redis to `127.0.0.1:6381`. This is local-only; production uses managed endpoints.
