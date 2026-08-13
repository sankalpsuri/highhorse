import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { blogListingQuery } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Blog — High Horse',
  description: 'Insights on SEO, performance marketing, and growing your business online.',
}

interface BlogListItem {
  _id: string
  title: string
  slug: string
  mainImage?: any
  categories?: string[]
  publishedAt?: string
  excerpt?: string
  author?: { name: string; image?: any }
}

export default async function BlogListingPage() {
  const posts = await sanityFetch<BlogListItem[]>(blogListingQuery)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Blog
      </h1>

      {posts.length === 0 && (
        <p className="text-zinc-500">No posts yet. Check back soon.</p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(400).height(225).auto('format').url()}
                alt={post.mainImage.alt || post.title}
                width={400}
                height={225}
                className="w-full object-cover"
              />
            )}
            <div className="p-5">
              {post.categories && post.categories.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                {post.author?.name && <span>{post.author.name}</span>}
                {post.publishedAt && (
                  <>
                    <span>&middot;</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
