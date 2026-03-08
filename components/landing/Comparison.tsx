'use client'

import { Check, X } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Comparison() {
  const t = useT()

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">

        <AnimateIn className="text-center mb-14 space-y-4">
          <div className="text-sm font-mono uppercase tracking-widest label-gradient">{t.comparison.chip}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {t.comparison.title}
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            {t.comparison.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02]">

            {/* Header */}
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/8">
              <div className="px-5 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                {t.comparison.colFeature}
              </div>
              <div className="px-5 py-4 text-center border-l border-white/8">
                <span className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  🤖 {t.comparison.colAria}
                </span>
              </div>
              <div className="px-5 py-4 text-center border-l border-white/8">
                <span className="text-sm font-bold text-slate-400 flex items-center justify-center gap-2">
                  👤 {t.comparison.colManual}
                </span>
              </div>
            </div>

            {/* Rows */}
            {t.comparison.rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 border-b border-white/6 last:border-0 transition-colors hover:bg-white/3 ${
                  i % 2 === 0 ? '' : 'bg-white/[0.015]'
                }`}
              >
                <div className="px-5 py-4 text-sm text-slate-400 flex items-center">
                  {row.feature}
                </div>

                {/* ARIA column */}
                <div className="px-5 py-4 border-l border-white/8 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-200">{row.aria}</span>
                </div>

                {/* Manual column */}
                <div className="px-5 py-4 border-l border-white/8 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-sm text-slate-500">{row.manual}</span>
                </div>
              </div>
            ))}

          </div>
        </AnimateIn>

        {/* Bottom CTA */}
        <AnimateIn delay={200} className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-400 hover:to-cyan-400 transition-all duration-300"
          >
            {t.comparison.ctaButton}
          </a>
          <p className="mt-3 text-xs text-slate-600">{t.comparison.ctaSub}</p>
        </AnimateIn>

      </div>
    </section>
  )
}
