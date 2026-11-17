import type { Metadata } from "next"
import WhatsAppChatWidget from "@/components/whatsapp-chat-widget"

const SEM_LANDING_SLUG = "sem-landing"

export const metadata: Metadata = {
  title: "Performance Marketing Agency India | High Horse",
  description:
    "Performance marketing that turns ad spend into revenue. Google Ads, Meta Ads, PPC experts. Book a free strategy call.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `https://highhorse.in/${SEM_LANDING_SLUG}`,
  },
}

export default function SemLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WhatsAppChatWidget landingPage="sem-landing" />
    </>
  )
}
