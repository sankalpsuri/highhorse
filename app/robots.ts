import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/high-horse/',
      },
    ],
    sitemap: 'https://highhorse.in/sitemap.xml',
  }
}
