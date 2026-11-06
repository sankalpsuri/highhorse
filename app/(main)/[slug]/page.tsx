import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import {
  servicePageQuery,
  caseStudyQuery,
  industryPageQuery,
  servicePageSlugsQuery,
  caseStudySlugsQuery,
  industryPageSlugsQuery,
} from '@/lib/sanity/queries'
import { ServicePage } from '@/components/service-page'
import { CaseStudyPage } from '@/components/case-study-page'
import { IndustryPage } from '@/components/industry-page'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const [services, caseStudies, industries] = await Promise.all([
    sanityFetch<{ slug: string }[]>(servicePageSlugsQuery),
    sanityFetch<{ slug: string }[]>(caseStudySlugsQuery),
    sanityFetch<{ slug: string }[]>(industryPageSlugsQuery),
  ])

  return [...services, ...caseStudies, ...industries]
    .filter((item) => item.slug && !/\s/.test(item.slug))
    .map((item) => ({
      slug: item.slug,
    }))
}

async function fetchPageData(slug: string) {
  const service = await sanityFetch<any>(servicePageQuery, { slug })
  if (service) return { type: 'service' as const, data: service }

  const caseStudy = await sanityFetch<any>(caseStudyQuery, { slug })
  if (caseStudy) return { type: 'caseStudy' as const, data: caseStudy }

  const industry = await sanityFetch<any>(industryPageQuery, { slug })
  if (industry) return { type: 'industry' as const, data: industry }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await fetchPageData(slug)
  if (!result) return {}

  const seo = result.data.seo
  const title = seo?.metaTitle || result.data.title || result.data.clientName
  const description = seo?.metaDescription || result.data.summary || ''

  return {
    title,
    description,
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const result = await fetchPageData(slug)
  if (!result) notFound()

  switch (result.type) {
    case 'service':
      return <ServicePage data={result.data} />
    case 'caseStudy':
      return <CaseStudyPage data={result.data} />
    case 'industry':
      return <IndustryPage data={result.data} />
  }
}
