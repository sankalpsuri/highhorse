'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    // TODO: wire up newsletter subscription endpoint (Supabase, Mailchimp, etc.)
    // For now, simulate success after a short delay.
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitting(false)
    setDone(true)
  }

  if (done) {
    return (
      <p
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          color: '#b7bcc4',
          margin: 0,
        }}
      >
        Thanks! We&rsquo;ll keep you posted.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          style={{
            background: '#1c1f24',
            border: error ? '1px solid #ef4444' : '1px solid #33373e',
            borderRadius: 10,
            padding: '13px 16px',
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            width: '100%',
            maxWidth: 260,
            outline: 'none',
          }}
        />
        {error && (
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12,
              color: '#ef4444',
              textAlign: 'left',
            }}
          >
            {error}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        style={{
          background: submitting ? '#4a8aff' : '#1A6AFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: 10,
          padding: '13px 22px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          cursor: submitting ? 'default' : 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        {submitting ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  )
}
