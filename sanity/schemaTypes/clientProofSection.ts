import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'clientProofSection',
  title: 'Client Proof Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'bodyText', title: 'Body text', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Client Proof Section', subtitle: 'Client Proof'}
    },
  },
})
