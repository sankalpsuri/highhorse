'use client'

import { useState, useCallback, useRef } from 'react'
import styles from './careers.module.css'

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+65', label: '🇸🇬 +65' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+81', label: '🇯🇵 +81' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+82', label: '🇰🇷 +82' },
]

const JOB_ROLES = [
  'SEO & Search Strategy',
  'Performance Marketing',
  'Content Writing & Copywriting',
  'Social Media Marketing',
  'UI/UX Design',
  'Website Development',
  'Graphic Design & Video Editing',
  'Automation & CRM Systems',
  'Business Development & Client Success',
]

const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'internship', label: 'Internship' },
]

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

interface FormState {
  name: string
  countryCode: string
  phone: string
  employmentType: string
  experience: string
  jobRole: string
  resume: File | null
  uniqueValue: string
  resumeError: string
  submitted: boolean
  errors: Record<string, boolean>
}

const initial: FormState = {
  name: '',
  countryCode: '+91',
  phone: '',
  employmentType: '',
  experience: '',
  jobRole: '',
  resume: null,
  uniqueValue: '',
  resumeError: '',
  submitted: false,
  errors: {},
}

export function CareersForm() {
  const [s, setS] = useState<FormState>(initial)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = useCallback(
    (key: keyof FormState, value: string) =>
      setS((prev) => ({
        ...prev,
        [key]: value,
        resumeError: key === 'resume' ? '' : prev.resumeError,
        errors: { ...prev.errors, [key]: false },
      })),
    [],
  )

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.includes(ext) && !ACCEPTED_MIME_TYPES.includes(file.type)) {
      setS((prev) => ({
        ...prev,
        resume: null,
        resumeError: 'Only PDF and Word files (.pdf, .doc, .docx) are accepted.',
        errors: { ...prev.errors, resume: false },
      }))
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    setS((prev) => ({
      ...prev,
      resume: file,
      resumeError: '',
      errors: { ...prev.errors, resume: false },
    }))
  }, [])

  const validate = (): boolean => {
    const errors: Record<string, boolean> = {}
    if (!s.name.trim()) errors.name = true
    if (!s.phone.trim()) errors.phone = true
    if (!s.employmentType) errors.employmentType = true
    if (!s.experience.trim()) errors.experience = true
    if (!s.jobRole) errors.jobRole = true
    if (!s.resume) errors.resume = true

    setS((prev) => ({ ...prev, errors }))
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    // TODO: Wire up form submission here once the destination (email, ATS, or CRM) is decided.
    // Form data: s.name, s.countryCode, s.phone, s.employmentType, s.experience, s.jobRole, s.resume, s.uniqueValue
    setS((prev) => ({ ...prev, submitted: true }))
  }

  if (s.submitted) {
    const firstName = s.name.trim().split(' ')[0]
    return (
      <div className={styles.formCard}>
        <div className={styles.doneWrap}>
          <div className={styles.doneIcon}>✓</div>
          <h3 className={styles.doneHeading}>
            Thanks{firstName ? `, ${firstName}` : ''}. Application received.
          </h3>
          <p className={styles.doneText}>
            We will review your application and get back to you within five working days if there
            is a fit.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.formTitle}>Apply Now</div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Full Name<span className={styles.required}>*</span>
        </label>
        <input
          className={`${styles.input} ${s.errors.name ? styles.inputError : ''}`}
          value={s.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Your full name"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Phone Number<span className={styles.required}>*</span>
        </label>
        <div className={styles.phoneRow}>
          <select
            className={styles.codeSelect}
            value={s.countryCode}
            onChange={(e) => set('countryCode', e.target.value)}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            className={`${styles.phoneInput} ${s.errors.phone ? styles.inputError : ''}`}
            value={s.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="Phone number"
            type="tel"
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Employment Type<span className={styles.required}>*</span>
        </label>
        <div className={styles.radioGroup}>
          {EMPLOYMENT_TYPES.map((t) => (
            <div key={t.value} className={styles.radioOption}>
              <input
                type="radio"
                id={`emp-${t.value}`}
                name="employmentType"
                value={t.value}
                checked={s.employmentType === t.value}
                onChange={(e) => set('employmentType', e.target.value)}
                className={styles.radioInput}
              />
              <label htmlFor={`emp-${t.value}`} className={styles.radioLabel}>
                {t.label}
              </label>
            </div>
          ))}
        </div>
        {s.errors.employmentType && (
          <div className={styles.errorText}>Please select an employment type.</div>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Experience<span className={styles.required}>*</span>
        </label>
        <input
          className={`${styles.input} ${s.errors.experience ? styles.inputError : ''}`}
          value={s.experience}
          onChange={(e) => set('experience', e.target.value)}
          placeholder="e.g. 2 years, Fresher"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Job Looking For<span className={styles.required}>*</span>
        </label>
        <select
          className={`${styles.select} ${s.errors.jobRole ? styles.inputError : ''}`}
          value={s.jobRole}
          onChange={(e) => set('jobRole', e.target.value)}
        >
          <option value="">Select a role</option>
          {JOB_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Add Resume<span className={styles.required}>*</span>
        </label>
        <div className={styles.fileRow}>
          <button
            type="button"
            className={styles.fileBtn}
            onClick={() => fileRef.current?.click()}
          >
            Choose File
          </button>
          {s.resume && <span className={styles.fileName}>{s.resume.name}</span>}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.fileHint}>PDF or Word files only (.pdf, .doc, .docx)</div>
        {s.resumeError && <div className={styles.errorText}>{s.resumeError}</div>}
        {s.errors.resume && !s.resumeError && (
          <div className={styles.errorText}>Please attach your resume.</div>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Your Unique Value as a Candidate</label>
        <textarea
          className={styles.textarea}
          rows={4}
          value={s.uniqueValue}
          onChange={(e) => set('uniqueValue', e.target.value)}
          placeholder="What makes you a great fit for this role?"
        />
      </div>

      <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
        Submit Application
      </button>
    </div>
  )
}
