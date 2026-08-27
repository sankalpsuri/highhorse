'use client'

import { useEffect, useRef } from 'react'
import styles from '@/app/home.module.css'

const leaks = [
  { n: '01', title: 'Visibility Leak', signal: 'Competitors rank for your highest-intent terms', desc: 'You do not appear when valuable customers search.', width: '100%' },
  { n: '02', title: 'Spend Leak', signal: 'Spend rising, qualified leads flat', desc: 'Budget goes to searches that never create business.', width: '80%' },
  { n: '03', title: 'Conversion Leak', signal: 'Healthy traffic, low enquiries', desc: 'People visit but do not enquire, call or buy.', width: '58%' },
  { n: '04', title: 'Follow-up Leak', signal: 'Slow response, inconsistent handling', desc: 'Leads are not handled quickly or consistently.', width: '42%' },
  { n: '05', title: 'Measurement Leak', signal: 'No clear line from spend to revenue', desc: 'Activity cannot be connected to sales and revenue.', width: '28%' },
]

export function LeakFunnel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const bars = el.querySelectorAll<HTMLElement>('[data-leak-bar]')
    bars.forEach((bar) => {
      bar.style.width = '0%'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars.forEach((bar) => {
            const target = bar.dataset.leakBar || '100%'
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
    <div ref={containerRef} className={styles.leakCard}>
      <div className={styles.leakCardHeader}>
        <div className={styles.leakCardLabel}>The demand pipeline</div>
        <div className={styles.leakLegend}>
          <div className={styles.leakLegendItem}>
            <div className={styles.leakLegendBar} />
            <span>Demand you keep</span>
          </div>
          <div className={styles.leakLegendItem}>
            <div className={styles.leakLegendBarStriped} />
            <span>Where it leaks</span>
          </div>
        </div>
      </div>

      {leaks.map((leak) => (
        <div key={leak.n} className={styles.leakRow}>
          <div className={styles.leakRowLeft}>
            <div className={styles.leakNum}>{leak.n}</div>
            <div>
              <div className={styles.leakTitle}>{leak.title}</div>
              <div className={styles.leakSignal}>{leak.signal}</div>
            </div>
          </div>
          <div className={styles.leakBarWrap}>
            <div className={styles.leakBarBg}>
              <div
                className={styles.leakBarFill}
                data-leak-bar={leak.width}
                style={{ width: leak.width, transition: 'width 1.1s cubic-bezier(.2,.7,.2,1)' }}
              />
            </div>
          </div>
          <div className={styles.leakRowDesc}>{leak.desc}</div>
        </div>
      ))}
      <div className={styles.leakDisclaimer}>
        Illustrative. Where demand actually leaks, and how much, differs by business — finding that is the first thing we do.
      </div>
    </div>
  )
}
