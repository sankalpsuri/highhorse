import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface CaseStudy {
  clientName: string
  slug: string
  logo?: any
  resultImages?: any[]
}

interface ClientProofSectionProps {
  heading?: string
  bodyText?: string
  caseStudies?: CaseStudy[]
}

export function ClientProofSection({ heading, bodyText, caseStudies }: ClientProofSectionProps) {
  return (
    <section style={{ background: '#F5F5F4', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
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
        {caseStudies && caseStudies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {caseStudies.map((cs) => (
              <div key={cs.slug} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                flexWrap: 'wrap',
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 8,
                padding: '32px 36px',
              }}>
                <div style={{ flex: '0 0 120px', textAlign: 'center' }}>
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
                      fontSize: 16,
                      color: '#111111',
                      margin: 0,
                    }}>
                      {cs.clientName}
                    </p>
                  )}
                </div>
                {cs.resultImages && cs.resultImages.length > 0 && (
                  <div style={{ flex: 1, display: 'flex', gap: 16, flexWrap: 'wrap', minWidth: 200 }}>
                    {cs.resultImages.map((img: any, i: number) => (
                      img?.asset ? (
                        <Image
                          key={i}
                          src={urlFor(img).width(400).auto('format').url()}
                          alt={`${cs.clientName} result ${i + 1}`}
                          width={400}
                          height={240}
                          style={{
                            flex: '1 1 180px',
                            width: '100%',
                            maxWidth: 340,
                            height: 'auto',
                            borderRadius: 6,
                            border: '1px solid #E4E4E4',
                          }}
                        />
                      ) : null
                    ))}
                  </div>
                )}
                {(!cs.resultImages || cs.resultImages.length === 0) && (
                  <div style={{
                    flex: 1,
                    minWidth: 200,
                    aspectRatio: '16 / 7',
                    background: '#E4E4E4',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    color: '#8a8a86',
                  }}>
                    Result images placeholder
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
