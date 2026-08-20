import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'portfolioMasonryGrid',
  title: 'Portfolio Masonry Grid',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badgeText',
              title: 'Badge text',
              type: 'string',
              description: 'Optional overlay badge (e.g. a discount label or "▶" for video).',
            }),
            defineField({
              name: 'mediaType',
              title: 'Media type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video thumbnail', value: 'video-thumbnail'},
                ],
              },
              initialValue: 'image',
            }),
          ],
          preview: {
            select: {title: 'badgeText', media: 'image'},
            prepare({title, media}) {
              return {title: title || 'Item', media}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Portfolio Masonry Grid', subtitle: 'Masonry Grid'}
    },
  },
})
