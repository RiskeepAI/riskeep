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

const SITE_DESCRIPTION =
  'ARIA vigila 10 mercados de Bitget Futures las 24 horas, entra cuando la tendencia gira a su favor y protege cada operación con un stop. Estrategia medida con backtest. Prueba gratis en demo.'

export const metadata: Metadata = {
  metadataBase: new URL('https://riskeep.com'),
  title: {
    default:  'Riskeep — ARIA, agente de trading autónomo para Bitget',
    template: '%s · Riskeep',
  },
  description: SITE_DESCRIPTION,
  keywords: ['bot de trading', 'trading automático', 'bitget', 'futuros cripto', 'gestión de riesgo', 'backtest', 'trading algorítmico'],
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/logo-r.png',
    apple: '/images/logo-r.png',
  },
  openGraph: {
    title: 'Riskeep — ARIA, agente de trading autónomo para Bitget',
    description: SITE_DESCRIPTION,
    url: 'https://riskeep.com',
    siteName: 'Riskeep',
    locale: 'es_ES',
    alternateLocale: ['en_GB'],
    type: 'website',
    // La imagen la genera app/opengraph-image.tsx (1200×630)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riskeep — ARIA, agente de trading autónomo para Bitget',
    description: SITE_DESCRIPTION,
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
