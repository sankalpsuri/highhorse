import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

const SITE_URL = 'https://highhorse.in'

type SanitySlugEntry = {
  slug: string
  _updatedAt: string
}

const sitemapSlugsQuery = groq`
  *[_type == $type && defined(slug.current) && !(_id in path("drafts.**")) && !(seo.noIndex == true)]{
    "slug": slug.current,
    _updatedAt
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/search-driven-performance-marketing-company`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact-search-performance-marketing-agency`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/free-website-audit`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/performance-marketing-agency-careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/marketing-agency-partnership-program`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const [servicePages, caseStudies, blogPosts, industryPages] = await Promise.all([
    sanityFetch<SanitySlugEntry[]>(sitemapSlugsQuery, { type: 'servicePage' }),
    sanityFetch<SanitySlugEntry[]>(sitemapSlugsQuery, { type: 'caseStudy' }),
    sanityFetch<SanitySlugEntry[]>(sitemapSlugsQuery, { type: 'blogPost' }),
    sanityFetch<SanitySlugEntry[]>(sitemapSlugsQuery, { type: 'industryPage' }),
  ])

  const dynamicPages: MetadataRoute.Sitemap = [
    ...servicePages.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: page._updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...industryPages.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: page._updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...caseStudies.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: page._updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...blogPosts.map((page) => ({
      url: `${SITE_URL}/blog/${page.slug}`,
      lastModified: page._updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...dynamicPages]
}
