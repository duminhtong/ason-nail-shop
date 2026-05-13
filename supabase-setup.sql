-- =============================================
-- ASon Nail Dropshipping - Supabase Database Setup (FIXED)
-- =============================================

-- 1. SiteConfig table
CREATE TABLE IF NOT EXISTS "SiteConfig" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  "isActive" BOOLEAN DEFAULT true,
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- 2. Category table
CREATE TABLE IF NOT EXISTS "Category" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- 3. Product table
CREATE TABLE IF NOT EXISTS "Product" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  "costPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "sellingPrice" DOUBLE PRECISION NOT NULL,
  "originalPrice" DOUBLE PRECISION,
  "profitMargin" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "sourceLink" TEXT,
  notes TEXT,
  "categoryId" TEXT REFERENCES "Category"(id),
  "isTrending" BOOLEAN DEFAULT false,
  "isNew" BOOLEAN DEFAULT false,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- 4. ProductImage table
CREATE TABLE IF NOT EXISTS "ProductImage" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  url TEXT NOT NULL,
  alt TEXT,
  "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  "isMain" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 5. ProductVariant table
CREATE TABLE IF NOT EXISTS "ProductVariant" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  price DOUBLE PRECISION,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 6. Lead table
CREATE TABLE IF NOT EXISTS "Lead" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  product TEXT NOT NULL,
  note TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- SEED DATA
INSERT INTO "SiteConfig" (key, value) VALUES
  ('BRAND_NAME', 'A SÓN NAIL'),
  ('HERO_TITLE', 'NEON CHIC'),
  ('HERO_BUTTON', 'Explore Collection'),
  ('HERO_IMAGE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvP3Ei64Jm3nKXZoS_tl_Dcq7lnLXYfFbfDicZli1hRiTKGfor199UEy9NORxyfbl9ZYhoHd67saDw-havKKwYn-E5yUQUKjfx3_xstzGZWpn35GEQUNLFkfzvtQvrGGcgm190uxlmYH_Uvl0DnsgAc0BSYCiwZoToSsG1Q_olU8GO296DtDS8G5CSXqN2Vuj_RhQwELTcZTVMPJ4-npxZG33R-ShhXkdjR2OVXedVx5Sj9s2TigPnPqtbKhYoASsNCj5O4M1Vcb5i'),
  ('CONTACT_ZALO', '0987654321'),
  ('CONTACT_WHATSAPP', '84987654321'),
  ('CONTACT_INSTAGRAM', 'ason.nail'),
  ('CONTACT_EMAIL', 'contact@ason.com')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enable RLS
ALTER TABLE "SiteConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductVariant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;

-- DROP AND CREATE POLICIES (Fixing the IF NOT EXISTS error)
DROP POLICY IF EXISTS "Allow public read SiteConfig" ON "SiteConfig";
CREATE POLICY "Allow public read SiteConfig" ON "SiteConfig" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read Category" ON "Category";
CREATE POLICY "Allow public read Category" ON "Category" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read Product" ON "Product";
CREATE POLICY "Allow public read Product" ON "Product" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read ProductImage" ON "ProductImage";
CREATE POLICY "Allow public read ProductImage" ON "ProductImage" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read ProductVariant" ON "ProductVariant";
CREATE POLICY "Allow public read ProductVariant" ON "ProductVariant" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert Lead" ON "Lead";
CREATE POLICY "Allow public insert Lead" ON "Lead" FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read Lead" ON "Lead";
CREATE POLICY "Allow public read Lead" ON "Lead" FOR SELECT USING (true);
