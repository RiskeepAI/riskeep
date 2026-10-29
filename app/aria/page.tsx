import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import GlobalBackground from '@/components/ui/GlobalBackground'
import AriaPageContent from '@/components/aria/AriaPageContent'

const DESCRIPTION =
  'Cómo funciona ARIA paso a paso: el ciclo de análisis, la estrategia Tendencia 4h con su backtest completo, los mercados por clase, el riesgo capa a capa, la IA por tarea y los modos en sombra. Con capturas reales de ARIA 9.0.'

export const metadata: Metadata = {
  title: 'Cómo funciona ARIA',
  description: DESCRIPTION,
  alternates: { canonical: '/aria' },
  openGraph: { title: 'Cómo funciona ARIA · Riskeep', description: DESCRIPTION, url: 'https://riskeep.com/aria', type: 'article' },
}

export default function AriaPage() {
  return (
    <div className="min-h-screen bg-black">
      <GlobalBackground />
      <Navbar />
      <AriaPageContent />
      <Footer />
    </div>
  )
}
