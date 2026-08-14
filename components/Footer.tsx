import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.css'

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

const footerNav = [
  { label: 'How We Work', href: '/about-search-performance-marketing-agency' },
  { label: 'Paid Search', href: '/ppc-advertising-management-and-performance-marketing' },
  { label: 'Organic + AI Search', href: '/search-engine-optimization-seo-growth-services' },
  { label: 'Case Studies', href: '/marketing-insights-and-research' },
  { label: 'About', href: '/search-driven-performance-marketing-company' },
  { label: 'Contact', href: CONTACT_HREF },
]

const connectLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <Image
              src="/images/hh-logo.png"
              alt="High Horse"
              width={22}
              height={22}
              className={styles.brandLogoImg}
            />
            <span className={styles.brandLogoText}>HIGH HORSE</span>
          </div>
          <div className={styles.tagline}>We turn intent into revenue.</div>
          <div className={styles.subtext}>Search Marketing Agency</div>
          <Image
            src="/images/google-partner-badge.png"
            alt="Google Partner"
            width={96}
            height={36}
            className={styles.badge}
          />
        </div>

        <div className={styles.col}>
          <div className={styles.colTitle}>Navigate</div>
          <div className={styles.colLinks}>
            {footerNav.map((link) => (
              <Link key={link.label} href={link.href} className={styles.colLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.colTitle}>Connect</div>
          <div className={styles.colLinks}>
            {connectLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.colLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        &copy; 2026 High Horse. Contact:{' '}
        <a href="mailto:hello@highhorse.in" className={styles.bottomLink}>
          hello@highhorse.in
        </a>
      </div>
    </footer>
  )
}
