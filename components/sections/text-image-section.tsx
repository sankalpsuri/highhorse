import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'

interface TextImageSectionProps {
  eyebrow?: string
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

export function TextImageSection({ eyebrow, heading, headingBordered, bodyText, bullets, bulletStyle, closingText, ctaText, ctaLink, ctaStyle, image, imagePosition }: TextImageSectionProps) {
  const hasImage = !!image?.asset
  const expectsImage = !!imagePosition

  const eyebrowBlock = eyebrow && (
    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: '11.5px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: '#1A6AFF',
      marginBottom: 16,
    }}>
      {eyebrow}
    </div>
  )

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
    lineHeight: 1.16,
    margin: 0,
    color: '#111111',
    maxWidth: 560,
    textAlign: 'left' as const,
    ...(headingBordered ? {
      border: '2px solid #1A6AFF',
      borderRadius: 8,
      padding: '14px 22px',
      display: 'inline-block',
    } : {}),
  }

  const bodyBlock = bodyText && (
    <div style={{ color: '#55555A', fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7 }}>
      <PortableText value={bodyText} />
    </div>
  )

  const bulletsBlock = bullets && bullets.length > 0 && (
    bulletStyle === 'stacked' ? (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 22, margin: '20px 0 0' }}>
        {bullets.map((bullet, i) => {
          const sepIdx = bullet.indexOf(' — ')
          const title = sepIdx >= 0 ? bullet.slice(0, sepIdx) : bullet
          const desc = sepIdx >= 0 ? bullet.slice(sepIdx + 3) : null
          return (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9D2E', flexShrink: 0, marginTop: 9 }} />
              <div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 16.5,
                  lineHeight: 1.4,
                  color: '#111111',
                  marginBottom: desc ? 6 : 0,
                }}>
                  {title}
                </div>
                {desc && (
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: '#55555A',
                  }}>
                    {desc}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2, marginBottom: 28 }}>
        {bullets.map((bullet, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            padding: '14px 0',
            borderBottom: '1px solid #E6E6E4',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A6AFF', flexShrink: 0, marginTop: 8 }} />
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15.5,
              lineHeight: 1.55,
              color: '#3A3A3E',
            }}>
              {bullet}
            </span>
          </div>
        ))}
      </div>
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
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          background: '#0A0A0C',
          color: '#fff',
          padding: '15px 26px',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        {ctaText}
      </Link>
    </div>
  )

  if (!expectsImage && bulletsBlock) {
    return (
      <section style={{ background: '#F5F5F4' }}>
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          display: 'flex',
          gap: 64,
          flexWrap: 'wrap' as const,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            {eyebrowBlock}
            {heading && <h2 style={{ ...headingStyle, margin: '0 0 20px' }}>{heading}</h2>}
            {bodyBlock}
            {closingBlock}
            {ctaBlock}
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            {bulletsBlock}
          </div>
        </div>
      </section>
    )
  }

  if (!expectsImage) {
    return (
      <section style={{ background: '#F5F5F4' }}>
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          display: 'flex',
          gap: 64,
          flexWrap: 'wrap' as const,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            {eyebrowBlock}
            {heading && <h2 style={headingStyle}>{heading}</h2>}
          </div>
          <div style={{ flex: '1 1 520px', minWidth: 300 }}>
            {bodyBlock}
            {closingBlock}
            {ctaBlock}
          </div>
        </div>
      </section>
    )
  }

  const textBlock = (
    <div style={{ flex: '1 1 460px', minWidth: 300 }}>
      {eyebrowBlock}
      {heading && <h2 style={{ ...headingStyle, margin: '0 0 20px' }}>{heading}</h2>}
      {bodyBlock}
      {bulletsBlock}
      {closingBlock}
      {ctaBlock}
    </div>
  )

  const imageBlock = (
    <div style={{ flex: '1 1 420px', minWidth: 300 }}>
      <div style={{ border: '1px solid #E6E6E4', borderRadius: 16, background: '#fff', padding: 26, boxShadow: '0 18px 40px rgba(10,10,12,0.05)' }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#F7F7F6', border: '1px solid #E6E6E4', aspectRatio: '4/3', minHeight: 300 }}>
          {hasImage ? (
            <Image
              src={urlFor(image).width(1200).auto('format').url()}
              alt={heading || ''}
              width={1200}
              height={900}
              sizes="(max-width: 767px) 100vw, 520px"
              quality={90}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
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
    </div>
  )

  return (
    <section style={{ background: '#F7F7F6', borderTop: '1px solid #EAEAE8', borderBottom: '1px solid #EAEAE8' }}>
      <div className="rsp-section" style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 32px',
        display: 'flex',
        gap: 56,
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
