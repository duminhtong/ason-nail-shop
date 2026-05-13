import { getSiteConfigs, supabase } from '@/lib/supabase-db'
import { updateSiteConfig, signOut } from './actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const configs = await getSiteConfigs([
    'BRAND_NAME', 'HERO_TITLE', 'HERO_BUTTON', 'HERO_IMAGE',
    'CONTACT_ZALO', 'CONTACT_WHATSAPP', 'CONTACT_INSTAGRAM', 'CONTACT_EMAIL'
  ])

  const { data: leads } = await supabase
    .from('Lead')
    .select('*')
    .order('createdAt', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase text-primary">Admin Control</h1>
            <p className="text-white/50 text-sm">Hệ thống quản trị A SÓN NAIL</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Link href="/admin/products" className="flex-1 md:flex-none bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined">inventory_2</span>
              SẢN PHẨM
            </Link>
            <form action={signOut}>
              <button type="submit" className="w-full bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:text-red-500 hover:border-red-500/30 transition-all">
                <span className="material-symbols-outlined">logout</span>
                THOÁT
              </button>
            </form>
          </div>
        </header>

        {/* Admin Tabs/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-[#141218] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                Cấu hình Giao diện
              </h2>
              
              <form action={updateSiteConfig} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Tên Thương Hiệu</label>
                    <input name="BRAND_NAME" defaultValue={configs.BRAND_NAME} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Tiêu đề Hero</label>
                    <input name="HERO_TITLE" defaultValue={configs.HERO_TITLE} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Ảnh Banner (URL)</label>
                  <input name="HERO_IMAGE" defaultValue={configs.HERO_IMAGE} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Số Zalo</label>
                    <input name="CONTACT_ZALO" defaultValue={configs.CONTACT_ZALO} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">WhatsApp</label>
                    <input name="CONTACT_WHATSAPP" defaultValue={configs.CONTACT_WHATSAPP} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_8px_32px_rgba(207,188,255,0.25)]">
                  LƯU THAY ĐỔI
                </button>
              </form>
            </section>
          </div>

          <div className="lg:col-span-1">
            <section className="bg-[#141218] rounded-[32px] border border-white/5 p-8 h-full max-h-[800px] overflow-hidden flex flex-col shadow-2xl">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">inbox</span>
                Khách hàng
              </h2>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 hide-scrollbar">
                {leads?.length === 0 ? (
                  <p className="text-white/20 italic text-center py-10">Chưa có khách hàng nào</p>
                ) : (
                  leads?.map((lead) => (
                    <div key={lead.id} className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-primary">{lead.name}</h4>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">
                          {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white/80 mb-2">{lead.contact}</p>
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                         <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Yêu cầu:</p>
                         <p className="text-xs text-white/60">{lead.product}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
