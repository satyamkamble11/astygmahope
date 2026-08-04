-- =============================================================================
-- Astygma Hope Clinic — Supabase Schema (0001_init)
-- Production-grade schema with:
--   * ENUM types
--   * Tables + constraints + indexes + foreign keys
--   * audit timestamps (created_at / updated_at)
--   * Row Level Security (RLS) on EVERY table (least privilege)
--   * updated_at() trigger
--   * Storage buckets for media
--
-- Run this via: supabase db push  OR  paste into Supabase SQL Editor.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- Extensions
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -----------------------------------------------------------------------------
-- ENUM types
-- -----------------------------------------------------------------------------
CREATE TYPE public.user_role AS ENUM (
  'SUPER_ADMIN',
  'CLINIC_ADMIN',
  'DOCTOR',
  'RECEPTIONIST',
  'LAB_STAFF',
  'PATIENT'
);

CREATE TYPE public.appointment_status AS ENUM (
  'PENDING',
  'APPROVED',
  'COMPLETED',
  'CANCELLED',
  'RESCHEDULED'
);

CREATE TYPE public.payment_mode AS ENUM ('ONLINE', 'OFFLINE');

CREATE TYPE public.branch_name AS ENUM ('Shirol Branch (Main HQ)', 'Kolhapur Branch');

CREATE TYPE public.post_category AS ENUM (
  'Story',
  'Carousel',
  'Blog',
  'HealthTip',
  'FestivalBanner',
  'HealthCamp'
);

CREATE TYPE public.sound_category AS ENUM (
  'Meditation',
  'Pregnancy',
  'Healing',
  'Relaxation',
  'Yoga',
  'Nature'
);

CREATE TYPE public.service_category AS ENUM ('clinical', 'holistic', 'educational');

CREATE TYPE public.gallery_category AS ENUM (
  'Clinic',
  'Reception',
  'Lab',
  'Doctors',
  'Staff',
  'Events',
  'Workshops',
  'Videos'
);

-- -----------------------------------------------------------------------------
-- Helper: updated_at trigger function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- PROFILES
-- =============================================================================
-- Mirrors auth.users so staff/patient profiles can be referenced safely.
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  role          public.user_role NOT NULL DEFAULT 'PATIENT',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- APPOINTMENTS
-- =============================================================================
CREATE TABLE public.appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name    TEXT NOT NULL CHECK (char_length(patient_name) BETWEEN 2 AND 120),
  patient_phone   TEXT NOT NULL CHECK (patient_phone ~ '^\+?[0-9 ]{10,15}$'),
  patient_city    TEXT NOT NULL CHECK (char_length(patient_city) BETWEEN 2 AND 120),
  patient_email   TEXT CHECK (patient_email IS NULL OR patient_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  doctor_name     TEXT,
  service_name    TEXT,
  branch          public.branch_name NOT NULL,
  preferred_date  DATE NOT NULL,
  preferred_time  TEXT NOT NULL,
  payment_mode    public.payment_mode NOT NULL DEFAULT 'OFFLINE',
  consultation_fee NUMERIC(10,2) NOT NULL DEFAULT 500 CHECK (consultation_fee >= 0),
  notes           TEXT,
  sender_mobile   TEXT,
  utr_id          TEXT,
  status          public.appointment_status NOT NULL DEFAULT 'PENDING',
  created_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appointments_status       ON public.appointments (status);
CREATE INDEX idx_appointments_phone        ON public.appointments (patient_phone);
CREATE INDEX idx_appointments_branch_date  ON public.appointments (branch, preferred_date);
CREATE INDEX idx_appointments_created_at   ON public.appointments (created_at DESC);

CREATE TRIGGER trg_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- CONTACT MESSAGES
-- =============================================================================
CREATE TABLE public.contact_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  phone         TEXT NOT NULL CHECK (phone ~ '^\+?[0-9 ]{10,15}$'),
  email         TEXT CHECK (email IS NULL OR email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message       TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 4000),
  is_read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_created_at ON public.contact_messages (created_at DESC);

CREATE TRIGGER trg_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- FEEDBACK
-- =============================================================================
CREATE TABLE public.feedback (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text          TEXT NOT NULL CHECK (char_length(text) BETWEEN 5 AND 2000),
  is_approved   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feedback_created_at ON public.feedback (created_at DESC);

CREATE TRIGGER trg_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- DOCTORS
-- =============================================================================
CREATE TABLE public.doctors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  role            TEXT,
  title           TEXT,
  experience      TEXT,
  qualifications  TEXT[] NOT NULL DEFAULT '{}',
  bio             TEXT,
  highlights      TEXT[] NOT NULL DEFAULT '{}',
  image_path      TEXT,
  is_founder      BOOLEAN NOT NULL DEFAULT FALSE,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_doctors_active ON public.doctors (is_active, display_order);

CREATE TRIGGER trg_doctors_updated_at
BEFORE UPDATE ON public.doctors
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- SERVICES
-- =============================================================================
CREATE TABLE public.services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  category      public.service_category NOT NULL,
  short_desc    TEXT NOT NULL,
  full_desc     TEXT NOT NULL,
  benefits      TEXT[] NOT NULL DEFAULT '{}',
  icon_name     TEXT NOT NULL,
  image_path    TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_services_category ON public.services (category, display_order);

CREATE TRIGGER trg_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- TESTIMONIALS
-- =============================================================================
CREATE TABLE public.testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  location    TEXT,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review      TEXT NOT NULL CHECK (char_length(review) BETWEEN 5 AND 4000),
  service     TEXT,
  image_path  TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT TRUE,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_testimonials_active ON public.testimonials (is_active, display_order);

CREATE TRIGGER trg_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- GALLERY ITEMS
-- =============================================================================
CREATE TABLE public.gallery_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    public.gallery_category NOT NULL,
  path        TEXT NOT NULL,
  description TEXT,
  is_video    BOOLEAN NOT NULL DEFAULT FALSE,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_active ON public.gallery_items (is_active, display_order);

CREATE TRIGGER trg_gallery_items_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- BLOG / CMS POSTS
-- =============================================================================
CREATE TABLE public.blog_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    public.post_category NOT NULL DEFAULT 'Blog',
  content     TEXT NOT NULL,
  media_url   TEXT,
  media_type  TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image','video','carousel')),
  media_list  TEXT[] NOT NULL DEFAULT '{}',
  author      TEXT NOT NULL DEFAULT 'Dr. Umesh Datta Kalekar',
  likes       INTEGER NOT NULL DEFAULT 0 CHECK (likes >= 0),
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMPTZ,
  created_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_published ON public.blog_posts (is_published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON public.blog_posts (category);

CREATE TRIGGER trg_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- SOUND TRACKS (Sound Vault)
-- =============================================================================
CREATE TABLE public.sound_tracks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  category        public.sound_category NOT NULL,
  duration        TEXT NOT NULL,
  file_path       TEXT NOT NULL,
  frequency_hz    INTEGER CHECK (frequency_hz BETWEEN 20 AND 20000),
  description     TEXT,
  is_custom_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  is_protected    BOOLEAN NOT NULL DEFAULT TRUE,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sound_tracks_active ON public.sound_tracks (is_active, display_order);
CREATE INDEX idx_sound_tracks_category ON public.sound_tracks (category);

CREATE TRIGGER trg_sound_tracks_updated_at
BEFORE UPDATE ON public.sound_tracks
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- COURSES
-- =============================================================================
CREATE TABLE public.courses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'All' CHECK (category IN ('All','Free','Paid','Certificates')),
  instructor    TEXT NOT NULL,
  duration      TEXT NOT NULL,
  description   TEXT NOT NULL,
  includes      TEXT[] NOT NULL DEFAULT '{}',
  is_paid       BOOLEAN NOT NULL DEFAULT FALSE,
  price         TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_active ON public.courses (is_active, display_order);

CREATE TRIGGER trg_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- FAQ
-- =============================================================================
CREATE TABLE public.faqs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question      TEXT NOT NULL,
  answer        TEXT NOT NULL,
  category      TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_faqs_active ON public.faqs (is_active, display_order);

CREATE TRIGGER trg_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- SETTINGS (social links / config)
-- =============================================================================
CREATE TABLE public.settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY — ENABLE + POLICIES (LEAST PRIVILEGE)
-- =============================================================================
-- Every table has RLS enabled. Policies are scoped by role.
-- Public (anon) users:
--   * can INSERT into: appointments, contact_messages, feedback
--   * can SELECT from: doctors, services, testimonials (approved), gallery_items,
--                      blog_posts (published), sound_tracks (active), courses, faqs
-- Authenticated staff (by role claim stored in profiles.role):
--   * SUPER_ADMIN / CLINIC_ADMIN: full CRUD on everything
--   * RECEPTIONIST: read all appointments + update status
--   * DOCTOR: read all appointments + update status + notes
--   * PATIENT: select/update own profile only

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sound_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Helper: returns true if the current auth user has the given role.
CREATE OR REPLACE FUNCTION public.has_role(required public.user_role)
RETURNS BOOLEAN AS $$
DECLARE
  user_role_value public.user_role;
BEGIN
  SELECT p.role INTO user_role_value
  FROM public.profiles p
  WHERE p.id = auth.uid();
  RETURN user_role_value = required;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Helper: returns true if the current auth user is any of the admin roles.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.has_role('SUPER_ADMIN') OR public.has_role('CLINIC_ADMIN');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- PROFILES policies
-- -----------------------------------------------------------------------------
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- APPOINTMENTS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "appointments_insert_public" ON public.appointments
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "appointments_select_staff" ON public.appointments
  FOR SELECT TO authenticated
  USING (public.has_role('RECEPTIONIST') OR public.has_role('DOCTOR') OR public.is_admin());

CREATE POLICY "appointments_update_staff" ON public.appointments
  FOR UPDATE TO authenticated
  USING (public.has_role('RECEPTIONIST') OR public.has_role('DOCTOR') OR public.is_admin())
  WITH CHECK (public.has_role('RECEPTIONIST') OR public.has_role('DOCTOR') OR public.is_admin());

-- -----------------------------------------------------------------------------
-- CONTACT MESSAGES policies
-- -----------------------------------------------------------------------------
CREATE POLICY "contact_messages_insert_public" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contact_messages_select_admin" ON public.contact_messages
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "contact_messages_update_admin" ON public.contact_messages
  FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- FEEDBACK policies
-- -----------------------------------------------------------------------------
CREATE POLICY "feedback_insert_public" ON public.feedback
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "feedback_select_public" ON public.feedback
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "feedback_select_admin" ON public.feedback
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "feedback_update_admin" ON public.feedback
  FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "feedback_delete_admin" ON public.feedback
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- DOCTORS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "doctors_select_public" ON public.doctors
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "doctors_admin_all" ON public.doctors
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- SERVICES policies
-- -----------------------------------------------------------------------------
CREATE POLICY "services_select_public" ON public.services
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "services_admin_all" ON public.services
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- TESTIMONIALS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "testimonials_select_public" ON public.testimonials
  FOR SELECT USING (is_active = TRUE AND is_approved = TRUE);

CREATE POLICY "testimonials_admin_all" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- GALLERY policies
-- -----------------------------------------------------------------------------
CREATE POLICY "gallery_select_public" ON public.gallery_items
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "gallery_admin_all" ON public.gallery_items
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- BLOG POSTS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "blog_posts_select_public" ON public.blog_posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "blog_posts_admin_all" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- SOUND TRACKS policies
-- -----------------------------------------------------------------------------
-- Active tracks are readable publicly (metadata only; protected stream URLs are
-- enforced separately via storage). Keep the vault accessible for the UI.
CREATE POLICY "sound_tracks_select_public" ON public.sound_tracks
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "sound_tracks_admin_all" ON public.sound_tracks
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- COURSES policies
-- -----------------------------------------------------------------------------
CREATE POLICY "courses_select_public" ON public.courses
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "courses_admin_all" ON public.courses
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- FAQS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "faqs_select_public" ON public.faqs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "faqs_admin_all" ON public.faqs
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- SETTINGS policies
-- -----------------------------------------------------------------------------
CREATE POLICY "settings_select_public" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "settings_admin_all" ON public.settings
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- =============================================================================
-- STORAGE — media buckets + policies
-- =============================================================================
-- Buckets: 'media' for public images/videos, 'sound-vault' for protected audio.
INSERT INTO storage.buckets (id, name, public) VALUES
  ('media', 'media', TRUE),
  ('sound-vault', 'sound-vault', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Public read for 'media' bucket
CREATE POLICY "media_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Authenticated admin upload into 'media'
CREATE POLICY "media_admin_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "media_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "media_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

-- Protected 'sound-vault': only authenticated users with role may read
CREATE POLICY "sound_vault_auth_read" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'sound-vault' AND (public.is_admin() OR public.has_role('RECEPTIONIST') OR public.has_role('DOCTOR') OR public.has_role('LAB_STAFF') OR public.has_role('PATIENT')));

CREATE POLICY "sound_vault_admin_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'sound-vault' AND public.is_admin());

CREATE POLICY "sound_vault_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'sound-vault' AND public.is_admin());

CREATE POLICY "sound_vault_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'sound-vault' AND public.is_admin());

-- =============================================================================
-- Default admin bootstrap (optional; run only once via SQL editor / seed)
-- Inserting a profile here assumes the corresponding auth user already exists.
-- =============================================================================

COMMIT;

