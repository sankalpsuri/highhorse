import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({name: 'clientName', title: 'Client name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'clientName', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'logo', title: 'Client logo', type: 'image'}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'resultImages',
      title: 'Result images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(3),
      description: 'Up to 3 proof screenshots (e.g. SERP rankings, analytics).',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          {title: 'Finance (BFSI)', value: 'bfsi'},
          {title: 'Ecommerce & Retail', value: 'ecommerce-retail'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Education', value: 'education'},
          {title: 'Travel & Tourism', value: 'travel-tourism'},
          {title: 'Logistics', value: 'logistics'},
          {title: 'Real Estate', value: 'real-estate'},
          {title: 'SaaS', value: 'saas'},
        ],
      },
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3}),
    defineField({name: 'challenge', title: 'The challenge', type: 'blockContent'}),
    defineField({name: 'solution', title: 'The solution', type: 'blockContent'}),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string', description: 'e.g. "212%"'},
            {name: 'label', title: 'Label', type: 'string', description: 'e.g. "increase in qualified leads"'},
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', title: 'Quote', type: 'text', rows: 3},
        {name: 'personName', title: 'Name', type: 'string'},
        {name: 'personRole', title: 'Role / company', type: 'string'},
      ],
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'servicePage'}]}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      description: 'Show this case study in the homepage grid (max 9 shown).',
      initialValue: false,
    }),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'clientName', industry: 'industry', media: 'coverImage'},
    prepare({title, industry, media}) {
      return {title, subtitle: industry, media}
    },
  },
})
