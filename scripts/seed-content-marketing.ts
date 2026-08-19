import { createClient } from 'next-sanity'
import { config } from 'dotenv'
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-13',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

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

const PAGE_ID = 'servicePage-content-marketing'

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  // ── STEP 2: Update SEO page FAQ answers ──────────────────────────
  console.log('Updating SEO page FAQ answers...')

  const faqUpdates = [
    {
      question: 'Do I need SEO if I already run Google Ads?',
      answer: 'Yes. SEO provides long-term organic traffic while ads stop generating visitors once the ad budget is paused.',
    },
    {
      question: 'How do you choose keywords for my business?',
      answer: 'We analyze search demand, user intent, competition, and business relevance to identify keywords that attract high-quality traffic.',
    },
    {
      question: 'Do backlinks still matter for SEO?',
      answer: 'Yes. High-quality backlinks remain a strong ranking factor because they signal trust and authority to search engines.',
    },
    {
      question: 'Do you optimize websites for AI search and generative results?',
      answer: 'Yes. We implement AEO and GEO strategies to help businesses appear in AI-generated answers and modern search experiences.',
    },
  ]

  for (const faq of faqUpdates) {
    const existing = await client.fetch(
      `*[_type == "faq" && question == $q][0]._id`,
      { q: faq.question }
    )
    if (!existing) {
      console.log(`  ✗ FAQ not found: "${faq.question}"`)
      continue
    }
    await client.patch(existing).set({ answer: blockText(faq.answer) }).commit()
    console.log(`  ✓ Updated: ${faq.question}`)
  }

  // ── STEP 3: Verify case studies exist ────────────────────────────
  console.log('')
  console.log('Checking case studies...')
  const caseStudyIds = ['caseStudy-bawa', 'caseStudy-terra', 'caseStudy-fech', 'caseStudy-hioki']
  const existing = await client.fetch(
    `*[_type == "caseStudy" && _id in $ids]._id`,
    { ids: caseStudyIds }
  )
  console.log(`  Found ${existing.length}/4 case studies:`, existing)

  // ── STEP 4: Seed Content Marketing page ──────────────────────────
  console.log('')
  console.log('Creating Content Marketing service page...')

  const servicePageDoc = {
    _id: PAGE_ID,
    _type: 'servicePage',
    title: 'Content Marketing',
    slug: { _type: 'slug', current: 'seo-content-marketing-and-demand-generation-services' },
    section: 'services',
    summary: 'Strategic content marketing that attracts, engages, and converts your audience',
    pageBuilder: [
      // 1. Hero
      {
        _type: 'heroSection',
        _key: 'hero-1',
        headline: 'Looking for an Expert Content Marketing Agency?',
        subheadline: 'High Horse creates strategic content that attracts your audience, improves search visibility, builds brand trust, and turns website visitors into consistent business leads.',
        ctaText: 'Book a Strategy Call',
        ctaLink: '/contact-search-performance-marketing-agency',
      },
      // 2. Text split — Work With a Content Marketing Agency
      {
        _type: 'textImageSection',
        _key: 'text-image-1',
        heading: 'Work With a Content Marketing Agency That Understands Your Business',
        bodyText: blockText('Content marketing is no longer about simply publishing blogs. It is about creating the right information for every stage of the customer journey. People search for answers, compare options, and research solutions before making decisions. Strategic content helps your business appear during those moments. By combining search data, audience insights, and structured content strategies, we help brands attract visitors, educate potential customers, and convert them into leads. Whether you run a service company, ecommerce brand, or enterprise website, strong content marketing helps you build authority, visibility, and long-term organic growth.'),
        bullets: [
          'We create content that attracts the right customers.',
          'Your website content starts ranking on Google.',
          'Turn visitors into leads with strategic content.',
          'Build trust with consistent valuable content.',
        ],
      },
      // 3. Text split — Looking for Content Marketing Services?
      {
        _type: 'textImageSection',
        _key: 'text-image-2',
        heading: 'Looking for Content Marketing Services?',
        bodyText: blockText("Most businesses don't start looking for a content marketing agency unless their current content is not producing results. Many brands publish content regularly but still struggle with traffic, engagement, and conversions. You may be experiencing challenges like:"),
        bullets: [
          'Your website content does not rank on Google',
          'Blog posts get published but attract very little traffic',
          'Your competitors dominate search results for important topics',
          "Visitors read your content but don't convert into leads",
          'Your content lacks a clear strategy or direction',
          'Your brand message feels inconsistent across platforms',
          'Your content is not optimized for SEO or search intent',
          'Your team spends time creating content without measurable results',
        ],
      },
      // 4. Card grid — Challenges Behind Ineffective Content Marketing
      {
        _type: 'cardGridSection',
        _key: 'card-grid-1',
        heading: 'Challenges Behind Ineffective Content Marketing',
        subtext: 'When content marketing fails, it is usually because of missing strategy, poor planning, or weak optimization.',
        cards: [
          { _key: 'c1', title: 'No Clear Content Strategy', description: 'Content is created randomly without aligning with audience needs or business goals.' },
          { _key: 'c2', title: 'Poor Keyword & Topic Research', description: 'Without understanding what people search for, content struggles to attract organic traffic.' },
          { _key: 'c3', title: 'Lack of Consistent Publishing', description: 'Irregular content production makes it difficult to build authority or maintain audience engagement.' },
        ],
      },
      // 5. Text split — More Than Writing
      {
        _type: 'textImageSection',
        _key: 'text-image-3',
        heading: 'More Than Writing, We Create Content That People Actually Engage With',
        bodyText: blockText("Anyone can write content, but not everyone can create content that captures attention and keeps people interested. At High Horse, we focus on creating content experiences that connect with your audience, not just fill pages on your website. Our team combines strategic writing, creative visuals, SEO insights, and audience research to produce content that is easy to understand, engaging to read, and designed to guide visitors toward action. From website pages and blogs to marketing campaigns and visual storytelling, we ensure every piece of content supports your brand message and business goals."),
        closingText: "Because effective content doesn't just inform — it attracts the right audience, builds trust, and helps turn interest into real business opportunities.",
      },
      // 6. Card grid — Content Marketing Services
      {
        _type: 'cardGridSection',
        _key: 'card-grid-2',
        heading: 'Content Marketing Services Designed to Drive Traffic',
        cards: [
          { _key: 's1', title: 'SEO Content Writing', description: 'Create search-optimized articles and landing pages that rank higher on Google and attract qualified traffic.' },
          { _key: 's2', title: 'Visual & Interactive Content', description: 'Infographics and creative assets that simplify complex ideas and increase engagement.' },
          { _key: 's3', title: 'Video Content Marketing', description: 'Story-driven video content that improves engagement and helps communicate ideas effectively.' },
          { _key: 's4', title: 'AEO / GEO Content', description: 'Structured content optimized to appear in AI answers, featured snippets, and generative search platforms.' },
          { _key: 's5', title: 'Blog & Article Development', description: 'Informative and valuable blog content designed to educate audiences and strengthen brand authority.' },
          { _key: 's6', title: 'Social Media Content', description: 'Strategic content designed to build brand presence and engage audiences across social platforms.' },
          { _key: 's7', title: 'Ecommerce Content', description: 'Optimized product descriptions and category content designed to improve search visibility and increase sales.' },
          { _key: 's8', title: 'Content Optimization', description: 'Improving existing content to enhance readability, SEO performance, and engagement.' },
          { _key: 's9', title: 'Website Content Creation', description: 'Conversion-focused website copy that clearly communicates your value and improves user experience.' },
          { _key: 's10', title: 'Email & Newsletter Content', description: 'Content designed to nurture leads, strengthen relationships, and keep audiences connected with your brand.' },
          { _key: 's11', title: 'Landing Page Content', description: 'Conversion-focused content designed to capture attention and turn visitors into leads.' },
        ],
      },
      // 7. Stats section
      {
        _type: 'statsSection',
        _key: 'stats-1',
        heading: 'Why Businesses Choose High Horse for Content Marketing',
        bodyText: 'Businesses choose High Horse because we focus on strategy, clarity, and measurable impact rather than just producing content.',
        stats: [
          { _key: 'st1', value: '500+', label: 'SEO & Marketing Pages Created' },
          { _key: 'st2', value: '90%', label: 'Clients From Referrals' },
          { _key: 'st3', value: '15+', label: 'Industries Served With Content Marketing' },
          { _key: 'st4', value: '1200+', label: 'SEO Content Keywords Targeted' },
          { _key: 'st5', value: '300+', label: 'Blogs & Articles Published' },
          { _key: 'st6', value: '95%', label: 'Client Retention Rate' },
          { _key: 'st7', value: '50+', label: 'Content Campaigns Successfully Executed' },
        ],
      },
      // 8. Card grid — Our Approach vs. The Rest
      {
        _type: 'cardGridSection',
        _key: 'card-grid-3',
        heading: 'Our Approach vs. The Rest',
        subtext: 'At High Horse we focus on creating content that delivers real business impact. Our approach combines audience research, SEO insights, and strategic storytelling to ensure every piece of content has a clear purpose.',
        cards: [
          {
            _key: 'compare-1',
            title: 'What Others Do',
            bullets: [
              'Focus on producing large volumes of content',
              'Write blogs without clear search strategy',
              'Ignore audience intent and customer journey',
              'Deliver content without measurable impact',
              'Prioritize quantity over quality and engagement',
            ],
          },
          {
            _key: 'compare-2',
            title: 'What High Horse Does',
            bullets: [
              'Build strategic content systems for growth',
              'Create SEO-driven content based on real searches',
              'Align content with audience needs and intent',
              'Focus on traffic, engagement, and conversions',
              'Deliver content designed for measurable results',
            ],
          },
        ],
      },
      // 9. Process steps
      {
        _type: 'processStepsSection',
        _key: 'process-1',
        heading: 'Our Process for Delivering Effective Content Marketing',
        subtext: 'Our proven process combines research, strategy, optimization, and continuous tracking to improve rankings, drive traffic, and maximize long-term growth.',
        steps: [
          { _key: 'p1', stepTitle: 'Content Audit & Market Research', stepDescription: 'We analyze your website, competitors, and search trends to identify opportunities for impactful content.' },
          { _key: 'p2', stepTitle: 'Keyword & Topic Strategy', stepDescription: 'Our team identifies high-value keywords and topics that align with customer intent.' },
          { _key: 'p3', stepTitle: 'Content Creation', stepDescription: 'We produce high-quality, SEO-optimized content designed to attract readers and build trust.' },
          { _key: 'p4', stepTitle: 'Content Distribution', stepDescription: 'Content is promoted through relevant channels including search engines, social platforms, and newsletters.' },
          { _key: 'p5', stepTitle: 'Performance Tracking', stepDescription: 'We track traffic, engagement, and conversions to measure the effectiveness of your content.' },
          { _key: 'p6', stepTitle: 'Continuous Optimization', stepDescription: 'Strategies are refined based on data insights to continuously improve results.' },
        ],
      },
      // 10. CTA
      {
        _type: 'ctaSection',
        _key: 'cta-1',
        heading: "Let's Build Content That Brings the Right Customers to Your Business",
        bodyText: blockText("If your website content isn't attracting visitors or generating leads, it may be time for a smarter content strategy. Our team analyzes your current content, identifies opportunities, and builds a structured plan that helps your brand attract and engage the right audience."),
        ctaText: 'Get a Free Content Audit',
        ctaLink: '/contact-search-performance-marketing-agency',
      },
    ],
    relatedCaseStudies: [
      { _type: 'reference', _ref: 'caseStudy-bawa', _key: 'ref-bawa' },
      { _type: 'reference', _ref: 'caseStudy-terra', _key: 'ref-terra' },
      { _type: 'reference', _ref: 'caseStudy-fech', _key: 'ref-fech' },
      { _type: 'reference', _ref: 'caseStudy-hioki', _key: 'ref-hioki' },
    ],
  }

  await client.createOrReplace(servicePageDoc)
  console.log('✓ Content Marketing page created:', PAGE_ID)

  // Verify
  const final = await client.fetch(
    `*[_id == $id][0]{ "sections": count(pageBuilder), "cases": count(relatedCaseStudies) }`,
    { id: PAGE_ID }
  )
  console.log(`\nFinal: ${final.sections} sections, ${final.cases} case studies, 0 FAQs (intentional)`)
  console.log('Visit /seo-content-marketing-and-demand-generation-services')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
