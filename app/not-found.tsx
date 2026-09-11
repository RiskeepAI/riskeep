import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, LayoutDashboard, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020810] relative overflow-hidden flex items-center justify-center px-6">
      {/* Orbs ambientales — mismo lenguaje visual que el resto del sitio */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[90px]" />
      </div>

      <div className="relative text-center max-w-md">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-10 group">
          <Image
            src="/images/logo-r.png"
            alt="Riskeep"
            width={36}
            height={36}
            className="rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/25"
          />
          <span className="text-white font-bold text-lg tracking-tight">Riskeep</span>
        </Link>

        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          404
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Página no encontrada</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          La página que buscas no existe o fue movida. Comprueba la dirección o vuelve a un sitio conocido.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 text-sm font-medium hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Ir al dashboard
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-white/8">
          <p className="text-xs text-slate-600 flex items-center justify-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            ¿Buscabas la guía de usuario, precios o soporte? Están en&nbsp;
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">riskeep.com</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
