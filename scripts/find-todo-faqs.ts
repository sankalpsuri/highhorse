import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-29',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

async function main() {
  // Find all FAQ docs whose answer contains "TODO"
  const todoFaqs = await client.fetch(`
    *[_type == "faq" && answer[0].children[0].text match "TODO*"]{
      _id,
      question,
      "answerText": answer[0].children[0].text,
      category,
      "linkedPages": relatedPages[]->{ title, "slug": slug.current }
    } | order(question asc)
  `)
  console.log(`=== TODO FAQ documents (${todoFaqs.length}) ===`)
  for (const f of todoFaqs) {
    console.log(`\n  ID: ${f._id}`)
    console.log(`  Q: ${f.question}`)
    console.log(`  Answer: ${f.answerText}`)
    console.log(`  Category: ${f.category}`)
    console.log(`  Linked pages: ${f.linkedPages?.map((p: any) => p.title || p.slug).join(', ') || 'none'}`)
  }

  // Also check the retargeting page's caseStudiesHeading
  const retargeting = await client.fetch(`
    *[_type == "servicePage" && slug.current == "retargeting-and-remarketing-ad-campaign-services"][0]{
      _id,
      caseStudiesHeading,
      caseStudiesSubtext,
      "sectionCount": count(pageBuilder),
      "sectionTypes": pageBuilder[]._type
    }
  `)
  console.log('\n=== Retargeting page ===')
  console.log(`  ID: ${retargeting._id}`)
  console.log(`  caseStudiesHeading: ${retargeting.caseStudiesHeading}`)
  console.log(`  Sections (${retargeting.sectionCount}): ${retargeting.sectionTypes?.join(', ')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
