import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({name: 'badgeText', title: 'Badge text', type: 'string', description: 'e.g. "Certified Google Partner"'}),
    defineField({name: 'eyebrowText', title: 'Eyebrow text', type: 'string', description: 'Pill-style eyebrow label (e.g. "ChatGPT Ads"). Uses dot + pill instead of the blue-line eyebrow.'}),
    defineField({
      name: 'eyebrowDotColor',
      title: 'Eyebrow dot color',
      type: 'string',
      options: {list: [{title: 'Orange', value: 'orange'}, {title: 'Blue', value: 'blue'}, {title: 'Green', value: 'green'}]},
      initialValue: 'orange',
      hidden: ({parent}) => !parent?.eyebrowText,
    }),
    defineField({
      name: 'heroWidget',
      title: 'Hero widget',
      type: 'string',
      options: {list: [{title: 'Sponsored placement mockup', value: 'sponsored-placement'}]},
      description: 'Coded UI widget shown in the hero instead of an image.',
    }),
    defineField({name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3}),
    defineField({name: 'ctaText', title: 'CTA button text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string', description: 'Internal path or external URL'}),
    defineField({name: 'secondaryCtaText', title: 'Secondary CTA text', type: 'string'}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string'}),
    defineField({
      name: 'relatedServiceTags',
      title: 'Related service tags',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Label', type: 'string'}),
          defineField({name: 'href', title: 'Link', type: 'string'}),
        ],
      }],
      description: '"Runs alongside" pill tags shown below the CTAs.',
    }),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Center', value: 'center'}]},
      initialValue: 'left',
    }),
    defineField({name: 'mobileImageSquare', title: 'Square hero image on mobile', type: 'boolean'}),
    defineField({
      name: 'badgeStyle',
      title: 'Badge style',
      type: 'string',
      options: {list: [{title: 'Google Partner', value: 'partner'}, {title: 'Eyebrow', value: 'eyebrow'}]},
      initialValue: 'partner',
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'Hero Section', subtitle: 'Hero'}
    },
  },
})
