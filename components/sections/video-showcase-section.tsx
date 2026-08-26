'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface VideoShowcaseSectionProps {
  heading?: string
  subtext?: string
  videoUrl?: string
  videoFile?: { asset?: { url?: string } }
  posterImage?: any
}

export function VideoShowcaseSection({ heading, subtext, videoUrl, videoFile, posterImage }: VideoShowcaseSectionProps) {
  const src = videoFile?.asset?.url || videoUrl
  const poster = posterImage?.asset ? urlFor(posterImage).width(1280).auto('format').url() : undefined

  return (
    <section>
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
          position: 'relative',
          width: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#111111',
          border: '1px solid #E4E4E4',
        }}>
          {src ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              poster={poster}
              style={{ width: '100%', maxHeight: 640, display: 'block', objectFit: 'cover', borderRadius: 16 }}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : poster ? (
            <Image
              src={poster}
              alt={heading || 'Video poster'}
              width={1280}
              height={720}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            <div style={{
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              color: '#8a8a86',
            }}>
              Video placeholder
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
