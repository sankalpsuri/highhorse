import { SanityImage as Image } from '@/components/sanity-image'
import { urlFor } from '@/lib/sanity/client'
import { IconBadge } from '@/components/icon-badge'
import { SectionHeader } from '@/components/section-header'

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
  tag?: string
  title?: string
  description?: string
  badgeColor?: string
  listLabel?: string
  bullets?: string[]
}

interface CardGridSectionProps {
  eyebrow?: string
  heading?: string
  subtext?: string
  subtextParagraphs?: string[]
  listLabel?: string
  closingText?: string
  showGlow?: boolean
  darkCardStyle?: string
  cardContainerStyle?: string
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
}

export function CardGridSection({ eyebrow, heading, subtext, subtextParagraphs, listLabel, closingText, showGlow, darkCardStyle, cardContainerStyle, headerLayout, style, background, columns, tintStyle, cards, accentStyle }: CardGridSectionProps) {
  const descParagraphs = subtextParagraphs?.length ? subtextParagraphs : null

  /* ───── Dark style ───── */
  if (style === 'dark') {
    const darkDesc = descParagraphs
      ? (
        <div>
          {descParagraphs.map((text, i) => (
            <p key={i} style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#9A9A97',
              margin: i < descParagraphs.length - 1 ? '0 0 6px' : '0',
            }}>
              {text}
            </p>
          ))}
        </div>
      )
      : subtext ? (
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 16,
          lineHeight: 1.7,
          color: '#9A9A97',
          margin: 0,
        }}>
          {subtext}
        </p>
      ) : undefined

    return (
      <section data-surface="dark" style={{ background: '#0A0A0C', color: '#F5F5F4', position: 'relative', overflow: 'hidden' }}>
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
        {showGlow !== false && (
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
        )}
        <div className="rsp-section" style={{ position: 'relative' }}>
          <SectionHeader
            layout="split"
            eyebrow={eyebrow ? (
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '11.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: '#FF9D2E',
              }}>
                {eyebrow}
              </span>
            ) : undefined}
            heading={heading ? (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
                lineHeight: 1.16,
                margin: 0,
                color: '#F5F5F4',
              }}>
                {heading}
              </h2>
            ) : <span />}
            description={darkDesc}
          />
          {listLabel && (
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '10.5px',
              letterSpacing: '0.11em',
              textTransform: 'uppercase' as const,
              color: '#9A9A96',
              marginBottom: 18,
            }}>
              {listLabel}
            </div>
          )}
          {cards && cards.length > 0 && (() => {
            const isComparison = cards.some(c => c.bullets?.length)
            if (isComparison) {
              return (
                <div className="rsp-grid-2" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 24,
                }}>
                  {cards.map((card, i) => {
                    const isMuted = card.badgeColor === 'gray'
                    return (
                      <div
                        key={card._key || i}
                        style={{
                          border: isMuted
                            ? '1px solid rgba(180,220,240,0.12)'
                            : '1px solid rgba(160,162,252,0.22)',
                          borderRadius: 20,
                          background: isMuted
                            ? 'rgba(180,220,240,0.06)'
                            : 'rgba(160,162,252,0.10)',
                          padding: '40px 36px',
                        }}
                      >
                        {card.title && (
                          <h3 style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 800,
                            fontSize: 21,
                            lineHeight: 1.3,
                            margin: '0 0 24px',
                            color: isMuted ? '#d4d4d8' : '#F5F5F4',
                          }}>
                            {card.title}
                          </h3>
                        )}
                        {card.bullets && card.bullets.length > 0 && (
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {card.bullets.map((bullet, j) => (
                              <li key={j} style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'baseline',
                                marginBottom: 12,
                              }}>
                                <span className="hh-bullet" style={{
                                  background: isMuted ? '#8a8a8e' : '#a0a2fc',
                                  marginTop: 7,
                                }} />
                                <span style={{
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: 15,
                                  lineHeight: 1.55,
                                  color: isMuted ? '#b8b8c0' : '#C8C8D5',
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
            }

            if (darkCardStyle === 'numbered') {
              return (
                <div className="rsp-grid-5" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 18,
                  marginBottom: closingText ? 40 : 0,
                }}>
                  {cards.map((card, i) => (
                    <div
                      key={card._key || i}
                      className="hh-dark-card-hover"
                      style={{
                        border: '1px solid #232326',
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.03)',
                        padding: 26,
                        display: 'flex',
                        flexDirection: 'column' as const,
                        gap: 14,
                      }}
                    >
                      <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: '#FF9D2E',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      {card.title && (
                        <h3 style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: 16,
                          lineHeight: 1.4,
                          margin: 0,
                        }}>
                          {card.title}
                        </h3>
                      )}
                    </div>
                  ))}
                </div>
              )
            }

            return (
              <div className="rsp-grid-3" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 18,
              }}>
                {cards.map((card, i) => {
                  const num = String(i + 1).padStart(2, '0')
                  const hasCardVisual = card.svgPath || card.icon?.asset
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
                      {hasCardVisual && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <IconBadge variant="darkGlow">
                          {card.svgPath ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d={card.svgPath} />
                            </svg>
                          ) : card.icon?.asset ? (
                            <Image
                              src={urlFor(card.icon).url()}
                              alt=""
                              width={24}
                              height={24}
                              quality={90}
                              style={{ objectFit: 'scale-down' }}
                            />
                          ) : null}
                        </IconBadge>
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
                      )}
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
            )
          })()}
          {closingText && (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#D4D4D1',
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

  /* ───── Light styles ───── */
  const bg = background === 'cream' ? 'var(--color-cream)' : background === 'white' ? '#fff' : '#F5F5F4'
  const isClean = style === 'clean'
  const isWhiteBg = background === 'white'

  const lightDesc = descParagraphs
    ? (
      <div>
        {descParagraphs.map((text, i) => (
          <p key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#55555A',
            margin: i < descParagraphs.length - 1 ? '0 0 6px' : '0',
          }}>
            {text}
          </p>
        ))}
      </div>
    )
    : subtext ? (
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 16,
        lineHeight: 1.7,
        color: '#5c5c5c',
        margin: 0,
      }}>
        {subtext}
      </p>
    ) : undefined

  const gridCols = columns
    ? `repeat(${columns}, 1fr)`
    : 'repeat(auto-fit, minmax(300px, 1fr))'

  const gridClass = columns === 5 ? 'rsp-grid-5' : columns === 4 ? 'rsp-grid-4' : columns === 3 ? 'rsp-grid-3' : columns === 2 ? 'rsp-grid-2' : undefined

  /* ───── Tagged style (chip + per-card list labels + orange-dot bullets) ───── */
  if (style === 'tagged') {
    return (
      <section style={{ background: isWhiteBg ? '#fff' : bg, borderTop: isWhiteBg ? 'none' : '1px solid #E4E4E4', borderBottom: isWhiteBg ? 'none' : '1px solid #E4E4E4' }}>
        <div className="rsp-section">
          <SectionHeader
            layout={headerLayout === 'split' ? 'split' : 'stacked'}
            eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
            heading={heading ? (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
                lineHeight: 1.16,
                margin: 0,
                color: '#111111',
              }}>
                {heading}
              </h2>
            ) : <span />}
            description={lightDesc}
          />
          {cards && cards.length > 0 && (
            <div className={gridClass} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 18,
              marginBottom: closingText ? 32 : 0,
            }}>
              {cards.map((card, i) => (
                <div
                  key={card._key || i}
                  className="hh-card-hover"
                  style={{
                    border: '1px solid #E6E6E4',
                    borderRadius: 16,
                    background: '#fff',
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 16,
                  }}
                >
                  {card.tag && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: '0.08em',
                        color: '#1A6AFF',
                        background: '#EAF1FF',
                        border: '1px solid #C9D8FB',
                        borderRadius: 6,
                        padding: '6px 10px',
                      }}>
                        {card.tag}
                      </span>
                    </div>
                  )}
                  {card.title && (
                    <h3 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 19,
                      lineHeight: 1.3,
                      margin: 0,
                    }}>
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: '#55555A',
                      margin: 0,
                    }}>
                      {card.description}
                    </p>
                  )}
                  {card.listLabel && (
                    <div style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: '10.5px',
                      letterSpacing: '0.11em',
                      textTransform: 'uppercase' as const,
                      color: '#9A9A96',
                      marginTop: 4,
                    }}>
                      {card.listLabel}
                    </div>
                  )}
                  {card.bullets && card.bullets.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column' as const, borderTop: '1px solid #EFEFEE' }}>
                      {card.bullets.map((bullet, j) => (
                        <div key={j} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 0',
                          borderBottom: '1px solid #EFEFEE',
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9D2E', flexShrink: 0 }} />
                          <span style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            fontSize: 14.5,
                            lineHeight: 1.45,
                            color: '#0A0A0C',
                          }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {closingText && (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.7,
              color: '#0A0A0C',
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

  /* ───── Clean style ───── */
  if (isClean) {
    const borderedCards = isWhiteBg
    return (
      <section style={{ background: bg, borderTop: isWhiteBg ? 'none' : '1px solid #E4E4E4', borderBottom: isWhiteBg ? 'none' : '1px solid #E4E4E4' }}>
        <div className="rsp-section">
          <SectionHeader
            layout={headerLayout === 'split' ? 'split' : 'stacked'}
            eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
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
            description={lightDesc}
          />
          {cards && cards.length > 0 && (
            <div className={gridClass} style={{
              display: 'grid',
              gridTemplateColumns: borderedCards ? 'repeat(auto-fit, minmax(270px, 1fr))' : gridCols,
              columnGap: borderedCards ? 18 : 56,
              rowGap: borderedCards ? 18 : 36,
            }}>
              {cards.map((card, i) => (
                <div
                  key={card._key || i}
                  className={borderedCards ? 'hh-card-hover' : undefined}
                  style={borderedCards ? {
                    border: '1px solid #E6E6E4',
                    borderRadius: 16,
                    background: '#fff',
                    padding: 26,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 14,
                  } : undefined}
                >
                  {(card.svgPath || card.icon?.asset) && (
                    <div style={{ marginBottom: borderedCards ? 0 : 14 }}>
                      <IconBadge>
                        {card.svgPath ? (
                          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#1A6AFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d={card.svgPath} />
                          </svg>
                        ) : card.icon?.asset ? (
                          <Image
                            src={urlFor(card.icon).url()}
                            alt={card.title || ''}
                            width={24}
                            height={24}
                            quality={90}
                            style={{ objectFit: 'scale-down' }}
                          />
                        ) : null}
                      </IconBadge>
                    </div>
                  )}
                  {card.title && (
                    <h3 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: borderedCards ? 16.5 : 16,
                      lineHeight: borderedCards ? 1.32 : undefined,
                      margin: borderedCards ? 0 : '0 0 8px',
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
                      color: borderedCards ? '#55555A' : '#5c5c5c',
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

  /* ───── Unified container style ───── */
  if (cardContainerStyle === 'unified') {
    return (
      <section style={{ background: bg, borderTop: isWhiteBg ? 'none' : '1px solid #E4E4E4', borderBottom: isWhiteBg ? 'none' : '1px solid #E4E4E4' }}>
        <div className="rsp-section">
          <SectionHeader
            layout={headerLayout === 'split' ? 'split' : 'stacked'}
            eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
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
            description={lightDesc}
          />
          {cards && cards.length > 0 && (
            <div style={{
              border: '1px solid #E6E6E4',
              borderRadius: 16,
              background: '#fff',
              overflow: 'hidden',
              boxShadow: '0 18px 40px rgba(10,10,12,0.05)',
              display: 'flex',
              flexWrap: 'wrap' as const,
            }}>
              {cards.map((card, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <div key={card._key || i} style={{
                    flex: '1 1 260px',
                    minWidth: 230,
                    padding: 28,
                    borderRight: '1px solid #EFEFEE',
                    borderBottom: '1px solid #EFEFEE',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1A6AFF' }} />
                      <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: '#9A9A96',
                      }}>
                        {num}
                      </div>
                    </div>
                    {card.title && (
                      <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: 15.5,
                        lineHeight: 1.35,
                        marginBottom: 10,
                      }}>
                        {card.title}
                      </div>
                    )}
                    {card.description && (
                      <div style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        color: '#55555A',
                      }}>
                        {card.description}
                      </div>
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

  /* ───── Default / dashed styles ───── */
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
              <div style={{ marginBottom: 16 }}>
                <IconBadge size="sm">
                  <Image
                    src={urlFor(card.icon).url()}
                    alt={card.title || ''}
                    width={20}
                    height={20}
                    quality={90}
                    style={{ objectFit: 'scale-down' }}
                  />
                </IconBadge>
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
                    <span className="hh-bullet" style={{ marginTop: 6 }} />
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
      <div className="rsp-section">
        <SectionHeader
          layout={headerLayout === 'split' ? 'split' : 'stacked'}
          eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
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
          description={lightDesc}
        />
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
