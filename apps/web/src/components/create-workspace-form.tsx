'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import {
  ApiError,
  type ApiFieldError,
  type CreateWorkspaceInput,
  createWorkspace,
} from '@/lib/api';
import { Button } from './button';
import { SessionEndedPanel } from './session-ended';
import { Spinner } from './spinner';

type WorkspaceType = 'family' | 'personal';
type WorkspaceRegion = 'GB' | 'NG';

interface FieldErrors {
  name?: string;
  type?: string;
  region?: string;
}

interface SubmitError {
  requestId: string | null;
}

const NAME_HINT_ID = 'workspace-name-hint';
const NAME_ERROR_ID = 'workspace-name-error';
const TYPE_HINT_ID = 'workspace-type-hint';
const TYPE_ERROR_ID = 'workspace-type-error';
const REGION_HINT_ID = 'workspace-region-hint';
const REGION_ERROR_ID = 'workspace-region-error';

function fieldClasses(hasError: boolean): string {
  return [
    'block min-h-[44px] w-full rounded-lg border bg-white px-3 py-2 text-base text-ink',
    'placeholder:text-muted disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted',
    hasError ? 'border-danger' : 'border-line-strong hover:border-ink',
  ].join(' ');
}

function describedBy(...ids: (string | false | undefined)[]): string | undefined {
  const value = ids.filter(Boolean).join(' ');
  return value.length > 0 ? value : undefined;
}

function nameReasonToMessage(reason: string): string {
  const normalised = reason.toLowerCase();
  if (normalised.includes('at least') || normalised.includes('too small')) {
    return 'Enter a name for your safe.';
  }
  if (normalised.includes('at most') || normalised.includes('too big')) {
    return 'That name is too long. Use 200 characters or fewer.';
  }
  return 'Check the name and try again. Names can be 1 to 200 characters.';
}

function fieldErrorsFromDetails(details: ApiFieldError[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const detail of details) {
    if (detail.field === 'name' && !errors.name) {
      errors.name = nameReasonToMessage(detail.reason);
    } else if (detail.field === 'type' && !errors.type) {
      errors.type = 'Choose who this safe is for.';
    } else if (detail.field === 'region' && !errors.region) {
      errors.region = 'Choose where you are based.';
    }
  }
  return errors;
}

export function CreateWorkspaceForm() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const attemptRef = useRef<{ fingerprint: string; key: string } | null>(null);

  const [name, setName] = useState('');
  const [type, setType] = useState<WorkspaceType>('family');
  const [region, setRegion] = useState<WorkspaceRegion>('GB');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  // Design §9.3 default state: the name field is focused on load.
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  /**
   * Design §9.1: a fresh key per submission attempt, reused only when retrying the
   * identical payload. A changed payload is a new attempt.
   */
  function idempotencyKeyFor(payload: CreateWorkspaceInput): string {
    const fingerprint = JSON.stringify(payload);
    if (attemptRef.current?.fingerprint !== fingerprint) {
      attemptRef.current = { fingerprint, key: crypto.randomUUID() };
    }
    return attemptRef.current.key;
  }

  function focusFirstError(nextErrors: FieldErrors) {
    if (nextErrors.name) {
      nameRef.current?.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
      return;
    }

    const trimmedName = name.trim();
    const nextErrors: FieldErrors = {};
    if (trimmedName.length === 0) {
      nextErrors.name = 'Enter a name for your safe.';
    } else if (trimmedName.length > 200) {
      nextErrors.name = 'That name is too long. Use 200 characters or fewer.';
    }
    if (nextErrors.name) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    const payload: CreateWorkspaceInput = { name: trimmedName, type, region };

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    try {
      const workspace = await createWorkspace(payload, {
        idempotencyKey: idempotencyKeyFor(payload),
      });
      router.push(`/workspaces/${workspace.id}?created=1`);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        setSubmitError({ requestId: null });
        return;
      }
      if (error.isUnauthorized) {
        setSessionEnded(true);
        return;
      }
      if (error.status === 409) {
        const conflict: FieldErrors = {
          name: 'You already have a safe with this name. Choose a different name.',
        };
        setErrors(conflict);
        focusFirstError(conflict);
        return;
      }
      if (error.status === 422 || error.status === 400) {
        const mapped = fieldErrorsFromDetails(error.details);
        if (mapped.name || mapped.type || mapped.region) {
          setErrors(mapped);
          focusFirstError(mapped);
          return;
        }
      }
      setSubmitError({ requestId: error.requestId });
    } finally {
      setSubmitting(false);
    }
  }

  if (sessionEnded) {
    return <SessionEndedPanel />;
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={submitting || undefined}>
      <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        Create your safe
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-7 text-muted">
        A place for your family&rsquo;s important documents and instructions. It takes about a
        minute.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="workspace-name" className="text-sm font-medium text-ink">
              Name your safe <span aria-hidden="true">*</span>
            </label>
            <span aria-hidden="true" className="text-xs text-muted">
              {name.length}/200
            </span>
          </div>
          <input
            id="workspace-name"
            name="name"
            type="text"
            ref={nameRef}
            value={name}
            maxLength={200}
            required
            autoComplete="off"
            placeholder="e.g. The Smith family"
            disabled={submitting}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy(NAME_HINT_ID, errors.name && NAME_ERROR_ID)}
            className={`${fieldClasses(Boolean(errors.name))} mt-2`}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) {
                setErrors((current) => ({ ...current, name: undefined }));
              }
            }}
          />
          <p id={NAME_HINT_ID} className="mt-2 text-sm text-muted">
            Pick a name you&rsquo;ll recognise.
          </p>
          {errors.name ? (
            <p id={NAME_ERROR_ID} role="alert" className="mt-2 text-sm font-medium text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="workspace-type" className="text-sm font-medium text-ink">
              Who is this for? <span aria-hidden="true">*</span>
            </label>
            <div className="relative mt-2">
              <select
                id="workspace-type"
                name="type"
                value={type}
                disabled={submitting}
                aria-invalid={errors.type ? true : undefined}
                aria-describedby={describedBy(TYPE_HINT_ID, errors.type && TYPE_ERROR_ID)}
                className={`${fieldClasses(Boolean(errors.type))} appearance-none pr-10`}
                onChange={(event) => {
                  setType(event.target.value as WorkspaceType);
                  if (errors.type) {
                    setErrors((current) => ({ ...current, type: undefined }));
                  }
                }}
              >
                <option value="family">My family</option>
                <option value="personal">Just me</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              >
                &#9662;
              </span>
            </div>
            <p id={TYPE_HINT_ID} className="mt-2 text-sm text-muted">
              You can invite people later.
            </p>
            {errors.type ? (
              <p id={TYPE_ERROR_ID} role="alert" className="mt-2 text-sm font-medium text-danger">
                {errors.type}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="workspace-region" className="text-sm font-medium text-ink">
              Where are you based? <span aria-hidden="true">*</span>
            </label>
            <div className="relative mt-2">
              <select
                id="workspace-region"
                name="region"
                value={region}
                disabled={submitting}
                aria-invalid={errors.region ? true : undefined}
                aria-describedby={describedBy(REGION_HINT_ID, errors.region && REGION_ERROR_ID)}
                className={`${fieldClasses(Boolean(errors.region))} appearance-none pr-10`}
                onChange={(event) => {
                  setRegion(event.target.value as WorkspaceRegion);
                  if (errors.region) {
                    setErrors((current) => ({ ...current, region: undefined }));
                  }
                }}
              >
                <option value="GB">United Kingdom (England &amp; Wales)</option>
                <option value="NG" disabled>
                  Nigeria — coming later
                </option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              >
                &#9662;
              </span>
            </div>
            <p id={REGION_HINT_ID} className="mt-2 text-sm text-muted">
              Nigeria is coming later.
            </p>
            {errors.region ? (
              <p id={REGION_ERROR_ID} role="alert" className="mt-2 text-sm font-medium text-danger">
                {errors.region}
              </p>
            ) : null}
          </div>
        </div>

        <section
          aria-labelledby="security-note-heading"
          className="rounded-2xl border border-line bg-white p-5"
        >
          <h2 id="security-note-heading" className="font-display text-xl tracking-tight">
            How your information is protected
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your documents are encrypted at rest with HSM-backed keys and protected by strict access
            controls. You decide who can see them and when they are released. We never ask you to
            store seed phrases or private keys.
          </p>
        </section>
      </div>

      {submitError ? (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-danger bg-danger-soft p-4 text-sm leading-6 text-ink"
        >
          <p className="font-medium text-danger">We couldn&rsquo;t create your safe.</p>
          <p className="mt-1">Please try again. If this keeps happening, contact support.</p>
          {submitError.requestId ? (
            <p className="mt-2 text-xs text-muted">Reference: {submitError.requestId}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8">
        <Button
          type="submit"
          disabled={submitting || name.trim().length === 0}
          aria-busy={submitting || undefined}
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Spinner />
              Creating&hellip;
            </>
          ) : (
            'Create safe'
          )}
        </Button>
        <p role="status" className="sr-only">
          {submitting ? 'Creating your safe…' : ''}
        </p>
      </div>
    </form>
  );
}
