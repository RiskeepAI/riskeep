import dynamic from 'next/dynamic'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import GlobalBackground from '@/components/ui/GlobalBackground'

// Below-the-fold sections: server-rendered exactly as before (so content,
// SEO, and no-JS visibility are unchanged) but split into separate chunks
// that load off the critical initial-bundle path instead of being bundled
// with the hero. See RENDIMIENTO.md for the before/after measurements.
const Ticker      = dynamic(() => import('@/components/landing/Ticker'))
const Stats       = dynamic(() => import('@/components/landing/Stats'))
const HowItWorks  = dynamic(() => import('@/components/landing/HowItWorks'))
const Proof       = dynamic(() => import('@/components/landing/Proof'))
const Features    = dynamic(() => import('@/components/landing/Features'))
const Comparison  = dynamic(() => import('@/components/landing/Comparison'))
const Pricing     = dynamic(() => import('@/components/landing/Pricing'))
const FAQ         = dynamic(() => import('@/components/landing/FAQ'))
const Footer      = dynamic(() => import('@/components/landing/Footer'))

// Datos estructurados (schema.org) para buscadores: qué es ARIA, en qué
// sistemas funciona y sus precios. Solo hechos verificables.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ARIA',
  alternateName: 'Riskeep ARIA',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Windows 10, Windows 11, macOS 12+',
  url: 'https://riskeep.com',
  description:
    'Agente de trading autónomo para Bitget Futures: cripto y, por clase, oro, petróleo, índices y acciones; estrategia de tendencia en velas de 4 horas validada con backtest, calendario de eventos, stop nativo en el exchange y modo demo gratuito.',
  softwareVersion: process.env.NEXT_PUBLIC_ARIA_VERSION ?? '9.0.0',
  publisher: { '@type': 'Organization', name: 'Riskeep', url: 'https://riskeep.com', email: 'support@riskeep.com' },
  offers: [
    { '@type': 'Offer', name: 'Modo demo', price: '0', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Plan mensual', price: '19', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Plan anual', price: '149', priceCurrency: 'EUR' },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c') }}
      />
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <HowItWorks />
        <div className="section-divider" />
        <Proof />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <Comparison />
        <div className="section-divider" />
        <Pricing />
        <div className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
