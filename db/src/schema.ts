import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

/**
 * Baseline tenancy tables for the first vertical slice.
 * RLS policies, encrypted PII columns, and audit tables are owned by the DBA
 * and will be added through reviewed SQL migrations.
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
    region: text('region').notNull(),
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
