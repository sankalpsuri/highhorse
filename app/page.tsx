import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { homeGeneralFaqsQuery } from '@/lib/sanity/queries'
import { HeroSearchWidget } from '@/components/hero-search-widget'
import { ProcessSteps } from '@/components/process-steps'
import { CaseStudyCards } from '@/components/client-logo-grid'
import { FaqAccordion } from '@/components/faq-accordion'
import { LeakFunnel } from '@/components/leak-funnel'
import { OutcomeMeters } from '@/components/outcome-meters'
import { ScrollReveal } from '@/components/scroll-reveal'
import styles from './home.module.css'

export const metadata: Metadata = {
  title: 'High Horse — Search Marketing Agency',
  description:
    'Turn search intent into revenue. We capture demand across paid, organic, and AI search and connect it to qualified leads, sales, and measurable revenue.',
}

const journey = [
  { n: '01', title: 'Search' },
  { n: '02', title: 'Visibility' },
  { n: '03', title: 'Landing' },
  { n: '04', title: 'Qualified lead' },
  { n: '05', title: 'Sale' },
  { n: '06', title: 'Revenue' },
]

const capabilities = [
  { stage: 'Capture', title: 'Paid Search', desc: 'Capture high-intent demand while reducing wasted spend.', points: ['Google Ads', 'Search-term analysis', 'Campaign efficiency', 'Shopping', 'Lead quality'], note: null, orange: false },
  { stage: 'Earn', title: 'Organic Search', desc: 'Lasting visibility around the problems and products customers search for.', points: ['SEO strategy', 'Technical SEO', 'Search-led content', 'Local SEO', 'Business Profile'], note: null, orange: false },
  { stage: 'Be cited', title: 'AI Search', desc: 'Improve how the business is understood and surfaced across answer engines.', points: ['AI visibility analysis', 'Answer-focused content', 'Entity authority', 'Citation monitoring'], note: 'AI citations and visibility are never guaranteed.', orange: false },
  { stage: 'Feeds both', title: 'Content Marketing and Engineering', desc: 'The material that earns rankings and gets cited, built and structured to be found.', points: ['Content strategy', 'Built for SEO and AEO/GEO', 'Structured data', 'Distribution', 'Refreshes'], note: null, orange: true },
  { stage: 'Close the loop', title: 'Conversion and Measurement', desc: 'Turn search traffic into qualified business and show what produced it.', points: ['Landing experiences', 'CRO', 'Call, form, WhatsApp tracking', 'Qualified-lead tracking', 'Revenue attribution'], note: null, orange: false },
]

const opportunityItems = [
  'A competitor capturing valuable searches',
  'A paid-search spending leak',
  'A missing organic or local opportunity',
  'A weak conversion path',
  'A measurement gap',
  'An underserved product, service or location',
]

const founderPoints = ['Business context before campaigns', 'Honest recommendations', 'Clear ownership', 'Direct communication', 'Revenue over activity']

const fitGood = ['Real search demand', 'Established or properly funded', 'Strong product or service economics', 'Serious marketing investment', 'Decision-maker access', 'Ability to handle additional demand', 'Willingness to measure real business results']
const fitBad = ['Looking for the cheapest SEO package', 'No clear marketing budget', 'Expecting guaranteed rankings or revenue', 'Wants every service under one small retainer', 'Refuses tracking or sales-data access', 'Has little meaningful search demand', 'Cannot manage additional enquiries']

const aiLogos = [
  { label: 'Google', src: '/images/logo-google.webp' },
  { label: 'ChatGPT', src: '/images/logo-chatgpt-white.svg' },
  { label: 'Gemini', src: '/images/logo-gemini.webp' },
  { label: 'Perplexity', src: '/images/logo-perplexity.webp' },
  { label: 'Claude', src: '/images/logo-claude.png' },
]

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

export default async function HomePage() {
  const faqs = await sanityFetch<Array<{ _id: string; question: string; answer: any }>>(
    homeGeneralFaqsQuery
  )

  return (
    <div className={styles.page}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>
              <div className={styles.heroPulse} />
              <span className={styles.heroLabelText}>Search Marketing Agency</span>
            </div>
            <h1 className={styles.heroHeadline}>
              Turn Search <span className={styles.heroAccent}>Intent</span> Into{' '}
              <span className={styles.heroUnderline}>
                <span className={styles.heroUnderlineMark} />
                <span style={{ position: 'relative' }}>Revenue</span>
              </span>.
            </h1>
            <p className={styles.heroSub}>
              Right now, people are searching for what you sell. We make sure they find you, turn
              that demand into leads and sales, and show you exactly how much revenue it produced.
            </p>
            <div className={styles.heroCtas}>
              <Link href={CONTACT_HREF} className={styles.btnPrimary}>
                Find Your Search Opportunity
              </Link>
              <a href="#how-we-work" className={styles.btnOutline}>
                See How We Work
              </a>
            </div>
            <p className={styles.heroNote}>
              For established businesses with real search demand and serious growth ambitions.
            </p>
            <a
              href="https://partnersdirectory.withgoogle.com/partners/6812870132"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerBadge}
            >
              <Image
                src="/images/google-partner-badge.png"
                alt="Google Partner"
                width={64}
                height={24}
                style={{ objectFit: 'contain' }}
              />
              <span>Certified Google Partner</span>
            </a>
          </div>
          <div className={styles.heroRight}>
            <HeroSearchWidget />
          </div>
        </div>

        {/* ── JOURNEY STRIP ─────────────────────────────────── */}
        <div className={styles.journeyWrap}>
          <div className={styles.journeyStrip}>
            {journey.map((j, i) => (
              <div key={j.n} className={styles.journeyItem}>
                <div className={styles.journeyItemContent}>
                  <div className={styles.journeyNum}>{j.n}</div>
                  <div className={styles.journeyTitle}>{j.title}</div>
                </div>
                {i < journey.length - 1 && <div className={styles.journeyArrow} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROOF BAND ───────────────────────────────────────── */}
      <div className={styles.proofBand}>
        <div className={styles.proofGridBg} />
        <div className={styles.proofInner}>
          <div className={styles.proofGrid}>
            <div>
              <div className={styles.proofFigure}>
                <span>50</span><span className={styles.proofPlus}>+</span>
              </div>
              <div className={styles.proofLabel}>
                Businesses grown globally, across nine industries and four continents.
              </div>
            </div>
            <div>
              <div className={styles.proofFigure}>
                <span>₹</span><span>12</span><span>Cr</span><span className={styles.proofPlus}>+</span>
              </div>
              <div className={styles.proofLabel}>
                Ad spend managed and measured through to qualified leads and revenue.
              </div>
            </div>
            <div>
              <a
                href="https://partnersdirectory.withgoogle.com/partners/6812870132"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                <div style={{ marginBottom: 14, minHeight: 'clamp(2.2rem, 3.4vw, 3rem)', display: 'flex', alignItems: 'center' }}>
                  <Image
                    src="/images/google-partner-badge.png"
                    alt="Google Partner"
                    width={88}
                    height={33}
                    style={{ objectFit: 'contain', borderRadius: 5 }}
                  />
                </div>
                <div className={styles.proofLabel}>
                  Certified on the platform where most high-intent search happens.
                </div>
              </a>
            </div>
            <div>
              <div className={styles.proofAiLogos}>
                {aiLogos.map((l) => (
                  <div key={l.label} className={styles.proofAiLogo}>
                    <Image src={l.src} alt={l.label} width={17} height={17} style={{ objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
              <div className={styles.proofLabel}>
                One team across ads, SEO, AEO/GEO, Maps and marketplaces.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CASE STUDY CARDS ─────────────────────────────────── */}
      <div id="case-studies">
        <div className={styles.section}>
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesHeaderLeft}>
              <div className={styles.sectionLabel}>Evidence over claims</div>
              <h2 className={styles.sectionHeading}>
                Search and digital growth work across industries.
              </h2>
            </div>
            <Link href={CONTACT_HREF} className={styles.caseStudiesCta}>
              Talk About Your Category
            </Link>
          </div>
          <ScrollReveal>
            <CaseStudyCards />
          </ScrollReveal>
        </div>
      </div>

      {/* ── THE LEAK FUNNEL ──────────────────────────────────── */}
      <div id="the-problem" className={styles.leakSection}>
        <div className={styles.section}>
          <div className={styles.sectionIntro}>
            <div className={styles.sectionIntroLeft}>
              <div className={styles.sectionLabel}>The opportunity already exists</div>
              <h2 className={styles.sectionHeading}>
                Your customers are searching. The question is who captures them.
              </h2>
            </div>
            <div className={styles.sectionIntroRight}>
              <p className={styles.bodyText}>
                Demand leaks at five points between a search and a sale. The problem is rarely more
                traffic — it is finding which point is losing you business.
              </p>
            </div>
          </div>
          <ScrollReveal>
            <LeakFunnel />
          </ScrollReveal>
        </div>
      </div>

      {/* ── HOW WE WORK ──────────────────────────────────────── */}
      <div id="how-we-work">
        <div className={styles.section}>
          <div className={styles.sectionIntro}>
            <div className={styles.sectionIntroLeft}>
              <div className={styles.sectionLabel}>How we work</div>
              <h2 className={styles.sectionHeading}>
                Understand broadly. Solve narrowly.
              </h2>
            </div>
            <div className={styles.sectionIntroRight}>
              <p className={styles.bodyText}>
                We do not start by selling SEO, Ads or a package. We start with the market, product,
                customer, competition and commercial model — then fix what affects revenue.
              </p>
            </div>
          </div>
          <ScrollReveal>
            <ProcessSteps />
          </ScrollReveal>
        </div>
      </div>

      {/* ── SERVICES MAP (dark) ──────────────────────────────── */}
      <div id="capabilities" className={styles.servicesSection}>
        <div className={styles.servicesGridBg} />
        <div className={styles.servicesGlow} />
        <div className={styles.section} style={{ position: 'relative' }}>
          <div className={styles.sectionIntro}>
            <div className={styles.sectionIntroLeft}>
              <div className={styles.sectionLabelOrange}>Search, connected properly</div>
              <h2 className={styles.sectionHeading}>
                The complete search journey — not disconnected services.
              </h2>
            </div>
            <div className={styles.sectionIntroRight}>
              <p className={styles.bodyText} style={{ color: '#9A9A97' }}>
                Five capabilities on one path. Content feeds both organic rankings and AI citations;
                conversion and measurement close the loop.
              </p>
            </div>
          </div>
          <ScrollReveal>
            <div className={styles.servicesGrid}>
              {capabilities.map((cap, i) => (
                <div key={cap.title} className={styles.serviceCard}>
                  <div className={styles.serviceCardHeader}>
                    <div className={cap.orange ? styles.serviceTagOrange : styles.serviceTag}>
                      {cap.stage}
                    </div>
                    {i < capabilities.length - 1 && (
                      <div className={styles.serviceConnector}>
                        <div className={styles.serviceConnectorDot} />
                        <div className={styles.serviceConnectorLine} />
                      </div>
                    )}
                  </div>
                  <div className={styles.serviceTitle}>{cap.title}</div>
                  <div className={styles.serviceDesc}>{cap.desc}</div>
                  <div className={styles.servicePoints}>
                    {cap.points.map((pt) => (
                      <div key={pt} className={styles.servicePoint}>{pt}</div>
                    ))}
                  </div>
                  {cap.note && <div className={styles.serviceNote}>{cap.note}</div>}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── OUTCOME METERS ───────────────────────────────────── */}
      <div style={{ background: '#fff' }}>
        <div className={styles.section}>
          <div className={styles.sectionIntro}>
            <div className={styles.sectionIntroLeft}>
              <div className={styles.sectionLabel}>What changes</div>
              <h2 className={styles.sectionHeading}>
                More qualified business from the demand that already exists.
              </h2>
            </div>
            <div className={styles.sectionIntroRight}>
              <p className={styles.bodyText}>
                Rankings, clicks and traffic are useful only when they contribute to a commercial
                outcome. These are the directions we move.
              </p>
            </div>
          </div>
          <ScrollReveal>
            <OutcomeMeters />
          </ScrollReveal>
        </div>
      </div>

      {/* ── FOUNDER + FIT ────────────────────────────────────── */}
      <div id="founder" className={styles.founderSection}>
        <div className={styles.section}>
          <div className={styles.founderRow}>
            <div className={styles.founderPhotoWrap}>
              <div className={styles.founderPhotoFrame} />
              <div className={styles.founderPhoto}>Founder photo — Sankalp Suri</div>
            </div>
            <div className={styles.founderContent}>
              <div className={styles.sectionLabel}>Who we are</div>
              <h2 className={styles.founderHeading}>Direct strategy. Clear accountability.</h2>
              <p className={styles.founderDesc}>
                High Horse is led by Sankalp Suri. Clients work with a team built around search
                strategy, execution and measurement, with direct senior involvement in priorities and
                results.
              </p>
              <div className={styles.founderPoints}>
                {founderPoints.map((pt) => (
                  <div key={pt} className={styles.founderPoint}>{pt}</div>
                ))}
              </div>
            </div>
          </div>

          <h3 className={styles.fitSubheading}>
            Built for serious businesses — not every business.
          </h3>
          <p className={styles.fitDesc}>
            Seven signals on each side. Read down the column that sounds like you.
          </p>

          <ScrollReveal>
            <div className={styles.fitGrid}>
              <div className={styles.fitGoodCol}>
                <div className={styles.fitColHeader}>
                  <div className={styles.fitTitleGood}>A Good Fit</div>
                  <div className={styles.fitBadgeGood}>7 SIGNALS</div>
                </div>
                {fitGood.map((item) => (
                  <div key={item} className={styles.fitItem}>
                    <div className={styles.fitCheck}>&#10003;</div>
                    <div className={styles.fitText}>{item}</div>
                  </div>
                ))}
              </div>
              <div className={styles.fitBadCol}>
                <div className={styles.fitColHeader}>
                  <div className={styles.fitTitleBad}>Probably Not a Fit</div>
                  <div className={styles.fitBadgeBad}>7 SIGNALS</div>
                </div>
                {fitBad.map((item) => (
                  <div key={item} className={styles.fitItem}>
                    <div className={styles.fitCross}>&#10005;</div>
                    <div className={styles.fitTextBad}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <div className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqSidebar}>
            <div className={styles.sectionLabel}>Before you enquire</div>
            <h2 className={styles.sectionSubheading} style={{ marginBottom: 20 }}>
              The questions we get asked first.
            </h2>
            <p className={styles.faqSidebarText}>
              If something here is not answered, ask it directly and we will give you a straight
              response.
            </p>
            <Link href={CONTACT_HREF} className={styles.faqSidebarLink}>
              Ask your question
            </Link>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </div>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <div id="opportunity" className={styles.ctaSection}>
        <div className={styles.ctaGridBg} />
        <div className={styles.ctaGlow1} />
        <div className={styles.ctaGlow2} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaHeading}>
                Find out what your business may be missing across search.
              </h2>
              <p className={styles.ctaSub}>
                We review your business, category, customers and current search presence to identify
                one meaningful opportunity worth investigating — and whether High Horse is the right
                fit.
              </p>
              <div className={styles.ctaCtas}>
                <Link href={CONTACT_HREF} className={styles.ctaBtnWhite}>
                  Find Your Search Opportunity
                </Link>
                <a href="#how-we-work" className={styles.ctaLinkWhite}>
                  See How We Work
                </a>
              </div>
              <p className={styles.ctaDisclaimer}>
                No guaranteed rankings. No generic packages. No forced recommendation.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <div className={styles.ctaRightLabel}>This may include</div>
              {opportunityItems.map((item) => (
                <div key={item} className={styles.ctaListItem}>
                  <div className={styles.ctaListDot} />
                  <div className={styles.ctaListText}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
