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

  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, pageBuilder }`,
    { slug: SEO_SLUG },
  )
  if (!doc) {
    console.error('SEO page not found')
    process.exit(1)
  }

  const pb: any[] = doc.pageBuilder || []

  // ── 1. Remove glowPanelText from "High Horse Builds SEO Systems" textImageSection ──
  const updated = pb.map((b: any) => {
    if (b._type === 'textImageSection' && b.heading?.includes('Builds SEO Systems')) {
      const { glowPanelText, ...rest } = b
      if (glowPanelText) {
        console.log('✓ Removed glowPanelText from "High Horse Builds SEO Systems" section')
      } else {
        console.log('  glowPanelText already absent from "Builds SEO Systems" section')
      }
      return rest
    }

    // ── 2. Remove metrics from each card in caseStudyCardsSection ──
    if (b._type === 'caseStudyCardsSection' && b.cards) {
      const cleanCards = b.cards.map((card: any) => {
        const { metrics, ...cardRest } = card
        return cardRest
      })
      console.log(`✓ Removed metrics from ${b.cards.length} case study cards`)
      return { ...b, cards: cleanCards }
    }

    return b
  })

  await client.patch(doc._id).set({ pageBuilder: updated }).commit()

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      "seoSystemsSection": pageBuilder[_type == "textImageSection" && heading match "*Builds SEO*"][0]{
        "hasGlowPanelText": defined(glowPanelText),
        "hasImage": defined(image),
        imagePosition
      },
      "cardsSection": pageBuilder[_type == "caseStudyCardsSection"][0]{
        "cardCount": count(cards),
        cards[]{ clientName, "hasMetrics": defined(metrics), "hasChartImage": defined(resultChartImage) }
      }
    }`,
    { slug: SEO_SLUG },
  )

  console.log('\n── Verification ──')
  console.log(`SEO Systems section:`)
  console.log(`  glowPanelText: ${final.seoSystemsSection?.hasGlowPanelText || false}`)
  console.log(`  image field: ${final.seoSystemsSection?.hasImage || false}`)
  console.log(`  imagePosition: ${final.seoSystemsSection?.imagePosition || 'not set'}`)

  console.log(`\nCase study cards (${final.cardsSection?.cardCount}):`)
  for (const card of final.cardsSection?.cards || []) {
    console.log(`  ${card.clientName}: metrics=${card.hasMetrics}, chartImage=${card.hasChartImage}`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
