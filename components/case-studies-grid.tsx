import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { homeFeaturedCaseStudiesQuery } from '@/lib/sanity/queries'
import styles from '@/app/home.module.css'

interface CaseStudyCard {
  _id: string
  clientName: string
  slug: string
  industry: string | null
  summary: string | null
  coverImage: any
}

const industryLabels: Record<string, string> = {
  'bfsi': 'Finance (BFSI)',
  'ecommerce-retail': 'Ecommerce & Retail',
  'healthcare': 'Healthcare',
  'education': 'Education',
  'travel-tourism': 'Travel & Tourism',
  'logistics': 'Logistics',
  'real-estate': 'Real Estate',
  'saas': 'SaaS',
}

export async function CaseStudiesGrid() {
  const caseStudies = await sanityFetch<CaseStudyCard[]>(homeFeaturedCaseStudiesQuery)

  if (caseStudies.length === 0) {
    return (
      <div className={styles.caseGrid}>
        <div className={styles.caseEmpty}>
          Case studies coming soon. Mark case studies as &ldquo;Featured&rdquo; in Sanity Studio to display them here.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.caseGrid}>
      {caseStudies.map((cs) => {
        const validSlug = cs.slug && !/\s/.test(cs.slug)
        const content = (
          <>
            <div className={styles.caseImage}>
              {cs.coverImage && (
                <Image
                  src={urlFor(cs.coverImage).width(600).height(450).auto('format').url()}
                  alt={cs.clientName}
                  width={600}
                  height={450}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
            <div className={styles.caseBody}>
              {cs.industry && (
                <div className={styles.caseSector}>
                  {industryLabels[cs.industry] ?? cs.industry}
                </div>
              )}
              <div className={styles.caseName}>{cs.clientName}</div>
              {cs.summary && <div className={styles.caseBlurb}>{cs.summary}</div>}
            </div>
          </>
        )
        return validSlug ? (
          <Link key={cs._id} href={`/${cs.slug}`} className={styles.caseCard}>
            {content}
          </Link>
        ) : (
          <div key={cs._id} className={styles.caseCard}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
