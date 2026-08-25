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

const SEO_SLUG = 'search-engine-optimization-seo-growth-services'

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  // ── 1. Remove resultCard from "Work With an SEO Agency" textImageSection ──
  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, pageBuilder }`,
    { slug: SEO_SLUG },
  )
  if (!doc) {
    console.error('SEO page not found')
    process.exit(1)
  }

  const pb: any[] = doc.pageBuilder || []
  let changed = false

  const updated = pb.map((b: any) => {
    if (b._type === 'textImageSection' && b.heading?.includes('Work With an SEO Agency')) {
      const { resultCard, ...rest } = b
      if (resultCard) {
        console.log('✓ Removed resultCard from "Work With an SEO Agency" section')
        changed = true
      }
      return rest
    }
    return b
  })

  if (changed) {
    await client.patch(doc._id).set({ pageBuilder: updated }).commit()
  } else {
    console.log('  No resultCard found on "Work With an SEO Agency" — already clean')
  }

  // ── 2. Remove proofMockups from 3 case studies, unset the field ──
  const caseStudyIds = ['caseStudy-bawa', 'caseStudy-hioki', 'caseStudy-terra']

  for (const id of caseStudyIds) {
    await client.patch(id).unset(['proofMockups']).commit()
  }
  console.log('✓ Removed proofMockups from Bawa, Hioki, Terra')

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      "sectionCount": count(pageBuilder),
      "section2": pageBuilder[_type == "textImageSection" && heading match "Work With*"][0]{
        "hasResultCard": defined(resultCard),
        "hasImage": defined(image)
      }
    }`,
    { slug: SEO_SLUG },
  )
  console.log('\n── Verification ──')
  console.log(`Sections: ${final.sectionCount}`)
  console.log(`Section 2 has resultCard: ${final.section2?.hasResultCard || false}`)
  console.log(`Section 2 has image field: ${final.section2?.hasImage || false}`)

  const mockupCheck = await client.fetch(
    `*[_type == "caseStudy" && _id in $ids]{
      clientName,
      "hasProofMockups": defined(proofMockups),
      "hasProofImage": defined(proofImage)
    }`,
    { ids: caseStudyIds },
  )
  console.log('\nCase study cleanup:')
  for (const cs of mockupCheck) {
    console.log(`  ${cs.clientName}: proofMockups=${cs.hasProofMockups}, proofImage=${cs.hasProofImage}`)
  }

  console.log('\nDone. Image slots are now ready for manual upload:')
  console.log('  - Section 2: upload Fech result card image via textImageSection.image in Studio')
  console.log('  - Client proof: upload proof images via caseStudy.proofImage for Bawa, Hioki, Terra')
  console.log('  - Case study cards: upload chart images via caseStudyCardsSection card.resultChartImage in Studio')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
