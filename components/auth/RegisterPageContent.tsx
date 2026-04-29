'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import RegisterForm from './RegisterForm'
import { useT } from '@/lib/i18n/LanguageContext'

export default function RegisterPageContent() {
  const t = useT()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[300px] bg-violet-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <Image src="/images/logo-r.png" alt="Riskeep" width={36} height={36} className="rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/25" />
            <span className="font-heading text-white font-bold text-xl tracking-tight">Riskeep</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-white">{t.auth.registerTitle}</h1>
          <p className="text-slate-400 text-sm">{t.auth.registerSubtitle}</p>
        </div>

        <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md shadow-2xl shadow-black/30">
          <Suspense>
            <RegisterForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-slate-500">
          {t.auth.registerHasAccount}{' '}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
            {t.auth.registerLoginLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
