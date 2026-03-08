'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { useT } from '@/lib/i18n/LanguageContext'

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useT()
  const sessionId = searchParams.get('session_id')
  const plan      = searchParams.get('plan')

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError(t.auth.registerErrMatch)
      return
    }
    if (password.length < 8) {
      setError(t.auth.registerErrShort)
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const verifyUrl = plan
      ? `/auth/verify?email=${encodeURIComponent(email)}&plan=${plan}`
      : `/auth/verify?email=${encodeURIComponent(email)}`
    router.push(verifyUrl)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {sessionId && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
          <span>✓</span>
          <span>{t.auth.registerPaymentOk}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.auth.registerName}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.auth.registerNamePh}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.auth.registerEmail}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.auth.registerPassword}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.auth.registerPassPh}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{t.auth.registerConfirm}</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={t.auth.registerConfirmPh}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all text-sm"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        {t.auth.registerButton}
      </Button>
    </form>
  )
}
