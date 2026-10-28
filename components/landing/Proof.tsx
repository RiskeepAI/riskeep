'use client'

import { FlaskConical, Info, ShieldAlert } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import { useLang, useT } from '@/lib/i18n/LanguageContext'
import { BACKTEST, BACKTEST_CURVE } from '@/lib/data/backtest'

/* ── Curva de R acumulado (datos reales del backtest) ─────────────────────
   SVG puro: sin librerías de gráficos en el bundle de la landing. Marca el
   corte entre el periodo de ajuste (60%) y el periodo no visto (40%). */
const W = 640
const H = 240
const PAD = { l: 60, r: 12, t: 16, b: 34 }

function CurveChart({ trainLabel, testLabel, locale }: { trainLabel: string; testLabel: string; locale: string }) {
  const values = BACKTEST_CURVE.map(([, r]) => r)
  const minR = Math.min(0, ...values)
  const maxR = Math.max(...values)
  const n = BACKTEST_CURVE.length
  const x = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r)
  const y = (r: number) => PAD.t + (1 - (r - minR) / (maxR - minR)) * (H - PAD.t - PAD.b)

  const line = BACKTEST_CURVE.map(([, r], i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(r).toFixed(1)}`).join(' ')
  const area = `${line} L${x(n - 1).toFixed(1)},${y(minR).toFixed(1)} L${x(0).toFixed(1)},${y(minR).toFixed(1)} Z`
  const splitIdx = Math.max(0, BACKTEST_CURVE.findIndex(([d]) => d >= BACKTEST.splitDate))
  const sx = x(splitIdx)

  const step = maxR > 60 ? 20 : 10
  const ticks: number[] = []
  for (let v = Math.ceil(minR / step) * step; v <= maxR; v += step) ticks.push(v)

  const fmtDate = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString(locale, { month: 'short', year: '2-digit' })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
      aria-label={`R: ${BACKTEST.totalR} · ${BACKTEST.trades}`}>
      <defs>
        <linearGradient id="proof-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rejilla + eje Y en R */}
      {ticks.map(v => (
        <g key={v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)}
            stroke={v === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.05)'} strokeDasharray={v === 0 ? '0' : '3 4'} />
          <text x={PAD.l - 8} y={y(v) + 4} textAnchor="end" className="fill-slate-500 text-[20px] sm:text-[11px]" fontFamily="var(--font-mono)">
            {v > 0 ? `+${v}` : v}R
          </text>
        </g>
      ))}

      {/* Periodo no visto sombreado */}
      <rect x={sx} y={PAD.t} width={W - PAD.r - sx} height={H - PAD.t - PAD.b} fill="rgba(34,211,238,0.05)" />
      <line x1={sx} x2={sx} y1={PAD.t} y2={H - PAD.b} stroke="rgba(34,211,238,0.5)" strokeDasharray="4 4" />
      {/* En móvil se omiten (se repiten en las cajas de debajo del gráfico) */}
      <text x={sx - 6} y={PAD.t + 12} textAnchor="end" className="fill-slate-400 hidden sm:block" fontSize="10">{trainLabel}</text>
      <text x={sx + 6} y={PAD.t + 12} className="fill-cyan-300 hidden sm:block" fontSize="10">{testLabel}</text>

      <path d={area} fill="url(#proof-area)" />
      <path d={line} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(n - 1)} cy={y(values[n - 1])} r="3.5" fill="#22C55E" />

      {/* Eje X: inicio, corte y final */}
      {[0, splitIdx, n - 1].map((i, k) => (
        <text key={k} x={x(i)} y={H - 8} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'}
          className="fill-slate-500 text-[20px] sm:text-[11px]" fontFamily="var(--font-mono)">
          {fmtDate(BACKTEST_CURVE[i][0])}
        </text>
      ))}
    </svg>
  )
}

export default function Proof() {
  const t = useT()
  const { lang } = useLang()
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const num = (v: number, d = 2) => v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d })
  const fmtDate = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(locale, { month: 'short', year: 'numeric' })

  const fill = (s: string) => s
    .replace('{trades}', String(BACKTEST.trades))
    .replace('{symbols}', String(BACKTEST.symbols))
    .replace('{from}', fmtDate(BACKTEST.from))
    .replace('{to}', fmtDate(BACKTEST.to))
    .replace('{dd}', num(BACKTEST.maxDrawdownR, 0))

  const metrics = [
    { v: `+${num(BACKTEST.expectancyR)}R`, l: t.proof.mExpectancy, sub: '', c: 'text-green-400' },
    { v: num(BACKTEST.profitFactor),       l: t.proof.mProfitFactor, sub: '', c: 'text-amber-400' },
    { v: String(BACKTEST.trades),          l: t.proof.mTrades, sub: `${BACKTEST.symbols} ${lang === 'es' ? 'mercados' : 'markets'}`, c: 'text-slate-100' },
    { v: `−${num(BACKTEST.maxDrawdownR, 0)}R`, l: t.proof.mDrawdown, sub: '', c: 'text-red-400' },
  ]

  return (
    <section id="transparency" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-green-500/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <AnimateIn className="text-center mb-10 space-y-3">
          <SectionChip color="green">{t.proof.chip}</SectionChip>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">{t.proof.title}</h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">{t.proof.subtitle}</p>
        </AnimateIn>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Gráfico */}
          <AnimateIn delay={60} animation="scale-up" className="lg:col-span-3">
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6">
              <h3 className="font-heading text-white font-semibold text-base">{t.proof.chartTitle}</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">{fill(t.proof.chartSub)}</p>
              <CurveChart trainLabel={t.proof.trainLabel} testLabel={t.proof.testLabel} locale={locale} />
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                <div className="rounded-lg border border-white/8 bg-black/20 px-3 py-2 flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="text-slate-500 text-[11px]">{t.proof.trainLabel}</span>
                  <span className="text-slate-200">+{num(BACKTEST.trainR)}R</span>
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="text-cyan-300/80 text-[11px]">{t.proof.testLabel}</span>
                  <span className="text-cyan-200">+{num(BACKTEST.testR)}R</span>
                </div>
              </div>
              <p className="flex gap-2 text-xs text-slate-500 leading-relaxed mt-4">
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500" />
                <span><strong className="text-slate-300 font-medium">{t.proof.rExplainTitle}</strong> {t.proof.rExplain}</span>
              </p>
            </div>
          </AnimateIn>

          {/* Métricas + lo que debes saber */}
          <AnimateIn delay={120} className="lg:col-span-2 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              {metrics.map(m => (
                <div key={m.l} className="rounded-2xl border border-white/8 bg-[#040e1f] p-4">
                  <div className={`font-heading font-bold text-2xl tabular-nums ${m.c}`}>{m.v}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-snug">{m.l}</div>
                  {m.sub && <div className="text-[10px] font-mono text-slate-600 mt-0.5">{m.sub}</div>}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex-1">
              <p className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
                <FlaskConical className="w-4 h-4 text-green-400" />{t.proof.honestTitle}
              </p>
              <ul className="space-y-2.5">
                {t.proof.honest.map(h => (
                  <li key={h} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />{fill(h)}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={160} className="mt-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] px-5 py-4">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed flex-1">{t.proof.disclaimer}</p>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">{t.proof.reproduce}</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
