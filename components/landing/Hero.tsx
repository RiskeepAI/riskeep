'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, TrendingUp, Sparkles, Play,
  LayoutDashboard, Brain, Activity, Newspaper, Terminal, Settings,
  CandlestickChart as CandlestickChartIcon,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import AnimateIn from '@/components/ui/AnimateIn'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import { useT } from '@/lib/i18n/LanguageContext'

/* ── Word reveal ──────────────────────────────────────────── */
function WordReveal({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.wr-word')
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        words.forEach((w, i) => {
          setTimeout(() => {
            (w as HTMLElement).style.cssText =
              'opacity:1;transform:translateY(0)'
          }, baseDelay + i * 80)
        })
        obs.unobserve(el)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [baseDelay])
  return (
    <span ref={ref}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="wr-word inline-block mr-[0.25em]"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

/* ── Tilt 3D ──────────────────────────────────────────────── */
function Tilt3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(8px)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

/* ── Typing effect ────────────────────────────────────────── */
function TypingWord({ words }: { words: string[] }) {
  const [idx, setIdx]           = useState(0)
  const [text, setText]         = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[idx] ?? ''
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIdx(i => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }, deleting ? 40 : 70)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])

  return (
    <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
      {text}
      <span className="animate-pulse text-amber-400">|</span>
    </span>
  )
}

/* ── ARIA Dashboard preview ───────────────────────────────────────────────
   Réplica estilizada del dashboard real de ARIA — sin cromo de ventana de
   navegador (la app real no vive en una pestaña de browser con semáforo),
   con el topbar real (logo + subtítulo + ticker + LIVE), el sidebar real
   de iconos con etiqueta (la navegación vive SOLO ahí, no hay una segunda
   barra de tabs), y los tres paneles reales de la pestaña Dashboard:
   Portfolio, Análisis de Mercado (RSI/Tendencia/Patrón — el gráfico vive
   en la pestaña Velas, no aquí) y Posiciones Abiertas. */
const RAIL_ITEMS = [
  { Icon: LayoutDashboard,     label: 'Panel' },
  { Icon: CandlestickChartIcon, label: 'Velas' },
  { Icon: Brain,               label: 'Memoria' },
  { Icon: Activity,            label: 'Stats' },
  { Icon: Newspaper,           label: 'Noticias' },
  { Icon: Terminal,            label: 'Logs' },
]

const MINI_TICKER = [
  { s: 'BTC',  v: '97,432', c: 'text-red-400',   d: '−2.34%' },
  { s: 'ETH',  v: '3,612',  c: 'text-green-500', d: '+0.22%' },
  { s: 'XRP',  v: '1.40',   c: 'text-green-500', d: '+0.26%' },
  { s: 'LTC',  v: '55.84',  c: 'text-red-400',   d: '−0.30%' },
  { s: 'BNB',  v: '743.43', c: 'text-green-500', d: '+0.13%' },
  { s: 'DOGE', v: '0.09',   c: 'text-red-400',   d: '−1.02%' },
  { s: 'ADA',  v: '0.22',   c: 'text-green-500', d: '+0.78%' },
  { s: 'LINK', v: '13.29',  c: 'text-red-400',   d: '−0.31%' },
  { s: 'BCH',  v: '256.01', c: 'text-green-500', d: '+0.24%' },
  { s: 'SOL',  v: '142.35', c: 'text-red-400',   d: '−0.55%' },
]

const OPEN_POSITIONS = [
  { symbol: 'BTC/USDT', side: 'SHORT' as const, entry: '$97,432' },
  { symbol: 'ETH/USDT', side: 'LONG'  as const, entry: '$3,594'  },
]

/* Título de panel — punto verde + texto, idéntico en todos los paneles reales de ARIA */
function PanelLabel({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5 text-slate-500 text-[7px] uppercase tracking-wider">
      <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0"/>
      {text}
    </span>
  )
}

function DashboardPreview({ t, showRail = true }: { t: ReturnType<typeof useT>; showRail?: boolean }) {
  return (
    <div className="relative w-full">
      {/* Glows — verde como acento principal de ARIA, violeta de apoyo */}
      <div className="absolute -inset-6 bg-green-500/12 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-6 bg-violet-600/8  rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 bg-[#040e1f] flex"
        style={{ border: '1px solid rgba(34,197,94,0.18)' }}>

        {/* Ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-green-500/60 to-transparent"/>

        {/* ── Sidebar — la navegación real vive solo aquí ── */}
        {showRail && (
          <div className="flex flex-col items-center py-4 border-r border-white/6 bg-black/25 flex-shrink-0" style={{ width: '48px' }}>
            <div className="w-6 h-6 rounded-md bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4 flex-shrink-0">
              <span className="font-heading font-bold text-[9px]" style={{ color: '#22C55E' }}>A</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              {RAIL_ITEMS.map(({ Icon, label }, i) => (
                <div key={label} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-green-400' : 'text-slate-700'}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="text-[5px] font-bold uppercase tracking-wide leading-none">{label}</span>
                </div>
              ))}
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-700 mb-3" strokeWidth={2} />
            <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-1">PAPER</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* ── Topbar real — logo, subtítulo, ticker (marquee, todos los pares) y estado LIVE ── */}
          <div className="flex items-center gap-3 px-3.5 py-3 border-b border-white/6 bg-white/[0.015]">
            <div className="flex items-baseline gap-1.5 flex-shrink-0">
              <span className="text-white font-heading font-bold text-[11px] tracking-tight">ARIA</span>
              <span className="hidden sm:inline text-slate-700 text-[5px] font-bold uppercase tracking-wider">
                Autonomous Risk Intelligence Agent
              </span>
            </div>
            {showRail && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-4 text-[6.5px] font-mono whitespace-nowrap animate-ticker-fast" style={{ width: 'max-content' }}>
                  {[...MINI_TICKER, ...MINI_TICKER].map(({ s, v, c, d }, i) => (
                    <span key={i} className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-slate-600">{s}</span>
                      <span className="text-slate-300 font-semibold">{v}</span>
                      <span className={c}>{d}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <span className="flex items-center gap-1 text-[7.5px] font-bold font-mono ml-auto flex-shrink-0" style={{ color: '#22C55E' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }}/>
              LIVE
            </span>
          </div>

          {/* ── Body: Portfolio · Análisis + Razonamiento · Posiciones ── */}
          <div className="p-4 grid grid-cols-12 gap-3 font-mono">

            {/* ── Col 1: Portfolio + Control ── */}
            <div className="col-span-3 space-y-3">
              <div className="rounded-lg p-3 border border-green-500/15 bg-green-500/[0.05]">
                <div className="flex items-center justify-between mb-2">
                  <PanelLabel text={t.hero.dashPortfolio} />
                </div>
                <span className="flex items-center gap-1 text-[5.5px] font-bold mb-1.5" style={{ color: '#22C55E' }}>
                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"/>{t.hero.dashActive}
                </span>
                <div className="font-bold text-white text-[14px] leading-none">$2,450</div>
                <div className="flex flex-col gap-1 mt-2.5 text-[6px]">
                  <span className="text-green-500 font-semibold">▲ +$84.20</span>
                  <span className="text-slate-600">{t.hero.dashDrawdown} −1.2%</span>
                </div>
              </div>

              <div className="rounded-lg p-3 border border-white/5 bg-white/[0.025] text-[6px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Exchange</span>
                  <span className="text-slate-300 font-semibold">Bitget</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.hero.dashWinRate}</span>
                  <span className="text-amber-400 font-semibold">64.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.hero.dashEpisodes}</span>
                  <span className="text-slate-300 font-semibold">312</span>
                </div>
              </div>

              {/* Control — mismos botones del panel real */}
              <div className="rounded-lg p-3 border border-white/5 bg-white/[0.025] space-y-1.5">
                <div className="w-full text-center text-[6px] font-bold uppercase tracking-wide py-1.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30">
                  ■ Detener Sistema
                </div>
                <div className="w-full text-center text-[6px] font-bold uppercase tracking-wide py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  Ciclo Manual
                </div>
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="flex-1 text-center text-[5px] font-bold py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">PAPER</span>
                  <span className="flex-1 text-center text-[5px] font-bold py-1 rounded bg-green-500/15 text-green-400 border border-green-500/25">AUTO</span>
                </div>
              </div>
            </div>

            {/* ── Col 2: Análisis de Mercado + Razonamiento (pestaña Dashboard real — sin gráfico, eso vive en "Velas") ── */}
            <div className="col-span-6 space-y-3">
              <div className="rounded-lg border border-white/6 bg-white/[0.02] p-3">
                <PanelLabel text={t.hero.dashMarketAnalysis} />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-white font-bold text-[12px]">BTC/USDT</span>
                  <span className="text-[6.5px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">SHORT</span>
                </div>
                <div className="text-[6.5px] text-slate-600 mt-1">{t.hero.dashPrice} <span className="text-slate-300">$97,432</span></div>

                {/* Indicadores: RSI / Tendencia / Patrón — como en el dashboard real */}
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  <div className="rounded-md border border-white/6 bg-black/20 p-1.5 text-center">
                    <div className="text-slate-600 text-[5px] uppercase tracking-wider mb-1">RSI</div>
                    <div className="text-white font-bold text-[10px]">68.4</div>
                    <div className="text-amber-400 text-[5px] mt-1 truncate">{t.hero.dashOverbought}</div>
                  </div>
                  <div className="rounded-md border border-white/6 bg-black/20 p-1.5 text-center">
                    <div className="text-slate-600 text-[5px] uppercase tracking-wider mb-1">{t.hero.dashTrend}</div>
                    <div className="text-red-400 font-bold text-[8.5px] mt-1.5">{t.hero.dashBearish}</div>
                  </div>
                  <div className="rounded-md border border-white/6 bg-black/20 p-1.5 text-center">
                    <div className="text-slate-600 text-[5px] uppercase tracking-wider mb-1">{t.hero.dashPattern}</div>
                    <div className="text-white font-bold text-[7px] mt-1.5 leading-tight">3 Black Crows</div>
                  </div>
                </div>

                {/* Confianza — barra ámbar, como en la app real */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-500 text-[6.5px]">{t.hero.dashConfidence}</span>
                    <span className="text-amber-400 text-[7.5px] font-bold">85%</span>
                  </div>
                  <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full animate-shimmer"/>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-violet-500/25 bg-violet-500/5 p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <PanelLabel text={t.hero.dashReasoning} />
                  <span className="text-[6px] px-1.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300">17:13:48</span>
                </div>
                <div className="text-slate-500 text-[6.5px] leading-relaxed line-clamp-2">
                  {t.hero.dashAriaSnippetMobile}
                </div>
              </div>
            </div>

            {/* ── Col 3: Posiciones Abiertas (varias) ── */}
            <div className="col-span-3">
              <div className="mb-2"><PanelLabel text={t.hero.dashOpenPos} /></div>
              <div className="space-y-2.5">
                {OPEN_POSITIONS.map(({ symbol, side, entry }) => {
                  const isShort = side === 'SHORT'
                  return (
                    <div
                      key={symbol}
                      className={`rounded-lg p-3 border ${isShort ? 'border-red-500/20 bg-red-500/5' : 'border-green-500/20 bg-green-500/5'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[8.5px] text-white font-bold">{symbol}</span>
                      </div>
                      <span className={`inline-block mt-1.5 text-[6px] px-1.5 py-0.5 rounded border ${isShort ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                        {side}
                      </span>
                      <div className="text-[6px] text-slate-600 mt-2">{t.hero.dashEntry}</div>
                      <div className="text-slate-400 text-[7.5px]">{entry}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const t = useT()

  // Number of words in headlinePrefix to stagger badge after them
  const wordCount = t.hero.headlinePrefix.split(' ').length
  const badgeDelay = wordCount * 80 + 200

  return (
    <section className="relative min-h-screen px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{ backgroundImage: "url('/images/hero-bg-v3.jpg')" }}
        />
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/60 via-[#0A0F1E]/40 to-[#0A0F1E]/80" />
        <ParticleCanvas className="opacity-40" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[160px]"/>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/7 rounded-full blur-[140px]"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/4 rounded-full blur-[120px]"/>
      </div>

      {/* Sticky content container */}
      <div className="sticky top-0 min-h-screen flex items-center pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <AnimateIn animation="fade-right" className="space-y-8 text-center lg:text-left">
            <div
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${badgeDelay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${badgeDelay}ms`,
              }}
              className="badge-reveal inline-block"
            >
              <Badge variant="gold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
                {t.hero.badge}
              </Badge>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white block">
                <WordReveal text={t.hero.headlinePrefix} baseDelay={0} />
              </span>
              <span className="block mt-1 min-h-[1.2em]">
                <TypingWord words={t.hero.typingWords} />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              <strong className="text-slate-200">ARIA</strong> {t.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="#pricing">
                <Button size="lg">{t.hero.ctaPrimary}</Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="secondary">
                  <Play className="w-4 h-4"/>
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            <p className="text-[10px] text-[#3d4f6e] text-center lg:text-left">
              El trading de criptomonedas implica riesgo. No inviertas más de lo que puedas permitirte perder.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {[
                { icon: ShieldCheck, text: t.hero.trustNoCard, color: 'text-green-500' },
                { icon: TrendingUp,  text: t.hero.trustCancel, color: 'text-green-500' },
                { icon: Sparkles,    text: t.hero.trustPaper,  color: 'text-amber-400' },
              ].map(({ icon: Icon, text, color }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-sm text-[#6b768b] hover:text-[#dbe6fe] transition-colors">
                  <Icon className={`w-3.5 h-3.5 ${color} flex-shrink-0`}/>
                  {text}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/8 bg-white/3 text-xs text-[#6b768b]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                Compatible con <span className="text-[#dbe6fe] font-medium">Bitget</span>
              </span>
            </div>
          </AnimateIn>

          {/* ── Right: Dashboard preview ── */}
          <AnimateIn animation="fade-left" delay={150} className="hidden lg:block">
            <Tilt3D>
              <DashboardPreview t={t} />
            </Tilt3D>
          </AnimateIn>

          {/* Mobile preview (simpler) */}
          <AnimateIn animation="zoom-in" delay={100} className="lg:hidden w-full max-w-sm mx-auto">
            <DashboardPreview t={t} showRail={false} />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
