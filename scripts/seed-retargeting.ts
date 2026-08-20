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

const SLUG = 'retargeting-and-remarketing-ad-campaign-services'

function block(key: string, text: string) {
  return [{
    _type: 'block', _key: key, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }]
}

function blocks(items: { key: string; text: string }[]) {
  return items.map(({ key, text }) => ({
    _type: 'block', _key: key, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }))
}

async function main() {
  // ── 1. Clean up existing page ─────────────────────────────────
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG },
  )
  if (existing) {
    console.log(`Retargeting page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  // ── 2. Find or create Setmi case study ────────────────────────
  let setmiId: string
  const existingSetmi = await client.fetch(
    `*[_type == "caseStudy" && clientName == "Setmi"][0]{ _id }`,
  )
  if (existingSetmi) {
    setmiId = existingSetmi._id
    console.log(`Found existing Setmi case study: ${setmiId}`)
  } else {
    const setmiDoc = await client.create({
      _type: 'caseStudy',
      clientName: 'Setmi',
      slug: { _type: 'slug', current: 'setmi' },
      industry: 'B2B',
      summary: "Setmi's B2B Sales Boom: Powered by WhatsApp Retargeting Ads",
      featured: false,
    })
    setmiId = setmiDoc._id
    console.log(`✓ Created Setmi case study: ${setmiId}`)
  }

  // ── 3. Build pageBuilder sections ─────────────────────────────
  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      headline: 'Retargeting Ads That Bring Back Visitors Who Didn\'t Convert',
      subheadline: 'Reconnect with people who already showed interest in your business. Our retargeting ad campaigns are designed to re-engage visitors, recover lost leads, and turn missed opportunities into conversions.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — Work With Agency (image right)
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Work With a Retargeting Ads Agency That Focuses on Conversions',
      bodyText: blocks([
        { key: 'b1a', text: 'Most website visitors don\'t convert on their first visit—and that\'s where retargeting makes the difference. Instead of losing potential customers, retargeting campaigns help you stay visible and bring them back when they are ready to take action.' },
        { key: 'b1b', text: 'Our retargeting advertising services focus on reconnecting your brand with high-potential users across platforms like Google, Meta, and display networks. By using audience segmentation, behavioral tracking, and personalized ad creatives, we ensure your ads are shown to the right people at the right time.' },
        { key: 'b1c', text: 'Whether your goal is to recover abandoned carts, increase inquiries, or boost repeat purchases, our retargeting strategies are built to maximize conversions and improve your overall marketing ROI.' },
      ]),
      bullets: [
        '70% of users are more likely to convert through retargeting',
        '2X–3X higher conversion rates compared to cold audiences',
        'Lower Cost Per Acquisition by targeting warm users',
        'Stronger Brand Recall across multiple platforms',
      ],
      imagePosition: 'right',
    },
    // 3. textImageSection — Benefits (no image, stacked bullets)
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'How Retargeting Ads Help Your Business Grow',
      bodyText: block('b2', 'Retargeting can deliver strong results—but only when executed strategically. Poor setup often leads to wasted budget and low performance.'),
      bulletStyle: 'stacked',
      bullets: [
        'Reconnect With Interested Users — Show ads to people who visited your website or engaged with your brand.',
        'Increase Conversion Rates — Target users who are already familiar with your offerings.',
        'Reduce Lost Opportunities — Bring back users who left without taking action.',
        'Personalized Ad Experience — Deliver relevant ads based on user behavior.',
        'Multi-Platform Reach — Engage users across Google Display Network, Facebook, Instagram, and more.',
        'Improve ROI — Focus budget on audiences more likely to convert.',
      ],
    },
    // 4. cardGridSection — Why Many Businesses Fail (4 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Why Many Businesses Fail With Retargeting Ads?',
      subtext: 'Retargeting can deliver strong results—but only when executed strategically. Poor setup often leads to wasted budget and low performance.',
      tintStyle: 'full',
      cards: [
        { _key: 'c1', title: 'Poor Audience Targeting', description: 'Showing the same ads to all users instead of segmenting them based on behavior, intent, or stage in the journey.', badgeColor: 'mint' },
        { _key: 'c2', title: 'Ad Fatigue & Low Engagement', description: 'Repeatedly showing the same ads leads to reduced interest, lower engagement, and increased costs.', badgeColor: 'peach' },
        { _key: 'c3', title: 'Weak Messaging & Funnel Strategy', description: 'Lack of compelling creatives and no structured messaging across different stages of the customer journey.', badgeColor: 'lavender' },
        { _key: 'c4', title: 'Tracking & Data Issues', description: 'Improper pixel or event setup results in inaccurate data and ineffective targeting.', badgeColor: 'gray' },
      ],
    },
    // 5. textImageSection — Why Choose Us (image left, stacked)
    {
      _type: 'textImageSection',
      _key: 'text03',
      heading: 'Why Businesses Choose High Horse for Retargeting Ads',
      headingBordered: true,
      bodyText: block('b3', 'We build retargeting campaigns that go beyond basic reminders—focused on strategy, personalization, and performance.'),
      bulletStyle: 'stacked',
      bullets: [
        'Advanced Audience Segmentation — Target users based on actions like page visits, time spent, and cart abandonment.',
        'Creative-Driven Campaigns — Ad creatives designed to re-engage users and drive action.',
        'Full Funnel Retargeting Strategy — Different messaging for awareness, consideration, and conversion stages.',
        'Cross-Platform Campaign Execution — Seamless retargeting across Google, Facebook, Instagram, and display networks.',
        'Conversion-Focused Optimization — Continuous testing to improve click-through rates and conversions.',
        'Transparent Reporting — Clear insights into performance, conversions, and return on ad spend.',
      ],
      imagePosition: 'left',
    },
    // 6. ctaSection — tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Turn Lost Visitors into Paying Customers',
      bodyText: block('b4', 'Reconnect with users who\'ve already shown interest and bring them back with personalized ads designed to convert and drive more revenue.'),
      ctaText: 'Start Retargeting Now',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 7. cardGridSection — Services Grid (dashed, 8 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Turn Lost Visitors Into Paying Customers with Right Ads Funnel',
      subtext: 'Our retargeting strategies focus on bringing back users who are most likely to convert, using data-driven targeting and personalized ad experiences.',
      style: 'dashed',
      cards: [
        { _key: 'd1', title: 'Website Retargeting Ads', description: 'Reconnect with visitors who explored your website, reminding them of your offerings and guiding them back to complete desired actions.' },
        { _key: 'd2', title: 'Dynamic Product Retargeting', description: 'Display personalized ads featuring products users viewed or added to cart, increasing relevance and encouraging them to return and complete purchases.' },
        { _key: 'd3', title: 'Cart Abandonment Campaigns', description: 'Target users who left items in their cart with tailored ads and reminders, motivating them to return and complete purchases quickly.' },
        { _key: 'd4', title: 'Video Retargeting Ads', description: 'Re-engage users who watched or interacted with your video content by delivering relevant ads that encourage deeper engagement and conversions.' },
        { _key: 'd5', title: 'Social Media Retargeting', description: 'Reconnect with users who engage with your social profiles or ads, reinforcing brand presence and encouraging them to take the next step.' },
        { _key: 'd6', title: 'Search Retargeting Ads', description: 'Target users based on their previous search behavior, showing relevant ads that match their intent and guide them back to your business.' },
        { _key: 'd7', title: 'Email List Retargeting', description: 'Upload and target your existing email subscribers with personalized ads, ensuring consistent engagement and driving conversions across multiple digital platforms.' },
        { _key: 'd8', title: 'App Retargeting Campaigns', description: 'Re-engage users who installed your app but became inactive, encouraging them to return, explore features, and complete desired in-app actions.' },
      ],
    },
    // 8. processStepsSection — 4 steps
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'A Strategic Process Built for Retargeting Success',
      subtext: 'Our process ensures your retargeting campaigns are well-planned, properly executed, and continuously optimized.',
      steps: [
        { _key: 'p1', stepTitle: 'Audience Analysis', stepDescription: 'Understand user behavior, engagement patterns, and drop-off points.' },
        { _key: 'p2', stepTitle: 'Segmentation Strategy', stepDescription: 'Divide audiences based on intent, actions, and stage in the funnel.' },
        { _key: 'p3', stepTitle: 'Campaign Setup & Launch', stepDescription: 'Deploy campaigns across platforms with proper tracking and creatives.' },
        { _key: 'p4', stepTitle: 'Continuous Optimization', stepDescription: 'Refine audiences, creatives, and budgets for better performance.' },
      ],
    },
    // 9. statsSection — scattered (7 stats)
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Growth Backed by Performance Metrics',
      bodyText: 'Our retargeting campaigns consistently help businesses recover lost traffic, increase conversions, and improve marketing efficiency.',
      layout: 'scattered',
      stats: [
        { _key: 'st1', value: '150+', label: 'Retargeting Campaigns Managed' },
        { _key: 'st2', value: '42%', label: 'Increase in Conversion Rate' },
        { _key: 'st3', value: '2.5X', label: 'Return on Ad Spend' },
        { _key: 'st4', value: '1.5M+', label: 'Users Re-engaged Successfully' },
        { _key: 'st5', value: '30%', label: 'Cost Per Acquisition' },
        { _key: 'st6', value: '80%', label: 'Improved Performance Within 60 Days' },
        { _key: 'st7', value: '90%', label: 'Client Retention Rate' },
      ],
    },
  ]

  // ── 4. Create the service page ────────────────────────────────
  const doc = await client.create({
    _type: 'servicePage',
    title: 'Retargeting',
    slug: { _type: 'slug', current: SLUG },
    section: 'performance-marketing',
    summary: 'Retargeting ad campaigns that bring back visitors and turn missed opportunities into conversions',
    accentStyle: 'brand',
    pageBuilder,
    caseStudiesHeading: 'Turn Missed Opportunities Into Measurable Growth',
    caseStudiesSubtext: 'Retargeting advertising is one of the most powerful ways to convert existing traffic into real business results. Instead of constantly chasing new users, our strategies focus on maximizing the value of your current audience.',
    relatedCaseStudies: [
      {
        _type: 'object',
        _key: 'csSetmi',
        caseStudy: { _type: 'reference', _ref: setmiId },
      },
    ],
  })
  console.log(`✓ Created Retargeting page: ${doc._id}`)

  // ── 5. Create 5 FAQ documents with actual answers from HTML ───
  const faqData = [
    {
      question: 'How do retargeting ads work?',
      answer: 'Retargeting ads use tracking pixels placed on your site to identify visitors, then show them tailored ads across platforms like Google, Meta, and display networks to bring them back.',
    },
    {
      question: 'How soon can I see results from retargeting ads?',
      answer: 'Most campaigns show measurable engagement within the first 2–4 weeks, with performance continuing to improve as we optimize audiences and creatives.',
    },
    {
      question: 'Which platforms are best for retargeting ads?',
      answer: 'Google Display Network, Meta (Facebook & Instagram), and YouTube typically deliver the strongest results, though the right mix depends on where your audience spends time.',
    },
    {
      question: 'Are retargeting ads expensive?',
      answer: 'Retargeting is generally more cost-efficient than cold-audience campaigns since you\'re reaching warm users who are already familiar with your brand.',
    },
    {
      question: 'Can retargeting help ecommerce businesses?',
      answer: 'Yes — retargeting is especially effective for ecommerce, helping recover abandoned carts and re-engage shoppers who browsed products without purchasing.',
    },
  ]

  const faqIds: string[] = []
  for (let i = 0; i < faqData.length; i++) {
    const faq = await client.create({
      _type: 'faq',
      question: faqData[i].question,
      answer: [{
        _type: 'block', _key: `ans${i}`, style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: `sp${i}`, marks: [], text: faqData[i].answer }],
      }],
      category: 'performance-marketing',
      relatedPages: [{ _type: 'reference', _ref: doc._id, _key: doc._id.replace('drafts.', '') }],
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqData[i].question}"`)
  }

  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to Retargeting page`)

  // ── 6. Verify ─────────────────────────────────────────────────
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      "sections": count(pageBuilder),
      "faqs": count(relatedFaqs),
      "cases": count(relatedCaseStudies),
      relatedCaseStudies[]{ caseStudy->{ clientName } }
    }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: ${verify.sections} sections, ${verify.faqs} FAQs, ${verify.cases} case studies`)
  if (verify.relatedCaseStudies) {
    for (const entry of verify.relatedCaseStudies) {
      console.log(`  Case study: ${entry.caseStudy?.clientName || 'unknown'}`)
    }
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
