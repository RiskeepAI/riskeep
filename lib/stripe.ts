import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export const PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Mensual',
    price: 29,
    interval: 'month' as const,
    stripePriceId: process.env.STRIPE_PRICE_MONTHLY!,
    features: [
      'ARIA — Agente de trading autónomo',
      'Análisis técnico con IA en tiempo real',
      'Gestión automática de riesgo',
      'Soporte Binance (paper + real)',
      'Alertas vía Telegram',
      'Actualizaciones incluidas',
    ],
  },
  yearly: {
    id: 'yearly',
    name: 'Anual',
    price: 249,
    interval: 'year' as const,
    stripePriceId: process.env.STRIPE_PRICE_YEARLY!,
    features: [
      'Todo lo del plan mensual',
      '2 meses gratis (ahorra 99€)',
      'Soporte prioritario',
      'Acceso anticipado a nuevas funciones',
    ],
    popular: true,
  },
}
