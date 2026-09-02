import Link from 'next/link'

interface ChallengeGridSectionProps {
  eyebrow?: string
  layout?: string
  heading?: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  challenges?: string[]
  cardColors?: string[]
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '11.5px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#1A6AFF',
  marginBottom: 16,
}

const colorPalettes: Record<string, { bg: string; border: string; chip: string; tone: string }> = {
  blue: { bg: '#F4F7FF', border: '#D5E1FF', chip: '#E4ECFF', tone: '#1A6AFF' },
  peach: { bg: '#FFF6EA', border: '#FFE0B8', chip: '#FFEFD8', tone: '#B96A0C' },
  gray: { bg: '#F7F7F6', border: '#E6E6E4', chip: '#EFEFEE', tone: '#55555A' },
}

const defaultPalette = { bg: '#fff', border: '#E4E4E4', chip: 'rgba(26, 106, 255, 0.1)', tone: '#1A6AFF' }

export function ChallengeGridSection({ eyebrow, layout, heading, subtext, ctaText, ctaLink, challenges, cardColors }: ChallengeGridSectionProps) {
  if (layout === 'split') {
    return (
      <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
        <div className="rsp-grid-split rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'start' }}>
          <div>
            {eyebrow && <div style={eyebrowStyle}>{eyebrow}</div>}
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
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' as const, marginBottom: 40 }}>
          <div style={{ flex: '1 1 460px', minWidth: 300 }}>
            {eyebrow && <div style={eyebrowStyle}>{eyebrow}</div>}
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.2,
                margin: 0,
                color: '#111111',
              }}>
                {heading}
              </h2>
            )}
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 300, alignSelf: 'flex-end' }}>
            {subtext && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: '#5c5c5c',
                margin: 0,
              }}>
                {subtext}
              </p>
            )}
          </div>
        </div>
        {ctaText && ctaLink && (
          <div style={{ marginBottom: 32 }}>
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
        {challenges && challenges.length > 0 && (
          <div className="rsp-grid-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
          }}>
            {challenges.map((text, i) => {
              const sepIdx = text.indexOf(' — ')
              const title = sepIdx >= 0 ? text.slice(0, sepIdx) : text
              const body = sepIdx >= 0 ? text.slice(sepIdx + 3) : null
              const palette = cardColors?.[i] ? (colorPalettes[cardColors[i]] || defaultPalette) : defaultPalette
              return (
                <div key={i} className="hh-card-hover" style={{
                  background: palette.bg,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  gap: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      color: palette.tone,
                      background: palette.chip,
                      borderRadius: 5,
                      padding: '5px 8px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, height: 1, background: palette.border }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.35,
                    margin: 0,
                    color: '#111111',
                  }}>
                    {title}
                  </h3>
                  {body && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: '#5c5c5c',
                      margin: 0,
                    }}>
                      {body}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
