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

const SLUG = 'marketplace-listing-optimization-for-ecommerce'

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
    console.log(`Marketplace page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  // ── 2. Check for Setmi case study (referenced in Why Us panel) ─
  const existingSetmi = await client.fetch(
    `*[_type == "caseStudy" && clientName == "Setmi"][0]{ _id }`,
  )
  if (existingSetmi) {
    console.log(`Found existing Setmi case study: ${existingSetmi._id}`)
  } else {
    console.log('Setmi case study not found — no case study will be linked')
  }

  // ── 3. Build pageBuilder sections ─────────────────────────────
  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      headline: "If Your Listings Aren't Selling, Something's Broken",
      subheadline: "If your products aren't converting, the issue is optimization. We improve listings, rankings, visibility, and conversions to turn marketplace traffic into consistent sales.",
      ctaText: 'Optimize Your Listings Now',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — Boost Visibility (image right)
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: "Boost Your Online Store's Visibility and Sales with High Horse",
      bodyText: blocks([
        { key: 'b1a', text: "Boosting your online store's visibility isn't just about being present — it's about being found, clicked, and chosen. At High Horse, we optimize your marketplace listings to improve search rankings, increase product visibility, and attract the right audience. From keyword optimization to compelling product content, every element is designed to bring more qualified traffic to your store." },
        { key: 'b1b', text: "But visibility alone doesn't drive growth — conversions do. We refine your listings, images, and overall storefront experience to build trust and encourage action. The result is a marketplace presence that not only gets noticed but consistently drives sales and long-term performance." },
      ]),
      imagePosition: 'right',
    },
    // 3. textImageSection — Why Marketplace Optimization (image left, stacked bullets)
    {
      _type: 'textImageSection',
      _key: 'text02',
      heading: 'Why Marketplace Optimization Is Key to Online Success',
      bodyText: block('b2', 'Without proper optimization, listings get lost in competition. Effective marketplace optimization improves visibility, builds trust, and consistently drives higher clicks, conversions, and sales.'),
      bulletStyle: 'stacked',
      bullets: [
        'Appear in Relevant Searches — By using the right keywords and descriptions, your products become more discoverable.',
        'Attract More Clicks — Clear titles and compelling images entice customers to view your listings.',
        'Increase Conversion Rates — Detailed and accurate product information builds trust, leading to more purchases.',
        'Stay Competitive — Regular updates and monitoring keep your listings ahead of competitors.',
      ],
      imagePosition: 'left',
    },
    // 4. challengeGridSection — Problem List (split layout)
    {
      _type: 'challengeGridSection',
      _key: 'challenge01',
      layout: 'split',
      heading: "You Already Have Listings — Why Aren't They Generating More Sales?",
      subtext: "Just having your products listed isn't enough—if sales aren't growing, your listings aren't working as they should.",
      ctaText: 'Talk to SEO Expert',
      ctaLink: '/contact-search-performance-marketing-agency',
      challenges: [
        'Your listings are not ranking for the right search keywords',
        'Titles and descriptions lack optimization and clarity',
        'Product images fail to build trust or grab attention',
        "Pricing isn't competitive within your category",
        'Low reviews or weak ratings reduce buyer confidence',
        "Content doesn't clearly communicate product value",
        'Listings are not optimized to convert visitors into buyers',
      ],
    },
    // 5. cardGridSection — What We Do (3-col, clean style, 8 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'What We Do to Optimize Your Marketplace Performance',
      subtext: "We don't just improve listings—we build a complete marketplace strategy that increases visibility, attracts the right buyers, and drives consistent sales. Every element is optimized with a clear focus on performance and conversions.",
      style: 'clean',
      columns: 3,
      cards: [
        { _key: 'c1', title: 'Product Listing Optimization', description: 'We optimize titles, descriptions, and backend keywords to improve search visibility, ensuring your products rank higher and reach the right audience.' },
        { _key: 'c2', title: 'Keyword Research & Search Optimization', description: 'We identify high-performing keywords based on search trends and competition, helping your listings appear in relevant searches and attract qualified traffic.' },
        { _key: 'c3', title: 'Product Image & Visual Optimization', description: 'We enhance product images to make them more engaging, informative, and conversion-focused, helping build trust and improve click-through rates.' },
        { _key: 'c4', title: 'Pricing & Competitor Analysis', description: 'We analyze your competitors and pricing strategy to position your products effectively, ensuring you stay competitive without compromising margins.' },
        { _key: 'c5', title: 'Conversion Rate Optimization (CRO)', description: 'We improve product content, layout, and messaging to reduce drop-offs and increase the chances of turning visitors into paying customers.' },
        { _key: 'c6', title: 'Review & Rating Strategy', description: 'We guide strategies to improve product reviews and ratings, helping build credibility and influence purchase decisions.' },
        { _key: 'c7', title: 'Storefront & Brand Optimization', description: 'We optimize your brand storefront with structured layouts and content, creating a consistent and professional shopping experience for customers.' },
        { _key: 'c8', title: 'Performance Tracking & Continuous Improvement', description: 'We monitor listing performance, analyze data, and continuously optimize strategies to ensure long-term growth and consistent marketplace sales.' },
      ],
    },
    // 6. techSliderSection — Platforms (marketplace brand colors kept)
    {
      _type: 'techSliderSection',
      _key: 'slider01',
      heading: 'Platforms Where Our Marketplace Optimization Services Work',
      subtext: 'We optimize listings across leading marketplaces, helping your products rank better, reach targeted audiences, and consistently generate higher conversions and sales.',
      logos: [
        { _key: 'l1', name: 'Amazon', displayText: 'A', bgColor: '#232F3E', textColor: '#FF9900' },
        { _key: 'l2', name: 'Blinkit', displayText: 'B', bgColor: '#F8CB46', textColor: '#1B1B1B' },
        { _key: 'l3', name: 'AJIO', displayText: 'AJIO', bgColor: '#2D2D2D', textColor: '#FFFFFF' },
        { _key: 'l4', name: 'eBay', displayText: 'eBay', bgColor: '#E53238', textColor: '#FFFFFF' },
        { _key: 'l5', name: 'Etsy', displayText: 'Etsy', bgColor: '#F1641E', textColor: '#FFFFFF' },
        { _key: 'l6', name: 'Flipkart', displayText: 'F', bgColor: '#2874F0', textColor: '#FFFFFF' },
        { _key: 'l7', name: 'Meesho', displayText: 'M', bgColor: '#570A57', textColor: '#FFFFFF' },
      ],
    },
    // 7. ctaSection — CTA Strip (tan variant)
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: "Let's Turn Your Listings Into Consistent Revenue Drivers",
      bodyText: block('b3', "Share your product details, and we'll help you optimize listings, improve visibility, increase conversions, and scale your marketplace sales effectively."),
      ctaText: 'Optimize Your Listings',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 8. statsSection — Stats (split layout, 8 stats)
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Optimized for Sales, Backed by Data and Marketplace Insights',
      bodyText: 'When listings are optimized the right way, performance starts improving across every level. Visibility increases, clicks grow, and conversions follow. These results come from keyword-driven optimization, better product presentation, and strategies focused on ranking, trust, and consistent sales growth.',
      layout: 'split',
      stats: [
        { _key: 'st1', value: '1000+', label: 'product listings optimized' },
        { _key: 'st2', value: '4X', label: 'increase in product visibility and impressions' },
        { _key: 'st3', value: '2.5X', label: 'improvement in conversion rates' },
        { _key: 'st4', value: '70%', label: 'increase in click-through rates (CTR)' },
        { _key: 'st5', value: '50+', label: 'brands scaled through marketplace optimization' },
        { _key: 'st6', value: '5+', label: 'years of marketplace experience' },
        { _key: 'st7', value: '60%', label: 'boost in organic ranking positions' },
        { _key: 'st8', value: '3X', label: 'growth in monthly marketplace revenue' },
      ],
    },
    // 9. cardGridSection — Who Needs (4-col, full-tint card backgrounds)
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Who Needs Professional Website Development Services',
      subtext: "Any business aiming to grow online, generate leads, or build credibility needs a professionally developed website that performs consistently. Website development services are essential for different stages of business growth. Whether you're starting fresh, scaling, or need a website redesign, the right website supports performance, usability, and long-term success.",
      columns: 4,
      tintStyle: 'full',
      cards: [
        { _key: 'w1', title: 'Startups launching their digital presence', description: 'Need a strong, credible website to showcase offerings and build trust from day one.', badgeColor: 'mint' },
        { _key: 'w2', title: 'Traditional businesses going digital', description: 'Require structured websites to establish an online presence and reach a wider audience effectively.', badgeColor: 'peach' },
        { _key: 'w3', title: 'Businesses needing a website redesign', description: 'Outdated, slow, or underperforming websites need redevelopment to improve usability, speed, and conversions.', badgeColor: 'lavender' },
        { _key: 'w4', title: 'Enterprises managing large-scale operations', description: 'Need scalable, secure, and high-performance platforms to handle traffic, integrations, and complex workflows.', badgeColor: 'gray' },
      ],
    },
    // 10. processStepsSection — 5 steps, 2-col grid
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'How We Optimize Your Marketplace Listings for Better Performance',
      subtext: 'Our process is focused on improving visibility, increasing conversions, and turning your listings into consistent revenue drivers.',
      columns: 2,
      steps: [
        { _key: 'p1', stepTitle: 'Understand Your Product & Market', stepDescription: 'We analyze your product, target audience, and competition to identify gaps, opportunities, and positioning for better marketplace performance.' },
        { _key: 'p2', stepTitle: 'Keyword & Search Strategy Planning', stepDescription: 'We research high-intent keywords and search trends to ensure your listings rank for relevant queries and attract the right buyers.' },
        { _key: 'p3', stepTitle: 'Listing Content Optimization', stepDescription: 'We optimize titles, descriptions, bullet points, and backend keywords to improve visibility, clarity, and conversion potential.' },
        { _key: 'p4', stepTitle: 'Visual & Conversion Enhancement', stepDescription: 'We refine product images, creatives, and content structure to build trust, improve engagement, and increase click-through and conversion rates.' },
        { _key: 'p5', stepTitle: 'Monitor, Test & Scale', stepDescription: 'We continuously track performance, test improvements, and optimize listings to maintain rankings, improve conversions, and scale marketplace sales.' },
      ],
    },
    // 11. checklistSection — Why Us (split layout with decorative art panel)
    {
      _type: 'checklistSection',
      _key: 'checklist01',
      layout: 'split',
      heading: 'What Makes High Horse the Right Marketplace Optimization Partner',
      subtext: 'Choosing the right marketplace optimization partner directly impacts your visibility, conversions, and overall sales growth. Businesses trust us because we combine data-driven strategies, platform expertise, and performance-focused execution to deliver consistent, scalable marketplace results.',
      items: [
        'Optimization-first approach aligned with your sales and revenue goals',
        'Listings optimized for visibility, ranking, and long-term marketplace growth',
        'Data-driven keyword and content strategies for better performance',
        'On-time execution with strong attention to listing quality and accuracy',
        'Transparent communication with regular performance insights and updates',
        'Strategies designed to increase clicks, conversions, and consistent marketplace sales',
      ],
    },
    // 12. cardGridSection — Categories (3-col, default bordered, 8 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards03',
      heading: 'eCommerce Categories We Scale with Marketplace Optimization',
      subtext: 'We optimize product listings across eCommerce categories, ensuring every product ranks better, attracts the right buyers, and converts consistently.',
      columns: 3,
      cards: [
        { _key: 'cat1', title: 'Fashion & Apparel', description: 'We optimize listings with strong visuals, clear descriptions, and keyword-rich titles to improve discoverability and increase conversions in competitive fashion categories.' },
        { _key: 'cat2', title: 'Beauty & Personal Care', description: 'We enhance product content, images, and positioning to build trust, highlight benefits, and drive higher engagement and repeat purchases.' },
        { _key: 'cat3', title: 'Electronics & Gadgets', description: 'We optimize technical product listings with clear specifications, structured content, and comparison-driven messaging to improve conversions and reduce buyer confusion.' },
        { _key: 'cat4', title: 'Home & Kitchen', description: 'We improve product presentation with lifestyle images, detailed descriptions, and keyword optimization to increase visibility and drive consistent sales.' },
        { _key: 'cat5', title: 'Health & Wellness', description: 'We create trust-focused listings with clear benefits, accurate information, and optimized content to improve credibility and conversions.' },
        { _key: 'cat6', title: 'Baby & Kids Products', description: 'We optimize listings with clear, safety-focused messaging and engaging visuals to build trust and improve purchase decisions for parents.' },
        { _key: 'cat7', title: 'Sports & Fitness', description: 'We enhance product listings with benefit-driven content and visuals to attract active buyers and improve conversion rates.' },
        { _key: 'cat8', title: 'Jewelry & Accessories', description: 'We focus on premium visuals, compelling descriptions, and keyword optimization to improve product appeal and increase high-intent conversions.' },
      ],
    },
  ]

  // ── 4. Create the service page ────────────────────────────────
  const doc = await client.create({
    _type: 'servicePage',
    title: 'Marketplace Optimisation',
    slug: { _type: 'slug', current: SLUG },
    section: 'experience-systems',
    summary: 'Marketplace listing optimization that improves visibility, rankings, and conversions to turn marketplace traffic into consistent sales',
    accentStyle: 'brand',
    pageBuilder,
  })
  console.log(`✓ Created Marketplace Optimisation page: ${doc._id}`)

  // ── 5. Create 4 FAQ documents ─────────────────────────────────
  const faqData = [
    {
      question: 'Why are my marketplace listings not generating sales?',
      answer: 'TODO: content team to write answer.',
    },
    {
      question: 'How long does it take to see results from listing optimization?',
      answer: 'TODO: content team to write answer.',
    },
    {
      question: 'What are backend keywords in marketplace listings?',
      answer: 'TODO: content team to write answer.',
    },
    {
      question: 'How do I know if my listings need optimization?',
      answer: 'TODO: content team to write answer.',
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
      category: 'general',
      relatedPages: [{ _type: 'reference', _ref: doc._id, _key: doc._id.replace('drafts.', '') }],
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqData[i].question}"`)
  }

  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to Marketplace page`)

  // ── 6. Verify ─────────────────────────────────────────────────
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      "sections": count(pageBuilder),
      "faqs": count(relatedFaqs),
    }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: ${verify.sections} sections, ${verify.faqs} FAQs`)
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
