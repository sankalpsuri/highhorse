-- ============================================================
-- public.landing_leads — lead capture for /landing & /seo-landing
-- Safe to run repeatedly (idempotent: IF NOT EXISTS everywhere).
-- Does NOT touch contact_submissions, career_applications,
-- or website_audit_requests.
-- ============================================================

-- ── 1. CREATE TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.landing_leads (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL    DEFAULT now(),

  -- source
  landing_page  text        NOT NULL,
  form_location text,

  -- contact fields
  name          text        NOT NULL    CONSTRAINT name_len    CHECK (length(name)    <= 200),
  email         text        NOT NULL    CONSTRAINT email_len   CHECK (length(email)   <= 320),
  phone         text                    CONSTRAINT phone_len   CHECK (length(phone)   <= 50),

  -- free-text fields
  problem       text                    CONSTRAINT problem_len CHECK (length(problem) <= 2000),
  message       text                    CONSTRAINT message_len CHECK (length(message) <= 5000),
  website_url   text                    CONSTRAINT url_len     CHECK (length(website_url) <= 500),

  -- overflow bucket
  extra         jsonb       NOT NULL    DEFAULT '{}',

  -- tracking / attribution
  page_url      text                    CONSTRAINT page_url_len  CHECK (length(page_url)  <= 2000),
  referrer      text                    CONSTRAINT referrer_len  CHECK (length(referrer)  <= 2000),
  user_agent    text                    CONSTRAINT ua_len        CHECK (length(user_agent) <= 500),
  utm_source    text                    CONSTRAINT utm_src_len   CHECK (length(utm_source)   <= 200),
  utm_medium    text                    CONSTRAINT utm_med_len   CHECK (length(utm_medium)   <= 200),
  utm_campaign  text                    CONSTRAINT utm_camp_len  CHECK (length(utm_campaign) <= 200),
  utm_term      text                    CONSTRAINT utm_term_len  CHECK (length(utm_term)     <= 200),
  utm_content   text                    CONSTRAINT utm_cont_len  CHECK (length(utm_content)  <= 200),

  -- CRM / workflow
  status        text        NOT NULL    DEFAULT 'new'
                            CONSTRAINT  status_values
                            CHECK (status IN ('new','contacted','qualified','closed','spam')),
  notes         text
);

COMMENT ON TABLE public.landing_leads
  IS 'Leads captured from the /landing and /seo-landing pages. Written by the server action with the service role key only.';


-- ── 2. ADD COLUMNS IF MISSING (safe on re-run) ─────────────
-- If the table was created by an earlier, incomplete migration,
-- these ensure every column the code needs is present.

ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS form_location text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS problem       text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS message       text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS website_url   text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS extra         jsonb NOT NULL DEFAULT '{}';
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS page_url      text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS referrer      text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS user_agent    text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS utm_source    text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS utm_medium    text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS utm_campaign  text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS utm_term      text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS utm_content   text;
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS status        text NOT NULL DEFAULT 'new';
ALTER TABLE public.landing_leads ADD COLUMN IF NOT EXISTS notes         text;


-- ── 3. INDEXES ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_landing_leads_created
  ON public.landing_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_landing_leads_page_created
  ON public.landing_leads (landing_page, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_landing_leads_status
  ON public.landing_leads (status);


-- ── 4. ROW-LEVEL SECURITY ───────────────────────────────────
ALTER TABLE public.landing_leads ENABLE ROW LEVEL SECURITY;

-- No policies → anon / authenticated have no access through PostgREST.
-- The service role key bypasses RLS, so the server action still works.

REVOKE ALL ON public.landing_leads FROM anon;
REVOKE ALL ON public.landing_leads FROM authenticated;


-- ============================================================
-- (a) VERIFICATION — list columns
-- ============================================================
-- Run this after the migration to confirm the schema:
/*
SELECT column_name, data_type, is_nullable, column_default
  FROM information_schema.columns
 WHERE table_schema = 'public'
   AND table_name   = 'landing_leads'
 ORDER BY ordinal_position;
*/


-- ============================================================
-- (b) LATEST 20 LEADS
-- ============================================================
/*
SELECT id, created_at, landing_page, form_location,
       name, email, phone, problem, website_url, status
  FROM public.landing_leads
 ORDER BY created_at DESC
 LIMIT 20;
*/


-- ============================================================
-- (c) LEADS PER LANDING PAGE + FORM (last 30 days)
-- ============================================================
/*
SELECT landing_page,
       form_location,
       count(*)                                    AS total,
       count(*) FILTER (WHERE status = 'new')      AS new,
       count(*) FILTER (WHERE status = 'spam')     AS spam,
       min(created_at)                             AS earliest,
       max(created_at)                             AS latest
  FROM public.landing_leads
 WHERE created_at >= now() - interval '30 days'
 GROUP BY landing_page, form_location
 ORDER BY landing_page, form_location;
*/


-- ============================================================
-- (d) CLEANUP — delete test rows
-- ============================================================
/*
DELETE FROM public.landing_leads
 WHERE name ILIKE 'TEST - delete%';
*/
