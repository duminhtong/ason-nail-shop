import { NextResponse } from 'next/server'
import { createLead } from '@/lib/supabase-db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, contact, product, note } = body

    if (!name || !contact || !product) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await createLead({ name, contact, product, note })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
