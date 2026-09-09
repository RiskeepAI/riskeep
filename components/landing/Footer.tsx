'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Footer() {
  const t = useT()

  return (
    <footer className="border-t border-white/6 bg-[#040e1f]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top grid: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <Image src="/images/logo-r.png" alt="Riskeep" width={32} height={32} className="rounded-lg group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20" />
              <span className="font-heading text-[#dbe6fe] font-bold text-lg tracking-tight">Riskeep</span>
            </Link>
            <p className="text-sm text-[#7d87a3] leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            {/* Bitget badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
              <span className="text-xs text-[#7d87a3]">Compatible con <span className="text-[#dbe6fe]">Bitget</span></span>
            </div>
          </div>

          {/* Col 2: Nav links */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6b7ba6]">{t.footer.navLabel}</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '#features', label: t.footer.features  },
                { href: '#pricing',  label: t.footer.pricing   },
                { href: '#faq',      label: t.footer.faq       },
                { href: '/legal',    label: t.footer.legal     },
                { href: '/login',    label: t.footer.myAccount },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm text-[#7d87a3] hover:text-[#dbe6fe] transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact + Social */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6b7ba6]">{t.footer.contact}</p>
            <a href="mailto:support@riskeep.com" className="text-sm text-[#7d87a3] hover:text-[#dbe6fe] transition-colors block w-fit">
              support@riskeep.com
            </a>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.instagram.com/riskeep.app" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3 text-xs text-[#7d87a3] hover:text-[#dbe6fe] hover:border-white/16 transition-all">
                <Instagram className="w-3 h-3"/>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: divider + disclaimer + copyright */}
        <div className="border-t border-white/6 pt-6 space-y-3">
          <p className="text-center text-xs text-[#6b7ba6] leading-relaxed max-w-2xl mx-auto">
            {t.footer.disclaimer}
          </p>
          <p className="text-center text-xs text-[#6b7ba6]">
            © {new Date().getFullYear()} Riskeep. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
