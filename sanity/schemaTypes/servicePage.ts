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
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description used in nav previews and cards.',
    }),
    defineField({
      name: 'accentStyle',
      title: 'Accent style',
      type: 'string',
      options: {
        list: [
          {title: 'Brand (single blue accent)', value: 'brand'},
          {title: 'Multi (rainbow badges & card backgrounds)', value: 'multi'},
        ],
      },
      description: 'Controls badge colors and case-study card backgrounds. Defaults to "brand" if unset.',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'textImageSection'},
        {type: 'cardGridSection'},
        {type: 'ctaSection'},
        {type: 'statsSection'},
        {type: 'processStepsSection'},
        {type: 'imageGallerySection'},
        {type: 'clientProofSection'},
        {type: 'portfolioMasonryGrid'},
        {type: 'challengeGridSection'},
        {type: 'checklistSection'},
        {type: 'portfolioShowcaseSection'},
        {type: 'techSliderSection'},
        {type: 'caseStudyCardsSection'},
      ],
    }),
    defineField({
      name: 'caseStudiesHeading',
      title: 'Case studies section heading',
      type: 'string',
      description: 'Override the default heading for the related case studies section.',
    }),
    defineField({
      name: 'caseStudiesSubtext',
      title: 'Case studies section subtext',
      type: 'text',
      rows: 3,
      description: 'Override the default subtext for the related case studies section.',
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related case studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'caseStudy',
              title: 'Case study',
              type: 'reference',
              to: [{type: 'caseStudy'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'overrideMetrics',
              title: 'Override metrics',
              type: 'array',
              description: 'Page-specific metrics shown instead of the base case study results.',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'value', title: 'Value', type: 'string'}),
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                  ],
                },
              ],
            }),
            defineField({
              name: 'metricsFilterTag',
              title: 'Metrics filter tag',
              type: 'string',
              description: 'Decorative label shown near the metric bar (e.g. "Daily").',
            }),
          ],
          preview: {
            select: {title: 'caseStudy.clientName'},
            prepare({title}) {
              return {title: title || 'Case Study'}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'FAQs for this page',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faq'}]}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', section: 'section'},
    prepare({title, section}) {
      return {title, subtitle: section}
    },
  },
})
