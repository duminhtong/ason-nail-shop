'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email hoặc mật khẩu không chính xác')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[100vh] bg-[#0A0A0C] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-[#141218]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Quản Trị Viên</h1>
            <p className="text-white/50 text-sm font-medium tracking-wide">Hệ thống A SÓN NAIL</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Email Access</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20" 
                placeholder="admin@ason.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(207,188,255,0.25)] flex items-center justify-center gap-3 mt-8"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>XÁC THỰC TRUY CẬP</span>
                  <span className="material-symbols-outlined text-lg">login</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-[3px] font-medium">
          Secure Encrypted Management Portal
        </p>
      </div>
    </div>
  )
}
