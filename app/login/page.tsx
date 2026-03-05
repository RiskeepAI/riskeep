import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export const metadata = { title: 'Iniciar sesión — Riskeep' }

export default function LoginPage() {
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

        <div className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
