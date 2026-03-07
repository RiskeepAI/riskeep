import Link from 'next/link'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'

interface Props {
  searchParams: Promise<{ email?: string; plan?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { email, plan } = await searchParams
  const displayEmail = email ? decodeURIComponent(email) : null
  const loginHref = plan ? `/login?plan=${plan}` : '/login'

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center px-6">

      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 sm:p-10 space-y-8">

          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Mail className="w-9 h-9 text-blue-400" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-2xl border border-blue-500/30 animate-ping opacity-30" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Revisa tu correo
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Te hemos enviado un enlace de confirmación
              {displayEmail && (
                <>
                  {' '}a{' '}
                  <span className="text-white font-medium break-all">{displayEmail}</span>
                </>
              )}
              . Haz clic en él para activar tu cuenta.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              { step: '1', text: 'Abre tu bandeja de entrada (revisa también spam)' },
              { step: '2', text: 'Busca un email de ARIA / Riskeep' },
              { step: '3', text: 'Haz clic en "Confirmar cuenta"' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-400">{step}</span>
                </div>
                <p className="text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/6" />

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href={loginHref}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              {plan ? 'Ya confirmé — Continuar con la suscripción' : 'Ya confirmé — Iniciar sesión'}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-white/8 text-slate-400 text-sm hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              Volver al inicio
            </Link>
          </div>

          {/* Resend hint */}
          <p className="text-center text-xs text-slate-600">
            ¿No recibiste el email?{' '}
            <span className="text-slate-500 inline-flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Espera unos minutos o revisa spam.
            </span>
          </p>

        </div>

        {/* Back link */}
        <p className="mt-6 text-center text-xs text-slate-700">
          ¿Problemas?{' '}
          <a href="mailto:soporte@riskeep.com" className="text-slate-500 hover:text-slate-300 transition-colors">
            Contacta con soporte
          </a>
        </p>

      </div>
    </div>
  )
}
