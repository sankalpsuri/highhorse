import type { Metadata } from 'next'
import Link from 'next/link'
import { AuditCaptureBar } from './audit-form'

export const metadata: Metadata = {
  title: 'Free Website Audit — High Horse',
  description:
    'Get a free review of your website covering technical SEO, performance, and content. We send findings within two working days.',
}

const CONTACT_HREF = '/contact-search-performance-marketing-agency'

export default function FreeWebsiteAuditPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 0' }}>
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
            Free Audit
          </div>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#111111',
              maxWidth: 580,
              marginBottom: 20,
            }}
          >
            Find Out What&rsquo;s Holding Your Website Back
          </h1>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 15.5,
              color: '#5c5c5c',
              lineHeight: 1.65,
              maxWidth: 540,
              marginBottom: 32,
            }}
          >
            Enter your website below and we&rsquo;ll review it across
            technical SEO, page performance, and content structure — then
            send you a clear summary of what&rsquo;s working, what
            isn&rsquo;t, and where the quickest improvements are.
          </p>

          <AuditCaptureBar />

          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12.5,
              color: '#9A9A96',
              marginTop: 14,
              marginBottom: 0,
            }}
          >
            No commitment required. Results delivered within two working days.
          </p>
        </div>
      </section>

      {/* ── What You'll Receive ──────────────────────────────── */}
      <section className="audit-details-section">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="audit-details-grid">
            <div>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#111111',
                  marginBottom: 16,
                }}
              >
                What you&rsquo;ll receive
              </h2>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 14.5,
                  color: '#5c5c5c',
                  lineHeight: 1.65,
                  maxWidth: 480,
                  marginBottom: 0,
                }}
              >
                A written review specific to your site — not a generic
                checklist. We look at the things that actually affect your
                search visibility and conversions.
              </p>
            </div>
            <div className="audit-details-cards">
              {[
                {
                  title: 'Technical Health',
                  desc: 'Site speed, crawlability, indexation issues, and core web vitals.',
                },
                {
                  title: 'SEO Fundamentals',
                  desc: 'On-page structure, meta tags, internal linking, and keyword gaps.',
                },
                {
                  title: 'Content & Conversion',
                  desc: 'Content structure, messaging clarity, and conversion path review.',
                },
              ].map((item) => (
                <div key={item.title} className="audit-detail-card">
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#1A6AFF',
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 13.5,
                        color: '#5c5c5c',
                        lineHeight: 1.55,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Reinforcement ────────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="audit-cta-panel">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.3rem, 2vw, 1.5rem)',
                fontWeight: 700,
                color: '#111111',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              Want to go deeper?
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14.5,
                color: '#5c5c5c',
                maxWidth: 480,
                margin: '0 auto 24px',
                lineHeight: 1.55,
              }}
            >
              If you want a full search strategy conversation rather than a
              site review, start here instead.
            </p>
            <Link
              href={CONTACT_HREF}
              style={{
                display: 'inline-block',
                background: '#1A6AFF',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Find Your Search Opportunity
            </Link>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .audit-details-section {
              padding: 72px 0;
            }
            .audit-details-grid {
              display: flex;
              gap: 56px;
              align-items: flex-start;
              flex-wrap: wrap;
            }
            .audit-details-grid > div:first-child {
              flex: 1 1 320px;
              min-width: 260px;
            }
            .audit-details-cards {
              flex: 1 1 400px;
              min-width: 280px;
              display: flex;
              flex-direction: column;
              gap: 18px;
            }
            .audit-detail-card {
              display: flex;
              gap: 14px;
              align-items: flex-start;
              background: #F7F7F6;
              border: 1px solid #EAEAE8;
              border-radius: 10px;
              padding: 20px 22px;
            }
            .audit-cta-panel {
              background: #F7F7F6;
              border: 1px solid #EAEAE8;
              border-radius: 16px;
              padding: 48px 40px;
              text-align: center;
            }
            @media (max-width: 768px) {
              .audit-details-section { padding: 56px 0; }
              .audit-details-grid { gap: 36px; }
            }
            @media (max-width: 560px) {
              .audit-cta-panel { padding: 32px 22px !important; }
              .audit-details-section { padding: 48px 0; }
              .audit-detail-card { padding: 16px 18px; }
            }
          `,
        }}
      />
    </main>
  )
}
