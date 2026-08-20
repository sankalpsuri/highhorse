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

const SLUG = 'display-and-visual-advertising-campaign-management'

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
    console.log(`Visual Ads page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      headline: 'Transform Your Visual Ads Into A Recognizable Brand Identity',
      subheadline: 'At High Horse, we help brands run strategic visual advertising campaigns that increase brand visibility, capture audience attention, and turn impressions into meaningful engagement and conversions.',
      ctaText: 'Book a Strategy Call',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — image right
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Seen by Many, Chosen by None? Let\'s Fix Your Ads.',
      bodyText: block('b1', '[TO BE VALIDATED] TODO: content team to write the two intro paragraphs (visual ads as a brand-recognition tool; why high-performing visual campaigns need more than attractive design — targeting, creative strategy, continuous testing)'),
      bullets: [
        'Showcase your brand creatively across high-visibility platforms',
        'Reach targeted audiences with visually engaging ads',
        'Increase brand awareness and engagement',
        'Optimize campaigns for better return on ad spend',
      ],
      imagePosition: 'right',
    },
    // 3. textImageSection — no image
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'Grab Attention Where Your Audience Is Already Scrolling',
      bodyText: block('b2', '[TO BE VALIDATED] TODO: content team to write intro paragraph'),
      bullets: [
        'Be Seen Instantly – Show your brand across high-traffic platforms with eye-catching visuals.',
        'Reach the Right People – Target users based on interests, behavior, and demographics.',
        'High Purchase Intent – Reach users actively searching for products like yours.',
        'Stay in Their Mind Longer – Creative visuals help people remember your brand.',
        'Turn Views Into Actions – Engaging creatives encourage clicks and conversions.',
        'Track What\'s Working – Measure impressions, clicks, engagement, and results clearly.',
      ],
    },
    // 4. textImageSection — image left, stacked bullets
    {
      _type: 'textImageSection',
      _key: 'text03',
      heading: 'High Horse Delivers Data-Driven Visual Advertising Designed for Growth',
      bodyText: block('b3', '[TO BE VALIDATED] TODO: confirm full text — source line ends mid-sentence: \'Our visual ad campaigns combine creative excellence, audience targeting, and performance optimization...\''),
      bulletStyle: 'stacked',
      bullets: [
        'Creative Strategy & Design — Develop visually compelling ad creatives aligned with your brand identity.',
        'Audience Targeting — Reach the right users based on behavior, interests, and demographics.',
        'Platform-Specific Optimization — Customize creatives and campaigns for each advertising platform.',
        'Continuous Creative Testing — Test multiple creatives to identify top-performing visuals.',
        'Transparent Performance Reporting — Track engagement, conversions, and campaign efficiency clearly.',
        'Dedicated Advertising Specialists — Experienced experts managing campaigns focused on visual performance.',
      ],
      imagePosition: 'left',
    },
    // 5. ctaSection — tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Ready to Make Your Brand Impossible to Ignore?',
      bodyText: block('b4', 'Visual advertising works best when creativity, targeting, and strategy come together. If you\'re looking to stand out, attract attention, and drive engagement, this is where it starts.'),
      ctaText: 'Talk to Expert Team',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 6. cardGridSection — cream
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Choose the Right Visual Ad Format for Your Brand',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      background: 'cream',
      cards: [
        { _key: 'c1', title: 'Display Ads', description: 'Banner ads placed across relevant websites and apps to increase brand visibility, reach new audiences, and consistently reinforce your presence online.' },
        { _key: 'c2', title: 'Meta Ads', description: 'Image and video ads designed for platforms like Instagram and Facebook to engage audiences, build interest, and drive targeted traffic effectively.' },
        { _key: 'c3', title: 'LinkedIn Ads', description: 'Target decision-makers and professionals with precise B2B campaigns, generating high-quality leads, building authority, and driving meaningful business conversations and conversions.' },
        { _key: 'c4', title: 'YouTube Ads', description: 'Engage audiences through impactful video ads, increasing brand awareness, capturing attention early, and driving high-intent traffic with compelling visual storytelling strategies.' },
        { _key: 'c5', title: 'Video Ads', description: 'Engaging video campaigns that capture attention quickly, communicate your brand story clearly, and drive higher engagement and conversions across digital platforms.' },
        { _key: 'c6', title: 'Carousel Ads', description: 'Interactive ads that showcase multiple products, services, or features in a single format, encouraging users to explore and engage with your offerings.' },
        { _key: 'c7', title: 'Remarketing Ads', description: 'Reconnect with users who previously interacted with your brand, reminding them of your services and guiding them back to complete desired actions.' },
        { _key: 'c8', title: 'Responsive Display Ads', description: 'Automatically optimised ads that adjust visuals, formats, and messaging to fit different placements, ensuring better performance and wider reach across platforms.' },
      ],
    },
    // 7. processStepsSection
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'How We Turn Your Campaigns Into Performance Machines',
      subtext: '[TO BE VALIDATED] TODO: content team to write subtext',
      steps: [
        { _key: 'p1', stepTitle: 'Understand Your Brand & Audience', stepDescription: 'We analyze your business, audience behavior, and goals.' },
        { _key: 'p2', stepTitle: 'Create High-Impact Visuals', stepDescription: 'Design creatives that align with your message and stand out.' },
        { _key: 'p3', stepTitle: 'Launch Targeted Campaigns', stepDescription: 'Run structured campaigns aimed at the right audience segments.' },
        { _key: 'p4', stepTitle: 'Optimize for Better Results', stepDescription: 'Continuously improve creatives, targeting, and performance.' },
      ],
    },
    // 8. statsSection — scattered
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Numbers That Show What\'s Possible When It\'s Done Right',
      bodyText: '[TO BE VALIDATED] TODO: content team to write intro paragraph',
      layout: 'scattered',
      stats: [
        { _key: 'st1', value: '100+', label: 'Visual Campaigns Managed' },
        { _key: 'st2', value: '50K+', label: 'Clicks Driven Through Visual Ads' },
        { _key: 'st3', value: '3X', label: 'In Social Media Engagement' },
        { _key: 'st4', value: '30%', label: 'Cost Per Conversion' },
        { _key: 'st5', value: '5X', label: 'Creative Testing Cycles' },
        { _key: 'st6', value: '90%', label: 'Optimized Within First 30 Days' },
        { _key: 'st7', value: '6+', label: 'Globally Served' },
        { _key: 'st8', value: '360°', label: 'Marketing Solutions' },
      ],
    },
    // 9. portfolioMasonryGrid — 6 empty placeholders
    {
      _type: 'portfolioMasonryGrid',
      _key: 'masonry01',
      heading: 'See What High-Performing Campaigns Actually Look Like',
      subtext: 'Explore real examples of high-performing campaigns that drive engagement, capture attention, and deliver measurable results across digital platforms and audiences.',
      items: [
        { _key: 'mi1', mediaType: 'image' },
        { _key: 'mi2', mediaType: 'image' },
        { _key: 'mi3', mediaType: 'image' },
        { _key: 'mi4', mediaType: 'image' },
        { _key: 'mi5', mediaType: 'image' },
        { _key: 'mi6', mediaType: 'image' },
      ],
    },
    // 10. textImageSection — image right (Setmi spotlight reuse)
    {
      _type: 'textImageSection',
      _key: 'text04',
      heading: 'What Changes When You Let Us Handle Your Visual Ads',
      bodyText: block('b5', 'When we manage your campaigns, every creative is built to capture attention and drive real outcomes.'),
      bullets: [
        'Get Noticed Faster – Your brand stands out with strong, high-quality visuals.',
        'Attract the Right Audience – Your ads reach people who are more likely to engage.',
        'Reduce Wasted Spend – Better targeting means fewer irrelevant impressions.',
        'Turn Engagement Into Results – Strong creatives help convert interest into action.',
        'Grow Your Brand Consistently – Campaigns focused on long-term visibility and performance.',
        'Know Exactly What\'s Working – Clear data helps you scale confidently.',
      ],
      imagePosition: 'right',
    },
  ]

  const doc = await client.create({
    _type: 'servicePage',
    title: 'Visual Ads',
    slug: { _type: 'slug', current: SLUG },
    section: 'performance-marketing',
    summary: 'Visual advertising campaigns that turn impressions into engagement and conversions',
    accentStyle: 'brand',
    pageBuilder,
  })
  console.log(`✓ Created Visual Ads page: ${doc._id}`)

  // Create 4 FAQ documents
  const faqQuestions = [
    'Will visual ads actually help me get more customers?',
    'Where will my ads appear?',
    'Why do creatives matter so much?',
    'Is this right for my business?',
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
  console.log(`✓ Linked ${faqIds.length} FAQs to Visual Ads page`)

  // Verify
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ title, relatedCaseStudies, "masonryItems": pageBuilder[_type == "portfolioMasonryGrid"][0].items }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: relatedCaseStudies = ${verify.relatedCaseStudies ? verify.relatedCaseStudies.length : 'null'} (expected null)`)
  console.log(`✓ Masonry items: ${verify.masonryItems?.length || 0} placeholder slots`)

  // Cross-check: Shopping Ads section 9 image reference for Setmi reuse
  const shoppingPage = await client.fetch(
    `*[_type == "servicePage" && slug.current == "google-shopping-ads-management-for-ecommerce"][0]{
      "lastTextImage": pageBuilder[_type == "textImageSection"][-1]{ heading, image }
    }`,
  )
  const visualLastTextImage = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      "lastTextImage": pageBuilder[_type == "textImageSection"][-1]{ heading, image }
    }`,
    { slug: SLUG },
  )
  console.log(`\nSetmi image reuse check:`)
  console.log(`  Shopping Ads last textImage: "${shoppingPage?.lastTextImage?.heading}" — image: ${shoppingPage?.lastTextImage?.image ? 'set' : 'placeholder'}`)
  console.log(`  Visual Ads last textImage: "${visualLastTextImage?.lastTextImage?.heading}" — image: ${visualLastTextImage?.lastTextImage?.image ? 'set' : 'placeholder'}`)
  console.log(`  Both are placeholders — same asset will be uploaded once to both via Studio`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
