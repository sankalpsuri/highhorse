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
    cta: { label: 'About High Horse', href: '/about-search-performance-marketing-agency' },
  },
  {
    blurb: 'Everything we offer, across finding demand, capturing it, and building the systems that convert it.',
    columns: [
      {
        title: 'Search Intelligence',
        items: [
          { label: 'Demand Discovery', href: '/search-intelligence-and-demand-discovery-services' },
          { label: 'AEO / GEO', href: '/answer-engine-optimization-and-ai-search-optimization-services' },
          { label: 'Voice SEO', href: '/voice-search-seo-optimization-services' },
          { label: 'SEO', href: '/search-engine-optimization-seo-growth-services' },
          { label: 'Content Marketing', href: '/seo-content-marketing-and-demand-generation-services' },
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
    cta: { label: 'View Capabilities', href: '/search-intelligence-and-demand-discovery-services' },
  },
  null,
  {
    blurb: 'Practical tools and writing for teams running their own search programmes.',
    columns: [
      {
        title: 'Resources',
        items: [
          { label: 'Calculator', href: '/marketing-roi-calculator-for-growth' },
          { label: 'Tutorials', href: '/performance-marketing-tutorials-and-training' },
          { label: 'Guides', href: '/performance-marketing-strategy-guides' },
          { label: 'Templates', href: '/marketing-strategy-templates-download' },
          { label: 'Insights', href: '/marketing-insights-and-research' },
          { label: 'Blog', href: '/blog' },
        ],
      },
    ],
    cta: { label: 'Talk to Us', href: CONTACT_HREF },
  },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const clearActiveMenu = useCallback(() => setActiveMenu(null), [])
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.navLink}
              onMouseEnter={() => setActiveMenu(i)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={AUDIT_HREF} className={styles.ctaBtnDark}>
            Free Website Audit
          </Link>
          <Link href={CONTACT_HREF} className={styles.ctaBtn}>
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link href={AUDIT_HREF} className={styles.mobileCtaDark} onClick={closeMenu}>
            Free Website Audit
          </Link>
          <Link href={CONTACT_HREF} className={styles.mobileCta} onClick={closeMenu}>
            Find Your Search Opportunity
          </Link>
        </div>
      )}

      {activeMenuData && (
        <div className={styles.megaMenu}>
          <div className={styles.megaMenuInner}>
            <div className={styles.megaMenuColumns}>
              {activeMenuData.columns.map((col) => (
                <div key={col.title} className={styles.megaMenuColumn}>
                  <div className={styles.columnTitle}>{col.title}</div>
                  <div className={styles.columnItems}>
                    {col.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={styles.columnItem}
                        onClick={clearActiveMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.megaMenuSidebar}>
              <div className={styles.megaMenuBlurb}>{activeMenuData.blurb}</div>
              <Link
                href={activeMenuData.cta.href}
                className={styles.megaMenuCta}
                onClick={clearActiveMenu}
              >
                {activeMenuData.cta.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
