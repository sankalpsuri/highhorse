import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/scroll-reveal'
import styles from './partnership.module.css'

export const metadata: Metadata = {
  title: 'Partnership Program — High Horse',
  description:
    'Partner with High Horse as a freelance project collaborator or white label sales partner. Transparent models, consistent work, and mutually beneficial growth.',
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const freelanceBullets = [
  'Project allocation is not guaranteed and depends on availability, performance, and business requirements.',
  'Timely delivery is mandatory; repeated delays may result in reduced priority or termination.',
  'Quality standards must be strictly followed as per project brief; rework may be required at no additional cost if guidelines are not met.',
  'Payment will only be released after final approval and completion of deliverables.',
  'Any failure to respond within a reasonable timeframe may lead to reassignment of the project.',
]

const salesBullets = [
  'Commission is applicable only on 100% successful payments received from the client.',
  'No commission will be paid on incomplete, cancelled, or disputed transactions.',
  'Final pricing, discounting, and negotiation authority remains solely with our company.',
  'Leads must be genuine and not previously contacted or existing in our database.',
  'Misrepresentation of services, pricing, or brand identity will lead to immediate termination and forfeiture of commission.',
  'Commission structure may be revised with prior notice based on business requirements.',
]

const termGroups = [
  {
    n: '01',
    title: 'General Terms',
    items: [
      'All partnerships are non-exclusive unless explicitly agreed in writing.',
      'We reserve the right to accept, reject, or discontinue any partnership at our sole discretion.',
      'All communication, project updates, and approvals must happen only through official channels.',
      'Any unauthorized commitment or promise made to a client or third party on our behalf is strictly prohibited.',
      'Confidentiality of all internal processes, pricing, client data, and business strategies must be maintained at all times.',
    ],
  },
  {
    n: '02',
    title: 'Termination & Compliance',
    items: [
      'We reserve the right to terminate any partnership without prior notice in case of misconduct, policy violation, or reputational risk.',
      'Any pending payments at the time of termination will be evaluated based on completed and approved work only.',
      'Partners must comply with all applicable laws and ethical business practices.',
    ],
  },
  {
    n: '03',
    title: 'Acceptance',
    items: [
      'By joining as a partner, you acknowledge that you have read, understood, and agreed to these terms and conditions.',
    ],
  },
]

/* ── Page ──────────────────────────────────────────────────────────────── */

const CTA_HREF = '/contact-search-performance-marketing-agency'

export default function PartnershipPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="hh-grid-bg" aria-hidden="true" />
        <div className="hh-glow-blue" aria-hidden="true" />
        <div className={styles.heroInner} style={{ position: 'relative' }}>
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeDot} />
            <span className={styles.heroBadgeText}>Partnership Program</span>
          </div>
          <h1 className={styles.heroTitle}>
            Partner With <span className={styles.heroAccent}>Us</span>
          </h1>
          <p className={styles.heroBody}>
            We believe in growing together through strong collaborations. Whether you are a skilled
            freelancer looking for consistent project opportunities or a sales partner aiming to
            earn through referrals, we offer a transparent and mutually beneficial partnership model.
          </p>
          <Link href={CTA_HREF} className={styles.heroCta}>
            Connect with Us
          </Link>
        </div>
      </section>

      {/* ── Freelance Project Partners ────────────────────── */}
      <ScrollReveal>
      <section className={styles.sectionGray}>
        <div className={styles.partnerLayout}>
          <div className={styles.partnerText}>
            <div className={styles.partnerLabelRow}>
              <div className={styles.partnerIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF9D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M4 20a8 8 0 0 1 16 0" />
                </svg>
              </div>
              <div className={styles.partnerModelLabel}>Model 01</div>
            </div>
            <h2 className={styles.partnerTitle}>Freelance Project Partners</h2>
            <p className={styles.partnerBody}>
              If you are a freelancer or independent professional, you can collaborate with us on a
              project basis. We assign relevant work based on your skill set, and you get paid for
              each successfully completed project. This model is ideal for designers, developers,
              writers, editors, marketers, and other creative professionals who want consistent work
              without long-term commitment.
            </p>
            <Link href={CTA_HREF} className={styles.partnerCta}>
              Become Freelance Partner
            </Link>
          </div>
          <div className={styles.termsCard}>
            <div className={styles.termsCardHeading}>Freelance Partner Terms</div>
            {freelanceBullets.map((b) => (
              <div key={b} className={styles.termsCardItem}>
                <span className={styles.termsCardBullet} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── White Label Sales Partners ────────────────────── */}
      <ScrollReveal>
      <section className={styles.sectionWhite}>
        <div className={styles.partnerLayout}>
          <div className={`${styles.termsCard} ${styles.termsCardSales}`}>
            <div className={styles.termsCardHeading}>Sales Partner Terms</div>
            {salesBullets.map((b) => (
              <div key={b} className={styles.termsCardItemOrange}>
                <span className={styles.termsCardBulletOrange} />
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className={styles.partnerText}>
            <div className={styles.partnerLabelRow}>
              <div className={styles.partnerIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF9D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20l6-6 4 4 6-8 M14 6h6v6" />
                </svg>
              </div>
              <div className={styles.partnerModelLabel}>Model 02</div>
            </div>
            <h2 className={styles.partnerTitle}>White Label Sales Partners</h2>
            <p className={styles.partnerBody}>
              If you have a strong network or sales capability, you can become our white label sales
              partner. You bring clients or projects to us, and we execute the work under our team.
              You earn a fixed commission or percentage on every successful conversion or project
              closure generated through your efforts.
            </p>
            <Link href={CTA_HREF} className={styles.partnerCta}>
              Become Sales Partner
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Terms & Conditions (dark) ────────────────────── */}
      <ScrollReveal>
      <section className={styles.termsDark}>
        <div className={styles.termsDarkGrid} aria-hidden="true" />
        <div className={styles.termsDarkGlow} aria-hidden="true" />
        <div className={styles.termsDarkInner}>
          <div className={styles.termsDarkHeader}>
            <div className={styles.termsDarkLabel}>Partnership terms &amp; conditions</div>
            <h2 className={styles.termsDarkTitle}>
              To ensure smooth collaboration and maintain quality standards
            </h2>
            <p className={styles.termsDarkSub}>
              The following terms apply to all partners, both Freelance and White Label Sales Partners.
            </p>
          </div>
          <div className={styles.termsDarkCards}>
            {termGroups.map((g) => (
              <div key={g.n} className={styles.termsDarkCard}>
                <div className={styles.termsDarkCardNum}>{g.n}</div>
                <h3 className={styles.termsDarkCardTitle}>{g.title}</h3>
                <div className={styles.termsDarkCardItems}>
                  {g.items.map((item) => (
                    <div key={item} className={styles.termsDarkCardItem}>
                      <span className={styles.termsDarkCardBullet} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.termsDarkDisclaimer}>
            By joining as a partner, you acknowledge that you have read, understood, and agreed to
            these terms and conditions.
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── CTA ──────────────────────────────────────────── */}
      <ScrollReveal>
      <section className={styles.ctaSection}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Ready to grow together?</h2>
            <p className={styles.ctaSub}>
              Tell us which partnership model fits you, and we will get back to you with the next steps.
            </p>
          </div>
          <Link href={CTA_HREF} className={styles.ctaBtn}>
            Connect with Us
          </Link>
        </div>
      </section>
      </ScrollReveal>
    </div>
  )
}
