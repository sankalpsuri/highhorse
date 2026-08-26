import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'techSliderSection',
  title: 'Tech Slider Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'logos',
      title: 'Technology logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'image', title: 'Logo image', type: 'image', description: 'Logo image file. Overrides display text when set.'}),
            defineField({name: 'displayText', title: 'Display text or emoji', type: 'string', description: 'Emoji or short text shown in the tile (fallback when no image).'}),
            defineField({name: 'bgColor', title: 'Background color', type: 'string', description: 'Hex color for tile background (e.g. #111 for dark).'}),
            defineField({name: 'textColor', title: 'Text color', type: 'string', description: 'Hex color for tile text/emoji.'}),
          ],
          preview: {
            select: {title: 'name'},
            prepare({title}) {
              return {title: title || 'Logo'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Tech Slider', subtitle: 'Tech Slider'}
    },
  },
})
