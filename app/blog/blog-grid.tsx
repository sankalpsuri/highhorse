'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  seo: 'SEO',
  ecommerce: 'Ecommerce',
  'social-media': 'Social Media',
  'b2b-sales': 'B2B Sales',
  analytics: 'Analytics',
  geo: 'GEO',
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

export function BlogGrid({ posts }: { posts: BlogListItem[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = selected
    ? posts.filter((p) => p.categories?.includes(selected))
    : posts

  const activeCategories = Array.from(
    new Set(posts.flatMap((p) => p.categories || [])),
  )

  return (
    <section style={{ padding: '56px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: '#111111',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Latest articles
          </h2>

          {activeCategories.length > 0 && (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                style={{
                  background: '#111111',
                  color: '#fff',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                {selected ? categoryLabels[selected] || selected : 'All'}
                <span style={{ fontSize: 10 }}>&#9662;</span>
              </button>

              {open && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 6px)',
                    background: '#ffffff',
                    border: '1px solid #e4e4e4',
                    borderRadius: 12,
                    padding: '6px 0',
                    minWidth: 180,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    zIndex: 10,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => { setSelected(null); setOpen(false) }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      background: selected === null ? '#f5f5f4' : 'transparent',
                      border: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 13,
                      fontWeight: selected === null ? 700 : 400,
                      color: '#111111',
                      cursor: 'pointer',
                    }}
                  >
                    All
                  </button>
                  {activeCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSelected(cat); setOpen(false) }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        background: selected === cat ? '#f5f5f4' : 'transparent',
                        border: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 13,
                        fontWeight: selected === cat ? 700 : 400,
                        color: '#111111',
                        cursor: 'pointer',
                      }}
                    >
                      {categoryLabels[cat] || cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 14.5,
              color: '#8a8a86',
              padding: '40px 0',
              textAlign: 'center',
            }}
          >
            {posts.length === 0
              ? 'No articles yet. New content is on the way — check back soon.'
              : 'No articles in this category yet.'}
          </p>
        ) : (
          <div className="blog-article-grid">
            {filtered.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="hh-card-hover"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    aspectRatio: '16 / 9',
                    borderRadius: 12,
                    marginBottom: 14,
                    background: '#f5f5f4',
                    overflow: 'hidden',
                  }}
                >
                  {post.mainImage?.asset ? (
                    <Image
                      src={urlFor(post.mainImage).width(500).auto('format').url()}
                      alt={post.mainImage.alt || post.title}
                      width={500}
                      height={281}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#8a8a86',
                        }}
                      >
                        HIGH HORSE
                      </span>
                    </div>
                  )}
                </div>

                {post.categories && post.categories.length > 0 && (
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
                      marginBottom: 10,
                    }}
                  >
                    {categoryLabels[post.categories[0]] || post.categories[0]}
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    marginBottom: 8,
                  }}
                >
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 13,
                      color: '#5c5c5c',
                      marginBottom: 10,
                      lineHeight: 1.55,
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 12,
                    color: '#8a8a86',
                    marginBottom: 10,
                  }}
                >
                  {post.author?.name && (
                    <span style={{ marginRight: 14 }}>{post.author.name}</span>
                  )}
                  {post.publishedAt && (
                    <span style={{ marginRight: 14 }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <span
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1A6AFF',
                  }}
                >
                  Read More
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-article-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px 26px;
            }
            @media (max-width: 860px) {
              .blog-article-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 560px) {
              .blog-article-grid { grid-template-columns: 1fr; }
            }
            @media (max-width: 374px) {
              .blog-article-grid { gap: 20px 0; }
            }
          `,
        }}
      />
    </section>
  )
}
