import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export const metadata = { title: 'Iniciar sesión — Riskeep' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
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
          <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
          <p className="text-slate-400 text-sm">Accede a tu área de cliente</p>
        </div>

        {params.error === 'link_expired' && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-center">
            El enlace ha expirado. Solicita uno nuevo desde "¿Olvidaste tu contraseña?".
          </p>
        )}

        <div className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-slate-500">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
