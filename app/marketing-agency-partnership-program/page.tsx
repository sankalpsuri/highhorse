import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { existsSync } from 'fs'
import { join } from 'path'
import styles from './partnership.module.css'

export const metadata: Metadata = {
  title: 'Partnership Program — High Horse',
  description:
    'Partner with High Horse as a freelance project collaborator or white label sales partner. Transparent models, consistent work, and mutually beneficial growth.',
}

/* ──────────────────────────────────────────────────────────────────────
 * ASSET CONFIG
 *
 * Icon slots for the partner cards. Paths are relative to public/
 * (served at the root URL). Drop files into  public/assets/.
 * If a referenced file doesn't exist yet, a placeholder box renders
 * instead of a broken image.
 * ────────────────────────────────────────────────────────────────────── */
const ASSETS = {
  freelancePartnerIcon: '/assets/freelance-partners.png',
  salesPartnerIcon: '/assets/sales-partner-icon.svg',
}

function fileExists(src: string): boolean {
  return existsSync(join(process.cwd(), 'public', src))
}

function AssetIcon({ src, slot }: { src: string; slot: string }) {
  if (fileExists(src)) {
    return (
      <Image src={src} alt="" width={28} height={28} className={styles.cardIcon} />
    )
  }
  return (
    <div className={styles.iconPlaceholder}>
      <span className={styles.placeholderLabel}>{slot}</span>
    </div>
  )
}

function GoogleGIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
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
  { text: 'Commission is applicable only on ', bold: '100% successful payments received from the client', after: '.' },
  { text: 'No commission will be paid on incomplete, cancelled, or disputed transactions.', bold: null, after: null },
  { text: 'Final pricing, discounting, and negotiation authority remains solely with our company.', bold: null, after: null },
  { text: 'Leads must be genuine and not previously contacted or existing in our database.', bold: null, after: null },
  { text: 'Misrepresentation of services, pricing, or brand identity will lead to immediate termination and forfeiture of commission.', bold: null, after: null },
  { text: 'Commission structure may be revised with prior notice based on business requirements.', bold: null, after: null },
]

const generalTerms = [
  'All partnerships are non-exclusive unless explicitly agreed in writing.',
  'We reserve the right to accept, reject, or discontinue any partnership at our sole discretion.',
  'All communication, project updates, and approvals must happen only through official channels.',
  'Any unauthorized commitment or promise made to a client or third party on our behalf is strictly prohibited.',
  'Confidentiality of all internal processes, pricing, client data, and business strategies must be maintained at all times.',
]

const terminationTerms = [
  'We reserve the right to terminate any partnership without prior notice in case of misconduct, policy violation, or reputational risk.',
  'Any pending payments at the time of termination will be evaluated based on completed and approved work only.',
  'Partners must comply with all applicable laws and ethical business practices.',
]

/* ── Page ──────────────────────────────────────────────────────────────── */

/*
 * CTA DESTINATION: All three buttons ("Connect with Us", "Become
 * Freelance Partner", "Become Sales Partner") link to the Contact page
 * for now. No dedicated partnership application form exists yet —
 * these may eventually need their own forms.
 */
const CTA_HREF = '/contact-search-performance-marketing-agency'

export default function PartnershipPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <GoogleGIcon />
            <span className={styles.heroBadgeText}>Certified Google Partner</span>
          </div>
          <h1 className={styles.heroTitle}>Partner With Us</h1>
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

      {/* ── 2. Partner Cards ─────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.cardGrid}>
          {/* Card 1 — Freelance */}
          <div className={styles.partnerCard}>
            <div className={styles.cardIconWrap}>
              <AssetIcon src={ASSETS.freelancePartnerIcon} slot="freelancePartnerIcon" />
            </div>
            <h2 className={styles.cardTitle}>1. Freelance Project Partners</h2>
            <p className={styles.cardBody}>
              If you are a freelancer or independent professional, you can collaborate with us on a
              project basis. We assign relevant work based on your skill set, and you get paid for
              each successfully completed project. This model is ideal for designers, developers,
              writers, editors, marketers, and other creative professionals who want consistent work
              without long-term commitment.
            </p>
            <div className={styles.cardSubheading}>Freelance Project Partner Terms</div>
            <ul className={styles.bulletList}>
              {freelanceBullets.map((b) => (
                <li key={b} className={styles.bulletItem}>
                  <div className={styles.bullet} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link href={CTA_HREF} className={styles.cardCta}>
              Become Freelance Partner
            </Link>
          </div>

          {/* Card 2 — Sales */}
          <div className={styles.partnerCard}>
            <div className={styles.cardIconWrap}>
              <AssetIcon src={ASSETS.salesPartnerIcon} slot="salesPartnerIcon" />
            </div>
            <h2 className={styles.cardTitle}>2. White Label Sales Partners</h2>
            <p className={styles.cardBody}>
              If you have a strong network or sales capability, you can become our white label sales
              partner. You bring clients or projects to us, and we execute the work under our team.
              You earn a fixed commission or percentage on every successful conversion or project
              closure generated through your efforts.
            </p>
            <div className={styles.cardSubheading}>White Label Sales Partner Terms</div>
            <ul className={styles.bulletList}>
              {salesBullets.map((b, i) => (
                <li key={i} className={styles.bulletItem}>
                  <div className={styles.bullet} />
                  <span>
                    {b.bold ? (
                      <>
                        {b.text}<strong>{b.bold}</strong>{b.after}
                      </>
                    ) : (
                      b.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <Link href={CTA_HREF} className={styles.cardCta}>
              Become Sales Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Terms & Conditions ────────────────────────────── */}
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Partnership Terms &amp; Conditions</h2>
          <p className={styles.bodyPara}>
            To ensure smooth collaboration and maintain quality standards, the following terms apply
            to all partners (Freelance &amp; White Label Sales Partners):
          </p>

          <h3 className={styles.termsHeading}>1. General Terms (Applicable to All Partners)</h3>
          <ul className={styles.bulletList}>
            {generalTerms.map((b) => (
              <li key={b} className={styles.bulletItem}>
                <div className={styles.bullet} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h3 className={styles.termsHeading}>2. Termination &amp; Compliance</h3>
          <ul className={styles.bulletList}>
            {terminationTerms.map((b) => (
              <li key={b} className={styles.bulletItem}>
                <div className={styles.bullet} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h3 className={styles.termsHeading}>3. Acceptance</h3>
          <p className={styles.bodyPara}>
            By joining as a partner, you acknowledge that you have read, understood, and agreed to
            these terms and conditions.
          </p>
        </div>
      </section>
    </div>
  )
}
