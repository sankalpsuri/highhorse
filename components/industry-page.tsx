import Link from 'next/link'
import { PortableTextBody } from '@/components/portable-text-body'
import { ScrollReveal } from '@/components/scroll-reveal'

interface IndustryPageProps {
  data: {
    title: string
    heroHeadline?: string
    heroSubheadline?: string
    overview?: string
    challenges?: { challengeTitle: string; challengeDescription: string }[]
    body?: any[]
    relatedServices?: { title: string; slug: string; summary?: string }[]
    relatedCaseStudies?: {
      clientName: string
      slug: string
      industry?: string
      summary?: string
    }[]
    ctaText?: string
  }
}

export function IndustryPage({ data }: IndustryPageProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Industry
        </p>
        {data.heroHeadline && (
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {data.heroHeadline}
          </h1>
        )}
        {data.heroSubheadline && (
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {data.heroSubheadline}
          </p>
        )}
      </header>

      {/* Overview */}
      {data.overview && (
        <section className="mb-12">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.overview}
          </p>
        </section>
      )}

      {/* Industry challenges */}
      {data.challenges && data.challenges.length > 0 && (
        <ScrollReveal>
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Key challenges
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.challenges.map((c, i) => (
              <div
                key={i}
                className="hh-card-hover rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {c.challengeTitle}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {c.challengeDescription}
                </p>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* Body */}
      {data.body && (
        <section className="mb-16">
          <PortableTextBody value={data.body} />
        </section>
      )}

      {/* Related services */}
      {data.relatedServices && data.relatedServices.length > 0 && (
        <ScrollReveal>
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            How we help
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.relatedServices.map((svc) => {
              const validSlug = svc.slug && !/\s/.test(svc.slug)
              const content = (
                <>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {svc.title}
                  </p>
                  {svc.summary && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {svc.summary}
                    </p>
                  )}
                </>
              )
              return validSlug ? (
                <Link
                  key={svc.slug}
                  href={`/${svc.slug}`}
                  className="hh-card-hover block rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={svc.slug}
                  className="hh-card-hover block rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* Related case studies */}
      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && (
        <ScrollReveal>
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Success stories
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.relatedCaseStudies.map((cs) => {
              const validSlug = cs.slug && !/\s/.test(cs.slug)
              const content = (
                <>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {cs.clientName}
                  </p>
                  {cs.summary && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {cs.summary}
                    </p>
                  )}
                </>
              )
              return validSlug ? (
                <Link
                  key={cs.slug}
                  href={`/${cs.slug}`}
                  className="hh-card-hover block rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={cs.slug}
                  className="hh-card-hover block rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* CTA */}
      <section className="text-center">
        <Link
          href="/contact"
          className="inline-block rounded-full bg-zinc-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {data.ctaText || 'Get in touch'}
        </Link>
      </section>
    </article>
  )
}
