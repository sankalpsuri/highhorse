import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface CtaSectionProps {
  heading?: string
  bodyText?: any[]
  ctaText?: string
  ctaLink?: string
}

export function CtaSection({ heading, bodyText, ctaText, ctaLink }: CtaSectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 24px',
            color: '#111111',
            textAlign: 'left' as const,
          }}>
            {heading}
          </h2>
        )}
        {bodyText && (
          <div style={{
            maxWidth: 800,
            marginBottom: 40,
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
