export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid — spans the entire page */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient orbs — positioned at different scroll depths */}
      {/* Top-right: violet (AI/tech feel) */}
      <div className="absolute -top-[20%] right-[-15%] w-[900px] h-[900px] bg-violet-600/8 rounded-full blur-[220px]" />
      {/* Mid-left: amber (trust/energy) */}
      <div className="absolute top-[25%] -left-[10%] w-[700px] h-[700px] bg-amber-500/6 rounded-full blur-[200px]" />
      {/* Mid-right: cyan (live/execution) */}
      <div className="absolute top-[55%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[220px]" />
      {/* Bottom-left: violet (features/depth) */}
      <div className="absolute top-[78%] left-[10%] w-[600px] h-[600px] bg-violet-600/6 rounded-full blur-[180px]" />
      {/* Bottom-right: amber (pricing/CTA) */}
      <div className="absolute top-[90%] right-[5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px]" />
    </div>
  )
}
