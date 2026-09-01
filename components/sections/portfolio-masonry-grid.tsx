import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface MasonryItem {
  _key?: string
  image?: any
  badgeText?: string
  mediaType?: string
}

interface PortfolioMasonryGridProps {
  heading?: string
  subtext?: string
  items?: MasonryItem[]
}

const placeholderHeights = [340, 240, 300, 220, 360, 260]

export function PortfolioMasonryGrid({ heading, subtext, items }: PortfolioMasonryGridProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
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
            maxWidth: 680,
            margin: '0 0 48px',
          }}>
            {subtext}
          </p>
        )}
        {items && items.length > 0 && (
          <div style={{
            columnCount: 3,
            columnGap: 16,
          }}>
            {items.map((item, i) => {
              const hasImage = !!item.image?.asset
              const height = placeholderHeights[i % placeholderHeights.length]
              return (
                <div key={item._key || i} style={{
                  breakInside: 'avoid',
                  marginBottom: 16,
                  position: 'relative',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                  {hasImage ? (
                    <Image
                      src={urlFor(item.image).width(1200).auto('format').url()}
                      alt={item.badgeText || `Portfolio item ${i + 1}`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 767px) 100vw, 33vw"
                      quality={90}
                      style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 600 }}
                    />
                  ) : (
                    <div style={{
                      height,
                      background: '#E4E4E4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 13,
                      color: '#8a8a86',
                    }}>
                      {item.mediaType === 'video-thumbnail' ? 'Video placeholder' : 'Image placeholder'}
                    </div>
                  )}
                  {item.badgeText && (
                    <span style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: 4,
                    }}>
                      {item.badgeText}
                    </span>
                  )}
                  {item.mediaType === 'video-thumbnail' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderLeft: '14px solid #fff',
                        borderTop: '9px solid transparent',
                        borderBottom: '9px solid transparent',
                        marginLeft: 3,
                      }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
