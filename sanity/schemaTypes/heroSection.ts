import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({name: 'badgeText', title: 'Badge text', type: 'string', description: 'e.g. "Certified Google Partner"'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3}),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string', description: 'Internal path or external URL'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'Hero Section', subtitle: 'Hero'}
    },
  },
})
