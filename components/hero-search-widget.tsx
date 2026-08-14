'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import styles from '@/app/home.module.css'

const engines = [
  { label: 'Google', src: '/images/logo-google.webp' },
  { label: 'Perplexity', src: '/images/logo-perplexity.webp' },
  { label: 'ChatGPT', src: '/images/logo-chatgpt.png' },
  { label: 'Gemini', src: '/images/logo-gemini.webp' },
  { label: 'Claude', src: '/images/logo-claude.png' },
]

const queries = [
  'best crm for real estate agents',
  'industrial insulating varnish supplier near me',
  'company formation consultants in dubai cost',
  'is it worth hiring an seo agency for b2b',
  'play school admission fees in gurgaon',
  'top rated ready meals delivered india',
  'alternatives to hubspot for small teams',
  'moving and cleaning services same day',
]

export function HeroSearchWidget() {
  const [typed, setTyped] = useState('')
  const [caretOn, setCaretOn] = useState(true)
  const [engineIdx, setEngineIdx] = useState(0)

  const qi = useRef(0)
  const ci = useRef(0)
  const phase = useRef<'type' | 'hold' | 'erase'>('type')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const tick = useCallback(() => {
    const q = queries[qi.current]
    if (phase.current === 'type') {
      ci.current++
      setTyped(q.slice(0, ci.current))
      if (ci.current >= q.length) {
        phase.current = 'hold'
        timer.current = setTimeout(tick, 1500)
        return
      }
      timer.current = setTimeout(tick, 45 + Math.random() * 55)
    } else if (phase.current === 'hold') {
      phase.current = 'erase'
      timer.current = setTimeout(tick, 250)
    } else {
      ci.current -= 2
      if (ci.current <= 0) {
        ci.current = 0
        qi.current = (qi.current + 1) % queries.length
        phase.current = 'type'
        setTyped('')
        setEngineIdx(qi.current % engines.length)
        timer.current = setTimeout(tick, 400)
        return
      }
      setTyped(q.slice(0, ci.current))
      timer.current = setTimeout(tick, 22)
    }
  }, [])

  useEffect(() => {
    timer.current = setTimeout(tick, 600)
    const blink = setInterval(() => setCaretOn((c) => !c), 530)
    return () => {
      clearTimeout(timer.current)
      clearInterval(blink)
    }
  }, [tick])

  return (
    <div>
      <div className={styles.searchWidget}>
        <div className={styles.searchWidgetTitle}>Capture demand in</div>
        <div className={styles.engineTabs}>
          {engines.map((e, i) => (
            <div
              key={e.label}
              className={`${styles.engineTab} ${i === engineIdx ? styles.engineTabActive : ''}`}
              onClick={() => setEngineIdx(i)}
            >
              <Image src={e.src} alt={e.label} width={15} height={15} style={{ objectFit: 'contain' }} />
              <span>{e.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon} />
          <div className={styles.searchText}>
            {typed}
            <span className={styles.caret} style={{ opacity: caretOn ? 1 : 0 }} />
          </div>
        </div>
        <div className={styles.searchResults}>
          <div className={styles.searchResultsLabel}>Who gets found here?</div>
          <div className={styles.resultRow}>
            <div className={styles.resultThumb} />
            <div className={styles.resultBars}>
              <div className={`${styles.resultBar} ${styles.resultBarComp1}`} />
              <div className={styles.resultSub} />
            </div>
            <div className={`${styles.resultTag} ${styles.resultTagComp}`}>Competitor</div>
          </div>
          <div className={styles.resultRow}>
            <div className={styles.resultThumb} />
            <div className={styles.resultBars}>
              <div className={`${styles.resultBar} ${styles.resultBarYou}`} />
              <div className={styles.resultSub} />
            </div>
            <div className={`${styles.resultTag} ${styles.resultTagYou}`}>You</div>
          </div>
          <div className={styles.resultRow}>
            <div className={styles.resultThumb} />
            <div className={styles.resultBars}>
              <div className={`${styles.resultBar} ${styles.resultBarComp2}`} />
              <div className={styles.resultSub} />
            </div>
            <div className={`${styles.resultTag} ${styles.resultTagComp}`}>Competitor</div>
          </div>
        </div>
      </div>
      <div className={styles.searchCaption}>
        This is where the decision starts—across paid, organic, Maps and AI answers.
      </div>
    </div>
  )
}
