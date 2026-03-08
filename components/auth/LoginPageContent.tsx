'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import LoginForm from './LoginForm'
import { useT } from '@/lib/i18n/LanguageContext'

export default function LoginPageContent() {
  const searchParams = useSearchParams()
  const t = useT()
  const plan = searchParams.get('plan') as 'monthly' | 'yearly' | null
  const hasError = searchParams.get('error') === 'link_expired'

  const planLabel =
    plan === 'yearly'  ? t.auth.planYearly  :
    plan === 'monthly' ? t.auth.planMonthly : null

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-white font-bold text-xl">Riskeep</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {planLabel ? t.auth.loginTitlePlan : t.auth.loginTitle}
          </h1>
          <p className="text-slate-400 text-sm">
            {planLabel ? `${t.auth.planSelected}: ${planLabel}` : t.auth.loginSubtitle}
          </p>
        </div>

        {/* Subscription context banner */}
        {planLabel && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
            <span>🔒</span>
            <span>{t.auth.loginPlanBanner}</span>
          </div>
        )}

        {hasError && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-center">
            {t.auth.loginLinkExpired}
          </p>
        )}

        <div className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-slate-500">
          {t.auth.loginNoAccount}{' '}
          <Link
            href={plan ? `/register?plan=${plan}` : '/register'}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            {t.auth.loginRegisterLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
