import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Download, CreditCard, LogOut, CheckCircle, XCircle, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import UpgradeButton from '@/components/dashboard/UpgradeButton'

export const metadata = { title: 'Mi cuenta — Riskeep' }

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get subscription status — order by most recent, pick first active or fallback to latest
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('current_period_end', { ascending: false })

  const subscription = subscriptions?.find(
    s => s.status === 'active' || s.status === 'trialing'
  ) ?? subscriptions?.[0] ?? null

  const isActive = subscription?.status === 'active' || subscription?.status === 'trialing'
  const name = user.user_metadata?.full_name || user.email?.split('@')[0]
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

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
              Cerrar sesión
            </button>
          </form>
        </div>

        {/* Welcome banner */}
        {params.welcome && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>¡Bienvenido a Riskeep, {name}! Tu cuenta está activa.</span>
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
                <div className="text-slate-400 text-sm">{user.email}</div>
              </div>
            </div>
            {/* Mode badge */}
            {isActive ? (
              <Badge variant="green" className="flex-shrink-0">
                <Zap className="w-3 h-3" />
                LIVE
              </Badge>
            ) : (
              <Badge variant="yellow" className="flex-shrink-0">
                DEMO
              </Badge>
            )}
          </div>
        </div>

        {/* Subscription status */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest">
            <CreditCard className="w-4 h-4" />
            Suscripción
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
                    ? `Plan ${subscription?.plan === 'yearly' ? 'Anual' : 'Mensual'} activo`
                    : 'Sin suscripción activa'}
                </div>
                {periodEnd && (
                  <div className="text-xs text-slate-500 mt-0.5">
                    {subscription?.cancel_at_period_end ? 'Cancela el' : 'Renueva el'} {periodEnd}
                  </div>
                )}
              </div>
            </div>
          </div>
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
                <div className="text-white font-semibold">Estás en modo Demo (Binance Testnet)</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">
                  ARIA opera con dinero virtual en Binance Demo. Activa el plan para operar con fondos reales en mainnet.
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-3">
              <UpgradeButton plan="monthly" label="Mensual — 29€/mes" />
              <UpgradeButton plan="yearly" label="Anual — 249€/año" recommended />
            </div>
          </div>
        )}

        {/* Download launcher — available for all users */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest">
            <Download className="w-4 h-4" />
            Descargar Launcher
          </div>

          <div className="space-y-3">
            <p className="text-slate-400 text-sm">
              {isActive
                ? 'Descarga el launcher de ARIA para tu sistema operativo. Usa tu email y contraseña para activarlo en modo live.'
                : 'Descarga el launcher de ARIA. Se activará en modo demo (Binance Testnet) hasta que actives un plan.'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={process.env.NEXT_PUBLIC_DOWNLOAD_WIN ?? '#'}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
              >
                <span>🪟</span> Windows
              </a>
              <a
                href={process.env.NEXT_PUBLIC_DOWNLOAD_MAC ?? '#'}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
              >
                <span>🍎</span> macOS
              </a>
            </div>
            <p className="text-xs text-slate-600">
              Versión actual: v{process.env.NEXT_PUBLIC_ARIA_VERSION ?? '5.0'} · Requiere Windows 10+ o macOS 12+
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
