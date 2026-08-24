import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { existsSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import styles from './company.module.css'

export const metadata: Metadata = {
  title: 'Company — High Horse',
  description:
    'High Horse helps brands turn search intent into revenue through SEO, AI visibility, ads, websites, automation, and performance-driven growth systems.',
}

/* ──────────────────────────────────────────────────────────────────────
 * ASSET CONFIG
 *
 * Every icon, banner, and logo slot on this page is driven by this
 * single object. To swap an asset, change the path string here —
 * don't edit the component JSX.
 *
 * Paths are relative to public/ (served at the root URL).
 * Drop files into  public/assets/  and reference as  /assets/filename.
 * If a referenced file doesn't exist yet, a placeholder box renders
 * instead of a broken image.
 * ────────────────────────────────────────────────────────────────────── */
const ASSETS = {
  // Section 2 — Mission / Vision / Aim icons
  missionIcon: '/assets/mission-icon.svg',
  visionIcon: '/assets/vision-icon.svg',
  aimIcon: '/assets/aim-icon.svg',

  // Section 5 — What We Do cards
  searchIntelIcon: '/assets/search-intel-icon.svg',
  performanceIcon: '/assets/performance-icon.svg',
  experienceIcon: '/assets/experience-icon.svg',

  // Section 4 — Our Story banner
  storyBanner: '/assets/story-banner.jpg',

  // Section 6 — Thinking banner
  thinkingBanner: '/assets/thinking-banner.jpg',

  // Section 7 — Founder banner
  founderBanner: '/assets/founder-banner.jpg',

  // Section 8 — Industry card images
  industryFinance: '/assets/industry-finance.jpg',
  industryEcommerce: '/assets/industry-ecommerce.jpg',
  industryHealthcare: '/assets/industry-healthcare.jpg',
  industryEducation: '/assets/industry-education.jpg',
  industryTravel: '/assets/industry-travel.jpg',
  industryLogistics: '/assets/industry-logistics.jpg',
  industryRealEstate: '/assets/industry-real-estate.jpg',
  industrySaas: '/assets/industry-saas.jpg',
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

const IMAGE_EXTS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp'])

function fileExists(src: string): boolean {
  return existsSync(join(process.cwd(), 'public', src))
}

function getClientLogos(): { name: string; src: string }[] {
  const dir = join(process.cwd(), 'public', 'assets', 'client-logos')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort()
    .map((f) => ({
      name: f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      src: `/assets/client-logos/${f}`,
    }))
}

/* ── Components ──────────────────────────────────────────────────────── */

function AssetImage({
  src,
  alt,
  slot,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  slot: string
  width: number
  height: number
  className?: string
}) {
  if (fileExists(src)) {
    return <Image src={src} alt={alt} width={width} height={height} className={className} />
  }
  return (
    <div className={`${styles.placeholder} ${className ?? ''}`}>
      <span className={styles.placeholderLabel}>{slot}</span>
    </div>
  )
}

function BannerImage({ src, alt, slot }: { src: string; alt: string; slot: string }) {
  if (fileExists(src)) {
    return (
      <div className={styles.bannerWrap}>
        <Image src={src} alt={alt} fill className={styles.bannerImg} />
      </div>
    )
  }
  return (
    <div className={styles.bannerPlaceholder}>
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

const missionCards = [
  {
    icon: ASSETS.missionIcon,
    slot: 'missionIcon',
    title: 'Our Mission',
    body: 'Our mission is to help brands grow through smarter visibility, better systems, and performance-driven execution. We aim to simplify digital growth for businesses by combining search, AI, advertising, and automation into strategies that produce measurable results. We don\'t believe businesses should waste time guessing what works. Our focus is on building reliable growth systems that help brands scale with clarity, consistency, and confidence.',
  },
  {
    icon: ASSETS.visionIcon,
    slot: 'visionIcon',
    title: 'Our Vision',
    body: 'We envision a future where businesses of every size can compete effectively in the digital world — not through massive budgets, but through smarter strategy and stronger visibility. As search continues evolving through AI, voice, automation, and personalised experiences, our goal is to help brands stay ahead of change instead of reacting to it later. We want High Horse to become the growth partner businesses trust when they want sustainable, future-ready digital growth.',
  },
  {
    icon: ASSETS.aimIcon,
    slot: 'aimIcon',
    title: 'Our Aim',
    body: 'Our aim is to help businesses grow with clarity, consistency, and measurable results. At High Horse, we focus on building search-driven growth systems that attract the right audience, increase visibility, and turn intent into revenue. From SEO and AI-led discovery to performance marketing and automation, we help brands scale smarter, faster, and with long-term sustainability in mind.',
  },
]

const whatWeDoCards = [
  {
    icon: ASSETS.searchIntelIcon,
    slot: 'searchIntelIcon',
    title: 'Search Intelligence & Discovery',
    desc: 'SEO, AI-powered search visibility (AEO/GEO), content strategy, and keyword intelligence — everything that helps your brand get found when your customers are actively searching.',
  },
  {
    icon: ASSETS.performanceIcon,
    slot: 'performanceIcon',
    title: 'Performance Advertising & Demand Capture',
    desc: 'Google Ads, Shopping campaigns, retargeting, and paid media strategy — designed to capture demand at the moment of intent, and convert clicks into qualified leads and sales.',
  },
  {
    icon: ASSETS.experienceIcon,
    slot: 'experienceIcon',
    title: 'Experience, Systems & Automation',
    desc: 'Website development, UI/UX design, CRM integration, marketing automation, and conversion optimization — the systems that turn traffic into customers and customers into repeat buyers.',
  },
]

const thinkingBullets = [
  'Understanding how customers search',
  'Identifying high-intent opportunities',
  'Building visibility across channels',
  'Improving user experience',
  'Tracking performance continuously',
  'Optimising every stage of the funnel',
]

const industries = [
  { title: 'Finance (BFSI)', img: ASSETS.industryFinance, slot: 'industryFinance', desc: 'Search and performance systems for banks, NBFCs, insurance, and fintech — built to generate qualified leads in a regulated, competitive space.' },
  { title: 'Ecommerce & Retail', img: ASSETS.industryEcommerce, slot: 'industryEcommerce', desc: 'Product visibility, shopping campaigns, marketplace optimization, and conversion systems that turn browsers into buyers.' },
  { title: 'Healthcare', img: ASSETS.industryHealthcare, slot: 'industryHealthcare', desc: 'Patient acquisition, local search visibility, and trust-building strategies for hospitals, clinics, diagnostics, and health-tech platforms.' },
  { title: 'Education', img: ASSETS.industryEducation, slot: 'industryEducation', desc: 'Enrollment-focused campaigns, search visibility, and lead systems for universities, ed-tech platforms, coaching institutes, and training providers.' },
  { title: 'Travel & Tourism', img: ASSETS.industryTravel, slot: 'industryTravel', desc: 'Destination marketing, hotel and experience visibility, seasonal campaign strategy, and booking-focused performance systems.' },
  { title: 'Logistics', img: ASSETS.industryLogistics, slot: 'industryLogistics', desc: 'Lead generation and brand visibility for freight, warehousing, supply chain, and last-mile delivery businesses operating in competitive B2B markets.' },
  { title: 'Real Estate', img: ASSETS.industryRealEstate, slot: 'industryRealEstate', desc: 'Search-driven lead systems for developers, brokers, and property platforms — built to capture high-intent buyers and investors at the moment of search.' },
  { title: 'SaaS', img: ASSETS.industrySaas, slot: 'industrySaas', desc: 'Product-led growth campaigns, trial-to-paid conversion systems, and search visibility for software companies targeting technical and business decision-makers.' },
]

const whyBullets = [
  'We measure success by revenue, not by rankings or impressions.',
  'We combine SEO, paid media, AI visibility, websites, and automation into one connected system.',
  'We don\'t outsource — every deliverable is produced by our in-house team.',
  'We start with data and search intelligence, not assumptions.',
  'We build for compounding returns — systems that get stronger over time, not campaigns that expire.',
  'We work as an extension of your team, not as an outside vendor.',
  'We are transparent about what\'s working, what isn\'t, and where the opportunity is.',
  'We prioritize fewer clients and deeper partnerships over volume.',
  'We invest in understanding your business, your customers, and your competitive landscape before we build anything.',
  'We are a certified Google Partner with hands-on experience across India and the GCC.',
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function CompanyPage() {
  const clientLogos = getClientLogos()

  return (
    <div className={styles.page}>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <a
            href="https://partnersdirectory.withgoogle.com/partners/6812870132"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroBadge}
          >
            <GoogleGIcon />
            <span className={styles.heroBadgeText}>Certified Google Partner</span>
          </a>
          <h1 className={styles.heroTitle}>
            We Don&rsquo;t Just Help Brands Get Seen.{' '}
            <span className={styles.heroAccent}>We Help Them Get Chosen.</span>
          </h1>
          <p className={styles.heroBody}>
            High Horse helps brands turn search intent into revenue through SEO, AI visibility,
            ads, websites, automation, and performance-driven growth systems.
          </p>
          {/* Note: "Join Now" links to Careers — should this point to Contact instead? */}
          <Link href="/performance-marketing-agency-careers" className={styles.heroCta}>
            Join Now
          </Link>
        </div>
      </section>

      {/* ── 2. Mission / Vision / Aim ────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.tripleGrid}>
          {missionCards.map((c) => (
            <div key={c.title} className={styles.mvaCard}>
              <div className={styles.mvaIconWrap}>
                <AssetImage
                  src={c.icon}
                  alt={c.title}
                  slot={c.slot}
                  width={28}
                  height={28}
                  className={styles.mvaIconImg}
                />
              </div>
              <div className={styles.mvaTitle}>{c.title}</div>
              <div className={styles.mvaBody}>{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Our Clients ───────────────────────────────────── */}
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Clients</h2>
          {clientLogos.length > 0 ? (
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeTrack}>
                {clientLogos.map((logo, i) => (
                  <div key={i} className={styles.marqueeLogo}>
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={140}
                      height={48}
                      className={styles.marqueeLogoImg}
                    />
                  </div>
                ))}
                {clientLogos.map((logo, i) => (
                  <div key={`dup-${i}`} className={styles.marqueeLogo} aria-hidden="true">
                    <Image
                      src={logo.src}
                      alt=""
                      width={140}
                      height={48}
                      className={styles.marqueeLogoImg}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.logoEmpty}>
              <span className={styles.placeholderLabel}>
                Drop client logo files into public/assets/client-logos/
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Our Story ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Story of Turning Brands into Bestsellers</h2>
        <div className={styles.twoCol}>
          <div className={styles.twoColText}>
            <p className={styles.bodyPara}>
              High Horse started with a simple belief: Every business deserves the opportunity to
              grow online &mdash; regardless of its size.
            </p>
            <p className={styles.bodyPara}>
              As we worked with more businesses, we noticed a common challenge: brands were investing
              in websites, ads, and content, but very few had a complete system connecting everything
              together.
            </p>
            <p className={styles.bodyPara}>
              Some businesses ranked on search engines but couldn&rsquo;t convert visitors. Others
              ran ads without long-term growth. Many had great products but poor visibility. We
              realised businesses didn&rsquo;t just need marketing services. They needed a growth
              partner who understood how modern search actually works. That insight became the
              foundation of High Horse. Helping brands capture demand wherever customers search and
              turning that demand into revenue.
            </p>
            <p className={styles.bodyPara}>
              Today, we&rsquo;ve helped businesses generate significant growth through search-led
              strategies, performance marketing, SEO, automation, and conversion-focused digital
              experiences. Most importantly, the majority of our growth continues to come through
              referrals &mdash; a reflection of the trust and long-term relationships we build with
              our clients.
            </p>
          </div>
          <div className={styles.twoColMedia}>
            <BannerImage src={ASSETS.storyBanner} alt="Our story" slot="storyBanner" />
          </div>
        </div>
      </section>

      {/* ── 5. What We Do ────────────────────────────────────── */}
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Do for Better Brand Performance</h2>
          <p className={styles.sectionSub}>
            We build search-driven growth systems combining visibility, advertising, websites, and
            automation to help brands attract, convert, and scale faster.
          </p>
          <div className={styles.tripleGrid}>
            {whatWeDoCards.map((c) => (
              <div key={c.title} className={styles.mvaCard}>
                <div className={styles.mvaIconWrap}>
                  <AssetImage
                    src={c.icon}
                    alt={c.title}
                    slot={c.slot}
                    width={28}
                    height={28}
                    className={styles.mvaIconImg}
                  />
                </div>
                <div className={styles.mvaTitle}>{c.title}</div>
                <div className={styles.mvaBody}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. The Thinking ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.twoColMedia}>
            <BannerImage
              src={ASSETS.thinkingBanner}
              alt="The thinking behind every successful brand"
              slot="thinkingBanner"
            />
          </div>
          <div className={styles.twoColText}>
            <h2 className={styles.sectionTitle}>The Thinking Behind Every Successful Brand</h2>
            <p className={styles.bodyPara}>
              We believe that real growth doesn&rsquo;t come from marketing activity alone. It comes
              from understanding how customers search, what they need, and building the experience
              that earns their trust.
            </p>
            <div className={styles.thatMeansLabel}>That means:</div>
            <ul className={styles.bulletList}>
              {thinkingBullets.map((b) => (
                <li key={b} className={styles.bulletItem}>
                  <div className={styles.bullet} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className={styles.bodyPara}>
              We work as an extension of your business &mdash; not just another external agency.
            </p>
            <p className={styles.bodyParaBold}>
              Your goals become our goals. Your growth becomes our focus.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Founder Message ───────────────────────────────── */}
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>A Message from the Founder</h2>
          <div className={styles.twoCol}>
            <div className={styles.twoColText}>
              <blockquote className={styles.founderQuote}>
                <p className={styles.bodyPara}>
                  &ldquo;When I started High Horse, I didn&rsquo;t want to build just another
                  marketing agency. I wanted to build something that actually worked &mdash; a team
                  that helps businesses grow in ways they can measure and defend.
                </p>
                <p className={styles.bodyPara}>
                  Too many businesses spend on marketing without knowing what it&rsquo;s producing.
                  We exist to change that. Everything we do is tied to a number &mdash; a lead, a
                  sale, a revenue figure &mdash; because that&rsquo;s the only way to know if
                  marketing is working.
                </p>
                <p className={styles.bodyPara}>
                  We&rsquo;re not the biggest agency, and we don&rsquo;t try to be. We focus on
                  being the most useful &mdash; the team that understands your business, your market,
                  and your customers deeply enough to build systems that produce results.
                </p>
                <p className={styles.bodyPara}>
                  If you&rsquo;re looking for a partner who measures success the same way you do
                  &mdash; by what actually grows your business &mdash; I&rsquo;d like to hear from
                  you.&rdquo;
                </p>
              </blockquote>
              <div className={styles.founderAttribution}>
                &mdash; Sankalp Suri, Founder, High Horse
              </div>
            </div>
            <div className={styles.twoColMedia}>
              <BannerImage src={ASSETS.founderBanner} alt="Sankalp Suri" slot="founderBanner" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Industries ────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Industries We Work With</h2>
        <p className={styles.sectionSub}>
          From ecommerce and finance to healthcare and education &mdash; our strategies are built for
          industries where search-driven growth creates the biggest impact.
        </p>
        <div className={styles.industryGrid}>
          {industries.map((ind) => (
            <div key={ind.title} className={styles.industryCard}>
              <div className={styles.industryImgWrap}>
                <AssetImage
                  src={ind.img}
                  alt={ind.title}
                  slot={ind.slot}
                  width={400}
                  height={200}
                  className={styles.industryImg}
                />
              </div>
              <div className={styles.industryBody}>
                <div className={styles.industryTitle}>{ind.title}</div>
                <div className={styles.industryDesc}>{ind.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Why High Horse Stands Ahead ───────────────────── */}
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Why High Horse Stands Ahead</h2>
          <p className={styles.bodyPara}>
            We don&rsquo;t believe in marketing for the sake of marketing. Every strategy, every
            campaign, and every system we build is measured by one thing: did it create business
            growth?
          </p>
          <p className={styles.bodyPara}>
            That mindset runs through everything we do &mdash; from how we plan, to how we execute,
            to how we report.
          </p>
          <div className={styles.thatMeansLabel}>What Sets Us Apart</div>
          <ul className={styles.bulletList}>
            {whyBullets.map((b) => (
              <li key={b} className={styles.bulletItem}>
                <div className={styles.bullet} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
