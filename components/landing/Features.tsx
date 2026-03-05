import { Brain, ShieldCheck, Zap, BarChart3, Bell, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'IA de última generación',
    description: 'ARIA combina análisis técnico clásico con modelos de lenguaje para razonar sobre el mercado como un trader profesional.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Gestión de riesgo automática',
    description: 'Stop loss y take profit calculados dinámicamente con ATR. Nunca arriesgues más de lo configurado por operación.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Ejecución en tiempo real',
    description: 'Conectado a Binance vía CCXT. Opera en papel para practicar o en real cuando estés listo.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: BarChart3,
    title: 'Análisis técnico completo',
    description: 'RSI, EMA, patrones de velas, volumen y más. ARIA analiza múltiples timeframes antes de cada decisión.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Bell,
    title: 'Alertas por Telegram',
    description: 'Recibe notificaciones instantáneas de cada operación, alerta de riesgo y resumen diario directamente en tu móvil.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: RefreshCw,
    title: 'Mejora continua',
    description: 'ARIA aprende del mercado. Cada ciclo de análisis actualiza su memoria de patrones y estrategias efectivas.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">Funcionalidades</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Todo lo que necesita un trader serio
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            ARIA no es un bot de señales. Es un agente autónomo que piensa, decide y actúa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-all duration-300 hover:border-white/15"
            >
              <div className={`inline-flex p-3 rounded-xl border ${f.bg} mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
