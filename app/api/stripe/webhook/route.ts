import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode !== 'subscription') break

      const customerId = session.customer as string
      const subscriptionId = session.subscription as string
      const userId = session.metadata?.user_id

      const sub = await stripe.subscriptions.retrieve(subscriptionId)
      const periodStart = (sub as unknown as { current_period_start: number }).current_period_start
      const periodEnd   = (sub as unknown as { current_period_end: number }).current_period_end

      const priceId = sub.items.data[0].price.id
      const plan = priceId === process.env.STRIPE_PRICE_YEARLY ? 'yearly' : 'monthly'

      const row = {
        stripe_customer_id:     customerId,
        stripe_subscription_id: subscriptionId,
        plan,
        status:                 sub.status,
        current_period_start:   new Date(periodStart * 1000).toISOString(),
        current_period_end:     new Date(periodEnd * 1000).toISOString(),
        cancel_at_period_end:   sub.cancel_at_period_end,
      }

      if (userId) {
        await supabase.from('subscriptions').upsert(
          { ...row, user_id: userId },
          { onConflict: 'user_id' }
        )
      } else {
        await supabase.from('subscriptions').upsert(row, { onConflict: 'stripe_customer_id' })
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string

      const { data: existing } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (existing?.user_id) {
        const periodStart = (sub as unknown as { current_period_start: number }).current_period_start
        const periodEnd   = (sub as unknown as { current_period_end: number }).current_period_end

        const priceId2 = sub.items.data[0].price.id
        await supabase.from('subscriptions').upsert({
          user_id:                existing.user_id,
          stripe_customer_id:     customerId,
          stripe_subscription_id: sub.id,
          plan:                   priceId2 === process.env.STRIPE_PRICE_YEARLY ? 'yearly' : 'monthly',
          status:                 sub.status,
          current_period_start:   new Date(periodStart * 1000).toISOString(),
          current_period_end:     new Date(periodEnd * 1000).toISOString(),
          cancel_at_period_end:   sub.cancel_at_period_end,
        }, { onConflict: 'user_id' })
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string
      await supabase
        .from('subscriptions')
        .update({ status: 'past_due' })
        .eq('stripe_customer_id', customerId)
      break
    }
  }

  return NextResponse.json({ received: true })
}
