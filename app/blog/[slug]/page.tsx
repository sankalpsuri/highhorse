import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { blogPostQuery, blogPostSlugsQuery } from '@/lib/sanity/queries'
import { BlogPost } from '@/components/blog-post'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await sanityFetch<{ slug: string }[]>(blogPostSlugsQuery)
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<any>(blogPostQuery, { slug })
  if (!post) return {}

  const seo = post.seo
  return {
    title: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt || '',
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<any>(blogPostQuery, { slug })
  if (!post) notFound()

  return <BlogPost data={post} />
}
