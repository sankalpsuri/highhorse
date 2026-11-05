import styles from './icon-badge.module.css'

interface IconBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ink' | 'darkGlow'
  className?: string
  children: React.ReactNode
}

// Partnership page uses variant="ink" (black square, white icon) by request;
// all other pages use the default light-blue style.
export function IconBadge({ size = 'md', variant, className, children }: IconBadgeProps) {
  const cls = [styles.badge, styles[size], variant ? styles[variant] : '', className].filter(Boolean).join(' ')
  return (
    <div className={cls}>
      {children}
    </div>
  )
}
