import { colors } from '@lifeproof/design-tokens';
import Link from 'next/link';
import { brandName, homeLabel, wordmark } from '@/lib/brand';

interface AppHeaderProps {
  /** Shown in the header once a workspace is loaded (design §9.4). */
  workspaceName?: string;
}

export function AppHeader({ workspaceName }: AppHeaderProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={homeLabel}
          className="flex min-h-[44px] items-center gap-3 rounded-full"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.accent }} />
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
        </Link>

        {workspaceName ? (
          <p className="order-3 w-full basis-full truncate text-sm font-medium text-ink sm:order-none sm:w-auto sm:max-w-[40%] sm:basis-auto">
            {workspaceName}
          </p>
        ) : null}

        <details className="relative">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center rounded-full border border-line-strong bg-white px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent [&::-webkit-details-marker]:hidden">
            Help
          </summary>
          <div className="absolute right-0 z-10 mt-2 w-64 rounded-xl border border-line-strong bg-white p-4 text-sm leading-6 text-muted shadow-soft">
            Human support is coming in a later milestone.
          </div>
        </details>
      </div>
    </header>
  );
}
