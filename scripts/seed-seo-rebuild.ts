import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-13',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const SEO_SLUG = 'search-engine-optimization-seo-growth-services'

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

function multiBlockText(...paragraphs: string[]) {
  return paragraphs.map((text) => ({
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
  }))
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  // ── STEP 1: Find the SEO page ──
  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, accentStyle, pageBuilder }`,
    { slug: SEO_SLUG },
  )
  if (!doc) {
    console.error('SEO page not found')
    process.exit(1)
  }
  console.log(`Found SEO page: ${doc._id}`)
  console.log(`Current accentStyle: ${doc.accentStyle || '(not set)'}`)

  // ── STEP 2: Set proofMockups on 3 case studies ──
  const caseStudyIds = {
    bawa: 'caseStudy-bawa',
    hioki: 'caseStudy-hioki',
    terra: 'caseStudy-terra',
    fech: 'caseStudy-fech',
  }

  // Bawa proofMockups
  await client.patch(caseStudyIds.bawa).set({
    proofMockups: [
      {
        _key: 'pm-bawa-1',
        queryLabel: 'insulating varnish manufacturers in Delhi',
        mockupType: 'serp',
      },
      {
        _key: 'pm-bawa-2',
        queryLabel: 'motor winding varnish',
        mockupType: 'serp',
      },
    ],
  }).commit()
  console.log('✓ Set proofMockups on Bawa (2 SERP)')

  // Hioki proofMockups
  await client.patch(caseStudyIds.hioki).set({
    proofMockups: [
      {
        _key: 'pm-hioki-1',
        queryLabel: 'AC Clamp meter',
        mockupType: 'paa',
        paaQuestions: [
          'What does an AC clamp meter do?',
          'How to measure AC current using a clamp meter?',
        ],
      },
      {
        _key: 'pm-hioki-2',
        queryLabel: 'lcr meter',
        mockupType: 'paa',
        paaQuestions: [
          'What is the LCR meter?',
          'What is the difference between LCR meter and multimeter?',
        ],
      },
    ],
  }).commit()
  console.log('✓ Set proofMockups on Hioki (2 PAA)')

  // Terra proofMockups
  await client.patch(caseStudyIds.terra).set({
    proofMockups: [
      {
        _key: 'pm-terra-1',
        queryLabel: 'curtain motor in delhi',
        mockupType: 'block',
      },
      {
        _key: 'pm-terra-2',
        queryLabel: 'curtain motors',
        mockupType: 'serp',
      },
    ],
  }).commit()
  console.log('✓ Set proofMockups on Terra (block + SERP)')

  // ── STEP 3: Rebuild pageBuilder ──
  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero-1',
      headline: 'SEO Experts Helping Businesses SEO, AI Search, and Voice Optimization',
      subheadline: 'Search is evolving beyond traditional rankings. Our SEO strategies position your business across search engines, AI-generated answers, and voice queries to capture customers at every stage of discovery.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
      heroImage: { _type: 'image' },
    },

    // 2. textImageSection — "Work With an SEO Agency" + resultCard
    {
      _type: 'textImageSection',
      _key: 'text-agency-1',
      heading: 'Work With an SEO Agency That Understands Modern Search',
      bodyText: multiBlockText(
        'SEO goes beyond rankings. Our SEO agency helps your business appear on Google Search, AI answers, voice search, and ecommerce platforms. Using advanced SEO strategies, keyword optimization, technical SEO, and content optimization, we help you attract high-intent traffic and improve visibility.',
        'If you want sustainable organic growth and stronger online presence, our modern SEO services are built to keep your business visible where customers are searching.',
      ),
      bullets: [
        'Strategies built for Google, AI search, and voice queries',
        'Expertise across ecommerce, service, and enterprise websites',
        'Technical, content, and authority optimization combined',
        'Transparent reporting and continuous performance tracking',
      ],
      imagePosition: 'right',
      resultCard: {
        caseStudy: { _type: 'reference', _ref: caseStudyIds.fech },
        overrideMetrics: [
          { _key: 'rm1', value: '425', label: 'Total clicks' },
          { _key: 'rm2', value: '44.2K', label: 'Total impressions' },
          { _key: 'rm3', value: '1%', label: 'Average CTR' },
          { _key: 'rm4', value: '40.6', label: 'Average position' },
        ],
        chartColor: '#1A6AFF',
      },
    },

    // 3. textImageSection — "Looking for a Better SEO Agency?" + CTA
    {
      _type: 'textImageSection',
      _key: 'text-agency-2',
      heading: "Looking for a Better SEO Agency? You're Probably Facing These Problems",
      bodyText: multiBlockText(
        'If you are searching for a reliable SEO agency, it usually means your current SEO strategy is not delivering the results you expected. Many businesses struggle with low rankings, poor organic traffic, and overdependence on paid ads. If your website is not attracting consistent leads from Google search results, it may be time to rethink your SEO approach.',
        'You might be experiencing problems like:',
      ),
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
      ctaText: 'Talk to SEO Expert',
      ctaLink: '/contact-search-performance-marketing-agency',
    },

    // 4. cardGridSection — "Real Problems" 4 cards
    {
      _type: 'cardGridSection',
      _key: 'card-problems',
      heading: 'The Real Problems Behind Low Google Rankings',
      subtext: 'Many businesses invest in SEO but still struggle to rank on Google or generate consistent organic traffic. In most cases, the issue comes from weak SEO foundations, poor keyword strategy, or outdated optimization methods.',
      style: 'dashed',
      cards: [
        {
          _key: 'c1',
          title: 'Wrong Keyword Targeting',
          description: 'Your website is not optimized for high-intent keywords your potential customers are searching on Google.',
          badgeColor: 'mint',
        },
        {
          _key: 'c2',
          title: 'Weak Technical & On-Page SEO',
          description: 'Poor site structure, missing metadata, slow speed, and weak internal linking affect search rankings.',
          badgeColor: 'peach',
        },
        {
          _key: 'c3',
          title: 'Low Authority & Poor Backlinks',
          description: 'Without strong backlinks and domain authority, search engines struggle to trust and rank your website.',
          badgeColor: 'lavender',
        },
        {
          _key: 'c4',
          title: 'Outdated SEO Strategy',
          description: 'Your site is not optimized for modern search experiences like AI search, voice search, and evolving Google algorithms.',
          badgeColor: 'gray',
        },
      ],
    },

    // 5. textImageSection — "High Horse Builds SEO Systems" + glow panel
    {
      _type: 'textImageSection',
      _key: 'text-systems',
      heading: 'High Horse Builds SEO Systems That Drive Real Results',
      bodyText: multiBlockText(
        'When it comes to organic marketing, High Horse specializes in building powerful SEO systems that help brands capture consistent search demand. Instead of relying on short-term tactics, we focus on strong technical SEO, structured content strategies, and authority-building methods that improve long-term visibility.',
        'Our approach ensures your brand appears when potential customers search for solutions, products, or services, by combining search intelligence, data-driven content, and continuous optimization, we help businesses achieve higher rankings, qualified traffic, and sustainable organic growth.',
      ),
      imagePosition: 'left',
      glowPanelText: 'SEO OPTIMIZATION',
    },

    // 6. clientProofSection
    {
      _type: 'clientProofSection',
      _key: 'client-proof',
      heading: 'See How High Horse Turns SEO Strategies into Measurable Results',
      bodyText: 'See real SEO results from High Horse through improved Google rankings, organic traffic growth, higher keyword visibility, and measurable business lead generation.',
    },

    // 7. cardGridSection — services grid
    {
      _type: 'cardGridSection',
      _key: 'card-services',
      heading: 'SEO Services Built for ranking top on google.',
      subtext: 'Results-driven SEO services designed to boost rankings, increase visibility, drive organic traffic, and help your business dominate Google search results.',
      style: 'clean',
      background: 'cream',
      columns: 4,
      cards: [
        {
          _key: 's1',
          title: 'Technical SEO Optimization',
          description: 'A technically optimized website allows search engines to crawl and index your pages effectively. We ensure your website meets modern technical SEO standards that support strong rankings.',
        },
        {
          _key: 's2',
          title: 'Keyword Research & Opportunity Mapping',
          description: 'Understanding search demand is the foundation of SEO success. We identify high-value keywords and content opportunities for your business.',
        },
        {
          _key: 's3',
          title: 'On-Page SEO Optimization',
          description: 'We optimize page structure, metadata, internal linking, and content signals to ensure each page performs effectively in search results.',
        },
        {
          _key: 's4',
          title: 'Link Building & Authority Development',
          description: 'Backlinks remain one of the strongest ranking factors. We focus on acquiring high-quality links that strengthen your domain authority.',
        },
        {
          _key: 's5',
          title: 'Answer Engine Optimization (AEO)',
          description: 'Optimize content to appear in featured snippets, knowledge panels, and instant answers that search engines display.',
        },
        {
          _key: 's6',
          title: 'Generative Engine Optimization (GEO)',
          description: 'Help your brand appear in AI-generated answers by optimizing content structure, entities, and authority signals across the web.',
        },
        {
          _key: 's7',
          title: 'Voice Search Optimization',
          description: 'Optimize conversational queries and structured content so voice assistants can recommend your business in voice-based searches.',
        },
        {
          _key: 's8',
          title: 'Ecommerce SEO',
          description: 'Optimize product pages, category pages, and site structure to increase organic traffic and sales for ecommerce websites.',
        },
      ],
    },

    // 8. statsSection — keep layout as-is
    {
      _type: 'statsSection',
      _key: 'stats-1',
      heading: 'Why Delhi NCR Businesses Choose High Horse',
      bodyText: 'Businesses choose High Horse for our AI-driven SEO strategies, transparent execution, and measurable results. We understand local search behavior, competitive markets, and focus on driving qualified traffic, higher rankings, and consistent growth not just reports.',
      layout: 'split',
      stats: [
        { _key: 'st1', value: '200+', label: 'Projects Finished' },
        { _key: 'st2', value: '95%', label: 'Client Retention Rate' },
        { _key: 'st3', value: '15+', label: 'Industries Served' },
        { _key: 'st4', value: '360°', label: 'Digital marketing solution' },
        { _key: 'st5', value: '1000+', label: 'Keywords Ranked' },
        { _key: 'st6', value: '6+', label: 'Presence Across the Globe' },
        { _key: 'st7', value: '1M+', label: 'Organic Visits Generated' },
        { _key: 'st8', value: '90%', label: 'Clients from referrals' },
      ],
    },

    // 9. ctaSection
    {
      _type: 'ctaSection',
      _key: 'cta-1',
      heading: "Let's Talk About Real Results for Your Business",
      bodyText: blockText('Connect with a team that believes in honest strategies, transparent reporting, and measurable results that genuinely move your business forward.'),
      ctaText: 'Get Your Search Leak Map',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },

    // 10. processStepsSection — KEEP real distinct step content
    {
      _type: 'processStepsSection',
      _key: 'process-1',
      heading: 'Our Process for Delivering the Best SEO Results',
      subtext: 'Our proven SEO process combines research, strategy, optimization, and continuous tracking to improve rankings, drive traffic, and maximize long-term growth.',
      steps: [
        {
          _key: 'step01',
          stepTitle: 'Search & Business Audit',
          stepDescription: 'We analyse your current rankings, technical health, content gaps, and competitor positioning to build a clear picture of where the biggest revenue opportunities sit.',
        },
        {
          _key: 'step02',
          stepTitle: 'Strategy & Roadmap',
          stepDescription: 'Based on the audit, we map out a prioritised 90-day plan targeting the keywords, pages, and fixes that will move the revenue needle fastest.',
        },
        {
          _key: 'step03',
          stepTitle: 'Execution & Optimisation',
          stepDescription: 'Our team handles technical fixes, on-page optimisation, content production, and link building — reporting progress against the agreed KPIs every month.',
        },
        {
          _key: 'step04',
          stepTitle: 'Measurement & Scaling',
          stepDescription: 'Once the system is producing results, we identify what is working and double down — expanding into new keyword clusters, markets, or content formats to compound growth.',
        },
      ],
    },

    // 11. caseStudyCardsSection
    {
      _type: 'caseStudyCardsSection',
      _key: 'cs-cards-1',
      heading: 'How Our Strategies Turned Search Demand Into Revenue',
      subtext: 'SEO strategies convert search demand into measurable revenue by attracting high-intent traffic, improving conversions, and delivering consistent business growth.',
      cards: [
        {
          _key: 'csc-bawa',
          clientName: 'Bawa',
          badgeColor: 'blue',
          metrics: [
            { _key: 'm1', value: '2.99K', label: 'Total clicks' },
            { _key: 'm2', value: '90.1K', label: 'Total impressions' },
            { _key: 'm3', value: '3.3%', label: 'Average CTR' },
            { _key: 'm4', value: '11.3', label: 'Average position' },
          ],
          results: [
            'Organic traffic tripled within 12 months for Bawa',
            'Significant lift in qualified visitors',
            'Sustained month-on-month traffic growth',
          ],
        },
        {
          _key: 'csc-terra',
          clientName: 'Terra',
          badgeColor: 'lavender',
          metrics: [
            { _key: 'm1', value: '590', label: 'Total clicks' },
            { _key: 'm2', value: '8.25K', label: 'Total impressions' },
            { _key: 'm3', value: '7.2%', label: 'Average CTR' },
            { _key: 'm4', value: '21.1', label: 'Average position' },
          ],
          results: [
            '100% growth in search impressions within 3 months for Terra',
            "Multiple high-intent keywords reached Google's first page",
            'Consistent rise in organic clicks and enquiries',
          ],
        },
        {
          _key: 'csc-fech',
          clientName: 'Fech Moving & Cleaning',
          badgeColor: 'peach',
          metrics: [
            { _key: 'm1', value: '425', label: 'Total clicks' },
            { _key: 'm2', value: '44.2K', label: 'Total impressions' },
            { _key: 'm3', value: '1%', label: 'Average CTR' },
            { _key: 'm4', value: '40.6', label: 'Average position' },
          ],
          results: [
            'For Fech Moving & Cleaning we drove 351 conversions from 2.63K high-intent clicks',
            'Achieved strong reach with 26.1K impressions consistently',
            'Maintained efficient cost per conversion at $59.70',
          ],
        },
        {
          _key: 'csc-hioki',
          clientName: 'Hioki',
          badgeColor: 'green',
          metrics: [
            { _key: 'm1', value: '13.6K', label: 'Total clicks' },
            { _key: 'm2', value: '413K', label: 'Total impressions' },
            { _key: 'm3', value: '3.3%', label: 'Average CTR' },
            { _key: 'm4', value: '15.5', label: 'Average position' },
          ],
          results: [
            'For Hioki we generated 831 conversions from 16.5K high-intent clicks',
            'Maintained low average CPC at ₹40.22 across campaigns',
            'Achieved efficient cost per conversion at ₹818',
          ],
        },
      ],
    },
  ]

  // ── Set accentStyle: "brand" and new pageBuilder ──
  await client
    .patch(doc._id)
    .set({
      accentStyle: 'brand',
      pageBuilder,
    })
    .commit()
  console.log('\n✓ accentStyle changed to "brand" (was: ' + (doc.accentStyle || 'not set') + ')')
  console.log('✓ pageBuilder rebuilt with 11 sections')

  // ── STEP 4: Update FAQ answers ──
  const faqUpdates = [
    {
      _id: 'faq-seo-1',
      answer: blockText('Yes — Google Ads gets you visibility while campaigns are active, but SEO builds long-term, compounding organic traffic that keeps generating leads even when you pause paid spend. The two work best together.'),
    },
    {
      _id: 'faq-seo-2',
      answer: blockText('We start with search-demand and competitor research to find high-intent keywords your customers actually use, then map them to the pages best positioned to rank and convert for each one.'),
    },
    {
      _id: 'faq-seo-3',
      answer: blockText('Yes. Backlinks remain one of the strongest trust signals search engines use to rank sites — we focus on earning high-quality, relevant links rather than volume.'),
    },
    {
      _id: 'faq-seo-4',
      answer: blockText('Yes — alongside traditional SEO, we structure content and authority signals so your brand is more likely to be surfaced in AI-generated answers and featured snippets.'),
    },
  ]

  for (const faq of faqUpdates) {
    await client.patch(faq._id).set({ answer: faq.answer }).commit()
    console.log(`✓ Updated FAQ answer: ${faq._id}`)
  }

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      accentStyle,
      "sectionCount": count(pageBuilder),
      "sectionTypes": pageBuilder[]._type,
      "faqCount": count(relatedFaqs),
      "caseStudyCount": count(relatedCaseStudies)
    }`,
    { slug: SEO_SLUG },
  )
  console.log('\n── Verification ──')
  console.log(`accentStyle: ${final.accentStyle}`)
  console.log(`sections: ${final.sectionCount} (${final.sectionTypes.join(', ')})`)
  console.log(`FAQs: ${final.faqCount}`)
  console.log(`case studies: ${final.caseStudyCount}`)

  // Verify proofMockups
  const mockupCheck = await client.fetch(
    `*[_type == "caseStudy" && _id in $ids]{
      clientName,
      "mockupCount": count(proofMockups)
    }`,
    { ids: [caseStudyIds.bawa, caseStudyIds.hioki, caseStudyIds.terra] },
  )
  console.log('\nProof mockups:')
  for (const cs of mockupCheck) {
    console.log(`  ${cs.clientName}: ${cs.mockupCount} mockups`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
