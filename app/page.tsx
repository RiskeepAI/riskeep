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
const Features    = dynamic(() => import('@/components/landing/Features'))
const Comparison  = dynamic(() => import('@/components/landing/Comparison'))
const Pricing     = dynamic(() => import('@/components/landing/Pricing'))
const FAQ         = dynamic(() => import('@/components/landing/FAQ'))
const Footer      = dynamic(() => import('@/components/landing/Footer'))

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
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
