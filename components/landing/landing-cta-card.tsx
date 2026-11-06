'use client'

import Image from 'next/image'
import { useOpenContactPopup } from './contact-popup-provider'
import styles from './landing-cta-card.module.css'

export function LandingCtaCard() {
  const openPopup = useOpenContactPopup()

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <Image
          src="/assets/Our Story.jpg"
          alt="High Horse search funnels and brand growth"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.sector}>YOUR BUSINESS</div>
        <div className={styles.name}>Want results like these?</div>
        <div className={styles.blurb}>
          Tell us your goals and we&rsquo;ll plan the search and digital growth work for your business.
        </div>
        <button type="button" className={styles.btn} onClick={openPopup}>
          Get a Quote
        </button>
      </div>
    </div>
  )
}
