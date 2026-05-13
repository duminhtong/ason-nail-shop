import { supabase } from '@/lib/supabase-db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    'use server'
    
    const name = formData.get('name') as string
    const slug = name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
    
    const description = formData.get('description') as string
    const sellingPrice = parseInt(formData.get('sellingPrice') as string)
    const imageUrl = formData.get('imageUrl') as string

    // 1. Insert into Product table
    const { data: product, error: pError } = await supabase
      .from('Product')
      .insert({
        name,
        slug,
        description,
        sellingPrice,
        costPrice: 0,
        profitMargin: 0,
        isActive: true,
        isNew: true
      })
      .select()
      .single()

    if (pError) {
      console.error('Product Error:', pError)
      return
    }

    // 2. Insert into ProductImage table
    if (product && imageUrl) {
      const { error: iError } = await supabase
        .from('ProductImage')
        .insert({
          url: imageUrl,
          productId: product.id,
          isMain: true
        })
      
      if (iError) {
        console.error('Image Error:', iError)
      }
    }

    redirect('/admin/products')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link href="/admin/products" className="text-primary text-sm flex items-center gap-2 mb-4 hover:underline">
            <span className="material-symbols-outlined">arrow_back</span>
            QUAY LẠI DANH SÁCH
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Thêm Sản Phẩm Mới</h1>
        </div>

        <form action={createProduct} className="space-y-6 bg-[#141218] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Tên sản phẩm</label>
            <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all text-white placeholder:text-white/10" placeholder="Ví dụ: Midnight Neon Purple" />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Giá bán (VNĐ)</label>
            <input name="sellingPrice" type="number" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all text-white placeholder:text-white/10" placeholder="250000" />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Ảnh sản phẩm (URL)</label>
            <input name="imageUrl" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all text-white placeholder:text-white/10" placeholder="Dán link ảnh tại đây..." />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Mô tả</label>
            <textarea name="description" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all text-white placeholder:text-white/10" placeholder="Thông tin chi tiết về sản phẩm..." />
          </div>

          <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(207,188,255,0.25)] flex items-center justify-center gap-3">
            <span>XÁC NHẬN TẠO SẢN PHẨM</span>
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        </form>
      </div>
    </div>
  )
}
