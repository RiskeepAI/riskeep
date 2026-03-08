'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useT } from '@/lib/i18n/LanguageContext'

function MiniChart() {
  const points = [
    [0, 60], [8, 52], [16, 55], [24, 42], [32, 38], [40, 44],
    [48, 35], [56, 28], [64, 32], [72, 22], [80, 18], [88, 25],
    [96, 16], [104, 10], [112, 14], [120, 6], [128, 12], [136, 8],
    [144, 4], [152, 9], [160, 2],
  ]
  const fill = points.map(([x, y]) => `${x},${y}`).join(' ') + ` 160,70 0,70`

  return (
    <svg viewBox="0 0 160 70" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill="url(#chartGrad)" />
      <polyline
        points={points.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none" stroke="#22d3ee" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const t = useT()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-600/6 rounded-full blur-[80px]" />
      </div>

      {/* ── Copy ── */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Badge variant="blue">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {t.hero.badge}
        </Badge>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="text-white">{t.hero.headline1}</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            {t.hero.headline2}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
          <strong className="text-slate-200">ARIA</strong> {t.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link href="#pricing">
            <Button size="lg">{t.hero.ctaPrimary}</Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="secondary">{t.hero.ctaSecondary}</Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-slate-500">
          <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {t.hero.trustNoCard}</span>
          <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {t.hero.trustCancel}</span>
          <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {t.hero.trustPaper}</span>
        </div>
      </div>

      {/* ── Mobile mockup ── */}
      <div className="md:hidden mt-14 w-full max-w-sm mx-auto">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#040b1c]">
          {/* Chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-slate-500 font-mono">{t.hero.dashTitle}</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PAPER
            </span>
          </div>
          {/* Body */}
          <div className="p-4 space-y-3 font-mono">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {([
                { label: t.hero.dashCapital,  value: '$2,450',  cls: 'text-white'       },
                { label: t.hero.dashPnlToday, value: '+$84.20', cls: 'text-emerald-400' },
                { label: t.hero.dashWinRate,  value: '64.2%',   cls: 'text-white'       },
                { label: t.hero.dashDrawdown, value: '1.2%',    cls: 'text-yellow-400'  },
              ] as { label: string; value: string; cls: string }[]).map(({ label, value, cls }) => (
                <div key={label} className="bg-white/4 rounded-lg p-3 border border-white/6">
                  <div className="text-slate-500 text-[10px] uppercase mb-1">{label}</div>
                  <div className={`font-bold text-sm ${cls}`}>{value}</div>
                </div>
              ))}
            </div>
            {/* Active position */}
            <div className="bg-white/4 rounded-lg p-3 border border-white/6 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">BTC/USDT</span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-red-500/15 text-red-300 border border-red-500/25">SHORT</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-2">
                <span>{t.hero.dashEntry} <span className="text-slate-300">$97,432</span></span>
                <span className="text-emerald-400 font-bold">+$47.20</span>
              </div>
              <div className="text-[10px] text-slate-500 mb-1">{t.hero.dashAriaConf}</div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
              </div>
            </div>
            {/* ARIA snippet */}
            <div className="bg-white/3 rounded-lg p-3 border border-white/6 text-[10px] text-slate-400 leading-relaxed">
              <span className="text-blue-300 block mb-1">🤖 ARIA — 17:13:48</span>
              {t.hero.dashAriaSnippetMobile}{' '}
              <span className="text-emerald-300">{t.hero.dashAriaOpening}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop mockup ── */}
      <div className="hidden md:block mt-20 w-full max-w-6xl mx-auto relative">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#040b1c]">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500 font-mono">Riskeep — {t.hero.dashTitle}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.dashConnected}
              </span>
              <span className="text-slate-600">17:14:03</span>
            </div>
          </div>

          {/* Nav tabs */}
          <div className="flex items-center gap-1 px-4 pt-2 border-b border-white/6 bg-[#040b1c]">
            {[t.hero.dashTabDash, t.hero.dashTabCandles, t.hero.dashTabMemory, t.hero.dashTabPerf].map((tab, i) => (
              <div
                key={tab}
                className={`px-4 py-2 text-xs font-mono rounded-t-lg transition-colors ${
                  i === 0
                    ? 'bg-blue-500/15 text-blue-300 border-b-2 border-blue-400'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-12 gap-px bg-white/5 text-xs font-mono">

            {/* Portfolio */}
            <div className="col-span-3 bg-[#040b1c] p-4 space-y-3">
              <div className="text-slate-500 uppercase tracking-widest text-[10px]">{t.hero.dashPortfolio}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/4 rounded-lg p-2.5 border border-white/6">
                  <div className="text-slate-500 text-[9px] uppercase">{t.hero.dashCapital}</div>
                  <div className="text-white font-bold text-sm mt-0.5">$2,450</div>
                </div>
                <div className="bg-white/4 rounded-lg p-2.5 border border-white/6">
                  <div className="text-slate-500 text-[9px] uppercase">{t.hero.dashPnlToday}</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">+$84.20</div>
                </div>
                <div className="bg-white/4 rounded-lg p-2.5 border border-white/6">
                  <div className="text-slate-500 text-[9px] uppercase">{t.hero.dashDrawdown}</div>
                  <div className="text-yellow-400 font-bold text-sm mt-0.5">1.2%</div>
                </div>
                <div className="bg-white/4 rounded-lg p-2.5 border border-white/6">
                  <div className="text-slate-500 text-[9px] uppercase">{t.hero.dashPositions}</div>
                  <div className="text-white font-bold text-sm mt-0.5">2 / 3</div>
                </div>
              </div>
              <div className="bg-white/4 rounded-lg p-2.5 border border-white/6 space-y-1.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-500">{t.hero.dashWinRate}</span>
                  <span className="text-emerald-400">64.2%</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-500">{t.hero.dashEpisodes}</span>
                  <span className="text-slate-300">312</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-500">{t.hero.dashPnlTotal}</span>
                  <span className="text-emerald-400">+$1,284</span>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="col-span-5 bg-[#040b1c] p-4 space-y-3">
              <div className="text-slate-500 uppercase tracking-widest text-[10px]">{t.hero.dashMarketAnalysis}</div>
              <div className="flex gap-1">
                {['BTC/USDT', 'ETH/USDT', 'SOL/USDT'].map((sym, i) => (
                  <div key={sym} className={`px-2.5 py-1 rounded-lg text-[9px] ${
                    i === 0 ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-white/4 text-slate-500 border border-white/6'
                  }`}>{sym}</div>
                ))}
              </div>
              <div className="bg-white/4 rounded-xl border border-white/6 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-base">$97,432.50</div>
                    <div className="text-emerald-400 text-[9px]">+2.34% · BTC/USDT</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/15 border border-red-500/30 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-red-300 text-[9px] font-bold">SHORT</span>
                  </div>
                </div>
                <div className="h-14 w-full">
                  <MiniChart />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/4 rounded-lg p-2 border border-white/6">
                  <div className="text-slate-500 text-[9px]">RSI (14)</div>
                  <div className="text-yellow-400 font-bold text-sm">68.4</div>
                  <div className="text-[8px] text-yellow-400/70">{t.hero.dashOverbought}</div>
                </div>
                <div className="bg-white/4 rounded-lg p-2 border border-white/6">
                  <div className="text-slate-500 text-[9px]">{t.hero.dashTrend}</div>
                  <div className="text-red-400 font-bold text-sm">{t.hero.dashBearish}</div>
                  <div className="text-[8px] text-slate-500">EMA 9/21</div>
                </div>
                <div className="bg-white/4 rounded-lg p-2 border border-white/6">
                  <div className="text-slate-500 text-[9px]">{t.hero.dashPattern}</div>
                  <div className="text-white font-bold text-[10px] leading-tight">Three Black Crows</div>
                  <div className="text-[8px] text-emerald-400">{t.hero.dashConfidence}: 85%</div>
                </div>
              </div>
            </div>

            {/* Right: reasoning + positions */}
            <div className="col-span-4 bg-[#040b1c] flex flex-col divide-y divide-white/5">
              <div className="p-4 space-y-2 flex-1">
                <div className="text-slate-500 uppercase tracking-widest text-[10px]">{t.hero.dashReasoning}</div>
                <div className="text-slate-400 text-[9px] leading-relaxed bg-white/3 rounded-lg p-2.5 border border-white/6">
                  <span className="text-blue-300">17:13:48 — BTC/USDT</span>
                  <br />
                  {t.hero.dashAriaSnippet}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-500">{t.hero.dashConfidence}</span>
                    <span className="text-emerald-400">85%</span>
                  </div>
                  <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-slate-500 uppercase tracking-widest text-[10px]">{t.hero.dashOpenPos}</div>
                {[
                  { pair: 'BTC/USDT', side: 'SHORT', entry: '$97,432', sl: '$99,100', tp: '$94,100', pnl: '+$47.20' },
                  { pair: 'ETH/USDT', side: 'SHORT', entry: '$2,680',  sl: '$2,750',  tp: '$2,540',  pnl: '+$37.00' },
                ].map((pos) => (
                  <div key={pos.pair} className="bg-white/4 rounded-lg p-2 border border-white/6 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white text-[10px] font-bold">{pos.pair}</span>
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-500/15 text-red-300 border border-red-500/25">{pos.side}</span>
                      </div>
                      <div className="text-[8px] text-slate-500 mt-0.5">
                        E: {pos.entry} · SL: <span className="text-red-400">{pos.sl}</span> · TP: <span className="text-emerald-400">{pos.tp}</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400">{pos.pnl}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-12 bg-blue-500/10 blur-3xl rounded-full -bottom-6 pointer-events-none" />
      </div>
    </section>
  )
}
