import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getProducts() {
  const { data, error } = await supabase
    .from('Product')
    .select(`
      *,
      ProductImage (
        url,
        isMain
      )
    `)
    .eq('isActive', true)
    .order('createdAt', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Map to the format the UI expects
  return data.map(p => ({
    ...p,
    images: p.ProductImage || []
  }))
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('Product')
    .select(`
      *,
      ProductImage (
        url,
        isMain
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return {
    ...data,
    images: data.ProductImage || []
  }
}

export async function getSiteConfigs(keys: string[]) {
  const { data, error } = await supabase
    .from('SiteConfig')
    .select('key, value')
    .in('key', keys)

  if (error) {
    console.error('Error fetching configs:', error)
    return {}
  }

  return data.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})
}
