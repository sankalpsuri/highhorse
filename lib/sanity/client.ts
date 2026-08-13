import { client } from '@/sanity/lib/client'

export { client }
export { urlFor } from '@/sanity/lib/image'

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: 60 } })
}
