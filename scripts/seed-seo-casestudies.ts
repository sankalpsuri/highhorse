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

const SEO_PAGE_ID = 'servicePage-seo'

const caseStudies = [
  {
    _id: 'caseStudy-bawa',
    clientName: 'Bawa',
    slug: { _type: 'slug' as const, current: 'bawa' },
    summary: 'Bawa saw a significant lift in qualified visitors and sustained month-on-month traffic growth through a targeted SEO strategy.',
    results: [
      { _key: 'r1', value: '3x', label: 'organic traffic growth in 12 months' },
    ],
  },
  {
    _id: 'caseStudy-terra',
    clientName: 'Terra',
    slug: { _type: 'slug' as const, current: 'terra' },
    summary: 'Multiple high-intent keywords reached Google\'s first page, driving a consistent rise in organic clicks and enquiries for Terra.',
    results: [
      { _key: 'r1', value: '100%', label: 'growth in search impressions within 3 months' },
    ],
  },
  {
    _id: 'caseStudy-fech',
    clientName: 'Fech Moving & Cleaning',
    slug: { _type: 'slug' as const, current: 'fech-moving-cleaning' },
    summary: 'Fech Moving & Cleaning achieved strong conversion performance through highly targeted paid search campaigns.',
    results: [
      { _key: 'r1', value: '351', label: 'conversions from 2.98K high-intent clicks' },
      { _key: 'r2', value: '39.1K', label: 'impressions consistently achieved' },
      { _key: 'r3', value: '$59.70', label: 'efficient cost per conversion' },
    ],
  },
  {
    _id: 'caseStudy-hioki',
    clientName: 'Hioki',
    slug: { _type: 'slug' as const, current: 'hioki' },
    summary: 'Hioki achieved high-volume conversions with efficient cost management across targeted search campaigns.',
    results: [
      { _key: 'r1', value: '831', label: 'conversions from 16.9K high-intent clicks' },
      { _key: 'r2', value: '₹40.22', label: 'average CPC across campaigns' },
      { _key: 'r3', value: '₹818', label: 'efficient cost per conversion' },
    ],
  },
]

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  // Check which case studies already exist
  const existingNames: string[] = await client.fetch(
    `*[_type == "caseStudy" && clientName in $names].clientName`,
    { names: caseStudies.map((cs) => cs.clientName) }
  )
  console.log('Existing case studies:', existingNames.length ? existingNames.join(', ') : 'none')

  const createdIds: string[] = []

  for (const cs of caseStudies) {
    if (existingNames.includes(cs.clientName)) {
      console.log(`  ✓ ${cs.clientName} already exists — skipping`)
      // Still need the ID for relatedCaseStudies
      const existing = await client.fetch(
        `*[_type == "caseStudy" && clientName == $name][0]._id`,
        { name: cs.clientName }
      )
      if (existing) createdIds.push(existing)
    } else {
      await client.createOrReplace({
        _type: 'caseStudy',
        ...cs,
      })
      console.log(`  ✓ ${cs.clientName} created`)
      createdIds.push(cs._id)
    }
  }

  console.log('')
  console.log('Case study IDs for relatedCaseStudies:', createdIds)
  console.log(`Total: ${createdIds.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
