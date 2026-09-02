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
  const isBlue = variant === 'blue'
  const bg = isBlue ? '#1A6AFF' : variant === 'tan' ? '#FAF3EB' : '#F5F5F4'
  const centered = textAlign === 'center'

  return (
    <section style={{ background: bg, borderTop: isBlue ? 'none' : '1px solid #E4E4E4', borderBottom: isBlue ? 'none' : '1px solid #E4E4E4', position: 'relative', overflow: 'hidden' }}>
      <div className="hh-grid-bg" aria-hidden="true" style={isBlue ? { backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)' } : undefined} />
      <div className="hh-glow-blue" aria-hidden="true" style={{ top: 'auto', bottom: -100, right: 'auto', left: -100, ...(isBlue ? { background: 'radial-gradient(circle, rgba(255,255,255,0.24), rgba(255,255,255,0) 70%)' } : {}) }} />
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: isBlue ? '80px 32px' : '96px 32px', textAlign: centered ? 'center' as const : 'left' as const, position: 'relative' }}>
        <div style={isBlue ? { display: 'flex', gap: 48, flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between' } : undefined}>
          <div style={isBlue ? { flex: '1 1 520px', minWidth: 300 } : undefined}>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.2,
                margin: '0 0 24px',
                color: isBlue ? '#fff' : '#111111',
              }}>
                {heading}
              </h2>
            )}
            {bodyText && (
              <div style={{
                maxWidth: centered ? 560 : isBlue ? 560 : 800,
                margin: centered ? '0 auto 40px' : isBlue ? 0 : '0 0 40px',
                color: isBlue ? 'rgba(255,255,255,0.86)' : '#5c5c5c',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
              }}>
                <PortableText value={bodyText} />
              </div>
            )}
            {!isBlue && ctaText && ctaLink && (
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
          {isBlue && ctaText && ctaLink && (
            <Link
              href={ctaLink}
              style={{
                flex: '0 0 auto',
                display: 'inline-block',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                background: '#fff',
                color: '#0A0A0C',
                padding: '17px 30px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
