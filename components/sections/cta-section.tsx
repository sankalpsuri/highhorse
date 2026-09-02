import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface CtaSectionProps {
  heading?: string
  bodyText?: any[]
  ctaText?: string
  ctaLink?: string
  variant?: string
  textAlign?: string
}

export function CtaSection({ heading, bodyText, ctaText, ctaLink, variant, textAlign }: CtaSectionProps) {
  const bg = variant === 'tan' ? '#FAF3EB' : '#F5F5F4'
  const centered = textAlign === 'center'

  return (
    <section style={{ background: bg, borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4', position: 'relative', overflow: 'hidden' }}>
      <div className="hh-grid-bg" aria-hidden="true" />
      <div className="hh-glow-blue" aria-hidden="true" style={{ top: 'auto', bottom: -100, right: 'auto', left: -100 }} />
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', textAlign: centered ? 'center' as const : 'left' as const, position: 'relative' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 24px',
            color: '#111111',
          }}>
            {heading}
          </h2>
        )}
        {bodyText && (
          <div style={{
            maxWidth: centered ? 560 : 800,
            margin: centered ? '0 auto 40px' : '0 0 40px',
            color: '#5c5c5c',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
          }}>
            <PortableText value={bodyText} />
          </div>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="hh-btn-hover"
            style={{
              display: 'inline-block',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              background: '#1A6AFF',
              color: '#fff',
              padding: '15px 30px',
              borderRadius: 5,
              textDecoration: 'none',
            }}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
