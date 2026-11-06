import { colors } from '@lifeproof/design-tokens';
import Link from 'next/link';
import { brandName, homeLabel, siteName, wordmark } from '@/lib/brand';

const releaseSteps = [
  {
    title: 'Vault',
    description:
      'Documents, instructions, and pointers are organized by category and sealed with care.',
  },
  {
    title: 'Verify',
    description:
      'A death or incapacity claim is reviewed through evidence, identity checks, and trusted signals.',
  },
  {
    title: 'Cooling-off',
    description:
      'Time and legal holds protect against mistakes, disputes, and coercion before anything is delivered.',
  },
  {
    title: 'Release',
    description:
      'The right beneficiary receives scoped, time-limited access with a signed receipt and an audit trail.',
  },
];

const pillars = [
  {
    label: 'For families',
    title: 'A vault that is useful while everyone is alive.',
    body: 'Store wills, policies, property records, IDs, accounts, and the instructions that make them usable. Plain language, no crypto knowledge required.',
  },
  {
    label: 'For the hard moment',
    title: 'Release is a process, not a download link.',
    body: 'Evidence, identity verification, cooling-off, dual approval, legal hold, and a receipt. The release is the product.',
  },
  {
    label: 'For trust',
    title: 'Built to be audited and explained.',
    body: 'Tenant isolation with row-level security, immutable audit events, KMS-backed encryption, and no storage of seed phrases or private keys.',
  },
];

const statusItems = [
  {
    title: 'Monorepo + quality gates',
    body: 'Next.js, NestJS, pnpm workspaces, Biome, Vitest, and GitHub Actions.',
  },
  {
    title: 'Local infrastructure',
    body: 'PostgreSQL 16 and Redis defined in Docker Compose; local S3 storage follows the document pipeline.',
  },
  {
    title: 'API health contract',
    body: 'GET /v1/health reports service and database readiness.',
  },
  {
    title: 'Agent delivery team',
    body: 'Owner, PM, designer, DBA, backend, frontend, and read-only reviewer.',
  },
];

const openDecisions = [
  'Launch jurisdiction and beachhead market',
  'Brand and trademark decision',
  'Managed auth provider',
  'KMS envelope encryption rollout and the later client-side tier',
  'Pricing and concierge economics',
];

export default function HomePage() {
  return (
    <main id="main" className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <a href="/" className="flex items-center gap-3" aria-label={homeLabel}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white">
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </span>
            <span>
              <span className="block font-display text-xl leading-none tracking-tight">
                {wordmark}
              </span>
              {brandName ? (
                <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-muted">
                  Portal
                </span>
              ) : null}
            </span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
              Foundation build
            </span>
            <a
              className="rounded-full px-3 py-1 text-xs font-medium text-accent hover:bg-accent-soft"
              href="#status"
            >
              Build status
            </a>
          </div>
        </header>

        <section className="grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Verified release infrastructure
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              What matters to your family, released only when it should be.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              A continuity vault with a verified release process: store the documents and
              instructions that matter, name who receives them, and make sure access happens with
              evidence, identity checks, and time to pause.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-5 py-3 text-base font-medium text-white transition-colors hover:bg-accent"
                href="/workspaces/new"
              >
                Create your safe
              </Link>
              <a
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-line-strong bg-white px-5 py-3 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                href="#status"
              >
                See the build status
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              Local foundation build. This is not a production service yet.
            </p>
          </div>

          <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">The release chain</p>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                Phase 1
              </span>
            </div>
            <ol className="mt-6 space-y-5">
              {releaseSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-xs font-medium text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className="grid gap-6 border-t border-line py-14 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {pillar.label}
              </p>
              <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{pillar.body}</p>
            </article>
          ))}
        </section>

        <section id="status" className="scroll-mt-8 border-t border-line py-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Current state
              </p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight tracking-tight">
                The foundation is in place. The release loop is next.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                This scaffold establishes the monorepo, local data services, API health contract,
                design tokens, and the agent operating model. Product discovery and the first
                vertical slice come next.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {statusItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl tracking-tight">Open product decisions</h3>
                <p className="mt-1 text-sm text-muted">
                  The team must not hardcode these before the owner records a decision.
                </p>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                Phase 0 gate
              </span>
            </div>
            <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
              {openDecisions.map((decision) => (
                <li key={decision} className="flex gap-2">
                  <span aria-hidden="true" className="text-highlight">
                    —
                  </span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-line pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-end sm:justify-between">
          <p>
            {siteName} · Phase 1 MVP foundation · Source of truth:{' '}
            <span className="text-ink">docs/build-plan/00_STRATEGY_KERNEL.md</span>
          </p>
          <p className="font-display text-sm italic text-ink">
            The vault is the hook. The release is the product.
          </p>
        </footer>
      </div>
    </main>
  );
}
