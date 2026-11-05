# LifeProof — Delivery Plan v1.0

**Status:** Build-ready
**Date:** 5 November 2026
**Scope:** Phase 0 validation through Phase 1 MVP launch, with Phase 2/3 outline
**Companion:** [`03A_EPICS_MVP.md`](./03A_EPICS_MVP.md), [`03B_EPICS_PHASE2_3.md`](./03B_EPICS_PHASE2_3.md), [`02_ARCHITECTURE.md`](./02_ARCHITECTURE.md)

---

## 1. Delivery objectives

1. Prove the **release loop** end-to-end with real users and real evidence.
2. Launch a documents-first family vault in **one jurisdiction**.
3. Build the **verification and release engine** as the core platform.
4. Establish the **partner-ready** API and admin foundations.
5. Meet the security, legal, and operational bar required to ask families for their most important information.

**Non-objective:** feature breadth. A smaller product that completes a trustworthy release is better than a larger product that cannot.

---

## 2. Team and roles

### Core team (MVP)

| Role | FTE | Responsibilities |
|---|---|---|
| Founder/CEO | 1 | Strategy, partnerships, fundraising, legal/insurance |
| Product Manager | 1 | Roadmap, requirements, prioritization, acceptance |
| Tech Lead/Architect | 1 | Architecture, security design, code quality, technical decisions |
| Full-stack Engineer | 3 | Web, API, workers, integrations |
| Security Engineer | 1 | Threat model, secure SDLC, pen test coordination, incident response |
| Product Designer | 1 | UX, design system, accessibility, content |
| QA Engineer | 1 | Test strategy, automation, release gates |
| DevOps/SRE | 0.5 | Infrastructure, CI/CD, observability, DR |
| Ops/Release Manager | 1 | Verification/release SOP, SLAs, concierge, training |
| Legal/Compliance Advisor | 0.5 | Contracts, DPIA, jurisdiction, disputes |
| Customer Success/Concierge | 1 | Design partner onboarding, support, feedback |

**Total:** ~11 FTE (with part-time roles).

### Extended/advisory

- External penetration test firm.
- External legal counsel in the launch jurisdiction.
- Insurance broker (cyber/E&O/crime).
- Fractional CFO (Phase 2).
- Partner success manager (Phase 2).

### RACI (summary)

| Workstream | PM | Tech Lead | Security | Design | QA | Ops | CEO |
|---|---|---|---|---|---|---|---|
| Product scope | A/R | C | C | C | I | C | I |
| Architecture | C | A/R | C | I | I | I | I |
| Security | C | C | A/R | I | C | C | I |
| UX/accessibility | C | C | I | A/R | C | C | I |
| Delivery | A/R | R | C | C | R | C | I |
| Launch | A | C | C | C | C | A/R | A |
| Legal/insurance | C | I | C | I | I | C | A/R |
| Partners | R | C | C | C | I | C | A |

A = accountable, R = responsible, C = consulted, I = informed.

---

## 3. Phase 0 — Validate and design (weeks 1–4)

### Objectives

- Validate the launch market and beachhead.
- Secure legal opinion and insurance path.
- Sign 3–5 design partners.
- Complete architecture and threat model review.
- Decide brand/trademark.
- Build a concierge prototype (no code or low-code) to test the release journey.

### Deliverables

| Deliverable | Owner | Exit criteria |
|---|---|---|
| Market/beachhead decision | CEO/PM | One jurisdiction and one primary segment chosen |
| Legal opinion | Legal | Vault/release model acceptable; risks documented |
| Design partners | CEO | 3–5 signed LOIs or letters of intent |
| Architecture review | Tech Lead | ADRs approved; security review complete |
| Threat model v1 | Security | Top risks and controls documented |
| Brand/trademark | CEO/Legal | Search complete; rebrand decision made |
| Concierge prototype | PM/Ops | 5 families/SMEs walked through a manual release rehearsal |
| Pricing hypothesis | CEO/PM | 3 price points tested with partners |
| Insurance quotes | CEO | Cyber/E&O/crime quotes obtained |
| MVP backlog refined | PM | P0 stories estimated and prioritized |

### Phase 0 gate (M0)

- Legal opinion is acceptable.
- At least 3 design partners committed.
- Architecture and threat model approved.
- Brand decision made.
- MVP scope and budget approved.
- No unresolved blocker that would invalidate the model.

**If the gate fails:** do not start build. Change market, model, or scope.

---

## 4. Phase 1 — MVP (weeks 5–28, 12 sprints)

### Assumptions

- 2-week sprints.
- Team velocity stabilizes at ~40–50 story points per sprint after sprint 2.
- Product designer and PM available full-time.
- Legal/ops available part-time but responsive.
- Design partners available for weekly feedback.
- No major vendor procurement delays (KYC, payments, storage).

### Sprint plan

| Sprint | Weeks | Goal | Primary epics/stories | Exit criteria |
|---|---|---|---|---|
| **S1** | 5–6 | Foundation + auth | E01 (US-001–006), E02 (US-010–011, US-013–014) | CI/CD, environments, signup/login, MFA, observability |
| **S2** | 7–8 | Workspace + first vault | E02 (US-012, US-015–017), E03 (US-020–025), E04 (US-030–031) | Passkeys, RBAC, workspace, onboarding, category dashboard, create item |
| **S3** | 9–10 | Seal + upload | E04 (US-032–038), E05 (US-040–042) | Dynamic forms, secret blocking, seal/unseal, upload, scan, encryption |
| **S4** | 11–12 | Documents + relationships | E05 (US-043–047), E06 (US-050–053) | Document metadata/preview/audit, beneficiaries, trusted contacts |
| **S5** | 13–14 | Conditions + verification start | E06 (US-054–056), E07 (US-060–065), E08 (US-070–071) | Assignments, conditions, preview, verification case, evidence |
| **S6** | 15–16 | Verification + admin start | E08 (US-072–079), E12 (US-120–122) | KYC, attestation, review, decisions, legal hold, admin auth, evidence viewer |
| **S7** | 17–18 | Release orchestration | E09 (US-090–093, US-097), E12 (US-123–124) | Release case, cooling-off, re-verification, secure session, dual approval |
| **S8** | 19–20 | Release delivery + emergency pack | E09 (US-094–096, US-098–099), E10 (US-100–103) | Delivery, receipt, dispute, partial release, emergency pack |
| **S9** | 21–22 | Notifications, billing, audit foundation | E11 (US-110–114), E13 (US-130–135), E14 (US-140–142) | Notifications, billing, audit events, hash chain |
| **S10** | 23–24 | Compliance, analytics, admin completion | E14 (US-143–145), E15 (US-150–155), E12 (US-125–129) | Analytics, retention, DSAR/erasure, audit export, admin dual control |
| **S11** | 25–26 | Accessibility, trust, security hardening | E16 (US-160–165), E22 (US-180–185) | WCAG 2.2 AA, pen test remediation, DR test, performance, Continuity Trust, security whitepaper |
| **S12** | 27–28 | UAT, launch, buffer | Launch checklist, design-partner UAT, final remediation | Launch readiness review, public launch, 15% buffer |

### Sprint cadence

- **Monday:** sprint planning (90 min).
- **Daily:** 15-min stand-up.
- **Wednesday:** design/security review as needed.
- **Thursday:** backlog refinement (60 min).
- **Friday:** demo (30 min) + retrospective (45 min).
- **Bi-weekly:** steering update (CEO/PM/Tech Lead).
- **Weekly:** design partner feedback session.

### Capacity and velocity

| Sprint | Planned points | Notes |
|---|---|---|
| S1 | 30 | Setup overhead |
| S2 | 40 | Ramp-up |
| S3–S10 | 45–50 | Steady state |
| S11 | 40 | Hardening, remediation |
| S12 | 30 | Launch, UAT, buffer |

**Buffer:** 15% per sprint for bugs, security, and partner feedback. Do not fill to 100%.

---

## 5. Milestones and gates

| Milestone | When | Gate criteria | Decision |
|---|---|---|---|
| **M0 — Validation** | End week 4 | Legal opinion, 3+ design partners, architecture/threat model, brand | Go/no-go for build |
| **M1 — Internal alpha** | End sprint 3 (week 10) | Signup, workspace, first sealed item, document upload | Continue; demo to design partners |
| **M2 — Private beta** | End sprint 5 (week 14) | Beneficiaries, conditions, verification case, evidence | Invite 10 design-partner families |
| **M3 — Release rehearsal** | End sprint 7 (week 18) | Full release with dummy data, dual approval, receipt | Prove release loop; fix gaps |
| **M4 — Security gate** | End sprint 11 (week 26) | Pen test critical/high closed, DR test, accessibility audit | Launch readiness review |
| **M5 — Public launch** | End sprint 12 (week 28) | Launch checklist complete, first paying customers | Public availability |
| **M6 — First real release** | Within 90 days post-launch | Real family, real evidence, completed release | Validate the model |

### Launch readiness review (M4/M5)

Attendees: CEO, PM, Tech Lead, Security, Ops, Legal, QA, Design.
Checklist: `01_PRD.md` section 24.
Decision: **go / conditional go / no-go**. Conditional go requires named owners and dates for open items.

---

## 6. Testing strategy

### Test pyramid

| Layer | Scope | Owner | Gate |
|---|---|---|---|
| Unit | Domain logic, policies, validators | Engineers | Every PR |
| Integration | API + Postgres + RLS + queues | Engineers/QA | Every PR |
| Contract | OpenAPI compatibility | Engineers | Every PR |
| E2E | Core journeys (signup → release) | QA | Every sprint |
| Security | SAST/DAST/SCA, pen test | Security | Every PR + pre-launch |
| Performance | Target load, upload, release access | QA/DevOps | Pre-launch |
| Accessibility | WCAG 2.2 AA | Design/QA | Pre-launch |
| UAT | Design partners, ops | PM/Ops | M2/M3/M5 |
| DR | Restore/failover | DevOps | M4 |

### Critical E2E journeys

1. Sign up → create workspace → add/seal item.
2. Upload document → scan → preview/download.
3. Invite beneficiary/trusted contact → consent.
4. Configure condition → preview → pause/cancel.
5. Initiate verification → evidence → KYC → decision.
6. Create release → cooling-off → re-verify → deliver → receipt.
7. Dispute/legal hold → suspend → resolve.
8. Generate emergency pack → open with PIN.
9. Admin queue → evidence → dual approval.
10. Billing checkout → subscription → invoice.

### Test data

- Synthetic families, documents, and cases.
- No production data in non-prod.
- Anonymization pipeline if production-like data is needed.
- Separate test KYC/payment credentials.

### Release gates

- All P0 stories accepted.
- Critical E2E green.
- No open critical/high security findings.
- Accessibility audit passed.
- Performance targets met.
- DR test passed.
- Runbooks and on-call ready.

---

## 7. Release management

### Environments

| Environment | Purpose | Deploy | Data |
|---|---|---|---|
| `dev` | Feature work | On merge | Synthetic |
| `staging` | Integration/UAT | On release candidate | Synthetic |
| `prod` | Live | Approved release | Real |
| `preview` | PR review | Per PR | Synthetic |

### Branching and deployment

- Trunk-based development with short-lived branches.
- Feature flags for incomplete work.
- Blue/green or canary deploy; automatic rollback on health failure.
- Migrations expand/contract; no destructive migration in the same release.
- Release notes and changelog.
- Post-deploy smoke tests and synthetic checks.

### Change control

- Standard changes: normal PR + CI.
- High-risk changes (auth, encryption, release, billing): tech lead + security review.
- Emergency changes: incident commander approval, retrospective within 48 hours.
- Database changes: DBA/tech lead review; backup verified.

### Incident management

- Severity levels SEV1–SEV4.
- Incident commander, communications lead, scribe.
- Status page updates.
- Post-incident review within 5 business days.
- Action items tracked to closure.

---

## 8. Risk register

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Legal model rejected in launch jurisdiction | Medium | Critical | Phase 0 legal opinion; fallback market; partner with licensed firm | CEO/Legal |
| R2 | Design partners do not convert | Medium | High | 5 LOIs; concierge pilot; pricing tests | CEO |
| R3 | Release loop has a critical flaw | Medium | Critical | Rehearsal, pen test, tabletop, manual ops | Tech Lead/Ops |
| R4 | Fraudulent release | Medium | Critical | Multi-signal verification, KYC, cooling-off, legal hold, insurance | Security/Ops |
| R5 | Low activation | High | High | Guided onboarding, concierge, templates, readiness score | PM/Design |
| R6 | Scope creep delays launch | High | High | Kernel decision filters, phase gates, change control | PM |
| R7 | Key hire/role gap | Medium | High | Advisors, contractors, documentation | CEO |
| R8 | Vendor delay (KYC/payments) | Medium | Medium | Early procurement, fallback providers | Tech Lead |
| R9 | Security incident | Medium | Critical | Threat model, pen test, monitoring, incident response | Security |
| R10 | Cost overrun | Medium | High | 15% buffer, monthly budget review, phased hiring | CEO |
| R11 | Partner API complexity | Medium | Medium | API-first design, sandbox, design partners | Tech Lead |
| R12 | Brand/trademark conflict | Medium | Medium | Search in Phase 0; rebrand if needed | CEO/Legal |
| R13 | Ops cannot scale releases | Medium | High | SOP, training, automation roadmap, SLAs | Ops |
| R14 | Data loss | Low | Critical | Backups, DR tests, immutable audit | DevOps |
| R15 | Company continuity | Low | Critical | Continuity Trust, open recovery, source escrow | CEO/Legal |

---

## 9. Budget (MVP, 7 months)

### Estimated costs

| Category | Low | High | Notes |
|---|---|---|---|
| Team salaries/contractors | $525k | $760k | 11 FTE for 7 months, blended |
| Legal/compliance | $30k | $60k | Opinion, contracts, DPIA |
| Pen test/security | $25k | $50k | Pre-launch + retest |
| Insurance | $10k | $25k | Cyber/E&O/crime |
| Infrastructure | $10k | $25k | AWS, vendors, monitoring |
| KYC/payment/email vendors | $10k | $25k | Usage-based |
| Design/brand | $10k | $25k | Brand, website, content |
| Contingency (15%) | $93k | $145k | |
| **Total** | **$715k** | **$1.12M** | |

### Post-launch annual run rate

- Team: $1.2–1.8M/year.
- Infrastructure/vendors: $60–150k/year.
- Legal/insurance/audit: $80–150k/year.
- GTM: $200–500k/year.
- **Total:** ~$1.5–2.6M/year depending on growth.

### Funding options

- Bootstrap via concierge/white-label revenue.
- Seed round $1.5–3M for 18–24 months.
- Strategic partner investment (insurer/solicitor network).

---

## 10. Governance

### Decision rights

| Decision | Owner | Consulted |
|---|---|---|
| Scope/priority | PM | CEO, Tech Lead |
| Architecture | Tech Lead | Security, PM |
| Security exception | Security + Tech Lead | CEO |
| Legal/compliance | Legal | CEO, PM |
| Launch go/no-go | CEO | PM, Tech Lead, Security, Ops, Legal |
| Budget | CEO | PM |
| Partnership | CEO | PM |

### Change control

- Scope changes require a written change request with impact on timeline/cost.
- P0 scope is frozen after sprint 5.
- New P1/P2 ideas go to the backlog, not the sprint.
- Emergency changes require incident commander approval.

### Reporting

- Weekly: sprint progress, risks, decisions, metrics.
- Monthly: budget, roadmap, partner pipeline, security posture.
- Quarterly: strategy review against the kernel.

---

## 11. KPIs and health metrics

### Delivery health

| Metric | Target |
|---|---|
| Sprint predictability | ≥ 80% of committed points delivered |
| Defect escape rate | < 5% of stories |
| Build success rate | ≥ 95% |
| Deployment frequency | ≥ 2/week by sprint 5 |
| Mean time to restore | < 1 hour |
| Open critical vulnerabilities | 0 |

### Product health

| Metric | Target (month 3 post-launch) |
|---|---|
| Activation (first sealed item) | ≥ 40% |
| Plan completeness | ≥ 60% of paying workspaces |
| Annual review | ≥ 50% |
| Release success | ≥ 95% |
| Time to release | ≤ 14 days |
| Beneficiary NPS | ≥ 50 |
| Support cost/release | ≤ $250 |

### Commercial health

| Metric | Target (month 6 post-launch) |
|---|---|
| Paying families | 200–500 |
| ARR | $100k–300k |
| Active channel partners | 3 |
| Partner-sourced revenue | ≥ 20% |
| CAC payback | ≤ 12 months |

---

## 12. Phase 2 and 3 outline

### Phase 2 (months 7–12)

- Partner portal, white-label, verification API.
- Crypto continuity via 1–2 custody partners.
- Duress/coercion features.
- PWA/mobile capture.
- Release rehearsal, emergency card, renewal reminders.
- SOC 2 Type II readiness.
- 3–5 partner integrations.

**Exit:** 3 partners live; 1,000 paying families; crypto pilot with zero secret storage; SOC 2 readiness.

### Phase 3 (months 13–24)

- Partner API GA; insurer/exchange integrations.
- Business continuity and accountant/solicitor portal.
- Multi-jurisdiction legal playbooks.
- Native mobile apps.
- ISO 27001; SOC 2 Type II report.
- Verification network and registry integrations.

**Exit:** 5,000 paying families; 20k B2B seats; $2M ARR; 3 jurisdictions; 10+ partners.

---

## 13. 90-day post-launch plan

| Days | Focus | Actions |
|---|---|---|
| 0–30 | Stabilize | Onboard first 50 families; daily ops stand-up; fix activation friction; monitor release SLAs |
| 31–60 | First releases | Complete 3–5 real releases; publish learnings; refine evidence/ops; NPS interviews |
| 61–90 | Channel | Sign 2–3 channel partners; launch referral program; validate pricing; prepare Phase 2 partner API |

**Success at 90 days:** 3–5 successful releases, ≥ 100 paying families, ≥ 2 channel partners, no security incidents, NPS ≥ 50.

---

## 14. Dependencies and assumptions

### External dependencies

- Legal opinion and contracts in launch jurisdiction.
- KYC provider contract and sandbox.
- Payment provider account.
- Cloud/KMS/HSM access.
- Insurance quotes.
- Design partners and their clients.
- Pen test firm availability.
- Brand/trademark clearance.

### Assumptions

- The launch market has a viable channel and willingness to pay.
- Families will complete setup with concierge help.
- Manual verification/release is acceptable for the first 50 cases.
- Crypto is not required for MVP revenue.
- The team can hire/contract the required security and legal expertise.
- The company can operate for 18 months on the planned budget.

---

## 15. Definition of success

The delivery plan succeeds when:

- A real family completes a real release, end-to-end, with evidence, dual approval, cooling-off, and a receipt.
- A channel partner refers or white-labels the service.
- The platform is auditable, secure, and legally defensible.
- The team can operate the release loop repeatedly without engineering intervention.
- The business has a credible path to partner-sourced revenue.

---

**End of Delivery Plan v1.0**
