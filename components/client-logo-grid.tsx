import Image from 'next/image'
import styles from '@/app/home.module.css'

const caseStudies = [
  { name: '5 Minutes to Delhi', sector: 'E-commerce · Ready Meals', blurb: 'Seamless digital transformation across web and marketplace.', image: '/assets/Home 5 min.jpg' },
  { name: 'Bawa Polymers', sector: 'Industrial Manufacturing', blurb: "Boosting Bawa's online presence in the insulating varnish industry.", image: '/assets/Home Bawa.jpg' },
  { name: 'Gurukul', sector: 'Education · Play School', blurb: "Building Gurukul's digital presence with SEO and clear brand storytelling.", image: '/assets/Home Gurkul.jpg' },
  { name: 'Easy Access Management Consultancies', sector: 'Business Consultancy', blurb: 'Consistent lead generation for business setup in Dubai, UAE.', image: '/assets/Home Easy Access.jpg' },
  { name: 'Visioworld (Speedex)', sector: 'Consumer Electronics', blurb: 'Website and marketplace optimisation driving top search rankings.', image: '/assets/Home Visualstudio.jpg' },
  { name: 'Antharaaah Nature Stay', sector: 'Hospitality', blurb: 'SEO-optimised websites to seamless booking funnels that drive conversions.', image: '/assets/Home Antharaaah.jpg' },
  { name: 'FECH Moving & Cleaning', sector: 'Local Services', blurb: 'Taking FECH to the top search results for moving and cleaning.', image: '/assets/Home Fetch.jpg' },
  { name: 'Party Rack', sector: 'E-commerce · Party Supplies', blurb: 'Helped Party Rack start from scratch and go online.', image: '/assets/Home Party.jpg' },
  { name: 'Setmi India', sector: 'B2B Industrial Electronics', blurb: "Powering Setmi India's sales journey.", image: '/assets/Home setmi.jpg' },
]

export function CaseStudyCards() {
  return (
    <div className={styles.caseGrid}>
      {caseStudies.map((cs) => (
        <div key={cs.name} className={styles.caseCard}>
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
        </div>
      ))}
    </div>
  )
}
