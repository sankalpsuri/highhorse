import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'bodyText', title: 'Body text', type: 'text', rows: 3}),
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
