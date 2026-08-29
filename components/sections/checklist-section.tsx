import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface ChecklistSectionProps {
  layout?: string
  heading?: string
  subtext?: string
  items?: string[]
  image?: any
  imagePosition?: 'left' | 'right'
}

export function ChecklistSection({ layout, heading, subtext, items, image, imagePosition }: ChecklistSectionProps) {
  const checkIcon = (
    <span style={{
      flexShrink: 0,
      width: 22,
      height: 22,
      borderRadius: 6,
      background: 'rgba(26, 106, 255, 0.1)',
      color: '#1A6AFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 800,
      marginTop: 2,
    }}>
      ✓
    </span>
  )

  if (layout === 'split') {
    return (
      <section>
        <div className="rsp-grid-split rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'start' }}>
          <div>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.28,
                margin: '0 0 14px',
                color: '#111111',
              }}>
                {heading}
              </h2>
            )}
            {subtext && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: '#5c5c5c',
                margin: '0 0 22px',
              }}>
                {subtext}
              </p>
            )}
            {items && items.length > 0 && (
              <div style={{ display: 'grid', gap: 12 }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {checkIcon}
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14.5,
                      color: '#5c5c5c',
                      margin: 0,
                      lineHeight: 1.6,
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            {image?.asset ? (
              <Image
                src={urlFor(image).width(800).auto('format').url()}
                alt={heading || ''}
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: 16 }}
              />
            ) : (
              <div style={{
                aspectRatio: '4 / 3',
                background: '#E4E4E4',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                color: '#8a8a86',
              }}>
                Image placeholder
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  const hasImage = !!image?.asset
  if (hasImage) {
    const imgBlock = (
      <div style={{ flex: '1 1 400px', minWidth: 280, maxWidth: 520 }}>
        <Image
          src={urlFor(image).width(800).auto('format').url()}
          alt={heading || ''}
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      </div>
    )

    const contentBlock = (
      <div style={{ flex: '1 1 480px', minWidth: 300 }}>
        <div style={{ marginBottom: 28 }}>
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
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'rgba(26, 106, 255, 0.1)',
                  color: '#1A6AFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                }}>
                  ✓
                </span>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14.5,
                  color: '#5c5c5c',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    )

    return (
      <section>
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          display: 'flex',
          gap: 64,
          flexWrap: 'wrap' as const,
          alignItems: 'center',
        }}>
          {imagePosition === 'left' ? <>{imgBlock}{contentBlock}</> : <>{contentBlock}{imgBlock}</>}
        </div>
      </section>
    )
  }

  return (
    <section>
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
            gap: '16px 32px',
          }}>
            {items.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}>
                <span style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'rgba(26, 106, 255, 0.1)',
                  color: '#1A6AFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                }}>
                  ✓
                </span>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14.5,
                  color: '#5c5c5c',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
