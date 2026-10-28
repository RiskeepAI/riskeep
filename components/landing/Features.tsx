'use client'

import { Brain, ShieldCheck, TrendingUp, FlaskConical, Bell, KeyRound } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionChip from '@/components/ui/SectionChip'
import { useT } from '@/lib/i18n/LanguageContext'
import { BACKTEST, BACKTEST_CURVE } from '@/lib/data/backtest'

/* Mini curva REAL del backtest (R acumulado) para la tarjeta de estrategia */
function BacktestMiniCurve() {
  const vals = BACKTEST_CURVE.map(([, r]) => r)
  const min = Math.min(0, ...vals), max = Math.max(...vals), n = vals.length
  const pts = vals.map((r, i) => `${((i / (n - 1)) * 160).toFixed(1)},${(46 - ((r - min) / (max - min)) * 42).toFixed(1)}`)
  return (
    <svg viewBox="0 0 160 50" className="w-full h-14" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="bt-mini" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`${pts.join(' ')} 160,50 0,50`} fill="url(#bt-mini)"/>
      <polyline points={pts.join(' ')} fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
    </svg>
  )
}

/* Mini sparkline for the large card */
function Sparkline({ color }: { color: string }) {
  const pts = [[0,40],[20,28],[40,32],[60,18],[80,22],[100,10],[120,14],[140,4],[160,8]]
  return (
    <svg viewBox="0 0 160 50" className="w-full h-12 mt-3" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={pts.map(([x,y])=>`${x},${y}`).join(' ')+' 160,50 0,50'} fill={`url(#sg-${color})`}/>
      <polyline points={pts.map(([x,y])=>`${x},${y}`).join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Features() {
  const t = useT()
  const items = t.features.items
  const winPct  = BACKTEST.avgWinPct
  const lossPct = Math.abs(BACKTEST.avgLossPct)

  return (
    <section id="features" className="py-14 px-6 relative overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-violet-500/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        <AnimateIn className="text-center mb-10 space-y-3">
          <SectionChip color="violet">{t.features.chip}</SectionChip>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            {t.features.title}
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            {t.features.subtitle}
          </p>
        </AnimateIn>

        {/* ── Bento Grid ── */}
        <AnimateIn delay={80} animation="scale-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[180px_180px_180px] auto-rows-[minmax(180px,auto)] gap-4">

            {/* Card 0 — large 2×2: AI Analysis */}
            <div className="animated-border-card sm:col-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 group relative p-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-violet-500/3 overflow-hidden cursor-default hover:border-violet-500/40 hover:shadow-[0_8px_60px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-500/18 transition-colors"/>
              <div className="relative h-full flex flex-col">
                <div className="inline-flex p-3 rounded-xl bg-violet-500/15 border border-violet-500/25 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-violet-400"/>
                </div>
                <h3 className="font-heading text-white font-bold text-xl mb-2">{items[0]?.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{items[0]?.description}</p>
                <Sparkline color="#8B5CF6"/>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-green-500"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>LIVE</span>
                  <span className="text-slate-600">64.2% win rate · 312 ops</span>
                </div>
              </div>
            </div>

            {/* Card 1 — wide 2×1: Risk Management */}
            <div className="sm:col-span-2 lg:col-start-3 lg:row-start-1 group relative p-5 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/8 to-green-500/3 overflow-hidden cursor-default hover:border-green-500/35 hover:shadow-[0_8px_40px_rgba(16,185,129,0.12)] transition-all duration-300">
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-green-500/8 rounded-full blur-2xl pointer-events-none"/>
              <div className="relative flex items-start gap-4 h-full">
                <div className="inline-flex p-3 rounded-xl bg-green-500/12 border border-green-500/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-5 h-5 text-green-500"/>
                </div>
                <div>
                  <h3 className="font-heading text-white font-bold text-base mb-1.5">{items[1]?.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{items[1]?.description}</p>
                  <div className="flex gap-2 mt-3">
                    {[t.features.tagSL, t.features.tagTP, t.features.tagDD].map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-mono">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — tall 1×2: Deja correr las ganadoras (datos reales del backtest) */}
            <div className="lg:col-start-3 lg:row-start-2 lg:row-span-2 group relative p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-amber-500/3 overflow-hidden cursor-default hover:border-amber-500/35 hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)] transition-all duration-300">
              <div className="absolute -top-6 -left-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"/>
              <div className="relative h-full flex flex-col">
                <div className="inline-flex p-3 rounded-xl bg-amber-500/12 border border-amber-500/20 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-amber-400"/>
                </div>
                <h3 className="font-heading text-white font-bold text-base mb-2">{items[2]?.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{items[2]?.description}</p>
                <div className="mt-4 space-y-2.5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t.features.latencyLabel}</div>
                  {[
                    { l: t.features.winLabel,  v: `+${winPct.toFixed(1)}%`,  w: 100, c: 'from-green-500 to-green-300', tc: 'text-green-400' },
                    { l: t.features.lossLabel, v: `−${lossPct.toFixed(1)}%`, w: (lossPct / winPct) * 100, c: 'from-red-500 to-red-400', tc: 'text-red-400' },
                  ].map(b => (
                    <div key={b.l}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-500">{b.l}</span>
                        <span className={`font-mono font-semibold ${b.tc}`}>{b.v}</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${b.c} rounded-full`} style={{ width: `${b.w}%` }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — tall 1×2: Estrategia medida (curva real del backtest) */}
            <div className="lg:col-start-4 lg:row-start-2 lg:row-span-2 flex flex-col group relative p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/6 overflow-hidden cursor-default hover:border-cyan-500/35 hover:shadow-[0_4px_30px_rgba(34,211,238,0.10)] transition-all duration-300">
              <div className="inline-flex w-fit p-2.5 rounded-xl bg-cyan-500/12 border border-cyan-500/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                <FlaskConical className="w-5 h-5 text-cyan-400"/>
              </div>
              <h3 className="font-heading text-white font-bold text-sm mb-1.5">{items[3]?.title}</h3>
              <p className="text-slate-400 text-[13px] leading-relaxed flex-1">{items[3]?.description}</p>
              <BacktestMiniCurve />
              <a href="#transparency" className="mt-1 text-[10px] font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors">
                {t.features.curveCaption.replace('{trades}', String(BACKTEST.trades))} →
              </a>
            </div>

            {/* Card 4 — 1×1: Alertas */}
            <div className="lg:col-start-1 lg:row-start-3 group relative p-5 rounded-2xl border border-blue-500/20 bg-blue-500/6 overflow-hidden cursor-default hover:border-blue-500/35 hover:shadow-[0_4px_30px_rgba(59,130,246,0.10)] transition-all duration-300">
              <div className="inline-flex p-2.5 rounded-xl bg-blue-500/12 border border-blue-500/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-5 h-5 text-blue-400"/>
              </div>
              <h3 className="font-heading text-white font-bold text-sm mb-1.5">{items[4]?.title}</h3>
              <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-3">{items[4]?.description}</p>
              {/* Notification pulse */}
              <div className="flex items-center gap-2 mt-4">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-blue-400"/>
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-400 animate-ping opacity-50"/>
                </div>
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider">{t.features.alertActive}</span>
              </div>
            </div>

            {/* Card 5 — 1×1: Tus claves */}
            <div className="lg:col-start-2 lg:row-start-3 group relative p-5 rounded-2xl border border-violet-500/20 bg-violet-500/6 overflow-hidden cursor-default hover:border-violet-500/35 hover:shadow-[0_4px_30px_rgba(139,92,246,0.10)] transition-all duration-300">
              <div className="inline-flex p-2.5 rounded-xl bg-violet-500/12 border border-violet-500/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                <KeyRound className="w-5 h-5 text-violet-400"/>
              </div>
              <h3 className="font-heading text-white font-bold text-sm mb-1.5">{items[5]?.title}</h3>
              <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-3">{items[5]?.description}</p>
            </div>

          </div>
        </AnimateIn>

        {/* Franja de cifras */}
        <AnimateIn delay={160} className="mt-4">
          <div className="grid grid-cols-1">
            <div className="flex items-center justify-around p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
              {[
                { v: '0 €',   l: t.features.statTraders  },
                { v: '64%',   l: t.features.statWinRate  },
                { v: '24/7',  l: t.features.statActive   },
                { v: '0.5s',  l: t.features.statLatency  },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="font-heading font-bold text-xl text-amber-400">{v}</div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
