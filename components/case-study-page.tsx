import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextBody } from '@/components/portable-text-body'
import { NewsletterForm } from '@/app/case-studies/newsletter-form'

const industryLabels: Record<string, string> = {
  bfsi: 'Finance',
  'ecommerce-retail': 'Ecommerce & Retail',
  healthcare: 'Healthcare',
  education: 'Education',
  'travel-tourism': 'Travel & Tourism',
  logistics: 'Logistics',
  'real-estate': 'Real Estate',
  saas: 'SaaS',
}

interface CaseStudyPageProps {
  data: {
    clientName: string
    slug: string
    logo?: any
    coverImage?: any
    resultImages?: any[]
    industry?: string
    summary?: string
    challenge?: any[]
    solution?: any[]
    results?: { value: string; label: string }[]
    testimonial?: { quote: string; personName: string; personRole: string }
    relatedServices?: { title: string; slug: string; summary?: string }[]
    otherCaseStudies?: {
      _id: string
      clientName: string
      slug: string
      summary?: string
      coverImage?: any
    }[]
    publishedAt?: string
  }
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  const sidebarItems: { label: string; id: string }[] = []
  if (data.challenge) sidebarItems.push({ label: 'The Challenge', id: 'challenge' })
  if (data.solution) sidebarItems.push({ label: 'The Solution', id: 'solution' })
  if (data.results?.length) sidebarItems.push({ label: 'Results', id: 'results' })
  if (data.testimonial?.quote) sidebarItems.push({ label: 'Testimonial', id: 'testimonial' })

  const industryDisplay = data.industry
    ? industryLabels[data.industry] || data.industry
    : null

  return (
    <article>
      <section style={{ padding: '0 0 64px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

          {/* ── 1. Client Header (centered) ──────────────────── */}
          <div style={{ padding: '40px 0 0', textAlign: 'center' }}>
            {data.logo?.asset ? (
              <Image
                src={urlFor(data.logo).height(88).auto('format').url()}
                alt={data.clientName}
                width={140}
                height={44}
                style={{ objectFit: 'contain', margin: '0 auto' }}
              />
            ) : (
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#111111',
                }}
              >
                {data.clientName
                  .toUpperCase()
                  .split('')
                  .join(' ')}
              </div>
            )}
            {industryDisplay && (
              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#8a8a86',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                {industryDisplay}
              </div>
            )}
          </div>

          {/* ── 2. Hero Banner ────────────────────────────────── */}
          <div className="cs-detail-hero">
            <div style={{ flex: 1, minWidth: 280 }}>
              <h1
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  maxWidth: 420,
                }}
              >
                {data.summary || data.clientName}
              </h1>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 220,
                display: 'flex',
                justifyContent: 'center',
                gap: 14,
              }}
            >
              {data.coverImage?.asset ? (
                <Image
                  src={urlFor(data.coverImage).width(400).height(220).auto('format').url()}
                  alt={data.clientName}
                  width={400}
                  height={220}
                  style={{ borderRadius: 12, objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
                  priority
                />
              ) : (
                <div
                  style={{
                    width: 200,
                    height: 160,
                    background: '#e4e4e4',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#8a8a86',
                    }}
                  >
                    {data.clientName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── 3. Sidebar + Content ─────────────────────────── */}
          <div className="cs-detail-body">
            <aside className="cs-detail-sidebar">
              {sidebarItems.length > 0 && (
                <>
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
                    In this article
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 20px 0',
                    }}
                  >
                    {sidebarItems.map((item) => (
                      <li key={item.id} style={{ marginBottom: 10 }}>
                        <a
                          href={`#${item.id}`}
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#1A6AFF',
                            textDecoration: 'none',
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
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

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Challenge */}
              {data.challenge && (
                <div id="challenge" style={{ marginBottom: 8 }}>
                  <h4
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                      marginTop: 28,
                      marginBottom: 12,
                    }}
                  >
                    The Challenge
                  </h4>
                  <div
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 14.5,
                      color: '#111111',
                      lineHeight: 1.6,
                    }}
                  >
                    <PortableTextBody value={data.challenge} />
                  </div>
                </div>
              )}

              {/* Solution */}
              {data.solution && (
                <div id="solution" style={{ marginBottom: 8 }}>
                  <h4
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                      marginTop: 28,
                      marginBottom: 12,
                    }}
                  >
                    The Solution
                  </h4>
                  <div
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 14.5,
                      color: '#111111',
                      lineHeight: 1.6,
                    }}
                  >
                    <PortableTextBody value={data.solution} />
                  </div>
                </div>
              )}

              {/* Results (metric cards) */}
              {data.results && data.results.length > 0 && (
                <div id="results" style={{ marginTop: 28, marginBottom: 8 }}>
                  <h4
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                      marginBottom: 16,
                    }}
                  >
                    Results
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: 16,
                    }}
                  >
                    {data.results.map((stat, i) => (
                      <div
                        key={i}
                        style={{
                          border: '1px solid #e4e4e4',
                          borderRadius: 12,
                          padding: '20px 18px',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: 26,
                            fontWeight: 700,
                            color: '#1A6AFF',
                            marginBottom: 4,
                          }}
                        >
                          {stat.value}
                        </p>
                        <p
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 13,
                            color: '#5c5c5c',
                            lineHeight: 1.4,
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Result images */}
              {data.resultImages && data.resultImages.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(data.resultImages.length, 3)}, 1fr)`,
                    gap: 16,
                    marginTop: 24,
                    marginBottom: 8,
                  }}
                >
                  {data.resultImages.map((img, i) =>
                    img?.asset ? (
                      <Image
                        key={i}
                        src={urlFor(img).width(400).auto('format').url()}
                        alt={`${data.clientName} result ${i + 1}`}
                        width={400}
                        height={260}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 10,
                          border: '1px solid #e4e4e4',
                        }}
                      />
                    ) : null,
                  )}
                </div>
              )}

              {/* Testimonial */}
              {data.testimonial?.quote && (
                <div id="testimonial" style={{ marginTop: 28, marginBottom: 8 }}>
                  <div
                    style={{
                      background: '#f5f5f4',
                      borderRadius: 12,
                      padding: 28,
                    }}
                  >
                    <blockquote
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 16,
                        fontStyle: 'italic',
                        color: '#5c5c5c',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      &ldquo;{data.testimonial.quote}&rdquo;
                    </blockquote>
                    <p
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600,
                        color: '#111111',
                        marginTop: 14,
                        fontSize: 14,
                      }}
                    >
                      {data.testimonial.personName}
                    </p>
                    {data.testimonial.personRole && (
                      <p
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 13,
                          color: '#8a8a86',
                        }}
                      >
                        {data.testimonial.personRole}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 4. Related Case Studies ───────────────────────── */}
          {data.otherCaseStudies && data.otherCaseStudies.length > 0 && (
            <>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                  marginTop: 64,
                  marginBottom: 24,
                }}
              >
                Related Case Studies
              </h2>
              <div className="cs-detail-related-grid">
                {data.otherCaseStudies.map((cs) => (
                  <Link
                    key={cs._id}
                    href={`/${cs.slug}`}
                    className="cs-detail-related-card"
                  >
                    <div
                      style={{
                        height: 110,
                        background: '#f5f5f4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cs.coverImage?.asset ? (
                        <Image
                          src={urlFor(cs.coverImage).width(360).height(110).auto('format').url()}
                          alt={cs.clientName}
                          width={360}
                          height={110}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#8a8a86',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {cs.clientName.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                      <h3
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: 14,
                          fontWeight: 700,
                          color: '#111111',
                          lineHeight: 1.35,
                          letterSpacing: '-0.02em',
                          marginBottom: 6,
                        }}
                      >
                        {cs.summary || cs.clientName}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 12.5,
                          color: '#5c5c5c',
                          margin: 0,
                        }}
                      >
                        {cs.clientName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ── 5. Newsletter CTA ────────────────────────────── */}
          <div
            style={{
              background: '#111111',
              borderRadius: 20,
              padding: '56px 40px',
              textAlign: 'center',
              marginTop: 56,
            }}
            className="cs-detail-newsletter"
          >
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 28,
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
            .cs-detail-hero {
              background: #f5f5f4;
              border-radius: 20px;
              padding: 44px;
              display: flex;
              align-items: center;
              gap: 24px;
              margin-top: 28px;
              flex-wrap: wrap;
            }
            .cs-detail-body {
              display: flex;
              gap: 48px;
              margin-top: 40px;
              align-items: flex-start;
            }
            .cs-detail-sidebar {
              width: 190px;
              flex-shrink: 0;
              position: sticky;
              top: 24px;
            }
            .cs-detail-related-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            .cs-detail-related-card {
              border: 1px solid #e4e4e4;
              border-radius: 16px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              color: inherit;
              transition: border-color 0.15s;
            }
            .cs-detail-related-card:hover {
              border-color: #1A6AFF;
            }
            @media (max-width: 860px) {
              .cs-detail-body { flex-direction: column; }
              .cs-detail-sidebar {
                position: static;
                width: 100%;
                display: flex;
                gap: 32px;
                align-items: flex-start;
              }
              .cs-detail-related-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 560px) {
              .cs-detail-related-grid { grid-template-columns: 1fr; }
              .cs-detail-hero { padding: 28px; }
              .cs-detail-newsletter { padding: 40px 22px !important; }
            }
          `,
        }}
      />
    </article>
  )
}
