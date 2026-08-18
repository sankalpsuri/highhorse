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

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      'Missing SANITY_API_WRITE_TOKEN.\n' +
      'Create one at sanity.io/manage → your project → API → Tokens with Editor permission.\n' +
      'Add it to .env.local as SANITY_API_WRITE_TOKEN=sk-...'
    )
    process.exit(1)
  }

  console.log('Creating Voice SEO service page...')

  const servicePageDoc = {
    _id: 'servicePage-voice-seo',
    _type: 'servicePage',
    title: 'Voice SEO',
    slug: { _type: 'slug', current: 'voice-search-seo-optimization-services' },
    section: 'services',
    summary: 'Be the answer when customers use voice search',
    pageBuilder: [
      // 1. Hero Section — no badge
      {
        _type: 'heroSection',
        _key: 'hero-1',
        headline: 'Be The Answer When Customers Use Voice Search',
        subheadline: 'Voice search is rapidly changing how people discover information online. Instead of typing queries, users now ask questions through voice assistants and smart devices. High Horse helps businesses optimise their digital presence for voice-driven search queries, ensuring your brand appears in voice assistant responses and conversational search results.',
        ctaText: 'Book a Strategy Call',
        ctaLink: '/contact-search-performance-marketing-agency',
      },
      // 2. Text split (no image) — Understanding Voice Search Optimization
      {
        _type: 'textImageSection',
        _key: 'text-image-1',
        heading: 'Understanding Voice Search Optimization',
        bodyText: [
          {
            _type: 'block',
            _key: crypto.randomUUID().slice(0, 8),
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: crypto.randomUUID().slice(0, 8),
                text: 'Voice SEO is the process of optimising your website and content so it can be discovered and delivered through voice-based search queries. Unlike traditional searches, voice queries are more conversational and question-based. Voice assistants such as ',
                marks: [],
              },
              {
                _type: 'span',
                _key: crypto.randomUUID().slice(0, 8),
                text: 'Google Assistant, Siri, and Alexa',
                marks: ['strong'],
              },
              {
                _type: 'span',
                _key: crypto.randomUUID().slice(0, 8),
                text: ' prioritise content that provides clear, structured answers. Voice SEO focuses on ensuring that search engines can easily interpret your content and deliver it when users ask voice-based questions.',
                marks: [],
              },
            ],
          },
        ],
      },
      // 3. Text + Image right — The Growing Impact of Voice Search
      {
        _type: 'textImageSection',
        _key: 'text-image-2',
        heading: 'The Growing Impact of Voice Search',
        bodyText: blockText('Voice search is becoming a key part of the digital discovery process. Millions of users rely on voice assistants to find local services, compare products, and gather information instantly. If your content is not optimised for voice queries:'),
        bullets: [
          'Your competitors may appear in voice responses instead of your brand',
          'Your website may miss conversational search traffic',
          'Your business may lose early-stage discovery opportunities',
        ],
        closingText: 'Optimising for voice search ensures your brand remains visible as search behaviour evolves.',
        imagePosition: 'right',
      },
      // 4. Text + Image left — How Voice SEO Helps Businesses Grow (PARTIAL — message was truncated)
      {
        _type: 'textImageSection',
        _key: 'text-image-3',
        heading: 'How Voice SEO Helps Businesses Grow',
        bodyText: blockText('Voice SEO helps businesses capture search demand generated through conversational queries. Benefits include:'),
        bullets: [
          'Increased visibility in voice assistant responses',
          'More website traffic from conversational queries [TO BE VALIDATED]',
        ],
        imagePosition: 'left',
      },
    ],
  }

  await client.createOrReplace(servicePageDoc)
  console.log('✓ Service page created:', servicePageDoc._id)

  console.log('\nDone! Visit /voice-search-seo-optimization-services')
  console.log('NOTE: Sections 5+ were not provided (message was truncated at section 4 bullets).')
  console.log('Re-run this script after adding remaining sections.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
