# LifeProof Portal — Database Schema

**Status:** Baseline scaffold. DBA owns the next revision.
**Source:** [`../build-plan/02_ARCHITECTURE.md`](../build-plan/02_ARCHITECTURE.md) §6, §13 and
[`../build-plan/01_PRD.md`](../build-plan/01_PRD.md) §12.

## 1. Tenancy model

- Shared PostgreSQL schema; every tenant-owned table has `workspace_id`.
- Row-Level Security is enforced at the database layer — live since migration `0001_giant_miracleman`
  (T-005). Policies scope rows via `app.workspace_id`; members also match a user's own rows via
  `app.current_user_id` (D-002).
- `workspaces` has two SELECT policies, OR-combined (PostgreSQL SELECT policies are additive):
  - `workspaces_select_tenant` — `id = app.workspace_id` (get-one path).
  - `workspaces_select_member` — `owner_id = app.current_user_id` OR membership via
    `workspace_members` (added in `0002_workspaces_select_member`, T-014 / D-019). It enables
    `GET /workspaces` (list the caller's workspaces) and the owner's `INSERT … RETURNING` during
    create, without cross-tenant leakage.
- Per transaction, the application sets `app.workspace_id` and `app.current_user_id`.
- GUC hardening (T-015 / D-020): every policy that casts a session GUC to `uuid` wraps the read in
  `NULLIF(current_setting('…', true), '')` so an empty-string GUC (left by `SET LOCAL` + rollback on a
  pooled connection) degrades to `NULL` and **fails closed** (zero rows) instead of raising
  `invalid input syntax for type uuid: ""`. Applied in `0003_nullif_harden_rls` via in-place
  `ALTER POLICY … USING / WITH CHECK` (no DROP + CREATE, no grant-set change, no
  `FORCE ROW LEVEL SECURITY`).
- Partner access is scoped by `partner_id` and an explicit consent grant.
- Admin access uses a separate role, a reason, and an expiry. It must not silently bypass RLS.
- No cross-tenant joins in application queries. Reporting uses a separate read model.

## 2. Baseline tables (scaffold)

Defined in [`../../db/src/schema.ts`](../../db/src/schema.ts):

| Table | Purpose | Notes |
|---|---|---|
| `users` | Account identity | `email_ciphertext` + unique `email_hash`; never store plaintext email. |
| `workspaces` | Personal/family/business tenant | `region` defaults to `'GB'` (D-014 / D-P0-01); `'NG'` remains supported with no build work until gated. |
| `workspace_members` | Membership and role | Unique `(workspace_id, user_id)`; roles include owner/admin/member/family organiser/beneficiary. |
| `audit_events` | Append-only audit ledger | `actor_id` nullable FK to `users`; `workspace_id` NOT NULL; `prev_hash`/`hash` reserved for US-141. |

The baseline tables now carry RLS policies and the append-only `audit_events` ledger (T-005), and
`workspaces` gained the `workspaces_select_member` SELECT policy (T-014) for list-by-owner/member.
The full vault/verification/release model is still to be built.

## 3. Planned core tables

- `vault_items`, `item_versions` — category-first inventory, append-only history.
- `documents`, `document_versions` — encrypted object metadata, scan status, key reference, SHA-256.
- `beneficiaries`, `beneficiary_assignments` — encrypted PII, shares validated to 100%.
- `trusted_contacts` — verifier/executor/guardian/professional roles and consent.
- `release_conditions` — trigger type, cooling-off, verifier requirements, JSONB rules.
- `verification_cases`, `verification_signals`, `evidence`, `review_decisions` — case lifecycle,
  multi-signal evidence, four-eyes decisions.
- `release_cases`, `release_access`, `release_receipts` — cooling-off, scoped grants, proof of delivery.
- `legal_holds`, `disputes` — suspension and appeal paths.
- `audit_events` — **implemented (T-005)** — append-only, hash-chained, 7-year retention (see §2 and §5).
- `consents` — versioned consent purposes.
- `outbox_events` — reliable domain events.
- `emergency_packs` — versioned pack metadata and PIN hash.

## 4. Encryption and PII

- Never store plaintext secrets, seed phrases, or private keys.
- Sensitive PII columns are encrypted with KMS-derived keys.
- Email lookup uses a deterministic hash; the ciphertext is for display/communication.
- Document data keys are wrapped by KMS and stored with document metadata. Decrypt calls are logged.
- No document contents in logs, analytics, error messages, or notification bodies.
- The MVP is not zero-knowledge; do not claim it is.

## 5. Audit

- Every sensitive action writes an immutable audit event with actor, action, subject, timestamp,
  request ID, IP hash, and before/after hashes.
- Events form a hash chain. Daily anchors go to immutable storage.
- Append-only is enforced at the database layer: `app_user` holds only SELECT + INSERT on
  `audit_events` (UPDATE/DELETE/TRUNCATE are revoked), and `audit_events_deny_mutation()` triggers raise
  on `BEFORE UPDATE OR DELETE` (row) and `BEFORE TRUNCATE` (statement).
- `prev_hash`/`hash` columns are present now; hash-chain computation and daily anchoring are delivered
  later in US-141.
- A break in the chain is a critical incident.
- Audit records survive account deletion with PII minimized.

## 6. Retention

| Data | Retention |
|---|---|
| Account/profile | Plan lifetime + 30 days after deletion |
| Vault items/documents | Plan lifetime + 30 days; soft delete 30 days |
| Verification evidence | 7 years or legal requirement |
| Release records/receipts | 7 years |
| Audit events | 7 years |
| Billing records | 7 years |
| Analytics | 24 months, no PII |

Legal holds override deletion with a documented reason.

## 7. Migration rules

- PostgreSQL 16 is the target.
- Expand/contract migrations; no destructive change in the same release.
- Every migration is reversible and tested against an empty database and a populated one.
- RLS policies are tested with a non-owner role.
- Seeds are synthetic only.
- Destructive operations require explicit human approval.
- The DBA owns `db/*` and `docs/database/*`; backend never edits migrations.

## 8. Open decisions

- Launch jurisdiction (affects region values and legal retention).
- KMS provider and key ceremony.
- Whether partner tenancy uses shared or dedicated schemas.
- Document preview/OCR privacy approach.
- Audit anchoring storage and cadence.
