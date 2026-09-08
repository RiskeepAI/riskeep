import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isSameOrigin } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Origen no válido' }, { status: 403 })
  }

  const supabase = await createClient()
  await supabase.auth.signOut()
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''
  return NextResponse.redirect(redirectUrl)
}
