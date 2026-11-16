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

const PAGE_ID = 'sZarkGCWKodXiPseaVDPF2'

function block(key: string, text: string) {
  return {
    _key: key,
    _type: 'block',
    markDefs: [],
    style: 'normal',
    children: [{ _key: `${key}c`, _type: 'span', marks: [], text }],
  }
}

async function main() {
  const page = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      _id, _rev, title,
      pageBuilder[]{ _key, _type, heading, heroImage, image,
        cards[]{ _key, clientName, resultChartImage, results, badgeColor }
      }
    }`,
    { id: PAGE_ID },
  )

  if (!page) {
    console.error('PPC Ads page not found')
    process.exit(1)
  }

  console.log(`Found page: ${page._id} — "${page.title}"`)

  const heroImage = page.pageBuilder?.find((b: any) => b._type === 'heroSection')?.heroImage
  const split1Image = page.pageBuilder?.find((b: any) => b._key === 'pp-split1')?.image
  const resultsSection = page.pageBuilder?.find((b: any) => b._key === 'pp-results')
  const resultCards = resultsSection?.cards || []

  console.log('Hero image ref:', heroImage?.asset?._ref ? 'found' : 'missing')
  console.log('Split1 image ref:', split1Image?.asset?._ref ? 'found' : 'missing')
  console.log('Result chart cards:', resultCards.length)

  const newPageBuilder = [
    // 1. HERO
    {
      _key: 'pp-hero',
      _type: 'heroSection',
      eyebrowText: 'PPC Services',
      eyebrowDotColor: 'orange',
      heroBackground: 'white',
      headline: 'Own the Top Spot for High-Intent Keywords',
      headlineHighlights: ['High-Intent Keywords'],
      subheadline: 'Reach customers when they search with high-performance PPC campaigns. Our Google Ads management captures top keyword positions, driving qualified traffic, leads, and measurable business growth.',
      ctaText: 'Launch Ads Now',
      ctaLink: '/contact-search-performance-marketing-agency',
      textAlign: 'left',
      mobileImageSquare: true,
      ...(heroImage ? { heroImage } : {}),
    },

    // 2. SPEND LESS GET MORE
    {
      _key: 'pp-split1',
      _type: 'textImageSection',
      eyebrow: 'Smarter spend',
      heading: 'Looking for a Team That Helps You Spend Less and Get More From Your Ads?',
      bodyText: [
        block('b1', 'PPC advertising can generate leads instantly—but only when done right. Many businesses invest in ads but fail to see results due to poor strategy and lack of optimization.'),
        block('b2', 'Our PPC management services are designed to connect your business with people already searching for solutions. Through advanced keyword targeting, smart bidding, and continuous optimization, we ensure your ads appear where they matter most.'),
        block('b3', 'Whether you want more leads, higher sales, or consistent traffic, our paid ads strategies are built to scale performance and maximize ROI.'),
      ],
      bullets: [
        'Google Partner with great Experience',
        '3X faster lead generation compared to organic channels',
        'High-intent traffic from users actively searching solutions',
        'Visibility at the top of Google search results',
      ],
      imagePosition: 'right',
      ...(split1Image ? { image: split1Image } : {}),
    },

    // 3. WHY NOT GETTING LEADS (problem-grid)
    {
      _key: 'pp-problems',
      _type: 'cardGridSection',
      eyebrow: 'The problem',
      heading: 'Spending Too Much on Ads But Still Not Getting Leads? Here’s Why',
      subtext: 'If your ad budget is increasing but leads aren’t, it’s usually a sign that your campaigns aren’t optimized for performance. More spend doesn’t always mean better results—strategy is what makes the difference.',
      style: 'problem-grid',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
      cards: [
        { _key: 'pr1', title: 'You’re targeting the wrong keywords that bring clicks, not customers' },
        { _key: 'pr2', title: 'Your ad copy isn’t strong enough to drive action' },
        { _key: 'pr3', title: 'Your landing page isn’t converting visitors into leads' },
        { _key: 'pr4', title: 'Your budget is being wasted on irrelevant searches' },
        { _key: 'pr5', title: 'There’s no continuous optimization or performance tracking' },
      ],
    },

    // 4. WHY CHOOSE HIGH HORSE (dark numbered)
    {
      _key: 'pp-whyus',
      _type: 'cardGridSection',
      eyebrow: 'Why choose us',
      heading: 'High Horse is the PPC Partner Businesses Trust for Growth',
      subtext: 'We don’t just run ads—we build performance-driven PPC systems that consistently generate results.',
      headerLayout: 'split',
      style: 'dark',
      darkCardStyle: 'numbered',
      showGlow: false,
      cards: [
        { _key: 'wu1', title: 'Strategy Backed by Data', description: 'Every campaign is built using keyword research, audience insights, and competitor analysis' },
        { _key: 'wu2', title: 'Experienced PPC Specialists', description: 'Certified experts managing campaigns with advanced bidding strategies' },
        { _key: 'wu3', title: 'Full Transparency', description: 'Clear reporting on leads, clicks, cost efficiency, and ROI' },
        { _key: 'wu4', title: 'Focused on Conversions', description: 'Campaigns designed to generate real business outcomes' },
        { _key: 'wu5', title: 'Daily Optimization', description: 'Continuous improvements to maximize performance' },
        { _key: 'wu6', title: 'Dedicated Support', description: 'Regular updates, insights, and expert guidance' },
      ],
    },

    // 5. CTA BAND (blue)
    {
      _key: 'pp-cta',
      _type: 'ctaSection',
      heading: 'Maximize Your ROI with Smart PPC Advertising',
      bodyText: [
        block('cta1', 'Put your business in front of ready-to-buy customers through optimized and high-converting PPC campaigns.'),
      ],
      ctaText: 'Launch Ads Now',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'blue',
    },

    // 6. PPC SERVICES (icon-grid gray bg)
    {
      _key: 'pp-services',
      _type: 'cardGridSection',
      eyebrow: 'What we do',
      heading: 'Complete PPC Services That Fix Everything',
      subtext: 'Our PPC management services cover every aspect required to drive results.',
      headerLayout: 'split',
      style: 'icon-grid',
      cards: [
        { _key: 'sv1', title: 'Search Ads', description: 'Reach people actively searching for your products or services on Google and Bing, helping you generate high-quality leads and quick results.', svgPath: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z M20 20l-4.8-4.8' },
        { _key: 'sv2', title: 'Display Ads', description: 'Show visually engaging ads across websites and apps to build awareness, attract attention, and keep your brand visible to potential customers.', svgPath: 'M3 4h18v12H3z M8 20h8 M12 16v4 M7 8h5v4H7z M15 8h2 M15 11h2' },
        { _key: 'sv3', title: 'Remarketing Ads', description: 'Reconnect with people who visited your website but didn’t take action, reminding them about your business and increasing chances of conversion.', svgPath: 'M4 12a8 8 0 0 1 14-5.3 M20 4v4h-4 M20 12a8 8 0 0 1-14 5.3 M4 20v-4h4' },
        { _key: 'sv4', title: 'Shopping Ads', description: 'Promote your products directly in search results with images and pricing, helping customers compare easily and make faster purchase decisions.', svgPath: 'M5 7h14l-1.2 12.5H6.2z M9 7V5.5a3 3 0 0 1 6 0V7' },
        { _key: 'sv5', title: 'Social Ads', description: 'Reach targeted audiences on platforms like Facebook, Instagram, and LinkedIn to generate leads, drive traffic, and increase brand visibility.', svgPath: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5 M16 4.3a3.5 3.5 0 0 1 0 6.4 M18.5 14.8c1.6.9 2.7 2.6 3 5.2' },
        { _key: 'sv6', title: 'Lead Ads', description: 'Capture customer inquiries through forms and calls, making it easy for users to connect with your business and take immediate action.', svgPath: 'M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h3' },
        { _key: 'sv7', title: 'Performance Ads', description: 'Run automated campaigns across multiple platforms to maximize reach, improve efficiency, and drive better results using data-driven optimization.', svgPath: 'M13 3L5 13h6l-1 8 8-10h-6z' },
      ],
    },

    // 7. PPC STRATEGY (icon-grid white bg)
    {
      _key: 'pp-strategy',
      _type: 'cardGridSection',
      eyebrow: 'Our strategy',
      heading: 'How our PPC Ads Strategy Turn Searches Into Real Customers',
      subtext: 'Pay-per-click advertising works because it targets demand that already exists. It helps your business appear exactly when potential customers are ready to take action.',
      headerLayout: 'split',
      style: 'icon-grid',
      background: 'white',
      cards: [
        { _key: 'st1', title: 'Appear for High-Intent Searches', description: 'Show your ads exactly when users are actively searching for your products or services, capturing demand at the perfect moment.', svgPath: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
        { _key: 'st2', title: 'Get Instant Top Visibility', description: 'Reach top positions on search engines quickly, outranking competitors and gaining immediate exposure to potential customers ready to engage.', svgPath: 'M12 20V5 M6 11l6-6 6 6 M5 3h14' },
        { _key: 'st3', title: 'Spend Smarter, Drive Conversions', description: 'Pay only for relevant clicks while targeting users with strong intent, ensuring your budget is used efficiently for better results.', svgPath: 'M3 7h18v12H3z M3 11h18 M16 15h2 M6 7V5h12v2' },
        { _key: 'st4', title: 'Track, Optimize, and Scale', description: 'Monitor every click, lead, and conversion with precision, allowing continuous optimization and scalable growth as your campaigns perform better.', svgPath: 'M4 18l5-5 4 4 7-8 M15 9h5v5' },
      ],
    },

    // 8. PPC NUMBERS (stats split)
    {
      _key: 'pp-stats',
      _type: 'statsSection',
      eyebrow: 'By the numbers',
      heading: 'Honest Numbers. Proven PPC Performance',
      bodyText: 'We believe complete transparency builds trust and long-term partnerships. Instead of just making promises, we show real PPC performance data, campaign growth metrics, and measurable results that reflect how our strategies consistently generate leads, reduce costs, and improve return on ad spend.',
      layout: 'split',
      stats: [
        { _key: 'n1', value: '300+', label: 'PPC Campaigns Managed' },
        { _key: 'n2', value: '2.8X', label: 'Average ROAS Achieved' },
        { _key: 'n3', value: '38%', label: 'Increase in Qualified Leads' },
        { _key: 'n4', value: '1.9M+', label: 'Clicks Generated' },
        { _key: 'n5', value: '24%', label: 'Lower Cost Per Lead' },
        { _key: 'n6', value: '70%', label: 'Campaigns Improved ROI in 90 Days' },
        { _key: 'n7', value: '95%', label: 'Client Retention Rate' },
        { _key: 'n8', value: '6+', label: 'Countries Served' },
      ],
    },

    // 9. CASE STUDY
    {
      _key: 'pp-results',
      _type: 'caseStudyCardsSection',
      eyebrow: 'Case study',
      heading: 'Real Campaign Data. Real Growth. No Guesswork',
      cards: resultCards.map((card: any) => ({
        _key: card._key,
        clientName: card.clientName,
        badgeColor: card.badgeColor,
        ...(card.resultChartImage ? { resultChartImage: card.resultChartImage } : {}),
        results: card.results,
      })),
    },

    // 10. PROCESS (unified container, gray bg)
    {
      _key: 'pp-process',
      _type: 'cardGridSection',
      eyebrow: 'How we work',
      heading: 'A Proven PPC Process Built for Consistent Results',
      subtext: 'Our structured approach ensures every campaign performs at its best.',
      headerLayout: 'split',
      cardContainerStyle: 'unified',
      cards: [
        { _key: 'pc1', tag: 'Step 1', title: 'Understanding Your Business', description: 'Deep analysis of your audience and competitors' },
        { _key: 'pc2', tag: 'Step 2', title: 'Keyword & Strategy Planning', description: 'Build campaigns around high-intent searches' },
        { _key: 'pc3', tag: 'Step 3', title: 'Campaign Launch', description: 'Deploy ads with precision targeting and budgets' },
        { _key: 'pc4', tag: 'Step 4', title: 'Continuous Optimization', description: 'Improve results through ongoing testing and refinement' },
      ],
    },

    // 11. CLOSING (text split, white bg, blue CTA)
    {
      _key: 'pp-closing',
      _type: 'textImageSection',
      eyebrow: 'Predictable revenue',
      heading: 'Let’s Turn Your Ad Spend Into Predictable Revenue',
      bodyText: [
        block('cl1', 'The difference between average and high-performing PPC campaigns comes down to strategy, execution, and optimization.'),
        block('cl2', 'We help you capture high-intent searches, improve ad performance, and generate consistent leads that grow your business. If you’re ready to scale with a results-driven PPC agency, we’re ready to make it happen.'),
      ],
      ctaText: 'Launch Ads Now',
      ctaLink: '/contact-search-performance-marketing-agency',
      ctaStyle: 'blue',
      background: 'white',
    },
  ]

  console.log(`\nReplacing pageBuilder with ${newPageBuilder.length} sections:`)
  newPageBuilder.forEach((s, i) => console.log(`  ${i + 1}. [${s._type}] ${s._key} — ${(s as any).heading || (s as any).headline || ''}`))

  console.log('\nRemoved sections:')
  console.log('  - pp-split2 (textImageSection "Spending Too Much...")')
  console.log('  - pp-challenges (cardGridSection with tintStyle full)')
  console.log('  - pp-split3 (textImageSection "Why Choose...")')
  console.log('  - Old pp-process (processStepsSection → replaced by cardGridSection unified)')

  console.log('\nChanged values:')
  console.log('  - Stats: "120+" → "300+" for PPC Campaigns Managed')
  console.log('  - Hero ctaText: changed to "Launch Ads Now"')
  console.log('  - CTA variant: changed to "blue"')

  await client
    .patch(PAGE_ID)
    .set({ pageBuilder: newPageBuilder })
    .commit()

  console.log('\n✓ pageBuilder replaced successfully')

  const verify = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      pageBuilder[]{ _key, _type, heading, headline, style, variant, cardContainerStyle }
    }`,
    { id: PAGE_ID },
  )

  console.log('\n✓ Verification:')
  verify.pageBuilder.forEach((s: any, i: number) => {
    const extras = [s.style, s.variant, s.cardContainerStyle].filter(Boolean).join(', ')
    console.log(`  ${i + 1}. [${s._type}] ${s._key} — ${s.heading || s.headline || ''}${extras ? ` (${extras})` : ''}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
