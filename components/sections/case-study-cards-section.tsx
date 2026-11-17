import { SanityImage as Image } from '@/components/sanity-image'
import { urlFor } from '@/lib/sanity/client'
import { SectionHeader } from '@/components/section-header'

const brandColor = { bg: 'rgba(26, 106, 255, 0.06)', border: '#CFE0FF' }

interface CaseStudyCard {
  _key?: string
  clientName: string
  badgeColor?: string
  resultChartImage?: any
  results?: string[]
}

interface CaseStudyCardsSectionProps {
  eyebrow?: string
  heading?: string
  subtext?: string
  headerLayout?: string
  background?: string
  variant?: string
  cards?: CaseStudyCard[]
  accentStyle?: string
}

const sectionEyebrowStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '11.5px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#1A6AFF',
}

export function CaseStudyCardsSection({ eyebrow, heading, subtext, headerLayout, background, variant, cards }: CaseStudyCardsSectionProps) {
  const isFeatured = variant === 'featured'
  if (!cards || cards.length === 0) return null
  const isSplit = headerLayout === 'split'
  const sectionBg = background === 'cream' ? '#F5F5F4' : background === 'white' ? '#FFFFFF' : undefined

  return (
    <section style={sectionBg ? { background: sectionBg, borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' } : undefined}>
      <div className="rsp-section">
        <SectionHeader
          layout={isSplit ? 'split' : 'stacked'}
          eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
          heading={heading ? (
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
              lineHeight: 1.2,
              margin: 0,
              color: '#111111',
            }}>
              {heading}
            </h2>
          ) : <span />}
          description={subtext ? (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5c5c5c',
              margin: 0,
            }}>
              {subtext}
            </p>
          ) : undefined}
        />
        <div className="rsp-grid-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {cards.map((card, idx) => (
            <div
              key={card._key || idx}
              className="hh-card-hover"
              style={{
                background: isFeatured ? '#F1F6FF' : brandColor.bg,
                border: `1px solid ${isFeatured ? '#C9D8FB' : brandColor.border}`,
                borderRadius: 18,
                padding: isFeatured ? 22 : 20,
                display: 'flex',
                flexDirection: 'column' as const,
                gap: isFeatured ? 20 : 0,
              }}
            >
              {card.resultChartImage?.asset ? (
                <div style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  ...(!isFeatured ? { marginBottom: 14 } : {}),
                  ...(isFeatured ? { background: '#fff', boxShadow: '0 4px 14px rgba(10,10,12,0.06)' } : {}),
                }}>
                  <Image
                    src={urlFor(card.resultChartImage).url()}
                    alt={`${card.clientName} chart`}
                    width={1200}
                    height={400}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={90}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ) : (
                <div style={{
                  height: 70,
                  borderRadius: 10,
                  ...(!isFeatured ? { marginBottom: 14 } : {}),
                  background: '#E4E4E4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12,
                  color: '#8a8a86',
                }}>
                  Chart image placeholder
                </div>
              )}

              <div style={isFeatured ? { padding: '0 4px 4px', display: 'flex', flexDirection: 'column' as const, gap: 10 } : undefined}>
                <h4 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: isFeatured ? 17 : 15,
                  lineHeight: 1.3,
                  margin: isFeatured ? 0 : '14px 0 8px',
                  color: '#0A0A0C',
                }}>
                  For {card.clientName}
                </h4>
                {card.results && card.results.length > 0 && (
                  isFeatured ? (
                    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, fontFamily: "'Poppins', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: '#55555A' }}>
                      {card.results.map((r, i) => (
                        <span key={i}>&mdash; {r}</span>
                      ))}
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', fontSize: '13px', color: '#5c5c5c', fontFamily: "'Poppins', sans-serif", padding: 0, margin: 0 }}>
                      {card.results.map((r, i) => (
                        <li key={i} style={{ marginBottom: 4, paddingLeft: 14, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0 }}>&mdash;</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
