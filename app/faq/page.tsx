import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { allFaqsQuery } from '@/lib/sanity/queries'
import { FaqAccordion } from '@/components/faq-accordion'

export const metadata: Metadata = {
  title: 'FAQ — High Horse',
  description:
    'Answers to common questions about SEO, performance marketing, pricing, and how we work.',
}

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
      <section className="faq-hero">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              color: '#1A6AFF',
              marginBottom: 10,
            }}
          >
            Support
          </div>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#111111',
              maxWidth: 580,
              marginBottom: 16,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 15,
              color: '#5c5c5c',
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            Answers to the questions we hear most about search, performance
            marketing, and how we work with clients.
          </p>
        </div>
      </section>

      {/* ── FAQ Sections ──────────────────────────────────────── */}
      {faqs.length === 0 ? (
        <section style={{ padding: '0 0 64px' }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
                color: '#8a8a86',
                padding: '40px 0',
                textAlign: 'center',
              }}
            >
              No FAQs yet. Check back soon.
            </p>
          </div>
        </section>
      ) : (
        sections.map((section) => (
          <section key={section.key} className="faq-section">
            <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.1rem, 2vw, 1.375rem)',
                  fontWeight: 700,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                  marginBottom: 20,
                }}
              >
                {section.label}
              </h2>
              <FaqAccordion faqs={section.items} />
            </div>
          </section>
        ))
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .faq-hero {
              padding: 56px 0 0;
            }
            .faq-section {
              padding: 40px 0;
            }
            .faq-section:last-of-type {
              padding-bottom: 64px;
            }
            @media (max-width: 768px) {
              .faq-hero { padding: 48px 0 0; }
              .faq-section { padding: 32px 0; }
              .faq-section:last-of-type { padding-bottom: 56px; }
            }
            @media (max-width: 480px) {
              .faq-hero { padding: 40px 0 0; }
              .faq-section { padding: 28px 0; }
              .faq-section:last-of-type { padding-bottom: 48px; }
            }
            @media (max-width: 374px) {
              .faq-hero { padding: 32px 0 0; }
              .faq-section { padding: 24px 0; }
              .faq-section:last-of-type { padding-bottom: 40px; }
            }
          `,
        }}
      />
    </main>
  )
}
