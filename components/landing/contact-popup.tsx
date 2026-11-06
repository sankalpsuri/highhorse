'use client'

import { useEffect, useRef, useCallback } from 'react'
import { LandingContactForm } from './landing-contact-form'
import styles from './contact-popup.module.css'

interface ContactPopupProps {
  open: boolean
  onClose: () => void
}

export function ContactPopup({ open, onClose }: ContactPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<Element | null>(null)

  const close = useCallback(() => {
    dialogRef.current?.close()
    onClose()
    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus()
    }
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      triggerRef.current = document.activeElement
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      close()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [close])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) close()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      aria-label="Contact us"
    >
      <div className={styles.modal}>
        <div className={styles.blueEdge} />
        <button
          type="button"
          className={styles.closeBtn}
          onClick={close}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className={styles.body}>
          <div className={styles.eyebrow}>CONTACT US</div>
          <h2 className={styles.heading}>Tell us what you need</h2>
          <p className={styles.sub}>We&rsquo;ll get back to you within one business day.</p>
          <LandingContactForm variant="popup" onSuccess={close} />
        </div>
      </div>
    </dialog>
  )
}
