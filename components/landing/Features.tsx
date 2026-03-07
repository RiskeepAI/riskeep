import { Brain, ShieldCheck, Zap, BarChart3, Bell, RefreshCw } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'

const features = [
  {
    icon: Brain,
    title: 'IA de última generación',
    description: 'ARIA combina análisis técnico clásico con modelos de lenguaje para razonar sobre el mercado como un trader profesional.',
    color:  'text-blue-400',
    bg:     'bg-blue-500/10 border-blue-500/20',
    glow:   'bg-blue-500/5',
    border: 'hover:border-blue-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(59,130,246,0.10)]',
  },
  {
    icon: ShieldCheck,
    title: 'Gestión de riesgo automática',
    description: 'Stop loss y take profit calculados dinámicamente con ATR. Nunca arriesgues más de lo configurado por operación.',
    color:  'text-emerald-400',
    bg:     'bg-emerald-500/10 border-emerald-500/20',
    glow:   'bg-emerald-500/5',
    border: 'hover:border-emerald-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(16,185,129,0.10)]',
  },
  {
    icon: Zap,
    title: 'Ejecución en tiempo real',
    description: 'Conectado a Binance vía CCXT. Opera en papel para practicar o en real cuando estés listo.',
    color:  'text-yellow-400',
    bg:     'bg-yellow-500/10 border-yellow-500/20',
    glow:   'bg-yellow-500/5',
    border: 'hover:border-yellow-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(234,179,8,0.10)]',
  },
  {
    icon: BarChart3,
    title: 'Análisis técnico completo',
    description: 'RSI, EMA, patrones de velas, volumen y más. ARIA analiza múltiples timeframes antes de cada decisión.',
    color:  'text-violet-400',
    bg:     'bg-violet-500/10 border-violet-500/20',
    glow:   'bg-violet-500/5',
    border: 'hover:border-violet-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(139,92,246,0.10)]',
  },
  {
    icon: Bell,
    title: 'Alertas por Telegram',
    description: 'Recibe notificaciones instantáneas de cada operación, alerta de riesgo y resumen diario directamente en tu móvil.',
    color:  'text-cyan-400',
    bg:     'bg-cyan-500/10 border-cyan-500/20',
    glow:   'bg-cyan-500/5',
    border: 'hover:border-cyan-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(6,182,212,0.10)]',
  },
  {
    icon: RefreshCw,
    title: 'Mejora continua',
    description: 'ARIA aprende del mercado. Cada ciclo de análisis actualiza su memoria de patrones y estrategias efectivas.',
    color:  'text-rose-400',
    bg:     'bg-rose-500/10 border-rose-500/20',
    glow:   'bg-rose-500/5',
    border: 'hover:border-rose-500/25',
    shadow: 'hover:shadow-[0_4px_40px_rgba(244,63,94,0.10)]',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        <AnimateIn className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono uppercase tracking-widest label-gradient">Funcionalidades</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Todo lo que necesita un trader serio
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            ARIA no es un bot de señales. Es un agente autónomo que piensa, decide y actúa.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={i * 70}>
              <div className={`group relative p-6 rounded-2xl border border-white/8 bg-white/3 overflow-hidden
                transition-all duration-300 ${f.border} ${f.shadow} hover:bg-white/5`}>
                {/* Subtle color wash on hover */}
                <div className={`absolute inset-0 ${f.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className={`relative inline-flex p-3 rounded-xl border ${f.bg} mb-4
                  group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="relative text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="relative text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
