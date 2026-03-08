import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardContent from '@/components/dashboard/DashboardContent'

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

  const isActive  = subscription?.status === 'active' || subscription?.status === 'trialing'
  const name      = user.user_metadata?.full_name || user.email?.split('@')[0] || ''
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <DashboardContent
      name={name}
      email={user.email ?? ''}
      isActive={isActive}
      showWelcome={!!params.welcome}
      plan={subscription?.plan ?? null}
      periodEnd={periodEnd}
      cancelAtPeriodEnd={!!subscription?.cancel_at_period_end}
      downloadWin={process.env.NEXT_PUBLIC_DOWNLOAD_WIN ?? '#'}
      downloadMac={process.env.NEXT_PUBLIC_DOWNLOAD_MAC ?? '#'}
      ariaVersion={process.env.NEXT_PUBLIC_ARIA_VERSION ?? '5.0'}
    />
  )
}
