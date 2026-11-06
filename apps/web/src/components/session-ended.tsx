import Link from 'next/link';
import { buttonClasses } from './button';

/**
 * Unauthorized / expired-session state (design §9.3, §9.4). The API has no
 * sign-in route yet, so this is not a redirect: it replaces the screen and
 * offers a safe way back rather than an empty form.
 */
export function SessionEndedPanel() {
  return (
    <section
      aria-labelledby="session-ended-heading"
      className="rounded-2xl border border-line-strong bg-white p-6 sm:p-8"
    >
      <h1 id="session-ended-heading" className="font-display text-3xl leading-tight tracking-tight">
        Your session has ended
      </h1>
      <p className="mt-3 text-base leading-6 text-muted">Sign in to continue.</p>
      <p className="mt-2 text-sm leading-5 text-muted">
        Sign-in is not part of this preview build yet.
      </p>
      <Link href="/" className={`${buttonClasses('secondary')} mt-6`}>
        Go to the home page
      </Link>
    </section>
  );
}
