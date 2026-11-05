interface SectionHeaderProps {
  eyebrow?: React.ReactNode
  heading: React.ReactNode
  description?: React.ReactNode
  cta?: React.ReactNode
  layout?: 'stacked' | 'split' | 'inline-cta'
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  cta,
  layout = 'stacked',
  className,
}: SectionHeaderProps) {
  if (layout === 'split') {
    return (
      <div className={`sh-split${className ? ` ${className}` : ''}`}>
        <div className="sh-left">
          {eyebrow && <div className="sh-eyebrow">{eyebrow}</div>}
          {heading}
        </div>
        {(description || cta) && (
          <div className="sh-right">
            {description}
            {cta}
          </div>
        )}
      </div>
    )
  }

  if (layout === 'inline-cta') {
    return (
      <div className={className}>
        <div className={`sh-inline-cta${description ? '' : ' sh-no-desc'}`}>
          <div className="sh-inline-cta-left">
            {eyebrow && <div className="sh-eyebrow">{eyebrow}</div>}
            {heading}
          </div>
          {cta}
        </div>
        {description && <div className="sh-desc">{description}</div>}
      </div>
    )
  }

  return (
    <div className={className}>
      {eyebrow && <div className="sh-eyebrow">{eyebrow}</div>}
      <div className={`sh-heading${description ? '' : ' sh-last'}`}>{heading}</div>
      {description && <div className="sh-desc">{description}</div>}
      {cta}
    </div>
  )
}
