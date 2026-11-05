# LifeProof Portal — Documentation

This folder is the delivery workspace. The approved planning package is copied into
[`build-plan/`](./build-plan/) and is read-only.

## Source of truth

| Document | Owner | Purpose |
|---|---|---|
| [`build-plan/00_STRATEGY_KERNEL.md`](./build-plan/00_STRATEGY_KERNEL.md) | Founders | Highest authority. If anything conflicts, the kernel wins. |
| [`build-plan/01_PRD.md`](./build-plan/01_PRD.md) | Product | Full product requirements and MVP definition. |
| [`build-plan/02_ARCHITECTURE.md`](./build-plan/02_ARCHITECTURE.md) | Engineering | Architecture, security, data model, API, infrastructure. |
| [`build-plan/03A_EPICS_MVP.md`](./build-plan/03A_EPICS_MVP.md) | Delivery | MVP epics and user stories. |
| [`build-plan/04_DELIVERY_PLAN.md`](./build-plan/04_DELIVERY_PLAN.md) | Delivery | Phases, sprints, gates, risks. |
| [`build-plan/05_BUSINESS_GTM_OPERATIONS.md`](./build-plan/05_BUSINESS_GTM_OPERATIONS.md) | Founders | Business model, GTM, legal, operations. |
| [`product/PRD.md`](./product/PRD.md) | owner | Execution PRD derived from the approved plan. |
| [`plan/TASKS.md`](./plan/TASKS.md) | pm | The only live task board. |
| [`plan/DECISIONS.md`](./plan/DECISIONS.md) | pm | Architecture and delivery decisions. |
| [`design/DESIGN.md`](./design/DESIGN.md) | designer | UX flows, visual system, component specs. |
| [`database/SCHEMA.md`](./database/SCHEMA.md) | dba | Data model, RLS, retention, migration rules. |
| [`api/openapi.yaml`](./api/openapi.yaml) | backend | Frozen API contract. |
| [`handoff/HANDOFF.md`](./handoff/HANDOFF.md) | pm | State at the end of each work session. |

## Current phase

Foundation. The monorepo, local infrastructure, API health contract, and agent team are in place.
The next gates are:

1. Owner completes the execution PRD and resolves Phase 0 decisions.
2. PM turns the MVP backlog into an ordered board and writes the first task packets.
3. DBA lands the baseline schema with RLS.
4. Backend and designer publish the first API and design contracts.
5. The team builds one walking skeleton: create a workspace, see it in the UI, prove the audit trail.

Do not build broad feature surface before the release loop is proven end-to-end.
