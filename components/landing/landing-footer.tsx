import Image from 'next/image'
import { LandingContactForm } from './landing-contact-form'
import styles from './landing-footer.module.css'

export function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image
              src="/images/hh-logo.png"
              alt="High Horse"
              width={22}
              height={22}
              className={styles.logoImg}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className={styles.logoText}>HIGH HORSE</span>
          </div>

          <div className={styles.eyebrow}>CONTACT US</div>
          <h2 className={styles.heading}>Tell us what you need</h2>
          <p className={styles.sub}>We&rsquo;ll get back to you within one business day.</p>

          <div className={styles.contactRows}>
            <div className={styles.contactRow}>
              <div className={styles.iconBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.contactText}>+91-82871 94831</span>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.iconBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.contactText}>contact@highhorse.in</span>
            </div>
          </div>

          <div className={styles.partnerBadge}>
            <Image
              src="/images/google-partner-badge.png"
              alt="Google Partner"
              width={96}
              height={36}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className={styles.right}>
          <LandingContactForm variant="footer" />
        </div>
      </div>

      <div className={styles.bottom}>
        &copy; 2026 High Horse. All rights reserved.
      </div>
    </footer>
  )
}
