import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

// Límites de longitud — no son inyectables (Supabase parametriza todo),
// pero sin esto un token Bearer válido podía guardar strings arbitrariamente
// largos o un episode_json de cualquier tamaño.
const MAX_SHORT_FIELD = 64
const MAX_EPISODE_JSON_BYTES = 50_000 // ~50KB, de sobra para un episodio real

function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/* ── GET — web dashboard fetches user's own episodes ──────── */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data: episodes, error } = await supabase
    .from('trading_episodes')
    .select('symbol, action, status, pnl_pct, closed_at, mode, confidence')
    .eq('user_id', user.id)
    .order('closed_at', { ascending: false })
    .limit(5)

  if (error) {
    return NextResponse.json({ error: 'Error al obtener episodios' }, { status: 500 })
  }

  const all     = episodes ?? []
  const winners = all.filter(e => e.status === 'winner').length
  const winRate = all.length > 0 ? Math.round((winners / all.length) * 100) : null
  const pnl7d   = all.reduce((sum, e) => sum + (e.pnl_pct ?? 0), 0)

  return NextResponse.json({
    episodes: all,
    stats: { winRate, total: all.length, pnl7d: +pnl7d.toFixed(2) },
  })
}

/* ── POST — ARIA desktop uploads closed episodes ──────────── */
export async function POST(req: NextRequest) {
  // ── Auth: Bearer token only (ARIA desktop) ────────────────────────────
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Se requiere token Bearer' }, { status: 401 })
  }

  const token = authHeader.slice(7)
  // Verify JWT with Supabase using the anon client (same as /api/license)
  const anonClient = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 })
  }

  if (isRateLimited(`episodes:${user.id}`, 60, 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo en un minuto' }, { status: 429 })
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  // ── Validate required fields ──────────────────────────────────────────
  const required = ['episode_id', 'symbol', 'action', 'status', 'episode_json']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Campo requerido: ${field}` },
        { status: 422 }
      )
    }
  }

  // Only upload closed episodes (winner / loser) — rejected/observed are not useful for training
  const status = String(body.status)
  if (!['winner', 'loser'].includes(status)) {
    return NextResponse.json(
      { error: `status debe ser winner o loser (recibido: ${status})` },
      { status: 422 }
    )
  }

  const action = String(body.action)
  if (!['LONG', 'SHORT'].includes(action)) {
    return NextResponse.json(
      { error: `action debe ser LONG o SHORT (recibido: ${action})` },
      { status: 422 }
    )
  }

  for (const field of ['episode_id', 'symbol', 'mode', 'aria_version']) {
    const value = body[field]
    if (value != null && String(value).length > MAX_SHORT_FIELD) {
      return NextResponse.json(
        { error: `${field} supera el máximo de ${MAX_SHORT_FIELD} caracteres` },
        { status: 422 }
      )
    }
  }

  const episodeJsonSize = Buffer.byteLength(JSON.stringify(body.episode_json ?? {}), 'utf8')
  if (episodeJsonSize > MAX_EPISODE_JSON_BYTES) {
    return NextResponse.json(
      { error: `episode_json supera el máximo de ${MAX_EPISODE_JSON_BYTES} bytes` },
      { status: 422 }
    )
  }

  // ── Insert into trading_episodes ──────────────────────────────────────
  const admin = getAdminClient()
  const { error: dbError } = await admin
    .from('trading_episodes')
    .insert({
      user_id:      user.id,
      episode_id:   String(body.episode_id),
      symbol:       String(body.symbol),
      action:       String(body.action),
      status:       status,
      mode:         String(body.mode ?? 'paper'),
      pnl:          body.pnl != null ? Number(body.pnl) : null,
      pnl_pct:      body.pnl_pct != null ? Number(body.pnl_pct) : null,
      confidence:   body.confidence != null ? Number(body.confidence) : null,
      opened_at:    body.opened_at ? String(body.opened_at) : null,
      closed_at:    body.closed_at ? String(body.closed_at) : null,
      aria_version: body.aria_version ? String(body.aria_version) : null,
      episode_json: body.episode_json,
    })

  if (dbError) {
    // Duplicate episode_id → idempotent response (ARIA may retry on network failure)
    if (dbError.code === '23505') {
      return NextResponse.json({ ok: true, duplicate: true })
    }
    console.error('[episodes] DB error:', dbError)
    return NextResponse.json({ error: 'Error guardando episodio' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
