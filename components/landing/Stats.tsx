const stats = [
  { value: '15,000+', label: 'Operaciones analizadas' },
  { value: '64%',     label: 'Win rate promedio' },
  { value: '< 0.5s',  label: 'Tiempo de ejecución' },
  { value: '24/7',    label: 'Monitorización activa' },
]

export default function Stats() {
  return (
    <section className="py-14 px-6 border-y border-white/6 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
