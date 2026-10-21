-- ==============================================================================
-- Portfolio Backend Schema with Row-Level Security (RLS)
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. Create table for portfolio content sections
CREATE TABLE IF NOT EXISTS public.portfolio_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Index for fast lookup by section and publish status
CREATE INDEX IF NOT EXISTS idx_portfolio_content_section ON public.portfolio_content(section);
CREATE INDEX IF NOT EXISTS idx_portfolio_content_published ON public.portfolio_content(is_published);

-- 2. Create table for administrator user whitelist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on user_id
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);

-- 3. Enable Row-Level Security (RLS) on both tables
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for portfolio_content
-- Rule A: Public visitors can ONLY view published content (cannot view drafts, cannot insert/update/delete)
DROP POLICY IF EXISTS "Public can view published content" ON public.portfolio_content;
CREATE POLICY "Public can view published content"
  ON public.portfolio_content
  FOR SELECT
  TO public
  USING (is_published = true);

-- Rule B: Verified Admins have full access (view drafts, insert, update, delete)
DROP POLICY IF EXISTS "Admins have full access to portfolio content" ON public.portfolio_content;
CREATE POLICY "Admins have full access to portfolio content"
  ON public.portfolio_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE public.admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE public.admin_users.user_id = auth.uid()
    )
  );

-- 5. RLS Policies for admin_users table
-- Rule: Authenticated users can check if their own user_id is in the admin list
DROP POLICY IF EXISTS "Users can check their own admin status" ON public.admin_users;
CREATE POLICY "Users can check their own admin status"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. Helper Function to promote a user to Admin by email
-- Run: SELECT make_admin('your-email@example.com');
CREATE OR REPLACE FUNCTION public.make_admin(admin_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find the user in auth.users by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = LOWER(TRIM(admin_email));

  IF target_user_id IS NULL THEN
    RETURN 'User with email ' || admin_email || ' not found. Have them sign up or create them in Auth > Users first.';
  END IF;

  -- Insert into admin_users if not exists
  INSERT INTO public.admin_users (user_id)
  VALUES (target_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN 'Successfully added ' || admin_email || ' (ID: ' || target_user_id || ') as administrator.';
END;
$$;

-- 6b. Automatic trigger: when admin signs up, automatically add to admin_users
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger AS $$
BEGIN
  IF LOWER(NEW.email) = 'alfasthestarboy707@gmail.com' THEN
    INSERT INTO public.admin_users (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Automatic backfill if the user already exists in auth.users
INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE LOWER(email) = 'alfasthestarboy707@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- 7. Setup Storage Bucket for Assets (Certificates, Resume, Images)
-- Note: Storage buckets can also be created via Supabase Dashboard -> Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS: Anyone can view public files
DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
CREATE POLICY "Public can view portfolio assets"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'portfolio-assets');

-- Storage RLS: Only admins can upload, update, or delete files
DROP POLICY IF EXISTS "Admins can upload portfolio assets" ON storage.objects;
CREATE POLICY "Admins can upload portfolio assets"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id = 'portfolio-assets' AND
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE public.admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    bucket_id = 'portfolio-assets' AND
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE public.admin_users.user_id = auth.uid()
    )
  );
