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
        badgeStyle,
        headline,
        subheadline,
        ctaText,
        ctaLink,
        heroImage{ ..., asset-> },
        textAlign
      },
      _type == "textImageSection" => {
        heading,
        headingBordered,
        bodyText,
        bullets,
        bulletStyle,
        closingText,
        ctaText,
        ctaLink,
        ctaStyle,
        image{ ..., asset-> },
        imagePosition
      },
      _type == "cardGridSection" => {
        heading,
        subtext,
        style,
        background,
        columns,
        tintStyle,
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
        variant,
        textAlign
      },
      _type == "statsSection" => {
        heading,
        bodyText,
        layout,
        theme,
        stats[]{ _key, value, label }
      },
      _type == "processStepsSection" => {
        heading,
        headingBordered,
        subtext,
        columns,
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
      },
      _type == "portfolioMasonryGrid" => {
        heading,
        subtext,
        items[]{ _key, image{ ..., asset-> }, badgeText, mediaType }
      },
      _type == "challengeGridSection" => {
        layout,
        heading,
        subtext,
        ctaText,
        ctaLink,
        challenges
      },
      _type == "checklistSection" => {
        layout,
        heading,
        subtext,
        items,
        image{ ..., asset-> },
        imagePosition
      },
      _type == "portfolioShowcaseSection" => {
        heading,
        subtext,
        items[]{ _key, tag, title, description, image{ ..., asset-> } }
      },
      _type == "techSliderSection" => {
        heading,
        subtext,
        logos[]{ _key, name, image{ ..., asset-> }, displayText, bgColor, textColor }
      },
      _type == "caseStudyCardsSection" => {
        heading,
        subtext,
        cards[]{ _key, clientName, badgeColor, resultChartImage{ ..., asset-> }, results }
      },
      _type == "videoShowcaseSection" => {
        heading,
        subtext,
        videoUrl,
        videoFile{ asset->{ url } },
        posterImage{ ..., asset-> }
      }
    },
    caseStudiesHeading,
    caseStudiesSubtext,
    relatedCaseStudies[]{
      _key,
      metricsFilterTag,
      overrideMetrics[]{ value, label },
      caseStudy->{ clientName, "slug": slug.current, industry, summary, logo{ ..., asset-> }, coverImage{ ..., asset-> }, resultImages[]{ ..., asset-> }, results[]{ value, label }, proofImage{ ..., asset-> } }
    },
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
    seo,
    "otherCaseStudies": *[_type == "caseStudy" && slug.current != $slug] | order(publishedAt desc)[0...3]{
      _id,
      clientName,
      "slug": slug.current,
      summary,
      coverImage{ ..., asset-> }
    }
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

export const caseStudiesListingQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc){
    _id,
    clientName,
    "slug": slug.current,
    industry,
    summary,
    logo{ ..., asset-> },
    coverImage{ ..., asset-> },
    results[]{ value, label }
  }
`

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
  *[_type == "faq" && $pageId in relatedPages[]._ref] | order(order asc){
    _id,
    question,
    answer,
    category
  }
`

// ── All FAQs (for /faq listing page) ──────────────────────────

export const allFaqsQuery = groq`
  *[_type == "faq"] | order(order asc){
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
