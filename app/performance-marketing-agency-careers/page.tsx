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
    icon: '/assets/(1).png',
  },
  {
    title: 'Performance Marketing',
    desc: 'Google Ads, Shopping, Display, and retargeting campaign management focused on qualified leads and measurable return on spend.',
    icon: '/assets/Performance Marketing(2).png',
  },
  {
    title: 'Content Writing & Copywriting',
    desc: 'Search-driven content strategy, article writing, landing page copy, and content that ranks and drives conversions.',
    icon: '/assets/Content Writing & Copywriting(1).png',
  },
  {
    title: 'Social Media Marketing',
    desc: 'Strategy, content planning, and community management across social platforms to build brand visibility and engagement.',
    icon: '/assets/Social Media Marketing(2).png',
  },
  {
    title: 'UI/UX Design',
    desc: 'Conversion-focused design for websites, landing pages, and digital experiences that turn traffic into customers.',
    icon: '/assets/UI UX Design(2).png',
  },
  {
    title: 'Website Development',
    desc: 'Fast, accessible, SEO-optimised websites and web applications using modern frameworks and development practices.',
    icon: '/assets/Website Development(4).png',
  },
  {
    title: 'Graphic Design & Video Editing',
    desc: 'Visual design for campaigns, social media, brand materials, and video content that communicates with clarity.',
    icon: '/assets/Graphic Design & Video Editing(2).png',
  },
  {
    title: 'Automation & CRM Systems',
    desc: 'Marketing automation, CRM setup, workflow optimisation, and data pipelines for growth-oriented teams.',
    icon: '/assets/Automation & CRM Systems(1).png',
  },
  {
    title: 'Business Development & Client Success',
    desc: 'Client relationships, growth strategy, and making sure the work we deliver translates into real business outcomes.',
    icon: '/assets/Business Development & Client Success(2).png',
  },
]

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

export default function CareersPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────── */}
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
            Build the Future of{' '}
            <span className={styles.heroAccent}>Search&nbsp;&amp;&nbsp;Growth</span> With Us
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
      <section className={styles.sectionBg}>
        <div className={styles.section}>
          <div className={styles.lookingLayout}>
            <div className={styles.lookingLeft}>
              <Image
                src="/assets/Career image.webp"
                alt="Team collaboration at High Horse"
                width={640}
                height={640}
                className={styles.lookingImg}
              />
            </div>
            <div className={styles.lookingRight}>
              <div className={styles.sectionLabel}>The people we want</div>
              <h2 className={styles.lookingTitle}>Who We&rsquo;re Looking For</h2>
              <p className={styles.lookingIntro}>
                We are looking for people who think clearly, work with purpose, and want to
                contribute to meaningful growth — for the businesses we work with and for
                themselves.
              </p>
              <ul className={styles.lookingList}>
                {qualities.map((q) => (
                  <li key={q} className={styles.lookingListItem}>
                    <div className={styles.lookingBullet} />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.lookingClose}>
                Experience matters, but mindset matters more. If you bring the right attitude and
                a willingness to learn, we will invest in helping you grow.
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Opportunities ──────────────────────────────────── */}
      <ScrollReveal>
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Open departments</div>
        <h2 className={styles.sectionTitle}>Opportunities at High Horse</h2>
        <p className={styles.sectionSub}>
          We hire across these departments. If your skills match, send us your application below.
        </p>
        <div className={styles.oppGrid}>
          {opportunities.map((o) => (
            <div key={o.title} className={`${styles.oppCard} hh-card-hover`}>
              <div className={styles.oppIcon}>
                {o.icon ? (
                  <Image
                    src={o.icon}
                    alt=""
                    width={24}
                    height={24}
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
