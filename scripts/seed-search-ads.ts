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

const SEARCH_ADS_SLUG = 'google-search-ads-management-for-lead-generation'
const SEO_SLUG = 'search-engine-optimization-seo-growth-services'

async function main() {
  // ── 1. Set accentStyle: "multi" on the existing SEO page ────────
  const seoPage = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, accentStyle }`,
    { slug: SEO_SLUG },
  )
  if (!seoPage) {
    console.error('SEO page not found — cannot set accentStyle')
    process.exit(1)
  }
  await client.patch(seoPage._id).set({ accentStyle: 'multi' }).commit()
  console.log(`✓ Set accentStyle: "multi" on SEO page (${seoPage._id})`)

  // ── 2. Fetch case-study IDs for relatedCaseStudies ──────────────
  const caseStudies = await client.fetch(
    `*[_type == "caseStudy" && clientName in $names]{ _id, clientName }`,
    { names: ['Bawa', 'Fech Moving & Cleaning', 'Hioki'] },
  )
  console.log(`Found ${caseStudies.length} case studies:`, caseStudies.map((c: any) => c.clientName))
  const csRefs = caseStudies.map((c: any) => ({ _type: 'reference', _ref: c._id, _key: c._id.replace('drafts.', '') }))

  // ── 3. Create the Search Ads service page ───────────────────────
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SEARCH_ADS_SLUG },
  )
  if (existing) {
    console.log(`Search Ads page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      headline: 'Search Ads That Bring Customers When They Are Ready To Buy',
      subheadline: 'Reach people actively searching for your products or services. Our search ads campaigns focus on high-intent keywords, smart bidding, and measurable growth.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — image right
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Work With a Search Ads Agency That Focuses on Real Results',
      bodyText: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Search ads are one of the fastest ways to generate qualified leads because they put your business in front of people who are already searching for what you offer. At High Horse, we build search ad campaigns around precise keyword targeting, continuous optimization, and clear performance tracking, so your ad spend consistently turns into real business results. Whether your goal is generating leads, driving ecommerce sales, or increasing qualified traffic, we build the campaign strategy around what actually matters to your business.',
              marks: [],
            },
          ],
        },
      ],
      bullets: [
        '65% of businesses increase leads using paid search campaigns',
        '3X faster lead generation compared to organic channels',
        'High-intent traffic from people actively searching for solutions',
        'Instant visibility on top of Google search results',
      ],
      imagePosition: 'right',
    },
    // 3. textImageSection — no image
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'How Search Ads Help Your Business Grow',
      bodyText: [
        {
          _type: 'block',
          _key: 'b2',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's2',
              text: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
              marks: [],
            },
          ],
        },
      ],
      bullets: [
        'Reach High-Intent Customers — Your ads appear when users search for services like yours.',
        'Instant Visibility — Show on the top of Google search results within hours.',
        'Control Your Budget — Spend only on clicks from interested customers.',
        'Better Conversion Rates — Target keywords that bring users ready to take action.',
        'Measurable Results — Track every click, lead, and sale from your campaigns.',
        'Scalable Growth — Increase campaigns as your business grows.',
      ],
    },
    // 4. cardGridSection — dashed, no badgeColor
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Why Many Brands Don\'t Get Leads From Search Ads?',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      style: 'dashed',
      cards: [
        { _key: 'c1', title: 'Wrong Keyword Targeting', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'c2', title: 'Weak Ad Copy', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'c3', title: 'Poor Landing Page Experience', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'c4', title: 'Lack of Continuous Optimization', description: '[TO BE VALIDATED] TODO: content team to write description' },
      ],
    },
    // 5. textImageSection — image left
    {
      _type: 'textImageSection',
      _key: 'text03',
      heading: 'Why Businesses Choose High Horse for Search Ads',
      bodyText: [
        {
          _type: 'block',
          _key: 'b3',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's3',
              text: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
              marks: [],
            },
          ],
        },
      ],
      bullets: [
        'Data-Driven Campaign Strategy — Campaigns built using detailed keyword research, competitor analysis, and audience insights.',
        'Certified Paid Advertising Experts — Experienced specialists managing campaigns with advanced bidding strategies and platform expertise.',
        'Transparent Campaign Reporting — Clear reports showing performance metrics including clicks, leads, cost efficiency, and overall return on advertising investment.',
        'Conversion-Focused Approach — Every campaign optimized to generate leads, sales, and meaningful business outcomes.',
        'Continuous Campaign Optimization — Daily monitoring ensures ads, keywords, and bids are improved for better performance.',
        'Dedicated Campaign Support — Our team provides regular communication, strategy updates, and campaign performance insights.',
      ],
      imagePosition: 'left',
    },
    // 6. ctaSection — tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Let\'s Build Content That Brings the Right Customers to Your Business',
      bodyText: [
        {
          _type: 'block',
          _key: 'b4',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's4',
              text: '[TO BE VALIDATED] TODO: content team to write body text',
              marks: [],
            },
          ],
        },
      ],
      ctaText: 'Get a Free Content Audit',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 7. statsSection — scattered
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'See Our Journey Through Numbers',
      bodyText: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
      layout: 'scattered',
      stats: [
        { _key: 'st1', value: '120+', label: 'Search Ads Campaigns Managed Successfully' },
        { _key: 'st2', value: '38%', label: 'Increase in Qualified Leads' },
        { _key: 'st3', value: '2.8X', label: 'Return on Ad Spend Achieved' },
        { _key: 'st4', value: '1.9M+', label: 'High-Intent Clicks Generated' },
        { _key: 'st5', value: '6+', label: 'Presence in Global' },
        { _key: 'st6', value: '24%', label: 'Average Cost Per Lead After Optimization' },
        { _key: 'st7', value: '70%', label: 'Achieved Improved ROI Within First 90 Days' },
        { _key: 'st8', value: '95%', label: 'Business from Referrals' },
      ],
    },
    // 8. cardGridSection — cream background
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Turn High-Intent Searches Into Real Business Opportunities',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      background: 'cream',
      cards: [
        { _key: 'd1', title: 'Responsive Search Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd2', title: 'Call Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd3', title: 'Dynamic Search Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd4', title: 'Brand Search Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd5', title: 'Competitor Targeting Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd6', title: 'Local Search Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd7', title: 'Lead Generation Search Ads', description: '[TO BE VALIDATED] TODO: content team to write description' },
        { _key: 'd8', title: 'High-Intent Keyword Campaigns', description: '[TO BE VALIDATED] TODO: content team to write description' },
      ],
    },
    // 9. processStepsSection
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'A Structured Process Designed to Maximize Campaign Performance',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      steps: [
        { _key: 'p1', stepTitle: 'Business Understanding', stepDescription: 'Analyze your industry, target audience, and competitors before creating the advertising strategy.' },
        { _key: 'p2', stepTitle: 'Keyword Strategy Development', stepDescription: 'Identify profitable keywords and build campaign structure based on user search intent.' },
        { _key: 'p3', stepTitle: 'Campaign Launch and Setup', stepDescription: 'Create ads, set budgets, configure targeting, and launch campaigns.' },
        { _key: 'p4', stepTitle: 'Continuous Optimization', stepDescription: 'Monitor campaign data regularly and optimize keywords, ads, and bids.' },
      ],
    },
    // 10. textImageSection — Hioki case study
    {
      _type: 'textImageSection',
      _key: 'text04',
      heading: 'Powering Hioki\'s Growth with High-Performance Search Ads',
      bodyText: [
        {
          _type: 'block',
          _key: 'b5',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's5',
              text: '[TO BE VALIDATED] TODO: content team to write paragraph about targeting, messaging, and optimization',
              marks: [],
            },
          ],
        },
      ],
      imagePosition: 'right',
    },
  ]

  const doc = await client.create({
    _type: 'servicePage',
    title: 'Search Ads',
    slug: { _type: 'slug', current: SEARCH_ADS_SLUG },
    section: 'performance-marketing',
    summary: 'Search ads that bring customers when they\'re ready to buy',
    accentStyle: 'brand',
    pageBuilder,
    relatedCaseStudies: csRefs,
  })
  console.log(`\n✓ Created Search Ads page: ${doc._id}`)

  // ── 4. Create 5 FAQ documents ──────────────────────────────────
  const faqQuestions = [
    'How quickly can search ads generate results?',
    'How much budget is required for search ads?',
    'Which platforms do you manage search ads on?',
    'Do search ads work for small businesses?',
    'How do you measure search campaign success?',
  ]

  const todoAnswer = [
    {
      _type: 'block',
      _key: 'ans',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'sp',
          text: '[TO BE VALIDATED] TODO: content team to write answer',
          marks: [],
        },
      ],
    },
  ]

  const faqIds: string[] = []
  for (let i = 0; i < faqQuestions.length; i++) {
    const faq = await client.create({
      _type: 'faq',
      question: faqQuestions[i],
      answer: todoAnswer.map((block) => ({
        ...block,
        _key: `ans${i}`,
        children: block.children.map((c) => ({ ...c, _key: `sp${i}` })),
      })),
      category: 'performance-marketing',
      relatedPage: { _type: 'reference', _ref: doc._id },
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqQuestions[i]}"`)
  }

  // Link FAQs to the service page
  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to Search Ads page`)

  // ── 5. Verify SEO page still has accentStyle: "multi" ──────────
  const seoVerify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ accentStyle }`,
    { slug: SEO_SLUG },
  )
  console.log(`\n✓ SEO page accentStyle: "${seoVerify?.accentStyle}" (expected "multi")`)

  // ── 6. Verify case studies not overwritten ─────────────────────
  for (const cs of caseStudies) {
    const data = await client.fetch(
      `*[_type == "caseStudy" && _id == $id][0]{ clientName, results }`,
      { id: cs._id },
    )
    console.log(`  ✓ ${data.clientName}: ${data.results?.length || 0} results (intact)`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
