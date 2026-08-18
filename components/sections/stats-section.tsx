interface Stat {
  _key?: string
  value?: string
  label?: string
}

interface StatsSectionProps {
  heading?: string
  bodyText?: string
  stats?: Stat[]
}

export function StatsSection({ heading, bodyText, stats }: StatsSectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 16px',
            color: '#111111',
            textAlign: 'left' as const,
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
            margin: '0 0 48px',
          }}>
            {bodyText}
          </p>
        )}
        {stats && stats.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32,
          }}>
            {stats.map((stat, i) => (
              <div key={stat._key || i} style={{
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
        )}
      </div>
    </section>
  )
}
