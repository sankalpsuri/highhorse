import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface HeroSectionProps {
  badgeText?: string
  headline: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  heroImage?: any
}

export function HeroSection({ badgeText, headline, subheadline, ctaText, ctaLink, heroImage }: HeroSectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderBottom: '1px solid #E4E4E4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px 96px' }}>
        {badgeText && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #E4E4E4',
            borderRadius: 100,
            padding: '8px 18px 8px 12px',
            marginBottom: 28,
            boxShadow: '0 4px 12px rgba(16,16,16,0.06)',
          }}>
            <span style={{ font: "500 12.5px 'Poppins', sans-serif", color: '#5c5c5c' }}>{badgeText}</span>
          </div>
        )}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
          lineHeight: 1.1,
          margin: '0 0 24px',
          maxWidth: 720,
          letterSpacing: '-0.01em',
          color: '#111111',
          textAlign: 'left' as const,
        }}>
          {headline}
        </h1>
        {subheadline && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: '#5c5c5c',
            maxWidth: 680,
            margin: '0 0 36px',
            textAlign: 'left' as const,
          }}>
            {subheadline}
          </p>
        )}
        {ctaText && ctaLink && (
          <div style={{ marginBottom: heroImage?.asset ? 56 : 0 }}>
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
          </div>
        )}
        {heroImage?.asset && (
          <Image
            src={urlFor(heroImage).width(1280).auto('format').url()}
            alt={headline}
            width={1280}
            height={600}
            style={{ width: '100%', height: 'auto', borderRadius: 8, marginTop: 16 }}
          />
        )}
      </div>
    </section>
  )
}
