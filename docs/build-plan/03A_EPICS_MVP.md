# LifeProof MVP — Epics & User Stories (Part 1: E01–E08)

**Status:** Build-ready backlog
**Date:** 5 November 2026
**Scope:** Phase 1 MVP
**Companion:** [`03B_EPICS_PHASE2_3.md`](./03B_EPICS_PHASE2_3.md), [`04_DELIVERY_PLAN.md`](./04_DELIVERY_PLAN.md)

---

## How to use this backlog

- Every story is written for a cross-functional team: product, design, engineering, QA, security, legal, and ops.
- **Priority:** P0 = MVP launch blocker; P1 = Phase 2/fast follow; P2 = Phase 3/later.
- **Estimate:** Fibonacci story points (1, 2, 3, 5, 8, 13) for a mature team.
- **Acceptance criteria** are behavioral and testable. Add edge cases during refinement.
- **Dependencies** are story-level; infrastructure dependencies are in `04_DELIVERY_PLAN.md`.
- Stories are ordered by the **release-loop proof**, not by feature count.

### Definition of Ready (DoR)

A story is ready when:
- The user value and business outcome are clear.
- Acceptance criteria are testable.
- Design is attached (Figma or written flow).
- Dependencies and data contracts are identified.
- Security/privacy/legal implications are reviewed.
- Telemetry events are defined.
- The story fits in one sprint (or is split).

### Definition of Done (DoD)

A story is done when:
- Code reviewed and merged.
- Unit, integration, and relevant E2E tests pass.
- Security checks pass (SAST/SCA/secrets).
- Accessibility checks pass for UI.
- Telemetry and audit events emitted.
- Documentation/runbook updated.
- Deployed to staging and verified.
- Product owner accepts.

---

## Epic map

| Epic | Name | Phase | Stories |
|---|---|---|---|
| E01 | Platform foundation & DevOps | MVP | 6 |
| E02 | Identity & access | MVP | 8 |
| E03 | Workspace & onboarding | MVP | 6 |
| E04 | Vault inventory | MVP | 9 |
| E05 | Document vault | MVP | 8 |
| E06 | Relationships | MVP | 7 |
| E07 | Release conditions | MVP | 6 |
| E08 | Verification engine | MVP | 10 |
| E09 | Release orchestration | MVP | 10 |
| E10 | Emergency pack | MVP | 4 |
| E11 | Notifications | MVP | 5 |
| E12 | Admin & ops console | MVP | 10 |
| E13 | Billing & subscriptions | MVP | 6 |
| E14 | Audit & analytics | MVP | 6 |
| E15 | Compliance & privacy | MVP | 6 |
| E16 | Accessibility & localization | MVP | 6 |
| E22 | Trust & security program (MVP subset) | MVP | 6 |

**Part 1 covers E01–E08. Part 2 covers E09–E16 and E22.**

---

# E01 — Platform foundation & DevOps

**Goal:** A secure, observable, reproducible platform that the team can deploy safely from sprint 1.
**Success:** Every merge is tested, scanned, and deployable; every incident is observable; backups restore.

### US-001 — Monorepo, CI, and quality gates
**Epic:** E01 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** none

As a developer, I want a single monorepo with CI quality gates so every change is tested and deployable.

**Acceptance criteria**
- Given a pull request, when CI runs, then lint, typecheck, unit tests, SAST, SCA, and secret scanning must pass before merge.
- Given a merge to `main`, when the pipeline completes, then a deployable artifact and preview environment are produced.
- Given a failed security scan, when the PR is reviewed, then merge is blocked and the failure is visible.

**Notes:** Branch protection, CODEOWNERS for security-critical paths, signed commits, conventional commits.

### US-002 — Environments and infrastructure as code
**Epic:** E01 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-001

As a platform engineer, I want reproducible dev/staging/prod environments so deployments are predictable and auditable.

**Acceptance criteria**
- Given a clean AWS account, when Terraform is applied, then the environment is provisioned without manual steps.
- Given a configuration drift, when the nightly plan runs, then the drift is reported and alerted.
- Given a production change, when it is applied, then it is logged with approver and commit SHA.

**Notes:** Separate AWS accounts for prod/non-prod recommended; no console changes in prod.

### US-003 — Observability baseline
**Epic:** E01 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-002

As an on-call engineer, I want logs, metrics, traces, and alerts so I can detect and diagnose incidents.

**Acceptance criteria**
- Given an API request, when it completes, then a structured log with request ID and latency is emitted (no PII).
- Given an error-rate spike, when the threshold is exceeded, then the on-call alert fires within 5 minutes.
- Given a failing release workflow, when it stalls, then an alert and dashboard entry are created.

**Notes:** OpenTelemetry; SLO dashboards; Sentry for exceptions.

### US-004 — Feature flags and runtime configuration
**Epic:** E01 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-001

As a product engineer, I want feature flags and runtime config so I can ship safely and disable risky features.

**Acceptance criteria**
- Given a flagged feature, when the flag is off, then the UI/API behave as if the feature does not exist.
- Given a production incident, when an admin disables a flag, then the change takes effect within 60 seconds.
- Given a flag change, when it is made, then the actor and timestamp are audited.

### US-005 — Backup, restore, and DR runbook
**Epic:** E01 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-002

As a platform engineer, I want tested backups and a DR runbook so we can recover from data loss.

**Acceptance criteria**
- Given a database backup, when restored to a clean environment, then data integrity checks pass.
- Given a documented DR scenario, when the team runs the game day, then RTO/RPO targets are measured and recorded.
- Given a restore failure, when it occurs, then the incident process is triggered and the runbook is updated.

### US-006 — Security scanning and dependency policy
**Epic:** E01 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-001

As a security engineer, I want automated scanning and a dependency policy so vulnerabilities are caught before production.

**Acceptance criteria**
- Given a new dependency, when it is added, then license and vulnerability checks run automatically.
- Given a critical vulnerability, when detected, then the build fails or a time-bound exception is required.
- Given a container image, when built, then it is scanned and signed before deployment.

---

# E02 — Identity and access

**Goal:** Phishing-resistant authentication, strong session control, and least-privilege authorization.
**Success:** No SMS OTP for sensitive operations; every sensitive action is step-up authenticated and audited.

### US-010 — Email and password signup/login
**Epic:** E02 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-001, US-002

As a new user, I want to create an account and sign in securely so I can start my plan.

**Acceptance criteria**
- Given a valid email and strong password, when I sign up, then an account is created and a verification email is sent.
- Given valid credentials, when I log in, then a session is created and a new-device notification is sent if applicable.
- Given invalid credentials, when I try to log in, then I receive a generic error and the attempt is rate-limited and audited.

**Notes:** Argon2id; breached-password check; minimum 12 characters; no security questions.

### US-011 — Email verification and password reset
**Epic:** E02 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-010

As a user, I want to verify my email and reset my password safely so I can recover access.

**Acceptance criteria**
- Given an unverified account, when I click the verification link, then my email is marked verified.
- Given a reset request, when I submit my email, then a single-use, time-limited link is sent and no account existence is leaked.
- Given an expired or reused token, when I use it, then the request is rejected and audited.

### US-012 — Passkey/WebAuthn authentication
**Epic:** E02 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-010

As a security-conscious user, I want to sign in with a passkey so I am protected from phishing.

**Acceptance criteria**
- Given a supported device, when I register a passkey, then it is stored against my account and can be used to sign in.
- Given a registered passkey, when I sign in, then I am authenticated without a password and the event is audited.
- Given a lost device, when I revoke the passkey, then it can no longer authenticate and I can use another factor.

**Notes:** Managed auth provider behind an abstraction; fallback TOTP; step-up support.

### US-013 — TOTP MFA and recovery codes
**Epic:** E02 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-010

As a user, I want TOTP MFA and recovery codes so my account stays secure if my password is compromised.

**Acceptance criteria**
- Given MFA is enabled, when I log in, then I must provide a valid TOTP code.
- Given I lose my authenticator, when I use a recovery code, then I can sign in and the code is invalidated.
- Given repeated failed MFA attempts, when the limit is reached, then the account is temporarily locked and notified.

### US-014 — Session and device management
**Epic:** E02 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-010

As a user, I want to see and revoke my sessions so I can respond to suspicious activity.

**Acceptance criteria**
- Given active sessions, when I open security settings, then I see device, location (coarse), and last activity.
- Given a suspicious session, when I revoke it, then it loses access immediately.
- Given a new device login, when it occurs, then I am notified by email and in-app.

### US-015 — RBAC and workspace scoping
**Epic:** E02 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-010, US-020

As a workspace owner, I want roles and scoped permissions so the right people can help without seeing everything.

**Acceptance criteria**
- Given a member role, when they access a resource outside their scope, then the API returns 403 and the attempt is audited.
- Given a family organiser, when they help with setup, then they cannot view sealed item contents.
- Given a beneficiary, when they access the workspace, then they see only their own summary and assigned items after release.

**Notes:** Permission matrix in architecture; Postgres RLS as defense in depth.

### US-016 — Account recovery with identity verification
**Epic:** E02 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-011, US-013

As a locked-out user, I want a secure recovery path so I can regain access without SMS.

**Acceptance criteria**
- Given a recovery request, when I provide a recovery code and verify my identity, then I can reset credentials.
- Given a high-risk recovery, when identity confidence is low, then the case is escalated to support with manual verification.
- Given a recovery, when completed, then all sessions are revoked and the event is audited.

### US-017 — Admin authentication isolation
**Epic:** E02 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-015

As a security engineer, I want admin authentication isolated from customer auth so admin compromise is harder.

**Acceptance criteria**
- Given an admin user, when they sign in, then they use the admin domain with SSO/hardware key and MFA.
- Given a customer session, when it accesses admin endpoints, then it is rejected.
- Given an admin session, when it is idle for 15 minutes, then it expires.

---

# E03 — Workspace and onboarding

**Goal:** A plain-language onboarding that gets a family to their first sealed item quickly.
**Success:** ≥ 40% of signups seal at least one item; ≥ 60% of paying workspaces complete a beneficiary invite.

### US-020 — Guided onboarding
**Epic:** E03 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-010

As a family organiser, I want a guided onboarding so I understand what LifeProof does and how to start.

**Acceptance criteria**
- Given a new signup, when I start onboarding, then I see a plain-language explanation, time estimate, and progress indicator.
- Given I leave midway, when I return, then my progress is saved and I can resume.
- Given I complete onboarding, when I finish, then I land on the category dashboard with a clear next step.

### US-021 — Create personal or family workspace
**Epic:** E03 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-020

As a user, I want to create a personal or family workspace so I can organize my plan.

**Acceptance criteria**
- Given a new account, when I choose family workspace, then a workspace is created and I become owner.
- Given a workspace, when I view settings, then I can see plan, members, and data controls.
- Given a duplicate workspace name, when I create another, then the system allows it but warns about confusion.

### US-022 — Invite members and family organiser role
**Epic:** E03 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-021, US-015

As an owner, I want to invite family members or a helper so they can contribute without seeing everything.

**Acceptance criteria**
- Given an invitation, when I send it, then the invitee receives an email with an expiring link.
- Given a family organiser accepts, when they open the workspace, then they can add items but cannot view sealed contents.
- Given an invitation is revoked, when the invitee clicks the link, then access is denied and audited.

### US-023 — Consent and security explainer
**Epic:** E03 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-020

As a user, I want to understand what LifeProof can and cannot see before I add sensitive information.

**Acceptance criteria**
- Given onboarding, when I reach the security explainer, then I see what is encrypted, who can access it, and what LifeProof never stores.
- Given a policy update, when it occurs, then I must re-consent before continuing to sensitive areas.
- Given consent, when I grant it, then the version, timestamp, and scope are recorded.

### US-024 — Onboarding checklist and readiness score
**Epic:** E03 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-021

As a user, I want a checklist and readiness score so I know what to do next.

**Acceptance criteria**
- Given a new workspace, when I view the dashboard, then I see a checklist (add document, invite beneficiary, add trusted contact, set condition).
- Given I complete a step, when I return, then the checklist updates and the score increases.
- Given an incomplete plan, when I seal an item, then I see a non-anxious prompt about what is still missing.

### US-025 — Workspace settings
**Epic:** E03 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-021

As an owner, I want workspace settings so I can manage name, plan, members, and data controls.

**Acceptance criteria**
- Given settings, when I update the workspace name, then it is reflected across the app.
- Given members, when I change a role, then permissions update immediately and the change is audited.
- Given data controls, when I request export or deletion, then the correct workflow starts.

---

# E04 — Vault inventory

**Goal:** A category-first inventory that is easy for non-technical families and safe by design.
**Success:** A user can add and seal an item in under 3 minutes; secret content is blocked.

### US-030 — Category-first vault dashboard
**Epic:** E04 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-021

As a family organiser, I want a category-first dashboard so the vault feels like a family safe, not a spreadsheet.

**Acceptance criteria**
- Given a workspace, when I open the vault, then I see category cards with counts, last updated, beneficiary, and completion indicator.
- Given an empty category, when I view it, then I see an encouraging prompt, not a blank screen.
- Given a category, when I open it, then I see items and a clear “add” action.

### US-031 — Create and edit vault item
**Epic:** E04 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-030

As a user, I want to create and edit a vault item so I can record what matters.

**Acceptance criteria**
- Given a category, when I create an item, then I can enter title, description, instructions, beneficiary, and condition.
- Given an item in draft, when I edit it, then changes are saved and versioned.
- Given a sealed item, when I try to edit it, then I must unseal with step-up auth.

### US-032 — Dynamic type-specific forms
**Epic:** E04 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-031

As a user, I want forms tailored to the type of record so I know what to enter.

**Acceptance criteria**
- Given a bank account type, when I open the form, then I see bank name, account reference, login pointer, and instructions.
- Given a document reference, when I open the form, then I can link a document and add a label.
- Given a subscription type, when I open the form, then I see service, billing, cancellation instructions, and priority.

**Notes:** Form schema is data-driven; no seed/private-key fields.

### US-033 — Prohibited secret detection
**Epic:** E04 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-032

As a security engineer, I want to prevent users from storing seed phrases and private keys so LifeProof does not become a honeypot.

**Acceptance criteria**
- Given a text field, when the content matches a seed-phrase/private-key pattern, then the save is blocked with a plain-language explanation.
- Given a user tries to bypass with a document upload, when the file is scanned, then the system warns and quarantines suspected secret files.
- Given a blocked attempt, when it occurs, then the event is audited without storing the secret.

### US-034 — Seal and unseal item
**Epic:** E04 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-031, US-013

As a user, I want to seal an item so it becomes part of my plan and cannot be accidentally changed.

**Acceptance criteria**
- Given a complete item, when I seal it, then I must step-up authenticate and the item status becomes SEALED.
- Given a sealed item, when I unseal it, then I must step-up authenticate and the change is audited.
- Given an incomplete item, when I try to seal, then I see the missing fields and cannot proceed.

### US-035 — Item detail and family preview
**Epic:** E04 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-034

As a user, I want to see exactly what my family will see so I can trust the plan.

**Acceptance criteria**
- Given a sealed item, when I open the detail, then I see the family-facing summary, beneficiary, and release condition.
- Given multiple beneficiaries, when I preview, then I can switch between them and see their scoped view.
- Given a missing instruction, when I preview, then I see a warning and a prompt to add it.

### US-036 — Search and filter
**Epic:** E04 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-030

As a user, I want to search and filter my vault so I can find things quickly.

**Acceptance criteria**
- Given many items, when I search by title/label, then results appear within 200ms.
- Given filters, when I filter by category, status, or beneficiary, then the list updates correctly.
- Given no results, when I search, then I see a helpful empty state.

### US-037 — Item history and audit
**Epic:** E04 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-031

As a user, I want to see the history of an item so I know what changed and when.

**Acceptance criteria**
- Given an item, when I open history, then I see create/edit/seal/unseal events with actor and timestamp.
- Given a change, when it is made, then a version is recorded and the audit event is immutable.
- Given a deleted item, when I view history, then the audit remains available per retention policy.

### US-038 — Annual review prompt
**Epic:** E04 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-034, US-110

As a user, I want an annual review prompt so my plan does not become stale.

**Acceptance criteria**
- Given a plan older than 12 months, when I log in, then I see a “still accurate?” review prompt.
- Given I confirm, when I submit, then the review date updates and an audit event is recorded.
- Given I update an item, when I save, then the review is marked complete and the emergency pack is flagged for regeneration.

---

# E05 — Document vault

**Goal:** Secure, encrypted document storage that a non-technical user can trust.
**Success:** Upload → scan → available in under 60 seconds for a 10MB file; zero unscanned files accessible.

### US-040 — Upload initiation and completion
**Epic:** E05 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-002, US-030

As a user, I want to upload documents safely so my family has the originals when needed.

**Acceptance criteria**
- Given a supported file, when I start an upload, then I receive a short-lived presigned URL and upload directly.
- Given a completed upload, when I confirm, then the document moves to SCANNING and I see progress.
- Given an unsupported type or oversized file, when I upload, then I see a clear error and no object is stored.

### US-041 — Malware scan and quarantine
**Epic:** E05 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-040

As a security engineer, I want every upload scanned before it is available so malware cannot reach users.

**Acceptance criteria**
- Given an uploaded file, when the scan is clean, then the document becomes AVAILABLE.
- Given a malware detection, when the scan completes, then the document is QUARANTINED and the user is notified.
- Given a scanner outage, when it occurs, then uploads remain in SCANNING and are not exposed.

### US-042 — Encryption at rest and key wrapping
**Epic:** E05 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-040

As a security engineer, I want documents encrypted with per-document keys so a storage breach does not expose contents.

**Acceptance criteria**
- Given a document, when stored, then it is encrypted with AES-256-GCM and a unique data key.
- Given a data key, when stored, then it is wrapped by KMS and never written in plaintext.
- Given an access request, when authorized, then the key is unwrapped only for the document service role and the operation is logged.

### US-043 — Document metadata, labels, and linking
**Epic:** E05 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-042

As a user, I want to label and link documents so they are easy to find and contextualize.

**Acceptance criteria**
- Given an upload, when I add a label and category, then the metadata is saved and searchable.
- Given a vault item, when I link a document, then both records show the relationship.
- Given a document linked to a policy, when the policy is released, then the document is included per the condition.

### US-044 — Secure preview and download
**Epic:** E05 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-042

As an authorized user, I want to preview or download a document securely so I can use it.

**Acceptance criteria**
- Given an authorized user, when they request a download, then a signed URL with a 5-minute TTL is returned.
- Given a preview, when it opens, then it is watermarked and the access is audited.
- Given an unauthorized user, when they request access, then the request is denied and audited.

### US-045 — Integrity verification
**Epic:** E05 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-040

As a security engineer, I want document integrity checks so tampering or corruption is detected.

**Acceptance criteria**
- Given a stored document, when it is accessed, then its SHA-256 matches the stored hash.
- Given a mismatch, when detected, then access is blocked, an incident is created, and the user is notified.
- Given a restore from backup, when completed, then hashes are verified.

### US-046 — Delete and retention
**Epic:** E05 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-042

As a user, I want to delete a document and understand retention so I stay in control.

**Acceptance criteria**
- Given a document, when I delete it, then it is soft-deleted for 30 days and hidden from the vault.
- Given the retention window expires, when the purge job runs, then the object and versions are deleted.
- Given a legal hold, when deletion is requested, then the system explains the exception and does not purge.

### US-047 — Document access audit
**Epic:** E05 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-044

As an owner, I want to see who accessed my documents so I can detect misuse.

**Acceptance criteria**
- Given a document, when I open its access history, then I see actor, action, timestamp, and coarse location.
- Given an access, when it occurs, then an immutable audit event is written.
- Given an admin access, when it occurs, then a reason is required and recorded.

---

# E06 — Relationships

**Goal:** A clear, consented relationship graph of beneficiaries, trusted contacts, and professionals.
**Success:** A user can invite a beneficiary and trusted contact who both consent and appear in the release preview.

### US-050 — Add and edit beneficiary
**Epic:** E06 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-021

As a user, I want to add a beneficiary so my family knows who should receive access.

**Acceptance criteria**
- Given a workspace, when I add a beneficiary, then I can enter name, relationship, email, and language.
- Given a minor, when I add them, then the system flags guardianship and requires a guardian/trustee.
- Given an edit, when I save, then the change is versioned and affected items are shown.

### US-051 — Invite beneficiary and capture consent
**Epic:** E06 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-050

As a beneficiary, I want to register and consent so I am ready when the time comes.

**Acceptance criteria**
- Given an invitation, when I accept, then I create an account and see a plain-language explanation.
- Given consent, when I grant it, then the owner sees “registered and consented.”
- Given I decline, when I do, then the owner is notified and can nominate a backup.

### US-052 — Beneficiary portal summary
**Epic:** E06 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-051

As a beneficiary, I want to see what I will receive without seeing the contents so I can prepare.

**Acceptance criteria**
- Given a registered beneficiary, when I open my portal, then I see categories/items assigned to me and instructions summary.
- Given an item not assigned to me, when I view the portal, then it is not visible.
- Given a change in assignment, when it occurs, then I am notified without content details.

### US-053 — Trusted contacts and roles
**Epic:** E06 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-051

As a user, I want to nominate trusted contacts with specific roles so verification and support are possible.

**Acceptance criteria**
- Given a trusted contact, when I invite them, then I choose a role (verifier, executor, guardian, professional).
- Given consent, when they accept, then they appear in the release preview and verification plan.
- Given a role change, when it occurs, then the contact is notified and the change is audited.

### US-054 — Assign beneficiaries and shares
**Epic:** E06 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-050, US-031

As a user, I want to assign beneficiaries per item or category so the right person gets the right access.

**Acceptance criteria**
- Given an item, when I assign a beneficiary, then they appear in the preview and release scope.
- Given multiple beneficiaries, when I set shares, then they must total 100% and the UI explains the rule.
- Given a category assignment, when I add a new item, then the category default is suggested but editable.

### US-055 — Backup beneficiary and guardian
**Epic:** E06 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-050

As a user, I want a backup beneficiary and guardian for minors so a release does not dead-end.

**Acceptance criteria**
- Given a primary beneficiary, when I add a backup, then the backup is visible in the plan.
- Given a minor beneficiary, when I nominate a guardian, then the guardian must consent and is verified at release.
- Given the primary is deceased/unavailable, when verification completes, then the backup is considered per the plan.

### US-056 — Relationship change notifications and audit
**Epic:** E06 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-050, US-110

As a user, I want everyone affected to know when relationships change so there are no surprises.

**Acceptance criteria**
- Given a beneficiary change, when it is saved, then affected beneficiaries and trusted contacts are notified (without content).
- Given a change, when it occurs, then an immutable audit event records actor, before/after hash, and timestamp.
- Given a beneficiary removal, when it occurs, then their portal access is revoked immediately.

---

# E07 — Release conditions

**Goal:** Clear, configurable release rules that a non-technical user can understand and trust.
**Success:** Every sealed plan has at least one condition and a visible release preview.

### US-060 — Configure death trigger
**Epic:** E07 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-034

As a user, I want to release my vault on verified death so my family can act.

**Acceptance criteria**
- Given an item, when I choose “on death,” then the condition is saved and shown in the preview.
- Given a death trigger, when configured, then the system requires at least one trusted contact/verifier.
- Given no beneficiary, when I save, then the system warns and prevents sealing the condition.

### US-061 — Configure incapacity trigger
**Epic:** E07 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-060

As a user, I want an optional incapacity trigger so my family can help if I cannot act.

**Acceptance criteria**
- Given the incapacity option, when I enable it, then I must acknowledge it requires legal evidence and is off by default.
- Given an incapacity condition, when saved, then the preview explains what evidence will be required.
- Given I do not enable it, when I save, then the vault remains death-only.

### US-062 — Cooling-off configuration
**Epic:** E07 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-060

As a user, I want to set a cooling-off period so there is time to catch mistakes or disputes.

**Acceptance criteria**
- Given a release condition, when I configure cooling-off, then I can choose 14–90 days with a default of 14.
- Given a shorter period, when I try to save, then the minimum is enforced with an explanation.
- Given a change, when saved, then the release preview updates and the change is audited.

### US-063 — Per-item conditions
**Epic:** E07 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-060

As a user, I want different release conditions per item so not everything is released at once.

**Acceptance criteria**
- Given an item, when I set a condition, then it overrides the workspace default and is visible in the item detail.
- Given conflicting conditions, when I save, then the system explains precedence and asks for confirmation.
- Given a category default, when I add an item, then the default is suggested.

### US-064 — Release preview
**Epic:** E07 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-035, US-054

As a user, I want a plain-language preview of what will be released, to whom, and when.

**Acceptance criteria**
- Given a plan, when I open preview, then I see beneficiary, items, conditions, cooling-off, and required evidence.
- Given a gap, when I preview, then I see a warning and a link to fix it.
- Given a change, when I save, then the preview regenerates with a timestamp.

### US-065 — Pause or cancel release
**Epic:** E07 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-060

As a user, I want to pause or cancel a release while I am alive so I stay in control.

**Acceptance criteria**
- Given a triggered release, when I pause it, then release is suspended and all parties are notified.
- Given a paused release, when I cancel it, then the case closes and the vault returns to SEALED.
- Given a legal hold, when I try to cancel, then the system explains that legal review is required.

---

# E08 — Verification engine

**Goal:** A defensible, evidence-based verification workflow that ops can run consistently.
**Success:** 100% of cases have evidence, a four-eyes decision, and an audit trail; median decision ≤ 5 business days.

### US-070 — Initiate verification case
**Epic:** E08 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-060

As a claimant or ops agent, I want to open a verification case so a trigger can be reviewed.

**Acceptance criteria**
- Given a death/incapacity trigger, when a claim is initiated, then a case is created with type, claimant, workspace, and SLA.
- Given a duplicate claim, when it is detected, then the case is linked and flagged for review.
- Given a case, when it is created, then the workspace owner/trusted contacts are notified per policy.

### US-071 — Evidence checklist and upload
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-070, US-040

As a claimant, I want a clear evidence checklist so I know what to provide.

**Acceptance criteria**
- Given a case, when I open it, then I see required and optional evidence with plain-language explanations.
- Given an upload, when it completes, then the evidence is encrypted, linked to the case, and marked for review.
- Given missing evidence, when I submit, then the case remains in EVIDENCE_PENDING and I see what is missing.

### US-072 — KYC identity verification
**Epic:** E08 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-070

As an ops agent, I want claimant and beneficiary identity verified so fraud is reduced.

**Acceptance criteria**
- Given a claimant, when KYC runs, then document, liveness, and sanctions/PEP results are recorded.
- Given a failed KYC, when it occurs, then the case is flagged and the claimant receives a clear next step.
- Given a KYC provider outage, when it occurs, then the case can proceed to manual review with a documented exception.

### US-073 — Trusted contact attestation
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-053, US-070

As a trusted contact, I want to attest to a trigger so verification has independent signals.

**Acceptance criteria**
- Given a case, when I am asked to attest, then I receive a secure link and must verify my identity/contact.
- Given my attestation, when I submit, then it is recorded with timestamp and evidence reference.
- Given I decline or fail verification, when it occurs, then the case is flagged and ops follows up.

### US-074 — Ops review queue
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-070, US-120

As a verification analyst, I want a queue of cases so I can prioritize and process them.

**Acceptance criteria**
- Given cases, when I open the queue, then I see status, SLA, type, assignee, and risk flags.
- Given a case, when I assign it to myself, then it is locked to me and the assignment is audited.
- Given an SLA breach, when it occurs, then the case is escalated and the dashboard alerts.

### US-075 — Decision and four-eyes approval
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-074, US-129

As a verification analyst, I want a decision workflow with four-eyes so outcomes are defensible.

**Acceptance criteria**
- Given a reviewed case, when I recommend approve/reject, then a second reviewer must confirm.
- Given disagreement, when it occurs, then the case is escalated to legal/senior review.
- Given a decision, when it is finalized, then the rationale, reviewer IDs, and timestamp are immutable.

### US-076 — Legal hold
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-075

As a legal reviewer, I want to place a legal hold so release stops when there is a dispute or court order.

**Acceptance criteria**
- Given a case/release, when I place a legal hold, then all release actions are blocked immediately.
- Given a hold, when I add a reason and court reference, then it is recorded and visible to authorized users.
- Given the hold is lifted, when I clear it, then the case resumes at the correct state with an audit event.

### US-077 — Verification timeline and audit
**Epic:** E08 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-070

As an ops manager, I want a timeline of every case action so I can review quality and compliance.

**Acceptance criteria**
- Given a case, when I open the timeline, then I see every action, actor, timestamp, and evidence link.
- Given an export, when I request it, then a redacted, signed PDF/JSON is generated.
- Given a deletion request, when it conflicts with retention, then the legal-hold exception is applied and documented.

### US-078 — Denial and appeal
**Epic:** E08 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-075

As a claimant, I want a clear denial reason and an appeal path so the process is fair.

**Acceptance criteria**
- Given a denial, when it is issued, then the claimant receives a plain-language reason and next steps.
- Given an appeal, when new evidence is submitted, then an independent reviewer is assigned.
- Given the appeal outcome, when it is decided, then all parties are notified and the audit is updated.

### US-079 — SLA timers and escalation
**Epic:** E08 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-074

As an ops manager, I want SLA timers and escalation so cases do not stall.

**Acceptance criteria**
- Given a case stage, when the SLA approaches, then the assignee and manager are alerted.
- Given a breach, when it occurs, then the case is escalated and appears on the ops dashboard.
- Given an escalation, when it is resolved, then the timeline records the resolution.

---

# E09 — Release orchestration

**Goal:** A controlled, auditable release that a grieving beneficiary can complete safely.
**Success:** 95% of releases complete without dispute; every release has dual approval and a receipt.

### US-090 — Create release case
**Epic:** E09 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-075

As a release manager, I want to create a release case from a verified trigger so delivery can begin.

**Acceptance criteria**
- Given a verified verification case, when I create a release, then a release case is created and linked to the evidence.
- Given an unverified case, when I try to create a release, then the action is blocked with a clear reason.
- Given a release case, when it is created, then the beneficiaries and scope are shown for confirmation.

### US-091 — Cooling-off timer and notifications
**Epic:** E09 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-090, US-110

As a release manager, I want a reliable cooling-off period so disputes can be raised before delivery.

**Acceptance criteria**
- Given a release case, when cooling-off starts, then the end date is stored and beneficiaries are notified.
- Given the cooling-off period ends, when no dispute/legal hold exists, then the case becomes READY and ops is alerted.
- Given a legal hold, when it is placed, then the timer is suspended and the hold is shown to all authorized users.

### US-092 — Beneficiary identity re-verification
**Epic:** E09 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-072, US-091

As a release manager, I want the beneficiary re-verified before access so account takeover cannot steal a release.

**Acceptance criteria**
- Given a READY release, when the beneficiary starts, then they must complete KYC/liveness again.
- Given a failed re-verification, when it occurs, then access is blocked and support is notified.
- Given success, when it completes, then the verification is linked to the release case and audited.

### US-093 — Secure release session
**Epic:** E09 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-092

As a beneficiary, I want a secure, time-limited session so I can access what was left for me.

**Acceptance criteria**
- Given a verified beneficiary, when they open the release, then a session with a 5-minute sensitive-view timeout is created.
- Given inactivity, when the timeout is reached, then the session locks and requires re-authentication.
- Given a session, when it is active, then all access is scoped to the beneficiary’s assigned items and audited.

### US-094 — Deliver documents and instructions
**Epic:** E09 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-093, US-044

As a beneficiary, I want the documents and instructions in a clear order so I know what to do next.

**Acceptance criteria**
- Given a release, when I open it, then I see categories with documents, instructions, and next-step guidance.
- Given a document, when I download it, then the download is watermarked, audited, and time-limited.
- Given an item with no instructions, when it is released, then I see a support prompt, not an empty page.

### US-095 — Release receipt
**Epic:** E09 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-094

As a beneficiary, I want a receipt of what was delivered so there is a record.

**Acceptance criteria**
- Given a completed release, when it finishes, then a signed PDF/JSON receipt with item manifest and timestamp is generated.
- Given the receipt, when I download it, then it is available in my portal and linked to the audit log.
- Given a partial release, when it occurs, then the receipt lists delivered and pending items.

### US-096 — Dispute handling
**Epic:** E09 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-091

As a claimant, I want to raise a dispute so a release can be reviewed before it happens.

**Acceptance criteria**
- Given a release in cooling-off, when I raise a dispute, then release is paused and legal is notified.
- Given a dispute, when it is resolved, then the outcome (release/deny/partial) is recorded and all parties notified.
- Given a dispute after release, when it is raised, then an incident is created and access can be revoked if warranted.

### US-097 — Dual approval for release
**Epic:** E09 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-129

As a security officer, I want two approvers for every release so no single insider can release a vault.

**Acceptance criteria**
- Given a READY release, when one approver approves, then the case waits for a second, different approver.
- Given the same user attempts both approvals, when they try, then the second is rejected and audited.
- Given both approvals, when recorded, then the release proceeds and both identities are logged.

### US-098 — Partial release
**Epic:** E09 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-094

As a release manager, I want to release some categories/items while others remain on hold so families get urgent help first.

**Acceptance criteria**
- Given a release case, when I select a subset, then only those items are delivered and the rest remain pending.
- Given a legal hold on one item, when partial release runs, then held items are excluded and clearly marked.
- Given a partial release, when it completes, then the receipt and audit reflect the scope.

### US-099 — Post-release access expiry
**Epic:** E09 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-094

As a security officer, I want release access to expire so links cannot be reused indefinitely.

**Acceptance criteria**
- Given a release session, when it expires, then further access requires support re-verification.
- Given a downloaded document, when the link expires, then it cannot be reused.
- Given a re-access request, when approved, then a new audited session is created.

---

# E10 — Emergency pack

**Goal:** A printable, encrypted offline summary that helps a family act even if the platform is unavailable.
**Success:** A user can generate, download, and verify an emergency pack in under 5 minutes.

### US-100 — Generate encrypted emergency pack
**Epic:** E10 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-034, US-054

As a user, I want an encrypted PDF summary of my plan so my family can start the process offline.

**Acceptance criteria**
- Given a sealed plan, when I generate a pack, then a PDF is produced with cover sheet, inventory labels, beneficiary instructions, trusted contacts, and QR code.
- Given the pack, when it is generated, then it contains no passwords, seed phrases, private keys, or credential values.
- Given generation, when it completes, then the event is audited and the pack is available for download.

### US-101 — PIN protection
**Epic:** E10 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-100

As a user, I want the pack PIN-protected so physical loss does not expose my plan.

**Acceptance criteria**
- Given a pack, when I set a PIN, then the PDF is encrypted and requires the PIN to open.
- Given the PIN, when I forget it, then LifeProof cannot recover it and explains this clearly.
- Given a weak PIN, when I set it, then the system warns but allows it with confirmation.

### US-102 — QR code and offline instructions
**Epic:** E10 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-100

As a beneficiary, I want a QR code and offline instructions so I know how to start a release.

**Acceptance criteria**
- Given a pack, when I scan the QR code, then it opens a signed, expiring release portal link with the workspace ID.
- Given the platform is unavailable, when I follow the offline instructions, then I have a phone/email escalation path.
- Given the QR code, when it expires, then the pack explains how to request a new link.

### US-103 — Regenerate and version pack
**Epic:** E10 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-100

As a user, I want the pack to stay current so my family does not rely on stale instructions.

**Acceptance criteria**
- Given a vault change, when I save it, then the system prompts me to regenerate the pack.
- Given a regeneration, when it completes, then a new version is created and the old version is marked superseded.
- Given the pack history, when I view it, then I see version, date, and audit event.

---

# E11 — Notifications

**Goal:** Timely, plain-language communications that never expose sensitive content.
**Success:** ≥ 98% transactional email delivery; zero sensitive values in notifications.

### US-110 — Transactional email
**Epic:** E11 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-002

As a user, I want transactional emails for security, verification, and release events so I am never surprised.

**Acceptance criteria**
- Given a security event, when it occurs, then an email is sent within 1 minute with plain-language next steps.
- Given a verification/release event, when it occurs, then the relevant parties receive the correct template.
- Given a delivery failure, when it occurs, then it is retried and surfaced in the ops dashboard.

**Notes:** SPF/DKIM/DMARC; no sensitive content; unsubscribe for non-transactional only.

### US-111 — In-app notification center
**Epic:** E11 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-002

As a user, I want an in-app notification center so I can catch up on important events.

**Acceptance criteria**
- Given events, when I open notifications, then I see unread/read state and a clear action link.
- Given a notification, when I mark it read, then the state persists across devices.
- Given a sensitive event, when it is shown, then it contains no document contents or secrets.

### US-112 — SMS alerts
**Epic:** E11 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-110

As a user, I want SMS alerts for urgent events so I can respond quickly.

**Acceptance criteria**
- Given an opted-in user, when a high-priority event occurs, then an SMS alert is sent without sensitive details.
- Given an opt-out, when it is set, then no SMS is sent except legally required notices.
- Given an SMS failure, when it occurs, then email/in-app fallback is used.

**Notes:** SMS is never used for OTP or authentication.

### US-113 — Reminders and annual review
**Epic:** E11 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-038

As a user, I want reminders so my plan stays current.

**Acceptance criteria**
- Given an annual review due, when the date arrives, then I receive an email and in-app reminder.
- Given no response after 14 days, when the cadence continues, then a second reminder is sent.
- Given a completed review, when it is saved, then reminders stop until the next cycle.

### US-114 — Notification preferences and bounce handling
**Epic:** E11 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-110

As a user, I want to control notification channels so I am not overwhelmed.

**Acceptance criteria**
- Given preferences, when I change channels, then the change applies to future notifications.
- Given a bounce/complaint, when it occurs, then the address is suppressed and the user is prompted to update it.
- Given a critical security notice, when it is sent, then it cannot be disabled.

---

# E12 — Admin and ops console

**Goal:** A secure back office that lets a small team run verification and release with confidence.
**Success:** Ops can process a case end-to-end without engineering intervention; every admin action is audited.

### US-120 — Admin authentication and RBAC
**Epic:** E12 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-017

As an admin, I want separate authentication and roles so back-office access is tightly controlled.

**Acceptance criteria**
- Given an admin, when they sign in, then SSO/hardware key and MFA are required.
- Given a role, when the admin accesses a feature outside their role, then access is denied and audited.
- Given an admin session, when it is idle, then it expires and requires re-authentication.

### US-121 — Workspace 360 lookup
**Epic:** E12 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-120

As a support agent, I want a workspace view so I can help without accessing contents.

**Acceptance criteria**
- Given a workspace, when I search, then I see plan, members, item counts, and case status — no document contents.
- Given a sensitive action, when I open it, then I must provide a reason and the access is logged.
- Given a restricted workspace, when I try to view it, then access is denied unless I have the correct role.

### US-122 — Evidence viewer
**Epic:** E12 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-071

As a verification analyst, I want a secure evidence viewer so I can review documents without downloading them.

**Acceptance criteria**
- Given evidence, when I open it, then it is view-only, watermarked, and access-logged.
- Given a sensitive document, when I zoom/download, then bulk download is disabled and the action is audited.
- Given a case, when I close it, then evidence access is revoked unless retention requires it.

### US-123 — Release case dashboard and ceremony
**Epic:** E12 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-090

As a release manager, I want a dashboard and checklist so every release follows the same safe process.

**Acceptance criteria**
- Given releases, when I open the dashboard, then I see status, cooling-off, approvals, and blockers.
- Given a release, when I open the ceremony checklist, then I must complete each step before delivery.
- Given a step, when it is completed, then the actor and timestamp are recorded.

### US-124 — Legal hold and dispute console
**Epic:** E12 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-076

As a legal reviewer, I want a console to manage holds and disputes so releases stop when they should.

**Acceptance criteria**
- Given a case/release, when I place a hold, then release is blocked immediately and all parties are notified.
- Given a dispute, when I open it, then I see evidence, timeline, and communication history.
- Given a resolution, when I record it, then the outcome and rationale are audited.

### US-125 — Audit viewer and export
**Epic:** E12 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-140

As a compliance officer, I want to search and export audit events so I can investigate and report.

**Acceptance criteria**
- Given audit events, when I search by actor/action/subject/date, then results are returned with integrity status.
- Given an export, when I request it, then a signed CSV/JSON is generated and the export is audited.
- Given a tampered record, when the chain is verified, then the system flags it and raises an incident.

### US-126 — Support notes and macros
**Epic:** E12 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-121

As a support agent, I want notes and macros so I can help consistently without exposing sensitive data.

**Acceptance criteria**
- Given a ticket, when I add a note, then it is timestamped and visible to authorized staff only.
- Given a macro, when I use it, then the correct plain-language response is inserted.
- Given a note, when it contains sensitive data, then the system warns and redacts.

### US-127 — Super admin emergency freeze
**Epic:** E12 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-120

As a super admin, I want an emergency freeze so I can stop all releases during a security incident.

**Acceptance criteria**
- Given a platform incident, when I activate the freeze, then all release delivery is paused immediately.
- Given the freeze, when I activate it, then all stakeholders are notified and the action is audited.
- Given the freeze is lifted, when I deactivate it, then releases resume from their correct state.

### US-128 — Admin reason logging
**Epic:** E12 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-120

As a compliance officer, I want every sensitive admin action to require a reason so access is accountable.

**Acceptance criteria**
- Given a sensitive view/action, when I proceed, then I must select/enter a reason.
- Given a reason, when the action is audited, then the reason is stored with actor and timestamp.
- Given a missing reason, when I try to proceed, then the action is blocked.

### US-129 — Dual control and sensitive approvals
**Epic:** E12 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-128

As a security officer, I want dual control for sensitive actions so no single admin can abuse access.

**Acceptance criteria**
- Given a release/legal hold/freeze/key action, when one admin initiates, then a second different admin must approve.
- Given the same admin tries to approve their own action, when they do, then it is rejected.
- Given an approval, when it is recorded, then both identities and reasons are audited.

---

# E13 — Billing and subscriptions

**Goal:** Simple, trustworthy billing that supports family and future partner plans.
**Success:** A customer can subscribe, upgrade, cancel, and receive a correct invoice without support.

### US-130 — Plan catalog and entitlements
**Epic:** E13 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-021

As a product manager, I want a plan catalog and entitlement engine so packaging is consistent across the app.

**Acceptance criteria**
- Given plans, when I configure them, then features and limits are enforced consistently in UI and API.
- Given a workspace, when its plan changes, then entitlements update immediately.
- Given a limit, when it is exceeded, then the user sees a clear upgrade path.

### US-131 — Stripe checkout
**Epic:** E13 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-130

As a customer, I want to pay securely so I can activate my plan.

**Acceptance criteria**
- Given a plan, when I checkout, then Stripe handles payment and returns a confirmed subscription.
- Given a failed payment, when it occurs, then I see a clear error and can retry.
- Given a successful payment, when it completes, then the workspace is activated and a receipt is emailed.

### US-132 — Subscription lifecycle
**Epic:** E13 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-131

As a customer, I want to upgrade, downgrade, or cancel so my plan fits my needs.

**Acceptance criteria**
- Given an active plan, when I upgrade, then proration is applied and access updates immediately.
- Given a cancellation, when I confirm, then access remains until the period end and then expires.
- Given a past-due subscription, when the grace period ends, then the workspace becomes read-only, not deleted.

### US-133 — Invoices and receipts
**Epic:** E13 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-131

As a customer, I want invoices and receipts so I can manage my records.

**Acceptance criteria**
- Given a payment, when it succeeds, then an invoice/receipt is available in the billing portal and emailed.
- Given a tax field, when it is required, then it is captured and shown on the invoice.
- Given a refund, when it is issued, then a credit note is generated and audited.

### US-134 — Dunning and grace period
**Epic:** E13 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-132

As a customer, I want a grace period so a failed card does not immediately lock my family’s plan.

**Acceptance criteria**
- Given a failed payment, when it occurs, then I am notified and retries are scheduled.
- Given the grace period, when it is active, then I retain access with a visible banner.
- Given the grace period ends, when it does, then the workspace becomes read-only until payment.

### US-135 — Revenue reporting
**Epic:** E13 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-131

As a finance lead, I want revenue reporting so I can reconcile and forecast.

**Acceptance criteria**
- Given subscriptions, when I open the report, then MRR, churn, refunds, and taxes are shown by plan.
- Given a date range, when I export, then the data reconciles with the payment provider.
- Given a discrepancy, when it is detected, then an alert is created for finance.

---

# E14 — Audit and analytics

**Goal:** Immutable, queryable evidence of everything that matters, and privacy-preserving product insight.
**Success:** Every sensitive action is auditable; audit integrity can be proven; analytics contain no sensitive content.

### US-140 — Immutable audit events
**Epic:** E14 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-001

As a compliance officer, I want every sensitive action recorded immutably so we can prove what happened.

**Acceptance criteria**
- Given a sensitive action, when it occurs, then an audit event is written with actor, action, subject, timestamp, and request ID.
- Given an audit event, when it is written, then it cannot be updated or deleted by application code.
- Given a failed write, when it occurs, then the action fails closed or is queued with an alert.

### US-141 — Hash chain and anchor
**Epic:** E14 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-140

As a security engineer, I want a hash-chained audit log so tampering is detectable.

**Acceptance criteria**
- Given audit events, when they are written, then each includes the previous hash and its own hash.
- Given a daily anchor, when it is created, then it is stored in immutable object storage.
- Given a verification job, when it runs, then any break in the chain raises a critical incident.

### US-142 — Audit export
**Epic:** E14 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-140

As a compliance officer, I want to export audit data so I can respond to regulators and courts.

**Acceptance criteria**
- Given a date range/subject, when I export, then a signed, redacted CSV/JSON is generated.
- Given an export, when it is downloaded, then the export itself is audited.
- Given large exports, when requested, then they are queued and delivered via a secure link.

### US-143 — Product analytics
**Epic:** E14 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-001

As a product manager, I want privacy-preserving analytics so I can improve activation and release success.

**Acceptance criteria**
- Given key events, when they occur, then they are recorded without PII or document content.
- Given a dashboard, when I view it, then I can see activation, completion, and release funnels.
- Given a consent change, when a user opts out, then analytics stops for that user.

### US-144 — Operations dashboards
**Epic:** E14 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-140

As an ops manager, I want dashboards so I can manage SLAs, queues, and release health.

**Acceptance criteria**
- Given cases, when I open the dashboard, then I see volume, aging, SLA breaches, and outcomes.
- Given a release, when I open the dashboard, then I see cooling-off, approvals, and delivery status.
- Given an anomaly, when it is detected, then the dashboard highlights it and alerts the owner.

### US-145 — Retention and deletion jobs
**Epic:** E14 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-140

As a privacy officer, I want retention and deletion jobs so data does not outlive its purpose.

**Acceptance criteria**
- Given a retention policy, when the job runs, then expired data is purged or anonymized.
- Given a legal hold, when it applies, then deletion is skipped and the reason is recorded.
- Given a deletion, when it completes, then an audit event records the scope (no content).

---

# E15 — Compliance and privacy

**Goal:** Meet GDPR/NDPR obligations and make data rights operationally real.
**Success:** DSAR/erasure completed within statutory timelines; consent versioned; breach runbook tested.

### US-150 — Consent management
**Epic:** E15 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-023

As a user, I want granular consent so I control how my data is used.

**Acceptance criteria**
- Given a consent purpose, when I grant/withdraw it, then the choice is versioned and applied.
- Given a policy update, when it occurs, then I am asked to re-consent where required.
- Given a consent change, when it occurs, then it is audited.

### US-151 — Terms and privacy acceptance
**Epic:** E15 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-020

As a user, I want to review and accept terms/privacy so I know the rules.

**Acceptance criteria**
- Given signup, when I proceed, then I must accept the current terms and privacy policy.
- Given a version change, when I log in, then I am prompted to review and accept.
- Given acceptance, when it is recorded, then version, timestamp, and IP hash are stored.

### US-152 — DSAR workflow
**Epic:** E15 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-140

As a user, I want to request my data so I can exercise my privacy rights.

**Acceptance criteria**
- Given a request, when I submit it, then identity is verified and a tracked case is created.
- Given the statutory deadline, when it approaches, then the case is escalated.
- Given completion, when I receive the export, then it includes the required data in a machine-readable format.

### US-153 — Erasure workflow
**Epic:** E15 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-152

As a user, I want to delete my data so I can exercise my right to erasure.

**Acceptance criteria**
- Given an erasure request, when verified, then the workspace is scheduled for deletion and the user is informed of legal-hold exceptions.
- Given the retention window, when it passes, then documents, metadata, and derived data are purged.
- Given a legal hold, when it applies, then deletion is limited and the reason is documented.

### US-154 — Data export
**Epic:** E15 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-152

As a user, I want to export my plan so I am not locked in.

**Acceptance criteria**
- Given a workspace, when I request an export, then a portable archive with metadata, instructions, and documents is generated.
- Given the export, when it is downloaded, then it is encrypted and the link expires.
- Given an export, when it completes, then the event is audited.

### US-155 — Breach notification workflow
**Epic:** E15 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-140

As a security officer, I want a breach workflow so we meet notification obligations.

**Acceptance criteria**
- Given a suspected breach, when it is declared, then an incident is created with severity and timeline.
- Given a notifiable breach, when confirmed, then the regulator/customer notification steps and deadlines are displayed.
- Given completion, when the incident closes, then a postmortem and audit record are stored.

---

# E16 — Accessibility, localization, and content

**Goal:** A product a non-technical, grieving family can actually use.
**Success:** WCAG 2.2 AA; plain-language content; responsive on low-end mobile.

### US-160 — Design system and components
**Epic:** E16 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-020

As a designer/engineer, I want a shared design system so the product is consistent and accessible.

**Acceptance criteria**
- Given a component, when used, then it meets accessibility and brand standards.
- Given a new screen, when built, then it uses approved components and tokens.
- Given a component change, when released, then visual regression tests pass.

### US-161 — WCAG 2.2 AA audit and fixes
**Epic:** E16 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-160

As a user with a disability, I want the product to be accessible so I can protect my family.

**Acceptance criteria**
- Given the core journeys, when audited with axe/manual testing, then no critical/serious issues remain.
- Given keyboard-only use, when I navigate, then all actions are reachable with visible focus.
- Given a screen reader, when I use the core flows, then labels and errors are announced correctly.

### US-162 — Localization framework
**Epic:** E16 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-160

As a product team, I want externalized strings so we can add languages without rewriting screens.

**Acceptance criteria**
- Given UI copy, when it is added, then it uses translation keys and supports interpolation/pluralization.
- Given a locale, when selected, then dates/numbers/currency format correctly.
- Given a missing translation, when it occurs, then the fallback is English and the gap is logged.

### US-163 — Plain-language content
**Epic:** E16 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-020

As a non-technical user, I want plain language so I understand what I am doing.

**Acceptance criteria**
- Given core copy, when reviewed, then it targets grade 8 readability and avoids crypto/legal jargon.
- Given a technical term, when it is necessary, then it is explained in one sentence.
- Given a legal/security disclaimer, when shown, then it is clear and not buried.

### US-164 — Responsive mobile web
**Epic:** E16 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-160

As a mobile user, I want the product to work on my phone so I can set up my plan anywhere.

**Acceptance criteria**
- Given a 360px viewport, when I use core flows, then layout, navigation, and forms are usable.
- Given a slow connection, when I load the app, then progressive loading and retry states are shown.
- Given touch input, when I interact, then targets are large enough and no hover-only actions exist.

### US-165 — Error, empty, and loading states
**Epic:** E16 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-160

As a user, I want clear states so I never feel lost or worried.

**Acceptance criteria**
- Given an error, when it occurs, then I see a plain-language message and a next step.
- Given an empty state, when I open a section, then I see guidance, not a blank page.
- Given a loading state, when data is pending, then I see a skeleton/spinner and can cancel long operations.

---

# E22 — Trust and security program (MVP subset)

**Goal:** Earn the right to ask families to trust us with their most important information.
**Success:** Pen test passed, incident response tested, disclosure policy live, continuity plan started.

### US-180 — Threat model and security review
**Epic:** E22 · **Priority:** P0 · **Estimate:** 5 · **Dependencies:** US-001

As a security engineer, I want a threat model so the team designs against realistic attacks.

**Acceptance criteria**
- Given the architecture, when reviewed, then threats and controls are documented per domain.
- Given a new high-risk feature, when designed, then a threat model update is required.
- Given a security review, when complete, then findings are tracked to closure.

### US-181 — Penetration test and remediation
**Epic:** E22 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-180

As a security lead, I want an independent pen test so launch is not blind to exploitable issues.

**Acceptance criteria**
- Given a pre-launch scope, when the test completes, then critical/high findings are fixed or formally accepted.
- Given a finding, when remediation is done, then a retest confirms the fix.
- Given the final report, when stored, then it is available to partners under NDA.

### US-182 — Incident response runbook and tabletop
**Epic:** E22 · **Priority:** P0 · **Estimate:** 3 · **Dependencies:** US-180

As an incident commander, I want a tested runbook so we respond calmly to a breach or release failure.

**Acceptance criteria**
- Given an incident scenario, when the tabletop runs, then roles, communication, and escalation are exercised.
- Given a runbook, when an incident occurs, then the team can follow it without engineering guesswork.
- Given a tabletop, when it ends, then action items are tracked and the runbook is updated.

### US-183 — Vulnerability disclosure policy
**Epic:** E22 · **Priority:** P0 · **Estimate:** 2 · **Dependencies:** US-181

As a researcher, I want a clear disclosure policy so I can report issues safely.

**Acceptance criteria**
- Given a security report, when submitted, then it is acknowledged within 2 business days.
- Given a valid report, when triaged, then severity, owner, and timeline are recorded.
- Given a public policy, when published, then it includes scope, safe harbor, and contact.

### US-184 — Continuity Trust setup
**Epic:** E22 · **Priority:** P0 · **Estimate:** 8 · **Dependencies:** US-180

As a founder, I want a continuity structure so the vault promise survives the company.

**Acceptance criteria**
- Given the legal structure, when established, then escrow material, source code, and runbooks have a named custodian.
- Given a shutdown scenario, when triggered, then the recovery process and beneficiary communication plan are documented.
- Given an annual review, when it occurs, then the trust and recovery plan are tested.

### US-185 — Security whitepaper
**Epic:** E22 · **Priority:** P1 · **Estimate:** 3 · **Dependencies:** US-180

As a partner or customer, I want a clear security whitepaper so I can evaluate LifeProof.

**Acceptance criteria**
- Given the whitepaper, when published, then it explains architecture, encryption, access controls, audits, and limitations.
- Given a claim, when reviewed, then it is accurate and not misleading (no “zero-knowledge” if not true).
- Given an update, when released, then it is versioned and dated.

---

# MVP release slices

| Slice | Sprints | Epics | Outcome |
|---|---|---|---|
| **S0 — Foundation** | 1–2 | E01, E02 (start) | CI/CD, environments, auth foundation |
| **S1 — First vault** | 2–4 | E02, E03, E04 | Sign up, create workspace, add/seal first item |
| **S2 — Documents** | 4–5 | E05 | Upload, scan, encrypt, preview documents |
| **S3 — Family** | 5–6 | E06, E07 | Beneficiaries, trusted contacts, conditions, preview |
| **S4 — Verification** | 6–8 | E08, E12 (start) | Cases, evidence, KYC, review, legal hold |
| **S5 — Release** | 8–10 | E09, E10 | Release cases, cooling-off, delivery, receipts, emergency pack |
| **S6 — Operations** | 9–11 | E12, E13, E14 | Admin console, billing, audit, analytics |
| **S7 — Launch** | 11–12 | E15, E16, E22 | Compliance, accessibility, pen test, DR, launch |

---

# MVP Definition of Done

The MVP is done when:

1. A real family can complete the full journey in a production-like environment.
2. A real release is completed with evidence, dual approval, cooling-off, and a receipt.
3. Every P0 story is accepted and tested.
4. Pen test critical/high findings are closed or formally accepted.
5. Legal opinion, terms, privacy, DPIA, and insurance are in place.
6. Ops runbook and SLAs are trained and exercised.
7. Backups restore and DR game day pass.
8. Accessibility audit passes WCAG 2.2 AA for core journeys.
9. Analytics and audit dashboards are live.
10. Launch checklist in `01_PRD.md` is complete.

---

# Traceability summary

| PRD requirement group | MVP epics | Notes |
|---|---|---|
| FR-AUTH | E02 | Passkeys/TOTP/RBAC |
| FR-WS | E03 | Workspace/onboarding |
| FR-INV | E04 | Catalog/sealing |
| FR-DOC | E05 | Documents/encryption |
| FR-BEN | E06 | Relationships |
| FR-REL | E07 | Conditions |
| FR-VER | E08 | Verification |
| FR-ORC | E09 | Release |
| FR-EXP/RHE | E10 | Emergency pack (rehearsal P1) |
| FR-NOT | E11 | Notifications |
| FR-ADM | E12 | Admin/ops |
| FR-BIL | E13 | Billing |
| FR-AUD | E14 | Audit/analytics |
| FR-DSR | E15 | Privacy/data rights |
| FR-L10N | E16 | Accessibility/localization |
| FR-TRUST | E22 | Security/trust (MVP subset) |
| FR-PAR | E17 (Phase 2) | Partner platform |
| FR-CRY | E18 (Phase 2) | Crypto continuity |
| FR-BIZ | E19 (Phase 3) | Business continuity |
| FR-DUR | E20 (Phase 2) | Duress/coercion |
| FR-INT | E05/E08/E13/E21 | Integrations delivered in domain epics; E21 for later |

---

**End of MVP Epics & Stories (Part 1 + Part 2)**

