---
description: Dispatch the next ready task and verify the result
agent: pm
---

Pick the next ready task from `docs/plan/TASKS.md`. Write a complete task packet to
`docs/plan/tasks/<ID>.md` with objective, read-first files, owned paths, do-not-touch paths, acceptance
criteria, definition of done, and the required report.

Dispatch exactly one specialist with the task packet. When it returns, inspect the diff, run the relevant
checks, verify ownership and acceptance, update the board, and report the evidence. If the task touches
auth, encryption, verification, release, billing, or admin access, run the reviewer before marking it done.
