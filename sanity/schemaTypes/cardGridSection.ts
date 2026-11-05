import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cardGridSection',
  title: 'Card Grid Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small uppercase label above the heading.'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({name: 'subtextParagraphs', title: 'Subtext paragraphs', type: 'array', of: [{type: 'string'}], description: 'Multi-paragraph description (replaces subtext when present).'}),
    defineField({name: 'listLabel', title: 'List label', type: 'string', description: 'Small uppercase label shown above the card grid (e.g. "Benefits include:").'}),
    defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3, description: 'Paragraph shown below the card grid.'}),
    defineField({name: 'showGlow', title: 'Show blue glow (dark)', type: 'boolean', description: 'Show the blue radial glow in dark mode. Defaults to true.'}),
    defineField({name: 'darkCardStyle', title: 'Dark card style', type: 'string', options: {list: [{title: 'Default (icon + number)', value: 'default'}, {title: 'Numbered only', value: 'numbered'}]}, description: 'Card rendering style in dark non-comparison mode.', hidden: ({parent}) => parent?.style !== 'dark'}),
    defineField({name: 'cardContainerStyle', title: 'Card container', type: 'string', options: {list: [{title: 'Default (individual cards)', value: 'default'}, {title: 'Unified (single container with dividers)', value: 'unified'}]}, description: 'Wrap all cards in a single bordered container with internal dividers.'}),
    defineField({
      name: 'headerLayout',
      title: 'Header layout',
      type: 'string',
      options: {list: [{title: 'Stacked', value: 'stacked'}, {title: 'Split (heading left, subtext right)', value: 'split'}]},
      initialValue: 'stacked',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Dashed border', value: 'dashed'}, {title: 'Clean (no borders)', value: 'clean'}, {title: 'Dark', value: 'dark'}, {title: 'Tagged (chip + bullets)', value: 'tagged'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {list: [{title: 'Default', value: 'default'}, {title: 'Cream', value: 'cream'}, {title: 'White', value: 'white'}]},
      initialValue: 'default',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Fixed column count. Leave empty for auto-fit.',
    }),
    defineField({
      name: 'tintStyle',
      title: 'Tint style',
      type: 'string',
      options: {
        list: [
          {title: 'Badge only', value: 'badge'},
          {title: 'Full card background', value: 'full'},
        ],
      },
      description: 'Controls how badgeColor is applied. "badge" tints only the icon badge; "full" tints the entire card background.',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon', type: 'image', options: {hotspot: true}}),
            defineField({name: 'svgPath', title: 'SVG path', type: 'string', description: 'SVG path data for an inline icon (used instead of an uploaded image).'}),
            defineField({name: 'tag', title: 'Tag', type: 'string', description: 'Short label chip shown above the title (e.g. "AEO").'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'badgeColor',
              title: 'Badge color',
              type: 'string',
              options: {
                list: [
                  {title: 'Mint', value: 'mint'},
                  {title: 'Peach', value: 'peach'},
                  {title: 'Lavender', value: 'lavender'},
                  {title: 'Gray', value: 'gray'},
                  {title: 'Blue', value: 'blue'},
                ],
              },
            }),
            defineField({name: 'listLabel', title: 'List label', type: 'string', description: 'Small uppercase label shown above the bullet list within this card.'}),
            defineField({
              name: 'bullets',
              title: 'Bullet points',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Card'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Card Grid Section', subtitle: 'Card Grid'}
    },
  },
})
