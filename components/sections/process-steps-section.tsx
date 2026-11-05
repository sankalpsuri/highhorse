import { IconBadge } from '@/components/icon-badge'
import { SectionHeader } from '@/components/section-header'

interface Step {
  _key?: string
  stepTitle?: string
  stepDescription?: string
}

interface ProcessStepsSectionProps {
  eyebrow?: string
  heading?: string
  headingBordered?: boolean
  subtext?: string
  headerLayout?: string
  containerStyle?: string
  columns?: number
  steps?: Step[]
}

const sectionEyebrowStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '11.5px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#1A6AFF',
}

export function ProcessStepsSection({ eyebrow, heading, headingBordered, subtext, headerLayout, containerStyle, columns, steps }: ProcessStepsSectionProps) {
  const isSplit = headerLayout === 'split'
  const isUnified = containerStyle === 'unified'

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
    lineHeight: 1.2,
    margin: 0,
    color: '#111111',
    textAlign: 'left' as const,
    ...(headingBordered ? {
      border: '2px solid #1A6AFF',
      borderRadius: 8,
      padding: '14px 22px',
      display: 'inline-block',
    } : {}),
  }

  const header = (
    <SectionHeader
      layout={isSplit ? 'split' : 'stacked'}
      eyebrow={eyebrow ? <span style={sectionEyebrowStyle}>{eyebrow}</span> : undefined}
      heading={heading ? <h2 style={headingStyle}>{heading}</h2> : <span />}
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
  )

  const gridClass = columns === 5 ? 'rsp-grid-5' : columns === 4 ? 'rsp-grid-4' : columns === 3 ? 'rsp-grid-3' : columns === 2 ? 'rsp-grid-2' : undefined

  if (isUnified && steps && steps.length > 0) {
    return (
      <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
        <div className="rsp-section">
          {header}
          <div style={{
            border: '1px solid #E4E4E4',
            borderRadius: 16,
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(10,10,12,0.05)',
            display: 'flex',
            flexWrap: 'wrap' as const,
          }}>
            {steps.map((step, i) => (
              <div key={step._key || i} style={{
                flex: '1 1 260px',
                minWidth: 240,
                padding: 32,
                borderRight: '1px solid #EFEFEE',
                borderBottom: '1px solid #EFEFEE',
              }}>
                <div style={{ marginBottom: 16 }}>
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
                </div>
                {step.stepTitle && (
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 16.5,
                    lineHeight: 1.35,
                    margin: '0 0 10px',
                    color: '#111111',
                  }}>
                    {step.stepTitle}
                  </h3>
                )}
                {step.stepDescription && (
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#5c5c5c',
                    margin: 0,
                  }}>
                    {step.stepDescription}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {header}
        {steps && steps.length > 0 && (
          <div className={gridClass} style={{
            display: 'grid',
            gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {steps.map((step, i) => (
              <div key={step._key || i} className="hh-card-hover" style={{
                padding: '32px 28px',
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 5,
              }}>
                <div style={{ marginBottom: 16 }}>
                  <IconBadge>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: '0.06em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </IconBadge>
                </div>
                {step.stepTitle && (
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    margin: '0 0 10px',
                    color: '#111111',
                  }}>
                    {step.stepTitle}
                  </h3>
                )}
                {step.stepDescription && (
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#5c5c5c',
                    margin: 0,
                  }}>
                    {step.stepDescription}
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
