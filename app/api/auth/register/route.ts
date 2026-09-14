import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isSameOrigin } from '@/lib/csrf'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

// Igual que forgot-password: signUp() envía un email de confirmación desde
// la misma cuota compartida de Supabase — sin límite propio, registrar
// cuentas en bucle podía agotarla igual que machacar la recuperación de
// contraseña. Antes esto llamaba a supabase.auth.signUp() directo desde el
// navegador, sin pasar por aquí.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Origen no válido' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const email    = body?.email
  const password = body?.password
  const fullName = body?.fullName ?? ''

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
  }

  if (isRateLimited(`register:ip:${getClientIp(req)}`, 5, 15 * 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo más tarde' }, { status: 429 })
  }
  if (isRateLimited(`register:email:${email.toLowerCase()}`, 3, 15 * 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo más tarde' }, { status: 429 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
