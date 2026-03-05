'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Badge variant="blue">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Trading con Inteligencia Artificial
        </Badge>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="text-white">Tu agente de trading</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            autónomo e inteligente
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
          <strong className="text-slate-200">ARIA</strong> analiza el mercado, gestiona el riesgo y ejecuta operaciones
          por ti. Sin emociones, sin errores humanos. Solo estrategia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link href="#pricing">
            <Button size="lg">
              Empezar ahora →
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="secondary">
              Ver cómo funciona
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Sin tarjeta para empezar
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Cancela cuando quieras
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Modo paper incluido
          </span>
        </div>
      </div>

      {/* App preview mockup */}
      <div className="mt-20 w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#060d1f]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-slate-500 font-mono">riskeep — ARIA Dashboard</span>
          </div>
          <div className="aspect-[16/8] bg-gradient-to-br from-slate-900 via-[#060d1f] to-slate-900 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 p-8 w-full h-full">
              {/* Mini panel mockup */}
              {['💼 Portfolio', '🎮 Control', '🤖 ARIA'].map((label) => (
                <div key={label} className="rounded-xl bg-white/4 border border-white/8 p-4 flex flex-col gap-2">
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">{label}</div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-white/10 rounded-full w-3/4" />
                    <div className="h-2 bg-white/6 rounded-full w-1/2" />
                    <div className="h-2 bg-blue-500/30 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
