import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textImageSection',
  title: 'Text + Image Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'bodyText', title: 'Body text', type: 'blockContent'}),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Text + Image Section', subtitle: 'Text + Image'}
    },
  },
})
