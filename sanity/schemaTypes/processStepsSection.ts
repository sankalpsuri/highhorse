import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'processStepsSection',
  title: 'Process Steps Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small uppercase label above the heading.'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'headingBordered',
      title: 'Bordered heading',
      type: 'boolean',
      description: 'Wrap heading in a thin brand-blue border box.',
    }),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'headerLayout',
      title: 'Header layout',
      type: 'string',
      options: {list: [{title: 'Stacked', value: 'stacked'}, {title: 'Split (heading left, subtext right)', value: 'split'}]},
      initialValue: 'stacked',
    }),
    defineField({
      name: 'containerStyle',
      title: 'Container style',
      type: 'string',
      options: {list: [{title: 'Individual cards', value: 'cards'}, {title: 'Unified container', value: 'unified'}]},
      initialValue: 'cards',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Fixed number of grid columns (e.g. 5). Leave empty for auto-fit.',
    }),
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
