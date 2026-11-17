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

async function main() {
  const studies = await client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id, clientName,
      "hasCover": defined(coverImage.asset),
      coverImage { asset->{ _id, metadata { dimensions { width, height } } } }
    }`
  )
  for (const cs of studies) {
    const d = cs.coverImage?.asset?.metadata?.dimensions
    console.log(`${cs.clientName}: cover=${cs.hasCover ? `YES (${d?.width}x${d?.height})` : 'NO'}`)
  }
}

main().catch(console.error)
