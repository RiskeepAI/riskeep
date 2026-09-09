import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono, Public_Sans } from 'next/font/google'
import Script from 'next/script'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import ScrollProgress from '@/components/ui/ScrollProgress'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  // 300 (light) is not used anywhere in the codebase — confirmed via
  // grep for `font-light` / inline `fontWeight: 300` before removing it.
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Riskeep — Tu agente de trading autónomo',
  description: 'ARIA analiza el mercado, gestiona el riesgo y ejecuta operaciones automáticamente. Trading con inteligencia artificial para Bitget.',
  keywords: ['trading bot', 'inteligencia artificial', 'bitget', 'criptomonedas', 'gestión de riesgo'],
  icons: {
    icon: '/images/logo-r.png',
    apple: '/images/logo-r.png',
  },
  openGraph: {
    title: 'Riskeep — Tu agente de trading autónomo',
    description: 'ARIA analiza el mercado, gestiona el riesgo y ejecuta operaciones automáticamente.',
    url: 'https://riskeep.com',
    siteName: 'Riskeep',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/images/logo-r.png', width: 512, height: 512 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${publicSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M92N2PQ9');`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M92N2PQ9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ScrollProgress />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
