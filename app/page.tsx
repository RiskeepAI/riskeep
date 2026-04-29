import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Ticker from '@/components/landing/Ticker'
import Stats from '@/components/landing/Stats'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import Comparison from '@/components/landing/Comparison'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import GlobalBackground from '@/components/ui/GlobalBackground'

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
