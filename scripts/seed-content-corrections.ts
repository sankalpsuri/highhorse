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

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{ _id, pageBuilder }`,
    { id: PAGE_ID },
  )
  if (!doc) {
    console.error('Content Marketing page not found')
    process.exit(1)
  }

  const pb: any[] = doc.pageBuilder || []

  const updated = pb.map((b: any) => {
    // ── 1. Replace imageGallerySection with clientProofSection ──
    if (b._type === 'imageGallerySection' && b.heading?.includes('Back Every Strategy')) {
      console.log('✓ Replacing imageGallerySection → clientProofSection')
      return {
        _type: 'clientProofSection',
        _key: key(),
        heading: 'We Back Every Strategy With Real Results',
        bodyText: 'See real SEO results from High Horse through improved Google rankings, organic traffic growth, higher keyword visibility, and measurable business lead generation.',
      }
    }

    // ── 2. Set ctaStyle: 'rounded' on "Looking for Content Marketing Services?" section ──
    if (b._type === 'textImageSection' && b.heading?.includes('Looking for Content Marketing Services')) {
      console.log('✓ Setting ctaStyle: "rounded" on "Looking for Content Marketing Services?" section')
      return { ...b, ctaStyle: 'rounded' }
    }

    return b
  })

  await client.patch(PAGE_ID).set({ pageBuilder: updated }).commit()

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      "sectionTypes": pageBuilder[]._type,
      "proofSection": pageBuilder[_type == "clientProofSection"][0]{ heading, bodyText },
      "lookingForSection": pageBuilder[_type == "textImageSection" && heading match "*Looking for Content*"][0]{ heading, ctaStyle },
      "caseStudyProofImages": relatedCaseStudies[].caseStudy->{ clientName, "hasProofImage": defined(proofImage) }
    }`,
    { id: PAGE_ID },
  )
  console.log('\n── Verification ──')
  console.log('Section types:', JSON.stringify(final.sectionTypes))
  console.log('Proof section:', JSON.stringify(final.proofSection))
  console.log('Looking-for ctaStyle:', final.lookingForSection?.ctaStyle)
  console.log('Case study proof images:')
  for (const cs of final.caseStudyProofImages || []) {
    console.log(`  ${cs.clientName}: proofImage=${cs.hasProofImage}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
