'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '#features', label: 'Funciones' },
  { href: '#pricing',  label: 'Precios'   },
  { href: '#faq',      label: 'FAQ'        },
  { href: '/legal',    label: 'Legal'      },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/6 bg-[#020810]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Riskeep</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"><Button variant="ghost" size="sm">Entrar</Button></Link>
          <Link href="#pricing"><Button size="sm">Empezar gratis</Button></Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="#pricing"><Button size="sm">Empezar</Button></Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/8 bg-[#020810]/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-sm text-slate-300 hover:text-white transition-colors border-b border-white/6"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="py-3.5 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Entrar
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
