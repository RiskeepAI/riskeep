'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'

export default function CancelButton() {
  const router = useRouter()
  const [step, setStep]       = useState<'idle' | 'confirm' | 'loading' | 'done'>('idle')
  const [error, setError]     = useState('')

  async function handleCancel() {
    setStep('loading')
    setError('')
    try {
      const res = await fetch('/api/subscription/cancel', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al cancelar.')
        setStep('confirm')
        return
      }
      setStep('done')
      // Refresh server data after a short delay so Stripe webhook has time to fire
      setTimeout(() => router.refresh(), 1500)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
      setStep('confirm')
    }
  }

  if (step === 'done') {
    return (
      <p className="text-xs text-slate-500 text-center pt-1">
        ✓ Cancelación programada. Seguirás teniendo acceso hasta que finalice el periodo actual.
      </p>
    )
  }

  if (step === 'confirm' || step === 'loading') {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300">
            Seguirás teniendo acceso hasta el final del periodo de facturación. Después ARIA pasará a modo demo automáticamente.
          </p>
        </div>
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            disabled={step === 'loading'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/25 transition-colors disabled:opacity-50"
          >
            {step === 'loading' ? (
              <>
                <span className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                Cancelando…
              </>
            ) : (
              'Sí, cancelar'
            )}
          </button>
          <button
            onClick={() => { setStep('idle'); setError('') }}
            disabled={step === 'loading'}
            className="px-4 py-2 rounded-lg border border-white/8 text-slate-400 text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            No, mantener
          </button>
        </div>
      </div>
    )
  }

  // idle
  return (
    <button
      onClick={() => setStep('confirm')}
      className="text-xs text-slate-600 hover:text-red-400 transition-colors"
    >
      Cancelar suscripción
    </button>
  )
}
