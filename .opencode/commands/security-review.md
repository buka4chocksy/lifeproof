---
description: Security-focused review of the current changes
agent: reviewer
---

Perform a security review of the current diff. Focus on authentication, authorization, tenant isolation,
RLS, input validation, encryption/key handling, secret and PII leakage, audit events, idempotency, rate
limits, destructive operations, release gates, and the strategy kernel's non-negotiables.

Report findings in severity order with file:line, impact, and a concrete fix. Block on any critical or
high finding. Do not edit files.
