import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

const badgeColors: Record<string, { bg: string; text: string }> = {
  mint: { bg: '#D1FAE5', text: '#065F46' },
  peach: { bg: '#FFEDD5', text: '#9A3412' },
  lavender: { bg: '#EDE9FE', text: '#5B21B6' },
  gray: { bg: '#F3F4F6', text: '#374151' },
}

interface Card {
  _key?: string
  icon?: any
  title?: string
  description?: string
  badgeColor?: string
  bullets?: string[]
}

interface CardGridSectionProps {
  heading?: string
  subtext?: string
  style?: string
  background?: string
  cards?: Card[]
  accentStyle?: string
}

const brandBadge = { bg: 'rgba(26, 106, 255, 0.1)', text: '#1A6AFF' }

export function CardGridSection({ heading, subtext, style, background, cards, accentStyle }: CardGridSectionProps) {
  const bg = background === 'cream' ? '#FDF8F0' : '#F5F5F4'

  const gridContent = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      border: style === 'dashed' ? 'none' : '1px solid #E4E4E4',
      borderRadius: 5,
      overflow: 'hidden',
    }}>
      {cards?.map((card, i) => {
        const isMulti = accentStyle === 'multi'
        const badge = card.badgeColor
          ? (isMulti ? badgeColors[card.badgeColor] || brandBadge : brandBadge)
          : null
        return (
          <div key={card._key || i} style={{
            padding: '36px 32px',
            borderRight: '1px solid #E4E4E4',
            borderBottom: '1px solid #E4E4E4',
            background: '#fff',
          }}>
            {card.icon?.asset && (
              <div style={{ marginBottom: 16, width: 40, height: 40 }}>
                <Image
                  src={urlFor(card.icon).width(80).auto('format').url()}
                  alt={card.title || ''}
                  width={40}
                  height={40}
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
            maxWidth: 680,
            margin: '0 0 48px',
          }}>
            {subtext}
          </p>
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
