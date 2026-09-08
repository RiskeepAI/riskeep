import { NextRequest } from 'next/server'

/**
 * Rate limiter en memoria, por IP + ruta, ventana fija.
 *
 * Aviso honesto: en un despliegue serverless con varias instancias (Vercel,
 * etc.) cada instancia tiene su propio contador — no es un límite global
 * exacto. Aun así corta el abuso trivial (bucles, scripts) y es gratis (sin
 * Redis/infra nueva). Si el tráfico crece y hace falta un límite exacto
 * entre instancias, migrar a Upstash Redis u otro store compartido.
 */
const buckets = new Map<string, { count: number; resetAt: number }>()

// Limpieza periódica para no acumular entradas de IPs que ya no vuelven.
setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key)
  }
}, 5 * 60_000).unref?.()

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

/** Devuelve true si la petición debe BLOQUEARSE (límite superado). */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  bucket.count += 1
  return bucket.count > limit
}
