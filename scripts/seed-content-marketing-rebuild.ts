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

const PAGE_ID = 'servicePage-content-marketing'

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function block(text: string) {
  return [
    {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key(), text, marks: [] }],
    },
  ]
}

function blocks(texts: string[]) {
  return texts.map((t) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: t, marks: [] }],
  }))
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{ _id }`,
    { id: PAGE_ID },
  )
  if (!doc) {
    console.error('Content Marketing page not found')
    process.exit(1)
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 1 — heroSection
  // ═══════════════════════════════════════════════════════════════
  const s1_hero = {
    _type: 'heroSection',
    _key: key(),
    badgeText: 'Certified Google Partner',
    badgeStyle: 'partner',
    headline: 'Looking For An Expert Content Marketing Agency?',
    subheadline: 'High Horse creates strategic content that attracts your audience, improves search visibility, builds brand trust, and turns website visitors into consistent business leads.',
    ctaText: 'Book a Strategy Call',
    ctaLink: '/contact-search-performance-marketing-agency',
    heroImage: {},
    textAlign: 'left',
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 2 — textImageSection (image right)
  // ═══════════════════════════════════════════════════════════════
  const s2_workWith = {
    _type: 'textImageSection',
    _key: key(),
    heading: 'Work With a Content Marketing Agency That Understands your Business',
    bodyText: blocks([
      'Content marketing is no longer about simply publishing blogs. It is about creating the right information for every stage of the customer journey. People search for answers, compare options, and research solutions before making decisions. Strategic content helps your business appear during those moments.',
      'By combining search data, audience insights, and structured content strategies, we help brands attract visitors, educate potential customers, and convert them into leads. Whether you run a service company, ecommerce brand, or enterprise website, strong content marketing helps you build authority, visibility, and long-term organic growth.',
    ]),
    bullets: [
      'We create content that attracts the right customers.',
      'Your website content starts ranking on Google.',
      'Turn visitors into leads with strategic content.',
      'Build trust with consistent valuable content.',
    ],
    imagePosition: 'right',
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 3 — textImageSection (no image, checklist right column)
  // ═══════════════════════════════════════════════════════════════
  const s3_lookingFor = {
    _type: 'textImageSection',
    _key: key(),
    heading: 'Looking for Content Marketing Services?',
    bodyText: blocks([
      'Most businesses don\'t start looking for a content marketing agency unless their current content is not producing results. Many brands publish content regularly but still struggle with traffic, engagement, and conversions.',
      'You may be experiencing challenges like:',
    ]),
    ctaText: 'Talk to SEO Expert',
    ctaLink: '/contact-search-performance-marketing-agency',
    bullets: [
      'Your website content does not rank on Google',
      'Blog posts get published but attract very little traffic',
      'Your competitors dominate search results for important topics',
      'Visitors read your content but don\'t convert into leads',
      'Your content lacks a clear strategy or direction',
      'Your brand message feels inconsistent across platforms',
      'Your content is not optimized for SEO or search intent',
      'Your team spends time creating content without measurable results',
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 4 — cardGridSection (4 challenge cards)
  // ═══════════════════════════════════════════════════════════════
  const s4_challenges = {
    _type: 'cardGridSection',
    _key: key(),
    heading: 'Challenges Behind Ineffective Content Marketing',
    subtext: 'When content marketing fails, it is usually because of missing strategy, poor planning, or weak optimization.',
    columns: 4,
    cards: [
      {
        _key: key(),
        _type: 'object',
        title: 'No Clear Content Strategy',
        description: 'Content is created randomly without aligning with audience needs or business goals.',
      },
      {
        _key: key(),
        _type: 'object',
        title: 'Poor Keyword & Topic Research',
        description: 'Without understanding what people search for, content struggles to attract organic traffic.',
      },
      {
        _key: key(),
        _type: 'object',
        title: 'Lack of Consistent Publishing',
        description: 'Irregular content production makes it difficult to build authority or maintain audience engagement.',
      },
      {
        _key: key(),
        _type: 'object',
        title: 'Content Without Distribution',
        description: '[TO BE VALIDATED] TODO: content team to write real description — source copy is a truncated duplicate of the SEO page\'s "Outdated SEO Strategy" card, not real content-marketing-specific copy.',
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 5 — textImageSection (image LEFT, reversed layout)
  // ═══════════════════════════════════════════════════════════════
  const s5_moreThanWriting = {
    _type: 'textImageSection',
    _key: key(),
    heading: 'More Than Writing, We Create Content That People Actually Engage With',
    bodyText: blocks([
      'Anyone can write content, but not everyone can create content that captures attention and keeps people interested. At High Horse, we focus on creating content experiences that connect with your audience, not just fill pages on your website.',
      'Our team combines strategic writing, creative visuals, SEO insights, and audience research to produce content that is easy to understand, engaging to read, and designed to guide visitors toward action. From website pages and blogs to marketing campaigns and visual storytelling, we ensure every piece of content supports your brand message and business goals. Because effective content doesn\'t just inform – it attracts the right audience, builds trust, and helps turn interest into real business opportunities.',
    ]),
    imagePosition: 'left',
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 6 — imageGallerySection (single proof image)
  // ═══════════════════════════════════════════════════════════════
  const s6_proof = {
    _type: 'imageGallerySection',
    _key: key(),
    heading: 'We Back Every Strategy With Real Results',
    bodyText: 'See real SEO results from High Horse through improved Google rankings, organic traffic growth, higher keyword visibility, and measurable business lead generation.',
    images: [
      {
        _key: key(),
        _type: 'object',
        caption: 'Search Result Rankings Proof Portfolio',
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 7 — caseStudyCardsSection (4 cards, image-on-top)
  // ═══════════════════════════════════════════════════════════════
  const s7_demandRevenue = {
    _type: 'caseStudyCardsSection',
    _key: key(),
    heading: 'How Our Strategies Turned Search Demand Into Revenue',
    subtext: 'SEO strategies convert search demand into measurable revenue by attracting high-intent traffic, improving conversions, and delivering consistent business growth.',
    cards: [
      {
        _key: key(),
        _type: 'object',
        clientName: 'Bawa',
        results: [
          'Organic traffic tripled within 12 months for Bawa',
          'Significant lift in qualified visitors',
          'Sustained month-on-month traffic growth',
        ],
      },
      {
        _key: key(),
        _type: 'object',
        clientName: 'Terra',
        results: [
          '100% growth in search impressions within 3 months for Terra',
          'Multiple high-intent keywords reached Google\'s first page',
          'Consistent rise in organic clicks and enquiries',
        ],
      },
      {
        _key: key(),
        _type: 'object',
        clientName: 'Fech Moving & Cleaning',
        results: [
          'For Fech Moving & Cleaning we drove 351 conversions from 2.98K high-intent clicks',
          'Achieved strong reach with 39.1K impressions consistently',
          'Maintained efficient cost per conversion at $59.70',
        ],
      },
      {
        _key: key(),
        _type: 'object',
        clientName: 'Hioki',
        results: [
          'For Hioki we generated 831 conversions from 18.9K high-intent clicks',
          'Maintained low average CPC at ₹40.22 across campaigns',
          'Achieved efficient cost per conversion at ₹818',
        ],
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 8 — cardGridSection (11 service cards)
  // ═══════════════════════════════════════════════════════════════
  const s8_services = {
    _type: 'cardGridSection',
    _key: key(),
    heading: 'Content Marketing Services Designed to Drive Traffic',
    style: 'clean',
    columns: 3,
    cards: [
      {
        _key: key(), _type: 'object',
        title: 'SEO Content Writing',
        description: 'Create search-optimized articles and landing pages that rank higher on Google and attract qualified traffic.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Blog & Article Development',
        description: 'Informative and valuable blog content designed to educate audiences and strengthen brand authority.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Website Content Creation',
        description: 'Conversion-focused website copy that clearly communicates your value and improves user experience.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Visual & Interactive Content',
        description: 'Infographics and creative assets that simplify complex ideas and increase engagement.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Social Media Content',
        description: 'Strategic content designed to build brand presence and engage audiences across social platforms.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Email & Newsletter Content',
        description: 'Content designed to nurture leads, strengthen relationships, and keep audiences connected with your brand.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Video Content Marketing',
        description: 'Story-driven video content that improves engagement and helps communicate ideas effectively.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Ecommerce Content',
        description: 'Optimized product descriptions and category content designed to improve search visibility and increase sales.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Landing Page Content',
        description: 'Conversion-focused content designed to capture attention and turn visitors into leads.',
      },
      {
        _key: key(), _type: 'object',
        title: 'AEO / GEO Content',
        description: 'Structured content optimized to appear in AI answers, featured snippets, and generative search platforms.',
      },
      {
        _key: key(), _type: 'object',
        title: 'Content Optimization',
        description: 'Improving existing content to enhance readability, SEO performance, and engagement.',
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 9 — ctaSection (variant: tan)
  // ═══════════════════════════════════════════════════════════════
  const s9_cta = {
    _type: 'ctaSection',
    _key: key(),
    heading: 'Let\'s Build Content That Brings the Right Customers to Your Business',
    bodyText: block('If your website content isn\'t attracting visitors or generating leads, it may be time for a smarter content strategy. Our team analyzes your current content, identifies opportunities, and builds a structured plan that helps your brand attract and engage the right audience.'),
    ctaText: 'Get a Free Content Audit',
    ctaLink: '/contact-search-performance-marketing-agency',
    variant: 'tan',
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 10 — processStepsSection (6 real steps)
  // ═══════════════════════════════════════════════════════════════
  const s10_process = {
    _type: 'processStepsSection',
    _key: key(),
    heading: 'Our Process for Delivering Effective Content Marketing',
    subtext: 'Our proven SEO process combines research, strategy, optimization, and continuous tracking to improve rankings, drive traffic, and maximize long-term growth.',
    columns: 2,
    steps: [
      {
        _key: key(), _type: 'object',
        stepTitle: 'Content Audit & Market Research',
        stepDescription: 'We analyze your website, competitors, and search trends to identify opportunities for impactful content.',
      },
      {
        _key: key(), _type: 'object',
        stepTitle: 'Keyword & Topic Strategy',
        stepDescription: 'Our team identifies high-value keywords and topics that align with customer intent.',
      },
      {
        _key: key(), _type: 'object',
        stepTitle: 'Content Creation',
        stepDescription: 'We produce high-quality, SEO-optimized content designed to attract readers and build trust.',
      },
      {
        _key: key(), _type: 'object',
        stepTitle: 'Content Distribution',
        stepDescription: 'Content is promoted through relevant channels including search engines, social platforms, and newsletters.',
      },
      {
        _key: key(), _type: 'object',
        stepTitle: 'Performance Tracking',
        stepDescription: 'We track traffic, engagement, and conversions to measure the effectiveness of your content.',
      },
      {
        _key: key(), _type: 'object',
        stepTitle: 'Continuous Optimization',
        stepDescription: 'Strategies are refined based on data insights to continuously improve results.',
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 11 — statsSection (7 stats)
  // ═══════════════════════════════════════════════════════════════
  const s11_stats = {
    _type: 'statsSection',
    _key: key(),
    heading: 'Why Businesses Choose High Horse for Content Marketing',
    bodyText: 'Businesses choose High Horse because we focus on strategy, clarity, and measurable impact rather than just producing content.',
    layout: 'split',
    stats: [
      { _key: key(), value: '500+', label: 'SEO & Marketing Pages Created' },
      { _key: key(), value: '15+', label: 'Industries Served With Content Marketing' },
      { _key: key(), value: '300+', label: 'Blogs & Articles Published' },
      { _key: key(), value: '90%', label: 'Clients From Referrals' },
      { _key: key(), value: '1200+', label: 'SEO Content Keywords Targeted' },
      { _key: key(), value: '95%', label: 'Client retention rate' },
      { _key: key(), value: '50+', label: 'Content Campaigns Successfully Executed' },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION 12 — cardGridSection (2 comparison cards)
  // Heading renamed from duplicate "Why Businesses Choose..." to
  // "Our Approach vs. The Rest" to fix accidental duplicate H2.
  // ═══════════════════════════════════════════════════════════════
  const s12_comparison = {
    _type: 'cardGridSection',
    _key: key(),
    heading: 'Our Approach vs. The Rest',
    subtext: 'At High Horse we focus on creating content that delivers real business impact. Our approach combines audience research, SEO insights, and strategic storytelling to ensure every piece of content has a clear purpose.',
    columns: 2,
    tintStyle: 'full',
    cards: [
      {
        _key: key(), _type: 'object',
        title: 'What Others Do',
        badgeColor: 'lavender',
        bullets: [
          'Focus on producing large volumes of content',
          'Write blogs without clear search strategy',
          'Ignore audience intent and customer journey',
          'Deliver content without measurable impact',
          'Prioritize quantity over quality and engagement',
        ],
      },
      {
        _key: key(), _type: 'object',
        title: 'What High Horse Does',
        badgeColor: 'lavender',
        bullets: [
          'Build strategic content systems for growth',
          'Create SEO-driven content based on real searches',
          'Align content with audience needs and intent',
          'Focus on traffic, engagement, and conversions',
          'Deliver content designed for measurable results',
        ],
      },
    ],
  }

  // ═══════════════════════════════════════════════════════════════
  // ASSEMBLE & PATCH
  // ═══════════════════════════════════════════════════════════════
  const pageBuilder = [
    s1_hero,
    s2_workWith,
    s3_lookingFor,
    s4_challenges,
    s5_moreThanWriting,
    s6_proof,
    s7_demandRevenue,
    s8_services,
    s9_cta,
    s10_process,
    s11_stats,
    s12_comparison,
  ]

  const relatedCaseStudies = [
    { _key: key(), _type: 'object', caseStudy: { _type: 'reference', _ref: 'caseStudy-bawa' } },
    { _key: key(), _type: 'object', caseStudy: { _type: 'reference', _ref: 'caseStudy-terra' } },
    { _key: key(), _type: 'object', caseStudy: { _type: 'reference', _ref: 'caseStudy-fech' } },
    { _key: key(), _type: 'object', caseStudy: { _type: 'reference', _ref: 'caseStudy-hioki' } },
  ]

  await client
    .patch(PAGE_ID)
    .set({
      accentStyle: 'brand',
      pageBuilder,
      relatedCaseStudies,
    })
    .unset(['relatedFaqs'])
    .commit()

  console.log('✓ Full pageBuilder overwrite complete (12 sections)')
  console.log('✓ accentStyle set to "brand"')
  console.log('✓ relatedCaseStudies linked: Bawa, Terra, Fech, Hioki')
  console.log('✓ relatedFaqs cleared (no FAQ section)')

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      accentStyle,
      "sectionTypes": pageBuilder[]._type,
      "sectionCount": count(pageBuilder),
      "heroBadge": pageBuilder[_type == "heroSection"][0].badgeText,
      "caseStudyRefs": relatedCaseStudies[].caseStudy->clientName,
      "hasFaqs": defined(relatedFaqs)
    }`,
    { id: PAGE_ID },
  )
  console.log('\n── Verification ──')
  console.log(JSON.stringify(final, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
