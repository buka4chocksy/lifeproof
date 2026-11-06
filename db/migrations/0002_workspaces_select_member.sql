-- ======================================================================
-- Hand-authored section (Drizzle does not model roles, RLS, or triggers).
--
-- T-014 / D-019: add a SELECT policy on `workspaces` scoped to the caller
-- as owner OR member, so `GET /workspaces` (list the caller's workspaces)
-- and the owner's `INSERT … RETURNING` during create work under RLS without
-- cross-tenant leakage.
--
-- RLS SELECT policies on the same table are OR-combined, so this policy is
-- compatible with the existing `workspaces_select_tenant` (`id =
-- app.workspace_id`): the get-one path is unchanged.
--
-- Fail-closed: an unset `app.current_user_id` yields NULL, so the policy
-- matches zero rows when the application has not established the caller.
--
-- Rollback: DROP POLICY "workspaces_select_member" ON "workspaces";
-- (reverse of the CREATE below; apply only under explicit approval).
-- ======================================================================
CREATE POLICY "workspaces_select_member" ON "workspaces"
  FOR SELECT TO app_user
  USING (
    "owner_id" = current_setting('app.current_user_id', true)::uuid
    OR "id" IN (
      SELECT "workspace_id" FROM "workspace_members"
      WHERE "user_id" = current_setting('app.current_user_id', true)::uuid
    )
  );
