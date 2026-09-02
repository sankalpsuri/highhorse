import Link from 'next/link'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { urlFor } from '@/lib/sanity/client'

interface ServiceTag {
  _key?: string
  label?: string
  href?: string
}

interface HeroSectionProps {
  badgeText?: string
  badgeStyle?: string
  eyebrowText?: string
  eyebrowDotColor?: string
  heroWidget?: string
  headline: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  relatedServiceTags?: ServiceTag[]
  heroImage?: any
  textAlign?: string
  mobileImageSquare?: boolean
}

const dotColors: Record<string, string> = {
  orange: '#FF9D2E',
  blue: '#1A6AFF',
  green: '#22C55E',
}

function SponsoredPlacementWidget() {
  return (
    <div style={{ flex: '1 1 400px', minWidth: 320, position: 'relative' }}>
      <div style={{
        border: '1px solid #E6E6E4',
        borderRadius: 16,
        background: '#0A0A0C',
        color: '#F5F5F4',
        padding: 22,
        boxShadow: '0 30px 60px rgba(10,10,12,0.22)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -110, right: -70, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(26,106,255,0.4),rgba(26,106,255,0) 68%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, position: 'relative' }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '10.5px', letterSpacing: '0.11em', textTransform: 'uppercase' as const, color: '#FF9D2E' }}>Sponsored placement</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2E2E31' }} />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2E2E31' }} />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1A6AFF' }} />
          </div>
        </div>
        <div style={{
          border: '1px solid #232326',
          borderRadius: 10,
          background: '#131316',
          padding: '14px 16px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 14.5,
          lineHeight: 1.5,
          color: '#F5F5F4',
          position: 'relative',
        }}>
          <span style={{ color: '#6a6a67', marginRight: 6 }}>›</span>which option is best for a team our size?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 9, marginTop: 16, position: 'relative' }}>
          <div style={{ height: 9, borderRadius: 4, background: '#232326', width: '92%' }} />
          <div style={{ height: 9, borderRadius: 4, background: '#232326', width: '76%' }} />
          <div style={{
            border: '1px solid #FF9D2E',
            borderRadius: 12,
            background: 'rgba(255,157,46,0.09)',
            padding: 16,
            marginTop: 8,
            display: 'flex',
            gap: 14,
            alignItems: 'center',
          }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#1C1C1F', border: '1px solid #2E2E31', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#FF9D2E', marginBottom: 6 }}>Sponsored</div>
              <div style={{ height: 8, borderRadius: 4, background: '#2E2E31', width: '80%', marginBottom: 6 }} />
              <div style={{ height: 8, borderRadius: 4, background: '#232326', width: '56%' }} />
            </div>
          </div>
          <div style={{ height: 9, borderRadius: 4, background: '#232326', width: '64%', marginTop: 8 }} />
        </div>
      </div>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, lineHeight: 1.5, color: '#9A9A96', marginTop: 14, padding: '0 4px' }}>
        Illustrative mockup of a sponsored placement in a conversational answer.
      </div>
    </div>
  )
}

export function HeroSection({ badgeText, badgeStyle, eyebrowText, eyebrowDotColor, heroWidget, headline, subheadline, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, relatedServiceTags, heroImage, textAlign, mobileImageSquare }: HeroSectionProps) {
  const centered = textAlign === 'center'
  const hasWidget = heroWidget === 'sponsored-placement'
  const hasSideContent = hasWidget || heroImage?.asset

  return (
    <section style={{ background: '#F5F5F4', borderBottom: '1px solid #E4E4E4', position: 'relative', overflow: 'hidden' }}>
      <div className="hh-grid-bg" aria-hidden="true" />
      <div className="hh-glow-blue" aria-hidden="true" />
      {hasWidget && (
        <div aria-hidden="true" style={{ position: 'absolute', top: 220, right: 440, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,157,46,0.18),rgba(255,157,46,0) 66%)', pointerEvents: 'none' }} />
      )}
      <div className="rsp-hero-pad" style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: hasWidget ? '80px 32px 64px' : '88px 32px 96px',
        textAlign: centered ? 'center' as const : 'left' as const,
        position: 'relative',
        ...(hasWidget ? { display: 'flex', gap: 56, flexWrap: 'wrap' as const, alignItems: 'center' } : {}),
      }}>
        <div style={hasWidget ? { flex: '1 1 480px', minWidth: 320 } : undefined}>
          {eyebrowText && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              border: '1px solid #E6E6E4',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: 100,
              padding: '7px 14px 7px 11px',
              marginBottom: 22,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: dotColors[eyebrowDotColor || 'orange'] || '#FF9D2E' }} />
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '11.5px',
                letterSpacing: '0.09em',
                textTransform: 'uppercase' as const,
                color: '#55555A',
              }}>
                {eyebrowText}
              </span>
            </div>
          )}
          {!eyebrowText && badgeText && badgeStyle === 'eyebrow' ? (
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
          ) : !eyebrowText && badgeText ? (
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
              maxWidth: centered ? 600 : hasWidget ? 540 : 680,
              margin: centered ? '0 auto 36px' : '0 0 36px',
            }}>
              {subheadline}
            </p>
          )}
          {ctaText && ctaLink && (
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const, marginBottom: (heroImage && !hasWidget) ? 56 : relatedServiceTags?.length ? 26 : 0 }}>
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
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    background: 'rgba(255,255,255,0.7)',
                    color: '#0A0A0C',
                    border: '1px solid #0A0A0C',
                    padding: '15px 30px',
                    borderRadius: 5,
                    textDecoration: 'none',
                  }}
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
          {relatedServiceTags && relatedServiceTags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' as const }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '10.5px',
                letterSpacing: '0.11em',
                textTransform: 'uppercase' as const,
                color: '#9A9A96',
              }}>
                Runs alongside
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
                {relatedServiceTags.map((tag) => (
                  <Link
                    key={tag._key || tag.label}
                    href={tag.href || '#'}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: '#55555A',
                      border: '1px solid #EAEAE8',
                      borderRadius: 100,
                      padding: '6px 14px',
                      textDecoration: 'none',
                    }}
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {hasWidget && <SponsoredPlacementWidget />}
        {!hasWidget && heroImage?.asset ? (
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
        ) : !hasWidget && heroImage ? (
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
