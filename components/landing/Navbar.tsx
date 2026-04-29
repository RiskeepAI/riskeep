'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useT, useLang } from '@/lib/i18n/LanguageContext'
import type { Lang } from '@/lib/i18n/translations'

/* ── Language options ─────────────────────────────────────────────────────── */
const LANGS: { value: Lang; flag: string; label: string }[] = [
  { value: 'es', flag: '🇪🇸', label: 'ES' },
  { value: 'en', flag: '🇬🇧', label: 'EN' },
]

function LangSelector() {
  const { lang, setLang } = useLang()
  const [open, setOpen]   = useState(false)
  const current = LANGS.find(l => l.value === lang) ?? LANGS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
        aria-label="Cambiar idioma"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-medium tracking-wide">{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 py-1.5 rounded-xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-md shadow-xl shadow-black/40 min-w-[100px]">
            {LANGS.map(l => (
              <button
                key={l.value}
                onClick={() => { setLang(l.value); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors cursor-pointer
                  ${l.value === lang
                    ? 'text-white bg-white/8'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
                {l.value === lang && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Logo ─────────────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
      <Image src="/images/logo-r.png" alt="Riskeep" width={32} height={32} className="rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20" />
      <span className="text-white font-bold text-lg tracking-tight font-heading">Riskeep</span>
    </Link>
  )
}

/* ── Navbar ───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV_LINKS = [
    { href: '#features', label: t.nav.features },
    { href: '#pricing',  label: t.nav.pricing   },
    { href: '#faq',      label: t.nav.faq        },
    { href: '/legal',    label: t.nav.legal      },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-white/6 bg-black/90 backdrop-blur-lg' : 'border-transparent bg-transparent backdrop-blur-none'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white transition-colors duration-200">{label}</Link>
          ))}
        </nav>

        {/* Desktop CTAs + lang */}
        <div className="hidden md:flex items-center gap-2">
          <LangSelector />
          <Link href="/login"><Button variant="ghost" size="sm">{t.nav.signIn}</Button></Link>
          <Link href="#pricing"><Button size="sm">{t.nav.startFree}</Button></Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <LangSelector />
          <Link href="#pricing"><Button size="sm">{t.nav.start}</Button></Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/8 bg-black/95 backdrop-blur-lg">
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
              {t.nav.signIn}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
