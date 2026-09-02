import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cardGridSection',
  title: 'Card Grid Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small uppercase label above the heading.'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'headerLayout',
      title: 'Header layout',
      type: 'string',
      options: {list: [{title: 'Stacked', value: 'stacked'}, {title: 'Split (heading left, subtext right)', value: 'split'}]},
      initialValue: 'stacked',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Dashed border', value: 'dashed'}, {title: 'Clean (no borders)', value: 'clean'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Cream', value: 'cream'}, {title: 'White', value: 'white'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Fixed column count. Leave empty for auto-fit.',
    }),
    defineField({
      name: 'tintStyle',
      title: 'Tint style',
      type: 'string',
      options: {
        list: [
          {title: 'Badge only', value: 'badge'},
          {title: 'Full card background', value: 'full'},
        ],
      },
      description: 'Controls how badgeColor is applied. "badge" tints only the icon badge; "full" tints the entire card background.',
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
                  {title: 'Blue', value: 'blue'},
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
