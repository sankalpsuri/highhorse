import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'bodyText', title: 'Body text', type: 'blockContent'}),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'CTA Section', subtitle: 'CTA'}
    },
  },
})
