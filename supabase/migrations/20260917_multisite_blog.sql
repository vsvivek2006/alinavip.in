-- ================================================================
-- SUPABASE MULTI-TENANT ARCHITECTURE FOR 5 ALINA VIP SITES
-- ================================================================

-- 1. Create Sites / Tenants Table
CREATE TABLE IF NOT EXISTS public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,                       -- e.g. 'alinavip-in', 'escort-alinavip-com'
  name TEXT NOT NULL,                               -- e.g. 'ALINA VIP India'
  domain TEXT UNIQUE NOT NULL,                     -- e.g. 'alinavip.in'
  revalidate_url TEXT NOT NULL,                     -- e.g. 'https://alinavip.in/api/revalidate'
  revalidate_secret TEXT NOT NULL,                  -- Secret token for ISR cache purge
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,                              -- URL slug e.g. '10-reasons-to-book-in-gurgaon'
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL,                          -- Tiptap rich-text JSON or HTML string
  cover_image TEXT,                                -- ImageKit CDN URL
  author TEXT DEFAULT 'Editorial Team' NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL,            -- 'draft', 'review', 'published'
  ai_generated BOOLEAN DEFAULT FALSE NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_site_post_slug UNIQUE(site_id, slug)
);

-- 3. Indexes for Instant High-Concurrency Queries
CREATE INDEX IF NOT EXISTS idx_posts_site_status ON public.posts(site_id, status);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);

-- 4. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_posts_updated_at ON public.posts;
CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Anonymous public frontend can read active site config
DROP POLICY IF EXISTS "Public can view sites" ON public.sites;
CREATE POLICY "Public can view sites"
  ON public.sites FOR SELECT
  USING (true);

-- Anonymous public frontend can ONLY read published posts
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

-- Service Role (Admin Panel) has full read/write via Service Role Key (bypasses RLS)

-- ================================================================
-- PRE-SEEDING THE 5 PRODUCTION SITES
-- ================================================================
INSERT INTO public.sites (slug, name, domain, revalidate_url, revalidate_secret)
VALUES 
  ('alinavip-in', 'ALINA VIP India', 'alinavip.in', 'https://alinavip.in/api/revalidate', encode(gen_random_bytes(32), 'hex')),
  ('escort-alinavip-com', 'ALINA VIP Escorts', 'escort.alinavip.com', 'https://escort.alinavip.com/api/revalidate', encode(gen_random_bytes(32), 'hex')),
  ('alinavip-com', 'ALINA VIP Main', 'alinavip.com', 'https://alinavip.com/api/revalidate', encode(gen_random_bytes(32), 'hex')),
  ('aerocity-site', 'Aerocity Escort Service', 'aerocityescortservice.site', 'https://aerocityescortservice.site/api/revalidate', encode(gen_random_bytes(32), 'hex')),
  ('gurgaon-site', 'Gurgaon Escort Service', 'gurgaonescortservice.site', 'https://gurgaonescortservice.site/api/revalidate', encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (slug) DO NOTHING;
