import { SanityImage as Image } from '@/components/sanity-image'
import { urlFor } from '@/lib/sanity/client'
import { IconBadge } from '@/components/icon-badge'
import { SectionHeader } from '@/components/section-header'

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
    <IconBadge size="sm">
      <span style={{ fontSize: 14, fontWeight: 800 }}>✓</span>
    </IconBadge>
  )

  if (layout === 'split') {
    return (
      <section>
        <div className="rsp-grid-split rsp-section" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'start' }}>
          <div>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.28,
                margin: '0 0 var(--heading-to-desc)',
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
                margin: '0 0 var(--desc-to-content)',
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
                src={urlFor(image).url()}
                alt={heading || ''}
                width={1200}
                height={900}
                sizes="(max-width: 767px) 100vw, 520px"
                quality={90}
                style={{ width: '100%', height: 'auto', borderRadius: 16, maxWidth: 800 }}
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
          src={urlFor(image).url()}
          alt={heading || ''}
          width={1200}
          height={750}
          sizes="(max-width: 767px) 100vw, 520px"
          quality={90}
          style={{ width: '100%', height: 'auto', borderRadius: 8, maxWidth: 800 }}
        />
      </div>
    )

    const contentBlock = (
      <div style={{ flex: '1 1 480px', minWidth: 300 }}>
        <SectionHeader
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
        {items && items.length > 0 && (
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <IconBadge size="sm">
                  <span style={{ fontSize: 14, fontWeight: 800 }}>✓</span>
                </IconBadge>
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
      <div className="rsp-section">
        <SectionHeader
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
                <IconBadge size="sm">
                  <span style={{ fontSize: 14, fontWeight: 800 }}>✓</span>
                </IconBadge>
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
