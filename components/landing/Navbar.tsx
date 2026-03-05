'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/6 bg-[#020810]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Riskeep</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Funciones</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Precios</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link href="#pricing">
            <Button size="sm">Empezar</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
