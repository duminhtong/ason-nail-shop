import Link from "next/link"
import { getProducts, getSiteConfigs } from "@/lib/supabase-db"

// Force dynamic so we always show fresh data from Supabase
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, configs] = await Promise.all([
    getProducts(8),
    getSiteConfigs(["HERO_TITLE", "HERO_BUTTON", "HERO_IMAGE"]),
  ])

  return (
    <main className="pt-[80px] max-w-container-max mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="mt-md md:mt-xl px-gutter relative flex flex-col items-center justify-center text-center">
        <h1 className="font-display-xl text-[40px] md:text-display-xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant z-10 mb-md relative">
          {configs.HERO_TITLE}
          {/* Neon Glow behind text */}
          <div className="absolute inset-0 bg-primary/20 blur-[60px] -z-10 rounded-full"></div>
        </h1>
        <div className="w-full aspect-[4/5] md:aspect-[21/9] rounded-xl overflow-hidden relative border border-outline-variant shadow-[0_0_40px_rgba(207,188,255,0.15)]">
          <img 
            alt="Neon Chic Beauty Hero" 
            className="w-full h-full object-cover object-center" 
            src={configs.HERO_IMAGE}
          />
          <div className="absolute bottom-md md:bottom-lg left-1/2 -translate-x-1/2 w-full px-gutter max-w-[350px]">
            <button className="w-full bg-primary text-background font-button text-button px-lg py-md md:py-sm rounded-full shadow-[0_0_20px_rgba(207,188,255,0.4)] hover:bg-surface-tint transition-all uppercase whitespace-nowrap glow-button">
              {configs.HERO_BUTTON}
            </button>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="mt-lg px-gutter">
        <div className="flex overflow-x-auto gap-sm hide-scrollbar py-sm">
          <button className="flex-shrink-0 px-md py-sm rounded-full font-label-caps text-label-caps border border-primary bg-primary/10 text-primary">ALL</button>
          <button className="flex-shrink-0 px-md py-sm rounded-full font-label-caps text-label-caps border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">NAILS</button>
          <button className="flex-shrink-0 px-md py-sm rounded-full font-label-caps text-label-caps border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">LIPS</button>
          <button className="flex-shrink-0 px-md py-sm rounded-full font-label-caps text-label-caps border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">EYES</button>
          <button className="flex-shrink-0 px-md py-sm rounded-full font-label-caps text-label-caps border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">SKIN</button>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="mt-lg mb-xxl px-gutter">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg">
          {products.map((product) => {
            const mainImage = product.images?.[0]?.url || "https://placehold.co/400x400/141218/cfbcff?text=No+Image"
            
            return (
              <Link 
                href={`/product/${product.slug}`} 
                key={product.id}
                className="flex flex-col group cursor-pointer bg-surface-container rounded-lg border border-outline-variant overflow-hidden hover:border-primary transition-colors duration-300 relative"
              >
                {product.isNew && (
                  <div className="absolute top-xs right-xs z-10 px-sm py-xs rounded-full bg-primary/10 text-primary font-label-caps text-label-caps border border-primary/20 backdrop-blur-md">
                    NEW
                  </div>
                )}
                
                <div className="aspect-square bg-surface-dim relative overflow-hidden flex items-center justify-center p-md">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-500" 
                    src={mainImage}
                  />
                </div>
                
                <div className="p-sm flex flex-col gap-xs bg-surface-container border-t border-outline-variant">
                  <h3 className="font-button text-button text-on-surface truncate uppercase">{product.name}</h3>
                  <div className="font-h3 text-h3 text-primary tracking-tight">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.sellingPrice)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
