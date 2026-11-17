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

const SLUG = 'display-and-visual-advertising-campaign-management'

function block(key: string, text: string) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `${key}s`, marks: [], text }],
  }
}

async function main() {
  const doc = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{ _id, pageBuilder[]{ _key, _type } }`,
    { slug: SLUG },
  )
  if (!doc) {
    console.error('Visual Ads page not found!')
    process.exit(1)
  }
  console.log(`Found: ${doc._id}`)
  console.log(`Current pageBuilder: ${doc.pageBuilder.map((b: any) => `${b._key}(${b._type})`).join(', ')}`)

  const pageBuilder = [
    // ── 1. HERO ──
    {
      _type: 'heroSection',
      _key: 'vi-hero',
      eyebrowText: 'Visual Ads Services',
      eyebrowDotColor: 'orange',
      heroBackground: 'white',
      headline: 'Transform Your Visual Ads Into a Recognizable Brand Identity',
      headlineHighlights: ['Recognizable Brand Identity'],
      subheadline: 'At High Horse, we help brands run strategic visual advertising campaigns that increase brand visibility, capture audience attention, and turn impressions into meaningful engagement and conversions.',
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      textAlign: 'left',
      heroImage: {
        _type: 'image',
        asset: { _ref: 'image-d95751c4e91d8a1aba73980e1e2d2f925bcfa40a-8192x2672-jpg', _type: 'reference' },
      },
    },

    // ── 2. SEEN BY MANY (The challenge) ──
    {
      _type: 'textImageSection',
      _key: 'vi-split1',
      eyebrow: 'The challenge',
      heading: "Seen by Many, Chosen by None? Let's Fix Your Ads.",
      bodyText: [
        block('p1', 'Visual ads are one of the most powerful ways to build brand recognition and influence buying decisions. Instead of relying only on text, these ads use images, videos, and creative designs to communicate your message instantly.'),
        block('p2', 'However, running high-performing visual campaigns requires more than just attractive designs. Audience targeting, creative strategy, and continuous testing are essential for success.'),
        block('p3', 'Our visual advertising strategies focus on helping you capture attention, engage the right audience, and drive measurable business results.'),
      ],
      bullets: [
        'Showcase your brand creatively across high-visibility platforms',
        'Reach targeted audiences with visually engaging ads',
        'Increase brand awareness and engagement',
        'Optimize campaigns for better return on ad spend',
      ],
      imagePosition: 'right',
      image: {
        _type: 'image',
        asset: { _ref: 'image-7d2437e30d6e240aff64180e1c3e51359467c86a-1024x559-webp', _type: 'reference' },
      },
    },

    // ── 3. GRAB ATTENTION (Benefits) — 6 icon cards ──
    {
      _type: 'cardGridSection',
      _key: 'vi-benefits',
      eyebrow: 'Benefits',
      heading: 'Grab Attention Where Your Audience Is Already Scrolling',
      subtext: 'Visual ads combine compelling creatives with smart targeting to connect with users across platforms and influence their decisions effectively.',
      headerLayout: 'split',
      style: 'icon-grid',
      background: 'white',
      cards: [
        { _key: 'b1', title: 'Be Seen Instantly', description: 'Show your brand across high-traffic platforms with eye-catching visuals.', svgPath: 'M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
        { _key: 'b2', title: 'Reach the Right People', description: 'Target users based on interests, behavior, and demographics.', svgPath: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
        { _key: 'b3', title: 'Drive More Interaction', description: 'Visual formats naturally generate higher engagement.', svgPath: 'M7 11v9H4v-9z M7 11l4-7c1.4 0 2.3 1 2 2.4L12.4 10H18a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7' },
        { _key: 'b4', title: 'Stay in Their Mind Longer', description: 'Creative visuals help people remember your brand.', svgPath: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.2 1 2V16h5v-.1c0-.8.4-1.6 1-2A6 6 0 0 0 12 3z' },
        { _key: 'b5', title: 'Turn Views Into Actions', description: 'Engaging creatives encourage clicks and conversions.', svgPath: 'M5 3l13 6.5-5.6 1.8L10.6 17z M12.6 11.4L19 18' },
        { _key: 'b6', title: 'Track What\'s Working', description: 'Measure impressions, clicks, engagement, and results clearly.', svgPath: 'M4 20V14 M9.5 20V9 M15 20V12 M20.5 20V5 M3 20h19' },
      ],
    },

    // ── 4. WHY CHOOSE HIGH HORSE — dark numbered cards ──
    {
      _type: 'cardGridSection',
      _key: 'vi-whyus',
      eyebrow: 'Why choose us',
      heading: 'High Horse Delivers Data-Driven Visual Advertising Designed for Growth',
      subtext: 'Our visual ad campaigns combine creative excellence, audience targeting, and performance optimization to maximize brand impact and results.',
      headerLayout: 'split',
      style: 'dark',
      darkCardStyle: 'numbered',
      cards: [
        { _key: 'w1', title: 'Creative Strategy & Design', description: 'Develop visually compelling ad creatives aligned with your brand identity.' },
        { _key: 'w2', title: 'Audience Targeting', description: 'Reach the right users based on behavior, interests, and demographics.' },
        { _key: 'w3', title: 'Platform-Specific Optimization', description: 'Customize creatives and campaigns for each advertising platform.' },
        { _key: 'w4', title: 'Continuous Creative Testing', description: 'Test multiple creatives to identify top-performing visuals.' },
        { _key: 'w5', title: 'Transparent Performance Reporting', description: 'Track engagement, conversions, and campaign efficiency clearly.' },
        { _key: 'w6', title: 'Dedicated Advertising Specialists', description: 'Experienced experts managing campaigns focused on visual performance.' },
      ],
    },

    // ── 5. CTA BAND (blue) — NEW ──
    {
      _type: 'ctaSection',
      _key: 'vi-cta1',
      heading: 'Ready to Make Your Brand Impossible to Ignore?',
      bodyText: [
        block('cta1b', 'Visual advertising works best when creativity, targeting, and strategy come together. If you\'re looking to stand out, attract attention, and drive engagement, this is where it starts.'),
      ],
      ctaText: 'Talk to Expert Team',
      ctaLink: '/contact-search-performance-marketing-agency',
      variant: 'blue',
    },

    // ── 6. VISUAL AD FORMATS (What we do) — 8 icon cards ──
    {
      _type: 'cardGridSection',
      _key: 'vi-services',
      eyebrow: 'What we do',
      heading: 'Choose the Right Visual Ad Format for Your Brand',
      subtext: 'Different visual ad formats help you connect with your audience and grow across platforms effectively.',
      headerLayout: 'split',
      style: 'icon-grid',
      cards: [
        { _key: 'sv1', title: 'Display Ads', description: 'Banner ads placed across relevant websites and apps to increase brand visibility, reach new audiences, and consistently reinforce your presence online.', svgPath: 'M3 4h18v12H3z M7 20h10 M12 16v4 M7 8h6 M7 11h4' },
        { _key: 'sv2', title: 'Meta Ads', description: 'Image and video ads designed for platforms like Instagram and Facebook to engage audiences, build interest, and drive targeted traffic effectively.', svgPath: 'M3 15.5C3 10 5.5 6 8.3 6c3.6 0 5.2 12 9 12 2 0 3.7-2.2 3.7-5.5S19.5 6 17.2 6c-3.6 0-5.2 12-9 12C5 18 3 17.2 3 15.5z' },
        { _key: 'sv3', title: 'LinkedIn Ads', description: 'Target decision-makers and professionals with precise B2B campaigns, generating high-quality leads, building authority, and driving meaningful business conversations and conversions.', svgPath: 'M4 4h16v16H4z M8 10v6 M8 7.5v.01 M12 16v-6 M12 12.5c0-1.5 1-2.5 2.2-2.5S16 11 16 12.5V16' },
        { _key: 'sv4', title: 'YouTube Ads', description: 'Engage audiences through impactful video ads, increasing brand awareness, capturing attention early, and driving high-intent traffic with compelling visual storytelling strategies.', svgPath: 'M3 7.5C3 6 4 5 5.5 5h13C20 5 21 6 21 7.5v9c0 1.5-1 2.5-2.5 2.5h-13C4 19 3 18 3 16.5z M10 9l5 3-5 3z' },
        { _key: 'sv5', title: 'Video Ads', description: 'Engaging video campaigns that capture attention quickly, communicate your brand story clearly, and drive higher engagement and conversions across digital platforms.', svgPath: 'M3 6h13v12H3z M16 10l5-3v10l-5-3' },
        { _key: 'sv6', title: 'Carousel Ads', description: 'Interactive ads that showcase multiple products, services, or features in a single format, encouraging users to explore and engage with your offerings.', svgPath: 'M7 5h10v14H7z M3 7v10 M21 7v10' },
        { _key: 'sv7', title: 'Remarketing Ads', description: 'Reconnect with users who previously interacted with your brand, reminding them of your services and guiding them back to complete desired actions.', svgPath: 'M4 12a8 8 0 0 1 14-5.3 M20 4v4h-4 M20 12a8 8 0 0 1-14 5.3 M4 20v-4h4' },
        { _key: 'sv8', title: 'Responsive Display Ads', description: 'Automatically optimised ads that adjust visuals, formats, and messaging to fit different placements, ensuring better performance and wider reach across platforms.', svgPath: 'M2 5h14v10H2z M6 19h6 M18 9h4v11h-4z' },
      ],
    },

    // ── 7. PROCESS (How we work) — unified container ──
    {
      _type: 'cardGridSection',
      _key: 'vi-process',
      eyebrow: 'How we work',
      heading: 'How We Turn Your Campaigns Into Performance Machines',
      subtext: 'Our process focuses on creative strategy, audience targeting, and continuous improvement to drive better results.',
      headerLayout: 'split',
      cardContainerStyle: 'unified',
      background: 'white',
      cards: [
        { _key: 'p1', tag: 'Step 1', title: 'Understand Your Brand & Audience', description: 'We analyze your business, audience behavior, and goals.' },
        { _key: 'p2', tag: 'Step 2', title: 'Create High-Impact Visuals', description: 'Design creatives that align with your message and stand out.' },
        { _key: 'p3', tag: 'Step 3', title: 'Launch Targeted Campaigns', description: 'Run structured campaigns aimed at the right audience segments.' },
        { _key: 'p4', tag: 'Step 4', title: 'Optimize for Better Results', description: 'Continuously improve creatives, targeting, and performance.' },
      ],
    },

    // ── 8. PERFORMANCE NUMBERS (By the numbers) — split layout ──
    {
      _type: 'statsSection',
      _key: 'vi-stats',
      eyebrow: 'By the numbers',
      heading: "Numbers That Show What's Possible When It's Done Right",
      bodyText: 'Our visual ad campaigns combine high-impact creativity with precise audience targeting, helping your brand capture attention, drive meaningful engagement, and achieve consistent, measurable growth across digital platforms and channels today.',
      layout: 'split',
      stats: [
        { _key: 's1', value: '100+', label: 'Visual Campaigns Managed' },
        { _key: 's2', value: '50K+', label: 'Clicks Driven Through Visual Ads' },
        { _key: 's3', value: '3X Growth', label: 'In Social Media Engagement' },
        { _key: 's4', value: '30% Lower', label: 'Cost Per Conversion' },
        { _key: 's5', value: '5X Faster', label: 'Creative Testing Cycles' },
        { _key: 's6', value: '90% Campaigns', label: 'Optimized Within First 30 Days' },
        { _key: 's7', value: '6+ Countries', label: 'Globally Served' },
        { _key: 's8', value: '360', label: 'Degree Marketing Solutions' },
      ],
    },

    // ── 9. CAMPAIGN VIDEO (Our work) ──
    {
      _type: 'videoShowcaseSection',
      _key: 'vi-video',
      eyebrow: 'Our work',
      heading: 'See What High-Performing Campaigns Actually Look Like',
      subtext: 'Explore real examples of high-performing campaigns that drive engagement, capture attention, and deliver measurable results across digital platforms and audiences.',
      videoFile: {
        _type: 'file',
        asset: { _ref: 'file-fc3d8672b0ac3683bf0253a407abd89b6d0e72e1-mp4', _type: 'reference' },
      },
    },

    // ── 10. WHAT YOU GAIN — badge grid with CTA ──
    {
      _type: 'cardGridSection',
      _key: 'vi-gains',
      eyebrow: 'What you gain',
      heading: 'What Changes When You Let Us Handle Your Visual Ads',
      subtext: 'When we manage your campaigns, every creative is built to capture attention and drive real outcomes.',
      style: 'badge-grid',
      ctaText: 'Get Started Today',
      ctaLink: '/contact-search-performance-marketing-agency',
      cards: [
        { _key: 'g1', title: 'Get Noticed Faster', description: 'Your brand stands out with strong, high-quality visuals.' },
        { _key: 'g2', title: 'Attract the Right Audience', description: 'Your ads reach people who are more likely to engage.' },
        { _key: 'g3', title: 'Reduce Wasted Spend', description: 'Better targeting means fewer irrelevant impressions.' },
        { _key: 'g4', title: 'Turn Engagement Into Results', description: 'Strong creatives help convert interest into action.' },
        { _key: 'g5', title: 'Grow Your Brand Consistently', description: 'Campaigns focused on long-term visibility and performance.' },
        { _key: 'g6', title: 'Know Exactly What\'s Working', description: 'Clear data helps you scale confidently.' },
      ],
    },
  ]

  // Keep existing image refs on vi-split4 (What You Gain section had an image)
  // Now it's a badge-grid so no image needed

  await client.patch(doc._id).set({
    pageBuilder,
    faqEyebrow: 'Before you ask',
    faqHeading: 'Frequently Asked Questions',
    expertCtaLabel: 'Talk to Visual Ads Expert',
  }).commit()

  console.log('✓ Updated pageBuilder (11 sections)')
  console.log('✓ Set faqEyebrow, faqHeading, expertCtaLabel')

  // Verify
  const verify = await client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      title,
      faqEyebrow,
      faqHeading,
      "sectionCount": count(pageBuilder),
      "sections": pageBuilder[]{ _key, _type },
      "faqCount": count(relatedFaqs),
    }`,
    { slug: SLUG },
  )
  console.log(`\n${verify.title}: ${verify.sectionCount} sections, ${verify.faqCount} FAQs`)
  console.log(`faqEyebrow: "${verify.faqEyebrow}"`)
  console.log(`faqHeading: "${verify.faqHeading}"`)
  for (const s of verify.sections) {
    console.log(`  ${s._key} → ${s._type}`)
  }

  console.log('\nContent changes from existing:')
  console.log('  - Hero: badgeText/badgeStyle → eyebrowText pill, heroBackground: white, CTA "Get Started Today"')
  console.log('  - Seen by Many: added eyebrow "The challenge", split body into 3 paragraphs')
  console.log('  - Grab Attention: textImageSection → cardGridSection icon-grid with 6 SVG icon cards')
  console.log('  - Why Choose: textImageSection → cardGridSection dark numbered with 6 cards')
  console.log('  - CTA Band: NEW ctaSection variant blue')
  console.log('  - Ad Formats: updated to icon-grid style with SVG paths, added eyebrow')
  console.log('  - Process: processStepsSection → cardGridSection unified container')
  console.log('  - Stats: added eyebrow "By the numbers", stat values now include suffix words')
  console.log('  - Video: added eyebrow "Our work"')
  console.log('  - What You Gain: textImageSection → cardGridSection badge-grid with CTA')
  console.log('  - FAQ: set eyebrow + heading on page level')
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
