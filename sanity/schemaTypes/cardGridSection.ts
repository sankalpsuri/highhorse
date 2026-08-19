import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cardGridSection',
  title: 'Card Grid Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Dashed border', value: 'dashed'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Cream', value: 'cream'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon', type: 'image', options: {hotspot: true}}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'badgeColor',
              title: 'Badge color',
              type: 'string',
              options: {
                list: [
                  {title: 'Mint', value: 'mint'},
                  {title: 'Peach', value: 'peach'},
                  {title: 'Lavender', value: 'lavender'},
                  {title: 'Gray', value: 'gray'},
                ],
              },
            }),
            defineField({
              name: 'bullets',
              title: 'Bullet points',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Card'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Card Grid Section', subtitle: 'Card Grid'}
    },
  },
})
