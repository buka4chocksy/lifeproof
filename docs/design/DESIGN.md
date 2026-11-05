# LifeProof Portal — Design Foundation

**Status:** Draft — designer owns the next revision.
**Sources:** [`../build-plan/01_PRD.md`](../build-plan/01_PRD.md) §6–11, §15 and
[`../build-plan/02_ARCHITECTURE.md`](../build-plan/02_ARCHITECTURE.md) §7.

## 1. Design principles

1. **Trust is the interface.** Every screen should make the next step obvious and the consequences
   clear. No surprises, no hidden state, no clever ambiguity.
2. **Grief-sensitive by default.** A beneficiary may be in crisis. Use calm language, generous spacing,
   and a visible way to get human help. Never use urgency, fear, or dark patterns.
3. **Plain language.** Target grade 8 readability. Avoid crypto, legal, and insurance jargon unless it
   is explained in one sentence.
4. **Show the chain.** Users should understand: what is stored, who can see it, what condition releases
   it, what evidence is required, and what happens after release.
5. **Accessible for the hard moment.** WCAG 2.2 AA is the floor. Keyboard, screen reader, low bandwidth,
   small screens, and reduced motion are core.
6. **No crypto aesthetic.** This is a family safe, not a wallet. Trust comes from clarity and evidence,
   not from techno-futurism.

## 2. People and contexts

- **Family organiser** — practical, time-poor, wants a checklist and a sense of completion.
- **Asset holder** — wants control, privacy, and a clear preview of what their family will see.
- **Beneficiary** — may be grieving, may not know the product, needs a guided path and human support.
- **Ops / concierge** — needs queues, evidence, SLAs, dual control, and an audit trail.
- **Professional partner** (Phase 2) — needs status and consent, not document contents.

## 3. Core flows to specify

1. Guided onboarding → security explainer → consent → workspace.
2. Add a vault item → link a document → assign a beneficiary → configure a condition → seal.
3. Invite a beneficiary and a trusted contact → consent → preview.
4. Family preview: exactly what each beneficiary will see, without contents before release.
5. Emergency pack generation and PIN protection.
6. Verification case: evidence checklist, identity verification, trusted contact attestation, review.
7. Release: cooling-off, re-verification, dual approval, secure session, receipt.
8. Dispute / legal hold: pause, explain, resolve.
9. Admin: queue, evidence viewer, dual control, reason logging, emergency freeze.
10. Annual review and life-event update.

## 4. Visual system

The foundation uses an editorial, warm, low-anxiety palette. The tokens live in
[`../../packages/design-tokens/src/index.ts`](../../packages/design-tokens/src/index.ts) and are mirrored
as CSS variables in `apps/web/src/app/globals.css`.

| Role | Value | Use |
|---|---|---|
| Ink | `#182420` | primary text, dark buttons |
| Paper | `#f7f3ec` | page background |
| Cream | `#fffdf8` | cards, surfaces |
| Accent | `#1f6f5c` | trust actions, focus, links |
| Accent soft | `#dcebe4` | selected states, calm highlights |
| Highlight | `#d9a441` | attention without alarm |
| Muted | `#5f6b65` | secondary text |
| Line | `#d9d2c3` | borders and dividers |

- **Display type:** a warm serif for headings only.
- **Body type:** system sans for readability and performance.
- **Spacing:** 4/8 px rhythm; generous section spacing.
- **Radii:** soft, not playful; 8–24 px.
- **Motion:** 120–280 ms, ease-out; never use motion to convey critical state alone.
- **Focus:** 2 px accent outline with 3 px offset. Always visible.
- **Touch targets:** at least 44 × 44 px.

## 5. Content rules

- Say what happened, what happens next, and who to contact.
- Use “you” and “your family”, not “the user”.
- Never promise “zero-knowledge”; the MVP uses KMS envelope encryption.
- Do not display document contents in notifications, email, analytics, or logs.
- Explain legal/security disclaimers in place, not in a buried footer.
- For errors: plain-language cause + next step + support path.
- For empty states: guidance and one primary action, never a blank page.

## 6. Required states

Every core screen needs: loading, empty, error, success, disabled, unauthorized, expired session,
partial data, offline/retry, and “we need more evidence” states. Release and verification screens also
need legal hold, cooling-off, and re-verification states.

## 7. Accessibility acceptance

- WCAG 2.2 AA for all core journeys.
- Keyboard-only completion of onboarding, item creation, beneficiary invitation, and release access.
- Screen-reader labels and error announcements.
- 360 px viewport support; no hover-only actions.
- Reduced-motion support; no time-limited interactions without an extension path.
- axe checks in CI; manual audit before launch.

## 8. Open design decisions

- Brand/trademark direction (LifeProof is an OtterBox trademark).
- Launch jurisdiction and cultural/legal language.
- Auth provider UI boundaries and passkey onboarding.
- How much of the release ceremony is visible to the beneficiary.
- Emergency pack format and print layout.
