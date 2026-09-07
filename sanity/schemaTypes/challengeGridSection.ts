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
    defineField({
      name: 'headerLayout',
      title: 'Header layout',
      type: 'string',
      options: {list: [{title: 'Default (heading left, subtext right)', value: 'default'}, {title: 'Inline CTA (heading left, CTA right, subtext below)', value: 'inline-cta'}]},
      description: 'Controls header arrangement in grid layout.',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {list: [{title: 'Default (cream)', value: 'default'}, {title: 'White', value: 'white'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card style',
      type: 'string',
      options: {list: [{title: 'Default (stacked)', value: 'default'}, {title: 'Compact (inline number + text)', value: 'compact'}]},
      initialValue: 'default',
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
