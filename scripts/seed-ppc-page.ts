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

const PPC_SLUG = 'ppc-advertising-management-and-performance-marketing'

async function main() {
  // ── 1. Migrate ALL existing servicePage relatedCaseStudies ──────
  console.log('=== Migrating relatedCaseStudies to new object format ===')
  const allServicePages = await client.fetch(
    `*[_type == "servicePage" && defined(relatedCaseStudies)]{ _id, title, relatedCaseStudies }`,
  )
  for (const page of allServicePages) {
    const refs = page.relatedCaseStudies || []
    if (refs.length === 0) continue

    const isAlreadyMigrated = refs[0]?.caseStudy
    if (isAlreadyMigrated) {
      console.log(`  ✓ ${page.title} — already migrated`)
      continue
    }

    const migrated = refs.map((ref: any, i: number) => ({
      _type: 'object',
      _key: `cs${i}`,
      caseStudy: { _type: 'reference', _ref: ref._ref },
    }))
    await client.patch(page._id).set({ relatedCaseStudies: migrated }).commit()
    console.log(`  ✓ ${page.title} — migrated ${migrated.length} refs`)
  }

  // ── 2. Migrate ALL existing FAQ documents: relatedPage → relatedPages ──
  console.log('\n=== Migrating FAQs relatedPage → relatedPages ===')
  const allFaqs = await client.fetch(
    `*[_type == "faq" && defined(relatedPage)]{ _id, question, relatedPage }`,
  )
  for (const faq of allFaqs) {
    const ref = faq.relatedPage?._ref
    if (!ref) continue
    await client.patch(faq._id)
      .set({ relatedPages: [{ _type: 'reference', _ref: ref, _key: ref.replace('drafts.', '') }] })
      .unset(['relatedPage'])
      .commit()
    console.log(`  ✓ "${faq.question}" — migrated`)
  }
  // Also check FAQs that already have relatedPages (none expected, but safe)
  const alreadyMigratedFaqs = await client.fetch(
    `*[_type == "faq" && defined(relatedPages) && !defined(relatedPage)]{ _id, question }`,
  )
  console.log(`  ${alreadyMigratedFaqs.length} FAQs now have relatedPages`)

  // ── 3. Fetch case-study IDs ─────────────────────────────────────
  const caseStudies = await client.fetch(
    `*[_type == "caseStudy" && clientName in $names]{ _id, clientName, results }`,
    { names: ['Bawa', 'Fech Moving & Cleaning'] },
  )
  console.log(`\nFound ${caseStudies.length} case studies for PPC:`, caseStudies.map((c: any) => `${c.clientName} (${c.results?.length || 0} base results)`))

  const bawaId = caseStudies.find((c: any) => c.clientName === 'Bawa')?._id
  const fechId = caseStudies.find((c: any) => c.clientName === 'Fech Moving & Cleaning')?._id
  if (!bawaId || !fechId) {
    console.error('Missing case studies for PPC page')
    process.exit(1)
  }

  // ── 4. Create PPC page ──────────────────────────────────────────
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: PPC_SLUG },
  )
  if (existing) {
    console.log(`PPC page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      headline: 'Own The Top Spot For High-Intent Keywords',
      subheadline: 'Reach customers when they search with high-performance PPC campaigns. Our Google Ads management captures top keyword positions, driving qualified traffic, leads, and measurable business growth.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — image right
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Looking for a Team That Helps You Spend Less and Get More From Your Ads?',
      bodyText: [
        {
          _type: 'block', _key: 'b1', style: 'normal', markDefs: [],
          children: [{ _type: 'span', _key: 's1', marks: [], text: '[TO BE VALIDATED] TODO: content team to write the three intro paragraphs (PPC as instant lead channel; High Horse\'s targeting/bidding/optimization approach; flexibility across leads, sales, and traffic goals)' }],
        },
      ],
      bullets: [
        'Google Partner with great experience',
        '3X faster lead generation compared to organic channels',
        'High-intent traffic from users actively searching solutions',
        'Visibility at the top of Google search results',
      ],
      imagePosition: 'right',
    },
    // 3. textImageSection — no image
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'Spending Too Much on Ads But Still Not Getting Leads? Here\'s Why',
      bodyText: [
        {
          _type: 'block', _key: 'b2', style: 'normal', markDefs: [],
          children: [{ _type: 'span', _key: 's2', marks: [], text: '[TO BE VALIDATED] TODO: content team to write intro paragraph' }],
        },
      ],
      bullets: [
        'You\'re targeting the wrong keywords that bring clicks, not customers',
        'Your ad copy isn\'t strong enough to drive action',
        'Your landing page isn\'t converting visitors into leads',
        'Your budget is being wasted on irrelevant searches',
        'There\'s no continuous optimization or performance tracking',
      ],
    },
    // 4. textImageSection — image left, headingBordered
    {
      _type: 'textImageSection',
      _key: 'text03',
      heading: 'High Horse is the PPC Partner Businesses Trust for Growth',
      headingBordered: true,
      bodyText: [
        {
          _type: 'block', _key: 'b3', style: 'normal', markDefs: [],
          children: [{ _type: 'span', _key: 's3', marks: [], text: 'We don\'t just run ads — we build performance-driven PPC systems designed around your business goals.' }],
        },
      ],
      bullets: [
        'Strategy Backed by Data — Every campaign is built using keyword research, audience insights, and competitor analysis.',
        'Experienced PPC Specialists — Certified experts managing campaigns with advanced bidding strategies.',
        'Full Transparency — Clear reporting on leads, clicks, cost efficiency, and ROI.',
        'Focused on Conversions — Campaigns designed to generate real business outcomes.',
        'Daily Optimization — Continuous improvements to maximize performance.',
        'Dedicated Support — Regular updates, insights, and expert guidance.',
      ],
      imagePosition: 'left',
    },
    // 5. ctaSection — tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Maximize Your ROI with Smart PPC Advertising',
      bodyText: [
        {
          _type: 'block', _key: 'b4', style: 'normal', markDefs: [],
          children: [{ _type: 'span', _key: 's4', marks: [], text: 'Put your business in front of ready-to-buy customers through optimized and high-converting PPC campaigns.' }],
        },
      ],
      ctaText: 'Launch Ads Now',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 6. cardGridSection — cream
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Complete PPC Services That Fix Everything',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      background: 'cream',
      cards: [
        { _key: 'c1', title: 'Search Ads', description: 'Reach people actively searching for your products or services on Google and Bing, helping you generate high-quality leads and quick results.' },
        { _key: 'c2', title: 'Display Ads', description: 'Show visually engaging ads across websites and apps to build awareness, attract attention, and keep your brand visible to potential customers.' },
        { _key: 'c3', title: 'Remarketing Ads', description: 'Reconnect with people who visited your website but didn\'t take action, reminding them about your business and increasing chances of conversion.' },
        { _key: 'c4', title: 'Shopping Ads', description: 'Promote your products directly in search results with images and pricing, helping customers compare easily and make faster purchase decisions.' },
        { _key: 'c5', title: 'Social Ads', description: 'Reach targeted audiences on platforms like Facebook, Instagram, and LinkedIn to generate leads, drive traffic, and increase brand visibility.' },
        { _key: 'c6', title: 'Lead Ads', description: 'Capture customer inquiries through forms and calls, making it easy for users to connect with your business and take immediate action.' },
        { _key: 'c7', title: 'Performance Ads', description: 'Run automated campaigns across multiple platforms to maximize reach, improve efficiency, and drive better results using data-driven optimization.' },
      ],
    },
    // 7. cardGridSection — tintStyle: full
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'How Our PPC Ads Strategy Turn Searches Into Real Customers',
      tintStyle: 'full',
      cards: [
        { _key: 'd1', title: 'Appear for High-Intent Searches', badgeColor: 'mint', description: 'Show your ads exactly when users are actively searching for your products or services, capturing demand at the perfect moment.' },
        { _key: 'd2', title: 'Get Instant Top Visibility', badgeColor: 'peach', description: 'Reach top positions on search engines quickly, outranking competitors and gaining immediate exposure to potential customers.' },
        { _key: 'd3', title: 'Spend Smarter, Drive Conversions', badgeColor: 'lavender', description: 'Pay only for relevant clicks while targeting users with strong intent, ensuring your budget is used efficiently for better results.' },
        { _key: 'd4', title: 'Track, Optimize, and Scale', badgeColor: 'gray', description: 'Monitor every click, lead, and conversion with precision, allowing continuous optimization and scalable growth as your campaigns perform better.' },
      ],
    },
    // 8. statsSection — scattered
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Honest Numbers. Proven PPC Performance',
      bodyText: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
      layout: 'scattered',
      stats: [
        { _key: 'st1', value: '120+', label: 'PPC Campaigns Managed' },
        { _key: 'st2', value: '2.8X', label: 'Average ROAS Achieved' },
        { _key: 'st3', value: '38%', label: 'Increase in Qualified Leads' },
        { _key: 'st4', value: '1.9M+', label: 'Clicks Generated' },
        { _key: 'st5', value: '24%', label: 'Lower Cost Per Lead' },
        { _key: 'st6', value: '70%', label: 'Campaigns Improved ROI in 90 Days' },
        { _key: 'st7', value: '95%', label: 'Client Retention Rate' },
        { _key: 'st8', value: '6+', label: 'Countries Served' },
      ],
    },
    // 9. processStepsSection — headingBordered
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'A Structured Process Designed to Maximize Campaign Performance',
      headingBordered: true,
      steps: [
        { _key: 'p1', stepTitle: 'Understanding Your Business', stepDescription: 'Deep analysis of your audience and competitors.' },
        { _key: 'p2', stepTitle: 'Keyword Strategy Development', stepDescription: 'Build campaigns around high-intent searches.' },
        { _key: 'p3', stepTitle: 'Campaign Launch', stepDescription: 'Deploy ads with precision targeting and budgets.' },
        { _key: 'p4', stepTitle: 'Continuous Optimization', stepDescription: 'Improve results through ongoing testing and refinement.' },
      ],
    },
  ]

  const ppcDoc = await client.create({
    _type: 'servicePage',
    title: 'PPC Ads',
    slug: { _type: 'slug', current: PPC_SLUG },
    section: 'performance-marketing',
    summary: 'Own the top spot for high-intent keywords with high-performance PPC campaigns',
    accentStyle: 'brand',
    caseStudiesHeading: 'Real Results from Google Ads Campaigns',
    relatedCaseStudies: [
      {
        _type: 'object',
        _key: 'ppcBawa',
        caseStudy: { _type: 'reference', _ref: bawaId },
        overrideMetrics: [
          { _key: 'm1', value: '2.99K', label: 'total clicks' },
          { _key: 'm2', value: '90.1K', label: 'total impressions' },
          { _key: 'm3', value: '3.3%', label: 'avg CTR' },
          { _key: 'm4', value: '11.3', label: 'avg position' },
        ],
        metricsFilterTag: 'Daily',
      },
      {
        _type: 'object',
        _key: 'ppcFech',
        caseStudy: { _type: 'reference', _ref: fechId },
        overrideMetrics: [
          { _key: 'm5', value: '590', label: 'total clicks' },
          { _key: 'm6', value: '8.25K', label: 'total impressions' },
          { _key: 'm7', value: '7.2%', label: 'avg CTR' },
          { _key: 'm8', value: '21.1', label: 'avg position' },
        ],
        metricsFilterTag: 'Daily',
      },
    ],
    pageBuilder,
  })
  console.log(`\n✓ Created PPC page: ${ppcDoc._id}`)

  // ── 5. Link the 5 existing Search Ads FAQs to PPC page ─────────
  console.log('\n=== Linking shared FAQs to PPC page ===')
  const searchAdsFaqs = await client.fetch(
    `*[_type == "faq" && category == "performance-marketing" && defined(relatedPages)]{ _id, question, relatedPages }`,
  )
  for (const faq of searchAdsFaqs) {
    const existingRefs = faq.relatedPages || []
    const alreadyLinked = existingRefs.some((r: any) => r._ref === ppcDoc._id)
    if (alreadyLinked) {
      console.log(`  ✓ "${faq.question}" — already linked`)
      continue
    }
    const updatedRefs = [
      ...existingRefs,
      { _type: 'reference', _ref: ppcDoc._id, _key: ppcDoc._id.replace('drafts.', '') },
    ]
    await client.patch(faq._id).set({ relatedPages: updatedRefs }).commit()
    console.log(`  ✓ "${faq.question}" — added PPC ref`)
  }

  // Also link FAQs to the PPC page via relatedFaqs
  const faqRefs = searchAdsFaqs.map((f: any) => ({
    _type: 'reference',
    _ref: f._id,
    _key: f._id.replace('drafts.', ''),
  }))
  await client.patch(ppcDoc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqRefs.length} FAQs to PPC page's relatedFaqs`)

  // ── 6. Verify SEO page case studies ─────────────────────────────
  console.log('\n=== Verification ===')
  const seoPage = await client.fetch(
    `*[_type == "servicePage" && slug.current == "search-engine-optimization-seo-growth-services"][0]{
      title, accentStyle,
      relatedCaseStudies[]{ overrideMetrics, caseStudy->{ clientName, results } }
    }`,
  )
  console.log(`SEO page (${seoPage.title}), accentStyle: ${seoPage.accentStyle}`)
  for (const entry of seoPage.relatedCaseStudies || []) {
    const cs = entry.caseStudy
    const metrics = entry.overrideMetrics?.length ? entry.overrideMetrics : cs?.results
    console.log(`  ${cs?.clientName}: ${metrics?.length || 0} metrics (override: ${entry.overrideMetrics?.length ? 'yes' : 'no, using base'})`)
  }

  // Verify Search Ads page
  const searchAdsPage = await client.fetch(
    `*[_type == "servicePage" && slug.current == "google-search-ads-management-for-lead-generation"][0]{
      title, accentStyle,
      relatedCaseStudies[]{ overrideMetrics, caseStudy->{ clientName, results } }
    }`,
  )
  console.log(`Search Ads page (${searchAdsPage.title}), accentStyle: ${searchAdsPage.accentStyle}`)
  for (const entry of searchAdsPage.relatedCaseStudies || []) {
    const cs = entry.caseStudy
    const metrics = entry.overrideMetrics?.length ? entry.overrideMetrics : cs?.results
    console.log(`  ${cs?.clientName}: ${metrics?.length || 0} metrics (override: ${entry.overrideMetrics?.length ? 'yes' : 'no, using base'})`)
  }

  // Verify PPC page
  const ppcPage = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title, accentStyle,
      relatedCaseStudies[]{ metricsFilterTag, overrideMetrics, caseStudy->{ clientName, results } }
    }`,
    { slug: PPC_SLUG },
  )
  console.log(`PPC page (${ppcPage.title}), accentStyle: ${ppcPage.accentStyle}`)
  for (const entry of ppcPage.relatedCaseStudies || []) {
    const cs = entry.caseStudy
    console.log(`  ${cs?.clientName}: override=${JSON.stringify(entry.overrideMetrics?.map((m: any) => m.value))}, tag=${entry.metricsFilterTag}, base=${cs?.results?.map((r: any) => r.value).join(', ')}`)
  }

  // Verify shared FAQs show on both pages
  const ppcFaqCount = await client.fetch(
    `count(*[_type == "faq" && $ppcId in relatedPages[]._ref])`,
    { ppcId: ppcDoc._id },
  )
  const searchAdsId = await client.fetch(
    `*[_type == "servicePage" && slug.current == "google-search-ads-management-for-lead-generation"][0]._id`,
  )
  const searchAdsFaqCount = await client.fetch(
    `count(*[_type == "faq" && $saId in relatedPages[]._ref])`,
    { saId: searchAdsId },
  )
  console.log(`\nShared FAQs: ${ppcFaqCount} on PPC, ${searchAdsFaqCount} on Search Ads`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
