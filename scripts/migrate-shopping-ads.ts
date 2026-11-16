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

const PAGE_ID = 'uBwiUtn9Wx8WqRIUPjIZcZ'

async function main() {
  const page = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      _id, _rev, title,
      pageBuilder[]{ _key, _type, heading, heroImage, image }
    }`,
    { id: PAGE_ID },
  )

  if (!page) {
    console.error('Shopping Ads page not found')
    process.exit(1)
  }

  console.log(`Found page: ${page._id} — "${page.title}"`)

  // Preserve existing image references
  const heroImage = page.pageBuilder?.find((b: any) => b._type === 'heroSection')?.heroImage
  const strugglingImage = page.pageBuilder?.find((b: any) => b._key === 'sh-split1')?.image
  const keepImages = { heroImage, strugglingImage }
  console.log('Hero image ref:', heroImage?.asset?._ref ? 'found' : 'missing')
  console.log('Struggling image ref:', strugglingImage?.asset?._ref ? 'found' : 'missing')

  const newPageBuilder = [
    // 1. HERO
    {
      _key: 'sh-hero',
      _type: 'heroSection',
      eyebrowText: 'Shopping Ads Services',
      eyebrowDotColor: 'orange',
      heroBackground: 'white',
      headline: 'Shopping Ads Agency That Understands Ecommerce Growth',
      headlineHighlights: ['Ecommerce Growth'],
      subheadline: 'At High Horse, we help ecommerce brands run strategic shopping ad campaigns that increase product visibility, attract ready-to-buy customers, and turn search demand into sales.',
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      textAlign: 'left',
      mobileImageSquare: true,
      ...(keepImages.heroImage ? { heroImage: keepImages.heroImage } : {}),
    },

    // 2. STRUGGLING TO GENERATE SALES
    {
      _key: 'sh-split1',
      _type: 'textImageSection',
      eyebrow: 'The challenge',
      heading: 'Struggling to Generate Sales From Your Ecommerce Ads? We Fix it.',
      bodyText: [
        {
          _key: 'b1',
          _type: 'block',
          markDefs: [],
          style: 'normal',
          children: [{ _key: 'c1', _type: 'span', marks: [], text: 'Shopping ads are one of the most powerful advertising formats for ecommerce businesses. Instead of promoting just a website link, these ads display product images, titles, prices, and store details — giving shoppers all the information they need to make quick decisions.' }],
        },
        {
          _key: 'b2',
          _type: 'block',
          markDefs: [],
          style: 'normal',
          children: [{ _key: 'c2', _type: 'span', marks: [], text: 'However, running profitable shopping ads requires more than simply uploading product feeds. Proper campaign structure, product optimization, and bidding strategies are essential for success.' }],
        },
        {
          _key: 'b3',
          _type: 'block',
          markDefs: [],
          style: 'normal',
          children: [{ _key: 'c3', _type: 'span', marks: [], text: 'Our shopping ads strategies focus on helping ecommerce businesses increase product visibility, attract qualified traffic, and maximize sales performance.' }],
        },
      ],
      bullets: [
        'Showcase your products directly in search results',
        'Reach high-intent shoppers ready to purchase',
        'Increase ecommerce traffic and product sales',
        'Optimize campaigns for better return on ad spend',
      ],
      imagePosition: 'right',
      ...(keepImages.strugglingImage ? { image: keepImages.strugglingImage } : {}),
    },

    // 3. SHOPPING ADS HELP (NEW — icon-grid white bg)
    {
      _key: 'sh-benefits',
      _type: 'cardGridSection',
      eyebrow: 'Benefits',
      heading: 'Shopping Ads Help Customers Discover and Purchase Your Products Faster',
      subtext: 'Shopping ads showcase product images, prices, and store information directly in search results, helping attract shoppers already ready to buy.',
      headerLayout: 'split',
      style: 'icon-grid',
      background: 'white',
      cards: [
        { _key: 'bk1', title: 'Product Visibility', description: 'Display product images and prices directly in search results.', svgPath: 'M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
        { _key: 'bk2', title: 'High Purchase Intent', description: 'Reach users actively searching for products like yours.', svgPath: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
        { _key: 'bk3', title: 'Better Click Quality', description: 'Product information filters unqualified traffic automatically.', svgPath: 'M4 5h16l-6 7.5V19l-4 2v-8.5z' },
        { _key: 'bk4', title: 'Stronger Conversion Rates', description: 'Shoppers see product details before clicking the ad.', svgPath: 'M4 18l5-5 4 4 7-8 M15 9h5v5' },
        { _key: 'bk5', title: 'Improved Ecommerce Sales', description: 'Drive more product purchases through targeted campaigns.', svgPath: 'M3 4h2.5l2.2 11h10.8L21 7.5H6.4 M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' },
        { _key: 'bk6', title: 'Performance Tracking', description: 'Measure clicks, sales, and return on ad spend clearly.', svgPath: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2' },
      ],
    },

    // 4. WHY CHOOSE HIGH HORSE (dark numbered cards)
    {
      _key: 'sh-whyus',
      _type: 'cardGridSection',
      eyebrow: 'Why choose us',
      heading: 'High Horse Give the Data-Driven Product Advertising Designed for Ecommerce Growth',
      subtext: 'Our shopping ad campaigns combine product feed optimization, smart bidding, and audience targeting to improve product visibility and maximize ecommerce revenue.',
      headerLayout: 'split',
      style: 'dark',
      darkCardStyle: 'numbered',
      showGlow: false,
      cards: [
        { _key: 'wu1', title: 'Product Feed Optimization', description: 'Improve product titles, descriptions, and attributes for better ad performance.' },
        { _key: 'wu2', title: 'Smart Bidding Strategies', description: 'Automated bidding designed to maximize conversions and return on ad spend.' },
        { _key: 'wu3', title: 'Search Intent Targeting', description: 'Focus on product searches that bring potential buyers.' },
        { _key: 'wu4', title: 'Continuous Campaign Optimization', description: 'Regular improvements to maintain profitable campaign performance.' },
        { _key: 'wu5', title: 'Transparent Performance Reporting', description: 'Track sales, product performance, and advertising efficiency clearly.' },
        { _key: 'wu6', title: 'Dedicated Ecommerce Specialists', description: 'Experienced experts managing campaigns designed specifically for ecommerce businesses.' },
      ],
    },

    // 5. CTA BAND (blue)
    {
      _key: 'sh-cta',
      _type: 'ctaSection',
      heading: 'Put Your Products in Front of Ready Buyers',
      bodyText: [
        {
          _key: 'cta1',
          _type: 'block',
          markDefs: [],
          style: 'normal',
          children: [{ _key: 'ctac1', _type: 'span', marks: [], text: 'Leverage powerful shopping ads to highlight your catalog, attract qualified traffic, and convert clicks into consistent online sales growth.' }],
        },
      ],
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'blue',
    },

    // 6. SHOPPING AD FORMATS (icon-grid gray bg)
    {
      _key: 'sh-services',
      _type: 'cardGridSection',
      eyebrow: 'What we do',
      heading: 'Our Shopping Advertising Formats Designed to Promote Your Products',
      subtext: 'Different shopping ad formats help ecommerce brands reach buyers across search platforms and shopping experiences effectively.',
      headerLayout: 'split',
      style: 'icon-grid',
      cards: [
        { _key: 'sv1', title: 'Standard Shopping Ads', description: 'Promote individual products with images, prices, and store details in search results.', svgPath: 'M5 7h14l-1.2 12.5H6.2z M9 7V5.5a3 3 0 0 1 6 0V7' },
        { _key: 'sv2', title: 'Performance Max Shopping Campaigns', description: 'Automated campaigns that promote products across search, display, YouTube, and other advertising placements.', svgPath: 'M13 3L5 13h6l-1 8 8-10h-6z' },
        { _key: 'sv3', title: 'Local Inventory Ads', description: 'Promote products available in nearby stores to attract local shoppers.', svgPath: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z' },
        { _key: 'sv4', title: 'Smart Shopping Campaigns', description: 'Automated product campaigns designed to maximize conversions using machine learning.', svgPath: 'M9 3v2 M15 3v2 M9 19v2 M15 19v2 M3 9h2 M3 15h2 M19 9h2 M19 15h2 M6 6h12v12H6z M10 10h4v4h-4z' },
        { _key: 'sv5', title: 'Remarketing Shopping Ads', description: 'Re-engage visitors who previously viewed products but did not complete purchases.', svgPath: 'M4 12a8 8 0 0 1 14-5.3 M20 4v4h-4 M20 12a8 8 0 0 1-14 5.3 M4 20v-4h4' },
        { _key: 'sv6', title: 'Product Category Campaigns', description: 'Promote specific product categories to attract targeted shopping traffic.', svgPath: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z' },
      ],
    },

    // 7. PROCESS (unified container on white bg)
    {
      _key: 'sh-process',
      _type: 'cardGridSection',
      eyebrow: 'How we work',
      heading: 'Process Designed to Maximize Product Sales',
      subtext: 'Our ecommerce advertising process focuses on product data optimization, campaign setup, and continuous improvements to increase product visibility and conversions.',
      headerLayout: 'split',
      cardContainerStyle: 'unified',
      background: 'white',
      cards: [
        { _key: 'pc1', title: 'Ecommerce Business Analysis', description: 'Understand product categories, pricing strategy, and ecommerce goals.' },
        { _key: 'pc2', title: 'Product Feed Optimization', description: 'Optimize product titles, descriptions, and attributes for better search visibility.' },
        { _key: 'pc3', title: 'Campaign Setup and Launch', description: 'Create structured shopping campaigns targeting relevant product searches.' },
        { _key: 'pc4', title: 'Continuous Optimization', description: 'Improve bidding strategies, product performance, and campaign targeting.' },
      ],
    },

    // 8. PERFORMANCE NUMBERS (stats split)
    {
      _key: 'sh-stats',
      _type: 'statsSection',
      eyebrow: 'By the numbers',
      heading: 'Performance That Reflects Real Ecommerce Advertising Growth',
      bodyText: 'Our shopping ad campaigns focus on product visibility, smart bidding strategies, and consistent optimization to generate profitable ecommerce sales and growth.',
      layout: 'split',
      stats: [
        { _key: 's1', value: '80+', label: 'Shopping Campaigns Managed' },
        { _key: 's2', value: '500k+', label: 'Product Clicks Generated' },
        { _key: 's3', value: '30% Budget', label: 'Saved Through Smart Optimization' },
        { _key: 's4', value: '10+ Industries', label: 'Ecommerce Businesses Served' },
        { _key: 's5', value: '5+ Years', label: 'Experience in Ecommerce Advertising' },
        { _key: 's6', value: '25% Boost', label: 'In Product-Level Conversions' },
        { _key: 's7', value: '33% Average', label: 'Increase in Click Through Rate' },
        { _key: 's8', value: '6+ countries', label: 'Globally served' },
      ],
    },

    // 9. WHAT YOU GAIN (badge-grid)
    {
      _key: 'sh-gains',
      _type: 'cardGridSection',
      eyebrow: 'What you gain',
      heading: 'What You Gain When High Horse Runs Your Shopping Ads',
      subtext: 'When High Horse manages your shopping campaigns, every product listing is optimized to attract the right buyers, improve visibility, and drive consistent ecommerce sales.',
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      headerLayout: 'split',
      style: 'badge-grid',
      cards: [
        { _key: 'g1', title: 'Smarter Product Visibility', description: 'Your products appear with optimized titles, images, and pricing to stand out in search results and attract more qualified shoppers.' },
        { _key: 'g2', title: 'Higher Purchase Intent Traffic', description: 'We target high-intent search queries, ensuring your ads reach people actively looking to buy, not just browse.' },
        { _key: 'g3', title: 'Better Click Quality', description: 'Through feed optimization and targeting, we reduce irrelevant clicks and focus only on users likely to convert into customers.' },
        { _key: 'g4', title: 'Stronger Conversion Rates', description: 'Optimized product listings and campaign strategies help turn clicks into actual purchases more efficiently.' },
        { _key: 'g5', title: 'Increased Ecommerce Revenue', description: 'Our strategies are focused on driving more product sales while maintaining profitable return on ad spend.' },
        { _key: 'g6', title: 'Clear Performance Tracking', description: 'You get complete visibility into clicks, conversions, and revenue, with data-driven insights to scale your campaigns confidently.' },
      ],
    },
  ]

  console.log(`\nReplacing pageBuilder with ${newPageBuilder.length} sections:`)
  newPageBuilder.forEach((s, i) => console.log(`  ${i + 1}. [${s._type}] ${s._key} — ${(s as any).heading || (s as any).headline || ''}`))

  // Sections removed from original:
  console.log('\nRemoved sections:')
  console.log('  - sh-split2 (textImageSection "Spending Too Much...")')
  console.log('  - sh-split3 (textImageSection "Why Choose High Horse" / data-driven)')
  console.log('  - sh-split4 (textImageSection "What You Gain")')
  console.log('  - sh-process (processStepsSection — replaced by cardGridSection unified)')

  await client
    .patch(PAGE_ID)
    .set({ pageBuilder: newPageBuilder })
    .commit()

  console.log('\n✓ pageBuilder replaced successfully')

  // Verify
  const verify = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      pageBuilder[]{ _key, _type, heading, headline, style, variant }
    }`,
    { id: PAGE_ID },
  )

  console.log('\n✓ Verification:')
  verify.pageBuilder.forEach((s: any, i: number) => {
    const extras = [s.style, s.variant].filter(Boolean).join(', ')
    console.log(`  ${i + 1}. [${s._type}] ${s._key} — ${s.heading || s.headline || ''}${extras ? ` (${extras})` : ''}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
