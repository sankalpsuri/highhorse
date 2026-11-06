'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { submitLandingLead } from '@/lib/submit-landing-lead'
import styles from './landing-contact-form.module.css'

interface LandingContactFormProps {
  variant: 'footer' | 'popup'
  onSuccess?: () => void
}

interface FormState {
  name: string
  email: string
  phone: string
  problem: string
  want: string
  honeypot: string
  submitting: boolean
  submitError: string
  fieldErrors: Record<string, string>
  done: boolean
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  problem: '',
  want: '',
  honeypot: '',
  submitting: false,
  submitError: '',
  fieldErrors: {},
  done: false,
}

export function LandingContactForm({ variant, onSuccess }: LandingContactFormProps) {
  const [s, setS] = useState<FormState>(initial)

  const ctxRef = useRef({
    page_url: '', referrer: '', user_agent: '',
    utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
  })

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    ctxRef.current = {
      page_url: window.location.href, referrer: document.referrer, user_agent: navigator.userAgent,
      utm_source: p.get('utm_source') || '', utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '', utm_term: p.get('utm_term') || '',
      utm_content: p.get('utm_content') || '',
    }
  }, [])

  const set = useCallback(
    (key: keyof FormState, value: string) =>
      setS((prev) => ({ ...prev, [key]: value, submitError: '', fieldErrors: {} })),
    [],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setS((prev) => ({ ...prev, submitting: true, submitError: '', fieldErrors: {} }))

    try {
      const result = await submitLandingLead({
        landing_page: 'landing',
        form_location: variant,
        name: s.name,
        email: s.email,
        phone: s.phone,
        problem: s.problem,
        message: s.want,
        honeypot: s.honeypot,
        ...ctxRef.current,
      })

      if (!result.success) {
        setS((prev) => ({
          ...prev,
          submitting: false,
          submitError: result.error || '',
          fieldErrors: result.fieldErrors || {},
        }))
        return
      }

      setS({ ...initial, done: true })
      if (onSuccess) setTimeout(onSuccess, 2000)
    } catch {
      setS((prev) => ({
        ...prev,
        submitting: false,
        submitError: 'Something went wrong. Please try again or email contact@highhorse.in.',
      }))
    }
  }

  const isFooter = variant === 'footer'

  if (s.done) {
    return (
      <div className={`${styles.form} ${isFooter ? styles.formFooter : styles.formPopup}`}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>&#10003;</div>
          <div className={styles.successHeading}>Thank you!</div>
          <div className={styles.successText}>
            We&rsquo;ll get back to you within one business day.
          </div>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => setS(initial)}
          >
            Send Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className={`${styles.form} ${isFooter ? styles.formFooter : styles.formPopup}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input
          type="text"
          name="address"
          tabIndex={-1}
          autoComplete="off"
          value={s.honeypot}
          onChange={(e) => set('honeypot', e.target.value)}
        />
      </div>

      <div className={isFooter ? styles.rowTwo : styles.rowOne}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input
            className={styles.input}
            placeholder="John Doe"
            value={s.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
          />
          {s.fieldErrors.name && <div className={styles.error}>{s.fieldErrors.name}</div>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email Address</label>
          <input
            className={styles.input}
            placeholder="john@company.com"
            type="email"
            value={s.email}
            onChange={(e) => set('email', e.target.value)}
            autoComplete="email"
          />
          {s.fieldErrors.email && <div className={styles.error}>{s.fieldErrors.email}</div>}
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Phone Number</label>
        <input
          className={styles.input}
          placeholder="+91 12345 67890"
          type="tel"
          value={s.phone}
          onChange={(e) => set('phone', e.target.value)}
          autoComplete="tel"
        />
        {s.fieldErrors.phone && <div className={styles.error}>{s.fieldErrors.phone}</div>}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>What&rsquo;s your biggest challenge?</label>
        <input
          className={styles.input}
          placeholder="Briefly describe your main challenge"
          value={s.problem}
          onChange={(e) => set('problem', e.target.value)}
        />
        {s.fieldErrors.problem && <div className={styles.error}>{s.fieldErrors.problem}</div>}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>What outcome are you looking for?</label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Tell us what success looks like for you"
          rows={3}
          value={s.want}
          onChange={(e) => set('want', e.target.value)}
        />
        {s.fieldErrors.message && <div className={styles.error}>{s.fieldErrors.message}</div>}
      </div>
      {s.submitError && <div className={styles.error}>{s.submitError}</div>}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={s.submitting}
      >
        {s.submitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
  )
}
