'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { submitContactForm } from './actions'
import styles from './contact.module.css'

const stepDefs = [
  { label: 'Your priority', title: 'What do you want search to do for you?', sub: 'Pick everything that applies. This shapes what we look at first.' },
  { label: 'Your business', title: 'Who are you and what do you sell?', sub: 'Enough context for us to look at your category properly.' },
  { label: 'Scale and timing', title: 'Where are you today?', sub: 'Ranges are fine. We use this to judge what is realistic.' },
  { label: 'Your details', title: 'Where should we send the review?', sub: 'One named person on your side, so nothing gets lost.' },
]

const goalDefs = [
  { id: 'paid', label: 'Get more from paid search', desc: 'Spend is running but qualified leads are flat.' },
  { id: 'organic', label: 'Rank and get cited in AI answers', desc: 'SEO, AEO/GEO and content that gets found.' },
  { id: 'convert', label: 'Convert the traffic I already have', desc: 'Visitors arrive, few enquire or buy.' },
  { id: 'build', label: 'Build the website or store properly', desc: 'UI/UX, development, marketplace optimisation.' },
  { id: 'unsure', label: 'Not sure yet — show me where the loss is', desc: 'Start with a review of the whole search picture.' },
]

const regions = ['India', 'GCC / Middle East', 'US / Europe', 'Global']
const spends = ['Under ₹1L / month', '₹1–5L / month', '₹5–15L / month', '₹15L+ / month', 'Nothing yet']
const timelines = ['Immediately', 'Within a month', 'This quarter', 'Just exploring']

interface FormState {
  step: number
  goals: string[]
  company: string
  website: string
  offering: string
  region: string
  spend: string
  timeline: string
  outcome: string
  name: string
  role: string
  email: string
  phone: string
  emailError: boolean
  submitError: string
  submitting: boolean
  done: boolean
}

const initial: FormState = {
  step: 0,
  goals: [],
  company: '',
  website: '',
  offering: '',
  region: '',
  spend: '',
  timeline: '',
  outcome: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  emailError: false,
  submitError: '',
  submitting: false,
  done: false,
}

export function ContactForm() {
  const [s, setS] = useState<FormState>(initial)

  const set = useCallback(
    (key: keyof FormState, value: string) =>
      setS((prev) => ({ ...prev, [key]: value, emailError: false })),
    [],
  )

  const toggleGoal = useCallback(
    (id: string) =>
      setS((prev) => ({
        ...prev,
        goals: prev.goals.includes(id)
          ? prev.goals.filter((g) => g !== id)
          : [...prev.goals, id],
      })),
    [],
  )

  const canAdvance = (): boolean => {
    if (s.step === 0) return s.goals.length > 0
    if (s.step === 1) return s.company.trim() !== ''
    if (s.step === 2) return s.spend !== ''
    return s.name.trim() !== '' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email.trim())
  }

  const next = async () => {
    if (!canAdvance()) {
      if (s.step === 3) setS((prev) => ({ ...prev, emailError: true }))
      return
    }
    if (s.step === 3) {
      setS((prev) => ({ ...prev, submitting: true, submitError: '' }))
      try {
        const result = await submitContactForm({
          goals: s.goals,
          company: s.company,
          website: s.website,
          offering: s.offering,
          region: s.region,
          spend: s.spend,
          timeline: s.timeline,
          outcome: s.outcome,
          name: s.name,
          role: s.role,
          email: s.email,
          phone: s.phone,
        })
        if (!result.success) {
          setS((prev) => ({
            ...prev,
            submitting: false,
            submitError: result.error || 'Something went wrong. Please try again.',
          }))
          return
        }
        setS((prev) => ({ ...prev, submitting: false, done: true }))
      } catch {
        setS((prev) => ({
          ...prev,
          submitting: false,
          submitError: 'Could not reach the server. Please check your connection and try again.',
        }))
      }
      return
    }
    setS((prev) => ({ ...prev, step: prev.step + 1 }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    if (s.step > 0) setS((prev) => ({ ...prev, step: prev.step - 1 }))
  }

  const restart = () => setS(initial)

  const ok = canAdvance()
  const pct = s.done ? 100 : (s.step / 4) * 100 + 12

  const hint = ok
    ? ''
    : ['Pick at least one', 'Company name needed', 'Pick a spend range', 'Name and email needed'][s.step]

  const summaryRows = [
    { k: 'Priority', v: s.goals.length ? goalDefs.filter((g) => s.goals.includes(g.id)).map((g) => g.label).join(', ') : '—' },
    { k: 'Company', v: s.company || '—' },
    { k: 'Market', v: s.region || '—' },
    { k: 'Spend', v: s.spend || '—' },
    { k: 'Timing', v: s.timeline || '—' },
  ]

  const thanksName = s.name.trim() ? `, ${s.name.trim().split(' ')[0]}` : ''

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Sidebar ──────────────────────────────────────── */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarLabel}>Find your search opportunity</div>
          <h1 className={styles.sidebarHeading}>Tell us about your business.</h1>
          <p className={styles.sidebarText}>
            Four short steps, about two minutes. We use your answers to review your category and
            search presence before we speak, so the first call is specific rather than generic.
          </p>
          <div className={styles.stepIndicator}>
            {stepDefs.map((st, i) => {
              const complete = s.done || i < s.step
              const active = !s.done && i === s.step
              return (
                <div key={st.label} className={styles.stepRow}>
                  <div
                    className={`${styles.stepDot} ${complete ? styles.stepDotComplete : ''} ${active ? styles.stepDotActive : ''}`}
                  >
                    {complete ? '✓' : i + 1}
                  </div>
                  <div
                    className={`${styles.stepLabel} ${active ? styles.stepLabelActive : ''} ${complete ? styles.stepLabelComplete : ''}`}
                  >
                    {st.label}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.emailFallback}>
            Prefer email? <a href="mailto:hello@highhorse.in">hello@highhorse.in</a>
          </div>
        </div>

        {/* ── Form Card ────────────────────────────────────── */}
        <div className={styles.formArea}>
          <div className={styles.formCard}>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: `${pct}%` }} />
            </div>

            <div className={styles.formBody}>
              {/* ── Step Header ──────────────────────────── */}
              {!s.done && (
                <div>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepCounter}>Step {s.step + 1} of 4</div>
                    {s.step === 2 && <div className={styles.optionalNote}>Ranges are fine</div>}
                  </div>
                  <h2 className={styles.stepTitle}>{stepDefs[s.step].title}</h2>
                  <p className={styles.stepSub}>{stepDefs[s.step].sub}</p>
                </div>
              )}

              {/* ── Step 1: Goals ────────────────────────── */}
              {!s.done && s.step === 0 && (
                <div className={styles.goalGrid}>
                  {goalDefs.map((g) => {
                    const on = s.goals.includes(g.id)
                    return (
                      <div
                        key={g.id}
                        className={`${styles.goalCard} ${on ? styles.goalCardSelected : ''}`}
                        onClick={() => toggleGoal(g.id)}
                      >
                        <div className={`${styles.goalCheckbox} ${on ? styles.goalCheckboxSelected : ''}`}>
                          {on ? '✓' : ''}
                        </div>
                        <div>
                          <div className={styles.goalLabel}>{g.label}</div>
                          <div className={styles.goalDesc}>{g.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* ── Step 2: Business ─────────────────────── */}
              {!s.done && s.step === 1 && (
                <div className={styles.fieldGrid}>
                  <div>
                    <div className={styles.fieldLabel}>Company name</div>
                    <input
                      className={styles.input}
                      value={s.company}
                      onChange={(e) => set('company', e.target.value)}
                      placeholder="High Horse Pvt Ltd"
                    />
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>Website</div>
                    <input
                      className={styles.input}
                      value={s.website}
                      onChange={(e) => set('website', e.target.value)}
                      placeholder="www.yourcompany.com"
                    />
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>What do you sell, and to whom?</div>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      value={s.offering}
                      onChange={(e) => set('offering', e.target.value)}
                      placeholder="Insulating varnish to transformer manufacturers across North India"
                    />
                  </div>
                  <div>
                    <div className={styles.fieldLabelChip}>Where do your customers search from?</div>
                    <div className={styles.chipRow}>
                      {regions.map((r) => (
                        <div
                          key={r}
                          className={`${styles.chip} ${s.region === r ? styles.chipActive : ''}`}
                          onClick={() => set('region', r)}
                        >
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Scale & Timing ───────────────── */}
              {!s.done && s.step === 2 && (
                <div className={styles.scaleGrid}>
                  <div>
                    <div className={styles.fieldLabelChip}>Current monthly marketing spend</div>
                    <div className={styles.chipRow}>
                      {spends.map((v) => (
                        <div
                          key={v}
                          className={`${styles.chip} ${s.spend === v ? styles.chipActive : ''}`}
                          onClick={() => set('spend', v)}
                        >
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.fieldLabelChip}>When would you want to start?</div>
                    <div className={styles.chipRow}>
                      {timelines.map((v) => (
                        <div
                          key={v}
                          className={`${styles.chip} ${s.timeline === v ? styles.chipActive : ''}`}
                          onClick={() => set('timeline', v)}
                        >
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>
                      What is the one result that would make this worth it?
                    </div>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      value={s.outcome}
                      onChange={(e) => set('outcome', e.target.value)}
                      placeholder="A steady flow of qualified enquiries from India and the Gulf, at a cost we can defend"
                    />
                  </div>
                </div>
              )}

              {/* ── Step 4: Details ──────────────────────── */}
              {!s.done && s.step === 3 && (
                <div className={styles.fieldGrid}>
                  <div className={styles.nameRow}>
                    <div className={styles.nameField}>
                      <div className={styles.fieldLabel}>Full name</div>
                      <input
                        className={styles.input}
                        value={s.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="Sankalp Suri"
                      />
                    </div>
                    <div className={styles.nameField}>
                      <div className={styles.fieldLabel}>Role</div>
                      <input
                        className={styles.input}
                        value={s.role}
                        onChange={(e) => set('role', e.target.value)}
                        placeholder="Founder"
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>Work email</div>
                    <input
                      className={`${styles.input} ${s.emailError ? styles.inputError : ''}`}
                      value={s.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="you@company.com"
                    />
                    {s.emailError && (
                      <div className={styles.errorText}>
                        Please enter a valid work email so we can send the review.
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>
                      Phone <span className={styles.optionalTag}>(optional)</span>
                    </div>
                    <input
                      className={styles.input}
                      value={s.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="+91"
                    />
                  </div>
                  <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Your answers so far</div>
                    {summaryRows.map((row) => (
                      <div key={row.k} className={styles.summaryRow}>
                        <div className={styles.summaryKey}>{row.k}</div>
                        <div className={styles.summaryVal}>{row.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Done State ───────────────────────────── */}
              {s.done && (
                <div className={styles.doneWrap}>
                  <div className={styles.doneIcon}>✓</div>
                  <h2 className={styles.doneHeading}>Thanks{thanksName}. We have what we need to start.</h2>
                  <p className={styles.doneText}>
                    We will review your category, competitors and current search presence, then come
                    back within two working days with one specific opportunity worth acting on.
                  </p>
                  <div className={styles.doneCtas}>
                    <Link href="/" className={styles.doneBtn}>
                      Back to site
                    </Link>
                    <button type="button" className={styles.doneBtnSecondary} onClick={restart}>
                      Send another
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Form Footer ──────────────────────────── */}
            {!s.done && (
              <div className={styles.formFooter}>
                <button
                  type="button"
                  className={`${styles.backBtn} ${s.step === 0 ? styles.backBtnHidden : ''}`}
                  onClick={back}
                  disabled={s.submitting}
                >
                  Back
                </button>
                <div className={styles.footerRight}>
                  {s.submitError && (
                    <div className={styles.errorText}>{s.submitError}</div>
                  )}
                  {hint && !s.submitError && <div className={styles.hint}>{hint}</div>}
                  <button
                    type="button"
                    className={`${styles.nextBtn} ${!ok || s.submitting ? styles.nextBtnDisabled : ''}`}
                    onClick={next}
                    disabled={s.submitting}
                  >
                    {s.submitting ? 'Sending…' : s.step === 3 ? 'Send it' : 'Continue'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
