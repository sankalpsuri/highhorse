'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface Logo {
  _key?: string
  name?: string
  image?: any
  displayText?: string
  bgColor?: string
  textColor?: string
}

interface FilesystemLogo {
  name: string
  src: string
}

interface TechSliderSectionProps {
  heading?: string
  subtext?: string
  logos?: Logo[]
  filesystemLogos?: FilesystemLogo[]
}

export function TechSliderSection({ heading, subtext, logos, filesystemLogos }: TechSliderSectionProps) {
  const hasFs = filesystemLogos && filesystemLogos.length > 0
  const hasCms = logos && logos.length > 0
  if (!hasFs && !hasCms) return null

  const fsTile = (logo: FilesystemLogo, keyPrefix: string, i: number) => (
    <div
      key={`${keyPrefix}-fs-${i}`}
      aria-hidden={keyPrefix === 'dup' ? true : undefined}
      style={{
        flexShrink: 0,
        width: 130,
        aspectRatio: '1 / 0.85',
        background: '#F5F5F4',
        border: '1px solid #E4E4E4',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={logo.name}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={80}
        height={80}
        style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain' }}
      />
    </div>
  )

  const cmsTile = (logo: Logo, keyPrefix: string, i: number) => (
    <div
      key={`${keyPrefix}-${i}`}
      aria-hidden={keyPrefix === 'dup' ? true : undefined}
      style={{
        flexShrink: 0,
        width: 130,
        aspectRatio: '1 / 0.85',
        background: logo.bgColor || '#F5F5F4',
        border: '1px solid #E4E4E4',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 34,
        color: logo.textColor || '#111111',
        fontWeight: 700,
      }}
      title={logo.name}
    >
      {logo.image?.asset ? (
        <Image
          src={urlFor(logo.image).width(80).auto('format').url()}
          alt={logo.name || ''}
          width={80}
          height={80}
          style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain' }}
        />
      ) : (
        logo.displayText
      )}
    </div>
  )

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
        {subtext && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#5c5c5c',
            maxWidth: 680,
            margin: '0 0 36px',
          }}>
            {subtext}
          </p>
        )}
        <div style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}>
          <div
            className="tech-marquee-track"
            style={{
              display: 'flex',
              gap: 16,
              width: 'max-content',
            }}
          >
            {hasFs
              ? <>
                  {filesystemLogos!.map((logo, i) => fsTile(logo, 'orig', i))}
                  {filesystemLogos!.map((logo, i) => fsTile(logo, 'dup', i))}
                </>
              : <>
                  {logos!.map((logo, i) => cmsTile(logo, 'orig', i))}
                  {logos!.map((logo, i) => cmsTile(logo, 'dup', i))}
                </>
            }
          </div>
        </div>
      </div>
      <style>{`
        .tech-marquee-track {
          animation: tech-marquee 25s linear infinite;
        }
        .tech-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes tech-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
