'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, getWorkspace } from '@/lib/api';
import { comingSoonMessage } from '@/lib/categories';
import type { Workspace } from '@/lib/workspace-types';
import { AppHeader } from './app-header';
import { Button, buttonClasses } from './button';
import { CategoryGrid } from './category-grid';
import { SessionEndedPanel } from './session-ended';

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; workspace: Workspace }
  | { kind: 'unauthorized' }
  | { kind: 'not-found'; requestId: string | null }
  | { kind: 'error'; requestId: string | null; offline: boolean };

interface WorkspaceDashboardProps {
  workspaceId: string;
  /** `true` when redirected from the create form (`?created=1`). */
  showCreated: boolean;
}

const SKELETON_KEYS = ['one', 'two', 'three', 'four', 'five', 'six'] as const;

export function WorkspaceDashboard({ workspaceId, showCreated }: WorkspaceDashboardProps) {
  const [state, setState] = useState<LoadState>({ kind: 'loading' });
  const [confirmationDismissed, setConfirmationDismissed] = useState(false);
  const [firstDocumentNote, setFirstDocumentNote] = useState(false);
  const [moveFocusToDashboard, setMoveFocusToDashboard] = useState(false);

  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const dashboardHeadingRef = useRef<HTMLHeadingElement>(null);
  const confirmationFocusedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  const loadWorkspace = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ kind: 'loading' });

    try {
      const workspace = await getWorkspace(workspaceId, { signal: controller.signal });
      if (!controller.signal.aborted) {
        setState({ kind: 'ready', workspace });
      }
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          setState({ kind: 'unauthorized' });
          return;
        }
        if (error.isNotFound) {
          setState({ kind: 'not-found', requestId: error.requestId });
          return;
        }
        setState({
          kind: 'error',
          requestId: error.requestId,
          offline: error.isNetworkError,
        });
        return;
      }
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setState({ kind: 'error', requestId: null, offline: false });
    }
  }, [workspaceId]);

  useEffect(() => {
    void loadWorkspace();
    return () => {
      controllerRef.current?.abort();
    };
  }, [loadWorkspace]);

  useEffect(() => {
    if (moveFocusToDashboard) {
      dashboardHeadingRef.current?.focus();
      setMoveFocusToDashboard(false);
    }
  }, [moveFocusToDashboard]);

  const showConfirmation = showCreated && !confirmationDismissed;

  // Design §9.5: focus moves to the confirmation heading, announced politely.
  useEffect(() => {
    if (showConfirmation && state.kind === 'ready' && !confirmationFocusedRef.current) {
      confirmationFocusedRef.current = true;
      confirmationHeadingRef.current?.focus();
    }
  }, [showConfirmation, state.kind]);

  if (state.kind === 'loading') {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <AppHeader />
        <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
          <p role="status" className="sr-only">
            Loading your safe&hellip;
          </p>
          <div aria-busy="true">
            <div aria-hidden="true" className="h-9 w-64 max-w-full animate-pulse rounded bg-line" />
            <div
              aria-hidden="true"
              className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-line"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SKELETON_KEYS.map((key) => (
                <div
                  key={key}
                  aria-hidden="true"
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <div className="h-5 w-1/2 animate-pulse rounded bg-line" />
                  <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-line" />
                  <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-line" />
                  <div className="mt-6 h-11 w-24 animate-pulse rounded-full bg-line" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (state.kind === 'unauthorized') {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <AppHeader />
        <main id="main" className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <SessionEndedPanel />
        </main>
      </div>
    );
  }

  if (state.kind === 'not-found') {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <AppHeader />
        <main id="main" className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <h1 className="font-display text-3xl leading-tight tracking-tight">
            We couldn&rsquo;t find this safe.
          </h1>
          <p className="mt-3 text-base leading-6 text-muted">
            It may have been moved, or the link may be incomplete.
          </p>
          {state.requestId ? (
            <p className="mt-2 text-xs text-muted">Reference: {state.requestId}</p>
          ) : null}
          <Link href="/" className={`${buttonClasses('secondary')} mt-6`}>
            Go to the home page
          </Link>
        </main>
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <AppHeader />
        <main id="main" className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <h1 className="font-display text-3xl leading-tight tracking-tight">
            We couldn&rsquo;t load your safe.
          </h1>
          <p className="mt-3 text-base leading-6 text-muted">
            {state.offline
              ? 'We couldn’t reach the service. Check your connection and try again.'
              : 'Please try again. If this keeps happening, contact support.'}
          </p>
          {state.requestId ? (
            <p className="mt-2 text-xs text-muted">Reference: {state.requestId}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={() => void loadWorkspace()}>Try again</Button>
            <Link href="/" className={buttonClasses('secondary')}>
              Go to the home page
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { workspace } = state;
  const readOnly = workspace.status !== 'active';

  function goToSafe() {
    window.history.replaceState({}, '', `/workspaces/${workspaceId}`);
    setConfirmationDismissed(true);
    setMoveFocusToDashboard(true);
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <AppHeader workspaceName={workspace.name} />
      <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        {showConfirmation ? (
          <section
            aria-labelledby="created-heading"
            className="rounded-2xl border border-accent bg-accent-soft p-6 sm:p-8"
          >
            <div role="status">
              <p aria-hidden="true" className="text-2xl leading-none text-accent">
                &#10003;
              </p>
              <h1
                id="created-heading"
                ref={confirmationHeadingRef}
                tabIndex={-1}
                className="mt-3 font-display text-3xl leading-tight tracking-tight"
              >
                Your safe is ready
              </h1>
              <p className="mt-3 text-base leading-6 text-ink">
                &ldquo;{workspace.name}&rdquo; has been created.
              </p>
              <p className="mt-3 text-base leading-6 text-ink">
                Everything you add is encrypted and released only through a verified process. This
                action is recorded in your audit log, so you can always see what changed and when.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={goToSafe}>Go to your safe</Button>
              <Button
                variant="secondary"
                aria-expanded={firstDocumentNote}
                aria-controls="first-document-note"
                onClick={() => setFirstDocumentNote((current) => !current)}
              >
                Add your first document
              </Button>
            </div>
            <p
              id="first-document-note"
              role="status"
              className="mt-3 min-h-[1.25rem] text-sm leading-5 text-ink"
            >
              {firstDocumentNote ? comingSoonMessage('Documents') : ''}
            </p>
          </section>
        ) : null}

        <section
          aria-labelledby="dashboard-heading"
          className={showConfirmation ? 'mt-12' : undefined}
        >
          {showConfirmation ? (
            <h2
              id="dashboard-heading"
              ref={dashboardHeadingRef}
              tabIndex={-1}
              className="font-display text-2xl leading-tight tracking-tight"
            >
              Welcome to your safe
            </h2>
          ) : (
            <h1
              id="dashboard-heading"
              ref={dashboardHeadingRef}
              tabIndex={-1}
              className="font-display text-3xl leading-tight tracking-tight"
            >
              Welcome to your safe
            </h1>
          )}
          <p className="mt-2 text-lg leading-7 text-muted">
            Add the documents and instructions your family will need.
          </p>

          <div className="mt-8">
            {readOnly ? (
              <div className="rounded-2xl border border-line-strong bg-white p-6">
                <h2 className="font-display text-xl tracking-tight">
                  This safe is currently read-only
                </h2>
                <p className="mt-2 text-base leading-6 text-muted">
                  You can view it, but adding items is paused. Contact support for help.
                </p>
              </div>
            ) : (
              <CategoryGrid headingLevel={showConfirmation ? 'h3' : 'h2'} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
