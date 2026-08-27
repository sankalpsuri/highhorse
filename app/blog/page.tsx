import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { blogListingQuery } from '@/lib/sanity/queries'
import { BlogGrid } from './blog-grid'
import { NewsletterForm } from '@/app/case-studies/newsletter-form'

export const metadata: Metadata = {
  title: 'Blog — High Horse',
  description:
    'Practical strategy, technical playbooks, and AI-search thinking for teams building durable acquisition engines.',
}

const categoryLabels: Record<string, string> = {
  seo: 'SEO',
  'performance-marketing': 'Performance Marketing',
  'content-marketing': 'Content Marketing',
  ecommerce: 'Ecommerce',
  'industry-news': 'Industry News',
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
  const featured = posts.length > 0 ? posts[0] : null
  const remaining = posts.length > 1 ? posts.slice(1) : []

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: '56px 0 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              color: '#1A6AFF',
              marginBottom: 10,
            }}
          >
            Blogs
          </div>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.125rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: '#111111',
              maxWidth: 640,
            }}
          >
            Ideas That Turn Search Visibility Into Measurable Growth.
          </h1>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 14.5,
              color: '#5c5c5c',
              maxWidth: 520,
              lineHeight: 1.55,
            }}
          >
            Practical strategy, technical playbooks, and AI-search thinking
            for teams building durable acquisition engines.
          </p>

          {/* ── Featured Card ──────────────────────────────── */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="blog-featured-card"
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 260,
                  height: 220,
                  borderRadius: 12,
                  background: '#f5f5f4',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {featured.mainImage?.asset ? (
                  <Image
                    src={urlFor(featured.mainImage).width(520).height(220).auto('format').url()}
                    alt={featured.mainImage.alt || featured.title}
                    width={520}
                    height={220}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    priority
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#8a8a86',
                    }}
                  >
                    HIGH HORSE
                  </span>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 260,
                  padding: '8px 20px 8px 0',
                }}
              >
                {featured.categories && featured.categories.length > 0 && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#1A6AFF',
                      background: '#eaf1ff',
                      padding: '4px 10px',
                      borderRadius: 999,
                      marginBottom: 12,
                    }}
                  >
                    {categoryLabels[featured.categories[0]] || featured.categories[0]}
                  </span>
                )}
                <h2
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 22,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    marginBottom: 12,
                  }}
                >
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 13.5,
                      color: '#5c5c5c',
                      maxWidth: 440,
                      lineHeight: 1.55,
                      marginBottom: 12,
                    }}
                  >
                    {featured.excerpt}
                  </p>
                )}
                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 12,
                    color: '#8a8a86',
                    marginBottom: 16,
                  }}
                >
                  {featured.author?.name && (
                    <span style={{ marginRight: 14 }}>{featured.author.name}</span>
                  )}
                  {featured.publishedAt && (
                    <span>
                      {new Date(featured.publishedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#1A6AFF',
                    color: '#fff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '11px 20px',
                    borderRadius: 999,
                  }}
                >
                  Read Article
                </span>
              </div>
            </Link>
          )}

          {!featured && (
            <div
              style={{
                marginTop: 28,
                padding: '48px 0',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 15,
                  color: '#8a8a86',
                  lineHeight: 1.55,
                }}
              >
                We&rsquo;re working on our first articles. Check back soon
                for practical strategy and technical playbooks.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Latest Articles Grid ─────────────────────────────── */}
      <BlogGrid posts={remaining} />

      {/* ── Newsletter CTA ───────────────────────────────────── */}
      <section style={{ paddingTop: 0, paddingBottom: 56 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div
            className="blog-newsletter-panel"
            style={{
              background: '#111111',
              borderRadius: 20,
              padding: '56px 40px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.3rem, 2.6vw, 1.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              Stay Updated
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14.5,
                color: '#b7bcc4',
                maxWidth: 480,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 14,
                lineHeight: 1.55,
              }}
            >
              Get the latest SEO experiments, AI search notes, and growth
              frameworks delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-featured-card {
              border: 1.5px solid #1A6AFF;
              border-radius: 16px;
              padding: 16px;
              display: flex;
              gap: 24px;
              align-items: center;
              flex-wrap: wrap;
              margin-top: 28px;
              text-decoration: none;
              color: inherit;
              transition: box-shadow 0.15s;
            }
            .blog-featured-card:hover {
              box-shadow: 0 4px 20px rgba(26, 106, 255, 0.1);
            }
            @media (max-width: 860px) {
              .blog-featured-card { flex-direction: column; align-items: stretch; }
            }
            @media (max-width: 560px) {
              .blog-newsletter-panel { padding: 40px 22px !important; }
              .blog-featured-card { padding: 12px; gap: 16px; }
            }
            @media (max-width: 374px) {
              .blog-newsletter-panel { padding: 32px 16px !important; }
              .blog-featured-card { padding: 10px; }
            }
          `,
        }}
      />
    </main>
  )
}
