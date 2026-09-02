import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { caseStudiesListingQuery } from '@/lib/sanity/queries'
import { ScrollReveal } from '@/components/scroll-reveal'
import { NewsletterForm } from './newsletter-form'

export const metadata: Metadata = {
  title: 'Case Studies — High Horse',
  description:
    'Real results from real businesses. See how High Horse drives leads, sales, and revenue through search-driven performance marketing.',
}

interface CaseStudyListItem {
  _id: string
  clientName: string
  slug: string
  industry?: string
  summary?: string
  logo?: any
  coverImage?: any
  results?: { value: string; label: string }[]
}

export default async function CaseStudiesPage() {
  const caseStudies =
    await sanityFetch<CaseStudyListItem[]>(caseStudiesListingQuery)

  return (
    <main>
      <section style={{ padding: '56px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.4rem, 3vw, 1.875rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#111111',
              marginBottom: 32,
            }}
          >
            Case Studies
          </h1>

          {caseStudies.length === 0 && (
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#5c5c5c' }}>
              No case studies yet. Check back soon.
            </p>
          )}

          <ScrollReveal>
          <div className="cs-listing-grid">
            {caseStudies.map((cs) => (
              <Link
                key={cs._id}
                href={`/${cs.slug}`}
                className="cs-listing-card hh-card-hover"
              >
                <div
                  style={{
                    height: 26,
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {cs.logo?.asset ? (
                    <Image
                      src={urlFor(cs.logo).format('png').url()}
                      alt={cs.clientName}
                      width={80}
                      height={26}
                      unoptimized
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'left',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 36,
                        height: 26,
                        borderRadius: 4,
                        background: '#f5f5f4',
                        border: '1px solid #e4e4e4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 800,
                          fontSize: 9,
                          color: '#8a8a86',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {cs.clientName
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 3)}
                      </span>
                    </div>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 16.5,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    marginBottom: 16,
                    flex: 1,
                  }}
                >
                  {cs.summary}
                </h3>

                <span
                  className="cs-see-link"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1A6AFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  See Case Study
                  <span aria-hidden="true" style={{ transition: 'transform 0.15s' }}>→</span>
                </span>
              </Link>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
      <section style={{ paddingTop: 0, paddingBottom: 56 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="cs-newsletter-panel">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.3rem, 2.6vw, 1.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              Stay Updated
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14.5,
                color: '#b7bcc4',
                maxWidth: 480,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 20,
                lineHeight: 1.55,
              }}
            >
              Get the latest SEO experiments, AI search notes, and growth
              frameworks delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cs-listing-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 22px;
            }
            .cs-listing-card {
              border: 1px solid #e4e4e4;
              border-radius: 16px;
              padding: 24px 22px;
              display: flex;
              flex-direction: column;
              min-height: 190px;
              text-decoration: none;
              color: inherit;
            }
            .cs-listing-card:hover .cs-see-link span[aria-hidden] {
              transform: translateX(3px);
            }
            .cs-newsletter-panel {
              background: #111111;
              border-radius: 20px;
              padding: 56px 40px;
              text-align: center;
            }
            @media (max-width: 860px) {
              .cs-listing-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 560px) {
              .cs-listing-grid { grid-template-columns: 1fr; }
              .cs-newsletter-panel { padding: 40px 22px; }
              .cs-listing-card { padding: 20px 18px; min-height: 160px; }
            }
            @media (max-width: 374px) {
              .cs-listing-card { padding: 18px 16px; min-height: auto; }
              .cs-newsletter-panel { padding: 32px 16px; }
              .cs-listing-grid { gap: 16px; }
            }
          `,
        }}
      />
    </main>
  )
}
