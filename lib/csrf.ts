import { NextRequest } from 'next/server'

/**
 * Comprobación CSRF ligera para rutas de API autenticadas por cookie
 * (sesión de Supabase). No aplica a rutas autenticadas por Bearer token
 * (ARIA desktop) — un formulario/fetch cross-site no puede añadir esa
 * cabecera Authorization, así que esas rutas ya son inmunes a CSRF por
 * diseño.
 *
 * Compara el header Origin (o Referer si Origin no está presente) contra
 * el origen real de la petición. Los navegadores modernos siempre mandan
 * Origin en peticiones POST/state-changing vía fetch/formulario.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer')
  if (!origin) return false

  try {
    return new URL(origin).origin === req.nextUrl.origin
  } catch {
    return false
  }
}
