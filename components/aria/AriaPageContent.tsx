'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import {
  Activity, Compass, Filter, Calculator, ShieldCheck, TrendingUp,
  CheckCircle2, FlaskConical, Ban, Brain, Contrast, ArrowRight,
  FileText, Sparkles, Maximize2, X, AlertTriangle, Scale,
} from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import Button from '@/components/ui/Button'
import { useLang } from '@/lib/i18n/LanguageContext'
import { ariaPage } from '@/lib/i18n/ariaPage'
import { BACKTEST } from '@/lib/data/backtest'
import { WordReveal } from '@/components/ui/Motion'
import { HeroShot, StickyToc, CycleTimeline, ExampleTrade, RiskCalc } from '@/components/aria/AriaVisuals'

import panelEs from '@/public/images/aria/panel-es.webp'
import panelEn from '@/public/images/aria/panel-en.webp'
import mercadosEs from '@/public/images/aria/mercados-es.webp'
import mercadosEn from '@/public/images/aria/mercados-en.webp'
import clasesEs from '@/public/images/aria/mercados-clases-es.webp'
import clasesEn from '@/public/images/aria/mercados-clases-en.webp'
import sombraEs from '@/public/images/aria/sombra-es.webp'
import sombraEn from '@/public/images/aria/sombra-en.webp'
import centroEs from '@/public/images/aria/centro-mercados-es.webp'
import centroEn from '@/public/images/aria/centro-mercados-en.webp'
import iaEs from '@/public/images/aria/centro-ia-es.webp'
import iaEn from '@/public/images/aria/centro-ia-en.webp'
import exploradorEs from '@/public/images/aria/explorador-es.webp'
import exploradorEn from '@/public/images/aria/explorador-en.webp'
import diagEs from '@/public/images/aria/diagnostico-es.webp'
import diagEn from '@/public/images/aria/diagnostico-en.webp'
import caminoEs from '@/public/images/aria/recorte-camino-es.webp'
import caminoEn from '@/public/images/aria/recorte-camino-en.webp'
import rIaEs from '@/public/images/aria/recorte-ia-es.webp'
import rIaEn from '@/public/images/aria/recorte-ia-en.webp'
import rSombraEs from '@/public/images/aria/recorte-sombra-es.webp'
import rSombraEn from '@/public/images/aria/recorte-sombra-en.webp'
import rExplEs from '@/public/images/aria/recorte-explorador-es.webp'
import rExplEn from '@/public/images/aria/recorte-explorador-en.webp'

/* Capturas reales de ARIA 9.0 (2880×1720), una por idioma de la interfaz */
const SHOTS: Record<'es' | 'en', Record<string, StaticImageData>> = {
  es: { panel: panelEs, mercados: mercadosEs, 'mercados-clases': clasesEs, sombra: sombraEs,
        'centro-mercados': centroEs, 'centro-ia': iaEs, explorador: exploradorEs, diagnostico: diagEs },
  en: { panel: panelEn, mercados: mercadosEn, 'mercados-clases': clasesEn, sombra: sombraEn,
        'centro-mercados': centroEn, 'centro-ia': iaEn, explorador: exploradorEn, diagnostico: diagEn },
}
/* Recortes ampliados de la zona que explica cada sección (las capturas
   completas solo salen en el recorrido por la app) */
const CROPS: Record<'es' | 'en', Record<'camino' | 'ia' | 'sombra' | 'explorador', StaticImageData>> = {
  es: { camino: caminoEs, ia: rIaEs, sombra: rSombraEs, explorador: rExplEs },
  en: { camino: caminoEn, ia: rIaEn, sombra: rSombraEn, explorador: rExplEn },
}

const CYCLE_ICONS = [Activity, Compass, Filter, Calculator, ShieldCheck, TrendingUp]

/* ── Captura con marco de ventana; al pulsar se amplía ───────────────────── */
function Shot({ src, alt, caption, onOpen, priority = false, label, frame = true }: {
  src: StaticImageData; alt: string; caption?: string; onOpen: (s: StaticImageData, alt: string) => void
  priority?: boolean; label: string; frame?: boolean
}) {
  return (
    <figure className="group">
      <button
        type="button"
        onClick={() => onOpen(src, alt)}
        className="relative block w-full overflow-hidden rounded-xl border border-white/10 bg-[#050a17] shadow-[0_20px_60px_rgba(0,0,0,0.55)] cursor-zoom-in text-left"
        aria-label={`${label}: ${alt}`}
      >
        {frame && (
          <div className="flex items-center gap-1.5 px-3 h-7 border-b border-white/8 bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <span className="ml-3 text-[10px] font-mono text-slate-500 truncate">ARIA</span>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3 h-3" /> {label}
        </span>
      </button>
      {caption && <figcaption className="mt-3 text-xs text-slate-500 leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}

function Lightbox({ shot, onClose, closeLabel }: {
  shot: { src: StaticImageData; alt: string } | null; onClose: () => void; closeLabel: string
}) {
  useEffect(() => {
    if (!shot) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [shot, onClose])

  if (!shot) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={shot.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-8 cursor-zoom-out"
      onClick={onClose}>
      <button type="button" onClick={onClose} aria-label={closeLabel}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer">
        <X className="w-5 h-5" />
      </button>
      <Image src={shot.src} alt={shot.alt} sizes="100vw" quality={90}
        className="max-h-full w-auto max-w-full h-auto rounded-lg border border-white/10 object-contain" />
    </div>
  )
}

function SectionHead({ id, chip, color, title, sub }: {
  id: string; chip: string; color: 'amber' | 'violet' | 'cyan' | 'green'; title: string; sub: string
}) {
  return (
    <AnimateIn className="max-w-3xl mb-10 space-y-3">
      <SectionChip color={color}>{chip}</SectionChip>
      <h2 id={`${id}-title`} className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">{title}</h2>
      <p className="text-slate-400 text-base sm:text-lg leading-relaxed">{sub}</p>
    </AnimateIn>
  )
}

export default function AriaPageContent() {
  const { lang } = useLang()
  const p = ariaPage[lang]
  const shots = SHOTS[lang]
  const crops = CROPS[lang]
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const num = (v: number, d = 2) => v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d })
  const fmtDate = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(locale, { month: 'short', year: 'numeric' })
  const eur = (v: number) => v.toLocaleString(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 })
  const [zoom, setZoom] = useState<{ src: StaticImageData; alt: string } | null>(null)
  const open = (src: StaticImageData, alt: string) => setZoom({ src, alt })
  const closeZoom = useCallback(() => setZoom(null), [])
  const [tab, setTab] = useState(0)
  const cur = p.shots[tab]

  const trendStats = [
    { v: `+${num(BACKTEST.expectancyR)}R`, l: p.trendStats.exp, c: 'text-green-400' },
    { v: num(BACKTEST.profitFactor), l: p.trendStats.pf, c: 'text-amber-400' },
    { v: String(BACKTEST.trades), l: p.trendStats.trades, c: 'text-slate-100' },
    { v: `${num(BACKTEST.winRate, 0)} %`, l: p.trendStats.win, c: 'text-slate-100' },
    { v: `−${num(BACKTEST.maxDrawdownR, 1)}R`, l: p.trendStats.dd, c: 'text-red-400' },
    { v: String(BACKTEST.maxConsecLosses), l: p.trendStats.streak, c: 'text-red-400' },
  ]
  const fillDD = (s: string) => s.replace('{dd}', num(BACKTEST.maxDrawdownR, 1)).replace('{streak}', String(BACKTEST.maxConsecLosses))

  return (
    <main className="relative pt-28 pb-10">
      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn immediate className="text-center max-w-3xl mx-auto space-y-5">
            <SectionChip color="green">{p.chip}</SectionChip>
            <h1 key={lang} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              <WordReveal text={p.title} />
              <br className="hidden sm:block" />
              <WordReveal text={p.titleAccent} baseDelay={p.title.split(' ').length * 80 + 60}
                className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent" />
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">{p.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              <Link href="/register"><Button size="lg">{p.ctaPrimary}</Button></Link>
              <Link href="/novedades"><Button size="lg" variant="secondary"><Sparkles className="w-4 h-4" />{p.ctaNews}</Button></Link>
            </div>
          </AnimateIn>

        </div>
      </section>

      <StickyToc items={p.toc} label={p.tocLabel} className="mt-10" />

      <section className="px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <HeroShot floats={p.floats}>
            <Shot src={shots.panel} alt={p.shots[0].t} onOpen={open} priority label={p.open} />
          </HeroShot>
          <p className="mt-8 text-xs text-slate-500 leading-relaxed text-center max-w-3xl mx-auto">{p.heroCaption} {p.demoNote}</p>
        </div>
      </section>

      {/* ── Ciclo ────────────────────────────────────────────────────────── */}
      <section id="ciclo" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="ciclo" chip={p.cycleChip} color="cyan" title={p.cycleTitle} sub={p.cycleSub} />
          <CycleTimeline steps={p.cycle} icons={CYCLE_ICONS} />
        </div>
      </section>

      {/* ── Estrategias ──────────────────────────────────────────────────── */}
      <section id="estrategias" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="estrategias" chip={p.stratChip} color="green" title={p.stratTitle} sub={p.stratSub} />
          <AnimateIn className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5 sm:p-6">
              <span className="inline-flex p-3 rounded-xl border border-cyan-500/25 bg-cyan-500/10 h-fit w-fit">
                <Scale className="w-5 h-5 text-cyan-300" />
              </span>
              <div>
                <h3 className="font-heading text-white font-semibold text-lg">{p.rTitle}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{p.rBody}</p>
                <p className="text-sm text-cyan-200/80 leading-relaxed mt-2 font-mono">
                  {p.rExample.replace('{r}', eur(3)).replace('{exp}', num(BACKTEST.expectancyR)).replace('{avg}', eur(3 * BACKTEST.expectancyR))}
                </p>
              </div>
            </div>
          </AnimateIn>
          <div className="grid lg:grid-cols-5 gap-5">
            <AnimateIn className="lg:col-span-3">
              <div className="h-full rounded-2xl border border-green-500/25 bg-green-500/[0.04] p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-heading text-2xl font-bold text-white">{p.trendName}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                    <CheckCircle2 className="w-3 h-3" />{p.trendTag}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{p.trendDesc}</p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {trendStats.map(s => (
                    <div key={s.l} className="rounded-xl border border-white/8 bg-black/30 p-3">
                      <p className={`font-mono text-lg sm:text-xl font-semibold ${s.c}`}>{s.v}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs font-mono text-cyan-300/80">
                  {p.trendStats.split.replace('{train}', `+${num(BACKTEST.trainR)}R`).replace('{test}', `+${num(BACKTEST.testR)}R`)}
                </p>
                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                  {p.trendNote.replace('{from}', fmtDate(BACKTEST.from)).replace('{to}', fmtDate(BACKTEST.to)).replace('{symbols}', String(BACKTEST.symbols))}
                </p>
              </div>
            </AnimateIn>
            <div className="lg:col-span-2 flex flex-col gap-4">
              {p.expModes.map((m, i) => (
                <AnimateIn key={m.n} delay={60 + i * 60}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-heading text-white font-semibold">{m.n}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">{p.expTag}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">{m.d}</p>
                    <p className="text-xs font-mono text-amber-300/80 mt-2">Backtest: {m.b}</p>
                  </div>
                </AnimateIn>
              ))}
              <p className="flex gap-2 text-xs text-slate-500 leading-relaxed">
                <FlaskConical className="w-4 h-4 flex-shrink-0 text-amber-400/70" />{p.expNote}
              </p>
            </div>
          </div>

          <AnimateIn className="mt-16">
            <h3 className="font-heading text-2xl font-bold text-white">{p.exTitle}</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">{p.exSub}</p>
            <ExampleTrade labels={p.exLabels} steps={p.exSteps} locale={locale} />
            <p className="mt-5 flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-slate-400 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              {p.exNote.replace('{win}', num(BACKTEST.winRate, 0))}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Mercados ─────────────────────────────────────────────────────── */}
      <section id="mercados" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="mercados" chip={p.mkChip} color="violet" title={p.mkTitle} sub={p.mkSub} />

          <AnimateIn>
            <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.02]">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="text-left text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500 border-b border-white/8">
                    {p.mkCols.map(c => <th key={c} className="px-5 py-3 font-medium">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {p.mkRows.map(([cls, status, measured, rec], i) => (
                    <tr key={cls} className="border-b border-white/5 last:border-0 align-top">
                      <td className="px-5 py-3.5 text-white font-medium whitespace-nowrap">{cls}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                          i === 0 ? 'border-green-500/30 bg-green-500/10 text-green-400'
                          : i === 1 ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                          : 'border-violet-500/30 bg-violet-500/10 text-violet-300'}`}>{status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 leading-relaxed">{measured}</td>
                      <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap">{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">{p.mkTableNote}</p>
          </AnimateIn>

          <AnimateIn className="grid lg:grid-cols-2 gap-8 mt-12 items-start">
            <>
              <ul className="space-y-3">
                {p.mkPoints.map(t => (
                  <li key={t} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />{t}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6">
                <h3 className="font-heading text-white font-semibold text-lg">{p.gradTitle}</h3>
                <p className="text-sm text-slate-400 mt-1.5">{p.gradSub}</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4">
                  {p.gradCriteria.map(([v, l]) => (
                    <div key={l} className="rounded-xl border border-white/8 bg-black/30 p-3 text-center">
                      <p className="font-mono text-sm sm:text-[15px] font-semibold text-green-400 whitespace-nowrap">{v}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">{p.gradNote}</p>
              </div>
            </>
          </AnimateIn>
          <AnimateIn className="mt-10 space-y-10">
            <Shot src={crops.camino} alt={p.gradTitle} caption={p.caminoCaption} onOpen={open} label={p.open} frame={false} />
            <Shot src={crops.explorador} alt={p.shots[6].t} caption={p.explShotCaption} onOpen={open} label={p.open} frame={false} />
          </AnimateIn>
        </div>
      </section>

      {/* ── Riesgo ───────────────────────────────────────────────────────── */}
      <section id="riesgo" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="riesgo" chip={p.riskChip} color="amber" title={p.riskTitle} sub={p.riskSub} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {p.riskLayers.map((l, i) => (
              <AnimateIn key={l.t} delay={(i % 4) * 50}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <span className="text-[11px] font-mono text-amber-400/80">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-white font-semibold mt-1">{l.t}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mt-1.5">{l.d}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="mt-8">
            <RiskCalc locale={locale} expR={BACKTEST.expectancyR} ddR={BACKTEST.maxDrawdownR} streak={BACKTEST.maxConsecLosses}
              t={{ title: p.calcTitle, sub: p.calcSub, capital: p.calcCapital, risk: p.calcRisk, oneR: p.calcOneR,
                   avg: p.calcAvg, streak: p.calcStreak, dd: p.calcDD, note: p.calcNote }} />
          </AnimateIn>
          <AnimateIn>
            <p className="mt-6 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm text-slate-300 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />{fillDD(p.riskHonest)}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── IA ───────────────────────────────────────────────────────────── */}
      <section id="ia" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="ia" chip={p.aiChip} color="violet" title={p.aiTitle} sub={p.aiSub} />
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <AnimateIn className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {p.aiTasks.map(task => (
                  <div key={task.t} className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-4">
                    <h3 className="flex items-center gap-2 font-heading text-white font-semibold">
                      <Brain className="w-4 h-4 text-violet-300" />{task.t}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mt-1.5">{task.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-300 leading-relaxed">{p.aiProviders}</p>
              <ul className="mt-4 space-y-2.5">
                {p.aiPoints.map(t => (
                  <li key={t} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />{t}
                  </li>
                ))}
              </ul>
            </AnimateIn>
            <AnimateIn delay={80} className="lg:col-span-3">
              <Shot src={crops.ia} alt={p.shots[5].t} caption={p.aiShotCaption} onOpen={open} label={p.open} frame={false} />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Sombra ───────────────────────────────────────────────────────── */}
      <section id="sombra" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="sombra" chip={p.shadowChip} color="violet" title={p.shadowTitle} sub={p.shadowSub} />
          <div className="grid sm:grid-cols-2 gap-3">
            {p.shadowPoints.map(t => (
              <AnimateIn key={t}>
                <p className="h-full flex gap-3 rounded-xl border border-violet-500/15 bg-violet-500/[0.03] p-4 text-sm text-slate-300 leading-relaxed">
                  <Contrast className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />{t}
                </p>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="mt-8">
            <Shot src={crops.sombra} alt={p.shots[3].t} caption={p.sombraCaption} onOpen={open} label={p.open} frame={false} />
          </AnimateIn>
        </div>
      </section>

      {/* ── Recorrido por la app ─────────────────────────────────────────── */}
      <section id="app" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <SectionHead id="app" chip={p.appChip} color="cyan" title={p.appTitle} sub={p.appSub} />
          <div role="tablist" aria-label={p.appTitle} className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {p.shots.map((s, i) => (
              <button key={s.k} role="tab" type="button" aria-selected={i === tab} onClick={() => setTab(i)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-sm border transition-colors cursor-pointer ${
                  i === tab ? 'border-cyan-500/40 bg-cyan-500/10 text-white' : 'border-white/8 bg-white/[0.02] text-slate-400 hover:text-white'}`}>
                {s.t}
              </button>
            ))}
          </div>
          <div className="mt-4 grid lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-3" role="tabpanel">
              <Shot key={`${lang}-${cur.k}`} src={shots[cur.k]} alt={cur.t} onOpen={open} label={p.open} />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-white text-xl font-semibold">{cur.t}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cur.d}</p>
              <p className="text-[11px] text-slate-600 pt-2">{p.demoNote}</p>
            </div>
          </div>

          <h3 className="font-heading text-white font-semibold text-lg mt-14 mb-4">{p.toolsTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p.tools.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3.5">
                <p className="text-sm text-white font-medium">{t}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lo que no hace ───────────────────────────────────────────────── */}
      <section id="no-hace" className="px-6 pt-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="mb-8 space-y-3">
            <SectionChip color="amber">{p.notChip}</SectionChip>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{p.notTitle}</h2>
          </AnimateIn>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.nots.map(t => (
              <AnimateIn key={t}>
                <p className="h-full flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-slate-300 leading-relaxed">
                  <Ban className="w-4 h-4 text-red-400/80 flex-shrink-0 mt-0.5" />{t}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-24">
        <AnimateIn className="max-w-4xl mx-auto text-center rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.07] to-transparent px-6 py-12 space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{p.ctaTitle}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{p.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/register"><Button size="lg">{p.ctaPrimary}<ArrowRight className="w-4 h-4" /></Button></Link>
            {process.env.NEXT_PUBLIC_ARIA_GUIDE_URL ? (
              <a href={process.env.NEXT_PUBLIC_ARIA_GUIDE_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary"><FileText className="w-4 h-4" />{p.ctaGuide}</Button>
              </a>
            ) : (
              <Link href="/novedades">
                <Button size="lg" variant="secondary"><Sparkles className="w-4 h-4" />{p.ctaNews}</Button>
              </Link>
            )}
          </div>
          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto pt-4 leading-relaxed">{p.disclaimer}</p>
        </AnimateIn>
      </section>

      <Lightbox shot={zoom} onClose={closeZoom} closeLabel={lang === 'es' ? 'Cerrar' : 'Close'} />
    </main>
  )
}
