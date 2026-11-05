import { SanityImage as Image } from '@/components/sanity-image'
import { urlFor } from '@/lib/sanity/client'
import { SectionHeader } from '@/components/section-header'

interface GalleryImage {
  _key?: string
  image?: any
  caption?: string
}

interface ImageGallerySectionProps {
  heading?: string
  bodyText?: string
  images?: GalleryImage[]
}

export function ImageGallerySection({ heading, bodyText, images }: ImageGallerySectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
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
          description={bodyText ? (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5c5c5c',
              margin: 0,
            }}>
              {bodyText}
            </p>
          ) : undefined}
        />
        {images && images.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {images.map((item, i) => (
              <div key={item._key || i} className="hh-card-hover" style={{
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 6,
                overflow: 'hidden',
              }}>
                {item.image?.asset ? (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.caption || ''}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    quality={90}
                    style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 800 }}
                  />
                ) : (
                  <div style={{
                    aspectRatio: '16 / 10',
                    background: '#E4E4E4',
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
                {item.caption && (
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: '#5c5c5c',
                    padding: '14px 16px',
                    margin: 0,
                  }}>
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
