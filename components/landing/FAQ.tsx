'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useT } from '@/lib/i18n/LanguageContext'

export default function FAQ() {
  const t = useT()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">{t.faq.chip}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/3 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/8 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
