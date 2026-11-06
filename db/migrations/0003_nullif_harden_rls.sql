-- ======================================================================
-- Hand-authored section (Drizzle does not model roles, RLS, or triggers).
--
-- T-015 / D-020: NULLIF-harden every RLS policy that casts a session GUC
-- to `uuid`.
--
-- Hazard: a `SET LOCAL`/`RESET` of a custom GUC leaves an empty string
-- (`''`), not NULL, on a pooled connection. The previous expressions
-- `current_setting('app.workspace_id', true)::uuid` (and
-- `app.current_user_id`) then raise
--   invalid input syntax for type uuid: ""
-- a hard error, instead of the intended fail-closed (NULL -> zero rows).
--
-- Fix: wrap the GUC read in NULLIF so an empty string degrades to NULL
-- before the cast:
--   NULLIF(current_setting('app.workspace_id', true), '')::uuid
-- NULL::uuid is NULL, so every policy still fails closed, but now without
-- a cast error.
--
-- Approach: ALTER POLICY ... USING (...) / WITH CHECK (...) in place. No
-- DROP + CREATE, so policy names, roles (TO app_user), and the grant set
-- are unchanged. No `FORCE ROW LEVEL SECURITY` is added (deferred to admin
-- work, D-017 §3).
--
-- Rollback (reverse of each ALTER below; apply only under explicit
-- approval, never in the same release): replace
-- `NULLIF(current_setting('…', true), '')::uuid` with
-- `current_setting('…', true)::uuid` in each USING / WITH CHECK clause.
-- ======================================================================

-- workspaces: 5 policies
ALTER POLICY "workspaces_select_tenant" ON "workspaces"
  USING ("id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspaces_insert_own" ON "workspaces"
  WITH CHECK ("owner_id" = NULLIF(current_setting('app.current_user_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspaces_update_tenant" ON "workspaces"
  USING ("id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid)
  WITH CHECK ("id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspaces_delete_tenant" ON "workspaces"
  USING ("id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspaces_select_member" ON "workspaces"
  USING (
    "owner_id" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    OR "id" IN (
      SELECT "workspace_id" FROM "workspace_members"
      WHERE "user_id" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    )
  );--> statement-breakpoint

-- workspace_members: 4 policies
ALTER POLICY "workspace_members_select" ON "workspace_members"
  USING (
    "workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid
    OR "user_id" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
  );--> statement-breakpoint

ALTER POLICY "workspace_members_insert_tenant" ON "workspace_members"
  WITH CHECK ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspace_members_update_tenant" ON "workspace_members"
  USING ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid)
  WITH CHECK ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "workspace_members_delete_tenant" ON "workspace_members"
  USING ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

-- audit_events: 2 policies
ALTER POLICY "audit_events_select_tenant" ON "audit_events"
  USING ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);--> statement-breakpoint

ALTER POLICY "audit_events_insert_tenant" ON "audit_events"
  WITH CHECK ("workspace_id" = NULLIF(current_setting('app.workspace_id', true), '')::uuid);
