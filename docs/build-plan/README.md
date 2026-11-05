# LifeProof Continuity Platform — Build Plan

**Status:** Draft v2.0 — build-ready planning package
**Date:** 5 November 2026
**Owner:** Product & Engineering
**Supersedes:** `LifeProof_Blockchain_Vault_Security_PRD_v1.1.docx` (the original crypto-vault PRD)

---

## What this package is

This folder contains the complete product, architecture, delivery, and business plan for building **LifeProof v2.0** as a full software business.

The original v1.1 PRD described a crypto-heavy vault. This plan deliberately changes the center of gravity:

> **LifeProof is a verified-release infrastructure company with a family-facing vault, sold through trusted intermediaries, with crypto as a premium partner-led module and concierge as the trust-building service.**
>
> **The vault is the hook. The release is the product. The verification network and legal acceptance are the moat.**

The MVP is **documents-first** and **operations-led**: prove that a family can securely store what matters, nominate beneficiaries, verify a death or incapacity, and receive access through a trustworthy, auditable process — before adding crypto, partner APIs, and international expansion.

**Every document in this package is built on the strategy kernel in [`00_STRATEGY_KERNEL.md`](./00_STRATEGY_KERNEL.md).** If a requirement, epic, or business decision conflicts with that kernel, the kernel wins.

---

## Document map

| # | Document | Audience | Purpose |
|---|---|---|---|
| 0 | [`00_STRATEGY_KERNEL.md`](./00_STRATEGY_KERNEL.md) | Everyone | The bottom line, decision filters, non-negotiables, and traceability for the entire build |
| 1 | [`01_PRD.md`](./01_PRD.md) | Product, engineering, design, legal, ops | Complete product requirements, scope, personas, journeys, requirements, NFRs, launch criteria |
| 2 | [`02_ARCHITECTURE.md`](./02_ARCHITECTURE.md) | Engineering, security, DevOps | System architecture, data model, APIs, encryption, verification engine, infrastructure, threat model |
| 3 | [`03A_EPICS_MVP.md`](./03A_EPICS_MVP.md) | Delivery team | MVP epics and user stories with acceptance criteria and estimates |
| 4 | [`03B_EPICS_PHASE2_3.md`](./03B_EPICS_PHASE2_3.md) | Delivery team | Post-MVP epics: partner API, crypto continuity, business continuity, mobile, duress, trust program |
| 5 | [`04_DELIVERY_PLAN.md`](./04_DELIVERY_PLAN.md) | Leadership, delivery, engineering | Team, phases, sprints, milestones, testing, governance, risks, budget |
| 6 | [`05_BUSINESS_GTM_OPERATIONS.md`](./05_BUSINESS_GTM_OPERATIONS.md) | Founders, GTM, finance, legal | Business model, pricing, channels, unit economics, legal structure, operating model |
| 7 | [`backlog.csv`](./backlog.csv) | Delivery team | Importable backlog for Jira/Linear/Asana |

---

## Key decisions locked in this plan

1. **Control plane, not data plane.** LifeProof stores inventory, instructions, documents, beneficiary designations, and verification evidence. It does **not** store crypto seed phrases or private keys. Credentials are integrated via password managers and custody partners.
2. **Documents-first MVP.** The mass market is families with wills, insurance, property, IDs, and instructions. Crypto is a premium Phase 2 module.
3. **Verification is the moat.** Encryption is commodity. The defensible asset is the multi-signal verification network and the legal/operational acceptance of the release process.
4. **Manual operations first.** MVP verification and release are human-led with software support. Automation and registry integrations come after the process is proven.
5. **One jurisdiction first.** Launch in **one** market (recommended: UK will-writing channel or Nigeria/Lagos SME + diaspora — choose based on network strength). Do not launch UK, Nigeria, and Australia simultaneously.
6. **Hybrid pricing.** One-time setup/legacy kit plus annual continuity subscription; family and business tiers; concierge and release services.
7. **Continuity Trust.** A separate legal entity/foundation holds escrow material, source code, and recovery runbooks so the vault can survive the company.
8. **Trust is a product feature.** Open-source recovery client, reproducible builds, audits, bug bounty, insurance, transparency reports.
9. **No custom cryptography.** Use proven primitives: AES-256-GCM, Argon2id, WebAuthn/passkeys, Shamir/MPC via partners, HSM-backed keys.
10. **API-first, even before the partner API ships.** All internal capabilities are designed as versioned services so the Phase 2 partner API is an exposure layer, not a rewrite.

---

## Reading paths

- **Founder / leadership:** README → `05_BUSINESS_GTM_OPERATIONS.md` → `04_DELIVERY_PLAN.md`
- **Product / design:** `01_PRD.md` → `03A_EPICS_MVP.md`
- **Engineering / security:** `02_ARCHITECTURE.md` → `03A_EPICS_MVP.md` → `04_DELIVERY_PLAN.md`
- **Delivery / project management:** `03A_EPICS_MVP.md` → `03B_EPICS_PHASE2_3.md` → `04_DELIVERY_PLAN.md` → `backlog.csv`
- **Investors / partners:** `05_BUSINESS_GTM_OPERATIONS.md` → `01_PRD.md` (sections 1–7)

---

## Phase summary

| Phase | Duration | Outcome |
|---|---|---|
| **Phase 0 — Validate & design** | 4 weeks | Legal opinion, design partners, architecture/security review, brand/trademark check, concierge prototype |
| **Phase 1 — MVP** | 24 weeks (12 sprints) | Documents-first family vault, beneficiaries, verification case management, release workflow, emergency pack, admin console, billing, audit — one jurisdiction |
| **Phase 2 — Expand** | 16–20 weeks | Partner portal/API, crypto continuity via custody partners, family plan, release rehearsal, mobile web/PWA hardening, duress features |
| **Phase 3 — Platform** | 16–20 weeks | Verification API GA, insurer/exchange integrations, business continuity, multi-jurisdiction, mobile apps, SOC 2 Type II |
| **Phase 4 — Standard** | Ongoing | Open protocol, marketplace, certification, international |

---

## Non-negotiable guardrails

- No plaintext storage of secrets.
- No SMS OTP for vault or release operations.
- No release without identity verification and cooling-off.
- No admin access to document contents.
- No single admin can trigger an escrow release.
- No launch without a completed legal opinion, penetration test, and release runbook.
- No feature that increases scope before the release loop is proven end-to-end.

---

## Open decisions for the founding team

1. **Launch market:** UK will-writing/solicitor channel vs. Nigeria/Lagos SMEs + diaspora. Pick one for Phase 1.
2. **Brand:** “LifeProof” is an OtterBox trademark. Complete a trademark search and decide whether to rebrand before launch.
3. **Entity structure:** OpCo jurisdiction and the legal form of the Continuity Trust.
4. **Crypto custody partners:** shortlist 2–3 from Safe, Fireblocks, Coincover, Casa, Unchained.
5. **Document encryption model:** MVP server-side envelope encryption with KMS vs. client-side encryption from day one. Recommendation: KMS envelope encryption for MVP; client-side encryption for the high-security tier in Phase 2.
6. **Pricing:** validate £/$/₦ price points with design partners before public launch.
7. **Concierge economics:** in-house vs. outsourced release support.
8. **Initial capital:** bootstrap via concierge/white-label vs. raise a $1.5–3M seed round.

---

## Definition of “done” for this planning package

- Every MVP requirement has an epic/story with acceptance criteria.
- Every P0 story has a testable definition of done.
- Architecture covers data model, encryption, verification, release, audit, and DR.
- Delivery plan has a sprint-by-sprint path to a launchable MVP.
- Business plan has pricing, channels, unit economics, legal structure, and a 90-day operating plan.
