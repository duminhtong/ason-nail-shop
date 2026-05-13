import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client for database queries (no cookies needed for public data)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ---- SiteConfig helpers ----

export async function getSiteConfig(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("SiteConfig")
    .select("value")
    .eq("key", key)
    .single()

  if (error || !data) return null
  return data.value
}

export async function getSiteConfigs(keys: string[]): Promise<Record<string, string>> {
  const defaults: Record<string, string> = {
    BRAND_NAME: "A SÓN NAIL",
    HERO_TITLE: "NEON CHIC",
    HERO_BUTTON: "Explore Collection",
    HERO_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvP3Ei64Jm3nKXZoS_tl_Dcq7lnLXYfFbfDicZli1hRiTKGfor199UEy9NORxyfbl9ZYhoHd67saDw-havKKwYn-E5yUQUKjfx3_xstzGZWpn35GEQUNLFkfzvtQvrGGcgm190uxlmYH_Uvl0DnsgAc0BSYCiwZoToSsG1Q_olU8GO296DtDS8G5CSXqN2Vuj_RhQwELTcZTVMPJ4-npxZG33R-ShhXkdjR2OVXedVx5Sj9s2TigPnPqtbKhYoASsNCj5O4M1Vcb5i",
    CONTACT_ZALO: "0987654321",
    CONTACT_WHATSAPP: "84987654321",
    CONTACT_INSTAGRAM: "ason.nail",
    CONTACT_EMAIL: "contact@ason.com",
  }

  try {
    const { data, error } = await supabase
      .from("SiteConfig")
      .select("key, value")
      .in("key", keys)

    if (!error && data) {
      data.forEach((row) => {
        defaults[row.key] = row.value
      })
    }
  } catch (err) {
    console.error("Failed to fetch SiteConfig, using defaults", err)
  }

  return defaults
}

// ---- Product helpers ----

export interface ProductImage {
  id: string
  url: string
  alt: string | null
  isMain: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  sellingPrice: number
  originalPrice: number | null
  isNew: boolean
  isTrending: boolean
  isActive: boolean
  images: ProductImage[]
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock1",
    slug: "holographic-glaze",
    name: "Holographic Glaze",
    description: "A high-voltage, cyber-inspired nail polish that demands attention. Formulated with our proprietary nano-technology for one-coat opacity and a glass-like finish.",
    sellingPrice: 450000,
    originalPrice: 550000,
    isNew: true,
    isTrending: true,
    isActive: true,
    images: [{ id: "img1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjYdE4fh3fTzp1DXDTWxEJZOBnsckJdGFiOhOH4LESd3NVC4KY12qOeyKSetiz7CobP3cfUaSKjW4VYuDZMhveE8c7X-dR5osIFrgHD_n1s_VjTplZHHPNT5A2-j9c6LNAxjJV7HRL46ghPP1JfEejVMRhfhnI9ylXyFbMBCq6vln8k6UYYYjLDkm6cP20TffXmiJS0Z7k2-6nVKQCRXFrgJGN9I9TTGLb9cOp0bkIvgoOYU_T8O90MlEMfqiYLfG-IGcJE29qzdrE", alt: "Holographic Glaze", isMain: true }],
  },
  {
    id: "mock2",
    slug: "plasma-matte-lip",
    name: "Plasma Matte Lip",
    description: "Ultra-pigmented matte lipstick with a velvet finish. Long-lasting formula that stays fresh for up to 12 hours.",
    sellingPrice: 380000,
    originalPrice: 480000,
    isNew: false,
    isTrending: false,
    isActive: true,
    images: [{ id: "img2", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB76gf_lyMMAY5rg4pdsRbZlOkMAjq-egjl-eUoMU2Er6WHR5i74ktF_XLxZi5n6Bp-8PPAOjjq4AGKi9a0AA8JzvG5M0ATB6Xs0eVTqVF0zBAh8Fx46kbp7sSWOS1UTWTo_Gr6Jla6zix-WH7IoF0zeaYhlDA4F_mK5IMwkOmX_KnjfPi92J7371b-q_C2MKZ73Z2oQ4oFHoFC_RNv0lp7h9DrlE89U_f5UaAC84H8TcecuC0Xuavx9kQgxsnLgzgHr8_6loYKxnSA", alt: "Plasma Matte Lip", isMain: true }],
  },
  {
    id: "mock3",
    slug: "void-shadow-palette",
    name: "Void Shadow Palette",
    description: "A curated palette of 12 highly reflective metallic and duochrome pigments.",
    sellingPrice: 750000,
    originalPrice: 950000,
    isNew: false,
    isTrending: true,
    isActive: true,
    images: [{ id: "img3", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5XcrwbZphwDU1WkYZq_Wq3CpEbIG0Mo2SvvRDCSlTXWmlUc6GMPVLAOKHiIS-AAvjUOp1F-Y6oEAQkbUftAAr4DlF6_xHMO9zMjXwOGRQ5qpy25kSdml79Gn3cYstXVeHwNxbirTQA6Pgbv4tDI0duUZ45dkhgPK-kcHn66SQurzOaPLigEvi9a9rLt-gsho3O9aTAR2hNksPLvdQFnwu7zWcGUVZ0dyBHG7tyOSKjewCzQGBgMmbXEKFGKM1B2TK0_JvxpiPD0vt", alt: "Void Shadow Palette", isMain: true }],
  },
  {
    id: "mock4",
    slug: "synthetic-glow-serum",
    name: "Synthetic Glow Serum",
    description: "Advanced skincare serum with luminous nano-particles. Delivers instant radiance.",
    sellingPrice: 1200000,
    originalPrice: 1500000,
    isNew: false,
    isTrending: false,
    isActive: true,
    images: [{ id: "img4", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6wiMi9m7T4eagAkVTK33xAGUgL9mZbK3Ryebk9j3G7wBcsZDMnNDzdozT2DBaegsQ2toysIHMMxQg_8LbwzP4CvmgqjFc2iSJrrcglNz_VUWTyEoPSFRkRIz3Hw2EX2WgtiDuS0xJ55uBJflryNhmTWprE65ax_v7sgPt6DxQlPavj9ohK7ZJndhXXAjkyHgtB1HMlhD4NvA2IZUNfNI-YaGyHLRB3bPYU9flzm71DEnc3xPSo7KSciu8D1RVbuFJOnirGe6uw0KM", alt: "Synthetic Glow Serum", isMain: true }],
  },
]

export async function getProducts(limit = 8): Promise<Product[]> {
  try {
    // Fetch products
    const { data: products, error } = await supabase
      .from("Product")
      .select("*")
      .eq("isActive", true)
      .order("createdAt", { ascending: false })
      .limit(limit)

    if (error || !products || products.length === 0) {
      console.error("Supabase products error:", error)
      return MOCK_PRODUCTS
    }

    // Fetch images for these products
    const productIds = products.map((p) => p.id)
    const { data: images } = await supabase
      .from("ProductImage")
      .select("*")
      .in("productId", productIds)

    // Merge images into products
    return products.map((p) => ({
      ...p,
      images: (images || []).filter((img) => img.productId === p.id),
    }))
  } catch (err) {
    console.error("Failed to fetch products, using mock data", err)
    return MOCK_PRODUCTS
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data: product, error } = await supabase
      .from("Product")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error || !product) {
      // Try mock data
      const mock = MOCK_PRODUCTS.find((p) => p.slug === slug)
      return mock || null
    }

    // Fetch images
    const { data: images } = await supabase
      .from("ProductImage")
      .select("*")
      .eq("productId", product.id)

    return {
      ...product,
      images: images || [],
    }
  } catch (err) {
    console.error("Failed to fetch product by slug", err)
    const mock = MOCK_PRODUCTS.find((p) => p.slug === slug)
    return mock || null
  }
}

// ---- Lead helpers ----

export async function createLead(data: {
  name: string
  contact: string
  product: string
  note?: string
}) {
  const { error } = await supabase.from("Lead").insert([data])
  if (error) throw error
  return { success: true }
}
