import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

// Admin client bypasses RLS — same pattern as stripe webhook and license endpoint
function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Only ARIA desktop uses this endpoint (Bearer JWT auth).
// Web dashboard does NOT need to call this directly.
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
