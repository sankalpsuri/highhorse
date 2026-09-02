interface Stat {
  _key?: string
  value?: string
  label?: string
}

interface StatsSectionProps {
  heading?: string
  bodyText?: string
  layout?: string
  theme?: string
  stats?: Stat[]
}

const circleSizes = [200, 160, 180, 150]
const circleOffsets = [
  { marginTop: 0, marginLeft: 0 },
  { marginTop: -20, marginLeft: 16 },
  { marginTop: 10, marginLeft: -8 },
  { marginTop: -30, marginLeft: 24 },
]

export function StatsSection({ heading, bodyText, layout, theme, stats }: StatsSectionProps) {
  const isScattered = layout === 'scattered'
  const isSplit = layout === 'split'
  const isDark = theme === 'dark'

  if (isSplit) {
    return (
      <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
        <div className="rsp-grid-split rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 44, alignItems: 'center' }}>
          <div>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.26,
                margin: '0 0 14px',
                color: '#111111',
              }}>
                {heading}
              </h2>
            )}
            {bodyText && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: '#5c5c5c',
                margin: 0,
              }}>
                {bodyText}
              </p>
            )}
          </div>
          {stats && stats.length > 0 && (
            <div className="rsp-grid-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
            }}>
              {stats.map((stat, i) => (
                <div key={stat._key || i} className="hh-card-hover" style={{
                  background: '#fff',
                  border: '1px solid #E4E4E4',
                  borderRadius: 14,
                  padding: '20px 16px',
                  boxShadow: '0 8px 20px -16px rgba(10,20,40,0.3)',
                }}>
                  {stat.value && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: 24,
                      lineHeight: 1.1,
                      margin: '0 0 6px',
                      color: '#1A6AFF',
                    }}>
                      {stat.value}
                    </p>
                  )}
                  {stat.label && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12.5,
                      lineHeight: 1.4,
                      color: '#5c5c5c',
                      margin: 0,
                    }}>
                      {stat.label}
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

  if (isDark) {
    return (
      <section>
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          <div className="rsp-dark-pad" style={{
            background: '#111111',
            borderRadius: 24,
            padding: '56px 40px',
            color: '#fff',
          }}>
            {heading && (
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#fff',
              }}>
                {heading}
              </h2>
            )}
            {bodyText && (
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: '#8a8a86',
                maxWidth: 680,
                margin: '0 0 48px',
              }}>
                {bodyText}
              </p>
            )}
            {stats && stats.length > 0 && (
              <div className="rsp-grid-4" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 18,
              }}>
                {stats.map((stat, i) => (
                  <div key={stat._key || i} className="hh-card-hover" style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '22px 18px',
                  }}>
                    {stat.value && (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        fontSize: 30,
                        lineHeight: 1.1,
                        margin: '0 0 8px',
                        color: '#1A6AFF',
                      }}>
                        {stat.value}
                      </p>
                    )}
                    {stat.label && (
                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 13,
                        lineHeight: 1.4,
                        color: '#8a8a86',
                        margin: 0,
                      }}>
                        {stat.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 16px',
            color: '#111111',
            textAlign: isScattered ? 'center' as const : 'left' as const,
          }}>
            {heading}
          </h2>
        )}
        {bodyText && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#5c5c5c',
            maxWidth: 680,
            margin: isScattered ? '0 auto 56px' : '0 0 48px',
            textAlign: isScattered ? 'center' as const : 'left' as const,
          }}>
            {bodyText}
          </p>
        )}
        {stats && stats.length > 0 && (
          isScattered ? (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 24,
              padding: '16px 0',
            }}>
              {stats.map((stat, i) => {
                const size = circleSizes[i % circleSizes.length]
                const offset = circleOffsets[i % circleOffsets.length]
                return (
                  <div key={stat._key || i} style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid #E4E4E4',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    marginTop: offset.marginTop,
                    marginLeft: offset.marginLeft,
                    flexShrink: 0,
                  }}>
                    {stat.value && (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        fontSize: size >= 180 ? 'clamp(1.6rem, 2.5vw, 2.2rem)' : 'clamp(1.3rem, 2vw, 1.8rem)',
                        lineHeight: 1.1,
                        margin: '0 0 6px',
                        color: '#111111',
                        textAlign: 'center',
                      }}>
                        {stat.value}
                      </p>
                    )}
                    {stat.label && (
                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 12,
                        lineHeight: 1.4,
                        color: '#5c5c5c',
                        margin: 0,
                        textAlign: 'center',
                      }}>
                        {stat.label}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 32,
            }}>
              {stats.map((stat, i) => (
                <div key={stat._key || i} className="hh-card-hover" style={{
                  padding: '32px 24px',
                  background: '#fff',
                  border: '1px solid #E4E4E4',
                  borderRadius: 5,
                }}>
                  {stat.value && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                      lineHeight: 1.1,
                      margin: '0 0 8px',
                      color: '#111111',
                    }}>
                      {stat.value}
                    </p>
                  )}
                  {stat.label && (
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: '#5c5c5c',
                      margin: 0,
                    }}>
                      {stat.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  )
}
