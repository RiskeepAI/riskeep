import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import GlobalBackground from '@/components/ui/GlobalBackground'
import NovedadesContent from '@/components/novedades/NovedadesContent'

const DESCRIPTION =
  'Historial de versiones de ARIA explicado sin tecnicismos: varios mercados y eventos en la 9.0, Centro de estrategia y modos en sombra en la 8.2, la estrategia Tendencia 4h en la 8.1, y lo próximo.'

export const metadata: Metadata = {
  title: 'Novedades de ARIA',
  description: DESCRIPTION,
  alternates: { canonical: '/novedades' },
  openGraph: { title: 'Novedades de ARIA · Riskeep', description: DESCRIPTION, url: 'https://riskeep.com/novedades', type: 'article' },
}

export default function NovedadesPage() {
  return (
    <div className="min-h-screen bg-black">
      <GlobalBackground />
      <Navbar />
      <NovedadesContent />
      <Footer />
    </div>
  )
}
