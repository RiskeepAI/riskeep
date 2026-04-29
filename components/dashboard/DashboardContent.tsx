'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Download, CreditCard, LogOut, CheckCircle, XCircle,
  Lock, FileText, Monitor, Apple, Zap, Calendar,
  ChevronRight, Sparkles, Activity, TrendingUp, TrendingDown,
  Cpu, BarChart2, Shield, ArrowUpRight,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import UpgradeButton from './UpgradeButton'
import CancelButton from './CancelButton'
import { useT } from '@/lib/i18n/LanguageContext'

/* ════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */

function useMount(delay = 0) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return visible
}

function useCounter(target: number, duration = 1400, startDelay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame: number
    const begin = performance.now() + startDelay
    const tick = (now: number) => {
      if (now < begin) { frame = requestAnimationFrame(tick); return }
      const p = Math.min((now - begin) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, startDelay])
  return value
}

/* ════════════════════════════════════════════════════════════
   ANIMATED CARD WRAPPER
═══════════════════════════════════════════════════════════ */

function AnimCard({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const v = useMount(delay)
  return (
    <div className={`transition-all duration-700 ease-out ${
      v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    } ${className}`}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SVG BACKGROUND GRID
═══════════════════════════════════════════════════════════ */

function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]"/>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-[160px]"/>
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-cyan-500/3 rounded-full blur-[120px]"/>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   PULSING STATUS DOT
═══════════════════════════════════════════════════════════ */

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60"/>}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${active ? 'bg-green-500' : 'bg-slate-600'}`}/>
    </span>
  )
}

/* ════════════════════════════════════════════════════════════
   SELF-DRAWING CHART
═══════════════════════════════════════════════════════════ */

const CHART_PTS = [
  [0,78],[18,70],[36,74],[54,60],[72,65],[90,52],
  [108,57],[126,42],[144,48],[162,36],[180,40],
  [198,28],[216,33],[234,20],[252,15],[270,22],[288,10],[300,14]
]

function ARIAChart() {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 700); return () => clearTimeout(t) }, [])

  const line = CHART_PTS.map(([x,y], i) => `${i===0?'M':'L'} ${x} ${y}`).join(' ')
  const area = line + ' L 300 100 L 0 100 Z'

  return (
    <div className="relative h-[72px] w-full overflow-hidden">
      <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#22D3EE"/>
          </linearGradient>
          <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0"/>
            <stop offset="20%" stopColor="#8B5CF6" stopOpacity="1"/>
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="1"/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaFill)"/>
        <path
          d={line}
          fill="none"
          stroke="url(#lineFade)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 700,
            strokeDashoffset: drawn ? 0 : 700,
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {drawn && (
          <>
            <circle cx="300" cy="14" r="3.5" fill="#22D3EE" opacity="0.9"/>
            <circle cx="300" cy="14" r="7" fill="#22D3EE" opacity="0" className="animate-ping" style={{ transformOrigin: '300px 14px' }}/>
          </>
        )}
        {/* Grid lines */}
        {[25, 50, 75].map(y => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.5"/>
        ))}
      </svg>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   ARIA ACTIVITY PANEL
═══════════════════════════════════════════════════════════ */

interface Signal { pair: string; action: 'BUY' | 'SELL'; pnl: string; time: string; up: boolean }

const DEMO_SIGNALS: Signal[] = [
  { pair: 'BTC/USDT', action: 'BUY',  pnl: '+2.34%', time: '2m',  up: true  },
  { pair: 'ETH/USDT', action: 'SELL', pnl: '+1.87%', time: '5m',  up: true  },
  { pair: 'SOL/USDT', action: 'BUY',  pnl: '-0.41%', time: '9m',  up: false },
  { pair: 'BNB/USDT', action: 'SELL', pnl: '+3.12%', time: '14m', up: true  },
]

function relTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hrs  = Math.floor(mins / 60)
  const days = Math.floor(hrs / 24)
  if (days > 0)  return `${days}d`
  if (hrs  > 0)  return `${hrs}h`
  return `${Math.max(1, mins)}m`
}

function ARIAActivityPanel({ isActive }: { isActive: boolean }) {
  const [activeRow, setActiveRow] = useState(0)
  const [scanKey,   setScanKey]   = useState(0)
  const [signals,   setSignals]   = useState<Signal[]>(DEMO_SIGNALS)
  const [hasReal,   setHasReal]   = useState(false)
  const [stats, setStats] = useState<{ winRate: number | null; total: number; pnl7d: number }>({
    winRate: null, total: 0, pnl7d: 0,
  })

  /* Fetch real episodes */
  useEffect(() => {
    fetch('/api/episodes')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.episodes?.length) return
        const mapped: Signal[] = data.episodes.map((e: {
          symbol: string; action: string; status: string; pnl_pct: number | null; closed_at: string
        }) => ({
          pair:   e.symbol,
          action: e.action as 'BUY' | 'SELL',
          pnl:    e.pnl_pct != null
            ? `${e.pnl_pct >= 0 ? '+' : ''}${e.pnl_pct.toFixed(2)}%`
            : '—',
          time:   e.closed_at ? relTime(e.closed_at) : '—',
          up:     e.status === 'winner',
        }))
        setSignals(mapped)
        setHasReal(true)
        if (data.stats) setStats(data.stats)
      })
      .catch(() => {/* keep demo */})
  }, [])

  /* Row highlight cycle */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveRow(p => (p + 1) % signals.length)
      setScanKey(p => p + 1)
    }, 3200)
    return () => clearInterval(id)
  }, [signals.length])

  return (
    <div className="relative p-5 rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-[#0D1829] to-[#0A1220] overflow-hidden">
      {/* Scan line */}
      <div
        key={scanKey}
        className="animate-scan absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5 text-cyan-400"/>
          ARIA · {hasReal ? 'Mis operaciones' : 'Actividad'}
        </div>
        <div className="flex items-center gap-1.5">
          {isActive ? (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"/>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"/>
              </span>
              EN VIVO
            </div>
          ) : (
            <span className="text-[10px] font-mono text-slate-600 bg-slate-800/60 px-2 py-0.5 rounded-full border border-white/6">
              {hasReal ? 'REAL' : 'DEMO'}
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <ARIAChart />

      {/* Signals */}
      <div className="mt-3 space-y-1">
        {signals.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-500 ${
              i === activeRow
                ? 'bg-white/[0.05] border-white/10 shadow-sm'
                : 'border-transparent bg-transparent'
            }`}
          >
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
              s.action === 'BUY'
                ? 'bg-green-500/15 text-green-500 border border-green-500/20'
                : 'bg-red-500/15    text-red-400    border border-red-500/20'
            }`}>{s.action}</span>

            <span className="text-xs text-slate-300 font-mono flex-1">{s.pair}</span>

            <span className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${s.up ? 'text-green-500' : 'text-red-400'}`}>
              {s.up ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
              {s.pnl}
            </span>

            <span className="text-[10px] text-slate-600 font-mono w-8 text-right">{s.time}</span>
          </div>
        ))}

        {hasReal && signals.length === 0 && (
          <p className="text-center text-xs text-slate-600 py-4">
            Sin operaciones registradas aún
          </p>
        )}
      </div>

      {/* Stats strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]">
        {[
          {
            label: 'Win Rate',
            value: hasReal && stats.winRate != null ? `${stats.winRate}%` : '—',
            color: 'text-green-500',
            icon:  BarChart2,
          },
          {
            label: 'Operaciones',
            value: hasReal ? `${stats.total}` : '—',
            color: 'text-cyan-400',
            icon:  Activity,
          },
          {
            label: 'PnL total',
            value: hasReal ? `${stats.pnl7d >= 0 ? '+' : ''}${stats.pnl7d.toFixed(1)}%` : '—',
            color: stats.pnl7d >= 0 ? 'text-amber-400' : 'text-red-400',
            icon:  TrendingUp,
          },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1 py-1">
            <Icon className={`w-3 h-3 ${color} opacity-60`}/>
            <div className={`text-sm font-mono font-bold tabular-nums ${color}`}>{value}</div>
            <div className="text-[9px] text-slate-600 uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>

      {!hasReal && (
        <p className="text-center text-[9px] text-slate-700 mt-2">
          Los datos reales aparecerán cuando ARIA registre operaciones
        </p>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   PLAN PROGRESS BAR
═══════════════════════════════════════════════════════════ */

function PlanProgress({ periodEnd, plan }: { periodEnd: string | null; plan: string | null }) {
  const [pct, setPct]     = useState(0)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (!periodEnd) return
    // periodEnd may arrive as a formatted string — try ISO first, then skip
    const end = new Date(periodEnd).getTime()
    if (isNaN(end)) return
    setValid(true)
    const totalMs  = (plan === 'yearly' ? 365 : 30) * 86400000
    const start    = end - totalMs
    const computed = Math.min(100, Math.max(0, ((Date.now() - start) / totalMs) * 100))
    const timer = setTimeout(() => setPct(computed), 400)
    return () => clearTimeout(timer)
  }, [periodEnd, plan])

  if (!valid) return null

  const remaining = 100 - Math.round(pct)

  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex justify-between text-[11px] text-[#6b768b] font-mono">
        <span>Periodo activo</span>
        <span className="text-amber-400">{remaining}% restante</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-[1200ms] ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */

interface Props {
  name:              string
  email:             string
  isActive:          boolean
  showWelcome:       boolean
  plan:              string | null
  periodEnd:         string | null
  cancelAtPeriodEnd: boolean
  downloadWin:       string
  downloadMac:       string
  downloadGuide:     string
  ariaVersion:       string
}

export default function DashboardContent({
  name, email, isActive, showWelcome,
  plan, periodEnd, cancelAtPeriodEnd,
  downloadWin, downloadMac, downloadGuide, ariaVersion,
}: Props) {
  const t       = useT()
  const initial = name?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="min-h-screen bg-black px-5 py-10 relative overflow-hidden">
      <GridBackground/>

      <div className="max-w-xl mx-auto space-y-4">

        {/* ── HEADER ──────────────────────────────────────────── */}
        <AnimCard delay={0} className="flex items-center justify-between pb-1">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/images/logo-r.png" alt="Riskeep" width={36} height={36} className="rounded-xl animate-glow-pulse group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20" />
            <span className="font-heading text-white font-bold text-lg tracking-tight">Riskeep</span>
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors cursor-pointer group">
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"/>
              {t.dashboard.logout}
            </button>
          </form>
        </AnimCard>

        {/* ── WELCOME BANNER ──────────────────────────────────── */}
        {showWelcome && (
          <AnimCard delay={60}>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0"/>
              <span>{t.dashboard.welcomeBanner.replace('{name}', name)}</span>
              <Sparkles className="w-4 h-4 ml-auto text-green-500/50"/>
            </div>
          </AnimCard>
        )}

        {/* ── USER CARD ────────────────────────────────────────── */}
        <AnimCard delay={100}>
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-sm hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
            {/* shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer rounded-2xl pointer-events-none"/>

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg transition-shadow ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30'
                      : 'bg-gradient-to-br from-slate-600 to-slate-700'
                  }`}>
                    {initial}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <StatusDot active={isActive}/>
                  </div>
                </div>

                <div>
                  <div className="font-heading text-white font-semibold">{name}</div>
                  <div className="text-slate-500 text-sm">{email}</div>
                </div>
              </div>

              {isActive
                ? <Badge variant="green" className="flex-shrink-0"><Zap className="w-3 h-3"/>{t.dashboard.liveMode}</Badge>
                : <Badge variant="yellow" className="flex-shrink-0">{t.dashboard.demoMode}</Badge>
              }
            </div>

            {/* Mini system status row */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.06] grid grid-cols-3 gap-2">
              {[
                { icon: Shield,   label: 'Protección', value: 'Activa',   color: 'text-green-500' },
                { icon: Cpu,      label: 'Motor ARIA',  value: 'v2.4.1',  color: 'text-cyan-400'    },
                { icon: BarChart2, label: 'Modo',       value: isActive ? 'Live' : 'Demo', color: isActive ? 'text-blue-400' : 'text-slate-500' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex flex-col items-center gap-0.5 py-1">
                  <Icon className={`w-3.5 h-3.5 ${color} mb-0.5`}/>
                  <div className={`text-xs font-mono font-semibold ${color}`}>{value}</div>
                  <div className="text-[9px] text-slate-600 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimCard>

        {/* ── SUBSCRIPTION CARD ───────────────────────────────── */}
        <AnimCard delay={180}>
          <div className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
            isActive
              ? 'border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/3'
              : 'border-white/8 bg-white/[0.025]'
          }`}>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-4">
              <CreditCard className="w-3.5 h-3.5"/>
              {t.dashboard.subscriptionLabel}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive
                    ? 'bg-green-500/15 border border-green-500/30'
                    : 'bg-red-500/15 border border-red-500/25'
                }`}>
                  {isActive
                    ? <CheckCircle className="w-4 h-4 text-green-500"/>
                    : <XCircle     className="w-4 h-4 text-red-400"/>
                  }
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isActive ? 'text-[#dbe6fe]' : 'text-red-400'}`}>
                    {isActive
                      ? t.dashboard.planActive.replace('{plan}', plan === 'yearly' ? t.dashboard.planYearly : t.dashboard.planMonthly)
                      : t.dashboard.noSubscription}
                  </div>
                  {periodEnd && (
                    <div className="flex items-center gap-1.5 text-xs text-[#6b768b] mt-0.5">
                      <Calendar className="w-3 h-3"/>
                      {cancelAtPeriodEnd ? t.dashboard.cancelsOn : t.dashboard.renewsOn} {periodEnd}
                    </div>
                  )}
                </div>
              </div>
              {isActive && (
                <Badge variant={plan === 'yearly' ? 'gold' : 'cyan'}>
                  {plan === 'yearly' ? t.dashboard.planYearly : t.dashboard.planMonthly}
                </Badge>
              )}
            </div>

            {isActive && periodEnd && <PlanProgress periodEnd={periodEnd} plan={plan}/>}

            {isActive && !cancelAtPeriodEnd && (
              <div className="pt-4 mt-4 border-t border-white/6">
                <CancelButton/>
              </div>
            )}
            {isActive && cancelAtPeriodEnd && (
              <div className="pt-4 mt-4 border-t border-white/6">
                <p className="text-xs text-amber-500/80 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5"/>
                  {t.dashboard.cancelPendingNotice.replace('{date}', periodEnd ?? '')}
                </p>
              </div>
            )}
          </div>
        </AnimCard>

        {/* ── ARIA ACTIVITY PANEL ──────────────────────────────── */}
        <AnimCard delay={260}>
          <ARIAActivityPanel isActive={isActive}/>
        </AnimCard>

        {/* ── UPGRADE CTA (inactive users) ────────────────────── */}
        {!isActive && (
          <AnimCard delay={320}>
            <div className="relative p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/6 to-violet-500/4 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/8  rounded-full blur-3xl pointer-events-none"/>
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-violet-500/8 rounded-full blur-3xl pointer-events-none"/>
              <div className="relative flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-amber-400"/>
                </div>
                <div>
                  <div className="font-heading text-white font-semibold">{t.dashboard.upgradePaperTitle}</div>
                  <div className="text-slate-400 text-sm mt-1 leading-relaxed">{t.dashboard.upgradePaperDesc}</div>
                </div>
              </div>
              <div className="relative grid grid-cols-2 gap-3">
                <UpgradeButton plan="monthly" label={t.dashboard.upgradeMonthly}/>
                <UpgradeButton plan="yearly"  label={t.dashboard.upgradeYearly} recommended/>
              </div>
            </div>
          </AnimCard>
        )}

        {/* ── DOWNLOADS ────────────────────────────────────────── */}
        <AnimCard delay={340}>
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
              <Download className="w-3.5 h-3.5"/>
              {t.dashboard.downloadLabel}
            </div>

            <p className="text-slate-400 text-sm">
              {isActive ? t.dashboard.downloadDescActive : t.dashboard.downloadDescDemo}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { href: downloadWin, Icon: Monitor, label: t.dashboard.downloadWin, color: 'text-blue-400',   ring: 'hover:border-blue-500/30  hover:bg-blue-500/5'  },
                { href: downloadMac, Icon: Apple,   label: t.dashboard.downloadMac, color: 'text-slate-300', ring: 'hover:border-white/20     hover:bg-white/5'     },
              ].map(({ href, Icon, label, color, ring }) => (
                <a
                  key={label}
                  href={href}
                  download
                  className={`group flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-white/8 bg-white/[0.02] ${ring} transition-all duration-200`}
                >
                  <Icon className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform duration-200`}/>
                  <span className="text-xs text-white font-medium">{label}</span>
                  <span className="text-[10px] text-slate-600 font-mono">v{ariaVersion}</span>
                </a>
              ))}
            </div>

            {downloadGuide && (
              <a
                href={downloadGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/15 bg-amber-500/4 hover:bg-amber-500/8 hover:border-amber-500/28 transition-all duration-200 group"
              >
                <FileText className="w-4 h-4 text-amber-400 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white group-hover:text-amber-300 transition-colors">{t.dashboard.downloadGuide}</div>
                  <div className="text-xs text-slate-500 truncate">{t.dashboard.downloadGuideDesc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500/40 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"/>
              </a>
            )}
          </div>
        </AnimCard>

      </div>
    </div>
  )
}
