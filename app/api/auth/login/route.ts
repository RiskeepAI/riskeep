import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isSameOrigin } from '@/lib/csrf'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

// Antes signInWithPassword() se llamaba directo desde el navegador, sin
// ningún límite propio de Riskeep — Supabase ya throttlea intentos de
// login a nivel de proyecto, pero sin esta capa no había ninguna defensa
// adicional específica de esta app contra fuerza bruta. No envía email
// (menor prioridad que forgot-password/register), pero se añade la misma
// protección por defensa en profundidad.
//
// Usa el cliente de servidor (no el de navegador) para que la sesión se
// escriba en las cookies de la respuesta — el navegador queda autenticado
// igual que antes, solo cambia dónde se hace la llamada.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Origen no válido' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const email    = body?.email
  const password = body?.password

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
  }

  if (isRateLimited(`login:ip:${getClientIp(req)}`, 10, 5 * 60_000)) {
    return NextResponse.json({ error: 'Demasiados intentos, inténtalo en unos minutos' }, { status: 429 })
  }
  if (isRateLimited(`login:email:${email.toLowerCase()}`, 8, 15 * 60_000)) {
    return NextResponse.json({ error: 'Demasiados intentos, inténtalo en unos minutos' }, { status: 429 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
