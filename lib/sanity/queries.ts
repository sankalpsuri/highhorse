import { groq } from 'next-sanity'

// ── Slugs for generateStaticParams ─────────────────────────────

export const servicePageSlugsQuery = groq`
  *[_type == "servicePage"]{ "slug": slug.current }
`

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy"]{ "slug": slug.current }
`

export const industryPageSlugsQuery = groq`
  *[_type == "industryPage"]{ "slug": slug.current }
`

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost"]{ "slug": slug.current }
`

// ── Single-document queries ────────────────────────────────────

export const servicePageQuery = groq`
  *[_type == "servicePage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    section,
    heroHeadline,
    heroSubheadline,
    summary,
    processSteps[]{ stepTitle, stepDescription },
    resultsStats[]{ value, label },
    body,
    relatedCaseStudies[]->{ clientName, "slug": slug.current, industry, summary, coverImage },
    relatedFaqs[]->{ question, answer, order },
    ctaText,
    seo
  }
`

export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    clientName,
    "slug": slug.current,
    logo,
    coverImage,
    industry,
    summary,
    challenge,
    solution,
    results[]{ value, label },
    testimonial{ quote, personName, personRole },
    relatedServices[]->{ title, "slug": slug.current, summary },
    publishedAt,
    seo
  }
`

export const industryPageQuery = groq`
  *[_type == "industryPage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    heroHeadline,
    heroSubheadline,
    overview,
    challenges[]{ challengeTitle, challengeDescription },
    body,
    relatedServices[]->{ title, "slug": slug.current, summary },
    relatedCaseStudies[]->{ clientName, "slug": slug.current, industry, summary, coverImage },
    ctaText,
    seo
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    author->{ name, role, image },
    mainImage,
    categories,
    publishedAt,
    excerpt,
    body,
    seo
  }
`

// ── Listing queries ────────────────────────────────────────────

export const blogListingQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    mainImage,
    categories,
    publishedAt,
    excerpt,
    author->{ name, image }
  }
`

// ── FAQs by page ───────────────────────────────────────────────

export const faqsByPageQuery = groq`
  *[_type == "faq" && relatedPage._ref == $pageId] | order(order asc){
    _id,
    question,
    answer,
    category
  }
`
