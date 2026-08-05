-- =============================================================================
-- staff_users — backend login credentials for the Render REST API
-- -----------------------------------------------------------------------------
-- This table stores staff login credentials (email + bcrypt password hash)
-- used by the backend at POST /api/auth/login.
--
-- NOTE: The `profiles` table (linked to Supabase Auth) is left untouched.
-- This table is an ADDITIONAL auth path for the Render-hosted backend.
--
-- The password_hash must be a bcrypt hash (e.g. generated with bcryptjs).
-- To create a hash for a plaintext password, use:
--   node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.staff_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone         TEXT,
  role          public.user_role NOT NULL DEFAULT 'RECEPTIONIST',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Role-based access for staff_users
ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;

-- Only allow the backend to access staff_users (matches service/anon is not used)
CREATE POLICY "staff_users_self_select" ON public.staff_users
  FOR SELECT USING (auth.uid() = id);

-- Backend can read for login via direct connection (bypasses RLS as service role).
-- For the anon key, we do NOT expose this table.

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_staff_users_updated_at ON public.staff_users;
CREATE TRIGGER trg_staff_users_updated_at
BEFORE UPDATE ON public.staff_users
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- Seed an initial admin account (replace password_hash with a real bcrypt hash)
-- =============================================================================
-- INSERT INTO public.staff_users (email, full_name, password_hash, role)
-- VALUES
--   ('admin@astygmahope.com',
--    'Clinic Administrator',
--    '<BCRYPT_HASH>',
--    'SUPER_ADMIN');
