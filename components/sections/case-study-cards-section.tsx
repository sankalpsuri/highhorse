const colorMap: Record<string, { bg: string; border: string; stroke: string }> = {
  blue: { bg: '#E9F1FF', border: '#CFE0FF', stroke: '#1A6AFF' },
  lavender: { bg: '#EFEAFB', border: '#DCD0F5', stroke: '#7A4FE0' },
  peach: { bg: '#FDEEE3', border: '#F6D9BC', stroke: '#E08A3C' },
  green: { bg: '#E7F6EC', border: '#C9EAD5', stroke: '#2FAE5E' },
}

const brandColor = { bg: 'rgba(26, 106, 255, 0.06)', border: '#CFE0FF', stroke: '#1A6AFF' }

const chartLines = [
  '0,55 20,50 40,58 60,35 80,45 100,20 120,40 140,15 160,32 180,25 200,10 220,30 240,18 260,34 280,20 300,12',
  '0,40 20,20 40,45 60,15 80,38 100,22 120,48 140,18 160,40 180,12 200,36 220,24 240,44 260,16 280,38 300,20',
  '0,50 20,45 40,55 60,30 80,40 100,20 120,35 140,15 160,30 180,25 200,10 220,28 240,18 260,32 280,22 300,15',
  '0,45 20,30 40,50 60,25 80,42 100,18 120,38 140,22 160,44 180,15 200,36 220,20 240,40 260,12 280,34 300,18',
]

interface CaseStudyCard {
  _key?: string
  clientName: string
  badgeColor?: string
  metrics?: { value: string; label: string }[]
  results?: string[]
}

interface CaseStudyCardsSectionProps {
  heading?: string
  subtext?: string
  cards?: CaseStudyCard[]
  accentStyle?: string
}

export function CaseStudyCardsSection({ heading, subtext, cards, accentStyle }: CaseStudyCardsSectionProps) {
  if (!cards || cards.length === 0) return null
  const isMulti = accentStyle === 'multi'

  return (
    <section>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
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
            maxWidth: 640,
            margin: '0 0 32px',
          }}>
            {subtext}
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {cards.map((card, idx) => {
            const colors = isMulti
              ? (colorMap[card.badgeColor || 'blue'] || colorMap.blue)
              : brandColor
            const points = chartLines[idx % chartLines.length]

            return (
              <div
                key={card._key || idx}
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 18,
                  padding: 20,
                }}
              >
                {card.metrics && card.metrics.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                    {card.metrics.map((m, i) => (
                      <span key={i} style={{
                        background: '#fff',
                        borderRadius: 8,
                        padding: '6px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        color: '#161616',
                      }}>
                        {m.label} {m.value}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{
                  height: 70,
                  borderRadius: 10,
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 14,
                  background: `repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(26,106,255,0.08) 15px)`,
                }}>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <polyline points={points} fill="none" stroke={colors.stroke} strokeWidth="2" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  margin: '14px 0 8px',
                  color: '#161616',
                }}>
                  For {card.clientName}
                </h4>
                {card.results && card.results.length > 0 && (
                  <ul style={{ listStyle: 'none', fontSize: '13px', color: '#5c5c5c', fontFamily: "'Poppins', sans-serif", padding: 0, margin: 0 }}>
                    {card.results.map((r, i) => (
                      <li key={i} style={{ marginBottom: 4, paddingLeft: 14, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>&mdash;</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
