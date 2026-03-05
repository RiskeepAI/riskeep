const steps = [
  {
    step: '01',
    title: 'Suscríbete',
    description: 'Elige tu plan en riskeep.com y completa el pago en segundos con Stripe. Crea tu cuenta con el email que usaste.',
    detail: 'Pago seguro · Cancela cuando quieras',
    icon: '🔐',
    color: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  {
    step: '02',
    title: 'Descarga y configura',
    description: 'Descarga el launcher de ARIA para tu sistema. Conecta tu cuenta de Binance con una API key (sin permisos de retiro).',
    detail: 'Windows · macOS · Modo paper disponible',
    icon: '⚙️',
    color: 'from-cyan-500 to-cyan-600',
    glow: 'shadow-cyan-500/20',
  },
  {
    step: '03',
    title: 'ARIA opera por ti',
    description: 'El agente analiza el mercado continuamente, identifica oportunidades con alta confianza y ejecuta las operaciones automáticamente.',
    detail: 'IA en tiempo real · Stop loss automático',
    icon: '🤖',
    color: 'from-violet-500 to-violet-600',
    glow: 'shadow-violet-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">Cómo funciona</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">En 3 pasos, listo</h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Sin configuraciones complejas. Sin servidores que mantener. Solo descarga y funciona.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-violet-500/30" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center group">
                {/* Step number bubble */}
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.glow} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <span className="text-3xl">{s.icon}</span>
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#020810] border border-white/15 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-slate-400 font-mono">{s.step}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.description}</p>
                <span className="text-xs text-slate-600 font-mono">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
