import Image from 'next/image'
import styles from '@/app/home.module.css'

interface CaseStudy {
  name: string
  sector: string
  blurb: string
  image: string
  href?: string
}

const caseStudies: CaseStudy[] = [
  { name: 'Hioki', sector: 'B2B Industrial Electronics', blurb: 'Scaled qualified B2B leads for Hioki through targeted Google Ads campaigns.', image: '/assets/Home Hioki.jpg', href: 'https://www.hioki.com/' },
  { name: 'FECH Moving & Cleaning', sector: 'Local Services', blurb: 'Taking FECH to the top search results for moving and cleaning.', image: '/assets/Home Fetch.jpg' },
  { name: 'Party Rack', sector: 'E-commerce · Party Supplies', blurb: 'Helped Party Rack start from scratch and go online.', image: '/assets/Home Party.jpg' },
  { name: 'Just Pure', sector: 'E-commerce · B2C', blurb: 'Built a Shopify website to power B2C ecommerce growth for Just Pure.', image: '/assets/Home Just Pure.jpg' },
  { name: 'Visioworld (Speedex)', sector: 'Consumer Electronics', blurb: 'Website and marketplace optimisation driving top search rankings.', image: '/assets/Home Visualstudio.jpg' },
  { name: 'Setmi India', sector: 'B2B Industrial Electronics', blurb: "Powering Setmi India's sales journey.", image: '/assets/Home setmi.jpg' },
  { name: 'Easy Access Management Consultancies', sector: 'Business Consultancy', blurb: 'Consistent lead generation for business setup in Dubai, UAE.', image: '/assets/Home Easy Access.jpg' },
  { name: 'Bawa Polymers', sector: 'Industrial Manufacturing', blurb: "Boosting Bawa's online presence in the insulating varnish industry.", image: '/assets/Home Bawa.jpg' },
  { name: '5 Minutes to Delhi', sector: 'E-commerce · Ready Meals', blurb: 'Seamless digital transformation across web and marketplace.', image: '/assets/Home 5 min.jpg' },
  { name: 'Antharaaah Nature Stay', sector: 'Hospitality', blurb: 'SEO-optimised websites to seamless booking funnels that drive conversions.', image: '/assets/Home Antharaaah.jpg' },
  { name: 'Gurukul', sector: 'Education · Play School', blurb: "Building Gurukul's digital presence with SEO and clear brand storytelling.", image: '/assets/Home Gurkul.jpg' },
]

export function CaseStudyCards() {
  return (
    <div className={styles.caseGrid}>
      {caseStudies.map((cs) => {
        const inner = (
          <>
            <div className={styles.caseImage}>
              <Image
                src={cs.image}
                alt={cs.name}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles.caseBody}>
              <div className={styles.caseSector}>{cs.sector}</div>
              <div className={styles.caseName}>{cs.name}</div>
              <div className={styles.caseBlurb}>{cs.blurb}</div>
            </div>
          </>
        )

        return cs.href ? (
          <a
            key={cs.name}
            href={cs.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.caseCard}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {inner}
          </a>
        ) : (
          <div key={cs.name} className={styles.caseCard}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
