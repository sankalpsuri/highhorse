'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ScrollReveal } from '@/components/scroll-reveal'
import styles from './faq.module.css'

interface FaqItem {
  _id: string
  question: string
  answer: any
}

interface Section {
  key: string
  label: string
  items: FaqItem[]
}

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

const readNextLinks = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'How We Work', href: '/search-driven-performance-marketing-company' },
  { label: 'Free Website Audit', href: '/free-website-audit' },
]

export function FaqBody({ sections }: { sections: Section[] }) {
  const [filter, setFilter] = useState('All')
  const [openKey, setOpenKey] = useState<string | null>(null)

  const tabLabels = ['All', ...sections.map((s) => s.label)]
  const filtered = filter === 'All' ? sections : sections.filter((s) => s.label === filter)

  return (
    <div className={styles.body}>
      <div className={styles.bodyInner}>
        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {tabLabels.map((label) => (
            <button
              key={label}
              className={`${styles.filterTab} ${filter === label ? styles.filterTabActive : ''}`}
              onClick={() => {
                setFilter(label)
                setOpenKey(null)
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className={styles.columns}>
          {/* Main column — grouped accordion */}
          <div className={styles.mainCol}>
            {filtered.map((section) => (
              <ScrollReveal key={section.key}>
                <div className={styles.group}>
                  <div className={styles.groupHeader}>
                    <div className={styles.groupLabel}>{section.label}</div>
                    <div className={styles.groupDivider} />
                    <div className={styles.groupCount}>
                      {section.items.length} {section.items.length === 1 ? 'question' : 'questions'}
                    </div>
                  </div>
                  <div className={styles.groupCard}>
                    {section.items.map((faq) => {
                      const itemKey = `${section.key}-${faq._id}`
                      const isOpen = openKey === itemKey
                      return (
                        <div key={faq._id} className={styles.accItem}>
                          <button
                            className={styles.accQuestion}
                            onClick={() => setOpenKey(isOpen ? null : itemKey)}
                            aria-expanded={isOpen}
                          >
                            <span className={styles.accQuestionText}>{faq.question}</span>
                            <span className={`${styles.accIcon} ${isOpen ? styles.accIconOpen : ''}`}>
                              +
                            </span>
                          </button>
                          <div className={`${styles.accAnswerWrap} ${isOpen ? styles.accAnswerWrapOpen : ''}`}>
                            <div className={styles.accAnswerInner}>
                              <div className={styles.accAnswer}>
                                {Array.isArray(faq.answer) ? (
                                  <PortableText value={faq.answer} />
                                ) : (
                                  faq.answer
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarLabel}>Read next</div>
              <div className={styles.sidebarLinks}>
                {readNextLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.sidebarLink}>
                    <span>{link.label}</span>
                    <span className={styles.sidebarArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeading}>Your question is not here</div>
              <p className={styles.sidebarBody}>
                Send it over. We answer directly, without routing you through a sales sequence.
              </p>
              <Link href={CONTACT_HREF} className={styles.sidebarCta}>
                Ask us instead
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
