import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

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
        {bodyText && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#5c5c5c',
            maxWidth: 680,
            margin: '0 0 48px',
          }}>
            {bodyText}
          </p>
        )}
        {images && images.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {images.map((item, i) => (
              <div key={item._key || i} style={{
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 6,
                overflow: 'hidden',
              }}>
                {item.image?.asset ? (
                  <Image
                    src={urlFor(item.image).width(800).auto('format').url()}
                    alt={item.caption || ''}
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
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
