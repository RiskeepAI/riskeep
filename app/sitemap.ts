import type { MetadataRoute } from 'next'

const SITE = 'https://riskeep.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE,               lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${SITE}/aria`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/novedades`, lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${SITE}/legal`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/register`, lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${SITE}/login`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
