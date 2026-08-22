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

const SLUG = 'ai-marketing-workflow-automation-solutions'

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
    console.log(`Workflow Automation page already exists (${existing._id}), deleting to recreate...`)
    await client.delete(existing._id)
  }

  // ── 2. Build pageBuilder sections ─────────────────────────────
  const pageBuilder = [
    // 1. heroSection
    {
      _type: 'heroSection',
      _key: 'hero01',
      headline: 'Transforming Workflows With Intelligent AI & Automation Solution',
      subheadline: 'We build AI-powered automation solutions that streamline workflows, reduce manual effort, improve efficiency, and help businesses scale operations with smarter decision-making.',
      ctaText: 'Get Your Search Leak Map',
      ctaLink: '/contact-search-performance-marketing-agency',
    },
    // 2. textImageSection — Smart & Scalable (image right)
    {
      _type: 'textImageSection',
      _key: 'text01',
      heading: 'Smart & Scalable AI and Automation Solutions in India',
      bodyText: blocks([
        { key: 'b1a', text: "At High Horse, we don't just implement AI, we build intelligent systems that automate processes and drive efficiency. As a leading AI and automation company in India, we help startups, growing businesses, and enterprises streamline operations, reduce manual effort, and scale faster with smart technology." },
        { key: 'b1b', text: 'Our approach combines strategy, data, and advanced automation tools to create solutions that work seamlessly within your workflows. From business process automation to AI-driven decision systems, we build solutions that not only improve efficiency but also deliver measurable performance and long-term impact.' },
      ]),
      imagePosition: 'right',
    },
    // 3. challengeGridSection — Why AI & Automation (split layout)
    {
      _type: 'challengeGridSection',
      _key: 'challenge01',
      layout: 'split',
      heading: 'Why AI & Automation Are Changing the Way Businesses Operate',
      subtext: "Artificial Intelligence (AI) and automation work together to handle repetitive tasks, analyze data, and support faster decision-making. Instead of relying on manual processes, businesses can use AI-driven systems to perform tasks more accurately, consistently, and at scale. Automation manages routine operations like data entry, workflows, and responses, while AI adds intelligence by learning patterns, predicting outcomes, and continuously improving performance over time. Adopting AI and automation helps businesses work smarter, respond faster, and scale efficiently in a competitive digital environment.",
      ctaText: 'Talk to SEO Expert',
      ctaLink: '/contact-search-performance-marketing-agency',
      challenges: [
        'Reduces manual effort and operational workload',
        'Improves efficiency across daily business processes',
        'Minimizes human errors and increases accuracy',
        'Speeds up decision-making with real-time data insights',
        'Enhances customer experience through faster responses',
        'Lowers operational costs over time',
        'Enables scalable growth without increasing complexity',
        'Improves productivity across teams and departments',
      ],
    },
    // 4. cardGridSection — Solutions Grid (3-col, clean, 9 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards01',
      heading: 'Smart Automation Solutions Built to Scale Your Business Faster',
      subtext: 'High Horse combines AI and automation to streamline operations, reduce manual work, improve efficiency, and help businesses scale faster with smarter systems.',
      style: 'clean',
      columns: 3,
      cards: [
        { _key: 'c1', title: 'Backend Automation', description: 'We automate backend systems, data processing, and integrations to reduce manual work, improve accuracy, and ensure seamless, efficient operations across business systems.' },
        { _key: 'c2', title: 'AI-Powered Chatbots', description: 'We build intelligent chatbots that handle customer queries, provide instant responses, and improve engagement while reducing dependency on manual support teams.' },
        { _key: 'c3', title: 'Inventory Management Automation', description: 'We automate inventory tracking, stock updates, and alerts to ensure accurate availability, reduce errors, and streamline overall inventory management processes efficiently.' },
        { _key: 'c4', title: 'Shipping & Order Automation', description: 'We automate order processing, shipping workflows, and tracking updates, ensuring faster fulfillment, fewer errors, and a smoother customer delivery experience.' },
        { _key: 'c5', title: 'Workflow Automation', description: 'We streamline workflows by connecting tools and systems, improving task execution speed, reducing manual effort, and enhancing productivity across operations.' },
        { _key: 'c6', title: 'CRM & Sales Automation', description: 'We automate lead management, follow-ups, and customer interactions to improve sales efficiency, reduce response time, and increase conversion rates consistently.' },
        { _key: 'c7', title: 'Business Process Automation', description: 'We optimize and automate core business processes, helping reduce operational costs, eliminate repetitive tasks, and improve overall efficiency across departments.' },
        { _key: 'c8', title: 'AI-Driven Content Automation', description: 'We use AI to generate, optimize, and scale content creation, ensuring consistent quality, faster production, and better engagement across digital platforms.' },
        { _key: 'c9', title: 'AI-Driven Ads Optimization', description: 'We leverage AI to optimize ad campaigns, targeting, and performance, helping improve ROI, reduce ad spend waste, and maximize overall marketing results.' },
      ],
    },
    // 5. ctaSection — CTA Strip (tan variant)
    {
      _type: 'ctaSection',
      _key: 'cta01',
      heading: 'Ready to Replace Manual Effort with Smart Automation?',
      bodyText: block('b2', 'We help you streamline operations, automate repetitive tasks, and build systems that improve productivity and support long-term growth.'),
      ctaText: 'Automate Your Workflow',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'tan',
    },
    // 6. processStepsSection — 5 steps, 2-col grid
    {
      _type: 'processStepsSection',
      _key: 'process01',
      heading: 'How We Make Automation Work for Your Business',
      subtext: "Automation only delivers results when it's aligned with how your business actually operates. We don't just implement tools, we build systems that simplify processes, remove inefficiencies, and support long-term growth.",
      columns: 2,
      steps: [
        { _key: 'p1', stepTitle: 'Understand Your Current Workflow', stepDescription: 'We analyze your existing processes, tools, and bottlenecks to identify where automation can create the most impact.' },
        { _key: 'p2', stepTitle: 'Identify Automation Opportunities', stepDescription: 'We map repetitive tasks, manual dependencies, and gaps to define what should be automated for better efficiency and performance.' },
        { _key: 'p3', stepTitle: 'Design the Automation Strategy', stepDescription: 'We create a clear plan, selecting the right tools and structuring workflows that align with your business goals and operations.' },
        { _key: 'p4', stepTitle: 'Build & Integrate Systems', stepDescription: 'We implement automation across your tools, ensuring seamless integration between platforms like CRM, marketing systems, and operations.' },
        { _key: 'p5', stepTitle: 'Test, Optimize & Scale', stepDescription: 'We continuously monitor performance, refine workflows, and scale automation systems to improve efficiency, accuracy, and long-term business outcomes.' },
      ],
    },
    // 7. checklistSection — Why Us (split layout)
    {
      _type: 'checklistSection',
      _key: 'checklist01',
      layout: 'split',
      heading: 'Chosen for the Way We Think, Not Just the Tools We Use',
      subtext: 'Choosing the right AI and automation partner directly impacts how efficiently your business operates and scales. Businesses trust us because we combine strategy, technology, and practical implementation to deliver automation that actually works and drives measurable outcomes.',
      items: [
        'Strategy-first approach, ensuring every automation solution aligns with your business goals and operational needs',
        'Build systems based on real workflows, optimizing processes to improve efficiency and reduce manual effort',
        'Create scalable automation solutions that adapt across tools, platforms, and growing business requirements',
        'Deliver solutions quickly without compromising quality, ensuring reliable performance and smooth implementation',
        'Maintain clear, consistent communication, working closely with your team throughout the automation journey',
        'Design automation systems that reduce costs, improve productivity, and support long-term business growth',
      ],
    },
    // 8. cardGridSection — Industries (3-col, default bordered, 7 cards)
    {
      _type: 'cardGridSection',
      _key: 'cards02',
      heading: 'Industries We Transform with AI & Automation Solutions',
      subtext: 'We build tailored AI and automation systems across industries, ensuring each solution improves efficiency, reduces manual effort, and supports scalable growth.',
      columns: 3,
      cards: [
        { _key: 'ind1', title: 'eCommerce & Retail', description: 'We automate inventory, order processing, customer interactions, and marketing workflows to improve efficiency, reduce errors, and increase overall sales performance.' },
        { _key: 'ind2', title: 'Healthcare & Medical', description: 'We automate patient workflows, appointment systems, and data management to improve efficiency, reduce manual tasks, and enhance overall healthcare service delivery.' },
        { _key: 'ind3', title: 'Real Estate', description: 'We automate lead management, follow-ups, and property workflows, helping businesses respond faster, manage inquiries efficiently, and improve conversion rates.' },
        { _key: 'ind4', title: 'Education & EdTech', description: 'We automate enrollment, communication, and learning workflows, creating efficient systems that improve student engagement and streamline administrative operations.' },
        { _key: 'ind5', title: 'SaaS & Technology', description: 'We build AI-driven automation for product workflows, user onboarding, and data processes, improving efficiency, scalability, and overall system performance.' },
        { _key: 'ind6', title: 'Logistics & Supply Chain', description: 'We automate tracking, inventory, and operational workflows to improve visibility, reduce delays, and streamline complex logistics processes effectively.' },
        { _key: 'ind7', title: 'Finance & Consulting', description: 'We automate data processing, reporting, and client workflows, improving accuracy, reducing manual effort, and enabling faster, smarter decision-making.' },
      ],
    },
  ]

  // ── 3. Create the service page ────────────────────────────────
  const doc = await client.create({
    _type: 'servicePage',
    title: 'Workflow Automation',
    slug: { _type: 'slug', current: SLUG },
    section: 'experience-systems',
    summary: 'AI-powered automation solutions that streamline workflows, reduce manual effort, and help businesses scale operations with smarter decision-making',
    accentStyle: 'brand',
    pageBuilder,
  })
  console.log(`✓ Created Workflow Automation page: ${doc._id}`)

  // ── 4. Create 4 FAQ documents ─────────────────────────────────
  const faqData = [
    { question: 'What processes can be automated in a business?' },
    { question: 'Is AI automation suitable for small businesses?' },
    { question: 'How much does AI and automation implementation cost?' },
    { question: 'How long does it take to implement automation?' },
  ]

  const faqIds: string[] = []
  for (let i = 0; i < faqData.length; i++) {
    const faq = await client.create({
      _type: 'faq',
      question: faqData[i].question,
      answer: [{
        _type: 'block', _key: `ans${i}`, style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: `sp${i}`, marks: [], text: 'TODO: content team to write answer.' }],
      }],
      category: 'general',
      relatedPages: [{ _type: 'reference', _ref: doc._id, _key: doc._id.replace('drafts.', '') }],
      order: i + 1,
    })
    faqIds.push(faq._id)
    console.log(`  ✓ FAQ ${i + 1}: "${faqData[i].question}"`)
  }

  const faqRefs = faqIds.map((id) => ({ _type: 'reference', _ref: id, _key: id.replace('drafts.', '') }))
  await client.patch(doc._id).set({ relatedFaqs: faqRefs }).commit()
  console.log(`✓ Linked ${faqIds.length} FAQs to Workflow Automation page`)

  // ── 5. Verify ─────────────────────────────────────────────────
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      "sections": count(pageBuilder),
      "faqs": count(relatedFaqs),
    }`,
    { slug: SLUG },
  )
  console.log(`\n✓ ${verify.title}: ${verify.sections} sections, ${verify.faqs} FAQs`)
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
