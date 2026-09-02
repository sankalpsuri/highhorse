'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.css'

const CONTACT_HREF = '/contact-search-performance-marketing-agency'
const AUDIT_HREF = '/free-website-audit'

interface NavItem {
  label: string
  href: string
}

interface MegaMenuColumn {
  title: string
  items: NavItem[]
}

interface MegaMenuData {
  blurb: string
  columns: MegaMenuColumn[]
  cta: NavItem
}

const navLinks: NavItem[] = [
  { label: 'Who We Are', href: '/about-search-performance-marketing-agency' },
  { label: 'What We Do', href: '/search-intelligence-and-demand-discovery-services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Learn With Us', href: '/blog' },
]

const megaMenus: (MegaMenuData | null)[] = [
  {
    blurb: 'Led by Sankalp Suri, with direct senior involvement in strategy and results.',
    columns: [
      {
        title: 'About High Horse',
        items: [
          { label: 'Company', href: '/search-driven-performance-marketing-company' },
          { label: 'Careers', href: '/performance-marketing-agency-careers' },
          { label: 'Partnership', href: '/marketing-agency-partnership-program' },
        ],
      },
    ],
    cta: { label: 'About High Horse', href: '/search-driven-performance-marketing-company' },
  },
  {
    blurb: 'Everything we offer, across finding demand, capturing it, and building the systems that convert it.',
    columns: [
      {
        title: 'Search Intelligence',
        items: [
          { label: 'SEO', href: '/search-engine-optimization-seo-growth-services' },
          { label: 'Content Marketing', href: '/seo-content-marketing-and-demand-generation-services' },
          { label: 'AEO / GEO', href: '/answer-engine-optimization-and-ai-search-optimization-services' },
          { label: 'Voice SEO', href: '/voice-search-seo-optimization-services' },
        ],
      },
      {
        title: 'Performance Marketing',
        items: [
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
        items: [
          { label: 'UI/UX', href: '/conversion-focused-ui-ux-design-for-websites' },
          { label: 'Website Development', href: '/high-conversion-website-development-services' },
          { label: 'Marketplace Optimisation', href: '/marketplace-listing-optimization-for-ecommerce' },
          { label: 'Workflow Automation', href: '/ai-marketing-workflow-automation-solutions' },
        ],
      },
    ],
    cta: { label: 'View Capabilities', href: '/search-engine-optimization-seo-growth-services' },
  },
  null,
  {
    blurb: 'Practical tools and writing for teams running their own search programmes.',
    columns: [
      {
        title: 'Resources',
        items: [
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
    ],
    cta: { label: 'Talk to Us', href: CONTACT_HREF },
  },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)

  const clearActiveMenu = useCallback(() => setActiveMenu(null), [])
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
    setMobileExpanded(null)
  }, [])
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
  }, [])
  const toggleMobileSection = useCallback((index: number) => {
    setMobileExpanded((prev) => (prev === index ? null : index))
  }, [])

  const activeMenuData = activeMenu !== null ? megaMenus[activeMenu] : null

  return (
    <header className={styles.header} onMouseLeave={clearActiveMenu}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/hh-logo.png"
            alt="High Horse"
            width={26}
            height={26}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>HIGH HORSE</span>
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map((link, i) => {
            const hasMega = megaMenus[i] !== null
            if (hasMega) {
              return (
                <button
                  key={link.label}
                  type="button"
                  className={styles.navLink}
                  onMouseEnter={() => setActiveMenu(i)}
                >
                  {link.label}
                </button>
              )
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className={styles.navLink}
                onMouseEnter={() => setActiveMenu(i)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.actions}>
          <Link href={AUDIT_HREF} className={`${styles.ctaBtnAudit} ${styles.auditDesktopOnly}`}>
            <span className={styles.ctaBtnAuditDot} />
            Free Website Audit
          </Link>
          <Link href={CONTACT_HREF} className={`${styles.ctaBtn} ${styles.desktopOnly}`}>
            Find Your Search Opportunity
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Menu"
            className={styles.hamburger}
          >
            <div className={styles.hamburgerLines}>
              <div className={styles.hamburgerLine} />
              <div className={styles.hamburgerLine} />
              <div className={styles.hamburgerLine} />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link, i) => {
            const mega = megaMenus[i]
            if (mega) {
              const isExpanded = mobileExpanded === i
              return (
                <div key={link.label} className={styles.mobileSection}>
                  <button
                    type="button"
                    className={styles.mobileSectionToggle}
                    onClick={() => toggleMobileSection(i)}
                    aria-expanded={isExpanded}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className={styles.mobileSectionItems}>
                      {mega.columns.map((col) => (
                        <div key={col.title} className={styles.mobileSectionGroup}>
                          <div className={styles.mobileSectionTitle}>{col.title}</div>
                          {col.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={styles.mobileSectionLink}
                              onClick={closeMenu}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href={CONTACT_HREF} className={styles.mobileCta} onClick={closeMenu}>
            Find Your Search Opportunity
          </Link>
          <Link href={AUDIT_HREF} className={styles.mobileCtaAudit} onClick={closeMenu}>
            <span className={styles.ctaBtnAuditDot} />
            Free Website Audit
          </Link>
        </div>
      )}

      {activeMenuData && (
        <div className={styles.megaMenu}>
          <div className={styles.megaMenuGrid}>
            <div className={styles.megaMenuGridBg} />
            <div className={styles.megaMenuInner}>
              <div className={styles.megaMenuColumns}>
                {activeMenuData.columns.map((col) => (
                  <div key={col.title} className={styles.megaMenuColumn}>
                    <div className={styles.columnTitle}>
                      <div className={styles.columnTitleDot} />
                      <div className={styles.columnTitleText}>{col.title}</div>
                    </div>
                    <div className={styles.columnItems}>
                      {col.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={styles.columnItem}
                          onClick={clearActiveMenu}
                        >
                          <span>{item.label}</span>
                          <span className={styles.columnItemArrow}>&rarr;</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.megaMenuSidebar}>
                <div className={styles.megaMenuSidebarGlow} />
                <div style={{ position: 'relative' }}>
                  <div className={styles.megaMenuSidebarLabel}>Where this leads</div>
                  <div className={styles.megaMenuBlurb}>{activeMenuData.blurb}</div>
                </div>
                <div className={styles.megaMenuSidebarCtas}>
                  <Link
                    href={activeMenuData.cta.href}
                    className={styles.megaMenuCta}
                    onClick={clearActiveMenu}
                  >
                    {activeMenuData.cta.label}
                  </Link>
                  <Link
                    href={AUDIT_HREF}
                    className={styles.megaMenuCtaAudit}
                    onClick={clearActiveMenu}
                  >
                    <span className={styles.megaMenuCtaAuditDot} />
                    Free Website Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
