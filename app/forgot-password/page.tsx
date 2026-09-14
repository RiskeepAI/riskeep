'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useT } from '@/lib/i18n/LanguageContext'

export default function ForgotPasswordPage() {
  const t = useT()
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res  = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(String(data?.error ?? 'No se pudo enviar el email'))
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <Image src="/images/logo-r.png" alt="Riskeep" width={32} height={32} className="rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20" />
            <span className="text-white font-bold text-lg">Riskeep</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{t.auth.forgotTitle}</h1>
          <p className="text-slate-400 text-sm">{t.auth.forgotSubtitle}</p>
        </div>

        {sent ? (
          <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm text-center space-y-2">
            <p className="font-medium">{t.auth.forgotSuccessTitle}</p>
            <p className="text-emerald-400/70">{t.auth.forgotSuccessDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t.auth.forgotEmailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
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
              {loading ? t.auth.forgotSending : t.auth.forgotButton}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            {t.auth.forgotBack}
          </Link>
        </p>
      </div>
    </div>
  )
}
