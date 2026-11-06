'use client'

import { useOpenContactPopup } from './contact-popup-provider'
import styles from './landing-quote-btn.module.css'

export function LandingQuoteBtn() {
  const openPopup = useOpenContactPopup()
  return (
    <button type="button" className={styles.btn} onClick={openPopup}>
      Get a Quote
    </button>
  )
}
