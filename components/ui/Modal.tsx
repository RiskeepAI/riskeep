'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fade-up_0.2s_ease]"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-amber-500/25 bg-gradient-to-b from-[#0d1220] to-[#080b14] shadow-2xl shadow-black/60 p-7"
        style={{ animation: 'fade-up 0.25s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  )
}
