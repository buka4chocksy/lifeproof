# Handoff — 2026-11-06

## Current milestone

**M1 walking skeleton — PROVEN end-to-end.** Create a workspace → see it in the UI → emit an immutable
audit event, all under RLS. Verified in the browser (0 console errors) with a live API + Postgres. The
release loop is the next milestone, not feature breadth.

## Done (with evidence)

| Item | Evidence |
|---|---|
| Scaffold (T-002/003/004) | pnpm monorepo, Next web, NestJS API, Drizzle DB, Docker Postgres 16 + Redis healthy; `GET /v1/health` → `{"status":"ok",...,"checks":{"database":"up"}}` |
| Schema + RLS + audit (T-005) | Migration `0001_giant_miracleman`; RLS on `workspaces`/`workspace_members`; append-only `audit_events`; `region` default `'GB'`. Reviewer approved (no blockers); follow-ups in `DECISIONS.md` D-017 |
| API contract (T-006) | `docs/api/openapi.yaml` expanded: identity/session (Auth0 `sub`→`users.id`, dev stub behind abstraction, no SMS OTP), `POST/GET /workspaces` + `GET /workspaces/{id}`, `workspace.created` audit event. Zod schemas + 21 Vitest tests in `packages/contracts`. Reviewer approved-with-notes; decisions in `DECISIONS.md` D-018 |
| Design contract (T-007) | `docs/design/DESIGN.md` §9: create-workspace / dashboard / confirmation flows, 6 component specs, full states, WCAG 2.2 AA + axe list; tokens added (`brand.name`, `danger`, `dangerSoft`, `lineStrong`, `shadows.soft`). `pnpm typecheck` + `lint` pass. 4 open questions escalated to owner (§9.10) |
| RLS list policy (T-014) | Migration `0002_workspaces_select_member`: `workspaces_select_member` SELECT policy (owner OR member) — unblocks `GET /workspaces` + owner `INSERT … RETURNING`. Reviewer approved-with-notes; GUC empty-string cast hazard → D-020, follow-up T-015 |
| RLS NULLIF hardening (T-015) | Migration `0003_nullif_harden_rls`: 11 `ALTER POLICY` statements wrap GUC casts in `NULLIF(…, '')::uuid` — empty-string GUC now fails closed (0 rows) instead of raising a cast error. `typecheck` + `lint` pass; empirical fail-closed + regression verified |
| Walking-skeleton API (T-010) | Dev identity (allowlist gate, `X-Dev-User-Id`), tenant-scoped RLS access, `POST/GET /workspaces` + `GET /workspaces/{id}`, `workspace.created` audit emission, `409 name_conflict`. 40 tests (contracts 21 + api 19 incl. live-Postgres RLS integration). Reviewer approved-with-notes; notes + contracts-build gap in `DECISIONS.md` D-021 |
| Walking-skeleton UI (T-011) | Create-workspace form + 11-category empty-state dashboard; new tokens mirrored (`danger`/`dangerSoft`/`lineStrong`); brand externalized (`brand.name`, no hardcoded "LifeProof"). Browser walkthrough verified: create → `/workspaces/{id}?created=1` shows "Your safe is ready" + audit hint + category grid, 0 console errors. Contracts-build follow-up in `DECISIONS.md` D-021 |
| Execution PRD + Phase 0 decisions (T-008) | `docs/product/PRD.md` §2 records D-P0-01…06 with trade-offs; `docs/product/OPEN_QUESTIONS.md` (12 non-blocking items). See "Decisions" below |
| Remote + CI (T-001/T-012) | `origin` → `github.com/buka4chocksy/lifeproof`; GitHub Actions run [42141619303](https://github.com/buka4chocksy/lifeproof/actions/runs/42141619303) passed on `main` — lint, typecheck, 40 tests, build |
| Contracts package (D-021/T-021) | `packages/contracts` builds CommonJS + `.d.ts` to `dist`; API/web use bare `@lifeproof/contracts` imports; API `rootDir` reverted to `./src`, output is `dist/main.js`; web mirror is now a type re-export. `pnpm dev` watch verified with 0 compiler errors; lint/typecheck/test/build pass |

Quality gates pass locally: `lint` (0 diagnostics), `typecheck` (web/api/db/packages), `test` (40 tests),
`build` (API + Next prod). Remote CI passed on `main` in run
[42141619303](https://github.com/buka4chocksy/lifeproof/actions/runs/42141619303).

## In progress

- **T-009 (owner)** — threat-model v1 update (auth provider already decided: Auth0).

## Next three tasks

1. **T-009 (owner)** — finish the threat-model v1 update.
2. **Vault contract freeze (T-016–T-018)** — schema (DBA), API contract (backend), and item form/seal
   flow (designer) in parallel; then T-019/T-020 implementation. Resolve the four open design questions
   in `DESIGN.md` §9.10 as part of T-018.
3. **Security follow-ups (T-013/D-022)** — remove the dev identity stub before shared environments, add
   an `app_user` LOGIN role + FORCE RLS, structured 500 logging, rate limiting, Idempotency-Key dedupe,
   and the hardcoded icon aria-label.

> Note: the walking skeleton is complete — contracts (T-005/006/007), RLS refinements (T-014/015), backend
> (T-010), frontend (T-011), and the security baseline review (T-013, **acceptable to proceed**, no
> blockers) are all `done`. Residual risks + hard gates for the vault→verification→release milestone are
> recorded in `DECISIONS.md` D-022. T-007 left 4 design questions for the owner (§9.10): category list
> source, "safe" vs "workspace" term, "Add" placeholder behaviour, Nigeria gating UX.

## Blockers

None hard. T-010/T-011 are complete, contracts are frozen, and T-001/T-012 are closed by a green
remote CI run.
Four design questions await the owner (see §9.10 in `docs/design/DESIGN.md`): category list source,
user-facing term for "workspace" ("safe"), "Add" placeholder behaviour, and Nigeria gating UX.

## Decisions (this session)

Six Phase 0 decisions locked in `docs/product/PRD.md` §2: UK (England & Wales) now with Nigeria fast-follow
gated behind a proven UK release loop · rebrand now (no "LifeProof" launch) · Auth0 (Okta) auth · KMS-envelope
MVP, client-side encryption in Phase 2 · family tier + in-house concierge · UK LtdCo + separate Continuity Trust.

Remaining open questions: `docs/product/OPEN_QUESTIONS.md` (price points, rebrand name, Auth0 tenant layout,
Trust trustee/jurisdiction, KYC provider, etc.). None block the current milestone.

## Verify

```sh
nvm use
pnpm install
docker compose up -d
pnpm db:migrate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

- API health: <http://localhost:4000/v1/health>
- Web: <http://localhost:3000>
- Local ports offset: PostgreSQL `127.0.0.1:5433`, Redis `127.0.0.1:6381` (see D-015).
