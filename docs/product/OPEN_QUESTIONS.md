# LifeProof Portal — Open Questions

**Status:** Live register. Owned by Product (owner). The human is the final authority.
**Rule:** an item here is *not* blocking the current milestone unless it is flagged as such. Blocking
items are escalated to the owner before implementation can hardcode an answer.

All six Phase 0 decisions are resolved and recorded in [`PRD.md`](./PRD.md) §2. What remains are
execution details that have a named owner and a "needed by" date, but do not block writing the plan.

| # | Question | Owner | Needed by | Notes / why it is not blocking |
|---|---|---|---|---|
| OQ-01 | Exact family & concierge price points (GBP) | Founder/GTM | M5 | Pricing anchor decided (D-P0-05). Validate with 3–5 design partners before launch; use the D-P0-05 ranges meanwhile. |
| OQ-02 | Rebrand name, domain, and trademark clearance | Founder/Legal | M5 | Rebrand decided (D-P0-02). Public name/domain needed before M5; internal working name may persist until then. |
| OQ-03 | Auth0 tenant architecture (consumer vs admin vs future partner SSO) and UK/EU data-residency/DPA | CTO/Security | S1 | Provider decided (D-P0-03). Tenant layout must be fixed before auth work; does not block writing the PRD. |
| OQ-04 | Continuity Trust trustee and governing jurisdiction | Founder/Legal | M1 | Structure decided (D-P0-06). Trustee/jurisdiction finalized with counsel; trust deed/escrow is M4 evidence. |
| OQ-05 | Nigeria fast-follow scope, evidence standards (NDPR), and payment rails | Founder/Legal/GTM | After M6 | Gated behind a proven UK release loop (D-P0-01). No Nigeria build work until that gate passes. |
| OQ-06 | KYC provider for the UK (Smile ID vs Onfido vs Jumio) | Product/Legal | S6 | KYC is a P0 integration; sandbox needed before the verification sprint. Selection is a procurement decision, not a scope question. |
| OQ-07 | Concierge staffing, coverage hours, and SLAs | COO/Ops | S8 | In-house concierge decided (D-P0-05). Headcount/coverage follows from pricing validation (OQ-01). |
| OQ-08 | Insurance provider and coverage (cyber/E&O/crime/professional indemnity) | Legal/Finance | M4 | Required before paid releases (FR-TRUST-009). Quotes already in progress (M0). |
| OQ-09 | Partner revenue-share model | GTM | Phase 2 | Not a Phase 1 blocker; note only. Phase 2 partner platform decision. |
| OQ-10 | Free tier packaging (emergency pack? readiness score? item/beneficiary limits) | PM/GTM | S9 | Affects entitlement engine (E13) before billing sprint. Anchor is family tier; free tier details are a packaging choice. |
| OQ-11 | UK VAT/tax treatment of subscriptions and service fees | Legal/Finance | M4 | Invoicing must be correct before launch (FR-BIL-004). |
| OQ-12 | Data residency for Nigeria fast-follow | CTO/Legal | Phase 1 fast-follow | Deferred until OQ-05 is taken up. |

## Escalation rule

If any open question becomes blocking (an implementation choice depends on it and no safe default
exists), the owner must answer it before work proceeds. Defaults recorded in `PRD.md` §2 apply until
then.
