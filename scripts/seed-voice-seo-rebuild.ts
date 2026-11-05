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

const SLUG = 'voice-search-seo-optimization-services'

let keyIdx = 0
function key() {
  return `vs-${(++keyIdx).toString(36).padStart(3, '0')}`
}

function blockText(text: string) {
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

function multiBlockText(...paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }))
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG },
  )
  if (!doc) {
    console.error('Voice SEO page not found')
    process.exit(1)
  }
  console.log(`Found Voice SEO page: ${doc._id}`)

  // ══════════════════════════════════════════════════════════════
  // SECTION 1 — Hero
  // ══════════════════════════════════════════════════════════════
  const s1_hero = {
    _type: 'heroSection',
    _key: key(),
    eyebrowText: 'Voice SEO Services',
    eyebrowDotColor: 'orange',
    headline: 'Be the Answer When Customers Use Voice Search',
    headlineHighlights: ['Voice Search'],
    subheadline:
      'Voice search is rapidly changing how people discover information online. Instead of typing queries, users now ask questions through voice assistants and smart devices. High Horse helps businesses optimise their digital presence for voice-driven search queries, ensuring your brand appears in voice assistant responses and conversational search results.',
    ctaText: 'Book a Strategy Call',
    ctaLink: '/contact-search-performance-marketing-agency',
    heroImage: { _type: 'image' },
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 2 — Understanding Voice Search Optimization
  // ══════════════════════════════════════════════════════════════
  const s2_understanding = {
    _type: 'textImageSection',
    _key: key(),
    eyebrow: 'What Voice SEO is',
    heading: 'Understanding Voice Search Optimization',
    bodyText: multiBlockText(
      'Voice SEO is the process of optimising your website and content so it can be discovered and delivered through voice-based search queries.',
      'Unlike traditional searches, voice queries are more conversational and question-based. Voice assistants such as Google Assistant, Siri, and Alexa prioritise content that provides clear, structured answers.',
      'Voice SEO focuses on ensuring that search engines can easily interpret your content and deliver it when users ask voice-based questions.',
    ),
    imagePosition: 'right',
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 3 — The Growing Impact of Voice Search
  // ══════════════════════════════════════════════════════════════
  const s3_impact = {
    _type: 'challengeGridSection',
    _key: key(),
    eyebrow: 'Why it matters now',
    heading: 'The Growing Impact of Voice Search',
    headerLayout: 'inline-cta',
    ctaText: 'Book a Strategy Call',
    ctaLink: '/contact-search-performance-marketing-agency',
    subtext:
      'Voice search is becoming a key part of the digital discovery process. Millions of users rely on voice assistants to find local services, compare products, and gather information instantly. If your content is not optimised for voice queries, you risk losing visibility.',
    cardStyle: 'compact',
    background: 'white',
    challenges: [
      'Your competitors may appear in voice responses instead of your brand',
      'Your website may miss conversational search traffic',
      'Your business may lose early-stage discovery opportunities',
    ],
    cardColors: ['amber', 'amber', 'amber'],
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 4 — How Voice SEO Helps Businesses Grow (dark)
  // ══════════════════════════════════════════════════════════════
  const s4_benefits = {
    _type: 'cardGridSection',
    _key: key(),
    eyebrow: 'Benefits',
    heading: 'How Voice SEO Helps Businesses Grow',
    headerLayout: 'split',
    style: 'dark',
    showGlow: false,
    darkCardStyle: 'numbered',
    listLabel: 'Benefits include:',
    closingText:
      'By optimising for voice queries, businesses can capture customers at the moment they ask questions.',
    subtext:
      'Voice SEO helps businesses capture search demand generated through conversational queries.',
    cards: [
      { _key: key(), title: 'Increased visibility in voice assistant responses' },
      { _key: key(), title: 'More website traffic from conversational queries' },
      { _key: key(), title: 'Stronger presence in local search results' },
      { _key: key(), title: 'Higher chances of appearing in featured snippets' },
      { _key: key(), title: 'Improved brand credibility and authority' },
    ],
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 5 — What Drives Voice Search Visibility
  // ══════════════════════════════════════════════════════════════
  const s5_drivers = {
    _type: 'cardGridSection',
    _key: key(),
    eyebrow: 'What we do',
    heading: 'What Drives Voice Search Visibility',
    headerLayout: 'split',
    style: 'clean',
    background: 'white',
    subtextParagraphs: [
      'Effective voice search optimization requires multiple elements working together.',
      'Our Voice SEO approach includes:',
    ],
    cards: [
      {
        _key: key(),
        svgPath: 'M4 5h16v11H9l-5 4z M8 9.5h8 M8 12.5h5',
        title: 'Conversational Content Structure',
        description:
          'Content written in a natural language format aligned with how users speak.',
      },
      {
        _key: key(),
        svgPath: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7 M12 17h.01',
        title: 'Question-Based Content Strategy',
        description: 'Optimising pages around common questions customers ask.',
      },
      {
        _key: key(),
        svgPath: 'M4 4h16v16H4z M4 9h16 M8 13h8 M8 16.5h5',
        title: 'Featured Snippet Optimization',
        description:
          'Structuring answers in formats search engines prefer for voice responses.',
      },
      {
        _key: key(),
        svgPath: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
        title: 'Local SEO Signals',
        description:
          'Improving local visibility for voice searches related to nearby services.',
      },
      {
        _key: key(),
        svgPath: 'M7 3h10v18H7z M11 18h2',
        title: 'Mobile Optimization',
        description:
          'Ensuring fast-loading, mobile-friendly pages that voice search users can easily access.',
      },
      {
        _key: key(),
        svgPath: 'M8 4l-5 8 5 8 M16 4l5 8-5 8 M13.5 5l-3 14',
        title: 'Structured Data Markup',
        description:
          'Helping search engines interpret your website content accurately.',
      },
    ],
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 6 — Why Choose High Horse (split list)
  // ══════════════════════════════════════════════════════════════
  const s6_whyUs = {
    _type: 'challengeGridSection',
    _key: key(),
    eyebrow: 'Why choose us',
    layout: 'split',
    splitStyle: 'numbered-card',
    cardHeader: 'Our approach focuses on',
    heading: 'Why Choose High Horse',
    descriptionParagraphs: [
      'High Horse combines traditional SEO expertise with advanced strategies designed for emerging search technologies.',
      'We help businesses stay visible across both traditional and voice-driven search ecosystems.',
    ],
    challenges: [
      'Conversational search optimization',
      'Structured answer frameworks',
      'Integration with AEO and AI search strategies',
      'Continuous monitoring of voice search visibility',
      'Data-driven performance improvements',
    ],
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 7 — Key Components of Voice SEO
  // ══════════════════════════════════════════════════════════════
  const s7_components = {
    _type: 'cardGridSection',
    _key: key(),
    eyebrow: 'How it fits together',
    heading: 'Key Components of Voice SEO',
    headerLayout: 'split',
    background: 'white',
    cardContainerStyle: 'unified',
    subtextParagraphs: [
      'Effective voice search optimization requires multiple elements working together.',
      'Our Voice SEO approach includes:',
    ],
    cards: [
      {
        _key: key(),
        svgPath: 'M4 5h16v11H9l-5 4z M8 9.5h8 M8 12.5h5',
        title: 'Conversational Content Structure',
        description:
          'Content written in a natural language format aligned with how users speak.',
      },
      {
        _key: key(),
        svgPath: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7 M12 17h.01',
        title: 'Question-Based Content Strategy',
        description: 'Optimising pages around common questions customers ask.',
      },
      {
        _key: key(),
        svgPath: 'M4 4h16v16H4z M4 9h16 M8 13h8 M8 16.5h5',
        title: 'Featured Snippet Optimization',
        description:
          'Structuring answers in formats search engines prefer for voice responses.',
      },
      {
        _key: key(),
        svgPath: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
        title: 'Local SEO Signals',
        description:
          'Improving local visibility for voice searches related to nearby services.',
      },
      {
        _key: key(),
        svgPath: 'M7 3h10v18H7z M11 18h2',
        title: 'Mobile Optimization',
        description:
          'Ensuring fast-loading, mobile-friendly pages that voice search users can easily access.',
      },
      {
        _key: key(),
        svgPath: 'M8 4l-5 8 5 8 M16 4l5 8-5 8 M13.5 5l-3 14',
        title: 'Structured Data Markup',
        description:
          'Helping search engines interpret your website content accurately.',
      },
    ],
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 8 — CTA (blue variant)
  // ══════════════════════════════════════════════════════════════
  const s8_cta = {
    _type: 'ctaSection',
    _key: key(),
    heading: 'Ready to Optimize Your Business for Voice Search?',
    bodyText: multiBlockText(
      'Voice-driven discovery is becoming a major part of how customers search for information.',
      'High Horse helps businesses implement Voice SEO strategies that improve visibility in voice assistant responses and conversational search results.',
      'Start preparing your brand for the future of search.',
    ),
    ctaText: 'Book a Strategy Call',
    ctaLink: '/contact-search-performance-marketing-agency',
    variant: 'blue',
  }

  // ══════════════════════════════════════════════════════════════
  // ASSEMBLE pageBuilder
  // ══════════════════════════════════════════════════════════════
  const pageBuilder = [
    s1_hero,
    s2_understanding,
    s3_impact,
    s4_benefits,
    s5_drivers,
    s6_whyUs,
    s7_components,
    s8_cta,
  ]

  await client
    .patch(doc._id)
    .set({
      accentStyle: 'brand',
      expertCtaLabel: 'Talk to Voice SEO Expert',
      faqEyebrow: 'Before you ask',
      faqHeading: 'Frequently Asked Questions',
      pageBuilder,
    })
    .commit()

  console.log('\n✓ pageBuilder rebuilt with 8 sections')
  console.log('✓ expertCtaLabel: "Talk to Voice SEO Expert"')
  console.log('✓ faqEyebrow: "Before you ask"')
  console.log('✓ faqHeading: "Frequently Asked Questions"')
  console.log('✓ accentStyle: "brand"')

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      accentStyle,
      expertCtaLabel,
      faqEyebrow,
      faqHeading,
      "sectionCount": count(pageBuilder),
      "sectionTypes": pageBuilder[]._type,
      "faqCount": count(relatedFaqs),
      seo
    }`,
    { slug: SLUG },
  )
  console.log('\n── Verification ──')
  console.log(`accentStyle: ${final.accentStyle}`)
  console.log(`sections: ${final.sectionCount} (${final.sectionTypes.join(', ')})`)
  console.log(`FAQs: ${final.faqCount}`)
  console.log(`SEO title: ${final.seo?.metaTitle}`)
  console.log(`SEO description: ${final.seo?.metaDescription}`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
