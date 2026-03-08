'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/client'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Pricing() {
  const router = useRouter()
  const t = useT()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/login?plan=${billing}`)
        return
      }

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

  const isMonthly = billing === 'monthly'
  const price     = isMonthly ? 29 : 249
  const period    = isMonthly ? t.pricing.monthly : t.pricing.yearly
  const savings   = isMonthly ? null : t.pricing.savingsYearly
  const features  = isMonthly ? t.pricing.featuresMonthly : t.pricing.featuresYearly

  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">{t.pricing.chip}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{t.pricing.title}</h2>
          <p className="text-slate-400 text-lg">{t.pricing.subtitle}</p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              billing === 'monthly' ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {t.pricing.monthly}
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'yearly' ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {t.pricing.yearly}
            <Badge variant="green" className="text-[10px] py-0.5">-28%</Badge>
          </button>
        </div>

        {/* Free demo note */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-emerald-400 font-medium">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{t.pricing.freeNote}</span>
        </div>

        {/* Plan card */}
        <div className="relative p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/8 to-transparent backdrop-blur-sm">
          {billing === 'yearly' && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge variant="blue">{t.pricing.mostPopular}</Badge>
            </div>
          )}

          <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-bold text-white">{price}€</span>
            <span className="text-slate-400 mb-2 text-lg">{period}</span>
          </div>

          {savings && (
            <p className="text-emerald-400 text-sm font-medium mb-6">{savings}</p>
          )}
          {!savings && <div className="mb-6" />}

          <Button
            size="lg"
            className="w-full mb-8"
            onClick={handleSubscribe}
            loading={loading}
          >
            {t.pricing.ctaButton}
          </Button>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          {t.pricing.footerNote}
        </p>
      </div>
    </section>
  )
}
