'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '¿Necesito experiencia en trading para usar Riskeep?',
    a: 'No. ARIA está diseñado para funcionar de forma autónoma. Puedes empezar en modo paper (sin dinero real) para entender cómo opera antes de conectar tu cuenta real.',
  },
  {
    q: '¿Es seguro conectar mi cuenta de Binance?',
    a: 'Sí. Solo necesitas crear una API key con permisos de trading (sin permisos de retiro). Las claves se almacenan localmente en tu equipo, nunca pasan por nuestros servidores. Para mejorar el razonamiento de ARIA, cada operación cerrada registra únicamente datos técnicos (indicadores, señal y resultado): nunca se almacenan claves, saldos ni datos personales.',
  },
  {
    q: '¿Cómo funciona el modo paper?',
    a: 'El modo paper conecta con Binance Testnet, la red de pruebas oficial de Binance. Opera con fondos virtuales en condiciones reales de mercado. Es completamente gratuito — no necesitas tarjeta ni suscripción para empezar.',
  },
  {
    q: '¿En qué sistemas operativos funciona el launcher?',
    a: 'Actualmente disponible para Windows 10/11 y macOS 12+. La versión Linux está en desarrollo.',
  },
  {
    q: '¿Puedo cancelar la suscripción en cualquier momento?',
    a: 'Sí. Puedes cancelar desde tu área de cliente en cualquier momento. Mantendrás el acceso hasta el final del período ya pagado.',
  },
  {
    q: '¿Qué pares de criptomonedas soporta ARIA?',
    a: 'Por defecto opera con BTC/USDT, ETH/USDT, SOL/USDT, XRP/USDT y LTC/USDT. Puedes configurar los pares desde la interfaz.',
  },
  {
    q: '¿ARIA garantiza beneficios?',
    a: 'No. El trading siempre conlleva riesgo. ARIA gestiona el riesgo de forma disciplinada, pero no garantiza resultados positivos. Nunca inviertas más de lo que puedes permitirte perder.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="text-sm font-mono text-blue-400 uppercase tracking-widest">FAQ</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Preguntas frecuentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/3 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/8 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
