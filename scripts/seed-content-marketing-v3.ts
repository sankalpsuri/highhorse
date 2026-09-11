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

const PAGE_ID = 'servicePage-content-marketing'

function key() {
  return Math.random().toString(36).slice(2, 10)
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{ _id, pageBuilder }`,
    { id: PAGE_ID },
  )
  if (!doc) {
    console.error('Content Marketing page not found')
    process.exit(1)
  }

  const pb: any[] = doc.pageBuilder || []
  let sectionLog: string[] = []

  const updated = pb.map((b: any) => {
    // ── 1. Hero — add eyebrowText ──
    if (b._type === 'heroSection') {
      sectionLog.push('1. Hero: eyebrowText "Content Marketing Services"')
      return { ...b, eyebrowText: 'Content Marketing Services' }
    }

    // ── 2. Work With — add eyebrow ──
    if (b._type === 'textImageSection' && b.heading?.includes('Work With')) {
      sectionLog.push('2. Work With: eyebrow "Content built for the whole journey"')
      return { ...b, eyebrow: 'Content built for the whole journey' }
    }

    // ── 3. Problems — convert textImageSection → challengeGridSection ──
    if (b._type === 'textImageSection' && b.heading?.includes('Looking for Content Marketing Services')) {
      sectionLog.push('3. Problems: converted textImageSection → challengeGridSection (inline-cta, compact, 8 amber cards)')
      return {
        _type: 'challengeGridSection',
        _key: key(),
        heading: b.heading,
        subtext: 'Most businesses don\'t start looking for a content marketing agency unless their current content is not producing results. Many brands publish content regularly but still struggle with traffic, engagement, and conversions.',
        headerLayout: 'inline-cta',
        cardStyle: 'compact',
        background: 'white',
        ctaText: b.ctaText || 'Talk to SEO Expert',
        ctaLink: b.ctaLink || '/contact-search-performance-marketing-agency',
        challenges: b.bullets || [
          'Your website content does not rank on Google',
          'Blog posts get published but attract very little traffic',
          'Your competitors dominate search results for important topics',
          'Visitors read your content but don\'t convert into leads',
          'Your content lacks a clear strategy or direction',
          'Your brand message feels inconsistent across platforms',
          'Your content is not optimized for SEO or search intent',
          'Your team spends time creating content without measurable results',
        ],
        cardColors: ['amber', 'amber', 'amber', 'amber', 'amber', 'amber', 'amber', 'amber'],
      }
    }

    // ── 4. Challenges — dark style, eyebrow (icons preserved via spread) ──
    if (b._type === 'cardGridSection' && b.heading?.includes('Challenges Behind')) {
      sectionLog.push('4. Challenges: style "dark", eyebrow "Root cause, not symptoms"')
      return { ...b, style: 'dark', eyebrow: 'Root cause, not symptoms' }
    }

    // ── 5. More Than Writing — remove imagePosition (no image rendered), add eyebrow ──
    if (b._type === 'textImageSection' && b.heading?.includes('More Than Writing')) {
      sectionLog.push('5. More Than Writing: imagePosition removed (image ref kept), eyebrow "Beyond word count"')
      const { imagePosition, ...rest } = b
      return { ...rest, eyebrow: 'Beyond word count' }
    }

    // ── 6. Case Studies — eyebrow, split header (chart images untouched) ──
    if (b._type === 'caseStudyCardsSection') {
      sectionLog.push('6. Case Studies: eyebrow "Evidence over claims", headerLayout "split"')
      return { ...b, eyebrow: 'Evidence over claims', headerLayout: 'split' }
    }

    // ── 7. Content Services — add eyebrow ──
    if (b._type === 'cardGridSection' && b.heading?.includes('Content Marketing Services Designed')) {
      sectionLog.push('7. Content Services: eyebrow "What we do"')
      return { ...b, eyebrow: 'What we do' }
    }

    // ── 8. CTA — blue variant ──
    if (b._type === 'ctaSection') {
      sectionLog.push('8. CTA: variant "blue"')
      return { ...b, variant: 'blue' }
    }

    // ── 9. Process — eyebrow, split header, unified container ──
    if (b._type === 'processStepsSection') {
      sectionLog.push('9. Process: eyebrow "How we work", headerLayout "split", containerStyle "unified"')
      return { ...b, eyebrow: 'How we work', headerLayout: 'split', containerStyle: 'unified' }
    }

    // ── 10. Stats — add eyebrow ──
    if (b._type === 'statsSection') {
      sectionLog.push('10. Stats: eyebrow "Why choose us"')
      return { ...b, eyebrow: 'Why choose us' }
    }

    // ── 11. Approach vs The Rest — dark comparison panels ──
    if (b._type === 'cardGridSection' && b.heading?.includes('Approach')) {
      sectionLog.push('11. Approach: style "dark", eyebrow "Where we differ", comparison panel badgeColors')
      return {
        ...b,
        style: 'dark',
        eyebrow: 'Where we differ',
        cards: b.cards?.map((card: any, i: number) => ({
          ...card,
          badgeColor: i === 0 ? 'gray' : 'amber',
        })),
      }
    }

    return b
  })

  // ── 12. FAQ — faqEyebrow only ──
  sectionLog.push('12. FAQ: faqEyebrow "Before you ask"')

  await client
    .patch(PAGE_ID)
    .set({
      pageBuilder: updated,
      faqEyebrow: 'Before you ask',
    })
    .commit()

  console.log('✓ All sections updated:\n')
  for (const line of sectionLog) console.log(`  ${line}`)

  // ── Verify ──
  const final = await client.fetch(
    `*[_type == "servicePage" && _id == $id][0]{
      faqEyebrow,
      "sectionCount": count(pageBuilder),
      "sectionTypes": pageBuilder[]._type,
      "heroEyebrow": pageBuilder[_type == "heroSection"][0].eyebrowText,
      "challengeStyle": pageBuilder[_type == "cardGridSection" && heading match "*Challenges*"][0].style,
      "challengeIconCount": count(pageBuilder[_type == "cardGridSection" && heading match "*Challenges*"][0].cards[defined(icon.asset)]),
      "comparisonStyle": pageBuilder[_type == "cardGridSection" && heading match "*Approach*"][0].style,
      "comparisonBadges": pageBuilder[_type == "cardGridSection" && heading match "*Approach*"][0].cards[].badgeColor,
      "ctaVariant": pageBuilder[_type == "ctaSection"][0].variant,
      "processLayout": pageBuilder[_type == "processStepsSection"][0]{ headerLayout, containerStyle },
      "caseStudyCharts": pageBuilder[_type == "caseStudyCardsSection"][0].cards[]{clientName, "hasChart": defined(resultChartImage.asset)},
      "moreThanWritingHasImagePos": defined(pageBuilder[_type == "textImageSection" && heading match "*More Than*"][0].imagePosition),
      "moreThanWritingHasImageRef": defined(pageBuilder[_type == "textImageSection" && heading match "*More Than*"][0].image.asset),
      "faqCount": count(relatedFaqs)
    }`,
    { id: PAGE_ID },
  )
  console.log('\n── Verification ──')
  console.log(JSON.stringify(final, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
