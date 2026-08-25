import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textImageSection',
  title: 'Text + Image Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'headingBordered',
      title: 'Bordered heading',
      type: 'boolean',
      description: 'Wrap heading in a thin brand-blue border box.',
    }),
    defineField({name: 'bodyText', title: 'Body text', type: 'blockContent'}),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'bulletStyle',
      title: 'Bullet style',
      type: 'string',
      options: {
        list: [
          {title: 'Divider rows', value: 'divider'},
          {title: 'Stacked (bold title + description)', value: 'stacked'},
        ],
      },
      description: 'How bullets render. "stacked" splits on " — " to show bold title above description.',
    }),
    defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3}),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string'}),
    defineField({
      name: 'ctaStyle',
      title: 'CTA button style',
      type: 'string',
      options: {
        list: [
          {title: 'Pill (default)', value: 'pill'},
          {title: 'Rounded rectangle', value: 'rounded'},
        ],
      },
      description: 'Override the button shape for this section only.',
    }),
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
