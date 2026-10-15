'use client'

import Image, { type ImageProps } from 'next/image'
import type { ImageLoaderProps } from 'next/image'

function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 90).toString())
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}

type SanityImageProps = Omit<ImageProps, 'loader'>

export function SanityImage(props: SanityImageProps) {
  return <Image loader={sanityLoader} {...props} />
}
