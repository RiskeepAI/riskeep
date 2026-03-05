import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020810]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
