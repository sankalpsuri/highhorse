import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'processStepsSection',
  title: 'Process Steps Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stepTitle', title: 'Step title', type: 'string'},
            {name: 'stepDescription', title: 'Step description', type: 'text', rows: 3},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Process Steps'}
    },
  },
})
