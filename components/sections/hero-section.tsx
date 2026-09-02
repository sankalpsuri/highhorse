import Link from 'next/link'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { urlFor } from '@/lib/sanity/client'

interface HeroSectionProps {
  badgeText?: string
  badgeStyle?: string
  headline: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  heroImage?: any
  textAlign?: string
  mobileImageSquare?: boolean
}

export function HeroSection({ badgeText, badgeStyle, headline, subheadline, ctaText, ctaLink, heroImage, textAlign, mobileImageSquare }: HeroSectionProps) {
  const centered = textAlign === 'center'

  return (
    <section style={{ background: '#F5F5F4', borderBottom: '1px solid #E4E4E4', position: 'relative', overflow: 'hidden' }}>
      <div className="hh-grid-bg" aria-hidden="true" />
      <div className="hh-glow-blue" aria-hidden="true" />
      <div className="rsp-hero-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px 96px', textAlign: centered ? 'center' as const : 'left' as const, position: 'relative' }}>
        {badgeText && badgeStyle === 'eyebrow' ? (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 14,
          }}>
            <span style={{ width: 18, height: 2, background: '#1A6AFF', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: '#1A6AFF',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
            }}>
              {badgeText}
            </span>
          </div>
        ) : badgeText ? (
          <a
            href="https://partnersdirectory.withgoogle.com/partners/6812870132"
            target="_blank"
            rel="noopener noreferrer"
            className="google-partner-badge"
          >
            <FcGoogle style={{ fontSize: 18, flexShrink: 0 }} />
            <span style={{ font: "500 12.5px 'Poppins', sans-serif", color: '#5c5c5c' }}>{badgeText}</span>
          </a>
        ) : null}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
          lineHeight: 1.1,
          margin: centered ? '0 auto 24px' : '0 0 24px',
          maxWidth: centered ? 760 : 720,
          letterSpacing: '-0.01em',
          color: '#111111',
        }}>
          {headline}
        </h1>
        {subheadline && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: '#5c5c5c',
            maxWidth: centered ? 600 : 680,
            margin: centered ? '0 auto 36px' : '0 0 36px',
          }}>
            {subheadline}
          </p>
        )}
        {ctaText && ctaLink && (
          <div style={{ marginBottom: heroImage ? 56 : 0 }}>
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
          </div>
        )}
        {heroImage?.asset ? (
          <div className={mobileImageSquare ? 'hero-img-mobile-square' : undefined} style={{ marginTop: 16 }}>
            <Image
              src={urlFor(heroImage).width(2560).auto('format').url()}
              alt={headline}
              width={2560}
              height={1200}
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={90}
              style={{ width: '100%', height: 'auto', borderRadius: 8, maxWidth: 1280 }}
            />
          </div>
        ) : heroImage ? (
          <div style={{
            marginTop: 48,
            aspectRatio: '16 / 7',
            background: 'linear-gradient(135deg, #EDE9FB 0%, #E4EAFC 55%, #E9EFFD 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 14,
            color: '#8a8a86',
          }}>
            Hero image placeholder
          </div>
        ) : null}
      </div>
    </section>
  )
}
