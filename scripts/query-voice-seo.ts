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

async function main() {
  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == "voice-search-seo-optimization-services"][0]{
      _id, title,
      pageBuilder[]{ _type, _key, heading, headline }
    }`
  )

  if (!doc) {
    console.log('Document NOT FOUND')
    return
  }

  console.log('Document ID:', doc._id)
  console.log('Title:', doc.title)
  console.log('pageBuilder entries:', doc.pageBuilder?.length ?? 0)
  console.log('')
  doc.pageBuilder?.forEach((b: any, i: number) => {
    console.log(`  ${i + 1}. ${b._type} — ${b.heading || b.headline || '(no heading)'}`)
  })

  const faqs = await client.fetch(
    `*[_type == "faq" && relatedPage._ref == $ref]{ _id, question, order }`,
    { ref: doc._id }
  )
  console.log('')
  console.log('FAQ documents pointing at this page:', faqs.length)
  faqs.forEach((f: any) => {
    console.log(`  - ${f._id}: ${f.question}`)
  })

  const faqRefs = await client.fetch(
    `*[_id == $id][0].relatedFaqs`,
    { id: doc._id }
  )
  console.log('')
  console.log('relatedFaqs array on service page:', faqRefs?.length ?? 0)
}

main().catch(console.error)
