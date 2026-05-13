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
    <div className="min-h-screen bg-background flex items-center justify-center p-gutter">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]"></div>
      
      <div className="w-full max-w-md bg-surface-container border border-outline-variant rounded-2xl p-xl shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="text-center mb-xl">
          <h1 className="font-h1 text-h2 text-primary uppercase tracking-tighter mb-xs">Admin Access</h1>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest font-label-caps">Hệ thống quản trị A SÓN NAIL</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error text-xs p-md rounded-lg mb-lg text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-lg">
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Email Quản Trị</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all text-on-surface" 
              placeholder="admin@ason.com"
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Mật Khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-lg px-md py-sm focus:border-primary outline-none transition-all text-on-surface" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-background font-button py-md rounded-xl hover:bg-surface-tint transition-all shadow-[0_0_20px_rgba(207,188,255,0.2)] uppercase flex items-center justify-center gap-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'ĐĂNG NHẬP HỆ THỐNG'
            )}
          </button>
        </form>

        <p className="mt-xl text-center text-[10px] text-on-surface-variant uppercase tracking-tighter opacity-50">
          Secure Encrypted Management Portal
        </p>
      </div>
    </div>
  )
}
