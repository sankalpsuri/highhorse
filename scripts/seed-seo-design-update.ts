import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-09-07',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const SEO_SLUG = 'search-engine-optimization-seo-growth-services'

function blockText(text: string) {
  return [
    {
      _type: 'block',
      _key: crypto.randomUUID().slice(0, 8),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: crypto.randomUUID().slice(0, 8),
          text,
          marks: [],
        },
      ],
    },
  ]
}

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
  console.log(`Found SEO page: ${doc._id}`)

  const pb: any[] = doc.pageBuilder || []

  const updated = pb.map((b: any) => {
    switch (b._key) {
      case 'hero-1':
        return {
          ...b,
          eyebrowText: 'SEO Growth Services',
        }

      case 'text-agency-1':
        return {
          ...b,
          eyebrow: 'Modern search, one strategy',
        }

      case 'text-agency-2':
        return {
          _type: 'challengeGridSection',
          _key: 'text-agency-2',
          eyebrow: 'Sound familiar?',
          heading: "Looking for a Better SEO Agency? You're Probably Facing These Problems",
          subtext: 'If you are searching for a reliable SEO agency, it usually means your current SEO strategy is not delivering the results you expected. Many businesses struggle with low rankings, poor organic traffic, and overdependence on paid ads. If your website is not attracting consistent leads from Google search results, it may be time to rethink your SEO approach.',
          ctaText: 'Talk to SEO Expert',
          ctaLink: '/contact-search-performance-marketing-agency',
          headerLayout: 'inline-cta',
          background: 'white',
          cardStyle: 'compact',
          cardColors: ['amber', 'amber', 'amber', 'amber', 'amber', 'amber', 'amber', 'amber'],
          challenges: [
            'Your website is not ranking on Google for important keywords related to your business.',
            'Most of your leads come only from paid ads, not organic search traffic.',
            'Your current SEO agency is not delivering measurable SEO results.',
            'Your website traffic has stopped growing or is declining over time.',
            'Competitors consistently appear above your business in search results.',
            'Your website is not optimized for modern SEO, AI search, or voice search.',
            'You receive SEO reports but see little real business impact.',
            'Your SEO strategy focuses on rankings but not actual leads or conversions.',
          ],
        }

      case 'card-problems':
        return {
          ...b,
          style: 'dark',
          eyebrow: 'Root cause, not symptoms',
          subtext: 'Many businesses invest in SEO but still struggle to rank on Google or generate consistent organic traffic. In most cases, the issue comes from weak SEO foundations, poor keyword strategy, or outdated optimization methods.',
        }

      case 'text-systems':
        return {
          ...b,
          eyebrow: 'Built for the long term',
        }

      case 'card-services':
        return {
          ...b,
          eyebrow: 'What we do',
          headerLayout: 'split',
          heading: 'SEO Services Built for Ranking Top on Google',
        }

      case 'stats-1':
        return {
          ...b,
          eyebrow: 'Why Delhi NCR businesses choose us',
        }

      case 'cta-1':
        return {
          ...b,
          variant: 'blue',
          bodyText: blockText('Connect with a team that believes in honest strategies, transparent reporting, and measurable results that genuinely move your business forward.'),
        }

      case 'process-1':
        return {
          ...b,
          eyebrow: 'How we work',
          headerLayout: 'split',
          containerStyle: 'unified',
          subtext: 'Our proven SEO process combines research, strategy, optimization, and continuous tracking to improve rankings, drive traffic, and maximize long-term growth.',
        }

      case 'cs-cards-1':
        return {
          ...b,
          eyebrow: 'Evidence over claims',
          headerLayout: 'split',
        }

      default:
        return b
    }
  })

  await client
    .patch(doc._id)
    .set({
      pageBuilder: updated,
      faqEyebrow: 'Before you ask',
    })
    .commit()

  console.log('✓ pageBuilder updated with design changes')
  console.log('✓ faqEyebrow set to "Before you ask"')

  const final = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      "sectionCount": count(pageBuilder),
      "sectionTypes": pageBuilder[]._type,
      faqEyebrow,
      pageBuilder[]{_key, _type, eyebrow, eyebrowText, heading, headline, headerLayout, style, variant, containerStyle, background, cardStyle}
    }`,
    { slug: SEO_SLUG },
  )
  console.log('\n── Verification ──')
  console.log(`Sections: ${final.sectionCount}`)
  console.log(`Types: ${final.sectionTypes.join(', ')}`)
  console.log(`FAQ eyebrow: ${final.faqEyebrow}`)
  console.log('\nPer-section details:')
  for (const s of final.pageBuilder) {
    const parts = [`  ${s._key} (${s._type})`]
    if (s.eyebrow) parts.push(`eyebrow="${s.eyebrow}"`)
    if (s.eyebrowText) parts.push(`eyebrowText="${s.eyebrowText}"`)
    if (s.headerLayout) parts.push(`headerLayout="${s.headerLayout}"`)
    if (s.style) parts.push(`style="${s.style}"`)
    if (s.variant) parts.push(`variant="${s.variant}"`)
    if (s.containerStyle) parts.push(`containerStyle="${s.containerStyle}"`)
    if (s.background) parts.push(`background="${s.background}"`)
    if (s.cardStyle) parts.push(`cardStyle="${s.cardStyle}"`)
    console.log(parts.join(' | '))
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
