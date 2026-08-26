import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoShowcaseSection',
  title: 'Video Showcase Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'subtext', title: 'Subtext', type: 'text', rows: 3}),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External video URL (e.g. R2 or CDN hosted MP4).',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video file',
      type: 'file',
      options: {accept: 'video/*'},
      description: 'Direct upload. Overrides Video URL when set.',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster image',
      type: 'image',
      options: {hotspot: true},
      description: 'Thumbnail shown before the video plays.',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Video Showcase', subtitle: 'Video Showcase'}
    },
  },
})
