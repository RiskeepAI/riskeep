'use client'

import { useEffect, useRef } from 'react'
import { KeyRound, SlidersHorizontal, BotMessageSquare, ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import { useT } from '@/lib/i18n/LanguageContext'

const STEPS = [
  {
    Icon:    KeyRound,
    num:     '01',
    accent:  '#F59E0B',
    border:  'border-amber-500/25',
    bg:      'bg-amber-500/8',
    iconBg:  'bg-amber-500/12 border-amber-500/20',
    text:    'text-amber-400',
    glow:    'hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]',
  },
  {
    Icon:    SlidersHorizontal,
    num:     '02',
    accent:  '#8B5CF6',
    border:  'border-violet-500/25',
    bg:      'bg-violet-500/8',
    iconBg:  'bg-violet-500/12 border-violet-500/20',
    text:    'text-violet-400',
    glow:    'hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]',
  },
  {
    Icon:    BotMessageSquare,
    num:     '03',
    accent:  '#22D3EE',
    border:  'border-cyan-500/25',
    bg:      'bg-cyan-500/8',
    iconBg:  'bg-cyan-500/12 border-cyan-500/20',
    text:    'text-cyan-400',
    glow:    'hover:shadow-[0_8px_40px_rgba(34,211,238,0.12)]',
  },
]

/* ── Step card with IntersectionObserver reveal ──────────── */
function StepCard({
  s,
  m,
  index,
}: {
  s: { title: string; desc: string; detail: string; tag: string }
  m: typeof STEPS[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial hidden state
    el.style.opacity = '0'
    el.style.transform = 'scale(0.8) rotate(-2deg) translateY(24px)'
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)'

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (el) {
              el.style.opacity = '1'
              el.style.transform = 'scale(1) rotate(0deg) translateY(0px)'
            }
          }, index * 120)
          obs.unobserve(el)
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 150px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={ref}>
      <div
        className={`h-full p-6 rounded-2xl border ${m.border} ${m.bg} ${m.glow}
          transition-all duration-300 cursor-default group relative overflow-hidden`}
      >
        {/* Number watermark */}
        <span
          className={`absolute top-3 right-4 font-heading font-bold text-5xl ${m.text} opacity-10 group-hover:opacity-20 transition-opacity select-none`}
        >
          {m.num}
        </span>

        <div
          className={`inline-flex p-3 rounded-xl border ${m.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          <m.Icon className={`w-5 h-5 ${m.text}`} />
        </div>

        <h3 className="font-heading text-white font-bold text-lg mb-2 group-hover:opacity-90">
          {s.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>

        <span
          className={`inline-block px-2.5 py-1 rounded-lg border ${m.iconBg} ${m.text} text-[10px] font-mono`}
        >
          {s.tag}
        </span>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const t = useT()

  const steps = [
    { title: t.how.step1title, desc: t.how.step1desc, detail: t.how.step1badge, tag: t.how.step1tag },
    { title: t.how.step2title, desc: t.how.step2desc, detail: t.how.step2badge, tag: t.how.step2tag },
    { title: t.how.step3title, desc: t.how.step3desc, detail: t.how.step3badge, tag: t.how.step3tag },
  ]

  return (
    <section id="how-it-works" className="py-14 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/4 rounded-full blur-[100px]"/>
      </div>

      {/* Header — unificado móvil y desktop */}
      <AnimateIn className="text-center mb-10 space-y-3 max-w-6xl mx-auto">
        <SectionChip color="amber">{t.how.chip}</SectionChip>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">{t.how.title}</h2>
        <p className="max-w-xl mx-auto text-slate-400 text-lg">{t.how.subtitle}</p>
      </AnimateIn>

      {/* ── Cards ── */}
      <div className="max-w-6xl mx-auto px-6 pb-10 relative">
        {/* Desktop: step cards with IntersectionObserver */}
        <div className="hidden md:flex relative flex-row gap-0">
          {steps.map((s, i) => {
            const m = STEPS[i]
            return (
              <div key={s.title} className="flex flex-1 flex-row items-stretch">
                <div className="flex-1">
                  <StepCard s={s} m={m} index={i} />
                </div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="flex items-center justify-center px-3 flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-slate-700"/>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile: normal AnimateIn */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((s, i) => {
            const m = STEPS[i]
            return (
              <AnimateIn
                key={s.title}
                delay={i * 120}
                animation={i === 0 ? 'fade-right' : i === 1 ? 'zoom-in' : 'fade-left'}
              >
                <div
                  className={`h-full p-6 rounded-2xl border ${m.border} ${m.bg} ${m.glow}
                    transition-all duration-300 cursor-default group relative overflow-hidden`}
                >
                  <span
                    className={`absolute top-3 right-4 font-heading font-bold text-5xl ${m.text} opacity-10 group-hover:opacity-20 transition-opacity select-none`}
                  >
                    {m.num}
                  </span>
                  <div
                    className={`inline-flex p-3 rounded-xl border ${m.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <m.Icon className={`w-5 h-5 ${m.text}`} />
                  </div>
                  <h3 className="font-heading text-white font-bold text-lg mb-2 group-hover:opacity-90">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className={`inline-block px-2.5 py-1 rounded-lg border ${m.iconBg} ${m.text} text-[10px] font-mono`}>
                    {s.tag}
                  </span>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* Bottom strip */}
        <AnimateIn delay={400} className="mt-10">
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"/>
            <p className="text-sm text-slate-400 text-center">
              {t.how.bottomNote}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
