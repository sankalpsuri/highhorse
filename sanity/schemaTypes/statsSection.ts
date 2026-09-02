import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small uppercase label above the heading.'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'bodyText', title: 'Body text', type: 'text', rows: 3}),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {list: [{title: 'Grid', value: 'grid'}, {title: 'Scattered', value: 'scattered'}, {title: 'Split (text + stats)', value: 'split'}]},
      initialValue: 'grid',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {list: [{title: 'Light', value: 'light'}, {title: 'Dark', value: 'dark'}]},
      initialValue: 'light',
      description: 'Dark renders stats inside a dark rounded panel.',
    }),
    defineField({name: 'warningText', title: 'Warning text', type: 'string', description: 'Amber warning banner shown beside the heading (e.g. placeholder disclaimer).'}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string', description: 'e.g. "200+"'},
            {name: 'label', title: 'Label', type: 'string', description: 'e.g. "Projects Finished"'},
            {name: 'isPlaceholder', title: 'Placeholder?', type: 'boolean', description: 'Mark as placeholder — shows a badge and muted styling.'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Stats Section'}
    },
  },
})
