import { LandingHeader } from '@/components/landing/landing-header'
import { LandingFooter } from '@/components/landing/landing-footer'
import { ContactPopupProvider } from '@/components/landing/contact-popup-provider'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactPopupProvider>
      <LandingHeader />
      {children}
      <LandingFooter />
    </ContactPopupProvider>
  )
}
