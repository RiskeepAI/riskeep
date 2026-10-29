'use client'

/* Piezas interactivas de la página /aria: captura del Panel en 3D, índice
   fijo con la sección activa, ciclo con línea de progreso, operación de
   ejemplo dibujada y calculadora de riesgo. Todas respetan
   prefers-reduced-motion (sin movimiento, todo visible). */

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ShieldCheck, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tilt3D } from '@/components/ui/Motion'

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** 0 → 1 según avanza un elemento por la pantalla (rAF, pasivo). */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, calc: (r: DOMRect, vh: number) => number) {
  const [p, setP] = useState(0)
  const calcRef = useRef(calc)
  calcRef.current = calc
  useEffect(() => {
    if (reducedMotion()) { setP(1); return }
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (el) setP(Math.min(1, Math.max(0, calcRef.current(el.getBoundingClientRect(), window.innerHeight))))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ref])
  return p
}

/* ── Captura principal: inclinada al cargar, se endereza al hacer scroll ── */
export function HeroShot({ children, floats }: { children: React.ReactNode; floats: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref, (r, vh) => (vh * 0.95 - r.top) / (vh * 0.75))
  const icons: LucideIcon[] = [ShieldCheck, CheckCircle2, Activity]
  const pos = [
    'left-0 -translate-x-1/3 top-[18%]',
    'right-0 translate-x-1/4 top-[44%]',
    'left-[12%] -bottom-5',
  ]
  return (
    <div ref={ref} className="relative" style={{ perspective: '1600px' }}>
      <div className="absolute inset-x-[8%] top-[10%] bottom-0 bg-green-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div
        style={{
          transform: `rotateX(${(1 - p) * 16}deg) scale(${0.92 + p * 0.08})`,
          transformOrigin: 'center top',
          transition: 'transform 0.1s linear',
        }}
      >
        <Tilt3D>{children}</Tilt3D>
      </div>
      {floats.map((f, i) => {
        const Icon = icons[i % icons.length]
        return (
          <div key={f} className={`hidden md:block absolute ${pos[i]} pointer-events-none`}>
            <div className="anim-fade-up" style={{ animationDelay: `${700 + i * 250}ms`, opacity: 0 }}>
              <div className="animate-float flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/12 bg-[#0b1324]/90 backdrop-blur-md shadow-xl shadow-black/50 text-sm text-slate-200 whitespace-nowrap"
                style={{ animationDelay: `${i * 0.8}s` }}>
                <Icon className={`w-4 h-4 ${i === 1 ? 'text-green-400' : i === 2 ? 'text-amber-400' : 'text-cyan-300'}`} />
                {f}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Índice fijo bajo el menú, con la sección visible resaltada ─────────── */
export function StickyToc({ items, label, className = '' }: { items: ReadonlyArray<readonly [string, string]>; label: string; className?: string }) {
  const [active, setActive] = useState('')
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }, { rootMargin: '-40% 0px -55% 0px' })
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [items])

  // En móvil la barra se desplaza sola para que se vea la sección activa
  useEffect(() => {
    const c = box.current
    const el = c?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (c && el) c.scrollTo({ left: el.offsetLeft - c.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <nav aria-label={label} className={`sticky top-16 z-40 border-y border-white/6 bg-black/80 backdrop-blur-lg ${className}`}>
      <div ref={box} className="max-w-6xl mx-auto px-6 flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(([id, text]) => (
          <a key={id} href={`#${id}`} data-id={id} aria-current={active === id ? 'true' : undefined}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
              active === id ? 'border-green-500/40 bg-green-500/10 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>
            {text}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ── Ciclo: línea que se llena al bajar y pasos que se encienden ────────── */
export function CycleTimeline({ steps, icons }: { steps: { t: string; d: string }[]; icons: LucideIcon[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref, (r, vh) => (vh * 0.65 - r.top) / r.height)
  const n = steps.length
  return (
    <div ref={ref} className="relative">
      {/* Raíl: a la izquierda en móvil, en el centro en escritorio */}
      <div className="absolute top-4 bottom-4 left-[15px] lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-white/8 rounded-full overflow-hidden">
        <div className="w-full bg-gradient-to-b from-cyan-400 to-green-400 rounded-full" style={{ height: `${p * 100}%` }} />
      </div>
      <ol className="space-y-6 lg:space-y-0">
        {steps.map((s, i) => {
          const Icon = icons[i]
          const on = p >= (i / (n - 1)) * 0.92
          const right = i % 2 === 1
          return (
            <li key={s.t} className={`grid grid-cols-[32px_1fr] lg:grid-cols-[1fr_56px_1fr] gap-x-4 lg:gap-x-0 items-center ${i ? 'lg:-mt-10' : ''}`}>
              <span className={`col-start-1 row-start-1 lg:col-start-2 justify-self-center z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                on ? 'border-cyan-400/70 bg-[#06202a] text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.35)]' : 'border-white/15 bg-[#0A0F1E] text-slate-600'}`}>
                <Icon className="w-4 h-4" />
              </span>
              <div className={`col-start-2 row-start-1 ${right ? 'lg:col-start-3 lg:pl-8' : 'lg:col-start-1 lg:pr-8 lg:text-right'}`}>
                <div className={`rounded-2xl border p-5 transition-all duration-500 ${
                  on ? 'border-white/12 bg-white/[0.035] opacity-100 translate-y-0' : 'border-white/6 bg-white/[0.015] opacity-50 translate-y-1'}`}>
                  <span className="text-[11px] font-mono text-slate-500">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-white font-semibold mt-0.5">{s.t}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mt-1.5">{s.d}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ── Operación de ejemplo: precio, stop inicial y stop que sigue ────────────
   Ilustrativa: ganadora media (+11,8 %) y pérdida media (−3,8 %) del backtest,
   así que el resultado (+3,1R) cuadra con esas cifras. */
const EX_PRICE = [100, 99.2, 100.8, 101.5, 100.6, 102.4, 103.9, 103.1, 105.2, 106.8, 106.1, 108.3, 109.9, 109.2,
  111.6, 113.4, 112.7, 115.1, 116.8, 116.2, 118.0, 117.1, 115.9, 116.6, 114.8, 113.5, 112.9, 111.8]
const EX_STOP0 = 96.2
const EX_TRAIL_GAP = 6.2              // 4 × ATR
const EX_TRAIL = EX_PRICE.map((_, i) => Math.max(EX_STOP0, Math.max(...EX_PRICE.slice(0, i + 1)) - EX_TRAIL_GAP))

export function ExampleTrade({ labels, steps, locale }: {
  labels: { price: string; entry: string; stop: string; trail: string; exit: string }
  steps: ReadonlyArray<readonly [string, string]>; locale: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    if (reducedMotion()) { setDrawn(true); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const W = 640, H = 270, PL = 44, PR = 92, PT = 16, PB = 22
  const lo = 94, hi = 120, n = EX_PRICE.length
  const x = (i: number) => PL + (i / (n - 1)) * (W - PL - PR)
  const y = (v: number) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB)
  const line = EX_PRICE.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const trail = EX_TRAIL.map((v, i) => `${i ? `L${x(i).toFixed(1)},${y(EX_TRAIL[i - 1]).toFixed(1)} L` : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const f = (v: number) => v.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const draw = (delay: number, dur = 1.6): React.CSSProperties => ({
    strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: `stroke-dashoffset ${dur}s ease ${delay}s`,
  })
  const fade = (delay: number): React.CSSProperties => ({ opacity: drawn ? 1 : 0, transition: `opacity 0.5s ease ${delay}s` })
  const last = n - 1

  return (
    <div ref={ref} className="grid lg:grid-cols-5 gap-6 items-center">
      <div className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={steps.map(s => s[1]).join(' ')}>
          {[96, 100, 104, 108, 112, 116, 120].map(v => (
            <g key={v}>
              <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
              <text x={PL - 8} y={y(v) + 5} textAnchor="end" fontFamily="var(--font-mono)" className="fill-slate-600 text-[18px] sm:text-[11px]">{v}</text>
            </g>
          ))}
          {/* Zona de riesgo (1R) entre la entrada y el stop inicial */}
          <rect x={x(0)} y={y(100)} width={W - PL - PR} height={y(EX_STOP0) - y(100)} fill="rgba(248,113,113,0.07)" style={fade(0.2)} />
          <line x1={x(0)} x2={W - PR} y1={y(100)} y2={y(100)} stroke="rgba(148,163,184,0.45)" strokeDasharray="4 4" style={fade(0.1)} />
          <line x1={x(0)} x2={W - PR} y1={y(EX_STOP0)} y2={y(EX_STOP0)} stroke="rgba(248,113,113,0.7)" strokeDasharray="4 4" style={fade(0.3)} />
          <text x={W - PR + 6} y={y(100) + 4} fontSize="11" className="fill-slate-400 hidden sm:block" style={fade(0.1)}>{labels.entry} 100</text>
          <text x={W - PR + 6} y={y(EX_STOP0) + 4} fontSize="11" className="fill-red-400 hidden sm:block" style={fade(0.3)}>{labels.stop}</text>
          <text x={x(0) + 6} y={(y(100) + y(EX_STOP0)) / 2 + 5} fontFamily="var(--font-mono)" className="fill-red-300/80 text-[18px] sm:text-[11px]" style={fade(0.4)}>1R</text>

          <path d={trail} pathLength={1} fill="none" stroke="#F59E0B" strokeWidth="1.6" strokeDasharray="1" style={draw(0.9, 2)} />
          <path d={line} pathLength={1} fill="none" stroke="#22C55E" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" style={draw(0.5, 2)} />

          <circle cx={x(0)} cy={y(100)} r="4.5" fill="#22C55E" style={fade(0.4)} />
          <circle cx={x(last)} cy={y(EX_TRAIL[last])} r="5" fill="#F59E0B" stroke="#0A0F1E" strokeWidth="2" style={fade(2.6)} />
          <text x={x(last) + 9} y={y(EX_TRAIL[last]) - 14} fontSize="12" fontWeight="600" className="fill-amber-300 hidden sm:block" style={fade(2.7)}>
            {labels.exit} {f(EX_TRAIL[last])}
          </text>
          <text x={x(last) + 9} y={y(EX_TRAIL[last]) + 4} fontWeight="700" fontFamily="var(--font-mono)" className="fill-green-400 text-[22px] sm:text-[13px]" style={fade(2.8)}>
            +{f((EX_TRAIL[last] - 100) / (100 - EX_STOP0))}R
          </text>
          <text x={x(14)} y={y(EX_TRAIL[14]) + 16} fontSize="11" className="fill-amber-400/90 hidden sm:block" style={fade(1.8)}>{labels.trail}</text>
        </svg>
        <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-green-500 rounded" />{labels.price}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400 rounded" />{labels.stop}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 rounded" />{labels.trail}</span>
        </div>
      </div>
      <ol className="lg:col-span-2 space-y-4">
        {steps.map(([t, d], i) => (
          <li key={t} className="flex gap-3" style={fade(0.4 + i * 0.6)}>
            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono flex items-center justify-center">{i + 1}</span>
            <div>
              <p className="text-white font-medium text-sm">{t}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ── Calculadora: qué suponen las cifras del backtest en tu cuenta ──────── */
export function RiskCalc({ t, locale, expR, ddR, streak }: {
  t: { title: string; sub: string; capital: string; risk: string; oneR: string; avg: string; streak: string; dd: string; note: string }
  locale: string; expR: number; ddR: number; streak: number
}) {
  const [capital, setCapital] = useState(1000)
  const [risk, setRisk] = useState(0.3)
  const oneR = capital * risk / 100
  const eur = (v: number) => v.toLocaleString(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: Math.abs(v) < 100 ? 2 : 0 })
  const pct = (v: number) => `${v.toLocaleString(locale, { maximumFractionDigits: 1 })} %`
  const rows = [
    { l: t.oneR, v: eur(oneR), c: 'text-white' },
    { l: t.avg.replace('{exp}', expR.toLocaleString(locale, { maximumFractionDigits: 2 })), v: `+${eur(oneR * expR)}`, c: 'text-green-400' },
    { l: t.streak.replace('{n}', String(streak)), v: `−${eur(oneR * streak)}`, sub: pct(risk * streak), c: 'text-red-400' },
    { l: t.dd.replace('{dd}', ddR.toLocaleString(locale, { maximumFractionDigits: 1 })), v: `−${eur(oneR * ddR)}`, sub: pct(risk * ddR), c: 'text-red-400' },
  ]
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-5 sm:p-6">
      <h3 className="font-heading text-white font-semibold text-lg">{t.title}</h3>
      <p className="text-sm text-slate-400 mt-1">{t.sub}</p>
      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <label className="block">
          <span className="flex justify-between text-sm text-slate-300"><span>{t.capital}</span><b className="font-mono text-white">{eur(capital)}</b></span>
          <input type="range" min={200} max={20000} step={100} value={capital} onChange={e => setCapital(+e.target.value)}
            className="w-full mt-2 accent-amber-400 cursor-pointer" />
        </label>
        <label className="block">
          <span className="flex justify-between text-sm text-slate-300"><span>{t.risk}</span><b className="font-mono text-white">{pct(risk)}</b></span>
          <input type="range" min={0.1} max={1} step={0.05} value={risk} onChange={e => setRisk(+e.target.value)}
            className="w-full mt-2 accent-amber-400 cursor-pointer" />
        </label>
      </div>
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {rows.map(r => (
          <div key={r.l} className="flex flex-col-reverse justify-end rounded-xl border border-white/8 bg-black/30 p-3">
            <dt className="text-[11px] text-slate-500 mt-0.5 leading-snug">{r.l}</dt>
            <dd className={`font-mono text-lg font-semibold ${r.c}`}>{r.v}{r.sub && <span className="text-xs text-slate-500 font-normal ml-1.5">{r.sub}</span>}</dd>
          </div>
        ))}
      </dl>
      <p className="text-[11px] text-slate-500 mt-3">{t.note}</p>
    </div>
  )
}
