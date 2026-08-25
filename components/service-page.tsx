import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextBody } from '@/components/portable-text-body'
import { HeroSection } from '@/components/sections/hero-section'
import { TextImageSection } from '@/components/sections/text-image-section'
import { CardGridSection } from '@/components/sections/card-grid-section'
import { CtaSection } from '@/components/sections/cta-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ProcessStepsSection } from '@/components/sections/process-steps-section'
import { ImageGallerySection } from '@/components/sections/image-gallery-section'
import { ClientProofSection } from '@/components/sections/client-proof-section'
import { PortfolioMasonryGrid } from '@/components/sections/portfolio-masonry-grid'
import { ChallengeGridSection } from '@/components/sections/challenge-grid-section'
import { ChecklistSection } from '@/components/sections/checklist-section'
import { PortfolioShowcaseSection } from '@/components/sections/portfolio-showcase-section'
import { TechSliderSection } from '@/components/sections/tech-slider-section'
import { CaseStudyCardsSection } from '@/components/sections/case-study-cards-section'
import { FaqAccordion } from '@/components/faq-accordion'

interface CaseStudyEntry {
  _key?: string
  metricsFilterTag?: string
  overrideMetrics?: { value: string; label: string }[]
  caseStudy: {
    clientName: string
    slug: string
    industry?: string
    summary?: string
    logo?: any
    coverImage?: any
    resultImages?: any[]
    results?: { value: string; label: string }[]
    proofImage?: any
  }
}

interface ServicePageProps {
  data: {
    _id: string
    title: string
    summary?: string
    accentStyle?: string
    pageBuilder?: any[]
    caseStudiesHeading?: string
    caseStudiesSubtext?: string
    relatedCaseStudies?: CaseStudyEntry[]
    relatedFaqs?: { _id: string; question: string; answer: any; order?: number }[]
  }
}

const caseStudyColors = ['#DBEAFE', '#EDE9FE', '#FFEDD5', '#D1FAE5']

function PageBuilderSection({ block, relatedCaseStudies, accentStyle }: { block: any; relatedCaseStudies?: CaseStudyEntry[]; accentStyle?: string }) {
  switch (block._type) {
    case 'heroSection':
      return <HeroSection {...block} />
    case 'textImageSection':
      return <TextImageSection {...block} />
    case 'cardGridSection':
      return <CardGridSection {...block} accentStyle={accentStyle} />
    case 'ctaSection':
      return <CtaSection {...block} />
    case 'statsSection':
      return <StatsSection {...block} />
    case 'processStepsSection':
      return <ProcessStepsSection {...block} />
    case 'imageGallerySection':
      return <ImageGallerySection {...block} />
    case 'clientProofSection': {
      const flatStudies = relatedCaseStudies?.map((e) => e.caseStudy)
      return <ClientProofSection {...block} caseStudies={flatStudies} />
    }
    case 'portfolioMasonryGrid':
      return <PortfolioMasonryGrid {...block} />
    case 'challengeGridSection':
      return <ChallengeGridSection {...block} />
    case 'checklistSection':
      return <ChecklistSection {...block} />
    case 'portfolioShowcaseSection':
      return <PortfolioShowcaseSection {...block} />
    case 'techSliderSection':
      return <TechSliderSection {...block} />
    case 'caseStudyCardsSection':
      return <CaseStudyCardsSection {...block} accentStyle={accentStyle} />
    default:
      return null
  }
}

export function ServicePage({ data }: ServicePageProps) {
  const csHeading = data.caseStudiesHeading || 'How Our Strategies Turned Search Demand Into Revenue'
  const csSubtext = data.caseStudiesSubtext || 'SEO strategies convert search demand into measurable revenue by attracting high-intent traffic, improving conversions, and delivering consistent business growth.'

  return (
    <article>
      {data.pageBuilder?.map((block) => (
        <PageBuilderSection
          key={block._key}
          block={block}
          relatedCaseStudies={data.relatedCaseStudies}
          accentStyle={data.accentStyle}
        />
      ))}

      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && !data.pageBuilder?.some((b) => b._type === 'caseStudyCardsSection') && (
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
              {csHeading}
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5c5c5c',
              maxWidth: 680,
              margin: '0 0 48px',
            }}>
              {csSubtext}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
            }}>
              {data.relatedCaseStudies.map((entry, idx) => {
                const cs = entry.caseStudy
                const metrics = entry.overrideMetrics?.length ? entry.overrideMetrics : cs.results
                const isMulti = data.accentStyle === 'multi'
                const cardBg = isMulti ? caseStudyColors[idx % caseStudyColors.length] : '#FFFFFF'
                const cardBorder = isMulti ? 'none' : '1px solid #E4E4E4'
                return (
                <Link
                  key={entry._key || cs.slug}
                  href={`/${cs.slug}`}
                  style={{
                    display: 'block',
                    background: cardBg,
                    border: cardBorder,
                    borderRadius: 10,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {cs.coverImage?.asset ? (
                    <Image
                      src={urlFor(cs.coverImage).width(600).auto('format').url()}
                      alt={cs.clientName}
                      width={600}
                      height={340}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      aspectRatio: '16 / 9',
                      display: 'flex',
                      alignItems: 'left',
                      justifyContent: 'left',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      color: '#8a8a86',
                    }}>
                      Image placeholder
                    </div>
                  )}
                  <div style={{ padding: '24px 28px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        color: '#111111',
                        margin: 0,
                      }}>
                        {cs.clientName}
                      </p>
                      {entry.metricsFilterTag && (
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#1A6AFF',
                          background: 'rgba(26, 106, 255, 0.08)',
                          padding: '2px 8px',
                          borderRadius: 100,
                        }}>
                          {entry.metricsFilterTag}
                        </span>
                      )}
                    </div>
                    {metrics && metrics.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {metrics.slice(0, 3).map((r, i) => (
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
                  </div>
                </Link>
                )
              })}
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
