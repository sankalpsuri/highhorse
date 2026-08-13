import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextBody } from '@/components/portable-text-body'

interface BlogPostProps {
  data: {
    title: string
    author?: { name: string; role?: string; image?: any }
    mainImage?: any
    categories?: string[]
    publishedAt?: string
    body?: any[]
  }
}

export function BlogPost({ data }: BlogPostProps) {
  const formattedDate = data.publishedAt
    ? new Date(data.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        {data.categories && data.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {data.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {data.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
          {data.author?.image && (
            <Image
              src={urlFor(data.author.image).width(40).height(40).auto('format').url()}
              alt={data.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          {data.author?.name && <span>{data.author.name}</span>}
          {formattedDate && (
            <>
              <span>&middot;</span>
              <time dateTime={data.publishedAt}>{formattedDate}</time>
            </>
          )}
        </div>
      </header>

      {/* Cover image */}
      {data.mainImage && (
        <Image
          src={urlFor(data.mainImage).width(800).auto('format').url()}
          alt={data.mainImage.alt || data.title}
          width={800}
          height={450}
          className="mb-12 w-full rounded-lg"
          priority
        />
      )}

      {/* Body */}
      <PortableTextBody value={data.body} />
    </article>
  )
}
