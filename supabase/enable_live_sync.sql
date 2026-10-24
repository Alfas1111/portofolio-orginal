-- ==============================================================================
-- SUPABASE LIVE CROSS-DEVICE SYNC & REALTIME ENABLEMENT SCRIPT
-- Execute this script once in Supabase Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- 1. Ensure Table Structure Exists
CREATE TABLE IF NOT EXISTS public.portfolio_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Configure Realtime & Replica Identity for Cross-Device Sync
-- REPLICA IDENTITY FULL allows Realtime to broadcast old & new record values
ALTER TABLE public.portfolio_content REPLICA IDENTITY FULL;

-- Add portfolio_content to supabase_realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'portfolio_content'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_content;
  END IF;
END $$;

-- 3. Enable RLS and Configure Read/Write Policies
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public and anon users to read published content (needed for live realtime sync on mobile & desktop)
DROP POLICY IF EXISTS "Public can view published content" ON public.portfolio_content;
CREATE POLICY "Public can view published content"
  ON public.portfolio_content
  FOR SELECT
  TO public
  USING (is_published = true);

-- Allow admins full access to portfolio_content
DROP POLICY IF EXISTS "Admins have full access to portfolio content" ON public.portfolio_content;
CREATE POLICY "Admins have full access to portfolio content"
  ON public.portfolio_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE public.admin_users.user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE public.admin_users.user_id = auth.uid())
  );

-- Admin users self-check policy
DROP POLICY IF EXISTS "Users can check their own admin status" ON public.admin_users;
CREATE POLICY "Users can check their own admin status"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Confirm Admin User & Whitelist in admin_users
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE LOWER(email) = 'alfasthestarboy707@gmail.com';

INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE LOWER(email) = 'alfasthestarboy707@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- 5. RPC Function: save_portfolio_content (Realtime Sync & Admin Cloud Save)
-- Allows updates using active admin session or verified admin passcode
CREATE OR REPLACE FUNCTION public.save_portfolio_content(
  p_section TEXT,
  p_content JSONB,
  p_is_published BOOLEAN DEFAULT true,
  p_admin_passcode TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_admin BOOLEAN := false;
  v_user_id UUID;
  v_result JSONB;
BEGIN
  -- 1. Check authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.admin_users WHERE user_id = v_user_id
    ) INTO v_is_admin;
  END IF;

  -- 2. Check admin security passcode
  IF NOT v_is_admin AND p_admin_passcode IS NOT NULL THEN
    IF p_admin_passcode = '715d53d9f796a320a3a1033949bc92163940f21f3571dd305bab165f5ea6f4ff' THEN
      v_is_admin := true;
    END IF;
  END IF;

  IF NOT v_is_admin THEN
    RAISE EXCEPTION 'Unauthorized: Valid admin login or admin security passcode is required.';
  END IF;

  -- 3. Upsert content
  INSERT INTO public.portfolio_content (section, content, is_published, updated_at, updated_by)
  VALUES (p_section, p_content, p_is_published, now(), v_user_id)
  ON CONFLICT (section) DO UPDATE SET
    content = EXCLUDED.content,
    is_published = EXCLUDED.is_published,
    updated_at = now(),
    updated_by = COALESCE(v_user_id, portfolio_content.updated_by)
  RETURNING to_jsonb(portfolio_content.*) INTO v_result;

  RETURN v_result;
END;
$$;

-- 6. RPC Function: seed_portfolio_data
CREATE OR REPLACE FUNCTION public.seed_portfolio_data(
  p_sections JSONB,
  p_admin_passcode TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_admin BOOLEAN := false;
  v_user_id UUID;
  v_key TEXT;
  v_val JSONB;
  v_count INT := 0;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.admin_users WHERE user_id = v_user_id
    ) INTO v_is_admin;
  END IF;

  IF NOT v_is_admin AND p_admin_passcode IS NOT NULL THEN
    IF p_admin_passcode = '715d53d9f796a320a3a1033949bc92163940f21f3571dd305bab165f5ea6f4ff' THEN
      v_is_admin := true;
    END IF;
  END IF;

  IF NOT v_is_admin THEN
    RAISE EXCEPTION 'Unauthorized: Valid admin login or admin security passcode is required.';
  END IF;

  FOR v_key, v_val IN SELECT * FROM jsonb_each(p_sections)
  LOOP
    INSERT INTO public.portfolio_content (section, content, is_published, updated_at, updated_by)
    VALUES (v_key, v_val, true, now(), v_user_id)
    ON CONFLICT (section) DO UPDATE SET
      content = EXCLUDED.content,
      is_published = true,
      updated_at = now(),
      updated_by = COALESCE(v_user_id, portfolio_content.updated_by);
    v_count := v_count + 1;
  END LOOP;

  RETURN jsonb_build_object('seeded', true, 'count', v_count);
END;
$$;

-- 7. Grant permissions for client API execution
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.portfolio_content TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_portfolio_content TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seed_portfolio_data TO anon, authenticated;

-- Output confirmation status
SELECT 
  'Live Cross-Device Sync successfully enabled!' AS status,
  (SELECT count(*) FROM public.portfolio_content) AS current_synced_sections,
  EXISTS(
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'portfolio_content'
  ) AS realtime_publication_active;
