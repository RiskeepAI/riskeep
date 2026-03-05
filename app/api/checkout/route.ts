import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { plan } = await req.json()

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
  }

  const selectedPlan = PLANS[plan as keyof typeof PLANS]

  // Get user if logged in (optional at checkout)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: selectedPlan.stripePriceId,
        quantity: 1,
      },
    ],
    ...(user?.email && { customer_email: user.email }),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/register?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
    metadata: {
      plan: plan,
      ...(user?.id && { user_id: user.id }),
    },
    subscription_data: {
      metadata: {
        plan: plan,
        ...(user?.id && { user_id: user.id }),
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
