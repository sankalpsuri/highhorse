'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import styles from '@/app/home.module.css'

interface FaqItem {
  _id: string
  question: string
  answer: any
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  if (faqs.length === 0) {
    return (
      <div className={styles.faqList}>
        <div className={styles.faqEmpty}>
          No FAQs yet. Check back soon, or ask us directly.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i
        return (
          <div
            key={faq._id}
            className={styles.faqItem}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <button
              className={`${styles.faqQuestion} ${isOpen ? styles.faqQuestionOpen : ''}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <div className={styles.faqQuestionText}>{faq.question}</div>
              <div className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
                +
              </div>
            </button>
            <div className={`${styles.faqAnswerWrap} ${isOpen ? styles.faqAnswerWrapOpen : ''}`}>
              <div className={styles.faqAnswerInner}>
                <div className={styles.faqAnswer}>
                  {Array.isArray(faq.answer) ? (
                    <PortableText value={faq.answer} />
                  ) : (
                    faq.answer
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
