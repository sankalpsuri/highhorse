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
    summary,
    accentStyle,
    pageBuilder[]{
      _type,
      _key,
      _type == "heroSection" => {
        badgeText,
        headline,
        subheadline,
        ctaText,
        ctaLink,
        heroImage{ ..., asset-> }
      },
      _type == "textImageSection" => {
        heading,
        bodyText,
        bullets,
        closingText,
        image{ ..., asset-> },
        imagePosition
      },
      _type == "cardGridSection" => {
        heading,
        subtext,
        style,
        background,
        cards[]{
          _key,
          icon{ ..., asset-> },
          title,
          description,
          badgeColor,
          bullets
        }
      },
      _type == "ctaSection" => {
        heading,
        bodyText,
        ctaText,
        ctaLink,
        variant
      },
      _type == "statsSection" => {
        heading,
        bodyText,
        layout,
        stats[]{ _key, value, label }
      },
      _type == "processStepsSection" => {
        heading,
        subtext,
        steps[]{ _key, stepTitle, stepDescription }
      },
      _type == "imageGallerySection" => {
        heading,
        bodyText,
        images[]{ _key, image{ ..., asset-> }, caption }
      },
      _type == "clientProofSection" => {
        heading,
        bodyText
      }
    },
    relatedCaseStudies[]->{ clientName, "slug": slug.current, industry, summary, logo{ ..., asset-> }, coverImage{ ..., asset-> }, resultImages[]{ ..., asset-> }, results[]{ value, label } },
    relatedFaqs[]->{ _id, question, answer, order },
    seo
  }
`

export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    clientName,
    "slug": slug.current,
    logo{ ..., asset-> },
    coverImage{ ..., asset-> },
    resultImages[]{ ..., asset-> },
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
    relatedCaseStudies[]->{ clientName, "slug": slug.current, industry, summary, logo{ ..., asset-> }, coverImage{ ..., asset-> }, resultImages[]{ ..., asset-> }, results[]{ value, label } },
    ctaText,
    seo
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    author->{ name, role, image{ ..., asset-> } },
    mainImage{ ..., asset-> },
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
    mainImage{ ..., asset-> },
    categories,
    publishedAt,
    excerpt,
    author->{ name, image{ ..., asset-> } }
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

// ── Homepage sections ─────────────────────────────────────────

export const homeFeaturedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0...9]{
    _id,
    clientName,
    "slug": slug.current,
    industry,
    summary,
    coverImage{ ..., asset-> }
  }
`

export const homeGeneralFaqsQuery = groq`
  *[_type == "faq" && category == "general"] | order(order asc){
    _id,
    question,
    answer
  }
`
