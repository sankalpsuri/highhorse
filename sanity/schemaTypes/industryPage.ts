import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Industry name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'heroHeadline', title: 'Hero headline', type: 'string'}),
    defineField({name: 'heroSubheadline', title: 'Hero subheadline', type: 'text', rows: 2}),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 3,
      description: 'Short description of the industry and how High Horse serves it.',
    }),
    defineField({
      name: 'challenges',
      title: 'Industry challenges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'challengeTitle', title: 'Challenge', type: 'string'},
            {name: 'challengeDescription', title: 'Description', type: 'text', rows: 2},
          ],
        },
      ],
    }),
    defineField({name: 'body', title: 'Full description', type: 'blockContent'}),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'servicePage'}]}],
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related case studies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string', initialValue: 'Get in touch'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title, subtitle: 'Industry'}
    },
  },
})
