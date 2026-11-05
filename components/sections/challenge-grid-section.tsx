import Link from 'next/link'
import { IconBadge } from '@/components/icon-badge'
import { SectionHeader } from '@/components/section-header'

interface ChallengeGridSectionProps {
  eyebrow?: string
  layout?: string
  headerLayout?: string
  background?: string
  cardStyle?: string
  heading?: string
  subtext?: string
  descriptionParagraphs?: string[]
  splitStyle?: string
  cardHeader?: string
  closingText?: string
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
}

const colorPalettes: Record<string, { bg: string; border: string; chip: string; tone: string }> = {
  blue: { bg: '#F4F7FF', border: '#D5E1FF', chip: '#E4ECFF', tone: '#1A6AFF' },
  peach: { bg: '#FFF6EA', border: '#FFE0B8', chip: '#FFEFD8', tone: '#B96A0C' },
  gray: { bg: '#F7F7F6', border: '#E6E6E4', chip: '#EFEFEE', tone: '#55555A' },
  amber: { bg: '#fff', border: '#E6E6E4', chip: '#FFF3E2', tone: '#B96A0C' },
}

const defaultPalette = { bg: '#fff', border: '#E4E4E4', chip: 'rgba(26, 106, 255, 0.1)', tone: '#1A6AFF' }

export function ChallengeGridSection({ eyebrow, layout, headerLayout, background, cardStyle, heading, subtext, descriptionParagraphs, splitStyle, cardHeader, closingText, ctaText, ctaLink, challenges, cardColors }: ChallengeGridSectionProps) {
  const sectionBg = background === 'white' ? '#FFFFFF' : '#F5F5F4'
  const isCompact = cardStyle === 'compact'
  const isInlineCta = headerLayout === 'inline-cta'
  if (layout === 'split') {
    if (splitStyle === 'numbered-card') {
      const paragraphs = descriptionParagraphs?.length ? descriptionParagraphs : subtext ? [subtext] : []
      return (
        <section style={{ background: sectionBg, borderTop: background === 'white' ? 'none' : '1px solid #E4E4E4', borderBottom: background === 'white' ? 'none' : '1px solid #E4E4E4' }}>
          <div className="rsp-grid-split rsp-section" style={{ display: 'flex', gap: 56, flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <div style={{ flex: '1 1 380px', minWidth: 280 }}>
              {eyebrow && <div style={{ marginBottom: 16 }}><span style={eyebrowStyle}>{eyebrow}</span></div>}
              {heading && (
                <h2 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                  lineHeight: 1.2,
                  margin: '0 0 18px',
                  color: '#111111',
                }}>
                  {heading}
                </h2>
              )}
              {paragraphs.map((text, i) => (
                <p key={i} style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: '#55555A',
                  margin: i < paragraphs.length - 1 ? '0 0 14px' : '0',
                }}>
                  {text}
                </p>
              ))}
            </div>
            {challenges && challenges.length > 0 && (
              <div style={{
                flex: '1 1 500px',
                minWidth: 300,
                border: '1px solid #E6E6E4',
                borderRadius: 16,
                background: '#fff',
                overflow: 'hidden',
                boxShadow: '0 18px 40px rgba(10,10,12,0.05)',
              }}>
                {cardHeader && (
                  <div style={{
                    padding: '20px 26px',
                    borderBottom: '1px solid #EFEFEE',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '10.5px',
                    letterSpacing: '0.11em',
                    textTransform: 'uppercase' as const,
                    color: '#9A9A96',
                  }}>
                    {cardHeader}
                  </div>
                )}
                {challenges.map((text, i) => (
                  <div key={i} style={{
                    padding: '20px 26px',
                    borderBottom: i < challenges.length - 1 ? '1px solid #EFEFEE' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      color: '#1A6AFF',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: 1.45,
                      color: '#0A0A0C',
                    }}>
                      {text}
                    </span>
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
        <div className="rsp-grid-split rsp-section" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'start' }}>
          <div>
            {eyebrow && <div className="sh-eyebrow"><span style={eyebrowStyle}>{eyebrow}</span></div>}
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.2,
                margin: '0 0 var(--heading-to-desc)',
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
                margin: '0 0 var(--desc-to-content)',
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
    <section style={{ background: sectionBg, borderTop: background === 'white' ? 'none' : '1px solid #E4E4E4', borderBottom: background === 'white' ? 'none' : '1px solid #E4E4E4' }}>
      <div className="rsp-section">
        {isInlineCta ? (
          <SectionHeader
            layout="inline-cta"
            eyebrow={eyebrow ? <span style={eyebrowStyle}>{eyebrow}</span> : undefined}
            heading={heading ? (
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
            ) : <span />}
            description={subtext ? (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: '#5c5c5c',
                margin: 0,
              }}>
                {subtext}
              </p>
            ) : undefined}
            cta={ctaText && ctaLink ? (
              <Link
                href={ctaLink}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#1A6AFF',
                  border: '1px solid #1A6AFF',
                  padding: '13px 20px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {ctaText}
              </Link>
            ) : undefined}
          />
        ) : (
          <>
            <SectionHeader
              layout="split"
              eyebrow={eyebrow ? <span style={eyebrowStyle}>{eyebrow}</span> : undefined}
              heading={heading ? (
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
              ) : <span />}
              description={subtext ? (
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: '#5c5c5c',
                  margin: 0,
                }}>
                  {subtext}
                </p>
              ) : undefined}
            />
            {ctaText && ctaLink && (
              <div style={{ marginBottom: 'var(--desc-to-content)' }}>
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
          </>
        )}
        {descriptionParagraphs && descriptionParagraphs.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            {descriptionParagraphs.map((text, i) => {
              const isLast = i === descriptionParagraphs.length - 1
              return (
                <p key={i} style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.7,
                  fontWeight: isLast ? 500 : 400,
                  color: isLast ? '#0A0A0C' : '#55555A',
                  margin: i < descriptionParagraphs.length - 1 ? '0 0 14px' : '0 0 24px',
                  maxWidth: 760,
                }}>
                  {text}
                </p>
              )
            })}
          </div>
        )}
        {challenges && challenges.length > 0 && (
          isCompact ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
              marginBottom: closingText ? 32 : 0,
            }}>
              {challenges.map((text, i) => {
                const palette = cardColors?.[i] ? (colorPalettes[cardColors[i]] || defaultPalette) : defaultPalette
                return (
                  <div key={i} className="hh-card-hover" style={{
                    border: `1px solid ${palette.border}`,
                    borderRadius: 12,
                    background: palette.bg,
                    padding: 22,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      color: palette.tone,
                      background: palette.chip,
                      borderRadius: 5,
                      padding: '5px 8px',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: '#3A3A3E',
                    }}>
                      {text}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
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
                    <IconBadge size="sm">
                      <span style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: '0.06em',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </IconBadge>
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
          )
        )}
        {closingText && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#55555A',
            margin: 0,
            maxWidth: 760,
          }}>
            {closingText}
          </p>
        )}
      </div>
    </section>
  )
}
