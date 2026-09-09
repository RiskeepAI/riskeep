'use client'

import { useEffect, useRef } from 'react'

const COLORS = ['#F59E0B', '#8B5CF6', '#22D3EE', '#8B5CF6', '#F59E0B', '#22D3EE']

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number
  color: string
}

export default function ParticleCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    let W = 0, H = 0
    let running = false

    function init() {
      W = canvas!.width  = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
      const isMobile = W < 768
      const count = Math.min(isMobile ? 30 : 75, Math.floor((W * H) / (isMobile ? 20000 : 12000)))
      particles = Array.from({ length: count }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r:  Math.random() * 1.6 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    function tick() {
      if (!running) return
      ctx!.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        /* connections */
        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(139,92,246,${(1 - d / 150) * 0.14})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }

        /* dot */
        ctx!.beginPath()
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx!.fillStyle = a.color + '66'
        ctx!.fill()

        /* move */
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > W) a.vx *= -1
        if (a.y < 0 || a.y > H) a.vy *= -1
      }

      animId = requestAnimationFrame(tick)
    }

    init()

    // Pause the rAF loop while the canvas is scrolled out of view instead
    // of running this O(n²) connection-line pass forever in the
    // background — it only needs to run while the hero is visible.
    function start() {
      if (running) return
      running = true
      tick()
    }
    function stop() {
      running = false
      cancelAnimationFrame(animId)
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    io.observe(canvas)

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}
