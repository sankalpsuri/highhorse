import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Find Your Search Opportunity — High Horse',
  description:
    'Tell us about your business. We review your category and search presence so the first call is specific, not generic.',
}

export default function ContactPage() {
  return <ContactForm />
}
