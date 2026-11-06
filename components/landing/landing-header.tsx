'use client'

import Image from 'next/image'
import { IconBadge } from '@/components/icon-badge'
import { useOpenContactPopup } from './contact-popup-provider'
import styles from './landing-header.module.css'

export function LandingHeader() {
  const openPopup = useOpenContactPopup()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image
            src="/images/hh-logo.png"
            alt="High Horse"
            width={26}
            height={26}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>HIGH HORSE</span>
        </div>

        <div className={styles.right}>
          <a href="tel:+918287194831" className={styles.contactItem} aria-label="Call +91-82871 94831">
            <IconBadge size="sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconBadge>
            <span className={styles.contactText}>+91-82871 94831</span>
          </a>

          <a href="mailto:contact@highhorse.in" className={styles.emailItem} aria-label="Email contact@highhorse.in">
            <IconBadge size="sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconBadge>
            <span className={styles.contactText}>contact@highhorse.in</span>
          </a>

          <button
            type="button"
            className={styles.ctaBtn}
            onClick={openPopup}
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  )
}
