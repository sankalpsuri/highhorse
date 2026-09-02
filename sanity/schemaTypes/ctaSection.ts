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
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Tan', value: 'tan'}, {title: 'Blue', value: 'blue'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Center', value: 'center'}]},
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'CTA Section', subtitle: 'CTA'}
    },
  },
})
