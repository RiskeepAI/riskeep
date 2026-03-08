'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/LanguageContext'

export default function Footer() {
  const t = useT()

  return (
    <footer className="border-t border-white/8 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="text-white font-bold">Riskeep</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <Link href="#features" className="hover:text-slate-300 transition-colors">{t.footer.features}</Link>
            <Link href="#pricing"  className="hover:text-slate-300 transition-colors">{t.footer.pricing}</Link>
            <Link href="#faq"      className="hover:text-slate-300 transition-colors">{t.footer.faq}</Link>
            <Link href="/legal"    className="hover:text-slate-300 transition-colors">{t.footer.legal}</Link>
            <Link href="/login"    className="hover:text-slate-300 transition-colors">{t.footer.myAccount}</Link>
          </nav>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Riskeep. {t.footer.rights}
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-slate-700 max-w-xl mx-auto">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  )
}
