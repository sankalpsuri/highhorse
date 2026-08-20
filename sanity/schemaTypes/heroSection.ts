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
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Center', value: 'center'}]},
      initialValue: 'left',
    }),
    defineField({
      name: 'badgeStyle',
      title: 'Badge style',
      type: 'string',
      options: {list: [{title: 'Google Partner', value: 'partner'}, {title: 'Eyebrow', value: 'eyebrow'}]},
      initialValue: 'partner',
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'Hero Section', subtitle: 'Hero'}
    },
  },
})
