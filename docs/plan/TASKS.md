# LifeProof Portal — Task Board

> Only the PM edits this file.
> Status: `todo` | `ready` | `in-progress` | `review` | `blocked` | `done`
> The PM writes one task packet per task under `docs/plan/tasks/` before dispatch.

## Current milestone

**M1 walking skeleton:** prove the release-loop foundation with the thinnest slice — create a
workspace, see it in the UI, and emit an immutable audit event. Vault, verification, release, billing,
and admin features are deferred until this loop works (release-loop-first rule).

The first three tasks are **contract freezes** (schema → API/design). They own only planning artifacts;
no application implementation starts until the contracts are frozen.

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
| T-001 | Monorepo, quality gates, and CI | pm | review | — | — |
| T-012 | First green CI run + branch protection | pm | ready | T-001 | — |
| T-013 | Security baseline review | reviewer | done | T-001, T-003 | `tasks/T-013.md` |
| T-009 | Threat model v1 update | owner | in-progress | T-008 | — |

## Notes

- **T-005, T-006, T-007 are the first three dispatches.** They run in parallel (non-overlapping owned
  paths) or in separate worktrees; never two writers in the same tree.
- **Interface freeze:** T-006 (API) reads T-005's table shape for request/response types; T-007 (design)
  lists the data each screen needs from T-006. T-010/T-011 are blocked until both contracts land.
- **T-008 done** — the owner's execution PRD is approved and Phase 0 decisions are locked (`docs/product/PRD.md`).
- **T-009 narrowed** — the auth provider is now locked to Auth0 (D-P0-03); only the threat-model v1
  update remains owner-owned and does not block the contract tasks.
- T-001 remains in `review` until CI runs on the remote (see `docs/handoff/HANDOFF.md`).

## Rules

- One task in progress per agent.
- A task is not done without evidence: test output, typecheck output, a demo, or a signed decision.
- Do not start a task whose dependencies are not done.
- Scope changes go through the owner and are recorded in `docs/plan/DECISIONS.md`.
- The PM must keep the board small. Split anything that cannot finish in one agent session.
