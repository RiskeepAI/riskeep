'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import { createClient } from '@/lib/supabase/client'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Pricing() {
  const router = useRouter()
  const t = useT()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)
  const [inView, setInView] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Checkout real de Stripe — pausado hasta el lanzamiento (ver comentario
  // junto al botón CTA más abajo, que ahora mismo llama a
  // setShowComingSoon en vez de a esta función). Se deja intacta para
  // reactivar el botón con un solo cambio cuando el producto esté listo.
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
    <section
      id="pricing"
      ref={sectionRef}
      className="py-14 px-6 relative transition-colors duration-1000"
      style={{
        backgroundColor: inView ? 'rgba(13,18,32,1)' : 'transparent',
      }}
    >
      {/* Ambient violet glow — appears when in view */}
      <div
        className={`absolute inset-0 pointer-events-none pricing-ambient transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <AnimateIn className="text-center mb-10 space-y-3">
          <SectionChip color="amber">{t.pricing.chip}</SectionChip>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">{t.pricing.title}</h2>
          <p className="text-slate-400 text-lg">{t.pricing.subtitle}</p>
        </AnimateIn>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-2 mb-10 p-1 rounded-xl bg-white/5 border border-white/8 w-fit mx-auto">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                billing === b
                  ? 'bg-amber-500 text-[#0A0F1E] font-semibold shadow-lg shadow-amber-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {b === 'monthly' ? t.pricing.monthly : t.pricing.yearly}
              {b === 'yearly' && billing !== 'yearly' && (
                <Badge variant="green" className="text-[10px] py-0.5 px-2">-28%</Badge>
              )}
            </button>
          ))}
        </div>

        {/* Free demo note */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-green-500 font-medium">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{t.pricing.freeNote}</span>
        </div>

        {/* Badge fuera del overflow-hidden para que no se corte */}
        {billing === 'yearly' && (
          <div className="flex justify-center mb-3">
            <Badge variant="gold">
              <Zap className="w-3 h-3" />
              {t.pricing.mostPopular}
            </Badge>
          </div>
        )}

        {/* Plan card — dos columnas: precio+CTA / lo que incluye */}
        <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/6 to-transparent backdrop-blur-sm overflow-hidden grid lg:grid-cols-2">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
          {/* Divider — vertical en desktop */}
          <div className="hidden lg:block absolute top-8 bottom-8 left-1/2 w-px bg-white/8 pointer-events-none" />

          <div className="relative p-8 lg:py-10 flex flex-col justify-center">
            <div className="flex items-end gap-2 mb-2">
              <span className="font-heading text-5xl font-bold text-white">{price}€</span>
              <span className="text-slate-400 mb-2 text-lg">{period}</span>
            </div>

            {savings && (
              <p className="text-green-500 text-sm font-medium mb-6">{savings}</p>
            )}
            {!savings && <div className="mb-6" />}

            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowComingSoon(true)}
            >
              {t.pricing.ctaButton}
            </Button>
          </div>

          <div className="relative px-8 pb-8 lg:p-8 lg:py-10 flex flex-col justify-center border-t border-white/8 lg:border-t-0">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4 mt-6 lg:mt-0">
              {t.pricing.includesLabel}
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          {t.pricing.footerNote}
        </p>
      </div>

      <Modal open={showComingSoon} onClose={() => setShowComingSoon(false)}>
        <Badge variant="gold" className="mb-4">
          <Zap className="w-3 h-3" />
          {t.pricing.comingSoon.badge}
        </Badge>
        <h3 className="font-heading text-2xl font-bold text-white mb-3">
          {t.pricing.comingSoon.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {t.pricing.comingSoon.body}
        </p>
        <div className="flex flex-col gap-2.5">
          <Link href="/register" onClick={() => setShowComingSoon(false)}>
            <Button size="lg" className="w-full">
              {t.pricing.comingSoon.ctaTry}
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="w-full" onClick={() => setShowComingSoon(false)}>
            {t.pricing.comingSoon.ctaClose}
          </Button>
        </div>
      </Modal>
    </section>
  )
}
