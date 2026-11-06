# LifeProof Portal — Execution PRD

**Status:** Approved for execution (owner) — Phase 0 decisions locked.
**Owner:** Product (owner)
**Source:** [`../build-plan/01_PRD.md`](../build-plan/01_PRD.md) (v2.0), governed by
[`../build-plan/00_STRATEGY_KERNEL.md`](../build-plan/00_STRATEGY_KERNEL.md).
**Milestones:** [`../build-plan/04_DELIVERY_PLAN.md`](../build-plan/04_DELIVERY_PLAN.md).
**Related:** [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md), [`../plan/DECISIONS.md`](../plan/DECISIONS.md).

---

## 1. Product summary

LifeProof is a **verified-release infrastructure company with a family-facing vault**, sold through
trusted intermediaries. Families store documents, instructions, beneficiaries, trusted contacts, and
release conditions. When a death or incapacity claim is made, LifeProof verifies the event through
evidence, identity checks, and independent signals, then releases the intended items through a
controlled, auditable, human-led process.

The vault is the hook. The release is the product. The verification network and legal acceptance are
the moat. We are **not** a crypto seed-phrase vault, a password manager, or a self-serve-only SaaS.

---

## 2. Phase 0 decisions (locked)

The human is the final authority. These decisions are recorded with the trade-off. No implementation
may hardcode a different choice without reopening the decision with the owner.

| ID | Decision | Choice | Trade-off accepted |
|---|---|---|---|
| D-P0-01 | **Launch jurisdiction & beachhead** | **UK (England & Wales) now; Nigeria fast-follow.** Beachhead = family organiser reached via solicitors/will-writers/insurers. | UK gives a mature professional channel, GDPR, clean death-certificate/probate evidence, and Stripe rails. Nigeria (higher crypto/diaspora adoption, SME base) is gated **behind a proven UK release loop** — no Nigeria build begins before that gate. Dual-market scope-creep risk is mitigated by hard-gating. |
| D-P0-02 | **Brand / trademark** | **Rebrand now.** Do not launch under "LifeProof" (OtterBox trademark). | Avoids trademark conflict and marketing churn. Cost: name search, domain, brand assets, and externalizing the brand string in tokens/copy. Licensing/co-existence carried legal uncertainty. |
| D-P0-03 | **Managed auth provider** | **Auth0 (Okta)** behind the internal identity module. | Covers passkeys/WebAuthn, TOTP, email verification, breached-password checks, and future SAML/OIDC for partner + admin SSO — best B2B2C fit. Higher cost/complexity than Clerk/Cognito; vendor + data-residency review accepted (D-003). |
| D-P0-04 | **Encryption rollout** | **KMS envelope MVP; client-side encryption (CSE) in Phase 2.** Never claim zero-knowledge. | KMS envelope (per-document AES-256-GCM data keys wrapped by KMS) is simple, auditable, low-risk — but not zero-knowledge. CSE from day one would strengthen privacy but raise complexity/support risk and delay launch. Marketing/whitepaper language must stay accurate. |
| D-P0-05 | **Pricing & concierge economics** | **Family subscription anchor + in-house concierge.** Free/Family tier ($12–19/mo or $99–199/yr) plus a Concierge tier. | In-house concierge preserves the release-process learning loop (the moat) but adds staffing cost. Outsourcing is cheaper but loses the knowledge. Exact price points validated with design partners before M5 (open question). GBP default; PPP/local adjustments for Nigeria fast-follow. |
| D-P0-06 | **Legal entity & Continuity Trust** | **UK LtdCo (trading) + separate Continuity Trust** holding escrow, source, and recovery runbooks. | Separate trust gives continuity beyond the company (kernel non-negotiable) but is more setup. Source-escrow-only is lighter but weaker; foundation-owns-IP is strongest but slowest. Trustee + governing jurisdiction finalized with counsel (open question). |

**Consequences that flow from these decisions:**

- `workspaces.region` default = `GB`; Nigeria remains a supported value with no build work until gated.
- Legal opinion, evidence standards, DPIA, and contracts are scoped to England & Wales.
- The brand string must be externalized (no hardcoded "LifeProof" in public-facing copy); internal working name may persist until M5 but must be replaced before public launch.
- Identity module wraps Auth0; admin SSO uses a separate tenant; no custom auth or custom crypto.
- Data model must not preclude a Phase 2 client-side encryption tier (per-document key structure already supports it).

> **Coordination:** the PM should reconcile `docs/plan/DECISIONS.md` D-014 (launch jurisdiction) with
> D-P0-01 above. The owner does not edit `docs/plan/`.

---

## 3. MVP outcome (the release loop, end to end)

The MVP is complete when a **real family** can:

1. Create a workspace and invite a family organiser.
2. Add at least three documents and five instructions/pointers across categories.
3. Nominate a beneficiary and a trusted contact, both of whom consent.
4. Configure a death and/or incapacity condition with cooling-off.
5. Download an encrypted emergency pack.
6. Have a verified death/incapacity trigger processed by the ops team.
7. Have the beneficiary complete identity verification and receive scoped access to intended items.
8. Receive a release receipt and post-release support.
9. See every step in an immutable audit log.
10. Complete the journey without crypto knowledge.

---

## 4. MVP scope

### In scope (Phase 1)

- Family workspace (personal + family, up to 5 members), roles, and scoped permissions.
- Category-first vault (11 categories), item types, seal/unseal, prohibited-secret detection.
- Document upload (PDF/JPG/PNG/HEIC/TIFF, ≤25MB), malware scan, KMS-envelope encryption, secure preview/download, integrity hash, delete/retention.
- Beneficiaries, trusted contacts, consent, assignments/shares.
- Release conditions (death, incapacity, death-or-incapacity), cooling-off (14–90 days), release preview, pause/cancel.
- Manual verification engine: cases, evidence checklist/upload, KYC, trusted-contact attestation, ops review queue, four-eyes decision, legal hold, appeal, SLA timers.
- Manual release orchestration: release case, cooling-off timer, beneficiary re-verification, secure time-limited session, delivery, receipt, dispute, dual approval, partial release.
- Emergency pack (encrypted PDF, PIN-protected, no secrets).
- Notifications (email, in-app, SMS alerts — never OTP).
- Admin/ops console (separate domain, RBAC, evidence viewer, ceremony checklist, legal hold, audit, super-admin freeze).
- Billing (plan catalog, Stripe checkout, lifecycle, invoices, dunning).
- Immutable, hash-chained audit log; retention/deletion; privacy-preserving analytics.
- Consent, terms/privacy, DSAR, erasure, export, breach workflow.
- Accessibility (WCAG 2.2 AA), plain language, localization framework (English MVP).
- Trust/security program (MVP subset): threat model, pen test, incident runbook, disclosure policy, Continuity Trust setup, insurance.

### Out of scope (Phase 1)

- Seed-phrase or private-key storage (never — absolute constraint).
- Automated bank/exchange credential retrieval; automated death-registry integrations.
- Partner portal/API, white-label, webhooks, revenue share (Phase 2).
- Crypto continuity / custody partner integrations (Phase 2).
- Business workspaces / SME role-based release (Phase 3).
- Native mobile apps (PWA/capture is Phase 2).
- Multi-jurisdiction operations (Nigeria fast-follow is gated, not parallel).
- Release rehearsal ("fire drill" mode) and duress/coercion features (Phase 2).
- Marketplace, estate administration, or probate services.

---

## 5. Non-goals

- Being a crypto vault, seed-phrase store, or password manager.
- Providing legal advice or acting as a law firm, probate provider, or fiduciary adviser.
- Automatically logging into banks, exchanges, or wallets.
- A self-serve partner API or white-label portal in Phase 1.
- AI-generated legal or financial advice; AI never makes a final release decision.

---

## 6. Non-negotiables (guarded, from the kernel)

- No plaintext secrets at rest.
- No seed phrases or private keys stored by LifeProof, ever.
- No SMS OTP for vault or release operations.
- No release without identity verification, evidence, and cooling-off.
- No single admin can access document contents or trigger a release (dual control required).
- No launch without a legal opinion, penetration test, and release runbook.
- No scope expansion before the release loop is proven end-to-end.
- No feature that makes the family journey harder to understand.
- No partnership that compromises beneficiary privacy or auditability.
- No dependence on the company's perpetual existence without a continuity plan.
- The MVP uses KMS envelope encryption — **never claim "zero-knowledge."**

---

## 7. Acceptance criteria and evidence per milestone

A criterion is **pass** only when the evidence named below exists in the repo or as a signed
decision/document. "It should work" or an agent's summary is not evidence.

| Milestone | Acceptance criteria (must be true) | Evidence required |
|---|---|---|
| **M0 — Validation** (end week 4) | One jurisdiction + one beachhead segment chosen; brand decision made; auth provider chosen; encryption posture confirmed; pricing hypothesis set; entity/continuity structure set. Legal opinion acceptable; 3–5 design partners committed; architecture + threat model approved; MVP backlog refined; insurance quotes obtained. | Signed decisions D-P0-01…06 (this PRD). Legal opinion memo (England & Wales). Design-partner LOIs (redacted). ADRs + threat model v1 sign-off. Backlog with P0 estimates. Broker quote emails. |
| **M1 — Internal alpha** (end sprint 3) | Signup/login with Argon2id + email verification, TOTP, sessions, RBAC. Workspace + onboarding. Category dashboard + create item. Document upload → malware scan → encrypt → available. CI/CD, environments, observability, feature flags live. | Green CI (lint/typecheck/test/SAST/SCA/secrets). E2E test output for signup→seal and upload→available. Demo recording. KMS-wrapped-key evidence (object + key reference). |
| **M2 — Private beta** (end sprint 5) | Beneficiaries + trusted contacts + consent. Conditions + preview + pause/cancel. Verification case + evidence upload + KYC + attestation + four-eyes decision + legal hold. 10 design-partner families invited. | E2E + integration test output. Manual run-through of a synthetic verification case with KYC sandbox results. Audit events for the decision/legal hold. Redacted invite records. |
| **M3 — Release rehearsal** (end sprint 7) | Full release with dummy data: verification → cooling-off → beneficiary re-verification → dual approval → delivery → receipt. Legal hold and dispute exercised. | Rehearsal run log + audit trail export (synthetic). Dual-approval audit events (two distinct approvers). Receipt artifact. |
| **M4 — Security gate** (end sprint 11) | Pen test critical/high closed or formally accepted. DR test passed (RTO/RPO measured). WCAG 2.2 AA audit passed for core journeys. Legal opinion, terms, privacy, DPA, DPIA, insurance in place. Continuity Trust established with named custodian. | Pen test report + remediation tracker. DR game-day report. Accessibility audit report (axe + manual). Signed legal/compliance documents. Trust deed/escrow agreement + annual test plan. |
| **M5 — Public launch** (end sprint 12) | Launch checklist complete; all P0 stories accepted; E2E green; no open critical/high findings; runbooks + on-call ready; billing live; status page live; brand replaced; first paying customers on family tier. | Launch readiness review minutes with go decision. Accepted-P0 traceability. E2E suite green output. Stripe subscription records. Public brand/assets (no "LifeProof"). |
| **M6 — First real release** (≤90 days post-launch) | A real family completes a real release end-to-end with evidence, dual approval, cooling-off, and a receipt. | Release case + release receipt + audit export (redacted). Post-release NPS. Postmortem/retrospective note. |

### MVP definition of done (superset of M5 + M6)

1. A real family completes the full journey in a production-like environment.
2. A real release completes with evidence, dual approval, cooling-off, and a receipt.
3. Every P0 story accepted and tested.
4. Pen test critical/high closed or formally accepted.
5. Legal opinion, terms, privacy, DPIA, and insurance in place.
6. Ops runbook and SLAs trained and exercised.
7. Backups restore and DR game day pass.
8. Accessibility audit passes WCAG 2.2 AA for core journeys.
9. Analytics and audit dashboards live.
10. Launch checklist in `01_PRD.md` complete.

---

## 8. Success metrics (verify against these)

| Metric | Target |
|---|---|
| Activation (% signups sealing ≥1 item) | ≥ 40% |
| Plan completeness (% paying workspaces with beneficiary + trusted contact + ≥3 items) | ≥ 60% |
| Annual review (% paying workspaces reviewed in 12 months) | ≥ 50% |
| Release success (% releases completed without dispute) | ≥ 95% |
| Time to release (median, complete evidence → release) | ≤ 14 days |
| Beneficiary NPS | ≥ 50 |
| Support cost per completed release | ≤ $250 |
| Plaintext incidents | 0 |
| Verification false positives (releases later reversed) | 0 in pilot |
| Channel/partner-sourced revenue (by month 12) | ≥ 30% |

---

## 9. Ownership and change control

- The owner maintains this file and `OPEN_QUESTIONS.md`. The human is the final authority.
- Scope changes require a written change request with timeline/cost impact, recorded here.
- P0 scope freezes after sprint 5 (per `04_DELIVERY_PLAN.md` §10).
- The kernel wins over every decision in this document.
