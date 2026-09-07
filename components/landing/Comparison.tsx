'use client'

import { Check, X, Bot, User } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Comparison() {
  const t = useT()

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">

        <AnimateIn className="text-center mb-10 space-y-3">
          <SectionChip color="amber">{t.comparison.chip}</SectionChip>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            {t.comparison.title}
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            {t.comparison.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn delay={60} animation="scale-up">
          <div className="rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02]">

            {/* Header */}
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/8">
              <div className="px-5 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                {t.comparison.colFeature}
              </div>
              <div className="px-5 py-4 text-center border-l border-white/8">
                <span className="text-sm font-bold text-amber-300 flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  {t.comparison.colAria}
                </span>
              </div>
              <div className="px-5 py-4 text-center border-l border-white/8">
                <span className="text-sm font-bold text-slate-400 flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  {t.comparison.colManual}
                </span>
              </div>
            </div>

            {/* Rows */}
            {t.comparison.rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 border-b border-white/6 last:border-0 transition-colors hover:bg-white/[0.025] ${
                  i % 2 === 0 ? '' : 'bg-white/[0.015]'
                }`}
              >
                <div className="px-5 py-4 text-sm text-slate-400 flex items-center">
                  {row.feature}
                </div>
                <div className="px-5 py-4 border-l border-white/8 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm text-slate-200">{row.aria}</span>
                </div>
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

        <AnimateIn delay={120} className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#0A0F1E] font-semibold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:from-amber-400 hover:to-yellow-300 transition-all duration-300 cursor-pointer"
          >
            {t.comparison.ctaButton}
          </a>
          <p className="mt-3 text-xs text-slate-600">{t.comparison.ctaSub}</p>
        </AnimateIn>

      </div>
    </section>
  )
}
