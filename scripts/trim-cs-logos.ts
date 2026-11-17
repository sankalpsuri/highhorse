import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-13',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const TMP = path.join(process.cwd(), 'scripts', '_logo-tmp')

async function main() {
  if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true })

  const studies = await client.fetch<
    { _id: string; clientName: string; logo: any }[]
  >(`*[_type == "caseStudy" && defined(logo.asset)]{ _id, clientName, logo{ asset->{ _id, url, originalFilename, mimeType } } }`)

  console.log(`Found ${studies.length} case studies with logos\n`)

  for (const cs of studies) {
    const asset = cs.logo.asset
    if (!asset?.url) {
      console.log(`⚠ ${cs.clientName}: no logo URL, skipping`)
      continue
    }

    console.log(`── ${cs.clientName} ──`)
    console.log(`  Original asset: ${asset._id}`)

    // Download
    const resp = await fetch(asset.url)
    const buf = Buffer.from(await resp.arrayBuffer())
    const ext = asset.mimeType?.includes('png') ? 'png' : asset.mimeType?.includes('svg') ? 'svg' : 'png'

    if (ext === 'svg') {
      console.log(`  SVG logo — skipping trim (vector)`)
      continue
    }

    const origPath = path.join(TMP, `${cs.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_orig.${ext}`)
    fs.writeFileSync(origPath, buf)

    const meta = await sharp(buf).metadata()
    console.log(`  Original: ${meta.width}x${meta.height}`)

    // Trim transparent/white margins
    const trimmed = await sharp(buf)
      .trim({ threshold: 20 })
      .toBuffer()

    const trimMeta = await sharp(trimmed).metadata()
    console.log(`  Trimmed:  ${trimMeta.width}x${trimMeta.height}`)

    if (trimMeta.width === meta.width && trimMeta.height === meta.height) {
      console.log(`  No margins to trim, skipping upload`)
      continue
    }

    const trimPath = path.join(TMP, `${cs.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_trimmed.${ext}`)
    fs.writeFileSync(trimPath, trimmed)

    // Upload trimmed version
    const uploaded = await client.assets.upload('image', trimmed, {
      filename: `${cs.clientName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-logo-trimmed.${ext}`,
      contentType: asset.mimeType || 'image/png',
    })

    console.log(`  Uploaded: ${uploaded._id}`)

    // Patch the case study to use the trimmed logo
    await client
      .patch(cs._id)
      .set({
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: uploaded._id },
        },
      })
      .commit()

    console.log(`  ✓ Patched ${cs.clientName}\n`)
  }

  console.log('\nDone! Original logos preserved in Sanity asset library.')
  console.log(`Temp files in: ${TMP}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
