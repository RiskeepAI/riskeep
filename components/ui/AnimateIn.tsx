'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in'
  threshold?: number
  /**
   * Skip the IntersectionObserver gate and apply the entrance animation
   * class directly in the server-rendered markup. Use this ONLY for
   * content that is already in the initial viewport (e.g. the hero) —
   * "reveal on scroll" is meaningless there, and gating it behind
   * hydration + an observer callback delays LCP for no visual benefit.
   * Below-the-fold content should keep the default scroll-triggered mode.
   */
  immediate?: boolean
}

export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  threshold = 0.01,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (immediate) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`
          el.classList.add(`anim-${animation}`)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px 150px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, animation, threshold, immediate])

  if (immediate) {
    // Already visible in the server-rendered HTML — the CSS keyframe
    // animation starts at paint time, independent of hydration.
    return (
      <div className={`anim-${animation} ${className}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={`anim-init ${className}`}>
      {children}
    </div>
  )
}
