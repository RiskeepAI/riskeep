import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Riskeep — Tu agente de trading autónomo',
  description: 'ARIA analiza el mercado, gestiona el riesgo y ejecuta operaciones automáticamente. Trading con inteligencia artificial para Binance.',
  keywords: ['trading bot', 'inteligencia artificial', 'binance', 'criptomonedas', 'gestión de riesgo'],
  openGraph: {
    title: 'Riskeep — Tu agente de trading autónomo',
    description: 'ARIA analiza el mercado, gestiona el riesgo y ejecuta operaciones automáticamente.',
    url: 'https://riskeep.com',
    siteName: 'Riskeep',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
