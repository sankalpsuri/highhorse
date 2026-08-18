import Link from 'next/link'
import { PortableTextBody } from '@/components/portable-text-body'
import { HeroSection } from '@/components/sections/hero-section'
import { TextImageSection } from '@/components/sections/text-image-section'
import { CardGridSection } from '@/components/sections/card-grid-section'
import { CtaSection } from '@/components/sections/cta-section'
import { StatsSection } from '@/components/sections/stats-section'
import { FaqAccordion } from '@/components/faq-accordion'

interface ServicePageProps {
  data: {
    _id: string
    title: string
    summary?: string
    pageBuilder?: any[]
    relatedCaseStudies?: {
      clientName: string
      slug: string
      industry?: string
      summary?: string
      results?: { value: string; label: string }[]
    }[]
    relatedFaqs?: { _id: string; question: string; answer: any; order?: number }[]
  }
}

function PageBuilderSection({ block }: { block: any }) {
  switch (block._type) {
    case 'heroSection':
      return <HeroSection {...block} />
    case 'textImageSection':
      return <TextImageSection {...block} />
    case 'cardGridSection':
      return <CardGridSection {...block} />
    case 'ctaSection':
      return <CtaSection {...block} />
    case 'statsSection':
      return <StatsSection {...block} />
    default:
      return null
  }
}

export function ServicePage({ data }: ServicePageProps) {
  return (
    <article>
      {data.pageBuilder?.map((block) => (
        <PageBuilderSection key={block._key} block={block} />
      ))}

      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && (
        <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
              lineHeight: 1.2,
              margin: '0 0 16px',
              color: '#111111',
            }}>
              How Our Strategies Turned Search Demand Into Revenue
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5c5c5c',
              maxWidth: 680,
              margin: '0 0 48px',
            }}>
              SEO strategies convert search demand into measurable revenue by attracting high-intent traffic, improving conversions, and delivering consistent business growth.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {data.relatedCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/${cs.slug}`}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid #E4E4E4',
                    borderRadius: 6,
                    padding: '28px 24px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#111111',
                    margin: '0 0 16px',
                  }}>
                    {cs.clientName}
                  </p>
                  {cs.results && cs.results.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {cs.results.slice(0, 3).map((r, i) => (
                        <div key={i}>
                          <span style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 800,
                            fontSize: 22,
                            color: '#111111',
                          }}>
                            {r.value}
                          </span>
                          <span style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: 13,
                            color: '#5c5c5c',
                            marginLeft: 8,
                          }}>
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.relatedFaqs && data.relatedFaqs.length > 0 && (
        <section style={{
          background: '#F5F5F4',
          borderTop: '1px solid #E4E4E4',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
              lineHeight: 1.2,
              margin: '0 0 32px',
              color: '#111111',
            }}>
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={data.relatedFaqs} />
          </div>
        </section>
      )}
    </article>
  )
}
