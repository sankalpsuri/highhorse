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

const SLUG = 'google-shopping-ads-management-for-ecommerce'

function block(key: string, text: string) {
  return [{
    _type: 'block', _key: key, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }]
}

async function main() {
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG },
  )
  if (existing) {
    console.log(`Shopping Ads page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      headline: 'Shopping Ads Agency That Understands Ecommerce Growth',
      subheadline: 'At High Horse, we help ecommerce brands run strategic shopping ad campaigns that increase product visibility, attract ready-to-buy customers, and turn search demand into sales.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — image right
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Struggling to Generate Sales From Your Ecommerce Ads? We Fix It.',
      bodyText: block('b1', '[TO BE VALIDATED] TODO: content team to write the three intro paragraphs (how shopping ads differ from search ads by showing images/price/store details; what makes shopping ads profitable — structure, optimization, bidding; High Horse\'s focus on visibility, traffic, and sales performance)'),
      bullets: [
        'Showcase your products directly in search results',
        'Reach high-intent shoppers ready to purchase',
        'Increase ecommerce traffic and product sales',
        'Optimize campaigns for better return on ad spend',
      ],
      imagePosition: 'right',
    },
    // 3. textImageSection — no image, plain divided rows
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'Spending Too Much on Ads But Still Not Getting Leads? Here\'s Why',
      bodyText: block('b2', '[TO BE VALIDATED] TODO: content team to write intro paragraph'),
      bullets: [
        'Product Visibility – Display product images and prices directly in search results.',
        'High Purchase Intent – Reach users actively searching for products like yours.',
        'Stronger Conversion Rates – Shoppers see product details before clicking the ad.',
        'Improved Ecommerce Sales – Drive more product purchases through targeted campaigns.',
        'Performance Tracking – Measure clicks, sales, and return on ad spend clearly.',
      ],
    },
    // 4. textImageSection — image left, stacked bullets
    {
      _type: 'textImageSection',
      _key: 'text03',
      heading: 'High Horse Give the Data-Driven Product Advertising Designed for Ecommerce Growth',
      bodyText: block('b3', '[TO BE VALIDATED] TODO: confirm full text — source line ends mid-sentence: \'Our shopping ad campaigns combine product feed optimization, smart bidding, and audience targeting...\''),
      bulletStyle: 'stacked',
      bullets: [
        'Product Feed Optimization — Improve product titles, descriptions, and attributes for better ad performance.',
        'Smart Bidding Strategies — Automated bidding designed to maximize conversions and return on ad spend.',
        'Search Intent Targeting — Focus on product searches that bring potential buyers.',
        'Continuous Campaign Optimization — Regular improvements to maintain profitable campaign performance.',
        'Transparent Performance Reporting — Track sales, product performance, and advertising efficiency clearly.',
        'Dedicated Ecommerce Specialists — Experienced experts managing campaigns designed specifically for ecommerce businesses.',
      ],
      imagePosition: 'left',
    },
    // 5. ctaSection — tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Put Your Products in Front of Ready Buyers',
      bodyText: block('b4', 'Leverage powerful shopping ads to highlight your catalog, attract qualified traffic, and convert clicks into consistent online sales growth.'),
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 6. cardGridSection — cream
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Our Shopping Advertising Formats Designed to Promote Your Products',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      background: 'cream',
      cards: [
        { _key: 'c1', title: 'Standard Shopping Ads', description: 'Promote individual products with images, prices, and store details in search results.' },
        { _key: 'c2', title: 'Performance Max Shopping Campaigns', description: 'Automated campaigns that promote products across search, display, YouTube, and other advertising placements.' },
        { _key: 'c3', title: 'Local Inventory Ads', description: 'Promote products available in nearby stores to attract local shoppers.' },
        { _key: 'c4', title: 'Smart Shopping Campaigns', description: 'Automated product campaigns designed to maximize conversions using machine learning.' },
        { _key: 'c5', title: 'Remarketing Shopping Ads', description: 'Re-engage visitors who previously viewed products but did not complete purchases.' },
        { _key: 'c6', title: 'Product Category Campaigns', description: 'Promote specific product categories to attract targeted shopping traffic.' },
      ],
    },
    // 7. processStepsSection
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'A Structured Process Designed to Maximize Campaign Performance',
      subtext: '[TO BE VALIDATED] TODO: confirm — shopping-specific copy written below since source steps were copied verbatim from PPC page. Replace if you\'d rather write this yourself.',
      steps: [
        { _key: 'p1', stepTitle: 'Business & Catalog Understanding', stepDescription: 'Review your product catalog, competitors, and target shoppers to shape the campaign strategy.' },
        { _key: 'p2', stepTitle: 'Feed & Keyword Strategy', stepDescription: 'Optimize your product feed and identify high-intent shopping search terms.' },
        { _key: 'p3', stepTitle: 'Campaign Launch', stepDescription: 'Set up and launch shopping campaigns with precise targeting and budgets.' },
        { _key: 'p4', stepTitle: 'Continuous Optimization', stepDescription: 'Monitor product-level performance and refine bids, feed, and targeting over time.' },
      ],
    },
    // 8. statsSection — scattered
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Performance That Reflects Real Ecommerce Advertising Growth',
      bodyText: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
      layout: 'scattered',
      stats: [
        { _key: 'st1', value: '80+', label: 'Shopping Campaigns Managed' },
        { _key: 'st2', value: '500k+', label: 'Product Clicks Generated' },
        { _key: 'st3', value: '30%', label: 'Saved Through Smart Optimization' },
        { _key: 'st4', value: '10+', label: 'Ecommerce Businesses Served' },
        { _key: 'st5', value: '5+', label: 'Experience in Ecommerce Advertising' },
        { _key: 'st6', value: '25%', label: 'In Product-Level Conversions' },
        { _key: 'st7', value: '33%', label: 'Increase in Click Through Rate' },
        { _key: 'st8', value: '6+', label: 'Globally Served' },
      ],
    },
    // 9. textImageSection — image right (Setmi graphic)
    {
      _type: 'textImageSection',
      _key: 'text04',
      heading: 'What You Gain When High Horse Runs Your Shopping Ads',
      bodyText: block('b5', '[TO BE VALIDATED] TODO: confirm full text — source line ends mid-sentence: \'When High Horse manages your shopping campaigns...\''),
      bullets: [
        'Smarter Product Visibility – Your products appear with optimized titles, images, and pricing to stand out in search results and attract more qualified shoppers.',
        'Higher Purchase Intent Traffic – We target high-intent search queries, ensuring your ads reach people actively looking to buy, not just browse.',
        'Better Click Quality – Through feed optimization and targeting, we reduce irrelevant clicks and focus only on users likely to convert into customers.',
        'Stronger Conversion Rates – Optimized product listings and campaign strategies help turn clicks into actual purchases more efficiently.',
        'Increased Ecommerce Revenue – Our strategies are focused on driving more product sales while maintaining profitable return on ad spend.',
        'Clear Performance Tracking – You get complete visibility into clicks, conversions, and revenue, with data-driven insights to scale your campaigns confidently.',
      ],
      imagePosition: 'right',
    },
  ]

  const doc = await client.create({
    _type: 'servicePage',
    title: 'Shopping Ads',
    slug: { _type: 'slug', current: SLUG },
    section: 'performance-marketing',
    summary: 'Shopping ads agency that turns ecommerce search demand into sales',
    accentStyle: 'brand',
    pageBuilder,
  })
  console.log(`✓ Created Shopping Ads page: ${doc._id}`)

  // Create 4 FAQ documents
  const faqQuestions = [
    'How do Shopping Ads generate more sales compared to search ads?',
    'What is the ideal budget to start Shopping Ads for an ecommerce store?',
    'What is product feed optimization and why is it important?',
    'Do Shopping Ads work for all ecommerce industries?',
  ]

  const todoAnswer = block('ans', '[TO BE VALIDATED] TODO: content team to write answer')

  const faqIds: string[] = []
  for (let i = 0; i < faqQuestions.length; i++) {
    const faq = await client.create({
      _type: 'faq',
      question: faqQuestions[i],
      answer: todoAnswer.map((b) => ({
        ...b,
        _key: `ans${i}`,
        children: b.children.map((c: any) => ({ ...c, _key: `sp${i}` })),
      })),
      category: 'performance-marketing',
      relatedPages: [{ _type: 'reference', _ref: doc._id, _key: doc._id.replace('drafts.', '') }],
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqQuestions[i]}"`)
  }

  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to Shopping Ads page`)

  // Verify no relatedCaseStudies set
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ title, relatedCaseStudies }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: relatedCaseStudies = ${verify.relatedCaseStudies ? verify.relatedCaseStudies.length : 'null'} (expected null — no case study grid)`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
