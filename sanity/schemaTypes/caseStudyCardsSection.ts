import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'caseStudyCardsSection',
  title: 'Case Study Cards Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'clientName', title: 'Client name', type: 'string'}),
            defineField({
              name: 'badgeColor',
              title: 'Card color',
              type: 'string',
              options: {list: ['blue', 'lavender', 'peach', 'green']},
            }),
            defineField({
              name: 'metrics',
              title: 'Metric chips',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'value', title: 'Value', type: 'string'}),
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                  ],
                },
              ],
            }),
            defineField({
              name: 'results',
              title: 'Bullet results',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {title: 'clientName'},
            prepare({title}) {
              return {title: title || 'Case Study Card'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Case Study Cards Section', subtitle: 'Case Study Cards'}
    },
  },
})
