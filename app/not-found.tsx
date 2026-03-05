import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Página no encontrada</h1>
          <p className="text-slate-400">La página que buscas no existe o fue movida.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
