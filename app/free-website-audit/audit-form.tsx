'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { submitAuditRequest } from './actions'
import styles from './audit.module.css'

export function AuditCaptureBar() {
  const [url, setUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = useCallback(() => setModalOpen(false), [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal()
  }

  return (
    <>
      <form className={styles.captureBar} onSubmit={handleSubmit}>
        <input
          type="url"
          className={styles.captureInput}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.yoursite.com"
          aria-label="Website URL"
        />
        <button type="submit" className={styles.captureBtn}>
          Get Free Audit
        </button>
      </form>

      {modalOpen && (
        <AuditModal
          initialUrl={url}
          onClose={closeModal}
        />
      )}
    </>
  )
}

function AuditModal({
  initialUrl,
  onClose,
}: {
  initialUrl: string
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState(initialUrl)
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

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

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal} ref={panelRef} role="dialog" aria-modal="true">
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {done ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>&#10003;</div>
            <h2 className={styles.successTitle}>Request received</h2>
            <p className={styles.successBody}>
              We&rsquo;ll review your site and send back findings within two
              working days.
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Request Your Free Audit</h2>
            <p className={styles.modalSub}>
              Tell us a bit about yourself and we&rsquo;ll review your site.
            </p>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  className={styles.field}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Website URL <span className={styles.required}>*</span>
                </label>
                <input
                  type="url"
                  className={styles.field}
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://www.yoursite.com"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Phone{' '}
                  <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  className={styles.field}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  What should we focus on?{' '}
                  <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  className={`${styles.field} ${styles.textarea}`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. slow load times, not ranking for key terms, low conversion rate"
                  rows={3}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className={styles.submitBtn}
              >
                {submitting ? 'Sending...' : 'Request My Free Audit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
