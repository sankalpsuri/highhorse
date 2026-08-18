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

const PAGE_ID = 'servicePage-voice-seo'

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  // Verify document exists and has exactly 4 sections
  const doc = await client.fetch(
    `*[_id == $id][0]{ _id, "count": count(pageBuilder) }`,
    { id: PAGE_ID }
  )
  if (!doc) {
    console.error('Document not found:', PAGE_ID)
    process.exit(1)
  }
  console.log('Existing pageBuilder entries:', doc.count)

  // Append sections 5 and 6
  console.log('Appending section 5 (cardGridSection) and section 6 (ctaSection)...')
  await client.patch(PAGE_ID).append('pageBuilder', [
    {
      _type: 'cardGridSection',
      _key: 'card-grid-1',
      heading: 'Key Components of Voice SEO',
      subtext: 'Effective voice search optimization requires multiple elements working together. Our Voice SEO approach includes:',
      cards: [
        {
          _key: 'vc-1',
          title: 'Conversational Content Structure',
          description: 'Content written in a natural language format aligned with how users speak.',
        },
        {
          _key: 'vc-2',
          title: 'Question-Based Content Strategy',
          description: 'Optimising pages around common questions customers ask.',
        },
        {
          _key: 'vc-3',
          title: 'Featured Snippet Optimization',
          description: 'Structuring answers in formats search engines prefer for voice responses.',
        },
        {
          _key: 'vc-4',
          title: 'Local SEO Signals',
          description: 'Improving local visibility for voice searches related to nearby services.',
        },
        {
          _key: 'vc-5',
          title: 'Mobile Optimization',
          description: 'Ensuring fast-loading, mobile-friendly pages that voice search users can easily access.',
        },
        {
          _key: 'vc-6',
          title: 'Structured Data Markup',
          description: 'Helping search engines interpret your website content accurately.',
        },
      ],
    },
    {
      _type: 'ctaSection',
      _key: 'cta-1',
      heading: 'Ready to Optimize Your Business for Voice Search?',
      bodyText: blockText('Voice-driven discovery is becoming a major part of how customers search for information. High Horse helps businesses implement Voice SEO strategies that improve visibility in voice assistant responses and conversational search results. Start preparing your brand for the future of search.'),
      ctaText: 'Request a Pitch Deck',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
  ]).commit()
  console.log('✓ Sections 5-6 appended')

  // Create 5 FAQ documents
  const faqs = [
    { _id: 'faq-voice-seo-1', question: 'How is voice search different from normal Google searches?', order: 1 },
    { _id: 'faq-voice-seo-2', question: 'Which types of businesses benefit most from Voice SEO?', order: 2 },
    { _id: 'faq-voice-seo-3', question: 'How long does it take to see results from Voice SEO?', order: 3 },
    { _id: 'faq-voice-seo-4', question: 'Can Voice SEO improve local search visibility?', order: 4 },
    { _id: 'faq-voice-seo-5', question: 'What does High Horse do differently in Voice SEO?', order: 5 },
  ]

  for (const faq of faqs) {
    await client.createOrReplace({
      _type: 'faq',
      _id: faq._id,
      question: faq.question,
      answer: blockText('TODO: content team to write answer'),
      category: 'seo',
      relatedPage: {
        _type: 'reference',
        _ref: PAGE_ID,
      },
      order: faq.order,
    })
    console.log('✓ FAQ created:', faq.question)
  }

  // Set relatedFaqs on the service page
  await client.patch(PAGE_ID).set({
    relatedFaqs: faqs.map((f) => ({
      _type: 'reference',
      _ref: f._id,
      _key: f._id,
    })),
  }).commit()
  console.log('✓ Linked FAQs to service page')

  // Verify final state
  const final = await client.fetch(
    `*[_id == $id][0]{ "sections": count(pageBuilder), "faqs": count(relatedFaqs) }`,
    { id: PAGE_ID }
  )
  console.log(`\nFinal state: ${final.sections} pageBuilder sections, ${final.faqs} relatedFaqs`)
  console.log('Visit /voice-search-seo-optimization-services')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
