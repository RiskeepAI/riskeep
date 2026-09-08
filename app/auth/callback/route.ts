import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Solo se permite una ruta interna relativa: un solo "/" inicial, sin "//"
// (protocol-relative), sin ":" ni "@" — evita el open redirect clásico vía
// userinfo (ej. next=@evil.com -> `${origin}${next}` = "https://riskeep.com@evil.com",
// que el navegador interpreta como usuario "riskeep.com" en el host "evil.com").
function safeNext(value: string | null): string {
  if (value && /^\/(?!\/)[A-Za-z0-9\-_/]*$/.test(value)) return value
  return '/dashboard'
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'recovery' | 'email' | 'signup' | null
  const next = safeNext(searchParams.get('next'))

  const supabase = await createClient()

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=link_expired`)
}
