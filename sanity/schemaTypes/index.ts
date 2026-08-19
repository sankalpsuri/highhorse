import {type SchemaTypeDefinition} from 'sanity'

import blockContent from './blockContent'
import seo from './seo'
import author from './author'
import blogPost from './blogPost'
import servicePage from './servicePage'
import caseStudy from './caseStudy'
import faq from './faq'
import industryPage from './industryPage'
import heroSection from './heroSection'
import textImageSection from './textImageSection'
import cardGridSection from './cardGridSection'
import ctaSection from './ctaSection'
import statsSection from './statsSection'
import processStepsSection from './processStepsSection'
import imageGallerySection from './imageGallerySection'
import clientProofSection from './clientProofSection'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // reusable objects
    blockContent,
    seo,
    heroSection,
    textImageSection,
    cardGridSection,
    ctaSection,
    statsSection,
    processStepsSection,
    imageGallerySection,
    clientProofSection,
    // documents
    author,
    blogPost,
    servicePage,
    caseStudy,
    faq,
    industryPage,
  ],
}
