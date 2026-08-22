import type { Metadata } from 'next'
import Link from 'next/link'
import { AuditForm } from './audit-form'

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
      <section style={{ padding: '64px 0 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="audit-layout">
            <div style={{ flex: 1, minWidth: 300 }}>
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
                  fontSize: 34,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  maxWidth: 480,
                  marginBottom: 20,
                }}
              >
                Get a Free Website Audit
              </h1>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 15,
                  color: '#5c5c5c',
                  lineHeight: 1.6,
                  maxWidth: 460,
                  marginBottom: 28,
                }}
              >
                We review your site across technical SEO, page performance,
                and content structure — then send you a clear summary of
                what&rsquo;s working, what isn&rsquo;t, and where the
                quickest improvements are.
              </p>

              <div
                style={{
                  background: '#f5f5f4',
                  borderRadius: 12,
                  padding: '20px 24px',
                  maxWidth: 460,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#111111',
                    marginBottom: 10,
                  }}
                >
                  What you&rsquo;ll receive
                </p>
                <ul
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13.5,
                    color: '#5c5c5c',
                    lineHeight: 1.6,
                    paddingLeft: 18,
                    margin: 0,
                  }}
                >
                  <li style={{ marginBottom: 6 }}>
                    A written review covering technical health, SEO
                    fundamentals, and content gaps
                  </li>
                  <li style={{ marginBottom: 6 }}>
                    Specific observations about your site — not a generic
                    checklist
                  </li>
                  <li>Delivered to your inbox within two working days</li>
                </ul>
              </div>
            </div>

            {/* ── Form Card ──────────────────────────────────── */}
            <div
              style={{
                flex: 1,
                minWidth: 320,
                maxWidth: 480,
                border: '1px solid #e4e4e4',
                borderRadius: 16,
                padding: '32px 28px',
              }}
            >
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Reinforcement ────────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              background: '#f5f5f4',
              borderRadius: 16,
              padding: '48px 40px',
              textAlign: 'center',
            }}
            className="audit-cta-panel"
          >
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 24,
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
            .audit-layout {
              display: flex;
              gap: 48px;
              align-items: flex-start;
              flex-wrap: wrap;
            }
            @media (max-width: 860px) {
              .audit-layout { flex-direction: column; }
            }
            @media (max-width: 560px) {
              .audit-cta-panel { padding: 32px 22px !important; }
            }
          `,
        }}
      />
    </main>
  )
}
