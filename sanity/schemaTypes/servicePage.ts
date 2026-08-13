import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Service name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Nav section',
      type: 'string',
      options: {
        list: [
          {title: 'Services', value: 'services'},
          {title: 'Performance Marketing', value: 'performance-marketing'},
          {title: 'Experience & Systems', value: 'experience-systems'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'heroHeadline', title: 'Hero headline', type: 'string'}),
    defineField({name: 'heroSubheadline', title: 'Hero subheadline', type: 'text', rows: 2}),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description used in nav previews and cards.',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stepTitle', title: 'Step title', type: 'string'},
            {name: 'stepDescription', title: 'Step description', type: 'text', rows: 2},
          ],
        },
      ],
    }),
    defineField({
      name: 'resultsStats',
      title: 'Results / stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string', description: 'e.g. "38%"'},
            {name: 'label', title: 'Label', type: 'string', description: 'e.g. "avg. increase in organic traffic"'},
          ],
        },
      ],
    }),
    defineField({name: 'body', title: 'Full description', type: 'blockContent'}),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related case studies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'FAQs for this page',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faq'}]}],
    }),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string', initialValue: 'Get in touch'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', section: 'section'},
    prepare({title, section}) {
      return {title, subtitle: section}
    },
  },
})
