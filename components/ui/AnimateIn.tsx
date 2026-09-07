'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in'
  threshold?: number
}

export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  threshold = 0.01,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [delay, animation, threshold])

  return (
    <div ref={ref} className={`anim-init ${className}`}>
      {children}
    </div>
  )
}
