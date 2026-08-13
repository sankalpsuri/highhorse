import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}]}),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'SEO', value: 'seo'},
          {title: 'Performance Marketing', value: 'performance-marketing'},
          {title: 'Content Marketing', value: 'content-marketing'},
          {title: 'Ecommerce', value: 'ecommerce'},
          {title: 'Industry News', value: 'industry-news'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used on the blog listing page and as a fallback meta description.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', author: 'author.name', media: 'mainImage'},
    prepare({title, author, media}) {
      return {title, subtitle: author && `by ${author}`, media}
    },
  },
})
