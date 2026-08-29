import Link from 'next/link'

interface ChallengeGridSectionProps {
  layout?: string
  heading?: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  challenges?: string[]
}

export function ChallengeGridSection({ layout, heading, subtext, ctaText, ctaLink, challenges }: ChallengeGridSectionProps) {
  if (layout === 'split') {
    return (
      <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
        <div className="rsp-grid-split rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'start' }}>
          <div>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.2,
                margin: '0 0 14px',
                color: '#111111',
              }}>
                {heading}
              </h2>
            )}
            {subtext && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: '#5c5c5c',
                margin: '0 0 24px',
              }}>
                {subtext}
              </p>
            )}
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  background: '#111111',
                  color: '#fff',
                  padding: '15px 28px',
                  borderRadius: 5,
                  textDecoration: 'none',
                }}
              >
                {ctaText}
              </Link>
            )}
          </div>
          {challenges && challenges.length > 0 && (
            <div>
              {challenges.map((text, i) => (
                <div key={i} style={{
                  padding: '16px 0',
                  borderBottom: i < challenges.length - 1 ? '1px solid #E4E4E4' : 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#111111',
                }}>
                  {text}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
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
          {subtext && (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5c5c5c',
              margin: '0 0 24px',
            }}>
              {subtext}
            </p>
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
        {challenges && challenges.length > 0 && (
          <div className="rsp-grid-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}>
            {challenges.map((text, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 14,
                padding: '22px 22px 22px 52px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14.5,
                fontWeight: 600,
                color: '#111111',
                position: 'relative' as const,
              }}>
                <span style={{
                  position: 'absolute' as const,
                  left: 20,
                  top: 22,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(26, 106, 255, 0.1)',
                  color: '#1A6AFF',
                  fontSize: 12,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  ✕
                </span>
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
