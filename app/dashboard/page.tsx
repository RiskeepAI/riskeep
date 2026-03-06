import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Download, CreditCard, LogOut, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

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
            <span>¡Bienvenido a Riskeep, {name}! Tu suscripción está activa.</span>
          </div>
        )}

        {/* User info */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              {name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="text-white font-semibold">{name}</div>
              <div className="text-slate-400 text-sm">{user.email}</div>
            </div>
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
                  {isActive ? 'Activa' : 'Sin suscripción activa'}
                </div>
                {periodEnd && (
                  <div className="text-xs text-slate-500 mt-0.5">
                    {subscription?.cancel_at_period_end ? 'Cancela el' : 'Renueva el'} {periodEnd}
                  </div>
                )}
              </div>
            </div>

            {!isActive && (
              <Link
                href="/#pricing"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Suscribirse →
              </Link>
            )}
          </div>
        </div>

        {/* Download launcher */}
        <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 uppercase tracking-widest">
            <Download className="w-4 h-4" />
            Descargar Launcher
          </div>

          {isActive ? (
            <div className="space-y-3">
              <p className="text-slate-400 text-sm">
                Descarga el launcher de ARIA para tu sistema operativo. Usa tu email y contraseña para activarlo.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/downloads/riskeep-setup-windows.exe"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
                >
                  <span>🪟</span> Windows
                </a>
                <a
                  href="/downloads/riskeep-setup-mac.dmg"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white"
                >
                  <span>🍎</span> macOS
                </a>
              </div>
              <p className="text-xs text-slate-600">
                Versión actual: v5.0 · Requiere Windows 10+ o macOS 12+
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">
              Necesitas una suscripción activa para descargar el launcher.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
