import {type SchemaTypeDefinition} from 'sanity'

import blockContent from './blockContent'
import seo from './seo'
import author from './author'
import blogPost from './blogPost'
import servicePage from './servicePage'
import caseStudy from './caseStudy'
import faq from './faq'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // reusable objects
    blockContent,
    seo,
    // documents
    author,
    blogPost,
    servicePage,
    caseStudy,
    faq,
  ],
}