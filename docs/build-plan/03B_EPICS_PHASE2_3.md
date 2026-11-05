# LifeProof Phase 2 & 3 — Epics & User Stories

**Status:** Build-ready backlog (post-MVP)
**Date:** 5 November 2026
**Scope:** Partner platform, crypto continuity, business continuity, duress, integrations, mobile, trust program, living-value features
**Companion:** [`03A_EPICS_MVP.md`](./03A_EPICS_MVP.md), [`04_DELIVERY_PLAN.md`](./04_DELIVERY_PLAN.md)

---

## How to use this backlog

- These stories are **not** MVP scope. Do not start them until the MVP release loop is proven and the entry criteria below are met.
- **Priority:** P1 = Phase 2; P2 = Phase 3; P3 = future.
- **Estimate:** Fibonacci story points for a mature team.
- Every story must pass the decision filters in [`00_STRATEGY_KERNEL.md`](./00_STRATEGY_KERNEL.md).

### Phase 2 entry criteria

- At least 5 successful paid releases completed with no integrity incident.
- Legal opinion and insurance in place for the launch jurisdiction.
- Pen test critical/high findings closed.
- Partner design partners (2–3) signed LOIs.
- Crypto custody partner shortlist and legal review complete.
- SOC 2 readiness started.

### Phase 3 entry criteria

- Phase 2 partner API used by at least 3 partners in production.
- Release success ≥ 95% and dispute rate < 2%.
- Multi-jurisdiction legal playbooks approved.
- Business continuity design partners validated.
- Team and support model able to handle 10× volume.

---

## Epic map

| Epic | Name | Phase | Stories |
|---|---|---|---|
| E17 | Partner platform & API | 2 | 11 |
| E18 | Crypto continuity | 2 | 8 |
| E19 | Business continuity | 3 | 9 |
| E20 | Duress & coercion | 2 | 6 |
| E21 | Integrations & data portability | 2–3 | 6 |
| E22 | Trust & security program expansion | 2–3 | 6 |
| E23 | Mobile & PWA | 2–3 | 6 |
| E24 | Living-value features | 2 | 6 |

---

# E17 — Partner platform and API

**Goal:** Let solicitors, insurers, exchanges, employers, and accountants sell, manage, and integrate LifeProof under their brand.
**Success:** 3 partners live; ≥ 30% of new revenue partner-sourced; partner API uptime ≥ 99.9%.

### US-200 — Partner tenant onboarding and KYB
**Epic:** E17 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-120, US-130

As a partner, I want to onboard my organization so I can offer LifeProof to clients.

**Acceptance criteria**
- Given a partner application, when submitted, then KYB, ownership, and sanctions checks are recorded.
- Given approval, when the tenant is created, then the partner admin can invite users and configure branding.
- Given a rejection, when it occurs, then the reason is recorded and the applicant is notified.

### US-201 — Partner roles and SSO
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-200

As a partner admin, I want roles and SSO so my team can work securely.

**Acceptance criteria**
- Given partner roles (admin, adviser, viewer, support), when assigned, then permissions are enforced.
- Given SSO configuration, when enabled, then partner users authenticate through their IdP.
- Given a role change, when it occurs, then access updates immediately and is audited.

### US-202 — Client invitation and consent
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-200, US-051

As an adviser, I want to invite a client so they can create a plan with my support.

**Acceptance criteria**
- Given a client invitation, when sent, then the client receives a branded link and must consent to partner access.
- Given consent, when granted, then the partner can see status (not contents) within the agreed scope.
- Given withdrawal, when the client revokes consent, then partner access ends immediately.

### US-203 — White-label branding
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-200

As a partner, I want my brand on the client experience so it feels like my service.

**Acceptance criteria**
- Given partner settings, when I upload logo/colors/domain, then the client portal reflects the branding.
- Given a custom domain, when configured, then TLS and DNS verification are handled.
- Given branding, when it is applied, then LifeProof security/legal disclosures remain visible.

### US-204 — OAuth2 API keys and scopes
**Epic:** E17 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-200

As a partner developer, I want scoped API credentials so I can integrate safely.

**Acceptance criteria**
- Given a client, when I create credentials, then I select scopes and receive a secret once.
- Given a key, when it is used, then scope and tenant are enforced on every request.
- Given rotation/revocation, when performed, then old credentials stop working immediately.

### US-205 — Verification API
**Epic:** E17 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-204, US-070

As a partner, I want to create and track verification cases via API so I can embed LifeProof in my workflow.

**Acceptance criteria**
- Given a case request, when submitted, then a case is created idempotently and a case ID is returned.
- Given evidence, when uploaded via API, then it is linked and status is queryable.
- Given a decision, when made, then the partner receives a signed webhook and can fetch the outcome.

### US-206 — Release status API and secure delivery
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-205, US-090

As a partner, I want release status and secure delivery links so I can coordinate with beneficiaries.

**Acceptance criteria**
- Given a release, when the partner queries, then they see status, cooling-off, and blockers (no contents).
- Given delivery, when the beneficiary is verified, then a short-lived secure link is issued.
- Given a legal hold, when it applies, then the API returns the hold and no delivery link.

### US-207 — Webhooks and signing
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-204

As a partner developer, I want webhooks so I can react to events without polling.

**Acceptance criteria**
- Given a subscribed event, when it occurs, then a signed webhook is delivered within 60 seconds.
- Given a non-2xx response, when it occurs, then retries use exponential backoff and a DLQ.
- Given a replay, when the timestamp is outside tolerance, then the request is rejected.

### US-208 — Sandbox and API documentation
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-205

As a partner developer, I want a sandbox and docs so I can integrate quickly.

**Acceptance criteria**
- Given the developer portal, when I open it, then I see OpenAPI docs, examples, and error codes.
- Given a sandbox key, when I call the API, then I can create test cases without real data.
- Given a breaking change, when planned, then a deprecation notice and migration guide are published.

### US-209 — Referral and revenue-share tracking
**Epic:** E17 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-200, US-131

As a partner, I want referral tracking and revenue share so I am paid correctly.

**Acceptance criteria**
- Given a referral code/link, when a client converts, then attribution is recorded.
- Given a commission rule, when a payment succeeds, then the partner ledger is updated.
- Given a payout period, when it closes, then a statement is generated and auditable.

### US-210 — Partner reporting
**Epic:** E17 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-209

As a partner, I want a dashboard so I can see client status and conversion.

**Acceptance criteria**
- Given my clients, when I open the dashboard, then I see status, plan completeness, and conversions (no contents).
- Given a date range, when I filter, then the metrics update and can be exported.
- Given a privacy restriction, when I view, then I cannot see document contents or beneficiary secrets.

---

# E18 — Crypto continuity

**Goal:** Help crypto-holding families without LifeProof holding seed phrases or private keys.
**Success:** 3 custody partners integrated; zero seed/private-key storage; crypto release rehearsal passed.

### US-220 — Crypto inventory without secrets
**Epic:** E18 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-031, US-032

As a crypto holder, I want to inventory my wallets and custody arrangements without exposing keys.

**Acceptance criteria**
- Given a wallet, when I add it, then I can record wallet type, public address, chain, custodian, and instructions.
- Given a field, when it resembles a seed phrase/private key, then the save is blocked.
- Given an inventory, when I preview, then my family sees instructions, not secrets.

### US-221 — Custody partner adapter framework
**Epic:** E18 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-220, US-204

As an engineer, I want a custody adapter framework so we can integrate multiple partners without rewriting.

**Acceptance criteria**
- Given a partner adapter, when implemented, then it conforms to a standard interface (status, attestation, release).
- Given partner credentials, when stored, then they are encrypted and scoped.
- Given a partner outage, when it occurs, then the system degrades gracefully and alerts ops.

### US-222 — Multisig/MPC release coordination
**Epic:** E18 · **Priority:** P1 · **Estimate:** 13 · **Dependencies:** US-221, US-090

As a release manager, I want to coordinate a crypto release with a custody partner so the family can access assets safely.

**Acceptance criteria**
- Given a verified release, when the partner is notified, then the partner co-signs/releases according to the custody agreement.
- Given a partial approval, when the partner requires more signatures, then the release case shows the pending step.
- Given a completed release, when confirmed, then the attestation and receipt are stored.

### US-223 — Beneficiary crypto instructions
**Epic:** E18 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-220

As a beneficiary, I want plain-language crypto instructions so I know what to do.

**Acceptance criteria**
- Given a crypto item, when released, then I see step-by-step instructions, custodian contact, and safety warnings.
- Given a hardware wallet, when relevant, then I see device/PIN guidance without secrets.
- Given a partner, when relevant, then I see the partner’s support contact.

### US-224 — Proof of custody and attestation
**Epic:** E18 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-221

As a user, I want proof that my crypto is held by a partner so I trust the arrangement.

**Acceptance criteria**
- Given a partner, when it attests custody, then a signed attestation is stored and visible to the user.
- Given an attestation, when it expires, then the user and ops are notified.
- Given a discrepancy, when detected, then an incident is created.

### US-225 — Crypto release rehearsal
**Epic:** E18 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-222

As a user, I want a crypto release rehearsal so my family knows what will happen.

**Acceptance criteria**
- Given a rehearsal, when run, then it uses testnet/dummy data and does not move real assets.
- Given a rehearsal, when complete, then a report shows steps, timing, and gaps.
- Given a gap, when identified, then the user is prompted to update instructions/custodian.

### US-226 — Partner status dashboard
**Epic:** E18 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-221

As an ops agent, I want partner status so I can detect custody issues.

**Acceptance criteria**
- Given partners, when I open the dashboard, then I see status, attestation expiry, and incidents.
- Given a partner outage, when it occurs, then affected releases are flagged.
- Given a status change, when it occurs, then ops is alerted.

### US-227 — Legal and jurisdiction gating
**Epic:** E18 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-222

As a legal reviewer, I want jurisdiction gating so crypto release is only offered where lawful.

**Acceptance criteria**
- Given a jurisdiction, when crypto is not supported, then the feature is hidden/disabled with an explanation.
- Given a release, when legal review is required, then the case cannot proceed without approval.
- Given a change in law, when configured, then the gate updates without a deployment.

---

# E19 — Business continuity

**Goal:** Protect SMEs and key-person-dependent organizations.
**Success:** 10 business workspaces; 3 accountant/solicitor partners; key-person release rehearsal passed.

### US-230 — Business workspace
**Epic:** E19 · **Priority:** P2 · **Estimate:** 8 · **Dependencies:** US-021

As a business owner, I want a business workspace so my company’s critical access is protected.

**Acceptance criteria**
- Given a business signup, when I create a workspace, then I can add organization profile, roles, and billing.
- Given a business workspace, when I view it, then I see business categories and key-person risk.
- Given a personal workspace, when I switch, then data remains isolated.

### US-231 — Business roles and permissions
**Epic:** E19 · **Priority:** P2 · **Estimate:** 5 · **Dependencies:** US-230

As a business owner, I want role-based access so the CFO, COO, and board get only what they need.

**Acceptance criteria**
- Given a role (CEO, CFO, COO, board, executor), when assigned, then permissions are scoped.
- Given a release, when configured, then each role receives only its assigned items.
- Given a role change, when it occurs, then access updates and is audited.

### US-232 — Key-person release
**Epic:** E19 · **Priority:** P2 · **Estimate:** 8 · **Dependencies:** US-231, US-090

As a board, I want a key-person release so the business does not freeze.

**Acceptance criteria**
- Given a key person, when a verified trigger occurs, then the configured roles are notified and release begins.
- Given a board approval requirement, when configured, then release waits for the required approvals.
- Given a legal hold, when placed, then the release is suspended.

### US-233 — Multi-beneficiary per role
**Epic:** E19 · **Priority:** P2 · **Estimate:** 5 · **Dependencies:** US-231

As a business owner, I want multiple people per role so there is no single point of failure.

**Acceptance criteria**
- Given a role, when I assign multiple beneficiaries, then any eligible one can complete verification.
- Given one beneficiary is unavailable, when another qualifies, then release can proceed per policy.
- Given a conflict, when detected, then segregation-of-duties rules apply.

### US-234 — Board and executor notifications
**Epic:** E19 · **Priority:** P2 · **Estimate:** 3 · **Dependencies:** US-232

As a board member, I want notifications and a clear escalation path.

**Acceptance criteria**
- Given a trigger, when verified, then the board/executor receives a plain-language notice.
- Given no response, when the SLA passes, then escalation repeats to backups.
- Given a notification, when sent, then it contains no sensitive contents.

### US-235 — Business document templates
**Epic:** E19 · **Priority:** P2 · **Estimate:** 3 · **Dependencies:** US-230

As a business owner, I want templates so I know which documents to store.

**Acceptance criteria**
- Given a business workspace, when I browse templates, then I see board resolutions, authorizations, and key contracts.
- Given a template, when I use it, then fields and beneficiaries are preconfigured.
- Given a completed template, when saved, then it is versioned and audited.

### US-236 — Accountant and solicitor portal
**Epic:** E19 · **Priority:** P2 · **Estimate:** 5 · **Dependencies:** US-200

As an accountant/solicitor, I want a portal so I can support business clients.

**Acceptance criteria**
- Given a client, when I am granted access, then I can see status and help with setup.
- Given a release, when it occurs, then I can support the process within my scope.
- Given a consent withdrawal, when it occurs, then my access ends immediately.

### US-237 — Business audit and reporting
**Epic:** E19 · **Priority:** P2 · **Estimate:** 3 · **Dependencies:** US-230

As a compliance officer, I want business audit reports so I can demonstrate readiness.

**Acceptance criteria**
- Given a business workspace, when I export a report, then it includes plan completeness, roles, and rehearsal status.
- Given an audit event, when it occurs, then it is included in the report.
- Given a board request, when I share, then sensitive contents are excluded.

### US-238 — Key-person insurance integration
**Epic:** E19 · **Priority:** P2 · **Estimate:** 5 · **Dependencies:** US-232

As a business, I want to connect key-person insurance so claims and continuity align.

**Acceptance criteria**
- Given a partner insurer, when connected, then policy metadata and contacts are linked.
- Given a claim event, when verified, then the release and claim workflows can coordinate.
- Given a data-sharing consent, when withdrawn, then the integration stops.

---

# E20 — Duress and coercion

**Goal:** Protect users and beneficiaries from forced access, family pressure, and fraud.
**Success:** Duress features tested in ops playbook; zero false releases from coercion in pilot.

### US-240 — Duress PIN and decoy vault
**Epic:** E20 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-093

As a user, I want a duress PIN that opens a decoy view so I am not forced to reveal my real vault.

**Acceptance criteria**
- Given a duress PIN, when entered, then a decoy vault with preconfigured non-sensitive items opens.
- Given the real vault, when the duress PIN is used, then no real items are shown and an alert is sent to a trusted contact (if enabled).
- Given a duress event, when it occurs, then it is logged with high priority for security review.

### US-241 — Panic revoke
**Epic:** E20 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-014

As a user, I want a panic revoke so I can instantly end all sessions and links.

**Acceptance criteria**
- Given a panic action, when triggered, then all sessions, release links, and API tokens are revoked.
- Given a partial revoke, when I choose it, then only selected devices/links are revoked.
- Given a revoke, when it occurs, then a security alert is sent and audited.

### US-242 — Hidden items and beneficiaries
**Epic:** E20 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-034

As a user, I want hidden items so my family does not see sensitive information before release.

**Acceptance criteria**
- Given an item, when marked hidden, then it is excluded from family previews and notifications.
- Given a hidden beneficiary, when configured, then they are not visible to other members.
- Given a release, when it occurs, then hidden items follow their own condition and audit.

### US-243 — Coercion risk assessment
**Epic:** E20 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-020

As a user, I want an optional coercion check so I can flag risk safely.

**Acceptance criteria**
- Given onboarding, when I choose the optional assessment, then I can flag concerns and preferred contacts.
- Given a flag, when saved, then it is visible only to authorized safety staff.
- Given a high-risk flag, when it occurs, then a safety review is triggered.

### US-244 — Safe-word verification
**Epic:** E20 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-053

As a user, I want a safe-word so my trusted contacts can verify a release is legitimate.

**Acceptance criteria**
- Given a safe-word, when configured, then it is shared only with nominated contacts.
- Given a release, when a contact is unsure, then they can ask for the safe-word through a secure channel.
- Given a mismatch, when it occurs, then the release is paused and security is notified.

### US-245 — Legal and ops playbook for coercion
**Epic:** E20 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-096

As an ops agent, I want a coercion playbook so I can respond safely.

**Acceptance criteria**
- Given a suspected coercion, when reported, then the playbook defines escalation, evidence, and legal steps.
- Given a high-risk case, when it occurs, then release is paused and law enforcement/legal is engaged per policy.
- Given a resolution, when it occurs, then the case is documented and reviewed.

---

# E21 — Integrations and data portability

**Goal:** Meet users where their data already lives and avoid lock-in.
**Success:** 3 integrations live; export/import verified; no secrets stored.

### US-250 — Password manager integration
**Epic:** E21 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-031

As a user, I want to connect my password manager so LifeProof stores pointers, not passwords.

**Acceptance criteria**
- Given a supported provider (1Password/Bitwarden), when I connect, then I can link an item to an emergency-access record.
- Given a link, when released, then the beneficiary receives instructions to use the provider’s emergency access, not a stored password.
- Given a revoked connection, when it occurs, then the link is removed and audited.

### US-251 — E-signature integration
**Epic:** E21 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-053

As a user, I want to sign consents/authorizations electronically so the process is efficient.

**Acceptance criteria**
- Given a document requiring signature, when I send it, then the provider handles signing and returns a signed copy.
- Given a completed signature, when it returns, then the signed document is stored encrypted and linked to the case.
- Given a declined signature, when it occurs, then the workflow pauses and notifies the owner.

### US-252 — Standard export and import format
**Epic:** E21 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-154

As a user, I want a portable format so I am not locked into LifeProof.

**Acceptance criteria**
- Given an export, when generated, then it follows a documented schema (metadata, instructions, documents, manifest).
- Given an import, when validated, then a new workspace can be created from the archive.
- Given a malformed archive, when imported, then the system rejects it with clear errors.

### US-253 — Bank and exchange beneficiary links
**Epic:** E21 · **Priority:** P2 · **Estimate:** 3 · **Dependencies:** US-031

As a user, I want links to institution beneficiary processes so my family knows what to do.

**Acceptance criteria**
- Given an account, when I add it, then I can attach the institution’s beneficiary/claims URL and notes.
- Given a release, when delivered, then the beneficiary sees the official process link.
- Given a stale link, when checked, then the system flags it for review.

### US-254 — Calendar and reminder integrations
**Epic:** E21 · **Priority:** P2 · **Estimate:** 2 · **Dependencies:** US-113

As a user, I want reminders in my calendar so reviews are not forgotten.

**Acceptance criteria**
- Given an annual review, when scheduled, then I can add it to Google/Outlook calendar.
- Given an event, when clicked, then it opens the review flow.
- Given a cancellation, when I opt out, then no further events are created.

### US-255 — CRM integration for partners
**Epic:** E21 · **Priority:** P2 · **Estimate:** 5 · **Dependencies:** US-210

As a partner, I want CRM integration so client status flows into my systems.

**Acceptance criteria**
- Given HubSpot/Salesforce, when connected, then client status events sync.
- Given a consent restriction, when configured, then only approved fields sync.
- Given a sync failure, when it occurs, then an alert and retry are triggered.

---

# E22 — Trust and security program expansion

**Goal:** Move from “secure by design” claims to independently verified trust.
**Success:** SOC 2 Type II report; bug bounty live; open-source recovery client; transparency report.

### US-260 — Bug bounty program
**Epic:** E22 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-181

As a security researcher, I want a bug bounty so I can report issues responsibly.

**Acceptance criteria**
- Given a report, when submitted, then triage and severity are recorded within SLA.
- Given a valid critical finding, when confirmed, then a reward and remediation timeline are agreed.
- Given a public program, when launched, then scope and safe harbor are clear.

### US-261 — SOC 2 Type II
**Epic:** E22 · **Priority:** P1 · **Estimate:** 13 · **Dependencies:** US-180, US-182

As a partner, I want a SOC 2 report so I can trust LifeProof’s controls.

**Acceptance criteria**
- Given the control set, when evidence is collected for the period, then the auditor can test it.
- Given a gap, when identified, then a remediation plan and owner are assigned.
- Given the report, when issued, then it is available to partners under NDA.

### US-262 — ISO 27001
**Epic:** E22 · **Priority:** P2 · **Estimate:** 13 · **Dependencies:** US-261

As an enterprise partner, I want ISO 27001 so procurement can approve LifeProof.

**Acceptance criteria**
- Given the ISMS, when implemented, then policies, risk register, and internal audit are in place.
- Given a certification audit, when completed, then nonconformities are closed.
- Given the certificate, when issued, then it is published and maintained.

### US-263 — Open-source recovery client
**Epic:** E22 · **Priority:** P1 · **Estimate:** 8 · **Dependencies:** US-184

As a user, I want an open recovery client so I can access my export even if LifeProof disappears.

**Acceptance criteria**
- Given an export, when opened with the recovery client, then metadata and documents can be decrypted with the user’s key.
- Given the source code, when published, then build instructions and reproducible builds are available.
- Given a vulnerability, when reported, then a disclosure and patch process exists.

### US-264 — Transparency report
**Epic:** E22 · **Priority:** P2 · **Estimate:** 3 · **Dependencies:** US-263

As a customer, I want a transparency report so I know how requests and incidents are handled.

**Acceptance criteria**
- Given a reporting period, when published, then it covers legal requests, incidents, and releases (aggregated).
- Given a sensitive case, when reported, then no PII is included.
- Given a correction, when needed, then the report is versioned.

### US-265 — Reproducible builds and code signing
**Epic:** E22 · **Priority:** P2 · **Estimate:** 8 · **Dependencies:** US-263

As a security engineer, I want reproducible builds so users can verify the client.

**Acceptance criteria**
- Given a release, when built twice, then the artifacts match byte-for-byte or have a documented diff.
- Given an artifact, when distributed, then it is signed and verified.
- Given a mismatch, when detected, then the release is blocked and investigated.

---

# E23 — Mobile and PWA

**Goal:** Meet families on the devices they actually use, especially in low-bandwidth markets.
**Success:** PWA installable; mobile document capture; beneficiary release works on mobile.

### US-270 — PWA install and offline shell
**Epic:** E23 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-164

As a mobile user, I want to install LifeProof and use a basic offline shell so I can access emergency info.

**Acceptance criteria**
- Given a supported browser, when I install, then the app launches standalone.
- Given offline mode, when I open the app, then I see cached emergency info (no sensitive contents).
- Given connectivity returns, when I sync, then changes are reconciled safely.

### US-271 — Mobile document capture
**Epic:** E23 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-040

As a mobile user, I want to scan documents with my camera so setup is easy.

**Acceptance criteria**
- Given camera access, when I capture, then I can crop/rotate and upload.
- Given a blurry image, when detected, then I am prompted to retake.
- Given upload, when complete, then the document follows the normal scan/encrypt pipeline.

### US-272 — Biometric login
**Epic:** E23 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-012

As a mobile user, I want biometric login so access is fast and secure.

**Acceptance criteria**
- Given a device with biometrics, when I enable it, then I can sign in with Face ID/Touch ID/fingerprint.
- Given a failed biometric, when it occurs, then fallback to passkey/TOTP is offered.
- Given a revoked device, when it occurs, then biometric login stops working.

### US-273 — Push notifications
**Epic:** E23 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-111

As a mobile user, I want push notifications so I do not miss critical events.

**Acceptance criteria**
- Given a critical event, when it occurs, then a push notification is sent without sensitive content.
- Given a user opt-out, when set, then non-critical pushes stop.
- Given a delivery failure, when it occurs, then email/in-app fallback is used.

### US-274 — Offline emergency card
**Epic:** E23 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-280

As a user, I want an offline emergency card so first responders/family can find key contacts.

**Acceptance criteria**
- Given an emergency card, when enabled, then it is available offline with permissioned data.
- Given a lost device, when accessed, then sensitive data is minimized and protected.
- Given an update, when it occurs, then the offline cache refreshes on next sync.

### US-275 — Beneficiary mobile release
**Epic:** E23 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-093

As a beneficiary, I want to complete the release on my phone so I can act quickly.

**Acceptance criteria**
- Given a release, when I open it on mobile, then identity verification and document access work.
- Given a low-bandwidth connection, when I load, then progressive download and retry are supported.
- Given a session timeout, when it occurs, then I can re-authenticate without losing progress.

---

# E24 — Living-value features

**Goal:** Give families a reason to use LifeProof while everyone is alive, reducing churn.
**Success:** ≥ 50% annual review completion; ≥ 30% emergency card adoption; churn < 3%/month.

### US-280 — Emergency card
**Epic:** E24 · **Priority:** P1 · **Estimate:** 5 · **Dependencies:** US-053

As a user, I want a digital/physical emergency card so my family can find key contacts in a crisis.

**Acceptance criteria**
- Given a card, when generated, then it shows emergency contacts, allergies/medical notes (optional), and a QR link.
- Given a QR scan, when authorized, then it opens a permissioned summary (no credentials).
- Given a lost card, when reported, then the QR link can be revoked.

### US-281 — Renewal and expiry reminders
**Epic:** E24 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-043

As a user, I want reminders for passports, insurance, and licences so my documents stay current.

**Acceptance criteria**
- Given a document with an expiry date, when it approaches, then I receive a reminder.
- Given a renewal, when I upload a new version, then the old version is archived.
- Given no expiry date, when I add a document, then I can optionally set one.

### US-282 — Life-event review triggers
**Epic:** E24 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-038

As a user, I want prompts after life events so my plan stays accurate.

**Acceptance criteria**
- Given a life event (marriage, birth, divorce, bereavement), when I record it, then the system prompts a review.
- Given a review, when I complete it, then affected items/beneficiaries are updated.
- Given a missed trigger, when the annual review occurs, then the system asks about life changes.

### US-283 — Family health score
**Epic:** E24 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-024

As a family organiser, I want a family health score so I can see our collective readiness.

**Acceptance criteria**
- Given family members, when I open the score, then I see aggregate completion without contents.
- Given a gap, when identified, then I see a specific, non-anxious next step.
- Given a member opts out, when they do, then their data is excluded.

### US-284 — Family readiness report
**Epic:** E24 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-103

As a family organiser, I want a readiness report so I can share progress with my family.

**Acceptance criteria**
- Given a plan, when I generate the report, then it shows completion, gaps, and next steps without secrets.
- Given a report, when shared, then the recipient sees only permitted information.
- Given a change, when it occurs, then the report can be regenerated and versioned.

### US-285 — Subscription cancellation checklist
**Epic:** E24 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-032

As a beneficiary, I want a subscription cancellation checklist so I can manage recurring charges.

**Acceptance criteria**
- Given released subscriptions, when I open the checklist, then I see service, priority, cost, and cancellation instructions.
- Given a priority, when sorted, then essential services appear first.
- Given a completed cancellation, when I mark it, then the checklist updates and records the action.

---

# Phase 2 and 3 release slices

| Slice | Phase | Focus | Outcome |
|---|---|---|---|
| **P2-A — Partner pilot** | 2 | E17 (US-200–205) | 2 design partners onboarded; verification API in sandbox |
| **P2-B — Crypto pilot** | 2 | E18 (US-220–222) | 1 custody partner; no secrets; rehearsal passed |
| **P2-C — Trust** | 2 | E20, E22, E24 | Duress, bug bounty, SOC 2 readiness, living-value features |
| **P2-D — Mobile** | 2 | E23 | PWA, capture, push, beneficiary mobile |
| **P3-A — Partner GA** | 3 | E17 (US-206–210), E21 | Partner API GA; 3+ partners live |
| **P3-B — Business** | 3 | E19 | Business continuity; 10 workspaces |
| **P3-C — Scale** | 3 | E22, E21 | ISO 27001, transparency, integrations |

---

# What not to build

- Seed-phrase or private-key storage (ever).
- A bank/exchange credential vault.
- A consumer crypto wallet.
- A legal advice engine.
- A probate/estate administration service without a licensed partner.
- A marketplace before the release loop and partner channel work.
- A native app before PWA validation.
- Multi-jurisdiction before one jurisdiction is profitable.

---

# Phase 2/3 Definition of Done

1. Phase 2 entry criteria met.
2. Partner design partners validate the API/white-label.
3. Crypto custody partner legal review passed.
4. No secrets stored; all crypto flows partner-led.
5. SOC 2 Type II readiness (Phase 2) or report (Phase 3).
6. Duress/coercion playbook tested.
7. Mobile/PWA core journeys work on low-end devices.
8. Partner revenue and attribution reconcile.
9. Business continuity rehearsal passed.
10. All decisions pass the strategy kernel filters.

---

**End of Phase 2 & 3 Epics**
