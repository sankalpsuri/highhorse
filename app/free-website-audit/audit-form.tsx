'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitAuditRequest } from './actions'

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: '#ffffff',
  border: '1px solid #e4e4e4',
  borderRadius: 8,
  padding: '13px 16px',
  fontFamily: 'Poppins, sans-serif',
  fontSize: 14,
  color: '#111111',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  color: '#111111',
  marginBottom: 6,
  display: 'block',
}

export function AuditForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !websiteUrl.trim()) {
      setError('Name, email, and website URL are required.')
      return
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      const result = await submitAuditRequest({
        name,
        email,
        websiteUrl,
        phone,
        notes,
      })
      if (!result.success) {
        setError(result.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      setSubmitting(false)
      setDone(true)
    } catch {
      setError(
        'Could not reach the server. Please check your connection and try again.',
      )
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#1A6AFF',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#111111',
            marginBottom: 12,
          }}
        >
          Request received
        </h2>
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14.5,
            color: '#5c5c5c',
            maxWidth: 440,
            margin: '0 auto 24px',
            lineHeight: 1.55,
          }}
        >
          We&rsquo;ll review your site and send back findings within two
          working days.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: '#1A6AFF',
            textDecoration: 'none',
          }}
        >
          Back to site
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={labelStyle}>
            Full Name <span style={{ color: '#1A6AFF' }}>*</span>
          </label>
          <input
            style={fieldStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label style={labelStyle}>
            Email <span style={{ color: '#1A6AFF' }}>*</span>
          </label>
          <input
            type="email"
            style={fieldStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label style={labelStyle}>
            Website URL <span style={{ color: '#1A6AFF' }}>*</span>
          </label>
          <input
            type="url"
            style={fieldStyle}
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://www.yoursite.com"
          />
        </div>

        <div>
          <label style={labelStyle}>
            Phone{' '}
            <span
              style={{
                fontWeight: 400,
                color: '#8a8a86',
                fontSize: 12,
              }}
            >
              (optional)
            </span>
          </label>
          <input
            style={fieldStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91"
          />
        </div>

        <div>
          <label style={labelStyle}>
            What should we focus on?{' '}
            <span
              style={{
                fontWeight: 400,
                color: '#8a8a86',
                fontSize: 12,
              }}
            >
              (optional)
            </span>
          </label>
          <textarea
            style={{ ...fieldStyle, resize: 'vertical', minHeight: 80 }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. slow load times, not ranking for key terms, low conversion rate"
            rows={3}
          />
        </div>

        {error && (
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              color: '#ef4444',
              margin: 0,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: submitting ? '#4a8aff' : '#1A6AFF',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            cursor: submitting ? 'default' : 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          {submitting ? 'Sending...' : 'Request My Free Audit'}
        </button>
      </div>
    </form>
  )
}
