import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isSameOrigin } from '@/lib/csrf'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

// Antes esta llamada iba directa del navegador a Supabase
// (resetPasswordForEmail) sin pasar por aquí — sin límite propio, un
// atacante podía automatizar peticiones sin ninguna clave ni cuenta válida
// y agotar la cuota de envío de emails de Supabase (mucho más baja que la
// de peticiones normales), dejando sin poder recibir su email de
// recuperación a cualquier usuario real hasta que se resetee la cuota.
//
// Límite por IP + por email: por IP evita el barrido masivo; por email
// evita que repartiendo la misma petición entre varias IPs se pueda
// machacar el buzón de una sola víctima.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Origen no válido' }, { status: 403 })
  }

  const { email } = await req.json().catch(() => ({ email: null }))
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
  }

  if (isRateLimited(`forgot-password:ip:${getClientIp(req)}`, 5, 15 * 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo más tarde' }, { status: 429 })
  }
  if (isRateLimited(`forgot-password:email:${email.toLowerCase()}`, 3, 15 * 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo más tarde' }, { status: 429 })
  }

  const supabase = await createClient()
  // No se distingue si el email existe o no en la respuesta — Supabase ya
  // devuelve éxito en ambos casos para no permitir enumerar cuentas.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
  })

  return NextResponse.json({ ok: true })
}
