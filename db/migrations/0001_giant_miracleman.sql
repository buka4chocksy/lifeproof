CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"subject_type" text,
	"subject_id" text,
	"request_id" text,
	"ip_hash" text,
	"before_hash" text,
	"after_hash" text,
	"prev_hash" text,
	"hash" text,
	"workspace_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "region" SET DEFAULT 'GB';--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_events_workspace_created_idx" ON "audit_events" USING btree ("workspace_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_events_subject_idx" ON "audit_events" USING btree ("subject_type","subject_id");--> statement-breakpoint
-- ======================================================================
-- Hand-authored section (Drizzle does not model roles, RLS, or triggers).
-- 1. `app_user` application role (NOLOGIN privilege group). A concrete
--    LOGIN credential is provisioned out-of-band via secrets — never here.
-- 2. Least-privilege grants. `audit_events` receives SELECT+INSERT only.
-- 3. RLS on every tenant-owned table, scoped via app.workspace_id (and,
--    for members, app.current_user_id for a user's own rows). Fail-closed:
--    an unset variable yields NULL and the policy matches zero rows.
-- 4. Append-only enforcement on `audit_events` (trigger + revoked grants).
--    Full hash-chain computation + daily anchoring is a later task (US-141).
-- Rollback (reverse order): DROP TRIGGER/DROP FUNCTION audit_events_deny_mutation;
-- DROP POLICY on the three tables; ALTER TABLE ... DISABLE ROW LEVEL SECURITY;
-- DROP ROLE app_user; ALTER TABLE workspaces ALTER COLUMN region DROP DEFAULT;
-- DROP TABLE audit_events. Apply only under explicit approval (never in the
-- same release).
-- ======================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user NOLOGIN;
  END IF;
END
$$;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE ON "users" TO app_user;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON "workspaces" TO app_user;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON "workspace_members" TO app_user;--> statement-breakpoint
GRANT SELECT, INSERT ON "audit_events" TO app_user;--> statement-breakpoint
REVOKE UPDATE, DELETE, TRUNCATE ON "audit_events" FROM app_user;--> statement-breakpoint
ALTER TABLE "workspaces" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "workspace_members" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "audit_events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "workspaces_select_tenant" ON "workspaces" FOR SELECT TO app_user USING ("id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspaces_insert_own" ON "workspaces" FOR INSERT TO app_user WITH CHECK ("owner_id" = current_setting('app.current_user_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspaces_update_tenant" ON "workspaces" FOR UPDATE TO app_user USING ("id" = current_setting('app.workspace_id', true)::uuid) WITH CHECK ("id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspaces_delete_tenant" ON "workspaces" FOR DELETE TO app_user USING ("id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspace_members_select" ON "workspace_members" FOR SELECT TO app_user USING ("workspace_id" = current_setting('app.workspace_id', true)::uuid OR "user_id" = current_setting('app.current_user_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspace_members_insert_tenant" ON "workspace_members" FOR INSERT TO app_user WITH CHECK ("workspace_id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspace_members_update_tenant" ON "workspace_members" FOR UPDATE TO app_user USING ("workspace_id" = current_setting('app.workspace_id', true)::uuid) WITH CHECK ("workspace_id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "workspace_members_delete_tenant" ON "workspace_members" FOR DELETE TO app_user USING ("workspace_id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "audit_events_select_tenant" ON "audit_events" FOR SELECT TO app_user USING ("workspace_id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE POLICY "audit_events_insert_tenant" ON "audit_events" FOR INSERT TO app_user WITH CHECK ("workspace_id" = current_setting('app.workspace_id', true)::uuid);--> statement-breakpoint
CREATE OR REPLACE FUNCTION audit_events_deny_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'audit_events is append-only: % is not permitted', TG_OP
    USING ERRCODE = 'insufficient_privilege';
END
$$;--> statement-breakpoint
CREATE TRIGGER audit_events_no_update_delete BEFORE UPDATE OR DELETE ON "audit_events" FOR EACH ROW EXECUTE FUNCTION audit_events_deny_mutation();--> statement-breakpoint
CREATE TRIGGER audit_events_no_truncate BEFORE TRUNCATE ON "audit_events" FOR EACH STATEMENT EXECUTE FUNCTION audit_events_deny_mutation();