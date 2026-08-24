import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { homeGeneralFaqsQuery } from '@/lib/sanity/queries'
import { HeroSearchWidget } from '@/components/hero-search-widget'
import { ProcessSteps } from '@/components/process-steps'
import { CaseStudiesGrid } from '@/components/case-studies-grid'
import { FaqAccordion } from '@/components/faq-accordion'
import styles from './home.module.css'

export const metadata: Metadata = {
  title: 'High Horse — Search Marketing Agency',
  description:
    'Turn search intent into revenue. We capture demand across paid, organic, and AI search and connect it to qualified leads, sales, and measurable revenue.',
}

const proofs = [
  { figure: '50+', label: 'Businesses grown globally, across nine industries and four continents.' },
  { figure: '₹12Cr+', label: 'Ad spend managed and measured through to qualified leads and revenue.' },
  { figure: 'Google Partner', label: 'Certified on the platform where most high-intent search happens.' },
  { figure: 'Paid, organic, AI', label: 'One team across ads, SEO, AEO/GEO, Maps and marketplaces.' },
]

const leaks = [
  { n: '01', title: 'Visibility Leak', desc: 'You do not appear when valuable customers search.', signal: 'Signal: competitors rank for your highest-intent terms.' },
  { n: '02', title: 'Spend Leak', desc: 'Budget is spent on searches that do not create qualified business.', signal: 'Signal: spend rising, qualified leads flat.' },
  { n: '03', title: 'Conversion Leak', desc: 'People visit but do not enquire, call or buy.', signal: 'Signal: healthy traffic, low enquiries.' },
  { n: '04', title: 'Follow-up Leak', desc: 'Search-generated leads are not handled quickly or consistently.', signal: 'Signal: slow response, inconsistent handling.' },
  { n: '05', title: 'Measurement Leak', desc: 'Marketing activity cannot be connected clearly to sales and revenue.', signal: 'Signal: no clear line from spend to revenue.' },
]

const capabilities = [
  { title: 'Paid Search', desc: 'Capture high-intent demand while reducing wasted spend.', points: ['Google Ads', 'Search-term analysis', 'Campaign efficiency', 'Shopping where relevant', 'Lead-quality optimisation'], note: null },
  { title: 'Organic Search', desc: 'Build lasting visibility around the problems, products and services customers search for.', points: ['SEO strategy', 'Technical SEO', 'Search-led content', 'Local SEO', 'Google Business Profile'], note: null },
  { title: 'AI Search', desc: 'Improve how the business is understood and surfaced across emerging answer engines.', points: ['AI visibility analysis', 'Answer-focused content', 'Entity and authority improvement', 'Citation monitoring'], note: 'AI citations and visibility are never guaranteed.' },
  { title: 'Content Marketing and Engineering', desc: 'The material that earns organic rankings and gets cited in AI answers, built and structured to be found.', points: ['Search-led content strategy', 'Content built for SEO and AEO/GEO', 'Structured data and content architecture', 'Content distribution', 'Refreshing content that has stopped performing'], note: null },
  { title: 'Conversion and Measurement', desc: 'Turn search traffic into qualified business and show what produced it.', points: ['Search-focused landing experiences', 'Conversion optimisation', 'Call, form and WhatsApp tracking', 'Qualified-lead tracking', 'Revenue attribution where possible'], note: null },
]

const outcomes = [
  'Capture more customers already searching',
  'Reduce wasted advertising spend',
  'Convert more existing traffic',
  'Improve qualified lead quality',
  'Lower acquisition inefficiency',
  'Understand what creates sales and revenue',
]

const outcomeChain = ['Demand captured', 'Conversion improved', 'Waste reduced', 'Revenue measured']

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
const fitBad = ['Looking for the cheapest SEO package', 'No clear marketing budget', 'Expecting guaranteed rankings or revenue', 'Wants every marketing service under one small retainer', 'Refuses tracking or sales-data access', 'Has little meaningful search demand', 'Cannot manage additional enquiries']

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

export default async function HomePage() {
  const faqs = await sanityFetch<Array<{ _id: string; question: string; answer: any }>>(
    homeGeneralFaqsQuery
  )

  return (
    <div className={styles.page}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>Search Marketing Agency</div>
            <h1 className={styles.heroHeadline}>
              Turn Search <span className={styles.heroAccent}>Intent</span> Into{' '}
              <span className={styles.heroAccent}>Revenue</span>.
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
      </div>

      {/* ── PROOF BAND ───────────────────────────────────────── */}
      <div className={styles.proofBand}>
        <div className={styles.proofInner}>
          <div className={styles.proofGrid}>
            {proofs.map((p) => (
              <div key={p.figure} className={styles.proofCard}>
                <div className={styles.proofFigure}>{p.figure}</div>
                <div className={styles.proofLabel}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      <div id="case-studies" className={styles.section}>
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
        <CaseStudiesGrid />
      </div>

      {/* ── THE PROBLEM ──────────────────────────────────────── */}
      <div className={styles.problemSection}>
        <div className={styles.section}>
          <div className={styles.problemIntro}>
            <div className={styles.problemIntroLeft}>
              <div className={styles.sectionLabel}>The opportunity already exists</div>
              <h2 className={styles.sectionHeading} style={{ maxWidth: 640 }}>
                Your customers are searching. The question is who captures them.
              </h2>
            </div>
            <div className={styles.problemIntroRight}>
              <p className={styles.bodyText}>
                Every day, customers search for products, services, solutions and alternatives. Some
                reach your business. Others are captured by competitors, marketplaces, aggregators,
                paid results, Maps listings or AI answers.
              </p>
              <p className={styles.bodyTextLast}>
                The problem is rarely just &ldquo;more traffic.&rdquo; It is understanding where
                valuable demand is being lost—and what stops it from becoming qualified business.
              </p>
            </div>
          </div>
          <div className={styles.leaksLabel}>Search performance breaks in five places</div>
          <div className={styles.leaksGrid}>
            {leaks.map((leak) => (
              <div key={leak.n} className={styles.leakCard}>
                <div className={styles.leakNum}>{leak.n}</div>
                <div className={styles.leakTitle}>{leak.title}</div>
                <div className={styles.leakDesc}>{leak.desc}</div>
                <div className={styles.leakSignal}>{leak.signal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW WE WORK + CAPABILITIES ───────────────────────── */}
      <div id="how-we-work">
        <div className={styles.section}>
          <div className={styles.approachIntro}>
            <div className={styles.approachIntroLeft}>
              <div className={styles.sectionLabel}>How we work</div>
              <h2 className={styles.sectionHeading} style={{ maxWidth: 600 }}>
                Understand broadly. Solve narrowly.
              </h2>
            </div>
            <div className={styles.approachIntroRight}>
              <p className={styles.bodyText}>
                We do not begin by selling SEO, Google Ads or a predefined package. We first
                understand the market, product, customer, competition and commercial model.
              </p>
              <p className={styles.bodyTextLast}>
                Then we identify the search problems most likely to affect qualified demand,
                acquisition efficiency and revenue.
              </p>
            </div>
          </div>
          <ProcessSteps />

          <div id="capabilities" className={styles.capHeader}>
            <div className={styles.capHeaderLeft}>
              <div className={styles.sectionLabel}>Search, connected properly</div>
              <h2 className={styles.sectionHeading} style={{ maxWidth: 640 }}>
                The complete search journey—not disconnected services.
              </h2>
            </div>
            <div className={styles.capVisuals}>
              <div className={styles.capVisualCard}>
                <div className={styles.capVisualImg}>
                  <Image
                    src="/images/visual-paid-search.jpg"
                    alt="Paid Search across channels"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.capVisualCaption}>
                  Paid Search — Google, Meta and other high-intent channels.
                </div>
              </div>
              <div className={styles.capVisualCard}>
                <div className={styles.capVisualImg}>
                  <Image
                    src="/images/visual-ai-search.jpg"
                    alt="AI Search visibility"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.capVisualCaption}>
                  AI Search — Google results and AI answer engines.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.capGrid}>
            {capabilities.map((cap) => (
              <div key={cap.title} className={styles.capCard}>
                <div className={styles.capTitle}>{cap.title}</div>
                <div className={styles.capDesc}>{cap.desc}</div>
                {cap.points.map((pt) => (
                  <div key={pt} className={styles.capPoint}>
                    <div className={styles.capDot} />
                    <div className={styles.capPointText}>{pt}</div>
                  </div>
                ))}
                {cap.note && <div className={styles.capNote}>{cap.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT CHANGES (dark) ──────────────────────────────── */}
      <div className={styles.darkSection}>
        <div className={styles.darkInner}>
          <div className={styles.darkLabel}>What changes</div>
          <h2 className={styles.darkHeading}>
            More qualified business from the demand that already exists.
          </h2>
          <div className={styles.darkContent}>
            <div className={styles.outcomeGrid}>
              {outcomes.map((o) => (
                <div key={o} className={styles.outcomeItem}>
                  <div className={styles.outcomeDot} />
                  <div className={styles.outcomeText}>{o}</div>
                </div>
              ))}
            </div>
            <div className={styles.outcomeCallout}>
              <div className={styles.outcomeCalloutText}>
                Rankings, clicks and traffic are useful only when they contribute to a commercial
                outcome.
              </div>
            </div>
          </div>
          <div className={styles.outcomeChain}>
            {outcomeChain.map((label, i) => (
              <div key={label} className={styles.chainNode}>
                <div className={styles.chainBox}>{label}</div>
                {i < outcomeChain.length - 1 && <div className={styles.chainArrow} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE + FIT ─────────────────────────────────── */}
      <div id="founder" className={styles.founderSection}>
        <div className={styles.section}>
          <div className={styles.founderRow}>
            <div className={styles.founderPhoto}>Founder photo — Sankalp Suri</div>
            <div className={styles.founderContent}>
              <div className={styles.sectionLabel}>Who we are</div>
              <h2 className={styles.founderHeading}>Direct strategy. Clear accountability.</h2>
              <p className={styles.bodyText}>High Horse is led by Sankalp Suri.</p>
              <p className={styles.bodyText} style={{ marginBottom: 28 }}>
                Clients work with a team built around search strategy, execution and measurement,
                with direct senior involvement in understanding the business, setting priorities and
                reviewing results.
              </p>
              <div className={styles.founderPoints}>
                {founderPoints.map((pt) => (
                  <div key={pt} className={styles.founderPoint}>
                    <div className={styles.founderDot} />
                    <div className={styles.founderPointText}>{pt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h3 className={styles.fitHeading}>
            Built for serious businesses—not every business.
          </h3>
          <div className={styles.fitGrid}>
            <div className={styles.fitCol}>
              <div className={`${styles.fitTitle} ${styles.fitTitleGood}`}>A Good Fit</div>
              {fitGood.map((item) => (
                <div key={item} className={styles.fitItem}>
                  <div className={styles.fitCheck}>&#10003;</div>
                  <div className={styles.fitText}>{item}</div>
                </div>
              ))}
            </div>
            <div className={styles.fitCol}>
              <div className={`${styles.fitTitle} ${styles.fitTitleBad}`}>Probably Not a Fit</div>
              {fitBad.map((item) => (
                <div key={item} className={styles.fitItem}>
                  <div className={styles.fitCross}>&#10005;</div>
                  <div className={styles.fitTextBad}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <div>
        <div className={styles.faqSection}>
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
                one meaningful opportunity worth investigating—and whether High Horse is the right
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
