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

const SLUG = 'google-search-ads-management-for-lead-generation'

async function main() {
  const page = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      _id,
      pageBuilder[]{ _key, _type, style, heading }
    }`,
    { slug: SLUG },
  )

  if (!page) {
    console.error('Search Ads page not found')
    process.exit(1)
  }

  console.log(`Found page: ${page._id}`)

  const saServices = page.pageBuilder?.find(
    (b: any) => b._type === 'cardGridSection' && b.heading?.includes('Turn High-Intent Searches'),
  )

  if (!saServices) {
    console.error('Could not find "Turn High-Intent Searches" cardGridSection')
    process.exit(1)
  }

  console.log(`Found section: _key="${saServices._key}", current style="${saServices.style}"`)

  await client
    .patch(page._id)
    .set({
      [`pageBuilder[_key=="${saServices._key}"].style`]: 'icon-grid',
    })
    .commit()

  console.log(`✓ Updated style from "${saServices.style}" to "icon-grid"`)

  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      pageBuilder[]{ _key, _type, style, heading }
    }`,
    { slug: SLUG },
  )

  const updated = verify.pageBuilder?.find((b: any) => b._key === saServices._key)
  console.log(`✓ Verified: style="${updated?.style}"`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
