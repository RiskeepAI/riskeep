'use client'

import Link from 'next/link'
import { ArrowRight, Compass, RefreshCw } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import Button from '@/components/ui/Button'
import { useLang } from '@/lib/i18n/LanguageContext'
import { novedades, type ChangeKind } from '@/lib/i18n/novedades'

const KIND_STYLE: Record<ChangeKind, string> = {
  new:      'border-green-500/30 bg-green-500/10 text-green-400',
  improved: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  fixed:    'border-amber-500/30 bg-amber-500/10 text-amber-400',
  security: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  research: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
}

export default function NovedadesContent() {
  const { lang } = useLang()
  const n = novedades[lang]
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const fmtDate = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="relative pt-28 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateIn immediate className="text-center space-y-4 mb-14">
          <SectionChip color="green">{n.chip}</SectionChip>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">{n.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">{n.subtitle}</p>
          <p className="inline-flex items-center gap-2 text-xs text-slate-500">
            <RefreshCw className="w-3.5 h-3.5" />{n.updateNote}
          </p>
        </AnimateIn>

        {/* Línea de tiempo de versiones */}
        <ol className="relative border-l border-white/10 ml-2 sm:ml-3 space-y-14">
          {n.releases.map((r, ri) => (
            <li key={r.version} id={`v${r.version}`} className="pl-6 sm:pl-10 scroll-mt-24">
              <span className={`absolute -left-[7px] mt-2 w-3.5 h-3.5 rounded-full border-2 ${
                ri === 0 ? 'border-green-400 bg-green-500/40 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'border-slate-500 bg-[#0A0F1E]'}`} />
              <AnimateIn immediate={ri === 0}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">ARIA {r.version}</h2>
                  {ri === 0 && (
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">{n.latest}</span>
                  )}
                  <time dateTime={r.date} className="text-sm font-mono text-slate-500">{fmtDate(r.date)}</time>
                </div>
                <p className="font-heading text-lg text-slate-200 mt-2">{r.title}</p>
                <p className="text-sm text-slate-400 leading-relaxed mt-1.5">{r.summary}</p>

                <div className="mt-6 space-y-6">
                  {r.groups.map(g => (
                    <div key={g.name}>
                      <h3 className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">{g.name}</h3>
                      <ul className="space-y-2.5">
                        {g.items.map(([kind, text]) => (
                          <li key={text} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                            <span className={`flex-shrink-0 w-[5.5rem] text-center self-start mt-0.5 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${KIND_STYLE[kind]}`}>
                              {n.kinds[kind]}
                            </span>
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </li>
          ))}
        </ol>

        {/* Lo próximo */}
        <AnimateIn className="mt-20 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          <SectionChip color="violet">{n.roadmapChip}</SectionChip>
          <h2 className="font-heading text-2xl font-bold text-white mt-4">{n.roadmapTitle}</h2>
          <p className="text-sm text-slate-500 mt-1">{n.roadmapSub}</p>
          <ul className="mt-5 space-y-3">
            {n.roadmap.map(t => (
              <li key={t} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                <Compass className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />{t}
              </li>
            ))}
          </ul>
        </AnimateIn>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/aria"><Button size="lg" variant="secondary">{n.ctaAria}<ArrowRight className="w-4 h-4" /></Button></Link>
          <Link href="/register"><Button size="lg">{n.ctaDemo}</Button></Link>
        </div>
      </div>
    </main>
  )
}
