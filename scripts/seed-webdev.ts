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

const SLUG = 'high-conversion-website-development-services'

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
  const existing = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG },
  )
  if (existing) {
    console.log(`Web Dev page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  // Verify case studies exist
  const bawa = await client.fetch(`*[_type == "caseStudy" && _id == "caseStudy-bawa"][0]{ _id, clientName }`)
  const fech = await client.fetch(`*[_type == "caseStudy" && _id == "caseStudy-fech"][0]{ _id, clientName }`)
  if (!bawa || !fech) {
    console.error('Missing case studies: Bawa or Fech. Run seed-seo-casestudies.ts first.')
    process.exit(1)
  }
  console.log(`✓ Found case studies: ${bawa.clientName}, ${fech.clientName}`)

  const pageBuilder = [
    // 1. Hero — left-aligned, no badge
    {
      _type: 'heroSection',
      _key: 'hero01',
      headline: 'Turn Your Website Into A Lead-Generating Machine',
      subheadline: 'We build fast, responsive, high-converting websites across India that strategically turn visitors into customers and drive real business growth.',
      ctaText: "Let's Build Your Website",
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. Agency intro — text left, image right
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Reliable & Performance-Driven Web Development Company in India',
      bodyText: blocks([
        { key: 'b1a', text: "At High Horse, we don't just develop websites—we build high-performing digital platforms designed to support business growth. As a trusted web development company in India, we work with startups, scaling businesses, and established brands to create fast, responsive, and conversion-focused websites that deliver real results." },
        { key: 'b1b', text: 'Our approach combines strategic thinking, technical expertise, and modern development practices to ensure every website performs seamlessly. From simple business websites to complex platforms, we build solutions that are reliable, scalable, and built to drive measurable business outcomes.' },
      ]),
      imagePosition: 'right',
    },
    // 3. Challenges — split layout (text+CTA left, list right)
    {
      _type: 'challengeGridSection',
      _key: 'challenges01',
      layout: 'split',
      heading: 'The Real Challenges You Face with a Poor Web Development Agency',
      subtext: "A poorly developed website doesn't just affect user experience—it directly impacts your business growth. Here's what might be holding you back:",
      ctaText: 'Talk to SEO Expert',
      ctaLink: '/contact-search-performance-marketing-agency',
      challenges: [
        'Your website loads slowly, affecting user retention',
        'Visitors are not converting into leads or customers',
        'Website structure is not optimized for performance',
        'Poor mobile responsiveness affecting user experience',
        'Frequent technical issues and broken functionalities',
        'Your website lacks scalability for future growth',
      ],
    },
    // 4. Services — clean 2-col, 7 items, white bg
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'What We Deliver as a Web Development Expert',
      subtext: 'We focus on building websites that are not just functional but engineered for performance, scalability, and conversions.',
      style: 'clean',
      background: 'white',
      columns: 2,
      cards: [
        { _key: 'c1', title: 'Custom Website Development', description: 'We build fully customized websites tailored to your business needs, ensuring flexibility, scalability, and performance across all devices and platforms.' },
        { _key: 'c2', title: 'Responsive Web Development', description: 'We create mobile-friendly, responsive websites that adapt seamlessly across devices, ensuring consistent performance and user experience on every screen.' },
        { _key: 'c3', title: 'eCommerce Website Development', description: 'We develop high-performing eCommerce platforms with optimized product pages, smooth checkout flows, and secure payment integrations to increase conversions.' },
        { _key: 'c4', title: 'CMS-Based Development', description: 'We build easy-to-manage websites using CMS platforms, allowing you to update content, manage pages, and scale your website without technical complexity.' },
        { _key: 'c5', title: 'Website Speed Optimization', description: 'We optimize website performance by improving loading speed, reducing latency, and enhancing overall responsiveness to improve user experience and SEO rankings.' },
        { _key: 'c6', title: 'Website Maintenance & Support', description: 'We provide ongoing maintenance, updates, and technical support to ensure your website remains secure, functional, and up-to-date at all times.' },
        { _key: 'c7', title: 'Conversion-Focused Development Strategy', description: 'We develop websites with a strong focus on user behavior and business goals, ensuring every element is optimized to drive leads and conversions.' },
      ],
    },
    // 5. Tech Slider — auto-scrolling marquee with branded tiles
    {
      _type: 'techSliderSection',
      _key: 'tech01',
      heading: 'Technologies We Use to Build High-Performance Websites',
      subtext: 'We use modern frameworks, scalable technologies, and reliable tools to build fast, secure, and high-performing websites tailored for growth.',
      logos: [
        { _key: 'tl1', name: 'Octopus Deploy', displayText: '🐙', bgColor: '#111111', textColor: '#ffffff' },
        { _key: 'tl2', name: 'Analytics', displayText: '📊', bgColor: '#FAFAF9', textColor: '#E8874A' },
        { _key: 'tl3', name: 'Webflow', displayText: '🔷', bgColor: '#FAFAF9', textColor: '#6C8EFF' },
        { _key: 'tl4', name: 'Magento', displayText: '🅜', bgColor: '#FAFAF9', textColor: '#E8622D' },
        { _key: 'tl5', name: 'Shopify', displayText: '🛍️', bgColor: '#95BF47', textColor: '#ffffff' },
        { _key: 'tl6', name: 'Wix', displayText: 'Wix', bgColor: '#000000', textColor: '#ffffff' },
        { _key: 'tl7', name: 'WordPress', displayText: 'W', bgColor: '#FAFAF9', textColor: '#21759B' },
      ],
    },
    // 6. CTA band — tan/peach, left-aligned
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: "Let's Build a Website That Drives Real Business Growth",
      bodyText: block('b2', "Share your requirements, and we'll help you create a fast, scalable, and high-performing website designed to attract users, generate leads, and grow your business."),
      ctaText: 'Start Your Project',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 7. Stats — split layout (text left, 3-col stat grid right)
    {
      _type: 'statsSection',
      _key: 'stats01',
      heading: 'Developed for Results, Backed by Data and Performance Insights',
      bodyText: 'When the website is built with the right structure and performance in mind, everything starts improving. Pages load faster, users engage more, and conversions increase. These results come from optimized code, scalable architecture, and development focused on performance, usability, and measurable business impact.',
      layout: 'split',
      stats: [
        { _key: 'st1', value: '120+', label: 'Websites successfully developed' },
        { _key: 'st2', value: '5+', label: 'Years of experience in UI/UX design' },
        { _key: 'st3', value: '90%', label: 'Client retention rate' },
        { _key: 'st4', value: '80%', label: 'Improvement in website loading speed' },
        { _key: 'st5', value: '2X', label: 'Increase in conversion rates after development' },
        { _key: 'st6', value: '6+', label: 'Industries served globally' },
        { _key: 'st7', value: '3X', label: 'Improvement in user engagement metrics' },
        { _key: 'st8', value: '99%', label: 'Uptime across deployed websites' },
      ],
    },
    // 8. Who Needs — 4-col cards, paper bg
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Who Needs Professional Website Development Services',
      subtext: "Any business aiming to grow online, generate leads, or build credibility needs a professionally developed website that performs consistently. Website development services are essential for different stages of business growth. Whether you're starting fresh, scaling, or upgrading, the right website supports performance, usability, and long-term success.",
      columns: 4,
      cards: [
        { _key: 'n1', title: 'Startups launching their digital presence', description: 'Need a strong, credible website to showcase offerings and build trust from day one.' },
        { _key: 'n2', title: 'Traditional businesses going digital', description: 'Require structured websites to establish an online presence and reach a wider audience effectively.' },
        { _key: 'n3', title: 'Businesses needing a website redesign', description: 'Outdated, slow, or underperforming websites need redevelopment to improve usability, speed, and conversions.' },
        { _key: 'n4', title: 'Enterprises managing large-scale operations', description: 'Need scalable, secure, and high-performance platforms to handle traffic, integrations, and complex workflows.' },
      ],
    },
    // 9. Process — 2-col, 5 steps
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'How Our Developers Build High-Performance Websites',
      subtext: 'Our development process is focused on performance, scalability, and delivering a seamless digital experience.',
      columns: 2,
      steps: [
        { _key: 'p1', stepTitle: 'Understand Your Requirements', stepDescription: 'We analyze your business goals, audience, and requirements to build a strong foundation for your website development process.' },
        { _key: 'p2', stepTitle: 'Plan the Website Structure', stepDescription: 'We define site architecture, user flow, and technical requirements to ensure a smooth, scalable, and performance-driven development process.' },
        { _key: 'p3', stepTitle: 'Design & Development Execution', stepDescription: 'We combine UI design with clean coding practices to build responsive, high-performing websites optimized for speed and usability.' },
        { _key: 'p4', stepTitle: 'Testing & Quality Assurance', stepDescription: 'We test across devices, browsers, and scenarios to ensure your website performs flawlessly without errors or performance issues.' },
        { _key: 'p5', stepTitle: 'Launch & Optimize', stepDescription: 'We deploy your website and continuously monitor, optimize, and improve performance to ensure long-term success and scalability.' },
      ],
    },
    // 10. Why Us — split checklist (checklist left, art right)
    {
      _type: 'checklistSection',
      _key: 'checklist01',
      layout: 'split',
      heading: 'What Makes High Horse the Right Development Partner',
      subtext: 'Choosing the right web development partner directly impacts your business growth. Businesses trust us because we combine technical expertise, performance optimization, and strategic thinking to deliver reliable, scalable, and result-driven websites.',
      items: [
        'Performance-first development approach aligned with your business goals',
        'Websites optimized for speed, scalability, and long-term growth',
        'Ensure clean, structured coding for better performance and maintainability',
        'Projects on time with strong attention to technical precision',
        'Transparent communication throughout the development process',
        'Websites designed to generate leads, conversions, and measurable outcomes',
      ],
    },
    // 11. Industries — 3-col cards, paper bg
    {
      _type: 'cardGridSection',
      _key: 'cards03',
      heading: 'Industries We Serve with Web Development Solutions',
      subtext: 'We develop tailored websites for different industries, ensuring every solution meets specific business needs, user expectations, and performance standards.',
      columns: 3,
      cards: [
        { _key: 'i1', title: 'eCommerce & Retail', description: 'We develop scalable eCommerce websites with optimized product pages, secure payment gateways, and seamless checkout experiences to drive higher conversions.' },
        { _key: 'i2', title: 'Healthcare & Medical', description: 'We build secure, fast-loading healthcare websites that ensure accessibility, compliance, and seamless patient interaction across services and digital platforms.' },
        { _key: 'i3', title: 'Real Estate', description: 'We develop property-focused websites with advanced search features, intuitive navigation, and engaging layouts to enhance user experience and lead generation.' },
        { _key: 'i4', title: 'Education & EdTech', description: 'We create interactive education platforms with structured content, smooth navigation, and scalable systems that support seamless learning experiences.' },
        { _key: 'i5', title: 'SaaS & Technology', description: 'We develop robust SaaS platforms with scalable architecture, clean interfaces, and optimized performance to support complex workflows and user interactions.' },
        { _key: 'i6', title: 'Logistics & Supply Chain', description: 'We build efficient web platforms that streamline logistics operations, improve tracking visibility, and simplify complex supply chain processes for better management.' },
        { _key: 'i7', title: 'Finance & Consulting', description: 'We develop secure, performance-driven financial websites that simplify data presentation, ensure trust, and support better decision-making for users.' },
      ],
    },
  ]

  // Create the service page
  const doc = await client.create({
    _type: 'servicePage',
    title: 'Website Development',
    slug: { _type: 'slug', current: SLUG },
    section: 'experience-systems',
    summary: 'Fast, responsive, high-converting websites that turn visitors into customers',
    accentStyle: 'brand',
    caseStudiesHeading: 'Web Solutions That Delivered Real Business Impact',
    caseStudiesSubtext: "We've developed websites for brands across industries, helping them improve performance, scalability, and user experience.",
    pageBuilder,
    relatedCaseStudies: [
      {
        _key: 'wdBawa',
        caseStudy: { _type: 'reference', _ref: 'caseStudy-bawa' },
        metricsFilterTag: 'Web Development',
      },
      {
        _key: 'wdFech',
        caseStudy: { _type: 'reference', _ref: 'caseStudy-fech' },
        metricsFilterTag: 'Web Development',
      },
    ],
  })
  console.log(`✓ Created Web Dev page: ${doc._id}`)

  // Create 4 FAQ documents with answers from source
  const faqData = [
    {
      question: 'What type of website is best for my business?',
      answer: "It depends on your goals — a business website builds credibility, an eCommerce site drives online sales, and a custom platform supports complex workflows. We help you decide based on your objectives.",
    },
    {
      question: 'What technologies do you use for web development?',
      answer: "We work with modern frameworks and platforms including WordPress, Shopify, Magento, Wix, and custom-coded solutions depending on your project's scale and requirements.",
    },
    {
      question: 'Do you provide website maintenance and support?',
      answer: 'Yes — we offer ongoing maintenance, updates, and technical support to keep your website secure, functional, and performing well after launch.',
    },
    {
      question: 'How do I know if my website needs redevelopment?',
      answer: "Signs include slow load times, low conversions, poor mobile experience, outdated design, or frequent technical issues — any of these indicate it's time for a redesign.",
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
  console.log(`✓ Linked ${faqIds.length} FAQs to Web Dev page`)

  // Verify
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      "sections": count(pageBuilder),
      "faqs": count(relatedFaqs),
      "cases": count(relatedCaseStudies),
      "sectionTypes": pageBuilder[]._type
    }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: ${verify.sections} sections, ${verify.faqs} FAQs, ${verify.cases} case studies`)
  console.log(`  Section types: ${verify.sectionTypes?.join(', ')}`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
