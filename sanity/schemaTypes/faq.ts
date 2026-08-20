import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'SEO', value: 'seo'},
          {title: 'Performance Marketing', value: 'performance-marketing'},
          {title: 'Pricing & process', value: 'pricing-process'},
        ],
      },
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related service pages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'servicePage'}]}],
      description: 'Service pages where this FAQ should appear.',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first.',
    }),
  ],
  preview: {
    select: {title: 'question', category: 'category'},
    prepare({title, category}) {
      return {title, subtitle: category}
    },
  },
})
