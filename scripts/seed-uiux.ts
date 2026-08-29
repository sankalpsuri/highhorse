import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-08-13',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

const SLUG = 'conversion-focused-ui-ux-design-for-websites'

function block(key: string, text: string) {
  return [{
    _type: 'block', _key: key, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }]
}

function blocks(items: { key: string; text: string }[]) {
  return items.map(({ key, text }) => ({
    _type: 'block', _key: key, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }))
}

async function main() {
  // ── 1. Clean up existing page ─────────────────────────────────
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG },
  )
  if (existing) {
    console.log(`UI/UX page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  // ── 2. Build pageBuilder sections ─────────────────────────────
  const pageBuilder = [
    // 1. heroSection — centered, eyebrow badge
    {
      _type: 'heroSection',
      _key: 'hero01',
      badgeText: 'Certified Google Partner',
      badgeStyle: 'partner',
      headline: 'Design that makes your users stay, trust your brand, and take action',
      subheadline: 'If your website or app isn\'t converting, the issue is rarely traffic — it\'s the experience. We design UI/UX that goes beyond aesthetics, helping businesses across India guide users, build trust, and drive meaningful actions.',
      ctaText: 'Let\'s Fix Your UI/UX',
      ctaLink: '/contact-search-performance-marketing-agency',
      textAlign: 'center',
      mobileImageSquare: true,
    },
    // 2. textImageSection — Agency Intro (image right, outline CTA)
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Creative & User-Friendly UI/UX Agency in India',
      bodyText: blocks([
        { key: 'b1a', text: 'At High Horse, we don\'t just design interfaces — we design experiences that drive action. As a leading UI/UX design company in India, we help startups, growing businesses, and established brands build digital experiences that are clean, intuitive, and built for conversions.' },
        { key: 'b1b', text: 'Our approach combines research, strategy, and creativity to ensure every user interaction feels effortless. From websites to mobile apps, we design interfaces that not only look modern but also guide users naturally toward taking action.' },
      ]),
      ctaText: 'See Our Services',
      ctaLink: '/conversion-focused-ui-ux-design-for-websites#services',
      imagePosition: 'right',
    },
    // 3. challengeGridSection — 6 challenge cards
    {
      _type: 'challengeGridSection',
      _key: 'challenges01',
      heading: 'The Real Challenges You Might Be Facing With Poor UI/UX',
      subtext: 'A poor UI/UX design doesn\'t just affect aesthetics — it directly impacts your revenue and growth. Here\'s what might be going wrong.',
      ctaText: 'Talk to a UX Expert',
      ctaLink: '/contact-search-performance-marketing-agency',
      challenges: [
        'Users are visiting your website but leaving within seconds',
        'Your bounce rate is high and conversions are low',
        'Navigation feels confusing or overwhelming',
        'Your website looks outdated compared to competitors',
        'Mobile experience is inconsistent or frustrating',
        'Users don\'t trust your platform enough to take action',
      ],
    },
    // 4. cardGridSection — 8 service cards
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'What We Deliver as a UI/UX Industry Expert',
      subtext: 'We focus on building experiences that are not just visually appealing but strategically designed to perform.',
      cards: [
        { _key: 'c1', title: 'User Research & Behavior Analysis', description: 'We study user behavior, preferences, and pain points to design experiences that align with expectations and improve engagement.' },
        { _key: 'c2', title: 'Mobile App UI/UX Design', description: 'Intuitive mobile app interfaces that enhance usability and deliver seamless experiences across Android and iOS.' },
        { _key: 'c3', title: 'Conversion-Focused Design Strategy', description: 'We align user experience with business goals to drive actions, generate leads, and increase revenue consistently.' },
        { _key: 'c4', title: 'Wireframing & Prototyping', description: 'Structured wireframes and interactive prototypes to visualize user journeys and test usability before development.' },
        { _key: 'c5', title: 'Dashboard & SaaS Interface Design', description: 'We simplify complex data into clean, user-friendly dashboards that improve usability and decision-making.' },
        { _key: 'c6', title: 'Website UI/UX Design', description: 'Modern, responsive websites focused on usability, clarity, and conversion so users act without confusion.' },
        { _key: 'c7', title: 'UX Audit & Optimization', description: 'We analyze existing designs, identify usability issues, and optimize journeys to improve conversion rates.' },
        { _key: 'c8', title: 'Design Systems & Style Guides', description: 'Scalable component libraries and style guides that keep every screen consistent as your product grows.' },
      ],
    },
    // 5. statsSection — dark theme, 4-col grid, 8 stats
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Less Guesswork. More Measurable Impact.',
      bodyText: 'Once the user experience was redefined, everything started working as it should — users stayed longer, navigation felt effortless, and actions became intentional.',
      layout: 'grid',
      theme: 'dark',
      stats: [
        { _key: 'st1', value: '150+', label: 'UI/UX projects successfully delivered' },
        { _key: 'st2', value: '120+', label: 'Websites redesigned for better performance' },
        { _key: 'st3', value: '5+', label: 'Years of experience in UI/UX design' },
        { _key: 'st4', value: '70%', label: 'Increase in mobile usability scores' },
        { _key: 'st5', value: '95%', label: 'Client retention rate' },
        { _key: 'st6', value: '6+', label: 'Industries served globally' },
        { _key: 'st7', value: '2X', label: 'Faster user task completion after redesign' },
        { _key: 'st8', value: '3X', label: 'Improvement in average session duration' },
      ],
    },
    // 6. processStepsSection — 5 steps, 5-col
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'What Do Our Creative Experts Do to Provide the Best UI/UX Services?',
      subtext: 'Our process is built to understand users, eliminate friction, and design seamless experiences that improve usability, engagement, and conversions.',
      columns: 5,
      steps: [
        { _key: 'p1', stepTitle: 'Understand Your Users', stepDescription: 'We deeply research user behavior, needs, and expectations to build meaningful, user-centered experiences.' },
        { _key: 'p2', stepTitle: 'Define the Experience Strategy', stepDescription: 'We map complete user journeys, identifying gaps and friction points for a conversion-focused experience.' },
        { _key: 'p3', stepTitle: 'Wireframe & Prototype', stepDescription: 'We build structured wireframes and prototypes to visualize layout, flow, and functionality.' },
        { _key: 'p4', stepTitle: 'Design with Purpose', stepDescription: 'We design clean, intuitive interfaces focused on usability and guiding users toward meaningful actions.' },
        { _key: 'p5', stepTitle: 'Test & Optimize', stepDescription: 'We continuously test designs, gather feedback, and optimize for better usability and results.' },
      ],
    },
    // 7. portfolioShowcaseSection — 2 case studies
    {
      _type: 'portfolioShowcaseSection',
      _key: 'showcase01',
      heading: 'Where Ideas Turned Into High-Performing Experiences',
      subtext: 'We\'ve worked with brands across industries to transform their digital presence through UI/UX design.',
      items: [
        {
          _key: 'ps1',
          tag: 'Responsive Website',
          title: 'Powdertek',
          description: '3D facade visualisation & mockups, interactive shade exploration across wood effects and solid finishes, with smooth motion design and micro-animations throughout.',
        },
        {
          _key: 'ps2',
          tag: 'Brand + Web + Growth',
          title: 'Party Rack India',
          description: 'Built from the ground up — strategy, brand, catalog, website, automation, and growth infrastructure — on a structured 90–120 day roadmap. No guesswork, no patchwork.',
        },
      ],
    },
    // 8. checklistSection — 6 items
    {
      _type: 'checklistSection',
      _key: 'checklist01',
      layout: 'split',
      heading: 'Chosen for the Way We Think — Not Just Design',
      subtext: 'Choosing the right UI/UX partner directly impacts how users experience your brand and take action.',
      items: [
        'We follow a strategy-first approach, ensuring every design decision supports business goals and user experience.',
        'Design based on real user behavior, optimizing every interaction to improve engagement and drive conversions.',
        'Clean, modern interfaces that are scalable, consistent, and adaptable across platforms and devices.',
        'We deliver projects quickly without compromising quality, with strong attention to every design detail.',
        'Clear, consistent communication — working closely with clients to ensure alignment throughout the process.',
        'Design solutions that align perfectly with your business objectives, not just visual trends.',
      ],
    },
    // 9. cardGridSection — 8 industry cards (cream bg)
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Industries for Which We Provide UI/UX Services',
      subtext: 'We design tailored UI/UX solutions across diverse industries, ensuring each experience aligns with user expectations and business goals.',
      background: 'cream',
      cards: [
        { _key: 'i1', title: 'eCommerce & Retail', description: 'Seamless shopping experiences that simplify navigation, build trust, and increase conversions.' },
        { _key: 'i2', title: 'Education & EdTech', description: 'Engaging learning experiences with clear navigation and structured flows that improve engagement.' },
        { _key: 'i3', title: 'Finance & Consulting', description: 'Secure, user-friendly financial interfaces that simplify complex data and build user trust.' },
        { _key: 'i4', title: 'Healthcare & Medical', description: 'Interfaces focused on clarity, accessibility, and trust for patients accessing care and services.' },
        { _key: 'i5', title: 'SaaS & Technology', description: 'Scalable interfaces that simplify complex workflows and improve productivity and retention.' },
        { _key: 'i6', title: 'Real Estate', description: 'Intuitive platforms that showcase properties and simplify search, comparison, and connection.' },
        { _key: 'i7', title: 'Logistics & Supply Chain', description: 'Streamlined dashboards that simplify operations and improve visibility with minimal friction.' },
        { _key: 'i8', title: 'Travel & Tourism', description: 'Booking flows and discovery experiences designed to build confidence and reduce drop-off.' },
      ],
    },
    // 10. ctaSection — centered, tan
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Ready to Fix Your UI/UX?',
      bodyText: block('b4', 'Let\'s turn your website or app into an experience users trust, enjoy, and act on.'),
      ctaText: 'Let\'s Fix Your UI/UX',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
      textAlign: 'center',
    },
  ]

  // ── 3. Create the service page ────────────────────────────────
  const doc = await client.create({
    _type: 'servicePage',
    title: 'UI/UX',
    slug: { _type: 'slug', current: SLUG },
    section: 'experience-systems',
    summary: 'Conversion-focused UI/UX design that makes users stay, trust, and take action',
    accentStyle: 'brand',
    pageBuilder,
  })
  console.log(`✓ Created UI/UX page: ${doc._id}`)

  // ── 4. Create 5 FAQ documents with answers from source ────────
  const faqData = [
    {
      question: 'What does a UI/UX design agency actually do?',
      answer: 'We research your users, map their journeys, and design interfaces — wireframes, prototypes, and final visuals — that make your product easier and more compelling to use.',
    },
    {
      question: 'How long does a typical UI/UX project take?',
      answer: 'Most website or app redesigns take 4–8 weeks depending on scope, moving through research, wireframing, design, and testing in structured phases.',
    },
    {
      question: 'Do you design for both web and mobile apps?',
      answer: 'Yes — we design responsive websites, native mobile app interfaces for iOS and Android, and dashboards for SaaS products.',
    },
    {
      question: 'Will a redesign actually improve my conversion rate?',
      answer: 'Every design decision is made with conversion in mind — clearer navigation, reduced friction, and stronger trust signals typically lead to measurable lifts in engagement and conversions.',
    },
    {
      question: 'Can you improve an existing product instead of a full redesign?',
      answer: 'Yes — our UX audit service identifies specific usability issues in your current product and optimizes them without requiring a ground-up rebuild.',
    },
  ]

  const faqIds: string[] = []
  for (let i = 0; i < faqData.length; i++) {
    const faq = await client.create({
      _type: 'faq',
      question: faqData[i].question,
      answer: [{
        _type: 'block', _key: `ans${i}`, style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: `sp${i}`, marks: [], text: faqData[i].answer }],
      }],
      category: 'pricing-process',
      relatedPages: [{ _type: 'reference', _ref: doc._id, _key: doc._id.replace('drafts.', '') }],
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqData[i].question}"`)
  }

  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to UI/UX page`)

  // ── 5. Verify ─────────────────────────────────────────────────
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      "sections": count(pageBuilder),
      "faqs": count(relatedFaqs),
      "sectionTypes": pageBuilder[]._type
    }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: ${verify.sections} sections, ${verify.faqs} FAQs`)
  console.log(`  Section types: ${verify.sectionTypes?.join(', ')}`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
