import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M92N2PQ9');`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M92N2PQ9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
