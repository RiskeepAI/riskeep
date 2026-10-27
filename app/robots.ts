import type { MetadataRoute } from 'next'

const SITE = 'https://riskeep.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Área privada y endpoints: nada que indexar
      disallow: ['/dashboard', '/api/', '/auth/', '/reset-password'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
