'use client'

import { useRef } from 'react'

/* ── Word reveal ──────────────────────────────────────────────────────
   Pure-CSS stagger: each word gets its final animation-delay inline, so
   the reveal starts at paint time (no hydration / IntersectionObserver /
   setTimeout gate). Only for headlines in the initial viewport — "reveal
   on scroll" there adds nothing but LCP delay; see .wr-word /
   @keyframes word-in in globals.css. ─────────────────────────────────── */
export function WordReveal({ text, baseDelay = 0, className = '' }: { text: string; baseDelay?: number; className?: string }) {
  return (
    <span>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className={`wr-word inline-block mr-[0.25em] ${className}`}
          style={{ animationDelay: `${baseDelay + i * 80}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

/* ── Tilt 3D ──────────────────────────────────────────────── */
export function Tilt3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(8px)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
