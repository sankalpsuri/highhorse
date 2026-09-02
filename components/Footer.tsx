import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.css'

const navColumns = [
  {
    title: 'Who We Are',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Company', href: '/search-driven-performance-marketing-company' },
      { label: 'Careers', href: '/performance-marketing-agency-careers' },
      { label: 'Partnership', href: '/marketing-agency-partnership-program' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Search Intelligence',
    links: [
      { label: 'SEO', href: '/search-engine-optimization-seo-growth-services' },
      { label: 'Content Marketing', href: '/seo-content-marketing-and-demand-generation-services' },
      { label: 'AEO/GEO', href: '/answer-engine-optimization-and-ai-search-optimization-services' },
      { label: 'Voice SEO', href: '/voice-search-seo-optimization-services' },
    ],
  },
  {
    title: 'Performance Marketing',
    links: [
      { label: 'Search Ads', href: '/google-search-ads-management-for-lead-generation' },
      { label: 'Shopping Ads', href: '/google-shopping-ads-management-for-ecommerce' },
      { label: 'PPC Ads', href: '/ppc-advertising-management-and-performance-marketing' },
      { label: 'Visual Ads', href: '/display-and-visual-advertising-campaign-management' },
      { label: 'Retargeting', href: '/retargeting-and-remarketing-ad-campaign-services' },
      { label: 'ChatGPT Ads', href: '/chatgpt-ads-management-services' },
    ],
  },
  {
    title: 'Experience & Systems',
    links: [
      { label: 'UI/UX', href: '/conversion-focused-ui-ux-design-for-websites' },
      { label: 'Website Development', href: '/high-conversion-website-development-services' },
      { label: 'Marketplace Optimisation', href: '/marketplace-listing-optimization-for-ecommerce' },
      { label: 'Workflow Automation', href: '/ai-marketing-workflow-automation-solutions' },
    ],
  },
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
          <a
            href="https://partnersdirectory.withgoogle.com/partners/6812870132"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badgeLink}
          >
            <Image
              src="/images/google-partner-badge.png"
              alt="Google Partner"
              width={96}
              height={36}
              className={styles.badge}
            />
          </a>

          <div className={styles.contactBlock}>
            <div className={styles.contactTitle}>Contact</div>
            <a href="mailto:contact@highhorse.in" className={styles.contactLink}>
              contact@highhorse.in
            </a>
            <a href="tel:+918287194831" className={styles.contactLink}>
              Tel: +91-82871 94831
            </a>
            <address className={styles.contactAddress}>
              A-4, West, Block A, Vishal Enclave,<br />
              Tagore Garden Extension, Delhi, 110027
            </address>
          </div>
        </div>

        {navColumns.map((col) => (
          <div key={col.title} className={styles.col}>
            <div className={styles.colTitle}>{col.title}</div>
            <div className={styles.colLinks}>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className={styles.colLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        &copy; 2026 High Horse. Contact:{' '}
        <a href="mailto:contact@highhorse.in" className={styles.bottomLink}>
          contact@highhorse.in
        </a>
      </div>
    </footer>
  )
}
