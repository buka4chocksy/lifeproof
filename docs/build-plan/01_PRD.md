# LifeProof Continuity Platform — Product Requirements Document (PRD) v2.0

**Status:** Build-ready draft
**Date:** 5 November 2026
**Owner:** Product
**Supersedes:** LifeProof Blockchain Vault Security PRD v1.1
**Strategy basis:** [`00_STRATEGY_KERNEL.md`](./00_STRATEGY_KERNEL.md)

---

## 0. Document control

| Field | Value |
|---|---|
| Product | LifeProof Continuity Platform |
| Version | 2.0 |
| Classification | Confidential — internal build document |
| Audience | Product, engineering, design, security, legal, operations, GTM |
| Related documents | `00_STRATEGY_KERNEL.md`, `02_ARCHITECTURE.md`, `03A_EPICS_MVP.md`, `03B_EPICS_PHASE2_3.md`, `04_DELIVERY_PLAN.md`, `05_BUSINESS_GTM_OPERATIONS.md` |
| Change control | Product owner approves scope changes; architecture changes require tech lead and security sign-off; legal-impacting changes require legal sign-off |

---

## 1. Executive summary

LifeProof is a **verified-release infrastructure company** with a family-facing vault. It helps individuals and families inventory what matters, designate who should receive access, verify a death or incapacity through multiple signals, and orchestrate a safe, auditable release through trusted intermediaries.

The product is deliberately **not** a crypto seed-phrase vault. The vault is the hook. The release is the product. The verification network and legal acceptance are the moat.

### What we are building in Phase 1 (MVP)

A documents-first continuity platform for families, sold through trusted intermediaries, with:

- A guided family workspace and category-first vault
- Encrypted document storage and instructions
- Beneficiary and trusted-contact designation
- Release conditions (death, incapacity)
- A human-led verification case management system
- A controlled release workflow with identity verification, cooling-off, legal hold, and audit
- An emergency pack and release rehearsal
- An internal concierge/ops console
- Billing, notifications, and audit

### What we are not building in Phase 1

- Seed-phrase or private-key storage
- Automated bank/exchange credential retrieval
- Automatic death-registry integrations
- Partner API/white-label (Phase 2)
- Crypto custody integrations (Phase 2)
- Native mobile apps (Phase 2)
- Multi-jurisdiction operations (Phase 3)
- Marketplace, estate administration, or probate services

### Why this shape wins

- It solves the mass-market problem, not just the crypto niche.
- It reduces the honeypot and liability by avoiding secret storage.
- It creates a B2B2C channel motion through solicitors, insurers, and will-writers.
- It proves the hardest, most valuable part — the release — before scaling features.
- It lays API-first foundations so the Phase 2 partner platform is an exposure layer, not a rewrite.

---

## 2. Strategy kernel

This PRD is subordinate to [`00_STRATEGY_KERNEL.md`](./00_STRATEGY_KERNEL.md). The kernel's decisions are non-negotiable:

1. Verified-release infrastructure, not a consumer crypto app.
2. Family-facing vault as the front door.
3. Sold through trusted intermediaries.
4. Crypto as a premium partner-led module.
5. Concierge as the trust-building service.
6. Release is the product.
7. Verification network and legal acceptance are the moat.

Every requirement in this document is tagged to a phase and prioritized against those principles.

---

## 3. Problem and opportunity

### 3.1 The problem

When someone dies or becomes incapacitated, families face a fragmented, stressful, and often impossible process:

- They do not know what accounts, documents, policies, or assets exist.
- Critical documents are scattered across homes, email, cloud drives, and solicitors.
- Digital accounts are locked behind 2FA, recovery codes, and platforms that do not recognise a spouse or executor.
- Crypto assets are unrecoverable without seed phrases or private keys.
- Banks, insurers, and pension providers each have separate claim processes.
- Probate takes months; families need answers in days.
- Existing tools are either password managers, crypto wallets, generic cloud storage, or legal services — none orchestrates a verified release.

### 3.2 The opportunity

- Digital legacy and estate planning is moving from paper to digital.
- Crypto wealth is maturing, but the mass market is families with ordinary financial lives.
- Trusted intermediaries — solicitors, will-writers, insurers, brokers, accountants — need a digital continuity product to offer clients.
- Insurers, exchanges, and employers need a verified death/incapacity workflow to reduce support burden and fraud.
- No incumbent owns the **verification + release** layer across document types, account types, and institutions.

### 3.3 Market context

| Market | Why it matters | Launch note |
|---|---|---|
| **United Kingdom** | Clear probate process, digital assets reform, will-writing market, GDPR | Recommended first market if you have professional-channel access |
| **Nigeria** | High crypto adoption, strong diaspora, informal estate planning, large SME base | Recommended first market if you have community/SME access; pair with UK entity for trust |
| **Australia** | Mature estate planning, ATO crypto guidance | Phase 3 |

The company must choose **one** launch jurisdiction for Phase 1. Multi-jurisdiction operations are a Phase 3 capability, not a launch feature.

### 3.4 Competitive landscape

| Category | Examples | Gap LifeProof exploits |
|---|---|---|
| Password managers | 1Password, Bitwarden | Emergency access exists, but no death verification, legal coordination, or family document workflow |
| Legacy platforms | Trustworthy, Everplans | Strong document organization, weak verification/release infrastructure and partner API |
| Big-tech legacy | Google Inactive Account Manager, Apple Digital Legacy | Single-ecosystem, no cross-institution orchestration, no professional channel |
| Crypto inheritance | Casa, Unchained, Vault12, Inheriti, Coincover | Crypto-only, high complexity, not family-document-first |
| Legal/probate | Solicitors, will-writers, probate services | Trusted relationship, but no digital vault/verification platform |
| Banks/insurers | Beneficiary processes, claims teams | Institution-specific, slow, no cross-institution view |

LifeProof's differentiation is **not storage**. It is the verified release layer that sits between families, professionals, and institutions.

---

## 4. Vision, mission, positioning

### Vision
Every family can find, access, and act on what matters when life changes suddenly.

### Mission
Build the trusted verification and release layer for life transitions — starting with the family vault, delivered through the professionals families already trust.

### Positioning statement
For families who want to protect the people they love, LifeProof is the continuity platform that verifies when something has happened and safely releases the right access to the right people — unlike password managers, crypto wallets, or generic cloud storage, LifeProof coordinates the human, legal, and verification process, not just the files.

### Tagline options
- “Your family’s access, verified when it matters.”
- “The vault is the hook. The release is the promise.”
- “Peace of mind, with a process behind it.”

---

## 5. Goals, success metrics, and non-goals

### 5.1 Business goals

| ID | Goal | Year 1 target | Year 2 target |
|---|---|---|---|
| G-01 | Prove the release loop | 5 successful paid releases | 50 successful releases |
| G-02 | Acquire paying families | 500 paying families | 5,000 paying families |
| G-03 | Build channel distribution | 3 active channel partners | 15 active channel partners |
| G-04 | Establish trust | Pen test passed, security whitepaper, no plaintext incidents | SOC 2 Type II, ISO 27001 |
| G-05 | Build partner platform | API design partners | API GA, 10 partner integrations |
| G-06 | Reach sustainability | $300k ARR | $2M ARR |

### 5.2 Product success metrics

| ID | Metric | Definition | Year 1 target |
|---|---|---|---|
| M-01 | Activation | % of signups who seal at least one vault item | ≥ 40% |
| M-02 | Plan completeness | % of paying workspaces with beneficiary + trusted contact + at least 3 items | ≥ 60% |
| M-03 | Annual review | % of paying workspaces reviewed in last 12 months | ≥ 50% |
| M-04 | Release success | % of initiated releases completed without dispute | ≥ 95% |
| M-05 | Time to release | Median days from complete evidence to release | ≤ 14 days |
| M-06 | Beneficiary NPS | Post-release NPS | ≥ 50 |
| M-07 | Support cost | Cost per completed release | ≤ $250 |
| M-08 | Plaintext incidents | Confirmed plaintext secret exposure | 0 |
| M-09 | Verification false positive | Releases later reversed due to incorrect verification | 0 in pilot |
| M-10 | Channel revenue | % of new revenue from partners | ≥ 30% by month 12 |

### 5.3 Non-goals (Phase 1)

- Storing seed phrases, private keys, or exchange passwords as the primary value proposition.
- Automatically logging into banks, exchanges, or wallets.
- Providing legal advice or acting as a law firm.
- Acting as a probate provider or estate administrator.
- Supporting multiple jurisdictions.
- Native iOS/Android apps.
- A self-serve partner API or white-label portal.
- A marketplace of service providers.
- AI-generated legal or financial advice.

---

## 6. Personas and jobs to be done

### 6.1 Primary persona — The Family Organiser

**Blessing, 52 — Parent of three, Port Harcourt / London**
- Wants her adult children to handle her affairs and her husband’s if anything happens.
- Not technical; intimidated by crypto jargon; wants something as simple as a family safe.
- Needs category-first UX, plain-language instructions, printable emergency pack, and human help.
- Buying trigger: a health scare, a parent’s death, or a solicitor/insurer recommendation.

**Jobs to be done:**
- “When something happens to me, I want my children to know what exists and who to contact without tearing the house apart.”
- “Help me set this up without making me feel stupid or scared.”

### 6.2 Secondary persona — The Asset Holder

**Emeka, 38 — Software engineer, Lagos**
- Holds crypto, exchange accounts, and investment accounts.
- Fears LifeProof staff or hackers accessing his credentials while alive.
- Wants a verified release to his wife, with clear instructions.
- Buying trigger: a friend’s sudden death, a bear market, or an exchange insolvency headline.

**Jobs to be done:**
- “When I die, my wife should be able to access what I intended without exposing everything to everyone.”
- “Prove to me you cannot see my secrets.”

### 6.3 Tertiary persona — The Beneficiary

**Ngozi, 35 — Spouse, Abuja**
- Knows her husband had assets but not how to access them.
- Grieving, non-technical, vulnerable to fraud.
- Needs a guided, empathetic release experience with clear next steps.

**Jobs to be done:**
- “Tell me what I am entitled to, what to do next, and who can help me.”
- “Do not make me upload ten documents to five different portals.”

### 6.4 Business persona — The Business Owner

**Adaeze, 45 — Founder, Lagos fintech startup**
- Business bank accounts, payment processor credentials, company crypto treasury.
- Needs operational continuity and role-based release (CFO gets bank details, COO gets systems).
- Buying trigger: board risk review, key-person insurance, investor due diligence.

**Jobs to be done:**
- “If I am hit by a bus, the business should not freeze.”
- “Give the right access to the right role, not everything to one person.”

### 6.5 Channel persona — The Professional Partner

**Solicitor, will-writer, estate planner, insurer, accountant**
- Trusted by the family; sells or advises on wills, insurance, and estate planning.
- Wants a digital continuity product to offer clients without building it.
- Needs client management, status visibility, referral tracking, and white-label options.

**Jobs to be done:**
- “Give me a credible digital legacy service I can offer my clients under my brand.”
- “Let me see status and support my client without accessing their private documents.”

### 6.6 Internal personas

| Persona | Responsibilities | Key needs |
|---|---|---|
| Verification Analyst | Review evidence, contact trusted contacts, decide | Clear evidence checklist, fraud flags, audit trail |
| Release Manager | Coordinate cooling-off, approvals, release ceremony | Case dashboard, dual control, scripts, SLAs |
| Legal Reviewer | Handle disputes, legal holds, jurisdiction questions | Evidence pack, legal hold controls, audit export |
| Concierge | Help families set up and navigate release | Guided scripts, customer context, task queue |
| Support Agent | Handle account and billing questions | Customer lookup, macros, escalation |
| Super Admin | Platform-wide emergency response | Freeze releases, revoke sessions, audit access |
| Partner Developer | Integrate via API | Docs, sandbox, keys, webhooks, status |

---

## 7. Product principles

1. **Control plane, not data plane.** Store what is needed to orchestrate access; do not become the place where secrets live.
2. **Release is the product.** Invest more in verification, evidence, identity, cooling-off, legal hold, and audit than in storage features.
3. **Family-first language.** No crypto jargon, no legal jargon, no security theatre.
4. **Trust is visible.** Every claim must be provable through audits, open-source recovery, transparency reports, and insurance.
5. **Human-assisted where it matters.** Grief is not a self-serve moment. Concierge is a feature.
6. **Legal acceptance by design.** Every release path must be defensible to a court, insurer, or regulator.
7. **Continuity beyond the company.** The promise must survive LifeProof.
8. **Narrow MVP, measurable releases.** Prove one loop end-to-end before expanding.
9. **API-first domain design.** Every core capability must be exposable to partners later.
10. **Privacy by default.** Collect the minimum, encrypt the rest, and never index document contents.

---

## 8. Scope and release strategy

### 8.1 Product lines

| Product line | Description | Phase |
|---|---|---|
| **Family Vault** | Consumer/family continuity vault: documents, instructions, beneficiaries, emergency pack, annual review | Phase 1 |
| **Verify** | Death/incapacity verification case management with evidence, trusted contacts, KYC, cooling-off, legal hold | Phase 1 (manual), Phase 2 (automation/API) |
| **Release** | Release orchestration: identity re-verification, secure delivery, receipts, concierge, disputes | Phase 1 (manual), Phase 2 (automation/API) |
| **Partner Platform** | White-label portal, professional roles, client management, API, webhooks, revenue share | Phase 2 |
| **Crypto Continuity** | Crypto inventory and partner-led multisig/MPC release coordination; no seed storage | Phase 2 |
| **Business Continuity** | SME/enterprise workspace, role-based access, key-person release, board notifications | Phase 3 |
| **Trust & Continuity** | Continuity Trust, open-source recovery client, audits, insurance, transparency | Phase 1–3 |

### 8.2 Phase scope

| Capability | Phase 1 (MVP) | Phase 2 | Phase 3 |
|---|---|---|---|
| Web app (responsive) | ✅ | ✅ | ✅ |
| Native mobile apps | — | PWA/capture | ✅ |
| Family workspace | ✅ | ✅ | ✅ |
| Business workspace | — | — | ✅ |
| Documents (25MB/file, 500MB) | ✅ | ✅ | ✅ |
| Instructions/pointers | ✅ | ✅ | ✅ |
| Credential secret storage | — (pointers only) | Optional encrypted notes | Optional |
| Seed phrase storage | ❌ never | ❌ never | ❌ never |
| Beneficiaries | ✅ | ✅ | ✅ |
| Trusted contacts | ✅ | ✅ | ✅ |
| Professional partners | — | ✅ | ✅ |
| Death trigger | ✅ | ✅ | ✅ |
| Incapacity trigger | ✅ | ✅ | ✅ |
| Time-lock trigger | — | ✅ | ✅ |
| Manual verification | ✅ | ✅ | ✅ |
| Automated registry integrations | — | — | ✅ |
| Verification API | — | ✅ | ✅ |
| Release orchestration | ✅ manual | ✅ automated | ✅ |
| Release rehearsal | — | ✅ | ✅ |
| Emergency pack | ✅ | ✅ | ✅ |
| Emergency card | — | ✅ | ✅ |
| Crypto continuity | — | ✅ partner-led | ✅ |
| Partner portal/white-label | — | ✅ | ✅ |
| Billing | ✅ | ✅ | ✅ |
| Admin/ops console | ✅ | ✅ | ✅ |
| Audit log | ✅ | ✅ | ✅ |
| Multi-jurisdiction | — | — | ✅ |
| Duress/coercion | — | ✅ | ✅ |
| SOC 2 Type II | Readiness | ✅ | ✅ |
| ISO 27001 | — | — | ✅ |

### 8.3 MVP definition

The MVP is complete when a real family can:

1. Create a workspace and invite a family organizer.
2. Add at least three documents and five instructions/pointers across categories.
3. Nominate a beneficiary and a trusted contact, both of whom consent.
4. Configure a death and/or incapacity release condition with cooling-off.
5. Download an encrypted emergency pack.
6. Have a verified death/incapacity trigger processed by the ops team.
7. Have the beneficiary complete identity verification and receive scoped access to the intended items.
8. Receive a release receipt and post-release support.
9. See every step in an immutable audit log.
10. Complete the journey without crypto knowledge.

---

## 9. Product architecture overview

### 9.1 Core domains

| Domain | Responsibility | Phase |
|---|---|---|
| Identity & Access | Accounts, authentication, sessions, roles, permissions | 1 |
| Workspace | Family/business accounts, members, plans | 1 |
| Vault Catalog | Items, categories, instructions, pointers, statuses | 1 |
| Document Service | Upload, scan, encrypt, store, retrieve, version | 1 |
| Relationship Graph | Beneficiaries, trusted contacts, professional partners, guardians | 1 |
| Conditions | Release triggers, per-item rules, cooling-off configuration | 1 |
| Verification | Cases, evidence, signals, KYC, review, decisions, legal hold | 1 |
| Release Orchestration | Release cases, approvals, identity re-verification, delivery, receipts | 1 |
| Notifications | Email, in-app, SMS alerts, partner webhooks | 1 |
| Admin & Concierge | Ops console, queues, dual control, support | 1 |
| Billing | Plans, subscriptions, invoices, seats | 1 |
| Audit & Analytics | Immutable events, reporting, privacy-preserving analytics | 1 |
| Partner Platform | Tenants, white-label, API, webhooks, revenue share | 2 |
| Crypto Continuity | Partner adapters, multisig/MPC coordination | 2 |
| Business Continuity | SME roles, key-person release, board workflows | 3 |

### 9.2 High-level flow

```
User / Family
    │
    ▼
Family Vault ──► Conditions ──► Trigger Event
    │                              │
    │                              ▼
    │                        Verification Case
    │                        (evidence, KYC,
    │                         trusted contacts,
    │                         professional attestations)
    │                              │
    │                              ▼
    │                        Verified Decision
    │                              │
    │                              ▼
    │                        Cooling-Off / Legal Hold
    │                              │
    │                              ▼
    │                        Release Case
    │                              │
    │                              ▼
    └──────────────────────► Beneficiary Identity Re-Verification
                                   │
                                   ▼
                            Secure Release Session
                                   │
                                   ▼
                            Receipt + Audit + Support
```

### 9.3 Control plane vs data plane

| Control plane (LifeProof) | Data plane (partners/user) |
|---|---|
| Inventory metadata | Password manager secrets |
| Instructions and pointers | Crypto keys and seed phrases |
| Beneficiary designations | Bank/exchange credentials |
| Release conditions | Custody partner wallets |
| Verification evidence | Document originals (encrypted storage) |
| Release orchestration and audit | Partner systems of record |

---

## 10. Functional requirements

Requirement priorities:

- **P0** — MVP launch blocker
- **P1** — Phase 2 / fast follow
- **P2** — Phase 3 / later
- **P3** — Future / idea backlog

Requirement format: ID | Requirement | Priority | Phase | Notes / acceptance summary.

### 10.1 Identity, authentication, and account security

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-AUTH-001 | Email + password signup/login with Argon2id hashing and email verification | P0 | 1 | Breached-password check; minimum length 12; no security questions |
| FR-AUTH-002 | Passkey/WebAuthn login and step-up authentication | P0 | 1 | Primary phishing-resistant factor; fallback TOTP |
| FR-AUTH-003 | TOTP MFA with recovery codes | P0 | 1 | Recovery codes hashed; downloadable once |
| FR-AUTH-004 | No SMS OTP for vault or release operations | P0 | 1 | SMS may be used for non-sensitive alerts only |
| FR-AUTH-005 | Session management with device list, revoke, idle timeout, re-auth for sensitive actions | P0 | 1 | Re-auth within 15 minutes for seal/release/admin |
| FR-AUTH-006 | Account recovery via recovery kit/email plus admin-assisted identity verification | P0 | 1 | Never rely on SMS; recovery events audited |
| FR-AUTH-007 | Rate limiting, bot protection, credential-stuffing detection | P0 | 1 | CAPTCHA only after risk signal |
| FR-AUTH-008 | RBAC for owner, admin, member, beneficiary, professional, support, super admin | P0 | 1 | Permission matrix in architecture doc |
| FR-AUTH-009 | Audit all authentication and authorization events | P0 | 1 | Includes failures and lockouts |
| FR-AUTH-010 | SSO (SAML/OIDC) for business and partner users | P2 | 3 | Enterprise requirement |
| FR-AUTH-011 | Step-up biometric/hardware key for release approval | P1 | 2 | FIDO2 for ops staff and high-risk users |
| FR-AUTH-012 | Suspicious-login notifications and session anomaly detection | P1 | 2 | Email/in-app alert |

### 10.2 Onboarding, workspace, and roles

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-WS-001 | Guided onboarding with plain-language explanation, consent, and time-to-value under 10 minutes | P0 | 1 | “Digital safe” metaphor; progress saved |
| FR-WS-002 | Create personal workspace; optional family workspace | P0 | 1 | Family workspace up to 5 members Phase 1 |
| FR-WS-003 | Invite members with roles and scoped permissions | P0 | 1 | Email invite, expiry, resend, revoke |
| FR-WS-004 | Family Organiser role can help set up but cannot view sealed contents | P0 | 1 | “Helper” mode with audit |
| FR-WS-005 | Workspace settings, plan, billing owner, data controls | P0 | 1 | Billing owner can differ from owner |
| FR-WS-006 | Onboarding checklist and readiness score | P0 | 1 | Score based on completeness, not fear |
| FR-WS-007 | Data residency selection | P2 | 3 | UK/EU, Nigeria, Australia |
| FR-WS-008 | White-label branding and custom domain | P1 | 2 | Partner plan |
| FR-WS-009 | Multi-workspace switching | P1 | 2 | Family + business |
| FR-WS-010 | Scoped professional access with client consent | P1 | 2 | Solicitor/estate planner view |
| FR-WS-011 | Delegated setup with expiring invitation links | P1 | 2 | Concierge and family helpers |
| FR-WS-012 | Workspace transfer and ownership succession | P1 | 2 | Prevents orphaned workspaces |

### 10.3 Vault inventory and categories

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-INV-001 | 11 categories: Crypto, Banking, Investments, Pension, Insurance, Property, Tax, Business, Subscriptions, Documents, Custom | P0 | 1 | Category-first dashboard |
| FR-INV-002 | Create, edit, archive, delete vault items with type-specific forms | P0 | 1 | Soft delete with retention |
| FR-INV-003 | Item types: document reference, instruction, account pointer, subscription, property, insurance, tax, business, custom | P0 | 1 | No seed phrase/private key type |
| FR-INV-004 | Prohibit seed phrases, private keys, and full credentials in structured fields | P0 | 1 | Warning + blocked field patterns |
| FR-INV-005 | Optional encrypted secret note for low-risk credentials with explicit risk warning | P1 | 2 | Client-side encryption; not for crypto keys |
| FR-INV-006 | Item status: DRAFT, SEALED; sealing requires completeness check and step-up auth | P0 | 1 | Sealed items immutable unless unsealed |
| FR-INV-007 | Search, filter by category/status/beneficiary, sort | P0 | 1 | Client-side search over metadata |
| FR-INV-008 | Item detail: last updated, beneficiary, release condition, linked documents | P0 | 1 | Clear “what happens next” summary |
| FR-INV-009 | Item version history and audit | P0 | 1 | Who changed what, when |
| FR-INV-010 | Category templates and suggested fields | P1 | 2 | “Add your banking details” prompts |
| FR-INV-011 | Bulk CSV import with mapping and validation | P1 | 2 | For concierge and business |
| FR-INV-012 | Vault readiness and completeness scoring | P0 | 1 | Category coverage + beneficiary coverage |
| FR-INV-013 | Link items to documents, beneficiaries, and trusted contacts | P0 | 1 | Graph relationships |
| FR-INV-014 | Archive/restore items | P1 | 2 | Audit retained |
| FR-INV-015 | Custom fields and custom item types | P1 | 2 | Guardrails against secret storage |
| FR-INV-016 | Annual review workflow per item | P0 | 1 | “Still accurate?” prompt |
| FR-INV-017 | “What my family will see” preview | P0 | 1 | Per beneficiary/category |

### 10.4 Document vault

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-DOC-001 | Upload PDF, JPG, PNG, HEIC, TIFF up to 25MB; 500MB total per workspace | P0 | 1 | Configurable by plan |
| FR-DOC-002 | Presigned, resumable upload with progress and retry | P0 | 1 | Direct-to-object-storage |
| FR-DOC-003 | Malware scan before availability; quarantine on detection | P0 | 1 | ClamAV or managed scanner |
| FR-DOC-004 | Encryption at rest with per-document data keys wrapped by KMS | P0 | 1 | TLS 1.2+ in transit |
| FR-DOC-005 | Encrypted metadata; no content indexing in MVP | P0 | 1 | Labels only |
| FR-DOC-006 | Document categories, labels, and linking to vault items | P0 | 1 | Will, insurance, property, ID, PoA, business, custom |
| FR-DOC-007 | Version history and restore | P1 | 2 | Last 10 versions |
| FR-DOC-008 | SHA-256 integrity hash stored and verified on access | P0 | 1 | Detect corruption/tampering |
| FR-DOC-009 | Delete with confirmation, retention window, and audit | P0 | 1 | Right to erasure workflow |
| FR-DOC-010 | In-browser preview with watermark and no-download option | P1 | 2 | PDF/image |
| FR-DOC-011 | Client-side encryption for high-security tier | P1 | 2 | User-held key/shard |
| FR-DOC-012 | OCR/extraction with privacy-preserving processing | P2 | 3 | Optional; never index sensitive content by default |
| FR-DOC-013 | Bulk upload and folder import | P1 | 2 | Concierge tool |
| FR-DOC-014 | Expiry/renewal reminders for IDs, passports, insurance | P1 | 2 | Living-value feature |
| FR-DOC-015 | Document access audit and anomaly alerts | P0 | 1 | Who viewed/downloaded |
| FR-DOC-016 | Request missing documents from family members | P1 | 2 | Scoped upload links |

### 10.5 Beneficiaries, trusted contacts, and professional partners

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-BEN-001 | Add beneficiary with name, relationship, contact, identity status | P0 | 1 | Minors flagged |
| FR-BEN-002 | Invite beneficiary to pre-register and consent | P0 | 1 | Beneficiary portal |
| FR-BEN-003 | Beneficiary KYC at release; optional pre-KYC | P0 | 1 | KYC partner; liveness |
| FR-BEN-004 | Assign beneficiaries per item/category with shares | P0 | 1 | Percentages must total 100% where applicable |
| FR-BEN-005 | Designate backup beneficiary | P0 | 1 | Prevents dead-end releases |
| FR-BEN-006 | Trusted contact roles: verifier, executor, guardian, professional | P0 | 1 | Role-specific permissions |
| FR-BEN-007 | Trusted contact consent and contact verification | P0 | 1 | Email + phone + knowledge check |
| FR-BEN-008 | Professional partner as trusted contact with scoped access | P1 | 2 | Solicitor/estate planner |
| FR-BEN-009 | Guardian/trustee for minor beneficiaries; legal hold until age | P1 | 2 | Age verification |
| FR-BEN-010 | Beneficiary portal showing assigned items and instructions without contents | P0 | 1 | “What you will receive” |
| FR-BEN-011 | Beneficiary/trusted-contact change history and audit | P0 | 1 | Notify affected parties |
| FR-BEN-012 | Conflict-of-interest and duplicate-beneficiary checks | P1 | 2 | Fraud prevention |
| FR-BEN-013 | Beneficiary communication preferences and language | P1 | 2 | Localization |
| FR-BEN-014 | Beneficiary support and dispute escalation | P0 | 1 | Concierge queue |

### 10.6 Release conditions and triggers

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-REL-001 | Death trigger as default | P0 | 1 | Requires verification |
| FR-REL-002 | Incapacity trigger with PoA/legal evidence | P0 | 1 | Default off; explicit opt-in |
| FR-REL-003 | Death or incapacity trigger | P0 | 1 | Whichever occurs first |
| FR-REL-004 | Time-lock trigger on a user-specified date | P1 | 2 | Clarify release vs expiry in UI |
| FR-REL-005 | Combined trigger (death + date) | P1 | 2 | Highest security |
| FR-REL-006 | Per-item release conditions and beneficiaries | P0 | 1 | Different rules per category |
| FR-REL-007 | Cooling-off period configurable 14–90 days | P0 | 1 | Default 14 |
| FR-REL-008 | Nominate verifiers/trusted contacts per condition | P0 | 1 | Minimum one verifier |
| FR-REL-009 | Release preview: what will be released, to whom, when | P0 | 1 | Plain-language summary |
| FR-REL-010 | Legal hold suspends release indefinitely | P0 | 1 | Ops/legal only |
| FR-REL-011 | Emergency override only with dual control + legal sign-off | P1 | 2 | Audited; never self-serve |
| FR-REL-012 | Release rehearsal using dummy data | P1 | 2 | Trust feature |
| FR-REL-013 | Annual condition review and expiry warnings | P1 | 2 | Prevent stale plans |
| FR-REL-014 | “Pause release” user control while alive | P0 | 1 | Panic/change of mind |
| FR-REL-015 | Trigger simulation/dry run for ops | P0 | 1 | Internal testing |

### 10.7 Verification engine

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-VER-001 | Initiate verification case from a trigger event | P0 | 1 | Claimant, beneficiary, or ops initiated |
| FR-VER-002 | Case types: death, incapacity, dispute, fraud | P0 | 1 | Separate playbooks |
| FR-VER-003 | Evidence checklist and secure upload | P0 | 1 | Death certificate, ID, PoA, medical evidence where lawful |
| FR-VER-004 | Identity verification of claimant and beneficiary via KYC partner | P0 | 1 | Document + liveness + sanctions/PEP |
| FR-VER-005 | Trusted contact attestation with consent and contact verification | P0 | 1 | Minimum two independent signals |
| FR-VER-006 | Professional attestation (solicitor, doctor, employer) with verification | P1 | 2 | Verified against professional registry |
| FR-VER-007 | Manual review queue and decision | P0 | 1 | Four-eyes for approval |
| FR-VER-008 | Multi-signal confidence score | P1 | 2 | Not a black box; explainable |
| FR-VER-009 | Fraud flags: duplicate claims, inconsistent identity, velocity, watchlist | P1 | 2 | Ops review required |
| FR-VER-010 | Cooling-off countdown and dispute window | P0 | 1 | Notifications to beneficiaries |
| FR-VER-011 | Legal hold management | P0 | 1 | Court order, dispute, probate |
| FR-VER-012 | Verification timeline and immutable audit | P0 | 1 | Every action/evidence |
| FR-VER-013 | Death registry integration | P2 | 3 | Country-specific |
| FR-VER-014 | Funeral home/insurer integration | P2 | 3 | Partner signals |
| FR-VER-015 | Verification API for partners | P2 | 3 | Phase 2 beta, Phase 3 GA |
| FR-VER-016 | Adverse action/denial reasons and notification | P0 | 1 | Plain language + appeal path |
| FR-VER-017 | Appeal workflow | P1 | 2 | New evidence; independent reviewer |
| FR-VER-018 | Case SLAs, escalation, and breach alerts | P0 | 1 | Ops dashboard |
| FR-VER-019 | Jurisdiction-specific evidence and release rules | P2 | 3 | Legal playbooks |
| FR-VER-020 | Sanctions/PEP screening for claimants | P1 | 2 | KYC partner |
| FR-VER-021 | Case reassignment and conflict-of-interest controls | P0 | 1 | Four-eyes |
| FR-VER-022 | Evidence redaction/minimization | P1 | 2 | Store only what is needed |

### 10.8 Release orchestration

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-ORC-001 | Create release case from a verified trigger | P0 | 1 | Links verification case |
| FR-ORC-002 | Release state machine with explicit transitions and approvals | P0 | 1 | See state machine section |
| FR-ORC-003 | Beneficiary identity re-verification at release | P0 | 1 | Prevent account takeover |
| FR-ORC-004 | Secure release session with time-limited access | P0 | 1 | Default 5 minutes for sensitive views |
| FR-ORC-005 | Document download/preview with watermark and audit | P0 | 1 | Per-file access log |
| FR-ORC-006 | Instructions and action checklist delivery | P0 | 1 | Category-specific next steps |
| FR-ORC-007 | Per-beneficiary scoping and redaction | P0 | 1 | Only assigned items |
| FR-ORC-008 | Release receipt and acknowledgement | P0 | 1 | Downloadable PDF |
| FR-ORC-009 | Dispute/legal hold suspends release | P0 | 1 | Immediate |
| FR-ORC-010 | Partial release by category/beneficiary | P0 | 1 | Where legally allowed |
| FR-ORC-011 | Manual release ceremony checklist with dual control | P0 | 1 | Ops runbook |
| FR-ORC-012 | Dual approval for high-risk releases | P0 | 1 | Two ops/legal approvers |
| FR-ORC-013 | Emergency/offline release protocol | P1 | 2 | Platform unavailable |
| FR-ORC-014 | Release audit trail with evidence and approvals | P0 | 1 | Immutable |
| FR-ORC-015 | Post-release follow-up and support tasks | P1 | 2 | “Did you get everything?” |
| FR-ORC-016 | Post-release access expiry/revocation | P1 | 2 | Time-bound access |
| FR-ORC-017 | Release to professional executor/trustee | P1 | 2 | Scoped professional access |
| FR-ORC-018 | Release rehearsal and “fire drill” mode | P1 | 2 | No real data |
| FR-ORC-019 | Release fee billing (concierge/service) | P1 | 2 | Optional |
| FR-ORC-020 | Release satisfaction survey | P1 | 2 | NPS/feedback |

### 10.9 Emergency pack and release rehearsal

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-EXP-001 | Generate encrypted PDF emergency pack | P0 | 1 | AES-256; PIN-protected |
| FR-EXP-002 | Pack contents: cover sheet, inventory labels, beneficiary instructions, trusted contacts, QR, offline instructions | P0 | 1 | No credentials |
| FR-EXP-003 | User-set PIN; no server-side recovery | P0 | 1 | Explicit warning |
| FR-EXP-004 | No seed phrases, passwords, private keys, or credential values | P0 | 1 | Content validation |
| FR-EXP-005 | Regenerate on vault changes with version and audit | P0 | 1 | Prompt on change |
| FR-EXP-006 | Download/print guidance and safe-storage tips | P0 | 1 | “Fireproof safe/solicitor” |
| FR-EXP-007 | QR code links to release portal with workspace ID | P0 | 1 | Signed, expiring token |
| FR-RHE-001 | Release rehearsal with dummy data | P1 | 2 | End-to-end test |
| FR-RHE-002 | Rehearsal report and readiness score | P1 | 2 | Shareable with family |
| FR-RHE-003 | Beneficiary rehearsal invitation | P1 | 2 | Consent |

### 10.10 Notifications and communications

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-NOT-001 | Transactional email for verification, release, security, billing | P0 | 1 | Branded templates |
| FR-NOT-002 | In-app notification center | P0 | 1 | Read/unread, dismiss |
| FR-NOT-003 | SMS for non-OTP alerts and reminders | P0 | 1 | Opt-in; no sensitive content |
| FR-NOT-004 | Beneficiary communications and reminders | P0 | 1 | Plain language, multilingual |
| FR-NOT-005 | Annual review and stale-plan reminders | P0 | 1 | Escalating cadence |
| FR-NOT-006 | Notification preference center | P1 | 2 | Per channel/type |
| FR-NOT-007 | Bounce/complaint handling and suppression list | P0 | 1 | Deliverability |
| FR-NOT-008 | Localized templates | P1 | 2 | English MVP |
| FR-NOT-009 | Partner webhook notifications | P1 | 2 | Signed, retried |
| FR-NOT-010 | Emergency contact broadcast (duress) | P1 | 2 | Safe-word protocol |

### 10.11 Admin, concierge, and operations console

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-ADM-001 | Admin authentication with SSO/MFA and RBAC | P0 | 1 | Separate admin domain |
| FR-ADM-002 | Customer/workspace lookup with privacy safeguards | P0 | 1 | Reason-for-access prompt |
| FR-ADM-003 | Verification queue with SLA timers | P0 | 1 | Assignment, escalation |
| FR-ADM-004 | Evidence viewer with access logging and no bulk download | P0 | 1 | Watermark, view-only |
| FR-ADM-005 | Decision/approval workflow with four-eyes | P0 | 1 | Approve/reject/escalate |
| FR-ADM-006 | Release case management and ceremony checklist | P0 | 1 | Dual control |
| FR-ADM-007 | Legal hold and dispute management | P0 | 1 | Court reference |
| FR-ADM-008 | Immutable audit log viewer and export | P0 | 1 | Filter by subject/action |
| FR-ADM-009 | Support notes, macros, and customer context | P0 | 1 | No sensitive content |
| FR-ADM-010 | Feature flags and content management | P1 | 2 | Kill switches |
| FR-ADM-011 | Super admin emergency freeze | P0 | 1 | Platform-wide |
| FR-ADM-012 | Dual control for sensitive actions | P0 | 1 | Escrow, legal hold, freeze |
| FR-ADM-013 | Concierge task queue and scripts | P1 | 2 | Setup/release support |
| FR-ADM-014 | SLA and operations dashboards | P1 | 2 | Volume, aging, breaches |
| FR-ADM-015 | Partner management and revenue share | P1 | 2 | Onboarding, commissions |
| FR-ADM-016 | Incident management and status page | P0 | 1 | Security/availability |
| FR-ADM-017 | Refund/credit and billing adjustments | P1 | 2 | Approval limits |

### 10.12 Billing and subscriptions

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-BIL-001 | Plan catalog and entitlement engine | P0 | 1 | Free, Family, Legacy, Business, Concierge |
| FR-BIL-002 | Checkout and payment via Stripe | P0 | 1 | Cards, Apple/Google Pay |
| FR-BIL-003 | Subscription lifecycle: trial, active, past due, canceled, expired | P0 | 1 | Proration |
| FR-BIL-004 | Invoices, receipts, and billing portal | P0 | 1 | VAT/tax fields |
| FR-BIL-005 | Dunning and grace period | P1 | 2 | Avoid locking vaults immediately |
| FR-BIL-006 | Family/business seat management | P1 | 2 | Per-seat pricing |
| FR-BIL-007 | Local payment provider (Paystack/Flutterwave) | P1 | 2 | Nigeria |
| FR-BIL-008 | Revenue reporting and reconciliation | P1 | 2 | Finance |
| FR-BIL-009 | Coupons, referrals, and partner codes | P1 | 2 | Channel tracking |
| FR-BIL-010 | Tax/VAT handling and invoices | P1 | 2 | Jurisdiction-specific |
| FR-BIL-011 | Concierge/service fees | P1 | 2 | One-time invoices |
| FR-BIL-012 | Refund and credit policy controls | P1 | 2 | Approval limits |

### 10.13 Audit, reporting, and analytics

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-AUD-001 | Immutable audit event for all sensitive actions | P0 | 1 | Who, what, when, where, why |
| FR-AUD-002 | Hash-chained audit log with tamper evidence | P0 | 1 | Daily anchor |
| FR-AUD-003 | Audit viewer and export (CSV/JSON) | P0 | 1 | Scoped access |
| FR-AUD-004 | Seven-year retention for audit logs | P0 | 1 | Configurable by jurisdiction |
| FR-AUD-005 | Privacy-preserving product analytics | P0 | 1 | No document content/PII |
| FR-AUD-006 | Operational dashboards: activation, release, SLAs | P1 | 2 | Internal |
| FR-AUD-007 | Compliance report pack | P1 | 2 | DPIA, SOC 2 evidence |
| FR-AUD-008 | Retention and deletion jobs | P0 | 1 | Policy-driven |
| FR-AUD-009 | Anomaly detection and alerting | P2 | 3 | Access/release anomalies |
| FR-AUD-010 | Transparency reporting | P2 | 3 | Public trust |

### 10.14 Compliance, privacy, and data rights

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-DSR-001 | Consent capture with granular purpose and versioning | P0 | 1 | Withdrawable |
| FR-DSR-002 | Privacy policy and terms acceptance with audit | P0 | 1 | Versioned |
| FR-DSR-003 | Data subject access request workflow | P0 | 1 | SLA tracked |
| FR-DSR-004 | Erasure workflow including documents and backups | P0 | 1 | Legal-hold exceptions |
| FR-DSR-005 | Data export in machine-readable format | P0 | 1 | Workspace export |
| FR-DSR-006 | Records of processing activities | P1 | 2 | GDPR/NDPR |
| FR-DSR-007 | Subprocessor list and DPAs | P1 | 2 | Public page |
| FR-DSR-008 | Breach notification workflow | P0 | 1 | 72-hour regulator path |
| FR-DSR-009 | Data residency controls | P2 | 3 | Region selection |
| FR-DSR-010 | Minor/age safeguards and guardian consent | P1 | 2 | COPPA-adjacent |
| FR-DSR-011 | Legal-hold retention override | P0 | 1 | Documented |
| FR-DSR-012 | Cookie/analytics consent | P0 | 1 | Region-aware |

### 10.15 Accessibility, localization, and content

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-L10N-001 | WCAG 2.2 AA compliance | P0 | 1 | Audit before launch |
| FR-L10N-002 | Plain-language content and readability | P0 | 1 | Grade 8 target |
| FR-L10N-003 | Localization framework with externalized strings | P0 | 1 | English MVP |
| FR-L10N-004 | Yoruba, Igbo, Hausa, French (Phase 2+) | P1 | 2 | Professional translation |
| FR-L10N-005 | Responsive/mobile web | P0 | 1 | 360px+ |
| FR-L10N-006 | Low-bandwidth mode and compressed assets | P1 | 2 | Emerging markets |
| FR-L10N-007 | Error, empty, loading, and offline states | P0 | 1 | Plain language |
| FR-L10N-008 | Keyboard/screen-reader support | P0 | 1 | Tested with assistive tech |
| FR-L10N-009 | Timezone, date, currency, and name formats | P1 | 2 | Locale-aware |
| FR-L10N-010 | Content review by legal and cultural reviewer | P0 | 1 | Avoid crypto/legal jargon |

### 10.16 Partner platform and API (Phase 2)

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-PAR-001 | Partner tenant onboarding and KYC/KYB | P1 | 2 | Solicitor/insurer/exchange |
| FR-PAR-002 | Partner roles: admin, adviser, viewer, support | P1 | 2 | Scoped |
| FR-PAR-003 | Client/workspace management and invitations | P1 | 2 | Consent required |
| FR-PAR-004 | White-label branding and custom domain | P1 | 2 | Plan-gated |
| FR-PAR-005 | OAuth2 client credentials and scoped API keys | P1 | 2 | Rotation/revocation |
| FR-PAR-006 | Verification API: create/read cases, upload evidence, receive decisions | P1 | 2 | Idempotent |
| FR-PAR-007 | Release status API and secure delivery links | P1 | 2 | Scoped |
| FR-PAR-008 | Webhooks with HMAC signatures and retries | P1 | 2 | Dead-letter queue |
| FR-PAR-009 | Sandbox environment and API documentation | P1 | 2 | OpenAPI 3.1 |
| FR-PAR-010 | Rate limits, quotas, and usage billing | P1 | 2 | Per partner |
| FR-PAR-011 | Referral and revenue-share tracking | P1 | 2 | Attribution |
| FR-PAR-012 | Partner reporting and client status dashboard | P1 | 2 | No document contents |
| FR-PAR-013 | Partner SSO and SCIM | P2 | 3 | Enterprise |
| FR-PAR-014 | Partner certification and directory listing | P2 | 3 | Trust |

### 10.17 Crypto continuity (Phase 2)

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-CRY-001 | Crypto inventory: wallet type, public address, chain, custodian, instructions | P1 | 2 | No seed/private key fields |
| FR-CRY-002 | Custody partner adapter framework | P1 | 2 | Safe, Fireblocks, Coincover, Casa, Unchained |
| FR-CRY-003 | Multisig/MPC release coordination | P1 | 2 | LifeProof verifier/co-signer, not sole key holder |
| FR-CRY-004 | Beneficiary crypto instructions and checklists | P1 | 2 | Plain language |
| FR-CRY-005 | Proof of custody/attestation | P1 | 2 | Partner-signed |
| FR-CRY-006 | Crypto release rehearsal | P1 | 2 | Testnet/dummy |
| FR-CRY-007 | Partner status and custody dashboard | P1 | 2 | Health/attestations |
| FR-CRY-008 | Jurisdiction/legal gating for crypto release | P1 | 2 | Legal playbook |
| FR-CRY-009 | Prohibit seed phrase/private key storage | P0 | 1 | Absolute constraint |
| FR-CRY-010 | Hardware wallet guidance and affiliate integrations | P2 | 3 | Optional |

### 10.18 Business continuity (Phase 3)

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-BIZ-001 | Business workspace with organization profile | P2 | 3 | SME/enterprise |
| FR-BIZ-002 | Roles: CEO, CFO, COO, board, executor, adviser | P2 | 3 | Permissioned |
| FR-BIZ-003 | Key-person release conditions | P2 | 3 | Role-based |
| FR-BIZ-004 | Multi-beneficiary per role/department | P2 | 3 | Segregation of duties |
| FR-BIZ-005 | Board/executor notifications | P2 | 3 | Escalation |
| FR-BIZ-006 | Business document templates | P2 | 3 | Resolutions, authorizations |
| FR-BIZ-007 | Accountant/solicitor portal | P2 | 3 | Professional channel |
| FR-BIZ-008 | Business audit and compliance reporting | P2 | 3 | Board pack |
| FR-BIZ-009 | Key-person insurance integration | P2 | 3 | Partner |
| FR-BIZ-010 | Business continuity rehearsal | P2 | 3 | Tabletop |

### 10.19 Duress and coercion (Phase 2)

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-DUR-001 | Duress PIN/decoy vault | P1 | 2 | Shows non-sensitive decoy |
| FR-DUR-002 | Panic revoke of sessions/links | P1 | 2 | One-tap |
| FR-DUR-003 | Hidden items and hidden beneficiaries | P1 | 2 | Privacy within families |
| FR-DUR-004 | Coercion risk assessment during onboarding | P1 | 2 | Sensitive, optional |
| FR-DUR-005 | Safe-word verification with trusted contacts | P1 | 2 | Release protection |
| FR-DUR-006 | Legal/ops playbook for suspected coercion | P1 | 2 | Escalation |
| FR-DUR-007 | Silent alarm to trusted contact | P2 | 3 | Consent-based |

### 10.20 Integrations and data portability

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-INT-001 | Password manager integration (1Password/Bitwarden emergency access) | P1 | 2 | Pointers, not secrets |
| FR-INT-002 | Crypto custody partner integrations | P1 | 2 | Phase 2 |
| FR-INT-003 | KYC/identity provider | P0 | 1 | Smile ID/Onfido/Jumio |
| FR-INT-004 | Email/SMS provider | P0 | 1 | Deliverability |
| FR-INT-005 | Payment providers | P0 | 1 | Stripe; Paystack/Flutterwave Phase 2 |
| FR-INT-006 | Object storage and malware scanning | P0 | 1 | S3 + scanner |
| FR-INT-007 | Webhooks/API | P1 | 2 | Partner platform |
| FR-INT-008 | Standard export/import format | P1 | 2 | Portable encrypted JSON/PDF |
| FR-INT-009 | Bank/exchange beneficiary information links | P2 | 3 | Informational |
| FR-INT-010 | Calendar/reminder integrations | P2 | 3 | Annual review |
| FR-INT-011 | E-signature for consents/authorizations | P1 | 2 | Legally appropriate |
| FR-INT-012 | CRM integration for partners | P2 | 3 | HubSpot/Salesforce |

### 10.21 Trust and security program

| ID | Requirement | Priority | Phase | Notes |
|---|---|---|---|---|
| FR-TRUST-001 | Public security whitepaper and architecture overview | P1 | 2 | Trust |
| FR-TRUST-002 | Independent penetration test before launch and annually | P0 | 1 | Remediation tracked |
| FR-TRUST-003 | Bug bounty program | P1 | 2 | HackerOne/Intigriti |
| FR-TRUST-004 | SOC 2 Type II readiness and audit | P1 | 2 | Report Phase 3 |
| FR-TRUST-005 | ISO 27001 certification | P2 | 3 | Enterprise |
| FR-TRUST-006 | Open-source recovery client and format | P1 | 2 | Continuity |
| FR-TRUST-007 | Continuity Trust/legal entity | P0 | 1 | Source/shards/runbooks |
| FR-TRUST-008 | Public transparency report | P2 | 3 | Annual |
| FR-TRUST-009 | Cyber/E&O/crime insurance | P0 | 1 | Before paid releases |
| FR-TRUST-010 | Reproducible builds and code signing | P2 | 3 | High-security tier |
| FR-TRUST-011 | Warrant canary | P2 | 3 | Optional |
| FR-TRUST-012 | Third-party security review of release flow | P0 | 1 | Before launch |

---

## 11. User journeys

### 11.1 Family organiser onboarding

1. Lands on partner-branded or LifeProof page.
2. Chooses “Protect my family.”
3. Creates account with email + passkey/TOTP.
4. Selects family workspace and plan.
5. Completes plain-language onboarding: “What is a vault?” “What happens when you die?” “What we can and cannot see.”
6. Adds first category (Documents) and uploads a will/insurance policy.
7. Invites a beneficiary and trusted contact.
8. Configures release condition and cooling-off.
9. Seals the plan; sees readiness score and next steps.
10. Downloads emergency pack.

**Success:** first sealed item within 10 minutes; beneficiary invited within 24 hours.

### 11.2 Adding a document and linking it

1. User opens category “Documents.”
2. Selects “Upload document.”
3. Drags/drops PDF; sees malware scan and encryption status.
4. Adds label, category, beneficiary assignment, release condition.
5. Links to an insurance vault item.
6. Seals item; audit event recorded.
7. Beneficiary portal shows “Insurance policy — available on release” without contents.

### 11.3 Beneficiary pre-registration

1. User invites beneficiary by email.
2. Beneficiary receives plain-language email and creates account.
3. Completes optional pre-KYC and sets passkey.
4. Sees “What you will receive” summary without contents.
5. Confirms contact details and preferred language.
6. Can ask questions through support/concierge.
7. User sees beneficiary status “Registered and verified.”

### 11.4 Sealing and annual review

1. User completes categories; readiness score reaches “Protected.”
2. System prompts for missing beneficiary/trusted contact.
3. User reviews “what my family will see.”
4. Step-up auth; plan sealed.
5. Annual review reminder; user confirms or updates.
6. If unchanged, audit event; if changed, version history.

### 11.5 Release rehearsal (Phase 2)

1. User selects “Run a rehearsal.”
2. Chooses dummy data or redacted plan.
3. Beneficiary receives rehearsal invitation.
4. Beneficiary completes mock identity check and views redacted items.
5. System produces readiness report: “Your family completed the journey in 12 minutes; 2 items missing instructions.”
6. User fixes gaps.

### 11.6 Death verification and release

1. Claimant (beneficiary/trusted contact/professional) initiates a claim via portal or phone.
2. Ops creates verification case; claimant identity verified via KYC.
3. Evidence checklist: death certificate, ID, proof of relationship, will/probate where available.
4. Trusted contacts attest; professional attestation if available.
5. Ops reviews; fraud checks; decision.
6. Cooling-off period begins; beneficiaries notified; disputes can be raised.
7. Legal hold check; if clear, release case created.
8. Beneficiary re-verifies identity; receives secure session.
9. Documents/instructions released per assignment; checklist and support provided.
10. Release receipt issued; audit log complete; post-release follow-up.

### 11.7 Dispute and legal hold

1. Dispute raised by beneficiary, trusted contact, or professional.
2. Release paused immediately; legal hold applied.
3. Legal reviewer requests evidence; both parties notified.
4. Resolution: release, partial release, or denial with appeal path.
5. Audit log records every action; court reference stored where applicable.

### 11.8 Partner referral and white-label (Phase 2)

1. Solicitor/insurer invites client via partner portal.
2. Client onboards under partner branding.
3. Partner sees status (not contents) and can offer concierge.
4. Partner receives referral fee/revenue share.
5. Partner dashboard reports conversions and client satisfaction.

### 11.9 Annual review and life event

1. User receives annual review reminder.
2. Updates beneficiaries after marriage/birth/divorce.
3. System prompts to regenerate emergency pack.
4. Beneficiary notified of change (without contents).
5. Audit event; readiness score recalculated.

### 11.10 Data export and erasure

1. User requests export or erasure in settings.
2. Identity re-verification.
3. Export generated as encrypted archive; download link expires.
4. Erasure scheduled; legal-hold exceptions explained.
5. Confirmation and audit event.

---

## 12. Data model (conceptual)

The detailed schema is in [`02_ARCHITECTURE.md`](./02_ARCHITECTURE.md). Core entities:

| Entity | Purpose | Key fields |
|---|---|---|
| User | Account identity | id, email, name, locale, auth methods, status |
| Credential | Passkey/password/TOTP | user_id, type, secret_hash/public_key, last_used |
| Session | Active session | user_id, device, ip, expires_at, revoked_at |
| Workspace | Family/business account | id, type, name, plan_id, region, status |
| WorkspaceMember | Membership/role | workspace_id, user_id, role, status |
| Role/Permission | RBAC | role, permission, scope |
| Plan | Product plan | code, name, price, entitlements |
| Subscription | Billing state | workspace_id, plan_id, status, period |
| Invoice | Billing document | subscription_id, amount, tax, status |
| VaultItem | Inventory record | workspace_id, category, type, title, status, release_condition_id |
| ItemVersion | History | item_id, version, changed_by, diff_hash |
| Document | Encrypted file | workspace_id, storage_key, hash, mime, size, scan_status, encryption_key_ref |
| DocumentVersion | File history | document_id, version, storage_key, hash |
| DocumentAccess | Access log | document_id, actor, action, ip, timestamp |
| Beneficiary | Recipient | workspace_id, name, relationship, email, kyc_status, status |
| BeneficiaryAssignment | Item allocation | beneficiary_id, item_id, share, conditions |
| TrustedContact | Verifier/executor/guardian | workspace_id, user_id, role, consent_status |
| ProfessionalPartner | Solicitor/insurer/etc. | partner_id, type, verification_status |
| ReleaseCondition | Trigger rules | item_id/workspace_id, type, cooling_off_days, verifier_ids |
| VerificationCase | Evidence workflow | trigger_id, type, status, claimant_id, assignee, decision |
| VerificationSignal | Evidence/signal | case_id, type, source, confidence, status |
| Evidence | Uploaded proof | case_id, document_id, type, redaction_status |
| ReviewDecision | Human decision | case_id, reviewer_id, outcome, rationale |
| LegalHold | Suspension | case_id/release_id, reason, court_ref, applied_by |
| Dispute | Contest | release_id, claimant, status, resolution |
| ReleaseCase | Release workflow | verification_id, status, cooling_off_end, approver_ids |
| ReleaseAccess | Delivery | release_id, beneficiary_id, item_ids, expires_at |
| ReleaseReceipt | Proof | release_id, delivered_items, acknowledged_at, hash |
| Notification | Comms | recipient, channel, template, status |
| AuditEvent | Immutable log | actor, action, subject, before/after hash, ip, timestamp |
| Consent | Legal consent | user_id, purpose, version, granted_at |
| DataRequest | DSAR/erasure | user_id, type, status, deadline |
| Partner | Channel/API tenant | name, type, status, branding, revenue_share |
| PartnerUser | Partner staff | partner_id, user_id, role |
| ApiKey | Partner credentials | partner_id, scopes, hash, expires_at |
| Webhook | Partner events | partner_id, url, secret, events, status |
| Referral | Attribution | partner_id, workspace_id, code, commission |
| EmergencyPack | Offline pack | workspace_id, version, storage_key, pin_hash |
| Rehearsal | Dry run | workspace_id, status, report |
| SupportTicket | Support | workspace_id, assignee, status, priority |
| Incident | Security/ops | type, severity, status, timeline |
| FeatureFlag | Release control | key, rules, enabled |

---

## 13. State machines

### 13.1 Vault item

| State | Meaning | Allowed transitions |
|---|---|---|
| DRAFT | Being edited; not committed | SEALED, ARCHIVED, DELETED |
| SEALED | Committed; visible to owner and assigned beneficiary summary | UNSEALED (owner, step-up), PENDING_RELEASE, ARCHIVED, DELETED |
| LOCKED | Trigger event; vault under heightened monitoring | PENDING_RELEASE, SEALED (if trigger reversed), LEGAL_HOLD |
| PENDING_RELEASE | Release workflow active | RELEASED, LEGAL_HOLD, SEALED (cancelled) |
| RELEASED | Delivered to beneficiary | ARCHIVED |
| LEGAL_HOLD | Suspended by legal/dispute | PENDING_RELEASE, SEALED |
| EXPIRED | Time-lock expiry without release (if configured) | ARCHIVED |
| REVOKED | Owner deleted/revoked while alive | ARCHIVED |
| ARCHIVED | Hidden from active view; retained per policy | DELETED |

### 13.2 Verification case

| State | Meaning | Allowed transitions |
|---|---|---|
| INITIATED | Claim created | EVIDENCE_PENDING, CANCELLED |
| EVIDENCE_PENDING | Waiting for claimant/trusted contacts | UNDER_REVIEW, CANCELLED |
| UNDER_REVIEW | Ops/legal reviewing | VERIFIED, REJECTED, ESCALATED, LEGAL_HOLD |
| ESCALATED | Senior/legal review | VERIFIED, REJECTED, LEGAL_HOLD |
| VERIFIED | Evidence sufficient | COOLING_OFF (via release case) |
| REJECTED | Insufficient/fraudulent | APPEALED, CLOSED |
| APPEALED | New evidence/review | VERIFIED, REJECTED |
| LEGAL_HOLD | Court/dispute | UNDER_REVIEW, CLOSED |
| CANCELLED | Withdrawn | CLOSED |

### 13.3 Release case

| State | Meaning | Allowed transitions |
|---|---|---|
| CREATED | Verified trigger; release initiated | IDENTITY_PENDING, CANCELLED |
| IDENTITY_PENDING | Beneficiary re-verification | COOLING_OFF, DISPUTED, CANCELLED |
| COOLING_OFF | Dispute window | READY, DISPUTED, LEGAL_HOLD, CANCELLED |
| READY | Cleared for release | RELEASING, LEGAL_HOLD |
| RELEASING | Secure delivery in progress | RELEASED, FAILED, LEGAL_HOLD |
| RELEASED | Delivered and acknowledged | CLOSED |
| DISPUTED | Contest raised | LEGAL_HOLD, READY, REJECTED |
| LEGAL_HOLD | Legal suspension | READY, REJECTED, CLOSED |
| FAILED | Delivery/technical failure | RELEASING, CANCELLED |
| CANCELLED | Aborted | CLOSED |
| CLOSED | Terminal; audit complete | — |

### 13.4 Document

| State | Meaning | Allowed transitions |
|---|---|---|
| UPLOADING | Upload in progress | SCANNING, FAILED |
| SCANNING | Malware/integrity check | AVAILABLE, QUARANTINED, FAILED |
| AVAILABLE | Accessible to authorized users | ARCHIVED, DELETED |
| QUARANTINED | Malware detected | DELETED, UNDER_REVIEW |
| ARCHIVED | Retained, hidden | DELETED |
| DELETED | Soft-deleted; purge scheduled | PURGED |
| FAILED | Upload/scan failure | UPLOADING, DELETED |

### 13.5 Subscription

| State | Meaning | Allowed transitions |
|---|---|---|
| TRIALING | Free trial | ACTIVE, CANCELED |
| ACTIVE | Paid and current | PAST_DUE, CANCELED |
| PAST_DUE | Payment failed; grace period | ACTIVE, CANCELED, SUSPENDED |
| SUSPENDED | Access limited | ACTIVE, CANCELED |
| CANCELED | No renewal; access until period end | EXPIRED |
| EXPIRED | Term ended | ACTIVE (re-subscribe) |

---

## 14. API and integration requirements

### 14.1 API principles

- REST/JSON over HTTPS; OpenAPI 3.1 contract-first.
- Versioned base path `/v1`; additive changes preferred; deprecation policy 6 months.
- OAuth2/OIDC for user sessions; client credentials + scopes for partners.
- `Idempotency-Key` required on all mutating requests.
- `X-Request-Id` propagated; structured error model with codes.
- Cursor pagination; max page size 100.
- Rate limits by plan/partner; `429` with `Retry-After`.
- Webhooks signed with HMAC-SHA256; retries with exponential backoff; dead-letter queue.
- All access scoped to workspace/partner tenant; no cross-tenant queries.
- PII minimized in logs; no document content in logs.

### 14.2 Core endpoints (MVP)

| Domain | Endpoints |
|---|---|
| Auth | `POST /v1/auth/register`, `/login`, `/logout`, `/passkeys`, `/mfa`, `/sessions`, `/recovery` |
| Workspace | `GET/POST /v1/workspaces`, `GET/PATCH /v1/workspaces/{id}`, `POST /members`, `GET /members` |
| Vault | `GET/POST /v1/vault/items`, `GET/PATCH/DELETE /v1/vault/items/{id}`, `POST /seal`, `/unseal`, `GET /categories` |
| Documents | `POST /v1/documents/upload-url`, `POST /v1/documents/{id}/complete`, `GET /v1/documents/{id}`, `GET /download-url`, `DELETE` |
| Beneficiaries | `GET/POST /v1/beneficiaries`, `GET/PATCH/DELETE /{id}`, `POST /invite`, `POST /assignments` |
| Trusted contacts | `GET/POST /v1/trusted-contacts`, `POST /consent`, `POST /verify` |
| Conditions | `GET/POST /v1/release-conditions`, `GET/PATCH /{id}`, `POST /preview` |
| Verification | `POST /v1/verification/cases`, `GET /cases/{id}`, `POST /evidence`, `POST /decision`, `POST /appeal` |
| Release | `POST /v1/releases`, `GET /releases/{id}`, `POST /identity`, `POST /deliver`, `POST /acknowledge`, `POST /dispute` |
| Emergency pack | `POST /v1/emergency-packs`, `GET /{id}/download`, `POST /{id}/regenerate` |
| Notifications | `GET /v1/notifications`, `PATCH /{id}`, `POST /preferences` |
| Billing | `GET /v1/plans`, `POST /v1/checkout`, `GET /v1/subscription`, `GET /invoices` |
| Admin | `GET /v1/admin/verification/cases`, `POST /decision`, `GET /admin/releases`, `POST /legal-hold`, `GET /admin/audit` |
| Health | `GET /health`, `/ready`, `/metrics` (internal) |

### 14.3 Partner API (Phase 2)

Scopes: `verification:read`, `verification:write`, `release:read`, `release:write`, `client:read`, `client:write`, `webhook:manage`, `report:read`.

Events: `workspace.created`, `plan.sealed`, `verification.initiated`, `verification.evidence_required`, `verification.verified`, `verification.rejected`, `release.cooling_off`, `release.ready`, `release.completed`, `release.disputed`, `document.scanned`, `subscription.updated`.

### 14.4 Integration requirements

| Integration | Purpose | Phase | Notes |
|---|---|---|---|
| KYC provider (Smile ID/Onfido/Jumio) | Identity/liveness/sanctions | 1 | Webhook + manual fallback |
| Email provider | Transactional email | 1 | SPF/DKIM/DMARC |
| SMS provider | Alerts (never OTP) | 1 | Opt-in |
| Stripe | Billing | 1 | Tax handling |
| Paystack/Flutterwave | Nigeria billing | 2 | Local methods |
| S3-compatible storage | Documents | 1 | SSE-KMS, versioning, Object Lock optional |
| Malware scanner | Upload security | 1 | ClamAV/managed |
| HSM/KMS | Key wrapping | 1 | AWS KMS/CloudHSM |
| Password managers | Credential pointers | 2 | 1Password/Bitwarden |
| Crypto custody partners | Crypto continuity | 2 | Safe/Fireblocks/Coincover/Casa/Unchained |
| E-signature | Consents/authorizations | 2 | Legally appropriate |
| Analytics | Product metrics | 1 | Privacy-preserving/self-hosted |
| Status page | Incident comms | 1 | Public |

---

## 15. Non-functional requirements

### 15.1 Availability and reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-AVL-001 | Public web/API availability | 99.9% MVP; 99.99% Phase 3 |
| NFR-AVL-002 | Planned maintenance | < 4 hours/month, announced 72h ahead |
| NFR-AVL-003 | RTO | 4 hours |
| NFR-AVL-004 | RPO | 15 minutes |
| NFR-AVL-005 | Backup retention | 35 days daily; 12 months monthly |
| NFR-AVL-006 | DR test | Annually, then semi-annually |
| NFR-AVL-007 | Graceful degradation | Vault read-only if document service degraded |

### 15.2 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-PERF-001 | Page load p95 | < 2.5s on 3G; < 1s on broadband |
| NFR-PERF-002 | API p95 | < 300ms (excluding uploads/KYC) |
| NFR-PERF-003 | Document upload initiation | < 1s |
| NFR-PERF-004 | Document download/preview | < 2s for 10MB on broadband |
| NFR-PERF-005 | Release access | < 2s |
| NFR-PERF-006 | Search | < 200ms for 10k items |
| NFR-PERF-007 | Emergency pack generation | < 30s |
| NFR-PERF-008 | Audit query | < 2s for 1M events (indexed) |

### 15.3 Scale

| ID | Requirement | Phase 1 | Phase 3 |
|---|---|---|---|
| NFR-SCL-001 | Workspaces | 10,000 | 250,000 |
| NFR-SCL-002 | Users | 50,000 | 1,000,000 |
| NFR-SCL-003 | Documents | 500,000 | 20,000,000 |
| NFR-SCL-004 | Verification cases/month | 1,000 | 50,000 |
| NFR-SCL-005 | Concurrent users | 2,000 | 50,000 |

### 15.4 Security and privacy

| ID | Requirement |
|---|---|
| NFR-SEC-001 | TLS 1.2+ everywhere; HSTS; secure cookies |
| NFR-SEC-002 | Encryption at rest with KMS-managed keys; per-document data keys |
| NFR-SEC-003 | Argon2id password hashing; breached-password checks |
| NFR-SEC-004 | Passkeys/WebAuthn; TOTP; no SMS OTP for sensitive operations |
| NFR-SEC-005 | Least privilege, RBAC, tenant isolation, four-eyes for sensitive actions |
| NFR-SEC-006 | Immutable audit logging with hash chain |
| NFR-SEC-007 | SAST, DAST, SCA, secret scanning, dependency policy in CI |
| NFR-SEC-008 | Annual penetration test and pre-launch test |
| NFR-SEC-009 | Vulnerability disclosure and bug bounty |
| NFR-SEC-010 | Incident response plan, tabletop exercises, breach notification |
| NFR-SEC-011 | Data minimization; no document content indexing; PII redaction in logs |
| NFR-SEC-012 | DPA/Subprocessor management; data residency roadmap |
| NFR-SEC-013 | Admin access reason logging and session recording for sensitive actions |
| NFR-SEC-014 | Backup encryption and restore testing |

### 15.5 Accessibility and localization

| ID | Requirement |
|---|---|
| NFR-A11Y-001 | WCAG 2.2 AA |
| NFR-A11Y-002 | Keyboard navigation and screen-reader support |
| NFR-A11Y-003 | Color contrast and focus states |
| NFR-A11Y-004 | Plain-language content (grade 8) |
| NFR-A11Y-005 | Localization-ready strings and RTL readiness |
| NFR-A11Y-006 | Low-bandwidth mode |
| NFR-A11Y-007 | Mobile responsive 360px+ |

### 15.6 Observability and maintainability

| ID | Requirement |
|---|---|
| NFR-OBS-001 | Structured logs with request IDs; no sensitive content |
| NFR-OBS-002 | Metrics, traces, dashboards, and alerts (SLO-based) |
| NFR-OBS-003 | Error tracking and release health |
| NFR-OBS-004 | Feature flags and kill switches |
| NFR-OBS-005 | Runbooks for top 10 incidents |
| NFR-OBS-006 | Documented ADRs and API contracts |
| NFR-OBS-007 | Test coverage targets: domain ≥ 80%, critical paths 100% |
| NFR-OBS-008 | Blue/green or canary deploys with rollback |

---

## 16. Security and privacy requirements

### 16.1 Threat model summary

| Threat | Impact | Controls |
|---|---|---|
| Account takeover | Unauthorized vault access | Passkeys, TOTP, step-up auth, anomaly detection, session revocation |
| Phishing of beneficiary | Fraudulent release | Beneficiary education, signed emails, in-app verification, safe-word, KYC |
| Insider access | Privacy breach | Least privilege, four-eyes, reason-for-access, audit, no bulk download |
| Document malware | Client compromise | Pre-encryption scan, quarantine, MIME validation, size limits |
| Data breach | Reputation/legal | Encryption at rest, KMS, tenant isolation, minimization, pen tests |
| Coercion/duress | Forced access | Duress PIN/decoy, panic revoke, legal hold, safe-word |
| Fraudulent claim | Wrongful release | Multi-signal verification, KYC, cooling-off, disputes, legal review |
| Legal compulsion | Disclosure | Data minimization, jurisdiction playbooks, transparency report |
| Supply chain | Code compromise | SCA, signed builds, dependency policy, code review |
| Platform shutdown | Loss of access | Continuity Trust, open recovery client, export, source escrow |
| Replay/CSRF/SSRF | Unauthorized actions | CSRF tokens, origin checks, signed URLs, allowlists |
| Enumeration | Privacy leak | Rate limits, generic errors, no user enumeration |

### 16.2 Key management

- Per-document data keys generated server-side; wrapped by KMS CMK; rotated annually.
- Optional client-side encryption tier in Phase 2: user master key derived with Argon2id; per-document keys wrapped by master key; recovery shards via SSS/partner.
- No custom crypto.
- HSM/KMS access logged; dual control for key deletion/rotation.
- Key ceremony and recovery runbook before launch.
- Crypto custody partners hold keys/shares; LifeProof never holds seed phrases.

### 16.3 Privacy

- Collect minimum data; purpose limitation.
- No document content indexing or analytics.
- PII redaction in logs and analytics.
- Consent versioning and withdrawal.
- DSAR/erasure within statutory timelines.
- Retention: audit 7 years; documents until deletion/plan expiry + grace; marketing data opt-in.
- Data residency roadmap: UK/EU, Nigeria, Australia.
- Subprocessor transparency and DPAs.

### 16.4 AI and automation

- AI may be used for document classification, drafting help, and fraud signal triage.
- AI must not make final release decisions.
- No sensitive content sent to third-party LLMs without explicit consent and DPA.
- Human review required for any adverse action.
- Model outputs logged and explainable.

---

## 17. Legal and compliance requirements

### 17.1 Product boundaries

- LifeProof is **not** a law firm, not a probate provider, and not a fiduciary adviser.
- LifeProof does not guarantee legal entitlement; it verifies and orchestrates release according to user instructions and applicable law.
- Release does not replace probate or a court order.
- Partner with licensed solicitors/probate providers for legal services.

### 17.2 Launch jurisdiction checklist

- Legal opinion on vault/release model.
- Terms of service, privacy policy, beneficiary terms, professional terms, DPA.
- KYC/AML/sanctions requirements and partner.
- Consumer protection/cooling-off compliance.
- Data protection impact assessment (DPIA).
- Records of processing and subprocessor list.
- Insurance: cyber, E&O, crime, professional indemnity.
- Complaint/dispute procedure.
- Death/incapacity evidence standards.
- Tax treatment of subscriptions and service fees.
- Cross-border data transfer mechanism.
- Company structure and Continuity Trust.

### 17.3 Evidence and release standards

- Death: certified death certificate + claimant ID + relationship/probate evidence where available; trusted contact attestation; professional attestation where possible.
- Incapacity: court order, PoA, medical evidence where lawful, legal review; default off.
- Fraud: duplicate claim checks, identity consistency, velocity, watchlist, sanctions/PEP.
- Legal hold: court order, dispute, probate, regulatory request.
- Minors: guardian/trustee verification; hold until age.
- Cross-border: local counsel and evidence requirements.

### 17.4 Contracts and policies

- Terms of Service (liability caps, service levels, release conditions).
- Privacy Policy and Cookie Policy.
- Beneficiary Terms (identity, confidentiality, acceptable use).
- Professional Partner Terms (scope, data access, revenue share).
- Data Processing Agreement and subprocessor list.
- Security Addendum.
- Incident Response and Breach Notification Policy.
- Acceptable Use and Prohibited Content.
- Complaints and Dispute Resolution Policy.
- Continuity Trust Deed / source escrow agreement.

---

## 18. Analytics and experimentation

### 18.1 North-star metric

**Verified, complete family plans** — workspaces with sealed items, a consented beneficiary, a trusted contact, and a current annual review.

### 18.2 Event taxonomy (examples)

| Event | Properties | Purpose |
|---|---|---|
| `user.signed_up` | source, partner_id, locale | Acquisition |
| `workspace.created` | type, plan | Activation |
| `vault_item.created` | category, type | Activation |
| `vault_item.sealed` | category, time_to_seal | Activation |
| `document.uploaded` | mime, size_bucket, scan_result | Product usage |
| `beneficiary.invited` | relationship | Plan completeness |
| `beneficiary.registered` | kyc_status | Plan completeness |
| `condition.configured` | trigger_type, cooling_off | Readiness |
| `emergency_pack.generated` | version | Trust |
| `review.completed` | items_changed | Retention |
| `verification.initiated` | case_type, source | Release funnel |
| `verification.decision` | outcome, duration | Ops quality |
| `release.completed` | duration, items, beneficiary_type | North star |
| `release.disputed` | reason | Risk |
| `partner.referral` | partner_id, conversion | Channel |

### 18.3 Guardrails

- No document content, credentials, or sensitive PII in analytics.
- Self-hosted or DPA-covered analytics.
- Consent for marketing analytics.
- Experimentation only on non-security-critical surfaces; release/verification logic is not experimentable without legal/security approval.
- Dashboard access role-based.

---

## 19. Release operations (MVP manual playbook)

### 19.1 Roles

| Role | Responsibility |
|---|---|
| Release Manager | Owns case end-to-end; coordinates approvals and communication |
| Verification Analyst | Reviews evidence, contacts trusted contacts, recommends decision |
| Legal Reviewer | Legal hold, disputes, jurisdiction questions, final escalation |
| Concierge | Supports family, collects documents, explains process |
| Super Admin | Emergency freeze, platform incident response |

### 19.2 SLAs

| Stage | Target |
|---|---|
| Claim acknowledgement | ≤ 24 hours |
| Evidence completeness check | ≤ 2 business days |
| Verification decision (complete evidence) | ≤ 5 business days |
| Cooling-off | 14 days default (configurable 14–90) |
| Release after cooling-off | ≤ 2 business days |
| Dispute acknowledgement | ≤ 24 hours |
| Post-release support response | ≤ 1 business day |

### 19.3 Standard operating procedure

1. **Intake:** claim received; create case; verify claimant identity; explain process and timeline.
2. **Evidence:** checklist; secure upload; redact/minimize; verify documents.
3. **Signals:** contact trusted contacts; professional attestation; sanctions/PEP; fraud checks.
4. **Review:** four-eyes decision; document rationale; escalate if uncertain.
5. **Cooling-off:** notify beneficiaries; open dispute window; legal hold check.
6. **Release preparation:** re-verify beneficiary; confirm scope; dual approval.
7. **Release ceremony:** secure session; deliver items; checklist; receipt.
8. **Post-release:** follow-up; support; satisfaction survey; audit close.
9. **Exception handling:** dispute, legal hold, fraud, technical failure, platform outage.

### 19.4 Fraud and coercion controls

- Duplicate claim detection across workspaces.
- Identity consistency checks.
- Velocity limits per claimant/IP/device.
- Sanctions/PEP screening.
- Trusted contact independence checks.
- Safe-word verification (Phase 2).
- Legal hold on any credible dispute.
- Law enforcement escalation procedure.

### 19.5 Communications

- Plain-language templates for claim, evidence, cooling-off, release, dispute.
- Multilingual Phase 2.
- Empathetic tone; no jargon.
- Clear “what happens next” and contact details.
- Never send credentials or sensitive content in email/SMS.

---

## 20. Admin and back office

### 20.1 Admin surfaces

- Verification queue and case detail
- Evidence viewer (view-only, watermarked, access-logged)
- Release case dashboard and ceremony checklist
- Legal hold/dispute console
- Customer/workspace 360 view (metadata only)
- Audit log explorer
- Billing/refund console
- Partner management
- Feature flags/content
- Incident/status management
- SLA and operations dashboards

### 20.2 Access controls

- Separate admin identity domain; SSO + hardware key.
- Role-based permissions; least privilege.
- Reason-for-access required for sensitive views.
- Four-eyes for release, legal hold, freeze, key operations.
- No bulk document download.
- Session recording for sensitive actions (Phase 2).
- Quarterly access reviews.

---

## 21. Pricing and packaging (summary)

Detailed business model in [`05_BUSINESS_GTM_OPERATIONS.md`](./05_BUSINESS_GTM_OPERATIONS.md).

| Plan | Target | Price (indicative) | Includes |
|---|---|---|---|
| Free | Acquisition | $0 | Emergency plan, 3 items, 1 beneficiary, readiness score |
| Family | Core | $99–199/year or $12–19/month | Unlimited items, 5 members, documents up to 500MB, 1 trusted contact, emergency pack, annual review |
| Legacy | Crypto/financial | $199–499/year | Everything in Family + crypto continuity module (Phase 2), priority support, release rehearsal |
| Business | SME | $499–2,499/year | 20 members, role-based access, business continuity, audit export, priority support |
| Concierge | HNW/families | $999+ setup; $1,500+ release | Done-for-you setup, dedicated support, release coordination |
| Partner | Solicitors/insurers/exchanges | Platform fee + per-verification/release | White-label, API, client management, revenue share |

Pricing must be validated with design partners before launch. Local currency and PPP adjustments apply.

---

## 22. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Trust barrier / low conversion | High | High | Channel partners, free plan, concierge, security proof |
| Willingness to pay | High | High | Hybrid pricing, family/business tiers, partner bundles |
| Fraudulent release | Medium | Critical | Multi-signal verification, KYC, cooling-off, legal hold, insurance |
| Legal/regulatory challenge | Medium | Critical | One jurisdiction, legal opinion, partner with licensed firms |
| Data breach | Medium | Critical | Encryption, minimization, audits, pen tests, incident response |
| Company shutdown | Medium | Critical | Continuity Trust, open recovery client, export, source escrow |
| Low activation | High | High | Guided onboarding, concierge, templates, readiness score |
| Stale plans | High | Medium | Annual review, reminders, renewal tracking |
| Scope creep | High | Medium | Kernel decision filters, phase gates |
| Key-person dependency | Medium | High | Documentation, cross-training, advisors |
| Partner channel conflict | Medium | Medium | Clear attribution, revenue share, white-label |
| Competition from incumbents | Medium | High | Verification/legal moat, family+professional network |
| Operational cost per release | Medium | High | Automation roadmap, playbooks, partner scale |
| Brand/trademark conflict | Medium | Medium | Trademark search/rebrand before launch |

---

## 23. Open decisions

| # | Decision | Owner | Needed by |
|---|---|---|---|
| 1 | Launch market: UK vs. Nigeria | Founders | Phase 0 |
| 2 | Rebrand vs. license “LifeProof” | Founders/Legal | Phase 0 |
| 3 | Document encryption: KMS envelope vs. client-side | CTO/Security | Phase 0 |
| 4 | Entity structure and Continuity Trust | Founders/Legal | Phase 1 |
| 5 | Crypto custody partners | Product/Partnerships | Phase 2 |
| 6 | Pricing and packaging | Founders/GTM | Phase 0 |
| 7 | Concierge in-house vs. outsourced | COO | Phase 1 |
| 8 | Insurance provider/coverage | Legal/Finance | Phase 1 |
| 9 | Partner revenue-share model | GTM | Phase 2 |
| 10 | Automated registry integrations | Product/Legal | Phase 3 |
| 11 | Mobile app vs. PWA | Product | Phase 2 |
| 12 | AI use cases and governance | Product/Legal | Phase 2 |

---

## 24. MVP launch checklist

### Product and engineering
- [ ] All P0 requirements implemented and tested
- [ ] End-to-end release rehearsal with dummy data
- [ ] Damage/incident runbooks and on-call
- [ ] Backups and restore tested
- [ ] DR test completed
- [ ] Feature flags and kill switches
- [ ] Status page and incident comms
- [ ] Analytics and dashboards
- [ ] Accessibility audit (WCAG 2.2 AA)
- [ ] Performance test at target scale
- [ ] Browser/device matrix tested

### Security
- [ ] Threat model reviewed
- [ ] Penetration test passed and remediated
- [ ] SAST/DAST/SCA clean or accepted
- [ ] Secrets management and key ceremony
- [ ] Admin access review
- [ ] Incident response tabletop
- [ ] Bug bounty/disclosure policy
- [ ] Insurance in place

### Legal and compliance
- [ ] Legal opinion for launch jurisdiction
- [ ] Terms, privacy, DPA, beneficiary terms
- [ ] DPIA and records of processing
- [ ] KYC/AML/sanctions partner live
- [ ] Complaints/dispute procedure
- [ ] Continuity Trust/escrow established
- [ ] Trademark/brand clearance

### Operations
- [ ] Verification/release SOP and scripts
- [ ] SLAs and escalation matrix
- [ ] Concierge training
- [ ] Support macros and knowledge base
- [ ] Evidence standards and checklists
- [ ] Fraud/coercion playbook
- [ ] Partner onboarding pack (Phase 2)

### Commercial
- [ ] Pricing validated with design partners
- [ ] Billing and invoicing tested
- [ ] Partner agreements
- [ ] Launch marketing and content
- [ ] Referral tracking
- [ ] Customer success plan

---

## 25. Appendices

### 25.1 Glossary

| Term | Definition |
|---|---|
| Vault | The family's inventory of documents, instructions, pointers, beneficiaries, and conditions |
| Control plane | LifeProof's metadata/orchestration layer; does not hold secrets |
| Data plane | The systems that hold actual secrets/assets (password managers, custody partners, banks) |
| Release | The verified, auditable delivery of access to the intended beneficiary |
| Verification case | The evidence and review workflow that determines whether a trigger is valid |
| Release case | The workflow that delivers access after verification and cooling-off |
| Trusted contact | A person nominated to attest, verify, execute, or support a release |
| Beneficiary | A person/entity designated to receive access |
| Cooling-off | Mandatory waiting period before release, allowing disputes |
| Legal hold | Suspension of release due to court order, dispute, or legal review |
| Emergency pack | Encrypted offline summary of the plan, without secrets |
| Release rehearsal | A dry run of the beneficiary journey with dummy data |
| Continuity Trust | A separate legal structure that preserves recovery capability if the company fails |
| Partner | A solicitor, insurer, exchange, employer, or other channel/API customer |
| Concierge | Human-assisted setup and release service |
| P0/P1/P2 | Priority/phase labels for requirements |

### 25.2 Requirement-to-epic traceability

| Requirement group | Primary epics |
|---|---|
| FR-AUTH | E02 Identity & access |
| FR-WS | E03 Workspace & onboarding |
| FR-INV | E04 Vault inventory |
| FR-DOC | E05 Document vault |
| FR-BEN | E06 Relationships |
| FR-REL | E07 Conditions |
| FR-VER | E08 Verification |
| FR-ORC | E09 Release orchestration |
| FR-EXP/RHE | E10 Emergency pack & rehearsal |
| FR-NOT | E11 Notifications |
| FR-ADM | E12 Admin & ops |
| FR-BIL | E13 Billing |
| FR-AUD | E14 Audit & analytics |
| FR-DSR | E15 Compliance & privacy |
| FR-L10N | E16 Accessibility & localization |
| FR-PAR | E17 Partner platform |
| FR-CRY | E18 Crypto continuity |
| FR-BIZ | E19 Business continuity |
| FR-DUR | E20 Duress |
| FR-INT | E21 Integrations |
| FR-TRUST | E22 Trust & security program |

### 25.3 Source documents

- `00_STRATEGY_KERNEL.md`
- `02_ARCHITECTURE.md`
- `03A_EPICS_MVP.md`
- `03B_EPICS_PHASE2_3.md`
- `04_DELIVERY_PLAN.md`
- `05_BUSINESS_GTM_OPERATIONS.md`
- Original: `LifeProof_Blockchain_Vault_Security_PRD_v1.1 copy.docx`

---

**End of PRD v2.0**
