import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

const badgeColors: Record<string, { bg: string; text: string }> = {
  mint: { bg: '#D1FAE5', text: '#065F46' },
  peach: { bg: '#FFEDD5', text: '#9A3412' },
  lavender: { bg: '#EDE9FE', text: '#5B21B6' },
  gray: { bg: '#F3F4F6', text: '#374151' },
  blue: { bg: '#E4ECFF', text: '#1A6AFF' },
}

interface Card {
  _key?: string
  icon?: any
  svgPath?: string
  title?: string
  description?: string
  badgeColor?: string
  bullets?: string[]
}

interface CardGridSectionProps {
  eyebrow?: string
  heading?: string
  subtext?: string
  headerLayout?: string
  style?: string
  background?: string
  columns?: number
  tintStyle?: string
  cards?: Card[]
  accentStyle?: string
}

const brandBadge = { bg: 'rgba(26, 106, 255, 0.1)', text: '#1A6AFF' }

const tintBgColors: Record<string, string> = {
  mint: 'rgba(209, 250, 229, 0.35)',
  peach: 'rgba(255, 237, 213, 0.35)',
  lavender: 'rgba(237, 233, 254, 0.35)',
  gray: 'rgba(243, 244, 246, 0.5)',
  blue: 'rgba(228, 236, 255, 0.4)',
}

const sectionEyebrowStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '11.5px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#1A6AFF',
  marginBottom: 16,
}

export function CardGridSection({ eyebrow, heading, subtext, headerLayout, style, background, columns, tintStyle, cards, accentStyle }: CardGridSectionProps) {
  if (style === 'dark') {
    return (
      <section style={{ background: '#0A0A0C', color: '#F5F5F4', position: 'relative', overflow: 'hidden' }}>
        {/* Grid-line pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(100% 80% at 50% 0%,#000 30%,transparent 85%)',
          WebkitMaskImage: 'radial-gradient(100% 80% at 50% 0%,#000 30%,transparent 85%)',
          pointerEvents: 'none',
        }} />
        {/* Blue radial glow */}
        <div style={{
          position: 'absolute',
          top: -140,
          left: '20%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(26,106,255,0.28),rgba(26,106,255,0) 68%)',
          pointerEvents: 'none',
        }} />
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 32px', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' as const, marginBottom: 56 }}>
            <div style={{ flex: '1 1 460px', minWidth: 300 }}>
              {eyebrow && (
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: '11.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: '#FF9D2E',
                  marginBottom: 16,
                }}>
                  {eyebrow}
                </div>
              )}
              {heading && (
                <h2 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
                  lineHeight: 1.16,
                  margin: 0,
                  maxWidth: 600,
                  color: '#F5F5F4',
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
                  color: '#9A9A97',
                  margin: 0,
                }}>
                  {subtext}
                </p>
              )}
            </div>
          </div>
          {cards && cards.length > 0 && (
            <div className="rsp-grid-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 18,
            }}>
              {cards.map((card, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <div
                    key={card._key || i}
                    className="hh-dark-card-hover"
                    style={{
                      border: '1px solid #232326',
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.03)',
                      padding: 28,
                      display: 'flex',
                      flexDirection: 'column' as const,
                      gap: 14,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: 'rgba(255,157,46,0.12)',
                        border: '1px solid rgba(255,157,46,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {card.svgPath ? (
                          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#FF9D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d={card.svgPath} />
                          </svg>
                        ) : card.icon?.asset ? (
                          <Image
                            src={urlFor(card.icon).width(46).auto('format').url()}
                            alt=""
                            width={23}
                            height={23}
                            style={{ objectFit: 'scale-down' }}
                          />
                        ) : (
                          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#FF9D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1, height: 1, background: '#232326' }} />
                      <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: '11.5px',
                        letterSpacing: '0.12em',
                        color: '#5a5a57',
                      }}>
                        {num}
                      </div>
                    </div>
                    {card.title && (
                      <h3 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1.32,
                        margin: 0,
                        color: '#F5F5F4',
                      }}>
                        {card.title}
                      </h3>
                    )}
                    {card.description && (
                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 14.5,
                        lineHeight: 1.62,
                        color: '#9A9A97',
                        margin: 0,
                      }}>
                        {card.description}
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

  const bg = background === 'cream' ? '#FDF8F0' : background === 'white' ? '#fff' : '#F5F5F4'
  const isClean = style === 'clean'

  const gridCols = columns
    ? `repeat(${columns}, 1fr)`
    : 'repeat(auto-fit, minmax(300px, 1fr))'

  const gridClass = columns === 5 ? 'rsp-grid-5' : columns === 4 ? 'rsp-grid-4' : columns === 3 ? 'rsp-grid-3' : columns === 2 ? 'rsp-grid-2' : undefined

  if (isClean) {
    return (
      <section style={{ background: bg, borderTop: background === 'white' ? 'none' : '1px solid #E4E4E4', borderBottom: background === 'white' ? 'none' : '1px solid #E4E4E4' }}>
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          {eyebrow && <div style={sectionEyebrowStyle}>{eyebrow}</div>}
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
              maxWidth: 680,
              margin: '0 0 36px',
            }}>
              {subtext}
            </p>
          )}
          {cards && cards.length > 0 && (
            <div className={gridClass} style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              columnGap: 56,
              rowGap: 36,
            }}>
              {cards.map((card, i) => (
                <div key={card._key || i}>
                  {card.icon?.asset && (
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26, 106, 255, 0.1)', position: 'relative', marginBottom: 14 }}>
                      <Image
                        src={urlFor(card.icon).width(80).auto('format').url()}
                        alt={card.title || ''}
                        fill
                        sizes="24px"
                        quality={90}
                        style={{ objectFit: 'scale-down', padding: 10 }}
                      />
                    </div>
                  )}
                  {card.title && (
                    <h3 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      margin: '0 0 8px',
                      color: '#111111',
                    }}>
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: '#5c5c5c',
                      margin: 0,
                    }}>
                      {card.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  const gridContent = (
    <div className={gridClass} style={{
      display: 'grid',
      gridTemplateColumns: gridCols,
      border: style === 'dashed' ? 'none' : '1px solid #E4E4E4',
      borderRadius: 5,
      overflow: 'hidden',
    }}>
      {cards?.map((card, i) => {
        const isMulti = accentStyle === 'multi'
        const badge = card.badgeColor
          ? (isMulti ? badgeColors[card.badgeColor] || brandBadge : brandBadge)
          : null
        const isFullTint = tintStyle === 'full' && card.badgeColor
        const cardBg = isFullTint
          ? (isMulti ? tintBgColors[card.badgeColor!] || '#fff' : 'rgba(26, 106, 255, 0.06)')
          : '#fff'
        return (
          <div key={card._key || i} className="hh-card-hover" style={{
            padding: '36px 32px',
            borderRight: '1px solid #E4E4E4',
            borderBottom: '1px solid #E4E4E4',
            background: cardBg,
          }}>
            {card.icon?.asset && (
              <div style={{ marginBottom: 16, width: 40, height: 40, position: 'relative' }}>
                <Image
                  src={urlFor(card.icon).width(80).auto('format').url()}
                  alt={card.title || ''}
                  fill
                  sizes="40px"
                  quality={90}
                  style={{ objectFit: 'scale-down' }}
                />
              </div>
            )}
            {card.title && badge && (
              <div style={{ marginBottom: 14 }}>
                <span style={{
                  display: 'inline-block',
                  background: badge.bg,
                  color: badge.text,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 100,
                }}>
                  {card.title}
                </span>
              </div>
            )}
            {card.title && !badge && (
              <h3 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                margin: '0 0 10px',
                color: '#111111',
              }}>
                {card.title}
              </h3>
            )}
            {card.description && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: '#5c5c5c',
                margin: card.bullets?.length ? '0 0 18px' : 0,
              }}>
                {card.description}
              </p>
            )}
            {card.bullets && card.bullets.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {card.bullets.map((bullet, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{
                      width: 5,
                      height: 5,
                      background: '#1A6AFF',
                      flexShrink: 0,
                      marginTop: 6,
                      display: 'inline-block',
                    }} />
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: '#8a8a86',
                    }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <section style={{ background: bg, borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {headerLayout === 'split' ? (
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' as const, marginBottom: 48 }}>
            <div style={{ flex: '1 1 460px', minWidth: 300 }}>
              {eyebrow && <div style={sectionEyebrowStyle}>{eyebrow}</div>}
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
        ) : (
          <>
            {eyebrow && <div style={sectionEyebrowStyle}>{eyebrow}</div>}
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
                maxWidth: 680,
                margin: '0 0 48px',
              }}>
                {subtext}
              </p>
            )}
          </>
        )}
        {cards && cards.length > 0 && (
          style === 'dashed' ? (
            <div style={{
              border: '2px dashed #D1D5DB',
              borderRadius: 10,
              padding: 2,
              overflow: 'hidden',
            }}>
              {gridContent}
            </div>
          ) : gridContent
        )}
      </div>
    </section>
  )
}
