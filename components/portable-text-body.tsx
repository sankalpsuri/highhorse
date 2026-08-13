import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(800).auto('format').url()
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ''}
            width={800}
            height={450}
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
