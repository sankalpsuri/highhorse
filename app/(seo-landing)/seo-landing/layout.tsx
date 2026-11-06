import type { Metadata } from "next"

const SEO_LANDING_SLUG = "seo-landing"

export const metadata: Metadata = {
  title: "Top SEO Services in India | High Horse",
  description:
    "Strategic SEO that gets you ranked, visible and profitable. 40+ industries served. Book a free strategy call.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `https://highhorse.in/${SEO_LANDING_SLUG}`,
  },
}

export default function SeoLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
