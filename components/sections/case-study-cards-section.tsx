import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

const brandColor = { bg: 'rgba(26, 106, 255, 0.06)', border: '#CFE0FF' }

interface CaseStudyCard {
  _key?: string
  clientName: string
  badgeColor?: string
  resultChartImage?: any
  results?: string[]
}

interface CaseStudyCardsSectionProps {
  heading?: string
  subtext?: string
  cards?: CaseStudyCard[]
  accentStyle?: string
}

export function CaseStudyCardsSection({ heading, subtext, cards }: CaseStudyCardsSectionProps) {
  if (!cards || cards.length === 0) return null

  return (
    <section>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 16px',
            color: '#111111',
          }}>
            {heading}
          </h2>
        )}
        {subtext && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#5c5c5c',
            maxWidth: 640,
            margin: '0 0 32px',
          }}>
            {subtext}
          </p>
        )}
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
                background: brandColor.bg,
                border: `1px solid ${brandColor.border}`,
                borderRadius: 18,
                padding: 20,
              }}
            >
              {card.resultChartImage?.asset ? (
                <div style={{ marginBottom: 14, borderRadius: 10, overflow: 'hidden' }}>
                  <Image
                    src={urlFor(card.resultChartImage).width(1200).auto('format').url()}
                    alt={`${card.clientName} chart`}
                    width={1200}
                    height={400}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={90}
                    style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 600 }}
                  />
                </div>
              ) : (
                <div style={{
                  height: 70,
                  borderRadius: 10,
                  marginBottom: 14,
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

              <h4 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                margin: '14px 0 8px',
                color: '#161616',
              }}>
                For {card.clientName}
              </h4>
              {card.results && card.results.length > 0 && (
                <ul style={{ listStyle: 'none', fontSize: '13px', color: '#5c5c5c', fontFamily: "'Poppins', sans-serif", padding: 0, margin: 0 }}>
                  {card.results.map((r, i) => (
                    <li key={i} style={{ marginBottom: 4, paddingLeft: 14, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>&mdash;</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
