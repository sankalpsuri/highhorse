import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextBody } from '@/components/portable-text-body'

interface CaseStudyPageProps {
  data: {
    clientName: string
    slug: string
    logo?: any
    coverImage?: any
    industry?: string
    summary?: string
    challenge?: any[]
    solution?: any[]
    results?: { value: string; label: string }[]
    testimonial?: { quote: string; personName: string; personRole: string }
    relatedServices?: { title: string; slug: string; summary?: string }[]
    publishedAt?: string
  }
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        {data.industry && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            {data.industry}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {data.clientName}
        </h1>
        {data.summary && (
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {data.summary}
          </p>
        )}
        {data.coverImage && (
          <Image
            src={urlFor(data.coverImage).width(900).auto('format').url()}
            alt={data.clientName}
            width={900}
            height={500}
            className="mt-8 w-full rounded-lg"
            priority
          />
        )}
      </header>

      {/* Results */}
      {data.results && data.results.length > 0 && (
        <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.results.map((stat, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </section>
      )}

      {/* Challenge */}
      {data.challenge && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            The challenge
          </h2>
          <PortableTextBody value={data.challenge} />
        </section>
      )}

      {/* Solution */}
      {data.solution && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            The solution
          </h2>
          <PortableTextBody value={data.solution} />
        </section>
      )}

      {/* Testimonial */}
      {data.testimonial?.quote && (
        <section className="mb-16 rounded-lg bg-zinc-50 p-8 dark:bg-zinc-900">
          <blockquote className="text-lg italic text-zinc-700 dark:text-zinc-300">
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
            {data.testimonial.personName}
          </p>
          {data.testimonial.personRole && (
            <p className="text-sm text-zinc-500">{data.testimonial.personRole}</p>
          )}
        </section>
      )}

      {/* Related services */}
      {data.relatedServices && data.relatedServices.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Related services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.relatedServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${svc.slug}`}
                className="block rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {svc.title}
                </p>
                {svc.summary && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {svc.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
