'use client'

import { useState } from 'react'
import styles from '@/app/home.module.css'

const steps = [
  { n: '01', title: 'Understand the Business', desc: 'Market, product, customers, competitors and economics.' },
  { n: '02', title: 'Map Search Demand', desc: 'What people search, and which searches matter commercially.' },
  { n: '03', title: 'Find the Leaks', desc: 'Visibility, spend, conversion, follow-up, measurement.' },
  { n: '04', title: 'Prioritise', desc: 'Focus on the actions with the strongest commercial potential.' },
  { n: '05', title: 'Execute and Improve', desc: 'Paid, organic, local, AI search and conversion work.' },
  { n: '06', title: 'Measure the Result', desc: 'Search → lead → opportunity → sale → revenue.' },
]

export function ProcessSteps() {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.stepsRow}>
      {steps.map((step, i) => (
        <div
          key={step.n}
          className={`${styles.step} ${i === active ? styles.stepActive : ''}`}
          onMouseEnter={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <div className={styles.stepRail} />
          <div className={styles.stepHeader}>
            <div className={styles.stepDot} />
            <div className={`${styles.stepNum} ${i === active ? styles.stepNumActive : ''}`}>
              {step.n}
            </div>
          </div>
          <div className={styles.stepTitle}>{step.title}</div>
          <div className={styles.stepDesc}>{step.desc}</div>
        </div>
      ))}
    </div>
  )
}
