import { supabase } from '@/lib/supabase-db'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const { data: products } = await supabase
    .from('Product')
    .select(`
      *,
      ProductImage (
        url,
        isMain
      )
    `)
    .order('createdAt', { ascending: false })

  async function deleteProduct(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    await supabase.from('Product').delete().eq('id', id)
    revalidatePath('/admin/products')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sản Phẩm</h1>
            <p className="text-white/50 text-sm">Quản lý kho hàng của bạn</p>
          </div>
          <Link 
            href="/admin/products/new" 
            className="bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            THÊM SẢN PHẨM
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => {
            const mainImage = product.ProductImage?.find((img: any) => img.isMain)?.url || product.ProductImage?.[0]?.url || "https://placehold.co/800x800/141218/cfbcff?text=No+Image"
            
            return (
              <div key={product.id} className="bg-[#141218] border border-white/5 rounded-[32px] overflow-hidden group">
                <div className="aspect-[4/3] bg-white/5 relative">
                  <img src={mainImage} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <button type="submit" className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-primary font-bold mb-4">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.sellingPrice)}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/product/${product.slug}`} target="_blank" className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-center text-xs font-bold hover:bg-white/10 transition-all">
                      XEM TRANG WEB
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
