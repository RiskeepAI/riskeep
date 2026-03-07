'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/client'

const plans = {
  monthly: {
    name: 'Mensual',
    price: 29,
    priceId: 'monthly',
    period: '/mes',
    savings: null,
    features: [
      'ARIA — Agente de trading autónomo',
      'Análisis técnico con IA en tiempo real',
      'Gestión automática de riesgo (ATR)',
      'Soporte Binance (paper + real)',
      'Múltiples pares simultáneos',
      'Alertas vía Telegram',
      'Actualizaciones automáticas',
      'Soporte por email',
    ],
  },
  yearly: {
    name: 'Anual',
    price: 249,
    priceId: 'yearly',
    period: '/año',
    savings: 'Ahorras 99€',
    features: [
      'Todo lo del plan mensual',
      '2 meses gratis incluidos',
      'Soporte prioritario',
      'Acceso anticipado a nuevas funciones',
      'Historial de rendimiento extendido',
    ],
  },
}

export default function Pricing() {
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      // Check if user is logged in first
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not logged in → send to login with plan info preserved
        router.push(`/login?plan=${billing}`)
        return
      }

      // Logged in → go straight to Stripe
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billing }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const plan = plans[billing]

  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">Precios</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Simple y transparente</h2>
          <p className="text-slate-400 text-lg">Un único plan. Todo incluido. Sin sorpresas.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              billing === 'monthly' ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'yearly' ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Anual
            <Badge variant="green" className="text-[10px] py-0.5">-28%</Badge>
          </button>
        </div>

        {/* Plan card */}
        <div className="relative p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/8 to-transparent backdrop-blur-sm">
          {billing === 'yearly' && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge variant="blue">Más popular</Badge>
            </div>
          )}

          <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-bold text-white">{plan.price}€</span>
            <span className="text-slate-400 mb-2 text-lg">{plan.period}</span>
          </div>

          {plan.savings && (
            <p className="text-emerald-400 text-sm font-medium mb-6">{plan.savings}</p>
          )}
          {!plan.savings && <div className="mb-6" />}

          <Button
            size="lg"
            className="w-full mb-8"
            onClick={handleSubscribe}
            loading={loading}
          >
            Suscribirse ahora
          </Button>

          <ul className="space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Pago seguro con Stripe. Cancela en cualquier momento desde tu cuenta.
        </p>
      </div>
    </section>
  )
}
