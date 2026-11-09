-- ==============================================================================
-- 🚀 K-WORKSPACE CLOUD DATABASE SCHEMA & ADVANCED ROW LEVEL SECURITY (RLS)
-- Target: Supabase PostgreSQL (Production / Cloud)
-- Project: Technical Resource Booking & Internal Workspace Portal
-- Author: UID Creative Director & Frontend Lead
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- 2.1 USERS & RBAC TABLE
CREATE TABLE IF NOT EXISTS public.users (
  email TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'requester' CHECK (role IN ('admin', 'approver', 'requester')),
  department TEXT DEFAULT 'Phòng Ban Chung',
  phone TEXT DEFAULT '0901 234 567',
  avatar TEXT DEFAULT '',
  referrer_email TEXT DEFAULT '',
  permissions TEXT[] DEFAULT ARRAY[
    'view_schedule',
    'create_booking',
    'cancel_own_booking'
  ],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 TECHNICIANS TABLE
CREATE TABLE IF NOT EXISTS public.technicians (
  tech_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  phone TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 BOOKINGS & SHIFTS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  booking_id TEXT PRIMARY KEY,
  tech_id TEXT REFERENCES public.technicians(tech_id) ON DELETE SET NULL,
  requester_email TEXT NOT NULL,
  requester_name TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT DEFAULT '',
  booking_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED')),
  approver_email TEXT DEFAULT '',
  reject_reason TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 AUTO-MIGRATION: Ensure all columns and constraints exist even if tables were created previously
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '0901 234 567';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS referrer_email TEXT DEFAULT '';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS permissions TEXT[] DEFAULT ARRAY['view_schedule', 'create_booking', 'cancel_own_booking'];
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Ensure users_role_check permits 'admin', 'approver', 'requester'
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'approver', 'requester'));

ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '';
ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS location TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS end_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approver_email TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS reject_reason TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED'));

-- ==============================================================================
-- 3. REALTIME PUBLICATION SETUP
-- ==============================================================================
-- Enable Realtime for all tables safely (check if already a member to prevent error 42710)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'bookings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'technicians'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.technicians;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'users'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
  END IF;
END $$;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all core tables. Public/anon access is intentionally denied.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Resolve the role only from a verified Supabase Auth identity and its server-side profile.
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    (
      SELECT u.role
      FROM auth.users AS au
      JOIN public.users AS u ON lower(u.email) = lower(au.email)
      WHERE au.id = (SELECT auth.uid())
      LIMIT 1
    ),
    (
      SELECT 'technician'::TEXT
      FROM auth.users AS au
      JOIN public.technicians AS t ON lower(t.email) = lower(au.email)
      WHERE au.id = (SELECT auth.uid()) AND t.is_active IS TRUE
      LIMIT 1
    )
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(user_email TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(public.current_user_role() = 'admin', false);
$$;

CREATE OR REPLACE FUNCTION public.update_my_profile(
  p_full_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_department TEXT DEFAULT NULL,
  p_avatar TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  UPDATE public.users AS u
  SET full_name = COALESCE(p_full_name, u.full_name),
      phone = COALESCE(p_phone, u.phone),
      department = COALESCE(p_department, u.department),
      avatar = COALESCE(p_avatar, u.avatar),
      updated_at = NOW()
  FROM auth.users AS au
  WHERE au.id = auth.uid() AND lower(u.email) = lower(au.email);
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.cancel_my_booking(p_booking_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  UPDATE public.bookings
  SET status = 'CANCELLED', updated_at = NOW()
  WHERE booking_id = p_booking_id
    AND lower(requester_email) = lower(auth.jwt() ->> 'email')
    AND status IN ('PENDING', 'APPROVED');
  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.current_user_role() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_my_profile(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.cancel_my_booking(TEXT) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_super_admin(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_my_profile(TEXT, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cancel_my_booking(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin(TEXT) TO authenticated;

-- Remove permissive policies left by earlier schema versions.
DROP POLICY IF EXISTS "Allow select for all" ON public.users;
DROP POLICY IF EXISTS "Allow full management for Super Admin" ON public.users;
DROP POLICY IF EXISTS "Allow self update" ON public.users;
DROP POLICY IF EXISTS "Allow user update" ON public.users;
DROP POLICY IF EXISTS "Allow user manage" ON public.users;
DROP POLICY IF EXISTS "Allow select techs for all" ON public.technicians;
DROP POLICY IF EXISTS "Allow tech management for admin and approvers" ON public.technicians;
DROP POLICY IF EXISTS "Allow select bookings for all" ON public.bookings;
DROP POLICY IF EXISTS "Allow insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can read profiles" ON public.users;
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can read technicians" ON public.technicians;
DROP POLICY IF EXISTS "Admins and approvers can manage technicians" ON public.technicians;
DROP POLICY IF EXISTS "Authenticated users can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Approvers can update bookings" ON public.bookings;

-- Remove any unrecognized legacy policies on these tables so no permissive policy remains.
DO $$
DECLARE
  policy_row RECORD;
BEGIN
  FOR policy_row IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('users', 'technicians', 'bookings')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', policy_row.policyname, policy_row.schemaname, policy_row.tablename);
  END LOOP;
END;
$$;

REVOKE ALL ON public.users, public.technicians, public.bookings FROM PUBLIC, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users, public.technicians, public.bookings TO authenticated;
-- The legacy technicians.password column is not exposed to browser clients.
REVOKE SELECT, INSERT, UPDATE ON public.technicians FROM authenticated;
GRANT SELECT (tech_id, name, email, skills, phone, avatar, is_active, created_at)
  ON public.technicians TO authenticated;
GRANT INSERT (tech_id, name, email, skills, phone, avatar, is_active)
  ON public.technicians TO authenticated;
GRANT UPDATE (name, email, skills, phone, avatar, is_active)
  ON public.technicians TO authenticated;

CREATE POLICY "Authenticated users can read profiles" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (lower(email) = lower(auth.jwt() ->> 'email') OR public.current_user_role() = 'admin'));
CREATE POLICY "Admins can manage profiles" ON public.users
  FOR ALL TO authenticated
  USING (public.current_user_role() = 'admin')
  WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Authenticated users can read technicians" ON public.technicians
  FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins and approvers can manage technicians" ON public.technicians
  FOR ALL TO authenticated
  USING (public.current_user_role() IN ('admin', 'approver'))
  WITH CHECK (public.current_user_role() IN ('admin', 'approver'));

CREATE POLICY "Authenticated users can read bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (
    public.current_user_role() IN ('admin', 'approver', 'requester')
    OR (
      public.current_user_role() = 'technician'
      AND EXISTS (
        SELECT 1
        FROM public.technicians AS t
        WHERE lower(t.email) = lower(auth.jwt() ->> 'email')
          AND t.tech_id = public.bookings.tech_id
          AND t.is_active IS TRUE
      )
    )
  );
CREATE POLICY "Users can create own bookings" ON public.bookings
  FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'approver', 'requester')
    AND lower(requester_email) = lower(auth.jwt() ->> 'email'));
CREATE POLICY "Approvers can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'approver'))
  WITH CHECK (public.current_user_role() IN ('admin', 'approver'));

-- ============================================================================== 
-- 5. SUPABASE AUTH INTEGRATION
-- Accounts and profiles must be provisioned by an administrator. Do not auto-create
-- public.users rows for arbitrary public signups.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_auth_user();

-- ==============================================================================
-- 6. BOOTSTRAP INITIAL ADMIN (RUN ONCE ON A BRAND-NEW DATABASE ONLY)
-- ==============================================================================
-- Note: Existing admin accounts on an active database are preserved automatically.
-- When provisioning a completely new Supabase project:
--   1. Go to Authentication -> Users -> Add user -> Create new user (e.g. admin@your-domain.com).
--   2. Uncomment and run the INSERT block below in SQL Editor with that exact email:
/*
INSERT INTO public.users (email, full_name, role, department, permissions)
VALUES (
  'admin@your-domain.com',
  'System Administrator',
  'admin',
  'Ban Giám Đốc / IT',
  ARRAY[
    'view_schedule', 'drag_reschedule', 'create_booking', 'cancel_own_booking',
    'edit_booking', 'view_approval_queue', 'approve_booking', 'reject_booking',
    'view_technicians', 'manage_technicians', 'view_users', 'manage_users', 'manage_permissions'
  ]
)
ON CONFLICT (email) DO UPDATE
SET role = 'admin',
    permissions = EXCLUDED.permissions,
    updated_at = NOW();
*/
