import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'

interface TextImageSectionProps {
  heading?: string
  headingBordered?: boolean
  bodyText?: any[]
  bullets?: string[]
  bulletStyle?: string
  closingText?: string
  ctaText?: string
  ctaLink?: string
  ctaStyle?: string
  image?: any
  imagePosition?: 'left' | 'right'
}

export function TextImageSection({ heading, headingBordered, bodyText, bullets, bulletStyle, closingText, ctaText, ctaLink, ctaStyle, image, imagePosition }: TextImageSectionProps) {
  const hasImage = !!image?.asset
  const expectsImage = !!imagePosition

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.7rem, 2.4vw, 2.2rem)',
    lineHeight: 1.25,
    margin: 0,
    color: '#111111',
    textAlign: 'left' as const,
    ...(headingBordered ? {
      border: '2px solid #1A6AFF',
      borderRadius: 8,
      padding: '14px 22px',
      display: 'inline-block',
    } : {}),
  }

  const bodyBlock = bodyText && (
    <div style={{ color: '#5c5c5c', fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7 }}>
      <PortableText value={bodyText} />
    </div>
  )

  const bulletsBlock = bullets && bullets.length > 0 && (
    bulletStyle === 'stacked' ? (
      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
        {bullets.map((bullet, i) => {
          const sepIdx = bullet.indexOf(' — ')
          const title = sepIdx >= 0 ? bullet.slice(0, sepIdx) : bullet
          const desc = sepIdx >= 0 ? bullet.slice(sepIdx + 3) : null
          return (
            <li key={i} style={{
              padding: '16px 0',
              borderBottom: '1px solid #E4E4E4',
            }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                lineHeight: 1.4,
                color: '#111111',
                margin: desc ? '0 0 6px' : 0,
              }}>
                {title}
              </p>
              {desc && (
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#5c5c5c',
                  margin: 0,
                }}>
                  {desc}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
        {bullets.map((bullet, i) => (
          <li key={i} style={{
            padding: '12px 0',
            borderBottom: '1px solid #E4E4E4',
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: '#5c5c5c',
            }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    )
  )

  const closingBlock = closingText && (
    <p style={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: 16,
      lineHeight: 1.7,
      color: '#5c5c5c',
      margin: '16px 0 0',
    }}>
      {closingText}
    </p>
  )

  const ctaBlock = ctaText && ctaLink && (
    <div style={{ marginTop: 16 }}>
      <Link
        href={ctaLink}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          background: '#0f0f0f',
          color: '#fff',
          padding: '14px 26px',
          borderRadius: ctaStyle === 'rounded' ? 16 : 999,
          textDecoration: 'none',
        }}
      >
        {ctaText}
      </Link>
    </div>
  )

  if (!expectsImage) {
    return (
      <section style={{ background: '#F5F5F4' }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          display: 'flex',
          gap: 64,
          flexWrap: 'wrap' as const,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            {heading && <h2 style={headingStyle}>{heading}</h2>}
          </div>
          <div style={{ flex: '1 1 520px', minWidth: 300 }}>
            {bodyBlock}
            {bulletsBlock}
            {closingBlock}
            {ctaBlock}
          </div>
        </div>
      </section>
    )
  }

  const textBlock = (
    <div style={{ flex: '1 1 480px', minWidth: 300 }}>
      {heading && <h2 style={{ ...headingStyle, margin: '0 0 20px' }}>{heading}</h2>}
      {bodyBlock}
      {ctaBlock}
      {bulletsBlock}
      {closingBlock}
    </div>
  )

  const imageBlock = (
    <div style={{ flex: '1 1 400px', minWidth: 280, maxWidth: 520 }}>
      {hasImage ? (
        <Image
          src={urlFor(image).width(800).auto('format').url()}
          alt={heading || ''}
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      ) : (
        <div style={{
          aspectRatio: '16/10',
          background: '#E4E4E4',
          border: '1px solid #E4E4E4',
          borderRadius: 8,
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
  )

  return (
    <section style={{ background: '#F5F5F4' }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 32px',
        display: 'flex',
        gap: 64,
        flexWrap: 'wrap' as const,
        alignItems: 'center',
      }}>
        {imagePosition === 'left' ? (
          <>{imageBlock}{textBlock}</>
        ) : (
          <>{textBlock}{imageBlock}</>
        )}
      </div>
    </section>
  )
}
