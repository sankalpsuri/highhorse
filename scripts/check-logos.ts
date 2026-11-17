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
    `*[_type == "caseStudy" && defined(logo.asset)] | order(publishedAt desc) {
      _id, clientName,
      logo { asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } } }
    }`
  )

  for (const cs of studies) {
    const d = cs.logo?.asset?.metadata?.dimensions
    console.log(`${cs.clientName}`)
    console.log(`  asset: ${cs.logo?.asset?._id}`)
    console.log(`  dims: ${d?.width}x${d?.height}  ratio: ${d?.aspectRatio?.toFixed(2)}`)
    console.log()
  }
}

main().catch(console.error)
