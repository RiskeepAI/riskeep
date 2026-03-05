export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  stripe_price_id: string | null
  status: SubscriptionStatus
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  stripePriceId: string
  features: string[]
  popular?: boolean
}
