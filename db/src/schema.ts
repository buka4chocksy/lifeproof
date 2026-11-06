import { index, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

/**
 * Baseline tenancy tables for the first vertical slice.
 * RLS policies, encrypted PII columns, and audit tables are owned by the DBA
 * and are added through reviewed SQL migrations (see db/migrations). The
 * TypeScript schema here mirrors the frozen table/column shape; policies and
 * triggers are authored directly in SQL because Drizzle does not model them.
 */

export const workspaceType = pgEnum('workspace_type', ['personal', 'family', 'business']);
export const workspaceStatus = pgEnum('workspace_status', [
  'active',
  'read_only',
  'suspended',
  'deleted',
]);
export const userStatus = pgEnum('user_status', ['active', 'suspended', 'deleted']);
export const memberRole = pgEnum('member_role', [
  'owner',
  'admin',
  'member',
  'family_organiser',
  'beneficiary',
]);
export const memberStatus = pgEnum('member_status', ['invited', 'active', 'revoked']);

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    emailCiphertext: text('email_ciphertext').notNull(),
    emailHash: text('email_hash').notNull(),
    name: text('name'),
    locale: text('locale').notNull().default('en'),
    status: userStatus('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('users_email_hash_idx').on(table.emailHash)],
);

export const workspaces = pgTable(
  'workspaces',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: workspaceType('type').notNull().default('family'),
    name: text('name').notNull(),
    planId: text('plan_id'),
    // Defaults to 'GB' (launch jurisdiction, England & Wales — D-014 / D-P0-01).
    // 'NG' remains a supported value with no build work until the Nigeria gate.
    // Kept as `text` (not an enum) so future jurisdictions are never excluded.
    region: text('region').notNull().default('GB'),
    status: workspaceStatus('status').notNull().default('active'),
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('workspaces_owner_name_idx').on(table.ownerId, table.name)],
);

export const workspaceMembers = pgTable(
  'workspace_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: memberRole('role').notNull().default('member'),
    status: memberStatus('status').notNull().default('invited'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('workspace_members_workspace_user_idx').on(table.workspaceId, table.userId),
  ],
);

/**
 * Append-only, hash-chained audit ledger (7-year retention).
 *
 * - `prev_hash`/`hash` are present now but are populated by the hash-chain
 *   computation and daily anchoring delivered in US-141 (a later task).
 * - Append-only is enforced in SQL: the application role is not granted
 *   UPDATE/DELETE and a BEFORE UPDATE OR DELETE trigger raises an exception.
 * - `actor_id` is nullable so events survive account deletion (FK ON DELETE
 *   SET NULL) with PII minimized. `workspace_id` is NOT NULL because every
 *   tenant-owned table carries `workspace_id`.
 */
export const auditEvents = pgTable(
  'audit_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    actorId: uuid('actor_id').references(() => users.id, { onDelete: 'set null' }),
    action: text('action').notNull(),
    subjectType: text('subject_type'),
    subjectId: text('subject_id'),
    requestId: text('request_id'),
    ipHash: text('ip_hash'),
    beforeHash: text('before_hash'),
    afterHash: text('after_hash'),
    prevHash: text('prev_hash'),
    hash: text('hash'),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('audit_events_workspace_created_idx').on(table.workspaceId, table.createdAt),
    index('audit_events_subject_idx').on(table.subjectType, table.subjectId),
  ],
);
