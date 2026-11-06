# LifeProof Portal — Task Board

> Only the PM edits this file.
> Status: `todo` | `ready` | `in-progress` | `review` | `blocked` | `done`
> The PM writes one task packet per task under `docs/plan/tasks/` before dispatch.

## Current milestone

**M1 walking skeleton — DONE** (create a workspace → see it in the UI → emit an audit event; green CI +
branch protection on `main`).

**Next slice — vault item create + seal** (the release-loop "hook"): a category-first item a user can
create, edit (versioned), and seal under step-up auth, scoped by workspace under RLS. Contracts freeze
first (schema → API/design), then implementation. Documents, beneficiaries, conditions, verification,
release, billing, and admin stay deferred until the release loop is proven (release-loop-first rule).

The contract tasks (T-016/T-017/T-018) own only planning artifacts; no implementation until frozen.

## Board

| ID | Task | Owner | Status | Depends on | Task packet |
|---|---|---|---|---|---|
| T-002 | Local Postgres 16 and Redis | pm | done | — | — |
| T-003 | API health contract and env validation | backend | done | — | — |
| T-004 | Web shell and design tokens | frontend | done | — | — |
| T-008 | Execution PRD + Phase 0 decisions | owner | done | — | — |
| T-005 | **Schema contract:** RLS + audit + region default | dba | done | T-002 | `tasks/T-005.md` |
| T-006 | **API contract:** identity, workspace, audit | backend | done | T-003 | `tasks/T-006.md` |
| T-007 | **Design contract:** walking-skeleton flows + a11y | designer | done | T-004 | `tasks/T-007.md` |
| T-014 | RLS: list-by-member SELECT policy | dba | done | T-005 | `tasks/T-014.md` |
| T-010 | Walking skeleton: workspace create/list API | backend | done | T-005, T-006, T-014, T-015 | `tasks/T-010.md` |
| T-015 | NULLIF-harden RLS policies (GUC empty-string) | dba | done | T-014 | `tasks/T-015.md` |
| T-011 | Walking skeleton: workspace dashboard UI | frontend | done | T-006, T-007, T-010 | `tasks/T-011.md` |
| T-001 | Monorepo, quality gates, and CI | pm | done | — | — |
| T-012 | First green CI run + branch protection | pm | done | T-001 | — |
| T-013 | Security baseline review | reviewer | done | T-001, T-003 | `tasks/T-013.md` |
| T-009 | Threat model v1 update | owner | in-progress | T-008 | — |
| T-016 | **Schema contract:** vault items + versions + RLS | dba | in-progress | T-005 | `tasks/T-016.md` |
| T-017 | **API contract:** vault item create/get/seal | backend | ready | T-006 | `tasks/T-017.md` |
| T-018 | **Design contract:** item form + seal flow | designer | ready | T-007 | `tasks/T-018.md` |
| T-019 | Vault item API implementation | backend | todo | T-016, T-017 | — |
| T-020 | Vault item UI (create/seal) | frontend | todo | T-017, T-018, T-019 | — |
| T-021 | Contracts package build + bare imports | backend | done | T-006 | `tasks/T-021.md` |

## Notes

- **T-005, T-006, T-007 are the first three dispatches.** They run in parallel (non-overlapping owned
  paths) or in separate worktrees; never two writers in the same tree.
- **Interface freeze:** T-006 (API) reads T-005's table shape for request/response types; T-007 (design)
  lists the data each screen needs from T-006. T-010/T-011 are blocked until both contracts land.
- **T-008 done** — the owner's execution PRD is approved and Phase 0 decisions are locked (`docs/product/PRD.md`).
- **T-009 narrowed** — the auth provider is now locked to Auth0 (D-P0-03); only the threat-model v1
  update remains owner-owned and does not block the contract tasks.
- **T-001/T-012 closed** — remote `origin` is configured; GitHub Actions run
  [42141619303](https://github.com/buka4chocksy/lifeproof/actions/runs/42141619303) passed on `main`
  (lint, typecheck, 40 tests, build).
- **T-021 done** — D-021 resolved: contracts build to `dist`; API/web use bare imports; API `rootDir`
  is back to `./src`; web type mirror replaced with a re-export. Dev watch verified with 0 errors.
  Branch protection is enabled on `main`: require the `Lint, typecheck, test, build` status check
  (strict), require a PR, admins enforced, no force-push/delete.
- **Vault slice (T-016–T-020):** contract freeze first (T-016 schema → T-017 API / T-018 design), then
  T-019 (API impl) and T-020 (UI). T-016/T-017/T-018 run in parallel (non-overlapping owned paths).

## Rules

- One task in progress per agent.
- A task is not done without evidence: test output, typecheck output, a demo, or a signed decision.
- Do not start a task whose dependencies are not done.
- Scope changes go through the owner and are recorded in `docs/plan/DECISIONS.md`.
- The PM must keep the board small. Split anything that cannot finish in one agent session.
