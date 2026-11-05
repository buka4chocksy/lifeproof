# 00 — Strategy Kernel

**Status:** Locked for the v2.0 build
**Purpose:** The single source of truth that every product, architecture, delivery, and business decision must trace back to.

---

## The bottom line

> **LifeProof is a verified-release infrastructure company with a family-facing vault, sold through trusted intermediaries, with crypto as a premium partner-led module and concierge as the trust-building service.**
>
> **The vault is the hook. The release is the product. The verification network and legal acceptance are the moat.**

---

## What this means — the seven implications

### 1. We are infrastructure, not a consumer crypto app
Our core asset is the **verification and release engine** that partners embed or connect to. The consumer vault is how families enter, but the long-term value is the platform that insurers, solicitors, exchanges, employers, and estate planners use to verify a life event and release access safely.

**Build implication:** API-first domain design from day one. Every internal capability — verification, release, evidence, notifications — must be exposable as a partner capability later. The partner portal/API is a Phase 2 exposure layer, not a rewrite.

### 2. The family-facing vault is the front door
The mass market is families with wills, insurance, property, IDs, accounts, and instructions. Crypto holders are a premium niche. The vault must be plain-language, category-first, and useful while everyone is alive.

**Build implication:** Documents, instructions, beneficiaries, emergency packs, and annual reviews are MVP. Crypto seed storage is explicitly out of scope. Crypto continuity is a Phase 2 partner-led module.

### 3. We are sold through trusted intermediaries
Trust is the bottleneck. Solicitors, will-writers, insurers, brokers, accountants, exchanges, and employers already have the relationship. We win by making them look good, not by asking families to trust a stranger on the internet.

**Build implication:** Partner portal, white-label, referral tracking, revenue share, professional roles, and bulk client management are first-class requirements — not afterthoughts.

### 4. Crypto is a premium, partner-led module
We do not store seed phrases or private keys. We coordinate with custody partners (multisig/MPC) where LifeProof is the verifier/co-signer, not the secret holder.

**Build implication:** Phase 2 crypto adapter framework; no seed-phrase fields in the data model; partner custody integrations; crypto-specific release rehearsal.

### 5. Concierge is the trust-building service
Grieving families cannot be left alone with a dashboard. Human-assisted setup and release is how we earn trust, learn the process, and fund early operations.

**Build implication:** MVP includes an internal ops console and a manual release runbook. Concierge is a productized service line, not a support afterthought.

### 6. The release is the product
Anyone can encrypt a file. The hard, valuable thing is determining when a release should happen, proving entitlement, protecting against fraud, satisfying legal requirements, and delivering access without creating a new disaster.

**Build implication:** Verification case management, evidence, cooling-off, legal hold, dispute handling, identity re-verification, and auditable release ceremonies are P0. They get more investment than storage features.

### 7. Verification network + legal acceptance are the moat
Encryption is commodity. The moat is the network of trusted contacts, professionals, registries, insurers, and legal playbooks that make a release accepted and defensible.

**Build implication:** Verification signals, professional attestations, jurisdiction playbooks, legal hold workflows, audit evidence, and partner integrations are core platform capabilities.

---

## What we are / what we are not

| We are | We are not |
|---|---|
| A verified-release infrastructure platform | A crypto wallet or seed-phrase vault |
| A family-facing continuity vault | A password manager |
| A B2B2C platform sold through trusted intermediaries | A pure D2C app |
| A verification and release orchestration layer | A law firm or probate provider |
| A concierge-assisted trust service | A self-serve-only SaaS |
| A continuity institution with a trust/foundation | A feature that dies with the startup |

---

## Decision filters

Every new requirement, feature, partnership, or hire must pass these questions:

1. **Does it strengthen verification or release?** If not, it is probably a distraction in Phase 1.
2. **Does it help a trusted intermediary sell or operate?** If not, question the channel.
3. **Does it reduce the honeypot and liability?** Prefer pointers, integrations, and partners over storing secrets.
4. **Can a grieving, non-technical beneficiary complete the journey?** If not, simplify or add concierge.
5. **Is it legally defensible in the launch jurisdiction?** If not, do not ship it.
6. **Does it work if LifeProof disappears?** If not, add a continuity mechanism.
7. **Can it be audited and explained to a regulator, insurer, or court?** If not, redesign it.
8. **Does it create recurring value while everyone is alive?** If not, expect churn.
9. **Can it be exposed as an API to a partner later?** If not, fix the domain boundary now.
10. **Does it help us prove the release loop end-to-end?** If not, defer it.

---

## Non-negotiables

- No plaintext secrets at rest.
- No seed phrases or private keys stored by LifeProof.
- No SMS OTP for vault or release operations.
- No release without identity verification, evidence, and cooling-off.
- No single admin can access document contents or trigger an escrow release.
- No launch without a legal opinion, penetration test, and release runbook.
- No scope expansion before the release loop is proven end-to-end.
- No feature that makes the family journey harder to understand.
- No partnership that compromises beneficiary privacy or auditability.
- No dependence on the company's perpetual existence without a continuity plan.

---

## How the build documents trace to this kernel

| Document | How it expresses the kernel |
|---|---|
| `01_PRD.md` | Product scope, personas, requirements, and launch criteria are organized around vault → verification → release → partner → concierge |
| `02_ARCHITECTURE.md` | Verification engine and release orchestration are core services; vault is a catalog; partner API is a first-class exposure layer; crypto is an adapter |
| `03A_EPICS_MVP.md` | MVP epics prioritize documents, beneficiaries, verification, release, concierge ops, audit, and partner-readiness |
| `03B_EPICS_PHASE2_3.md` | Partner portal/API, crypto continuity, business continuity, mobile, duress, trust program |
| `04_DELIVERY_PLAN.md` | Phase 1 proves the release loop with manual ops; Phase 2 exposes the platform to partners; Phase 3 scales |
| `05_BUSINESS_GTM_OPERATIONS.md` | Revenue from family subscriptions, partner/white-label, API, and concierge; channel-led GTM; legal/continuity structure |
| `backlog.csv` | Stories are ordered by the release-loop proof, not by feature count |

---

## Success conditions for the kernel

The strategy is working when:

- A real family completes a real release, end-to-end, with evidence and audit.
- A solicitor, insurer, or will-writer refers or white-labels the service.
- A beneficiary can complete the journey without crypto knowledge.
- The platform can prove what happened, who approved it, and why — to a court, insurer, or regulator.
- Crypto partners integrate without LifeProof holding secrets.
- The Continuity Trust and open recovery client make the promise credible beyond the company's life.
- Partner-sourced revenue grows faster than direct paid acquisition.

---

## Failure modes to avoid

- Becoming a crypto vault with a compliance wrapper.
- Building a beautiful consumer app that no channel wants to sell.
- Automating verification before the manual process is proven.
- Expanding to three jurisdictions before one works.
- Adding family/subscription features before the release loop is trustworthy.
- Storing secrets because it is easier than integrating.
- Treating legal as a later task.
- Letting the company's survival be the single point of failure.
- Competing with password managers instead of integrating with them.
- Measuring signups instead of completed, verified plans and successful releases.
