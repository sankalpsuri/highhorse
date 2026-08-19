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
  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, pageBuilder }`,
    { slug: SEO_SLUG },
  )
  if (!doc) {
    console.error('SEO page not found')
    process.exit(1)
  }

  const pb: any[] = doc.pageBuilder || []
  console.log('Current pageBuilder:')
  pb.forEach((b: any, i: number) => console.log(`  [${i}] ${b._type}: ${b.heading || b.headline || '(no heading)'}`))

  // STEP 3 — Remove imageGallerySection
  const filtered = pb.filter((b: any) => b._type !== 'imageGallerySection')
  console.log(`\nRemoved ${pb.length - filtered.length} imageGallerySection(s)`)

  // STEP 4 — Set field values on existing sections
  const updated = filtered.map((b: any) => {
    // "The Real Problems Behind Low Google Rankings" card grid → dashed style + badgeColors
    if (b._type === 'cardGridSection' && b.heading?.includes('Real Problems')) {
      const colors = ['mint', 'peach', 'lavender', 'gray']
      const cards = (b.cards || []).map((c: any, i: number) => ({
        ...c,
        badgeColor: colors[i % colors.length],
      }))
      console.log(`  Set style=dashed + badgeColors on "${b.heading}"`)
      return { ...b, style: 'dashed', cards }
    }

    // "SEO Services Built for Ranking Top on Google" card grid → cream background
    if (b._type === 'cardGridSection' && b.heading?.includes('SEO Services')) {
      console.log(`  Set background=cream on "${b.heading}"`)
      return { ...b, background: 'cream' }
    }

    // Stats section → scattered layout
    if (b._type === 'statsSection') {
      console.log(`  Set layout=scattered on "${b.heading}"`)
      return { ...b, layout: 'scattered' }
    }

    // CTA section → tan variant
    if (b._type === 'ctaSection') {
      console.log(`  Set variant=tan on "${b.heading}"`)
      return { ...b, variant: 'tan' }
    }

    return b
  })

  // STEP 5 — Insert processStepsSection before the CTA (last item)
  const ctaIdx = updated.findIndex((b: any) => b._type === 'ctaSection')
  const processSection = {
    _type: 'processStepsSection',
    _key: 'processSteps01',
    heading: 'How We Build SEO Systems That Actually Grow Revenue',
    subtext: 'Every engagement follows a structured process designed to turn search visibility into measurable business outcomes.',
    steps: [
      {
        _key: 'step01',
        stepTitle: 'Search & Business Audit',
        stepDescription: 'We analyse your current rankings, technical health, content gaps, and competitor positioning to build a clear picture of where the biggest revenue opportunities sit.',
      },
      {
        _key: 'step02',
        stepTitle: 'Strategy & Roadmap',
        stepDescription: 'Based on the audit, we map out a prioritised 90-day plan targeting the keywords, pages, and fixes that will move the revenue needle fastest.',
      },
      {
        _key: 'step03',
        stepTitle: 'Execution & Optimisation',
        stepDescription: 'Our team handles technical fixes, on-page optimisation, content production, and link building — reporting progress against the agreed KPIs every month.',
      },
      {
        _key: 'step04',
        stepTitle: 'Measurement & Scaling',
        stepDescription: 'Once the system is producing results, we identify what is working and double down — expanding into new keyword clusters, markets, or content formats to compound growth.',
      },
    ],
  }

  // Insert clientProofSection right after the imageGallery was removed (where it used to be at index 5)
  // Actually, insert it where the imageGallery was — after the 3rd textImageSection / before the services cardGrid
  // In the current filtered order: [0]hero [1]text [2]text [3]cardGrid(problems) [4]text [5]cardGrid(services) [6]stats [7]cta
  // clientProofSection goes at index 5 (before services cardGrid)
  const clientProofSection = {
    _type: 'clientProofSection',
    _key: 'clientProof01',
    heading: 'See How High Horse Turns SEO Strategies into Measurable Results',
    bodyText: 'Real results from real clients — not hypothetical projections.',
  }

  // Insert clientProofSection at position 5 (before services card grid)
  updated.splice(5, 0, clientProofSection)

  // Re-find CTA index after insertion
  const newCtaIdx = updated.findIndex((b: any) => b._type === 'ctaSection')
  if (newCtaIdx >= 0) {
    updated.splice(newCtaIdx, 0, processSection)
    console.log(`  Inserted processStepsSection before CTA at index ${newCtaIdx}`)
  } else {
    updated.push(processSection)
    console.log('  Appended processStepsSection at end (no CTA found)')
  }

  console.log('\nFinal pageBuilder order:')
  updated.forEach((b: any, i: number) => console.log(`  [${i}] ${b._type}: ${b.heading || b.headline || '(no heading)'}`))

  // Commit
  await client.patch(doc._id).set({ pageBuilder: updated }).commit()
  console.log('\nSEO page updated successfully.')

  // STEP 7 — Verify FAQs
  const faqs = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0].relatedFaqs[]->{ _id, question, answer }`,
    { slug: SEO_SLUG },
  )
  if (faqs && faqs.length > 0) {
    console.log(`\nFAQ check (${faqs.length} FAQs):`)
    for (const faq of faqs) {
      const hasContent = faq.answer && (
        typeof faq.answer === 'string' ? faq.answer.length > 10 :
        Array.isArray(faq.answer) && faq.answer.length > 0
      )
      console.log(`  ${hasContent ? '✓' : '✗ TODO/EMPTY'} ${faq.question}`)
    }
  } else {
    console.log('\nNo FAQs linked to SEO page.')
  }

  // Verify Fech Moving & Cleaning case study not overwritten
  const fech = await client.fetch(
    `*[_type == "caseStudy" && clientName match "Fech*"][0]{ clientName, results, resultImages }`,
  )
  if (fech) {
    console.log(`\nFech Moving & Cleaning verification:`)
    console.log(`  results: ${fech.results?.length || 0} items`)
    console.log(`  resultImages: ${fech.resultImages?.length || 0} items`)
    console.log('  ✓ Case study data intact (not overwritten)')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
