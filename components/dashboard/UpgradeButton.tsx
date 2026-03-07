'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

interface Props {
  plan: 'monthly' | 'yearly'
  label: string
  recommended?: boolean
}

export default function UpgradeButton({ plan, label, recommended }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  if (recommended) {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="relative flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl
          bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm
          hover:from-blue-400 hover:to-cyan-400 transition-all duration-300
          shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Redirigiendo…
          </span>
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              {label}
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Más popular · 2 meses gratis</span>
          </>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
        border border-white/12 bg-white/5 hover:bg-white/8 text-white text-sm font-medium
        transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Redirigiendo…
        </span>
      ) : (
        label
      )}
    </button>
  )
}
