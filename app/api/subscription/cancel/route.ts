import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'
import { isSameOrigin } from '@/lib/csrf'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Origen no válido' }, { status: 403 })
  }
  if (isRateLimited(`cancel:${getClientIp(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo en un minuto' }, { status: 429 })
  }

  // Verify session
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  // Get subscription from Supabase
  const admin = getAdminClient()
  const { data: subscription, error: dbError } = await admin
    .from('subscriptions')
    .select('stripe_subscription_id, status, cancel_at_period_end')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .order('current_period_end', { ascending: false })
    .limit(1)
    .single()

  if (dbError || !subscription) {
    return NextResponse.json({ error: 'No se encontró suscripción activa' }, { status: 404 })
  }

  if (subscription.cancel_at_period_end) {
    return NextResponse.json({ error: 'La suscripción ya está programada para cancelarse' }, { status: 400 })
  }

  if (!subscription.stripe_subscription_id) {
    return NextResponse.json({ error: 'ID de suscripción no encontrado' }, { status: 400 })
  }

  // Tell Stripe to cancel at period end (not immediately)
  await stripe.subscriptions.update(subscription.stripe_subscription_id, {
    cancel_at_period_end: true,
  })

  // Webhook will update Supabase automatically via customer.subscription.updated
  return NextResponse.json({ ok: true })
}
