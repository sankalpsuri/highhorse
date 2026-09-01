import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface CaseStudy {
  clientName: string
  slug: string
  logo?: any
  resultImages?: any[]
  proofImage?: any
}

interface ClientProofSectionProps {
  heading?: string
  bodyText?: string
  caseStudies?: CaseStudy[]
}

export function ClientProofSection({ heading, bodyText, caseStudies }: ClientProofSectionProps) {
  const studiesWithProof = caseStudies?.filter((cs) => cs.proofImage?.asset)
  const displayStudies = studiesWithProof && studiesWithProof.length > 0 ? studiesWithProof : caseStudies

  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div className="rsp-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        {heading && (
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)',
            lineHeight: 1.2,
            margin: '0 0 16px',
            color: '#111111',
          }}>
            {heading}
          </h2>
        )}
        {bodyText && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#5c5c5c',
            maxWidth: 680,
            margin: '0 0 48px',
          }}>
            {bodyText}
          </p>
        )}

        {displayStudies && displayStudies.length > 0 && (
          <div className="rsp-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {displayStudies.map((cs) => (
              <div key={cs.slug} style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: 12, overflow: 'hidden' }}>
                {cs.proofImage?.asset ? (
                  <Image
                    src={urlFor(cs.proofImage).width(700).auto('format').url()}
                    alt={`${cs.clientName} proof`}
                    width={700}
                    height={400}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      maxWidth: 700,
                    }}
                  />
                ) : (
                  <div style={{
                    aspectRatio: '16 / 9',
                    background: '#E4E4E4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    color: '#8a8a86',
                  }}>
                    Proof image placeholder
                  </div>
                )}
                <div style={{ padding: '16px 20px' }}>
                  {cs.logo?.asset ? (
                    <Image
                      src={urlFor(cs.logo).width(200).auto('format').url()}
                      alt={cs.clientName}
                      width={100}
                      height={40}
                      style={{ width: 100, height: 'auto', objectFit: 'contain' }}
                    />
                  ) : (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      color: '#161616',
                      margin: 0,
                    }}>
                      {cs.clientName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
