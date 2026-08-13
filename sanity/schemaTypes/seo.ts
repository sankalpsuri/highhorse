import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Aim for under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Longer titles get truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Aim for under 155 characters.',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions get truncated in search results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
