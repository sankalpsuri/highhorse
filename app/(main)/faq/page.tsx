import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { allFaqsQuery } from '@/lib/sanity/queries'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FaqBody } from './faq-body'
import styles from './faq.module.css'

export const metadata: Metadata = {
  title: 'FAQ — High Horse',
  description:
    'Answers to common questions about SEO, performance marketing, pricing, and how we work.',
}

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

const categoryMeta: Record<string, { label: string; order: number }> = {
  general: { label: 'General', order: 0 },
  seo: { label: 'SEO', order: 1 },
  'performance-marketing': { label: 'Performance Marketing', order: 2 },
  'pricing-process': { label: 'Pricing & Process', order: 3 },
}

interface FaqItem {
  _id: string
  question: string
  answer: any
  category?: string
}

export default async function FaqPage() {
  const faqs = await sanityFetch<FaqItem[]>(allFaqsQuery)

  const grouped = new Map<string, FaqItem[]>()
  for (const faq of faqs) {
    const cat = faq.category || 'general'
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(faq)
  }

  const sections = Array.from(grouped.entries())
    .map(([key, items]) => ({
      key,
      label: categoryMeta[key]?.label || key,
      order: categoryMeta[key]?.order ?? 99,
      items,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <div className={styles.heroBadgeDot} />
              <span className={styles.heroBadgeText}>Questions &amp; Answers</span>
            </div>
            <h1 className={styles.heroHeading}>
              The questions people ask us before they{' '}
              <span className={styles.heroAccent}>sign anything</span>
            </h1>
            <p className={styles.heroSub}>
              Straight answers on how we work, what it costs you in time, and what you
              can expect to see. If yours is not here, ask it directly.
            </p>
          </div>
          <div className={styles.heroAside}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardGlow} />
              <div style={{ position: 'relative' }}>
                <div className={styles.heroCardLabel}>Still unsure?</div>
                <div className={styles.heroCardBody}>
                  A 30-minute call answers more than a page of FAQs. No pitch until you
                  ask for one.
                </div>
                <Link href={CONTACT_HREF} className={styles.heroCardCta}>
                  Book a strategy call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter + Accordion + Sidebar ─────────────────────── */}
      {faqs.length === 0 ? (
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            <p className={styles.empty}>No FAQs yet. Check back soon.</p>
          </div>
        </div>
      ) : (
        <FaqBody sections={sections} />
      )}

      {/* ── Final CTA ────────────────────────────────────────── */}
      <div className={styles.cta}>
        <div className={styles.ctaGrid} />
        <div className={styles.ctaGlow} />
        <ScrollReveal>
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaHeading}>
                Find out what the answers say about you today.
              </h2>
              <p className={styles.ctaSub}>
                We will check where you currently appear across search and AI answers,
                show you the gaps against your competitors, and tell you what is worth
                fixing first.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <Link href={CONTACT_HREF} className={styles.ctaBtnPrimary}>
                Book a strategy call
              </Link>
              <Link href={CONTACT_HREF} className={styles.ctaBtnOutline}>
                Request a pitch deck
              </Link>
              <div className={styles.ctaDisclaimer}>
                No obligation. You keep the findings either way.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
