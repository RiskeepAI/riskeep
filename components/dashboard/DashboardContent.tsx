'use client'

import Link from 'next/link'
import { Download, CreditCard, LogOut, CheckCircle, XCircle, Lock, Zap } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import UpgradeButton from './UpgradeButton'
import CancelButton from './CancelButton'
import { useT } from '@/lib/i18n/LanguageContext'

interface Props {
  name:              string
  email:             string
  isActive:          boolean
  showWelcome:       boolean
  plan:              string | null
  periodEnd:         string | null
  cancelAtPeriodEnd: boolean
  downloadWin:       string
  downloadMac:       string
  ariaVersion:       string
}

export default function DashboardContent({
  name, email, isActive, showWelcome,
  plan, periodEnd, cancelAtPeriodEnd,
  downloadWin, downloadMac, ariaVersion,
}: Props) {
  const t = useT()

  return (
    <div className="min-h-screen bg-[#020810] px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold">Riskeep</span>
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              {t.dashboard.logout}
            </button>
          </form>
        </div>

        {/* Welcome banner */}
        {showWelcome && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{t.dashboard.welcomeBanner.replace('{name}', name)}</span>
          </div>
        )}

        {/* User info */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="text-white font-semibold">{name}</div>
                <div className="text-slate-400 text-sm">{email}</div>
              </div>
            </div>
            {/* Mode badge */}
            {isActive ? (
              <Badge variant="green" className="flex-shrink-0">
                <Zap className="w-3 h-3" />
                {t.dashboard.liveMode}
              </Badge>
            ) : (
              <Badge variant="yellow" className="flex-shrink-0">
                {t.dashboard.demoMode}
              </Badge>
            )}
          </div>
        </div>

        {/* Subscription status */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest">
            <CreditCard className="w-4 h-4" />
            {t.dashboard.subscriptionLabel}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isActive ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <div>
                <div className={`font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isActive
                    ? `${t.dashboard.planActive} ${plan === 'yearly' ? t.dashboard.planYearly : t.dashboard.planMonthly}`
                    : t.dashboard.noSubscription}
                </div>
                {periodEnd && (
                  <div className="text-xs text-slate-500 mt-0.5">
                    {cancelAtPeriodEnd ? t.dashboard.cancelsOn : t.dashboard.renewsOn} {periodEnd}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cancel — only if active and not already canceling */}
          {isActive && !cancelAtPeriodEnd && (
            <div className="pt-2 border-t border-white/6">
              <CancelButton />
            </div>
          )}

          {/* Pending cancellation notice */}
          {isActive && cancelAtPeriodEnd && (
            <div className="pt-2 border-t border-white/6">
              <p className="text-xs text-yellow-500/80">
                {t.dashboard.cancelPendingNotice.replace('{date}', periodEnd ?? '')}
              </p>
            </div>
          )}
        </div>

        {/* Upgrade CTA — only for paper/demo users */}
        {!isActive && (
          <div className="relative p-6 rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/8 to-cyan-500/5 space-y-5 overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-semibold">{t.dashboard.upgradePaperTitle}</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">
                  {t.dashboard.upgradePaperDesc}
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-3">
              <UpgradeButton plan="monthly" label={t.dashboard.upgradeMonthly} />
              <UpgradeButton plan="yearly"  label={t.dashboard.upgradeYearly} recommended />
            </div>
          </div>
        )}

        {/* Download launcher — available for all users */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest">
            <Download className="w-4 h-4" />
            {t.dashboard.downloadLabel}
          </div>

          <div className="space-y-3">
            <p className="text-slate-400 text-sm">
              {isActive ? t.dashboard.downloadDescActive : t.dashboard.downloadDescDemo}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={downloadWin}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
              >
                <span>🪟</span> {t.dashboard.downloadWin}
              </a>
              <a
                href={downloadMac}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
              >
                <span>🍎</span> {t.dashboard.downloadMac}
              </a>
            </div>
            <p className="text-xs text-slate-600">
              {t.dashboard.downloadVersion.replace('{version}', ariaVersion)}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
