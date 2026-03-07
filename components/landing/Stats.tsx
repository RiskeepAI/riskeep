'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  target: number
  prefix: string
  suffix: string
  label: string
  duration: number
  decimals?: number
}

const STATS: Stat[] = [
  { prefix: '',   target: 15000, suffix: '+',  label: 'Operaciones analizadas', duration: 1800 },
  { prefix: '',   target: 64,    suffix: '%',  label: 'Win rate promedio',       duration: 1400 },
  { prefix: '< ', target: 0.5,  suffix: 's',  label: 'Tiempo de ejecución',    duration: 1000, decimals: 1 },
  { prefix: '',   target: 24,   suffix: '/7',  label: 'Monitorización activa',  duration: 900  },
]

function useCountUp(target: number, duration: number, started: boolean, decimals = 0) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration, decimals])

  return current
}

function AnimatedNumber({ stat, started, index }: { stat: Stat; started: boolean; index: number }) {
  const count = useCountUp(stat.target, stat.duration, started, stat.decimals)

  const display =
    stat.target === 15000
      ? count.toLocaleString('es-ES')
      : stat.decimals
      ? count.toFixed(stat.decimals)
      : count.toString()

  return (
    <div
      className="space-y-1 text-center"
      style={{
        opacity:    started ? 1 : 0,
        transform:  started ? 'none' : 'translateY(14px)',
        transition: `opacity 0.6s ease ${index * 130}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 130}ms`,
      }}
    >
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tabular-nums">
        {stat.prefix}{display}{stat.suffix}
      </div>
      <div className="text-sm text-slate-500">{stat.label}</div>
    </div>
  )
}

export default function Stats() {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-14 px-6 border-y border-white/6 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <AnimatedNumber key={stat.label} stat={stat} started={started} index={i} />
        ))}
      </div>
    </section>
  )
}
