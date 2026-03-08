'use client'

import AnimateIn from '@/components/ui/AnimateIn'
import { useT } from '@/lib/i18n/LanguageContext'

export default function HowItWorks() {
  const t = useT()

  const steps = [
    {
      step:        '01',
      title:       t.how.step1title,
      description: t.how.step1desc,
      detail:      t.how.step1badge,
      icon:        '🔐',
      color:       'from-blue-500 to-blue-600',
      glow:        'shadow-blue-500/20',
    },
    {
      step:        '02',
      title:       t.how.step2title,
      description: t.how.step2desc,
      detail:      t.how.step2badge,
      icon:        '⚙️',
      color:       'from-cyan-500 to-cyan-600',
      glow:        'shadow-cyan-500/20',
    },
    {
      step:        '03',
      title:       t.how.step3title,
      description: t.how.step3desc,
      detail:      t.how.step3badge,
      icon:        '🤖',
      color:       'from-violet-500 to-violet-600',
      glow:        'shadow-violet-500/20',
    },
  ]

  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        <AnimateIn className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono uppercase tracking-widest label-gradient">{t.how.chip}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{t.how.title}</h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            {t.how.subtitle}
          </p>
        </AnimateIn>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-violet-500/30" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimateIn key={s.step} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center group">
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color}
                    flex items-center justify-center shadow-lg ${s.glow} mb-6
                    group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <span className="text-3xl">{s.icon}</span>
                    <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#020810] border border-white/15 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-400 font-mono">{s.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.description}</p>
                  <span className="text-xs text-slate-600 font-mono">{s.detail}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
