# LifeProof Portal — Task Board

> Only the PM edits this file.
> Status: `todo` | `ready` | `in-progress` | `review` | `blocked` | `done`
> The PM writes one task packet per task under `docs/plan/tasks/` before dispatch.

## Current milestone

**M0/M1 foundation:** prove the scaffold, publish the first contracts, and build one walking skeleton
(create a workspace, see it in the UI, prove the audit event).

## Board

| ID | Task | Owner | Status | Depends on | Task packet |
|---|---|---|---|---|---|
| T-001 | Monorepo, quality gates, and CI | pm | review | — | — |
| T-002 | Local Postgres 16 and Redis | pm | done | — | — |
| T-003 | API health contract and env validation | backend | done | — | — |
| T-004 | Web shell and design tokens | frontend | done | — | — |
| T-005 | Baseline schema + RLS + audit tables | dba | ready | T-001 | — |
| T-006 | OpenAPI baseline: health, auth, workspace | backend | ready | T-003 | — |
| T-007 | Design foundation: flows, tokens, accessibility | designer | ready | T-004 | — |
| T-008 | Execution PRD + Phase 0 decisions | owner | ready | — | — |
| T-009 | Auth provider decision + threat model update | owner | blocked | T-008 | — |
| T-010 | Walking skeleton: workspace create/list API | backend | todo | T-005, T-006 | — |
| T-011 | Walking skeleton: workspace dashboard UI | frontend | todo | T-006, T-007, T-010 | — |
| T-012 | First green CI run + branch protection | pm | ready | T-001 | — |
| T-013 | Security baseline review | reviewer | ready | T-001, T-003 | — |

> Scaffold verification is recorded in [`../handoff/HANDOFF.md`](../handoff/HANDOFF.md).
> T-002–T-004 were completed by the scaffold builder; the PM should confirm the evidence before
> closing them permanently. T-001 remains in review until CI runs on the remote.

## Rules

- One task in progress per agent.
- A task is not done without evidence: test output, typecheck output, a demo, or a signed decision.
- Do not start a task whose dependencies are not done.
- Scope changes go through the owner and are recorded in `docs/plan/DECISIONS.md`.
- The PM must keep the board small. Split anything that cannot finish in one agent session.
