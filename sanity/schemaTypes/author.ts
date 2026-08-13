import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'role', title: 'Role / title', type: 'string'}),
    defineField({name: 'image', title: 'Headshot', type: 'image', options: {hotspot: true}}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 3}),
  ],
})
 
