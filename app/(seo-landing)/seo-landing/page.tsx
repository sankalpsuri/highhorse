import { getClientLogos } from "@/lib/get-client-logos"
import SeoLandingPage from "@/components/landing-seo/seo-landing-page"

export default async function Page() {
  const logos = await getClientLogos()
  return <SeoLandingPage logos={logos} />
}
