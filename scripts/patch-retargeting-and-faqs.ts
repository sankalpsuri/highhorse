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

function answerBlock(text: string) {
  return [{
    _type: 'block' as const,
    _key: `a${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    style: 'normal' as const,
    markDefs: [],
    children: [{
      _type: 'span' as const,
      _key: `s${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      marks: [],
      text,
    }],
  }]
}

const faqAnswers: Record<string, string> = {
  // ── Voice SEO (3) ──────────────────────────────────────────
  'faq-voice-seo-2': // "Which types of businesses benefit most from Voice SEO?"
    'Voice SEO tends to deliver the strongest results for businesses with a local presence—restaurants, clinics, home services, retail stores—because voice queries often include "near me" or location-specific phrasing. Service-based businesses that answer common how-to or what-is questions also benefit, since voice assistants frequently pull from featured snippets and FAQ-style content. That said, any business whose customers ask natural-language questions about products, services, or availability can gain visibility through voice search optimisation.',

  'faq-voice-seo-3': // "How long does it take to see results from Voice SEO?"
    'Voice SEO is an extension of organic search optimisation, so timelines depend on factors like your current domain authority, content quality, and competition in your space. Some businesses see their content surfacing in voice results within a few weeks of structured-data and content updates, while more competitive industries may take several months of sustained effort. During a strategy call we can give a more specific outlook based on your current search presence.',

  'faq-voice-seo-4': // "Can Voice SEO improve local search visibility?"
    'Yes—voice search and local search are closely connected. A large share of voice queries are location-based ("best dentist near me," "plumber open now"), and voice assistants pull answers from Google Business Profiles, local packs, and schema-marked pages. Optimising for voice means ensuring your business information is accurate, your content answers location-relevant questions naturally, and your structured data is properly implemented—all of which strengthen local visibility in traditional search as well.',

  // ── Marketplace Optimisation (4) ───────────────────────────
  'I3Ef5RIrs4lB0Q3ZbQSwSM': // "How do I know if my listings need optimization?"
    'Common signs include declining impressions or click-through rates, listings that appear beyond the first page of marketplace search results, high traffic but low conversion rates, or product pages that lack complete attributes and keyword-rich descriptions. If competitors selling similar products consistently outrank you, that is another strong indicator. We typically start with a listing audit that benchmarks your current performance against category leaders to identify specific gaps.',

  'tUgkK4x2jCQXvq6Lz92VGv': // "How long does it take to see results from listing optimization?"
    'Initial improvements in search visibility and click-through rates often appear within the first few weeks after optimised listings go live, since marketplace algorithms re-index updated content relatively quickly. Conversion rate gains can take longer to stabilise as you accumulate reviews and sales velocity on the updated listings. The exact timeline depends on the marketplace, category competitiveness, and how far the current listings are from best practice—factors we assess during the initial audit.',

  'tUgkK4x2jCQXvq6Lz92VXN': // "What are backend keywords in marketplace listings?"
    'Backend keywords are hidden search terms you add to a product listing that customers never see, but the marketplace algorithm uses them for indexing. They let you capture alternate spellings, synonyms, abbreviations, and related terms that do not fit naturally in your title or bullet points. Proper backend keyword strategy helps your product surface for a wider range of relevant searches without cluttering the customer-facing copy.',

  'tUgkK4x2jCQXvq6Lz92Uqb': // "Why are my marketplace listings not generating sales?"
    'Low sales despite traffic usually points to issues with pricing competitiveness, weak product images, missing or unconvincing bullet points, few reviews, or poor answers to customer questions. Low traffic specifically suggests a search-visibility problem—your listing may lack the right keywords, have incomplete category attributes, or carry insufficient sales history for the algorithm to rank it. Often it is a combination of factors, which is why a full listing audit is the most efficient way to diagnose what is holding performance back.',

  // ── Shopping Ads (1) ───────────────────────────────────────
  'sZarkGCWKodXiPseaVHokw': // "What is product feed optimization and why is it important?"
    'Product feed optimisation is the process of refining the data you send to platforms like Google Merchant Center—titles, descriptions, images, pricing, attributes, and category mappings—so your products appear in the most relevant shopping searches. A well-optimised feed improves ad relevance, which leads to better placement, higher click-through rates, and lower cost per click. Without it, your ads may show for the wrong queries or not show at all, regardless of your bidding strategy.',
}

async function main() {
  // ── TASK 2: Remove "Turn Missed Opportunities" section from Retargeting ──
  console.log('=== TASK 2: Removing case studies section from Retargeting page ===')
  const retargeting = await client.fetch(
    `*[_type == "servicePage" && slug.current == "retargeting-and-remarketing-ad-campaign-services"][0]{ _id }`,
  )
  if (retargeting) {
    await client
      .patch(retargeting._id)
      .unset(['caseStudiesHeading', 'caseStudiesSubtext', 'relatedCaseStudies'])
      .commit()
    console.log(`  Cleared caseStudiesHeading, caseStudiesSubtext, relatedCaseStudies on ${retargeting._id}`)
  } else {
    console.log('  WARNING: Retargeting page not found')
  }

  // Verify
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == "retargeting-and-remarketing-ad-campaign-services"][0]{
      caseStudiesHeading, caseStudiesSubtext, "hasCaseStudies": defined(relatedCaseStudies)
    }`,
  )
  console.log(`  After patch: heading=${verify?.caseStudiesHeading ?? 'null'}, hasCaseStudies=${verify?.hasCaseStudies}\n`)

  // ── TASK 4: Fill in TODO FAQ answers ──────────────────────────────────────
  console.log('=== TASK 4: Updating TODO FAQ answers ===')
  for (const [docId, answer] of Object.entries(faqAnswers)) {
    await client
      .patch(docId)
      .set({ answer: answerBlock(answer) })
      .commit()

    const updated = await client.fetch(
      `*[_id == $id][0]{ question, "answerPreview": answer[0].children[0].text, "linkedPages": relatedPages[]->{ title } }`,
      { id: docId },
    )
    console.log(`  Updated: "${updated.question}"`)
    console.log(`    Page: ${updated.linkedPages?.map((p: any) => p.title).join(', ') || 'none'}`)
    console.log(`    Answer: ${updated.answerPreview?.slice(0, 80)}...`)
  }

  console.log(`\nDone — ${Object.keys(faqAnswers).length} FAQs updated, retargeting section removed.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
