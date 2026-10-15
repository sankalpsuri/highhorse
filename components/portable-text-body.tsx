import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { SanityImage as Image } from '@/components/sanity-image'
import { urlFor } from '@/lib/sanity/client'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value).url()
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ''}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 720px"
            quality={90}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-zinc-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
}

export function PortableTextBody({ value }: { value: any[] | undefined }) {
  if (!value) return null
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <PortableText value={value} components={components} />
    </div>
  )
}
