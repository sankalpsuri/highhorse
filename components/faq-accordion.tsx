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
      {faqs.map((faq, i) => (
        <div key={faq._id} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <div className={styles.faqQuestionText}>{faq.question}</div>
            <div className={`${styles.faqIcon} ${openIdx === i ? styles.faqIconOpen : ''}`}>
              +
            </div>
          </button>
          {openIdx === i && (
            <div className={styles.faqAnswer}>
              {Array.isArray(faq.answer) ? (
                <PortableText value={faq.answer} />
              ) : (
                faq.answer
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
