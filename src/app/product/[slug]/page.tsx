import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/supabase-db"
import MultiChannelContact from "@/components/MultiChannelContact"

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const mainImage = product.images.find(img => img.isMain)?.url || product.images[0]?.url || "https://placehold.co/800x800/141218/cfbcff?text=No+Image"

  return (
    <main className="pt-[80px] w-full max-w-container-max mx-auto pb-[100px]">
      {/* Product Image Section */}
      <section className="w-full aspect-[4/5] md:aspect-[2/1] relative bg-vignette flex items-center justify-center overflow-hidden border-b border-surface-border">
        <img 
          alt={product.name}
          className="w-[80%] max-w-[400px] object-contain drop-shadow-[0_20px_40px_rgba(124,58,237,0.3)] z-10" 
          src={mainImage}
        />
      </section>

      {/* Product Details Section */}
      <section className="px-gutter py-lg md:py-xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-md gap-sm">
          <h2 className="font-h1 text-[28px] md:text-h1 text-on-surface leading-tight">{product.name}</h2>
          <span className="font-h2 text-h2 text-electric-purple whitespace-nowrap">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.sellingPrice)}
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-sm mb-lg">
          {product.isNew && (
            <span className="font-label-caps text-[10px] md:text-label-caps text-electric-purple bg-electric-purple/10 px-sm py-xs rounded-full border border-electric-purple/20">NEW ARRIVAL</span>
          )}
          <span className="font-label-caps text-[10px] md:text-label-caps text-primary bg-primary/10 px-sm py-xs rounded-full border border-primary/20">PREMIUM QUALITY</span>
        </div>

        <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mb-xl max-w-[800px]">
          {product.description || "A high-voltage, cyber-inspired product that demands attention. Formulated with our proprietary nano-technology for one-coat opacity and a glass-like finish that lasts lightyears."}
        </p>

        {/* Color Selection */}
        <div className="mb-xl md:mb-xxl">
          <h3 className="font-button text-on-surface mb-md uppercase tracking-widest">Select Shade / Variant</h3>
          <div className="flex gap-md overflow-x-auto pb-sm hide-scrollbar">
            <button aria-label="Selected" className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#7C3AED] ring-2 ring-neon-pink ring-offset-4 ring-offset-background transition-all"></button>
            <button aria-label="Variant 1" className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF2E88] border border-surface-border hover:ring-2 hover:ring-surface-border hover:ring-offset-4 hover:ring-offset-background transition-all"></button>
            <button aria-label="Variant 2" className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00F0FF] border border-surface-border hover:ring-2 hover:ring-surface-border hover:ring-offset-4 hover:ring-offset-background transition-all"></button>
            <button aria-label="Variant 3" className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E5E7EB] border border-surface-border hover:ring-2 hover:ring-surface-border hover:ring-offset-4 hover:ring-offset-background transition-all"></button>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          <div className="bg-surface-container border border-outline-variant p-md rounded-xl">
            <span className="material-symbols-outlined text-primary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-xs">Formula</h4>
            <p className="font-body-md text-sm md:text-body-md text-on-surface">Nano-Pigment</p>
          </div>
          <div className="bg-surface-container border border-outline-variant p-md rounded-xl">
            <span className="material-symbols-outlined text-primary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-xs">Wear Time</h4>
            <p className="font-body-md text-sm md:text-body-md text-on-surface">14 Days</p>
          </div>
          <div className="bg-surface-container border border-outline-variant p-md rounded-xl">
            <span className="material-symbols-outlined text-primary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-xs">Ethics</h4>
            <p className="font-body-md text-sm md:text-body-md text-on-surface">Cruelty-Free</p>
          </div>
          <div className="bg-surface-container border border-outline-variant p-md rounded-xl">
            <span className="material-symbols-outlined text-primary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
            <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-xs">Finish</h4>
            <p className="font-body-md text-sm md:text-body-md text-on-surface">High-Gloss</p>
          </div>
        </div>
      </section>

      {/* MultiChannelContact handles its own fixed positioning now */}
      <MultiChannelContact productName={product.name} />
    </main>
  )
}
