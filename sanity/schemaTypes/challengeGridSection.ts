import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'challengeGridSection',
  title: 'Challenge Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {list: [{title: 'Card grid', value: 'grid'}, {title: 'Split (text + list)', value: 'split'}]},
      initialValue: 'grid',
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small uppercase label above the heading.'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string'}),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'cardColors',
      title: 'Card colors',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Per-card color tint, mapped by index. Values: blue, peach, gray. Cards without a matching entry use default white.',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Challenge Grid', subtitle: 'Challenge Grid'}
    },
  },
})
