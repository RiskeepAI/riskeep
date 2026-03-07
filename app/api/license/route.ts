import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

// Admin client bypasses RLS — same pattern as stripe webhook
function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  let userId: string | null = null

  // ── Auth: Bearer token (ARIA desktop) ─────────────────────────────────
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    // Verify JWT with Supabase using the anon client
    const supabase = createSupabaseAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 })
    }
    userId = user.id
  } else {
    // ── Auth: Cookie session (web dashboard) ──────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    userId = user.id
  }

  // ── Query subscription ─────────────────────────────────────────────────
  const admin = getAdminClient()
  const { data: subscriptions, error: dbError } = await admin
    .from('subscriptions')
    .select('status, plan, current_period_end, cancel_at_period_end')
    .eq('user_id', userId)
    .order('current_period_end', { ascending: false })

  if (dbError) {
    console.error('[license] DB error:', dbError)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  // Same priority logic as dashboard: active/trialing first, fallback to latest
  const subscription = subscriptions?.find(
    s => s.status === 'active' || s.status === 'trialing'
  ) ?? subscriptions?.[0] ?? null

  const isActive =
    subscription?.status === 'active' || subscription?.status === 'trialing'

  return NextResponse.json(
    {
      mode:              isActive ? 'live' : 'paper',
      plan:              subscription?.plan ?? null,
      status:            subscription?.status ?? null,
      validUntil:        subscription?.current_period_end ?? null,
      cancelAtPeriodEnd: subscription?.cancel_at_period_end ?? false,
    },
    {
      headers: {
        // Cache 5 min on client side (ARIA can cache longer internally)
        'Cache-Control': 'private, max-age=300',
      },
    }
  )
}
