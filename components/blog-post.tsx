import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextBody } from '@/components/portable-text-body'

const categoryLabels: Record<string, string> = {
  seo: 'SEO',
  'performance-marketing': 'Performance Marketing',
  'content-marketing': 'Content Marketing',
  ecommerce: 'Ecommerce',
  'industry-news': 'Industry News',
}

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
    <article>
      <section style={{ padding: '0 0 64px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

          {/* ── 1. Header (centered) ───────────────────────────── */}
          <div style={{ padding: '40px 0 0', textAlign: 'center' }}>
            {data.categories && data.categories.length > 0 && (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                {data.categories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#1A6AFF',
                      background: '#eaf1ff',
                      padding: '5px 12px',
                      borderRadius: 999,
                    }}
                  >
                    {categoryLabels[cat] || cat}
                  </span>
                ))}
              </div>
            )}
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: '#111111',
                maxWidth: 720,
                margin: '0 auto 16px',
              }}
            >
              {data.title}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                color: '#8a8a86',
              }}
            >
              {data.author?.image?.asset && (
                <Image
                  src={urlFor(data.author.image).width(80).height(80).auto('format').url()}
                  alt={data.author.name}
                  width={32}
                  height={32}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              {data.author?.name && (
                <span style={{ fontWeight: 600, color: '#111111' }}>
                  {data.author.name}
                </span>
              )}
              {formattedDate && (
                <>
                  <span>&middot;</span>
                  <time dateTime={data.publishedAt}>{formattedDate}</time>
                </>
              )}
            </div>
          </div>

          {/* ── 2. Cover Image ──────────────────────────────────── */}
          {data.mainImage?.asset ? (
            <div
              style={{
                marginTop: 32,
                borderRadius: 16,
                overflow: 'hidden',
                background: '#f5f5f4',
              }}
            >
              <Image
                src={urlFor(data.mainImage).width(1100).auto('format').url()}
                alt={data.mainImage.alt || data.title}
                width={1100}
                height={550}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
          ) : (
            <div
              style={{
                marginTop: 32,
                borderRadius: 16,
                background: '#f5f5f4',
                height: 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#8a8a86',
                  letterSpacing: '0.04em',
                }}
              >
                HIGH HORSE
              </span>
            </div>
          )}

          {/* ── 3. Sidebar + Body ──────────────────────────────── */}
          <div className="blog-detail-body">
            <aside className="blog-detail-sidebar">
              {data.author && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#8a8a86',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}
                  >
                    Written by
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {data.author.image?.asset && (
                      <Image
                        src={urlFor(data.author.image).width(72).height(72).auto('format').url()}
                        alt={data.author.name}
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <div
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#111111',
                        }}
                      >
                        {data.author.name}
                      </div>
                      {data.author.role && (
                        <div
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 12,
                            color: '#8a8a86',
                          }}
                        >
                          {data.author.role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {formattedDate && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#8a8a86',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 6,
                    }}
                  >
                    Published
                  </div>
                  <time
                    dateTime={data.publishedAt}
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 13,
                      color: '#111111',
                    }}
                  >
                    {formattedDate}
                  </time>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    border: '1px solid #e4e4e4',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    color: '#8a8a86',
                  }}
                >
                  &#9743;
                </span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    border: '1px solid #e4e4e4',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    color: '#8a8a86',
                  }}
                >
                  &#128279;
                </span>
              </div>
            </aside>

            <div className="blog-detail-content" style={{ flex: 1, minWidth: 0 }}>
              <PortableTextBody value={data.body} />
            </div>
          </div>

          {/* ── 4. Back link ───────────────────────────────────── */}
          <div style={{ marginTop: 48 }}>
            <Link
              href="/blog"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#1A6AFF',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span aria-hidden="true">&larr;</span>
              All Articles
            </Link>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-detail-body {
              display: flex;
              gap: 48px;
              margin-top: 40px;
              align-items: flex-start;
            }
            .blog-detail-sidebar {
              width: 190px;
              flex-shrink: 0;
              position: sticky;
              top: 100px;
            }
            .blog-detail-content .prose {
              font-family: 'Poppins', sans-serif;
              font-size: 15px;
              line-height: 1.75;
              color: #111111;
            }
            .blog-detail-content .prose h1,
            .blog-detail-content .prose h2,
            .blog-detail-content .prose h3,
            .blog-detail-content .prose h4 {
              font-family: 'Montserrat', sans-serif;
              font-weight: 700;
              letter-spacing: -0.02em;
              color: #111111;
              margin-top: 32px;
              margin-bottom: 12px;
            }
            .blog-detail-content .prose h2 { font-size: 22px; }
            .blog-detail-content .prose h3 { font-size: 18px; }
            .blog-detail-content .prose p {
              color: #111111;
              margin-bottom: 16px;
            }
            .blog-detail-content .prose a {
              color: #1A6AFF;
              text-decoration-color: rgba(26, 106, 255, 0.3);
            }
            .blog-detail-content .prose a:hover {
              text-decoration-color: #1A6AFF;
            }
            .blog-detail-content .prose blockquote {
              border-left: 3px solid #1A6AFF;
              padding-left: 20px;
              margin: 24px 0;
              font-style: italic;
              color: #5c5c5c;
            }
            .blog-detail-content .prose ul,
            .blog-detail-content .prose ol {
              color: #111111;
              padding-left: 20px;
            }
            .blog-detail-content .prose li {
              margin-bottom: 8px;
            }
            .blog-detail-content .prose img {
              border-radius: 12px;
            }
            .blog-detail-content .prose figure {
              margin: 28px 0;
            }
            .blog-detail-content .prose figcaption {
              font-family: 'Poppins', sans-serif;
              font-size: 13px;
              color: #8a8a86;
            }
            .blog-detail-content .prose strong {
              color: #111111;
            }
            .blog-detail-content .prose code {
              background: #f5f5f4;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 13.5px;
            }
            .blog-detail-content .prose pre {
              background: #111111;
              color: #e4e4e4;
              border-radius: 10px;
              padding: 20px;
              overflow-x: auto;
              margin: 24px 0;
            }
            @media (max-width: 860px) {
              .blog-detail-body {
                flex-direction: column;
              }
              .blog-detail-sidebar {
                position: static;
                width: 100%;
                display: flex;
                gap: 32px;
                align-items: flex-start;
                flex-wrap: wrap;
                padding-bottom: 20px;
                border-bottom: 1px solid #e4e4e4;
              }
            }
            @media (max-width: 560px) {
              .blog-detail-content .prose { font-size: 14.5px; }
              .blog-detail-content .prose h2 { font-size: 20px; }
              .blog-detail-content .prose h3 { font-size: 16px; }
            }
            @media (max-width: 374px) {
              .blog-detail-content .prose { font-size: 14px; }
              .blog-detail-content .prose h2 { font-size: 18px; }
              .blog-detail-content .prose pre { padding: 14px; font-size: 12px; }
            }
          `,
        }}
      />
    </article>
  )
}
