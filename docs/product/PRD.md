# LifeProof Portal — Execution PRD

**Status:** Draft — owner must complete and obtain human approval.
**Source:** [`../build-plan/01_PRD.md`](../build-plan/01_PRD.md) (v2.0), governed by
[`../build-plan/00_STRATEGY_KERNEL.md`](../build-plan/00_STRATEGY_KERNEL.md).

## 1. Product summary

LifeProof is a verified-release infrastructure company with a family-facing vault. Families store
documents, instructions, beneficiaries, and release conditions. When a death or incapacity claim is
made, LifeProof verifies the event through evidence, identity checks, and trusted signals, then
releases the intended items through a controlled, auditable process.

The vault is the hook. The release is the product. The verification network and legal acceptance are
the moat.

## 2. Phase 1 MVP outcome

A real family can:

1. Create a workspace and invite a family organiser.
2. Add at least three documents and five instructions/pointers across categories.
3. Nominate a beneficiary and a trusted contact, both of whom consent.
4. Configure a death and/or incapacity condition with cooling-off.
5. Download an encrypted emergency pack.
6. Have a verified death/incapacity trigger processed by the ops team.
7. Have the beneficiary complete identity verification and receive scoped access.
8. Receive a release receipt and post-release support.
9. See every step in an immutable audit log.
10. Complete the journey without crypto knowledge.

## 3. MVP scope

In scope: family workspace, category-first vault, document upload and encrypted storage, beneficiaries,
trusted contacts, release conditions, manual verification, manual release orchestration, emergency pack,
notifications, admin/ops console, billing, audit, consent/privacy, accessibility, and one jurisdiction.

Out of scope for Phase 1: seed-phrase or private-key storage, partner portal/API, crypto continuity,
business workspaces, native mobile apps, automated registry integrations, multi-jurisdiction, release
rehearsal, and duress features. These are Phase 2/3.

## 4. Non-negotiables

- No plaintext secrets at rest; no seed phrases or private keys ever.
- No SMS OTP for vault or release operations.
- No release without identity verification, evidence, and cooling-off.
- No single admin can access document contents or trigger a release.
- No launch without a legal opinion, penetration test, and release runbook.
- No scope expansion before the release loop is proven end-to-end.
- No feature that makes the family journey harder to understand.
- The MVP uses KMS envelope encryption. Do not claim zero-knowledge.

## 5. Open decisions

The owner must record a decision and rationale before implementation hardcodes any of these:

- Launch jurisdiction and beachhead market.
- Brand/trademark decision.
- Managed auth provider.
- KMS envelope encryption rollout and the later client-side tier.
- Pricing and concierge economics.
- Legal entity and Continuity Trust structure.

## 6. Acceptance

The owner maintains the milestone acceptance table here. Each criterion must be evidenced by a test,
a demo, a document, or a signed decision. “It should work” is not evidence.
