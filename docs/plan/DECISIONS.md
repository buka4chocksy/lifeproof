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

**Consequences:** vendor dependency and data-residency review.

**Resolution (reconciled with D-P0-03):** the managed provider is **Auth0 (Okta)**. The identity module
wraps Auth0; admin SSO uses a separate Auth0 tenant; no custom auth or custom crypto. The walking
skeleton may use a dev-mode session stub behind the identity abstraction until vendor procurement
completes, but the API contract must name the Auth0 subject (`sub`) mapping now.

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

## D-014 — Launch jurisdiction resolved: UK (England & Wales)

**Status:** accepted (reconciled with D-P0-01)

Launch jurisdiction is **UK (England & Wales)**; Nigeria is a fast-follow gated behind a proven UK
release loop (no Nigeria build before that gate). `workspaces.region` defaults to `'GB'`; `'NG'` remains
a supported value with no build work until gated. The earlier "open" note is superseded by the owner's
locked Phase 0 decision in `docs/product/PRD.md` D-P0-01.

## D-015 — Local service ports are offset

**Status:** accepted

The host already runs PostgreSQL on 5432 and Redis on 6379. Docker Compose binds LifeProof PostgreSQL to
`127.0.0.1:5433` and Redis to `127.0.0.1:6381`. This is local-only; production uses managed endpoints.

## D-016 — Walking skeleton and first-contract freeze order

**Status:** accepted

The next milestone is the **walking skeleton**: create a workspace, see it in the UI, and emit an
immutable audit event. Before any implementation, freeze three contracts in this order of dependency —
schema (DBA) → API (backend) and design (designer) in parallel. Vault, verification, release, billing,
and admin features stay deferred until this loop is proven end-to-end (release-loop-first rule).

**Why:** a trustworthy release is the product; the thinnest slice that proves tenant isolation and
auditability must work before feature breadth.

**Consequences:** T-005/T-006/T-007 are contract-only tasks with no application implementation. The
walking-skeleton implementation (T-010/T-011) starts only after those contracts are frozen.

## D-017 — T-005 review follow-ups (carry-forward)

**Status:** accepted (recorded, not blocking)

T-005 (schema contract) passed reviewer review with no blocking findings. Non-blocking items are
carried forward to the identity/authorization work, not T-005:

1. `users` has no RLS and is granted broad `SELECT/INSERT/UPDATE` to `app_user` — any tenant-scoped
   session can read/update any user row. Mitigated by encrypted `email_ciphertext` + hash lookup, but
   tighten (RLS or a self-scoped policy) when the identity module is built (T-006/identity).
2. Naming drift: `02_ARCHITECTURE.md` §6.1 says `app.current_workspace_id`, while D-002, the T-005
   packet, and migration use `app.workspace_id`. **D-002 governs.** The build-plan is read-only; this is
   a stale reference in the planning package, noted here rather than edited.
3. The app must connect as a concrete LOGIN role that is a member of `app_user` — never as the table
   owner/superuser — or RLS silently no-ops. Record in the runbook before T-010; consider
   `FORCE ROW LEVEL SECURITY` with the admin-elevation task.
4. No committed RLS/append-only regression tests (Drizzle cannot model them). Manual SQL evidence was
   accepted per T-005, but a repeatable verification script should be committed with T-010.
5. `workspaces_update_tenant` does not constrain `owner_id` reassignment within a tenant; acceptable for
   now, revisit with authorization work.

## D-018 — T-006 review findings + contract decisions

**Status:** accepted (recorded, not blocking)

T-006 (API contract) passed reviewer review (approve-with-notes). Notes carried to T-010:

1. **`workspace.name_conflict` error code.** The frozen `workspaces` unique index `(owner_id, name)`
   means duplicate-name create is a normal user action, but Architecture Appendix B has no conflict
   code and the POST contract documents no `409`. **Decision:** add `workspace.name_conflict → 409` and
   document a `409` response on `POST /workspaces` in T-010. Appendix B lives in the read-only
   build-plan, so this decision is the authoritative supplement; the API contract is the enforceable
   surface.
2. **Ownership deviation (acknowledged).** The backend added a `test` script and `vitest ^3.2.7`
   devDependency to `packages/contracts/package.json` (+ `pnpm-lock.yaml`, +3 lines), which is outside
   its owned paths and normally requires PM + human approval. **PM accepts** because `vitest@3.2.7` is
   already a monorepo dependency (`apps/api`), same version, so no new technology/supply-chain surface
   was introduced; it was required to satisfy the "Vitest unit tests" acceptance criterion. Process
   note: the backend should have stopped and asked before editing package files. Flagged to the human
   for transparency.
3. **`region` enum forward-compat.** `Workspace.region` (response) and `create` both restrict to
   `[GB, NG]` while the DB column is `text`. Safe today (API is the sole writer); keep any future
   jurisdiction expansion coupled across API enum + DB value. Acceptable expand/contract.
4. **`GET /workspaces` pagination responses.** Add `422 ValidationFailed` to the list response for
   invalid pagination (limit bounds) in T-010; clarify whether offset-style params should be rejected
   (`.strict()`) or ignored — currently `z.object` strips them silently. Either is defensible; decide
   at T-010 implementation.

## D-019 — Contract gap: missing list-by-member RLS policy (found before T-010)

**Status:** accepted

The frozen `workspaces` RLS (T-005) has only `workspaces_select_tenant` (`id = app.workspace_id`) for
SELECT. The API contract (T-006) requires `GET /workspaces` to "list the caller's workspaces," which
needs a SELECT policy scoped to the owner/member (`owner_id = app.current_user_id` or membership via
`workspace_members`). Without it the list endpoint cannot be implemented under RLS (a backend loop that
sets `app.workspace_id` per workspace would work but is N+1 and wrong to teach).

**Decision:** add a `workspaces_select_member` SELECT policy in a DBA migration (T-014) before T-010. It
also enables `INSERT … RETURNING` for the owner during workspace creation (the owner row satisfies
`owner_id = app.current_user_id`).

## D-020 — T-014 review: GUC empty-string cast hazard (carry to T-010)

**Status:** accepted (recorded, not blocking)

T-014 (list-by-member RLS policy) passed review (approve-with-notes). One operational hazard, confirmed
empirically by the reviewer, must be carried into T-010:

- **`SET LOCAL`/`RESET` of a custom GUC leaves an empty string `''`, not NULL.** So
  `current_setting('app.workspace_id', true)::uuid` (and `app.current_user_id`) raises
  `invalid input syntax for type uuid: ""` on a pooled connection after any prior transaction set and
  reverted the GUC — a hard 500, not a silent zero-row fail-closed. Fail-closed (NULL → zero rows) only
  holds when the GUC was never set in that session.
- **Decision (T-010 acceptance):** set **both** `app.workspace_id` and `app.current_user_id` to real
  UUIDs at the start of every tenant-scoped transaction (including the list endpoint), and never rely on
  `RESET`/`SET LOCAL`-rollback to yield NULL.
- **Follow-up (T-015):** harden all RLS policies to `NULLIF(current_setting('…', true), '')::uuid` so
  empty-string degrades to NULL (fail-closed) instead of a cast error. This deviates from the frozen
  T-005/T-014 packet SQL, so it is a separate DBA change, not silently folded into T-014. Non-blocking
  for T-010 given the rule above; it removes the entire bug class.

## D-021 — T-010 review + contracts-package build gap

**Status:** resolved 2026-11-06 by T-021

**Resolution:** `packages/contracts` now builds to `packages/contracts/dist` (CommonJS + `.d.ts`).
`apps/api` imports `@lifeproof/contracts` by package name, `rootDir` is back to `./src`, and Nest emits
`dist/main.js`. `apps/web` declares the contracts dependency and its `workspace-types.ts` is now a type
re-export, not a duplicated mirror. `pnpm dev`, `typecheck`, `test`, and `build` build contracts first;
CI builds contracts before the quality gates. Dev watch was verified with 0 compiler errors.

T-010 (walking-skeleton API) passed reviewer review (approve-with-notes, no blockers). Notes and
decisions:

- **Fixed during T-010:** dev-identity gate switched from denylist to **allowlist** (`NODE_ENV` must be
  `development`/`test`, else 401 — no `?? 'development'` fallback); `X-Request-Id`/`Idempotency-Key`
  reflected headers capped at 128 chars.
- **Architecture gap (follow-up):** `@lifeproof/contracts` ships only TS source (`main: ./src/index.ts`,
  no `dist`), so a bare `import '@lifeproof/contracts'` typechecks but crashes a plain-Node NestJS app at
  runtime. T-010 therefore used wide `rootDir: "../.."` + **relative** imports
  (`../../../../packages/contracts/src/index`) so the API build compiles contracts into `dist`. The clean
  fix is to make `@lifeproof/contracts` buildable (add a `build` step + `dist` entry), then switch to a
  bare import and revert `rootDir` to `./src`. Deferred (frozen contracts package + no-dep rule).
- **Carry-forward (non-blocking):** (a) `apps/api/package.json` has a now-dead
  `@lifeproof/contracts: workspace:*` dep — remove or make contracts buildable; (b) the wide rootDir
  emits `*.spec.js` into `dist` — exclude specs from `tsconfig.build` (or adopt the contracts build);
  (c) the 500 branch in `error.filter.ts` does not log the exception — add a structured logger (no PII);
  (d) dev-stub arbitrary-UUID impersonation is inherent to the approved dev stub — remove before any
  shared/staging environment; (e) root `biome.json` gained `unsafeParameterDecoratorsEnabled` (needed for
  NestJS parameter decorators) — PM-applied platform config, recorded here for traceability.
- **T-011 follow-ups:** the web app mirrors `Workspace`/`WorkspaceList`/`ErrorEnvelope` types in
  `apps/web/src/lib/workspace-types.ts` because `@lifeproof/contracts` is not a dependency of `apps/web`
  (same root cause — the contracts package ships only TS source). The consolidated fix (buildable
  contracts → bare import in both `apps/api` and `apps/web`) resolves this and the API's relative-import
  hack together. Minor: `apps/web/src/app/icon.svg` still has an `aria-label="LifeProof"` (favicon asset;
  swap to `brand.name`/drop the label during the same cleanup).

## D-022 — Security baseline review (T-013): verdict + gates

**Status:** accepted — baseline acceptable to proceed

T-013 (holistic security review of the walking skeleton) returned **no blocking findings**. Tenant
isolation (RLS), dev-identity allowlist gating, audit immutability, secret/PII hygiene, error handling,
and KMS-envelope framing all hold; kernel non-negotiables that apply at this stage are met.

**Residual risks carried into the next milestone (non-blocking):** (1) dev-stub arbitrary-UUID
impersonation — must be removed (Auth0 swap, D-003) before any shared/staging env; (2) `users` table
un-RLS'd with a broad `app_user` grant — tighten with identity work (D-017 §1); (3) app connects as
superuser `lifeproof` and relies on `SET LOCAL ROLE app_user` — add a concrete `app_user`-member LOGIN
role + `FORCE ROW LEVEL SECURITY` (D-017 §3); (4) unlogged 500s (D-021 c); (5) no rate limiting
(architecture §12.3); (6) Idempotency-Key not stored/deduped; (7) `icon.svg` hardcodes
`aria-label="LifeProof"`.

**Deferred, hard-gate the vault→verification→release milestone:** document encryption (KMS envelope,
D-004), identity verification/evidence/cooling-off, release dual control, prohibited-secret detection
(US-033), and the Continuity Trust plan. None can be asserted from the walking skeleton.
