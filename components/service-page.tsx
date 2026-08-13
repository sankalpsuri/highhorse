import Link from 'next/link'
import { PortableTextBody } from '@/components/portable-text-body'

interface ServicePageProps {
  data: {
    title: string
    heroHeadline?: string
    heroSubheadline?: string
    summary?: string
    processSteps?: { stepTitle: string; stepDescription: string }[]
    resultsStats?: { value: string; label: string }[]
    body?: any[]
    relatedCaseStudies?: {
      clientName: string
      slug: string
      industry?: string
      summary?: string
    }[]
    relatedFaqs?: { question: string; answer: any[]; order?: number }[]
    ctaText?: string
  }
}

export function ServicePage({ data }: ServicePageProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          {data.title}
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

      {/* Summary */}
      {data.summary && (
        <section className="mb-12">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.summary}
          </p>
        </section>
      )}

      {/* Results stats */}
      {data.resultsStats && data.resultsStats.length > 0 && (
        <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.resultsStats.map((stat, i) => (
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

      {/* Process steps */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Our process
          </h2>
          <ol className="space-y-6">
            {data.processSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {step.stepTitle}
                  </h3>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    {step.stepDescription}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Body */}
      {data.body && (
        <section className="mb-16">
          <PortableTextBody value={data.body} />
        </section>
      )}

      {/* Related case studies */}
      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Related case studies
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.relatedCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/${cs.slug}`}
                className="block rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {cs.clientName}
                </p>
                {cs.industry && (
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                    {cs.industry}
                  </p>
                )}
                {cs.summary && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {cs.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.relatedFaqs && data.relatedFaqs.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Frequently asked questions
          </h2>
          <dl className="space-y-6">
            {data.relatedFaqs.map((faq, i) => (
              <div key={i}>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-zinc-600 dark:text-zinc-400">
                  <PortableTextBody value={faq.answer} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
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
