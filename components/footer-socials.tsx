'use client'

import { usePathname } from 'next/navigation'
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import styles from './footer.module.css'

const WHATSAPP_PHONE = '918287194831'
const INSTAGRAM_URL = 'https://www.instagram.com/highhorse.in/?hl=en'
const LINKEDIN_URL =
  'https://www.linkedin.com/company/high-horse/posts/?feedView=all'
const X_URL = 'https://x.com/sankalpsuri7?s=11'

export function FooterSocials() {
  const pathname = usePathname()
  const pageUrl = `https://highhorse.in${pathname}`
  const waText = `Hello, I have a question about ${pageUrl}`
  const waHref = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(waText)}`

  return (
    <div className={styles.socials}>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="Instagram"
      >
        <FaInstagram size={18} />
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="LinkedIn"
      >
        <FaLinkedinIn size={18} />
      </a>
      <a
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="X"
      >
        <FaXTwitter size={18} />
      </a>
    </div>
  )
}
