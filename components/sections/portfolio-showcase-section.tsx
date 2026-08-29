import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface PortfolioItem {
  _key?: string
  tag?: string
  title?: string
  description?: string
  image?: any
}

interface PortfolioShowcaseSectionProps {
  heading?: string
  subtext?: string
  items?: PortfolioItem[]
}

export function PortfolioShowcaseSection({ heading, subtext, items }: PortfolioShowcaseSectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
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
              margin: 0,
            }}>
              {subtext}
            </p>
          )}
        </div>
        {items && items.length > 0 && (
          <div className="rsp-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}>
            {items.map((item, i) => (
              <div key={item._key || i} style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #E4E4E4',
                background: '#fff',
              }}>
                <div style={{
                  aspectRatio: '16 / 10',
                  background: 'linear-gradient(160deg, #1c2740, #0B0F19)',
                  position: 'relative' as const,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.image?.asset && (
                    <Image
                      src={urlFor(item.image).width(600).auto('format').url()}
                      alt={item.title || ''}
                      width={600}
                      height={375}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  {item.tag && (
                    <span style={{
                      position: 'absolute' as const,
                      top: 16,
                      left: 16,
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase' as const,
                      padding: '6px 12px',
                      borderRadius: 999,
                      backdropFilter: 'blur(4px)',
                    }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: 22 }}>
                  {item.title && (
                    <h3 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      margin: '0 0 8px',
                      color: '#111111',
                    }}>
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      color: '#5c5c5c',
                      margin: 0,
                      lineHeight: 1.6,
                    }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
