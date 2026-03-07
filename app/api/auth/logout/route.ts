import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  // Redirect relative to the current request origin (works in dev and prod)
  return NextResponse.redirect(new URL('/', req.url))
}
