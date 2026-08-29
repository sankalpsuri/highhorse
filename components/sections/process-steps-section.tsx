interface Step {
  _key?: string
  stepTitle?: string
  stepDescription?: string
}

interface ProcessStepsSectionProps {
  heading?: string
  headingBordered?: boolean
  subtext?: string
  columns?: number
  steps?: Step[]
}

export function ProcessStepsSection({ heading, headingBordered, subtext, columns, steps }: ProcessStepsSectionProps) {
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
            textAlign: 'left' as const,
            ...(headingBordered ? {
              border: '2px solid #1A6AFF',
              borderRadius: 8,
              padding: '14px 22px',
              display: 'inline-block',
            } : {}),
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
        {steps && steps.length > 0 && (
          <div className={columns === 5 ? 'rsp-grid-5' : columns === 4 ? 'rsp-grid-4' : columns === 3 ? 'rsp-grid-3' : columns === 2 ? 'rsp-grid-2' : undefined} style={{
            display: 'grid',
            gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {steps.map((step, i) => (
              <div key={step._key || i} style={{
                padding: '32px 28px',
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 5,
              }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  lineHeight: 1,
                  color: '#1A6AFF',
                  display: 'block',
                  marginBottom: 16,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
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
