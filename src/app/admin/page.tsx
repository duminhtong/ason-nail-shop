import { getSiteConfigs, supabase } from '@/lib/supabase-db'
import { updateSiteConfig, signOut } from './actions'

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
    <div className="min-h-screen bg-background text-on-surface p-gutter pt-[80px] md:pt-[120px]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-lg md:mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
          <div>
            <h1 className="font-h1 text-h2 md:text-h1 text-primary uppercase tracking-tighter">Admin Control</h1>
            <p className="text-on-surface-variant text-sm md:text-base">Quản lý nội dung và khách hàng tiềm năng</p>
          </div>
          <form action={signOut} className="w-full md:w-auto">
            <button type="submit" className="w-full md:w-auto px-md py-sm rounded-lg bg-surface-container border border-outline-variant text-on-surface hover:text-error transition-all flex items-center justify-center gap-sm">
              <span className="material-symbols-outlined text-sm">logout</span>
              ĐĂNG XUẤT
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg md:gap-xl">
          {/* Configuration Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <section className="bg-surface-container rounded-2xl border border-outline-variant p-lg md:p-xl shadow-xl">
              <h2 className="font-h3 text-h3 mb-lg flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">settings</span>
                Cấu hình Giao diện
              </h2>
              
              <form action={updateSiteConfig} className="space-y-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label-caps text-[10px] text-on-surface-variant">Tên Thương Hiệu</label>
                    <input name="BRAND_NAME" defaultValue={configs.BRAND_NAME} className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-caps text-[10px] text-on-surface-variant">Tiêu đề Hero</label>
                    <input name="HERO_TITLE" defaultValue={configs.HERO_TITLE} className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="font-label-caps text-[10px] text-on-surface-variant">Ảnh Banner (URL)</label>
                  <input name="HERO_IMAGE" defaultValue={configs.HERO_IMAGE} className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label-caps text-[10px] text-on-surface-variant">Số Zalo</label>
                    <input name="CONTACT_ZALO" defaultValue={configs.CONTACT_ZALO} className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-caps text-[10px] text-on-surface-variant">WhatsApp (Quốc tế)</label>
                    <input name="CONTACT_WHATSAPP" defaultValue={configs.CONTACT_WHATSAPP} className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full mt-lg bg-primary text-background font-button py-md rounded-xl hover:bg-surface-tint transition-all shadow-[0_0_20px_rgba(207,188,255,0.2)]">
                  LƯU THAY ĐỔI
                </button>
              </form>
            </section>
          </div>

          {/* Lead List */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <section className="bg-surface-container rounded-2xl border border-outline-variant p-lg h-full max-h-[600px] lg:max-h-[800px] overflow-hidden flex flex-col">
              <h2 className="font-h3 text-h3 mb-lg flex items-center gap-sm">
                <span className="material-symbols-outlined text-electric-purple">inbox</span>
                Khách hàng mới
              </h2>
              
              <div className="flex-1 overflow-y-auto space-y-md pr-sm hide-scrollbar pb-md">
                {leads?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-xl opacity-30">
                    <span className="material-symbols-outlined text-4xl mb-sm">pending_actions</span>
                    <p className="text-sm italic">Chưa có khách hàng nào</p>
                  </div>
                ) : (
                  leads?.map((lead) => (
                    <div key={lead.id} className="bg-background border border-outline-variant p-md rounded-xl relative group hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-xs">
                        <h4 className="font-button text-primary text-sm">{lead.name}</h4>
                        <span className="text-[10px] text-on-surface-variant opacity-60">
                          {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-sm font-bold mb-xs">{lead.contact}</p>
                      <p className="text-[10px] text-on-surface-variant mb-xs uppercase tracking-widest">Sản phẩm: <span className="text-on-surface">{lead.product}</span></p>
                      {lead.note && (
                        <div className="mt-sm p-sm bg-surface-container rounded-lg border-l-2 border-primary">
                          <p className="text-[11px] text-on-surface-variant italic">"{lead.note}"</p>
                        </div>
                      )}
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
