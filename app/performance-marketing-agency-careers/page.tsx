import type { Metadata } from 'next'
import Image from 'next/image'
import { ScrollReveal } from '@/components/scroll-reveal'
import styles from './careers.module.css'
import { CareersForm } from './careers-form'

export const metadata: Metadata = {
  title: 'Careers — High Horse',
  description:
    'Build the future of search and digital growth. Join High Horse and work on meaningful projects across SEO, AI search, performance marketing, and digital experiences.',
}

const benefits = [
  {
    title: 'Work on Meaningful Growth Projects',
    desc: 'Work directly on campaigns and systems that produce measurable business outcomes — leads, sales, revenue — across search, advertising, and digital experiences.',
    icon: '/assets/Meaningful Growth(1).png',
  },
  {
    title: 'Learn the Future of Digital Growth',
    desc: 'Stay ahead of SEO, AI-powered search, performance marketing, and emerging platforms. Continuous learning and experimentation are part of the work, not separate from it.',
    icon: '/assets/Learn the Future of Digital Growth(1).png',
  },
  {
    title: 'Creative Freedom & Ownership',
    desc: 'Own your work from strategy through execution. We value initiative, independent thinking, and creative approaches to solving real business problems.',
    icon: '/assets/Creative Freedom & Ownership(1).png',
  },
  {
    title: 'Growth-Focused Environment',
    desc: 'Your career development is tied directly to the growth you create. We invest in people who invest in their craft and deliver results.',
    icon: '/assets/Growth-Focused Environment(1).png',
  },
  {
    title: 'Collaborative Team Culture',
    desc: 'A small, direct team where everyone contributes meaningfully. No bureaucracy, clear communication, and shared accountability for outcomes.',
    icon: '/assets/Collaborative Team Culture(1).png',
  },
]

const qualities = [
  'Curious and eager to learn',
  'Creative problem-solvers',
  'Performance and result-oriented',
  'Adaptable to fast-changing trends',
  'Strong communicators and team players',
  'Passionate about digital growth and innovation',
]

const opportunities: { title: string; desc: string; icon?: string }[] = [
  {
    title: 'SEO & Search Strategy',
    desc: 'Technical audits, keyword research, on-page optimisation, and organic strategy across search engines and AI answer platforms.',
    icon: '/assets/big-data_11248702.png',
  },
  {
    title: 'Performance Marketing',
    desc: 'Google Ads, Shopping, Display, and retargeting campaign management focused on qualified leads and measurable return on spend.',
    icon: '/assets/analytic_4923840.png',
  },
  {
    title: 'Content Writing & Copywriting',
    desc: 'Search-driven content strategy, article writing, landing page copy, and content that ranks and drives conversions.',
    icon: '/assets/copywriting_8329269.png',
  },
  {
    title: 'Social Media Marketing',
    desc: 'Strategy, content planning, and community management across social platforms to build brand visibility and engagement.',
    icon: '/assets/social-media-marketing_10846573.png',
  },
  {
    title: 'UI/UX Design',
    desc: 'Conversion-focused design for websites, landing pages, and digital experiences that turn traffic into customers.',
    icon: '/assets/ux_17109606.png',
  },
  {
    title: 'Website Development',
    desc: 'Fast, accessible, SEO-optimised websites and web applications using modern frameworks and development practices.',
    icon: '/assets/coding_12487935.png',
  },
  {
    title: 'Graphic Design & Video Editing',
    desc: 'Visual design for campaigns, social media, brand materials, and video content that communicates with clarity.',
    icon: '/assets/video_8737160.png',
  },
  {
    title: 'Automation & CRM Systems',
    desc: 'Marketing automation, CRM setup, workflow optimisation, and data pipelines for growth-oriented teams.',
    icon: '/assets/process_2419328.png',
  },
  {
    title: 'Business Development & Client Success',
    desc: 'Client relationships, growth strategy, and making sure the work we deliver translates into real business outcomes.',
    icon: '/assets/customer-success_18147636.png',
  },
]

export default function CareersPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="hh-grid-bg" aria-hidden="true" />
        <div className="hh-glow-blue" aria-hidden="true" />
        <div className={styles.heroInner} style={{ position: 'relative' }}>
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeDot} />
            <span className={styles.heroBadgeText}>Careers</span>
          </div>
          <h1 className={styles.heroTitle}>
            Build the future of{' '}
            <span className={styles.heroAccent}>search&nbsp;&amp;&nbsp;growth</span> with us
          </h1>
          <p className={styles.heroBody}>
            At High Horse, we build growth-driven digital systems through SEO, AI, advertising,
            websites, and creativity — helping brands grow faster with innovation, strategy, and
            performance-focused execution that creates real business impact.
          </p>
          <a href="#apply" className={styles.heroCta}>
            Join Now
          </a>
        </div>
      </section>

      {/* ── Why Work With Us ───────────────────────────────── */}
      <ScrollReveal>
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Why work with us</div>
        <h2 className={styles.sectionTitle}>Why Work With Us?</h2>
        <p className={styles.sectionSub}>
          We are building a team around meaningful digital growth — not busy work. Here is what
          makes High Horse different.
        </p>
        <div className={styles.benefitsGrid}>
          {benefits.map((b) => (
            <div key={b.title} className={`${styles.benefitCard} hh-card-hover`}>
              <div className={styles.benefitIcon}>
                <Image
                  src={b.icon}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.benefitIconImg}
                />
              </div>
              <div className={styles.benefitTitle}>{b.title}</div>
              <div className={styles.benefitDesc}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* ── Who We're Looking For ──────────────────────────── */}
      <ScrollReveal>
      <section className={styles.section}>
        <div className={styles.lookingLayout}>
          <div className={styles.lookingLeft}>
            <div className={styles.sectionLabel}>The people we want</div>
            <h2 className={styles.lookingTitle}>Who we&rsquo;re looking for</h2>
            <p className={styles.lookingIntro}>
              We are looking for people who think clearly, work with purpose, and want to
              contribute to meaningful growth — for the businesses we work with and for
              themselves.
            </p>
            <p className={styles.lookingClose}>
              Experience matters, but mindset matters more. If you bring the right attitude and
              a willingness to learn, we will invest in helping you grow.
            </p>
          </div>
          <div className={styles.lookingRight}>
            <div className={styles.lookingCard}>
              {qualities.map((q) => (
                <div key={q} className={styles.lookingListItem}>
                  <div className={styles.lookingBullet} />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Opportunities ──────────────────────────────────── */}
      <ScrollReveal>
      <section className={styles.oppSection}>
        <div className={styles.oppGridBg} aria-hidden="true" />
        <div className={styles.oppGlow} aria-hidden="true" />
        <div className={styles.oppInner}>
          <div className={styles.oppSectionLabel}>Open departments</div>
          <h2 className={styles.oppSectionTitle}>Opportunities at High Horse</h2>
          <p className={styles.oppSectionSub}>
            We hire across these departments. If your skills match, send us your application below.
          </p>
          <div className={styles.oppGrid}>
            {opportunities.map((o) => (
              <div key={o.title} className={styles.oppCard}>
                <div className={styles.oppIcon}>
                  {o.icon ? (
                    <Image
                      src={o.icon}
                      alt=""
                      width={23}
                      height={23}
                      className={styles.oppIconImg}
                    />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className={styles.oppTitle}>{o.title}</div>
                <div className={styles.oppDesc}>{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Application Form ───────────────────────────────── */}
      <ScrollReveal>
      <section id="apply" className={styles.sectionBg}>
        <div className={styles.section}>
          <div className={styles.applicationLayout}>
            <div className={styles.applicationLeft}>
              <div className={styles.sectionLabel}>Apply</div>
              <h2 className={styles.applicationTitle}>
                Grow With a Team That Thinks Ahead
              </h2>
              <p className={styles.applicationBody}>
                High Horse is building a team of people who care about doing work that produces
                real, measurable results. We work across SEO, paid search, AI visibility,
                content, design, and technology — always in service of business outcomes.
              </p>
              <p className={styles.applicationBody}>
                If you are looking for a place where your contribution connects directly to
                growth — your own and the businesses we serve — we would like to hear from you.
              </p>
            </div>
            <div className={styles.applicationRight}>
              <CareersForm />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  )
}
