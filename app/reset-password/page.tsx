'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('No se pudo actualizar la contraseña. El enlace puede haber expirado.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-lg">Riskeep</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Nueva contraseña</h1>
          <p className="text-slate-400 text-sm">Elige una contraseña segura para tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}
