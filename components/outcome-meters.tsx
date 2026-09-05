'use client'

import { useEffect, useRef } from 'react'
import styles from '@/app/home.module.css'

const outcomes = [
  { label: 'Customers already searching, captured', dir: 'up' as const, width: '84%' },
  { label: 'Wasted advertising spend', dir: 'down' as const, width: '32%' },
  { label: 'Existing traffic converted', dir: 'up' as const, width: '76%' },
  { label: 'Qualified lead quality', dir: 'up' as const, width: '80%' },
  { label: 'Acquisition inefficiency', dir: 'down' as const, width: '28%' },
  { label: 'Clarity on what creates revenue', dir: 'up' as const, width: '92%' },
]

const outcomeChain = ['Demand captured', 'Conversion improved', 'Waste reduced', 'Revenue measured']

export function OutcomeMeters() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const bars = el.querySelectorAll<HTMLElement>('[data-outcome-bar]')
    bars.forEach((bar) => {
      bar.style.width = '0%'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars.forEach((bar) => {
            const target = bar.dataset.outcomeBar || '100%'
            setTimeout(() => { bar.style.width = target }, 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <div className={styles.outcomeGrid}>
        {outcomes.map((o) => (
          <div key={o.label} className={styles.outcomeCard}>
            <div className={styles.outcomeCardHeader}>
              <div className={styles.outcomeLabel}>{o.label}</div>
              <div className={o.dir === 'up' ? styles.outcomeDirUp : styles.outcomeDirDown}>
                {o.dir === 'up' ? '↑' : '↓'}
              </div>
            </div>
            <div className={styles.outcomeBarTrack}>
              <div
                className={o.dir === 'up' ? styles.outcomeBarUp : styles.outcomeBarDown}
                data-outcome-bar={o.width}
                style={{ width: o.width, transition: 'width 1.1s cubic-bezier(.2,.7,.2,1)' }}
              />
            </div>
            <div className={styles.outcomeBarLabels}>
              <span>Before</span>
              <span>After</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.outcomeChainWrap}>
        <div className={styles.outcomeChain}>
          <div className={styles.chainTrack}>
            {outcomeChain.map((label, i) => (
              <div key={label} className={styles.chainNode}>
                <div className={styles.chainBox}>{label}</div>
                {i < outcomeChain.length - 1 && <div className={styles.chainArrow} />}
              </div>
            ))}
            <div className={styles.chainNodeDup} aria-hidden>
              <div className={styles.chainArrow} />
            </div>
            {outcomeChain.map((label, i) => (
              <div key={`dup-${label}`} className={styles.chainNodeDup} aria-hidden>
                <div className={styles.chainBox}>{label}</div>
                {i < outcomeChain.length - 1 && <div className={styles.chainArrow} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
