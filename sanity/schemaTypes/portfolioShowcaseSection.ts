import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'portfolioShowcaseSection',
  title: 'Portfolio Showcase Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      title: 'Portfolio items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'tag', title: 'Tag', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Cover image', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Item'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Portfolio Showcase', subtitle: 'Portfolio Showcase'}
    },
  },
})
