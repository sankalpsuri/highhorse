import { createClient } from 'next-sanity'
import { config } from 'dotenv'
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-13',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

function blockText(text: string) {
  return [
    {
      _type: 'block',
      _key: crypto.randomUUID().slice(0, 8),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: crypto.randomUUID().slice(0, 8),
          text,
          marks: [],
        },
      ],
    },
  ]
}

const PAGE_ID = 'servicePage-seo'

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  console.log('Creating SEO service page...')

  const servicePageDoc = {
    _id: PAGE_ID,
    _type: 'servicePage',
    title: 'SEO',
    slug: { _type: 'slug', current: 'search-engine-optimization-seo-growth-services' },
    section: 'services',
    summary: 'SEO experts helping businesses with SEO, AI search, and voice optimization',
    pageBuilder: [
      // 1. Hero — no badge
      {
        _type: 'heroSection',
        _key: 'hero-1',
        headline: 'SEO Experts Helping Businesses SEO, AI Search, and Voice Optimization',
        subheadline: 'Search is evolving beyond traditional rankings. Our SEO strategies position your business across search engines, AI-generated answers, and voice queries to capture customers at every stage of discovery.',
        ctaText: 'Book a Strategy Call',
        ctaLink: '/contact-search-performance-marketing-agency',
      },
      // 2. Text split (no image) — Work With an SEO Agency
      {
        _type: 'textImageSection',
        _key: 'text-image-1',
        heading: 'Work With an SEO Agency That Understands Modern Search',
        bodyText: blockText('SEO goes beyond rankings. Our SEO agency helps your business appear on Google Search, AI answers, voice search, and ecommerce platforms. Using advanced SEO strategies, keyword optimization, technical SEO, and content optimization, we help you attract high-intent traffic and improve search visibility. If you want sustainable organic growth and stronger online presence, our modern SEO services are built to keep your business visible where customers are searching.'),
        bullets: [
          'Strategies built for Google, AI search, and voice queries',
          'Expertise across ecommerce, service, and enterprise websites',
          'Technical, content, and authority optimization combined',
          'Transparent reporting and continuous performance tracking',
        ],
      },
      // 3. Text split (no image) — Looking for a Better SEO Agency?
      {
        _type: 'textImageSection',
        _key: 'text-image-2',
        heading: "Looking for a Better SEO Agency? You're Probably Facing These Problems",
        bodyText: blockText('If you are searching for a reliable SEO agency, it usually means your current SEO strategy is not delivering the results you expected. Many businesses struggle with low rankings, poor organic traffic, and overdependence on paid ads. If your website is not attracting consistent leads from Google search results, it may be time to rethink your SEO approach. You might be experiencing problems like:'),
        bullets: [
          'Your website is not ranking on Google for important keywords related to your business.',
          'Most of your leads come only from paid ads, not organic search traffic.',
          'Your current SEO agency is not delivering measurable SEO results.',
          'Your website traffic has stopped growing or is declining over time.',
          'Competitors consistently appear above your business in search results.',
          'Your website is not optimized for modern SEO, AI search, or voice search.',
          'You receive SEO reports but see little real business impact.',
          'Your SEO strategy focuses on rankings but not actual leads or conversions.',
        ],
      },
      // 4. Card grid — The Real Problems Behind Low Google Rankings
      {
        _type: 'cardGridSection',
        _key: 'card-grid-1',
        heading: 'The Real Problems Behind Low Google Rankings',
        subtext: "Many businesses invest in SEO but still struggle to rank on Google or generate consistent organic traffic. In most cases, the issue comes from weak SEO foundations, poor keyword strategy, or outdated optimization methods.",
        cards: [
          { _key: 'c1', title: 'Wrong Keyword Targeting', description: 'Your website is not optimized for high-intent keywords your potential customers are searching on Google.' },
          { _key: 'c2', title: 'Weak Technical & On-Page SEO', description: 'Poor site structure, missing metadata, slow speed, and weak internal linking affect search rankings.' },
          { _key: 'c3', title: 'Low Authority & Poor Backlinks', description: 'Without strong backlinks and domain authority, search engines struggle to trust and rank your website.' },
          { _key: 'c4', title: 'Outdated SEO Strategy', description: 'Your site is not optimized for modern search experiences like AI search, voice queries, and evolving Google algorithms.' },
        ],
      },
      // 5. Text split (no image) — High Horse Builds SEO Systems
      {
        _type: 'textImageSection',
        _key: 'text-image-3',
        heading: 'High Horse Builds SEO Systems That Drive Real Results',
        bodyText: blockText("When it comes to organic marketing, High Horse specializes in building powerful SEO systems that help brands capture consistent search demand. Instead of relying on short-term tactics, we focus on strong technical SEO, structured content strategies, and authority-building methods that improve long-term visibility. Our approach ensures your brand appears when potential customers search for solutions, products, or services. By combining search intelligence, data-driven content, and continuous optimization, we help businesses achieve higher rankings, qualified traffic, and sustainable organic growth."),
      },
      // 6. Card grid — SEO Services Built for Ranking Top on Google
      {
        _type: 'cardGridSection',
        _key: 'card-grid-2',
        heading: 'SEO Services Built for Ranking Top on Google',
        subtext: 'Results-driven SEO services designed to boost rankings, increase visibility, drive organic traffic, and help your business dominate Google search results.',
        cards: [
          { _key: 's1', title: 'Technical SEO Optimization', description: 'A technically optimized website allows search engines to crawl and index your pages effectively. We ensure your website meets modern technical standards that support strong rankings.' },
          { _key: 's2', title: 'Link Building & Authority Development', description: 'Backlinks remain one of the strongest ranking factors. We focus on acquiring high-quality links that strengthen your domain authority.' },
          { _key: 's3', title: 'Voice Search Optimization', description: 'Optimize conversational queries and structured content so voice assistants can recommend your business in voice-based searches.' },
          { _key: 's4', title: 'Keyword Research & Opportunity Mapping', description: "Understanding search demand is the foundation of SEO success. We identify high-value keywords and content opportunities that align with your audience's intent." },
          { _key: 's5', title: 'Answer Engine Optimization (AEO)', description: 'Optimize content to appear in featured snippets, knowledge panels, and instant answers that search engines display directly to users.' },
          { _key: 's6', title: 'Ecommerce SEO', description: 'Optimize product pages, category pages, and site structure to increase organic traffic and sales for ecommerce websites.' },
          { _key: 's7', title: 'On-Page SEO Optimization', description: 'We optimize page structure, metadata, internal linking, and content signals to ensure each page performs effectively in search results.' },
          { _key: 's8', title: 'Generative Engine Optimization (GEO)', description: 'Help your brand appear in AI-generated answers by optimizing content structure, entities, and authority signals across generative search platforms.' },
        ],
      },
      // 7. Stats section
      {
        _type: 'statsSection',
        _key: 'stats-1',
        heading: 'Why Delhi NCR Businesses Choose High Horse',
        bodyText: "Businesses choose High Horse for our AI-driven SEO strategies, transparent execution, and measurable results. We understand local search behavior, competitive markets, and focus on driving qualified traffic, higher rankings, and consistent growth — not just reports.",
        stats: [
          { _key: 'st1', value: '200+', label: 'Projects Finished' },
          { _key: 'st2', value: '360°', label: 'Digital Marketing Solution' },
          { _key: 'st3', value: '95%', label: 'Client Retention Rate' },
          { _key: 'st4', value: '1000+', label: 'Keywords Ranked' },
          { _key: 'st5', value: '15+', label: 'Industries Served' },
          { _key: 'st6', value: '6+', label: 'Presence Across the Globe' },
          { _key: 'st7', value: '1M+', label: 'Organic Visits Generated' },
          { _key: 'st8', value: '90%', label: 'Clients from Referrals' },
        ],
      },
      // 8. CTA
      {
        _type: 'ctaSection',
        _key: 'cta-1',
        heading: "Let's Talk About Real Results for Your Business",
        bodyText: blockText('Connect with a team that believes in honest strategies, transparent reporting, and measurable results that genuinely move your business forward.'),
        ctaText: 'Get Your Search Leak Map',
        ctaLink: '/contact-search-performance-marketing-agency',
      },
    ],
    relatedCaseStudies: [
      { _type: 'reference', _ref: 'caseStudy-bawa', _key: 'ref-bawa' },
      { _type: 'reference', _ref: 'caseStudy-terra', _key: 'ref-terra' },
      { _type: 'reference', _ref: 'caseStudy-fech', _key: 'ref-fech' },
      { _type: 'reference', _ref: 'caseStudy-hioki', _key: 'ref-hioki' },
    ],
  }

  await client.createOrReplace(servicePageDoc)
  console.log('✓ Service page created:', PAGE_ID)

  // Create 4 FAQ documents
  const faqs = [
    { _id: 'faq-seo-1', question: 'Do I need SEO if I already run Google Ads?', order: 1 },
    { _id: 'faq-seo-2', question: 'How do you choose keywords for my business?', order: 2 },
    { _id: 'faq-seo-3', question: 'Do backlinks still matter for SEO?', order: 3 },
    { _id: 'faq-seo-4', question: 'Do you optimize websites for AI search and generative results?', order: 4 },
  ]

  for (const faq of faqs) {
    await client.createOrReplace({
      _type: 'faq',
      _id: faq._id,
      question: faq.question,
      answer: blockText('TODO: content team to write answer'),
      category: 'seo',
      relatedPage: {
        _type: 'reference',
        _ref: PAGE_ID,
      },
      order: faq.order,
    })
    console.log('✓ FAQ created:', faq.question)
  }

  // Link FAQs
  await client.patch(PAGE_ID).set({
    relatedFaqs: faqs.map((f) => ({
      _type: 'reference',
      _ref: f._id,
      _key: f._id,
    })),
  }).commit()
  console.log('✓ Linked FAQs to service page')

  // Verify
  const final = await client.fetch(
    `*[_id == $id][0]{ "sections": count(pageBuilder), "faqs": count(relatedFaqs), "cases": count(relatedCaseStudies) }`,
    { id: PAGE_ID }
  )
  console.log(`\nFinal: ${final.sections} sections, ${final.faqs} FAQs, ${final.cases} case studies`)
  console.log('Visit /search-engine-optimization-seo-growth-services')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
