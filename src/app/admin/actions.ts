'use server'

import { supabase } from '@/lib/supabase-db'
import { revalidatePath } from 'next/cache'

export async function updateSiteConfig(formData: FormData) {
  const entries = Array.from(formData.entries())
  
  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      await supabase
        .from('SiteConfig')
        .upsert({ key, value }, { onConflict: 'key' })
    }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}

export async function signOut(formData: FormData) {
  const { createClient } = await import('@/utils/supabase/server')
  const { cookies } = await import('next/headers')
  const supabase = createClient(await cookies())
  await supabase.auth.signOut()
  revalidatePath('/login')
}

export async function deleteLead(id: string) {
  await supabase.from('Lead').delete().eq('id', id)
  revalidatePath('/admin')
  return { success: true }
}
