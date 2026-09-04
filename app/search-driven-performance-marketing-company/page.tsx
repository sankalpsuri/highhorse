import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { existsSync } from 'fs'
import { join } from 'path'
import { sanityFetch } from '@/lib/sanity/client'
import { getClientLogos } from '@/lib/get-client-logos'
import { ScrollReveal } from '@/components/scroll-reveal'
import styles from './company.module.css'

export const metadata: Metadata = {
  title: 'Company — High Horse',
  description:
    'High Horse helps brands turn search intent into revenue through SEO, AI visibility, ads, websites, automation, and performance-driven growth systems.',
}

const ASSETS = {
  missionIcon: '/assets/Our Mission(1).png',
  visionIcon: '/assets/our vision(1).png',
  aimIcon: '/assets/our aim(1).png',
  storyBanner: '/assets/2(54).jpg',
  founderBanner: '/assets/Founder Image.jpg',
  industryFinance: '/assets/Finance (BFSI)(1).jpg',
  industryEcommerce: '/assets/Ecommerce(1).jpg',
  industryHealthcare: '/assets/Healthcare(2).jpg',
  industryEducation: '/assets/Education(2).jpg',
  industryTravel: '/assets/Travel & Tourism(2).jpg',
  industryLogistics: '/assets/transportation Company(2).jpg',
  industryRealEstate: '/assets/Real Estate(1).jpg',
  industrySaas: '/assets/Saas (2).jpg',
}

function fileExists(src: string): boolean {
  return existsSync(join(process.cwd(), 'public', src))
}

const caseStudySlugsForLogosQuery = `*[_type == "caseStudy"]{ clientName, "slug": slug.current }`

function normalize(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '')
}

async function getCaseStudySlugLookup(): Promise<(logoName: string) => string | undefined> {
  const docs = await sanityFetch<{ clientName: string; slug: string }[]>(caseStudySlugsForLogosQuery)
  const entries = docs
    .filter((d) => d.clientName && d.slug && !/\s/.test(d.slug))
    .map((d) => ({ normalized: normalize(d.clientName), slug: d.slug }))
  return (logoName: string) => {
    const n = normalize(logoName)
    for (const e of entries) {
      if (e.normalized === n || e.normalized.includes(n)) return e.slug
    }
    return undefined
  }
}

function AssetImage({
  src,
  alt,
  width,
  height,
  className,
  style,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
}) {
  if (fileExists(src)) {
    return <Image src={src} alt={alt} width={width} height={height} className={className} style={style} quality={90} />
  }
  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderLabel}>Image placeholder</span>
    </div>
  )
}

function GoogleGIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const missionCards = [
  {
    icon: ASSETS.missionIcon,
    title: 'Our Mission',
    body: 'To help brands grow through smarter visibility, better systems, and performance-driven execution. We combine search, AI, advertising, and automation into strategies that produce measurable results — building reliable growth systems that help brands scale with clarity, consistency, and confidence.',
  },
  {
    icon: ASSETS.visionIcon,
    title: 'Our Vision',
    body: 'A future where businesses of every size can compete effectively online, not through massive budgets but through smarter strategy and stronger visibility. As search evolves through AI, voice, and automation, we help brands stay ahead of change instead of reacting to it later.',
  },
  {
    icon: ASSETS.aimIcon,
    title: 'Our Aim',
    body: 'To help businesses grow with clarity, consistency, and measurable results, building search-driven growth systems that attract the right audience, increase visibility, and turn intent into revenue.',
  },
]

const whatWeDoCards = [
  {
    title: 'Search Intelligence & Discovery',
    desc: 'SEO, AI-powered search visibility (AEO/GEO), content strategy, and keyword intelligence — everything that helps your brand get found when your customers are actively searching.',
    icon: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M16.2 16.2L21 21',
  },
  {
    title: 'Performance Advertising & Demand Capture',
    desc: 'Google Ads, Shopping campaigns, retargeting, and paid media strategy, designed to capture demand at the moment of intent and convert clicks into qualified leads and sales.',
    icon: 'M4 4v16h16 M8 15l4-5 3 3 5-7',
  },
  {
    title: 'Experience, Systems & Automation',
    desc: 'Website development, UI/UX design, CRM integration, marketing automation, and conversion optimization — the systems that turn traffic into customers and customers into repeat buyers.',
    icon: 'M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M4 20a8 8 0 0 1 16 0',
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
  { title: 'Finance (BFSI)', img: ASSETS.industryFinance, desc: 'Search and performance systems for banks, NBFCs, insurance, and fintech, built to generate qualified leads in a regulated, competitive space.' },
  { title: 'Ecommerce & Retail', img: ASSETS.industryEcommerce, desc: 'Product visibility, shopping campaigns, marketplace optimization, and conversion systems that turn browsers into buyers.' },
  { title: 'Healthcare', img: ASSETS.industryHealthcare, desc: 'Patient acquisition, local search visibility, and trust-building strategies for hospitals, clinics, diagnostics, and health-tech platforms.' },
  { title: 'Education', img: ASSETS.industryEducation, desc: 'Enrollment-focused campaigns, search visibility, and lead systems for universities, ed-tech platforms, coaching institutes, and training providers.' },
  { title: 'Travel & Tourism', img: ASSETS.industryTravel, desc: 'Destination marketing, hotel and experience visibility, seasonal campaign strategy, and booking-focused performance systems.' },
  { title: 'Logistics', img: ASSETS.industryLogistics, desc: 'Lead generation and brand visibility for freight, warehousing, supply chain, and last-mile delivery businesses operating in competitive B2B markets.' },
  { title: 'Real Estate', img: ASSETS.industryRealEstate, desc: 'Search-driven lead systems for developers, brokers, and property platforms, built to capture high-intent buyers and investors at the moment of search.' },
  { title: 'SaaS', img: ASSETS.industrySaas, desc: 'Product-led growth campaigns, trial-to-paid conversion systems, and search visibility for software companies targeting technical and business decision-makers.' },
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

export default async function CompanyPage() {
  const clientLogos = getClientLogos()
  const findSlug = await getCaseStudySlugLookup()

  return (
    <div className={styles.page}>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="hh-grid-bg" aria-hidden="true" />
        <div className="hh-glow-blue" aria-hidden="true" />
        <div className={styles.heroInner} style={{ position: 'relative' }}>
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
            We don&rsquo;t just help brands get seen. We help them{' '}
            <span className={styles.heroAccent}>get chosen</span>.
          </h1>
          <p className={styles.heroBody}>
            High Horse helps brands turn search intent into revenue through SEO, AI visibility,
            ads, websites, automation, and performance-driven growth systems.
          </p>
          <Link href="/performance-marketing-agency-careers" className={styles.heroCta}>
            Join Now
          </Link>
        </div>
      </section>

      {/* ── 2. Mission / Vision / Aim ────────────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#F7F7F6', borderBottom: '1px solid #EAEAE8' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }} className="rsp-section">
          {missionCards.map((c) => (
            <div key={c.title} className="hh-card-hover" style={{
              border: '1px solid #E6E6E4',
              borderRadius: 16,
              background: '#fff',
              padding: 30,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 14px 34px rgba(10,10,12,0.04)',
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {fileExists(c.icon) ? (
                  <Image src={c.icon} alt={c.title} width={28} height={28} style={{ objectFit: 'contain' }} />
                ) : (
                  <div style={{ width: 28, height: 28 }} />
                )}
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3 }}>{c.title}</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.68, color: '#55555A' }}>{c.body}</div>
            </div>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* ── 3. Our Clients ───────────────────────────────────── */}
      <ScrollReveal>
      <section>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }} className="rsp-section">
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '11.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#9A9A96',
            marginBottom: 22,
          }}>
            Our clients
          </div>
          {clientLogos.length > 0 ? (
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeTrack}>
                {clientLogos.map((logo, i) => {
                  const slug = findSlug(logo.name)
                  const img = (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={180}
                      height={64}
                      className={styles.marqueeLogoImg}
                      unoptimized
                    />
                  )
                  return slug ? (
                    <Link key={i} href={`/${slug}`} className={styles.marqueeLogo}>
                      {img}
                    </Link>
                  ) : (
                    <div key={i} className={styles.marqueeLogo}>
                      {img}
                    </div>
                  )
                })}
                {clientLogos.map((logo, i) => (
                  <div key={`dup-${i}`} className={styles.marqueeLogo} aria-hidden="true">
                    <Image
                      src={logo.src}
                      alt=""
                      width={180}
                      height={64}
                      className={styles.marqueeLogoImg}
                      unoptimized
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
      </ScrollReveal>

      {/* ── 4. Our Story ─────────────────────────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#F7F7F6', borderTop: '1px solid #EAEAE8', borderBottom: '1px solid #EAEAE8' }}>
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          display: 'flex',
          gap: 56,
          flexWrap: 'wrap' as const,
          alignItems: 'center',
        }}>
          <div style={{ flex: '1 1 460px', minWidth: 300 }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#1A6AFF',
              marginBottom: 16,
            }}>
              Our story
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
              lineHeight: 1.16,
              margin: '0 0 20px',
              maxWidth: 540,
            }}>
              Turning brands into bestsellers
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: '0 0 14px' }}>
              High Horse started with a simple belief: every business deserves the opportunity to
              grow online, regardless of its size.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: '0 0 14px' }}>
              As we worked with more businesses, we noticed a common challenge: brands were investing
              in websites, ads, and content, but very few had a complete system connecting everything
              together. Some ranked but couldn&rsquo;t convert. Others ran ads without long-term growth.
              Many had great products but poor visibility.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: '0 0 14px' }}>
              We realised businesses didn&rsquo;t just need marketing services. They needed a growth
              partner who understood how modern search actually works. That insight became the
              foundation of High Horse &mdash; helping brands capture demand wherever customers search,
              and turning that demand into revenue.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.7, color: '#0A0A0C', margin: 0 }}>
              Most of our growth continues to come through referrals &mdash; a reflection of the trust
              and long-term relationships we build with our clients.
            </p>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: '#F7F7F6',
              border: '1px solid #E6E6E4',
              aspectRatio: '7/8',
              minHeight: 300,
              boxShadow: '0 18px 40px rgba(10,10,12,0.05)',
            }}>
              {fileExists(ASSETS.storyBanner) ? (
                <Image
                  src={ASSETS.storyBanner}
                  alt="Our story"
                  width={840}
                  height={960}
                  quality={90}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  color: '#8a8a86',
                }}>
                  Image placeholder
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 5. What We Do ────────────────────────────────────── */}
      <ScrollReveal>
      <section id="capabilities">
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ maxWidth: 760, marginBottom: 52 }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#1A6AFF',
              marginBottom: 16,
            }}>
              What we do
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
              lineHeight: 1.16,
              margin: '0 0 16px',
            }}>
              Better brand performance, one connected system
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: 0 }}>
              We build search-driven growth systems combining visibility, advertising, websites, and
              automation to help brands attract, convert, and scale faster.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {whatWeDoCards.map((c) => (
              <div key={c.title} className="hh-card-hover" style={{
                border: '1px solid #E6E6E4',
                borderRadius: 16,
                background: '#fff',
                padding: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxShadow: '0 14px 34px rgba(10,10,12,0.04)',
              }}>
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: '#0A0A0C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#FF9D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.68, color: '#55555A' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 6. Thinking (dark) ───────────────────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#0A0A0C', color: '#F5F5F4', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: -140,
          left: '20%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,106,255,0.28), rgba(26,106,255,0) 68%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          position: 'relative',
          display: 'flex',
          gap: 56,
          flexWrap: 'wrap' as const,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#FF9D2E',
              marginBottom: 16,
            }}>
              How we think
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.5rem)',
              lineHeight: 1.16,
              margin: '0 0 20px',
              maxWidth: 500,
            }}>
              The thinking behind every successful brand
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#9A9A97', margin: '0 0 14px' }}>
              Real growth doesn&rsquo;t come from marketing activity alone. It comes from understanding
              how customers search, what they need, and building the experience that earns their trust.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.7, color: '#F5F5F4', margin: 0 }}>
              We work as an extension of your business, not just another external agency. Your goals
              become our goals. Your growth becomes our focus.
            </p>
          </div>
          <div style={{
            flex: '1 1 380px',
            minWidth: 300,
            border: '1px solid #232326',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            padding: '8px 30px',
          }}>
            {thinkingBullets.map((b) => (
              <div key={b} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '16px 0',
                borderBottom: '1px solid #1C1C1F',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15.5,
                lineHeight: 1.5,
                color: '#E4E4E1',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A6AFF', flexShrink: 0, marginTop: 8 }} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 7. Founder Message ───────────────────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#F7F7F6', borderTop: '1px solid #EAEAE8', borderBottom: '1px solid #EAEAE8' }}>
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{
            border: '1px solid #E6E6E4',
            borderRadius: 20,
            background: '#fff',
            boxShadow: '0 18px 40px rgba(10,10,12,0.05)',
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap' as const,
            overflow: 'hidden',
          }}>
            <div className={styles.founderPhoto}>
              {fileExists(ASSETS.founderBanner) ? (
                <Image
                  src={ASSETS.founderBanner}
                  alt="Sankalp Suri"
                  width={640}
                  height={800}
                  quality={90}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  color: '#8a8a86',
                }}>
                  Founder photo
                </div>
              )}
            </div>
            <div style={{ flex: '1 1 480px', minWidth: 280, padding: 48 }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '11.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: '#1A6AFF',
                marginBottom: 16,
              }}>
                A message from the founder
              </div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, lineHeight: 1.7, color: '#3A3A3E', margin: '0 0 14px' }}>
                &ldquo;When I started High Horse, I didn&rsquo;t want to build just another
                marketing agency. I wanted to build something that actually worked &mdash; a team
                that helps businesses grow in ways they can measure and defend.&rdquo;
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, lineHeight: 1.7, color: '#3A3A3E', margin: '0 0 14px' }}>
                &ldquo;Too many businesses spend on marketing without knowing what it&rsquo;s producing.
                We exist to change that. Everything we do is tied to a number &mdash; a lead, a
                sale, a revenue figure &mdash; because that&rsquo;s the only way to know if
                marketing is working.&rdquo;
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, lineHeight: 1.7, color: '#3A3A3E', margin: '0 0 22px' }}>
                &ldquo;We&rsquo;re not the biggest agency, and we don&rsquo;t try to be. We focus on
                being the most useful &mdash; the team that understands your business, your market,
                and your customers deeply enough to build systems that produce results.&rdquo;
              </p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15 }}>Sankalp Suri</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: '#9A9A96' }}>Founder, High Horse</div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 8. Industries ────────────────────────────────────── */}
      <ScrollReveal>
      <section>
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ maxWidth: 760, marginBottom: 44 }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#1A6AFF',
              marginBottom: 16,
            }}>
              Industries
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
              lineHeight: 1.16,
              margin: '0 0 16px',
            }}>
              Industries we work with
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: 0 }}>
              From ecommerce and finance to healthcare and education &mdash; our strategies are built for
              industries where search-driven growth creates the biggest impact.
            </p>
          </div>
          <div className={styles.industryGrid}>
            {industries.map((ind) => (
              <div key={ind.title} className="hh-card-hover" style={{
                border: '1px solid #E6E6E4',
                borderRadius: 16,
                background: '#fff',
                overflow: 'hidden',
                boxShadow: '0 14px 34px rgba(10,10,12,0.04)',
              }}>
                <div style={{
                  aspectRatio: '16/10',
                  background: '#F7F7F6',
                  borderBottom: '1px solid #E6E6E4',
                  overflow: 'hidden',
                }}>
                  <AssetImage
                    src={ind.img}
                    alt={ind.title}
                    width={400}
                    height={250}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: 22 }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{ind.title}</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#55555A' }}>{ind.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 9. Why High Horse Stands Ahead ───────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#F7F7F6', borderTop: '1px solid #EAEAE8', borderBottom: '1px solid #EAEAE8' }}>
        <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#1A6AFF',
              marginBottom: 16,
            }}>
              Why us
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
              lineHeight: 1.16,
              margin: '0 0 16px',
            }}>
              Why High Horse stands ahead
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.7, color: '#55555A', margin: 0 }}>
              We don&rsquo;t believe in marketing for the sake of marketing. Every strategy, campaign,
              and system we build is measured by one thing: did it create business growth?
            </p>
          </div>
          <div className={styles.whyGrid}>
            {whyBullets.map((b) => (
              <div key={b} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '20px 26px',
                borderTop: '1px solid #EFEFEE',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9D2E', flexShrink: 0, marginTop: 8 }} />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, lineHeight: 1.55, color: '#3A3A3E' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── 10. CTA ──────────────────────────────────────────── */}
      <ScrollReveal>
      <section style={{ background: '#1A6AFF', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="hh-grid-bg-dark" aria-hidden="true" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
        <div style={{
          position: 'absolute',
          top: -180,
          left: -80,
          width: 540,
          height: 540,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.24), rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="rsp-section" style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 32px',
          position: 'relative',
          display: 'flex',
          gap: 64,
          flexWrap: 'wrap' as const,
          alignItems: 'center',
        }}>
          <div style={{ flex: '1 1 500px', minWidth: 300 }}>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              lineHeight: 1.14,
              margin: '0 0 20px',
              maxWidth: 600,
            }}>
              Let&rsquo;s build your search opportunity.
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.86)',
              margin: 0,
              maxWidth: 540,
            }}>
              Tell us about your business and where you want it to go. We&rsquo;ll show you where the
              opportunity is before you commit to anything.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 260, display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            <Link href="/contact-search-performance-marketing-agency" className={styles.ctaPrimary}>
              Find your search opportunity
            </Link>
            <Link href="/faq" className={styles.ctaSecondary}>
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  )
}
