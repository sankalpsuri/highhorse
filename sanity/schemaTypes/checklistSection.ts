import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'checklistSection',
  title: 'Checklist Section',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {list: [{title: 'Grid', value: 'grid'}, {title: 'Split (checklist + art)', value: 'split'}]},
      initialValue: 'grid',
    }),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      title: 'Checklist items',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'image', title: 'Side image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Right', value: 'right'}]},
      hidden: ({parent}) => !parent?.image,
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Checklist', subtitle: 'Checklist'}
    },
  },
})
