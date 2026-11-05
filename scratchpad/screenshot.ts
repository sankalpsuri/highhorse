import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3000/voice-search-seo-optimization-services', { waitUntil: 'networkidle' })

  // Full page screenshot
  await page.screenshot({ path: 'scratchpad/voice-seo-full.png', fullPage: true })
  console.log('✓ Full page screenshot')

  // Section 4 — "Key Components of Voice SEO" (unified container)
  const sec4heading = page.locator('h2:has-text("Key Components of Voice SEO")').first()
  if (await sec4heading.isVisible()) {
    const section = sec4heading.locator('xpath=ancestor::section[1]')
    await section.screenshot({ path: 'scratchpad/sec4-components.png' })
    console.log('✓ Section 4 screenshot taken')
  } else {
    console.log('✗ Section 4 heading not found')
  }

  // Section 3 — "Why Choose High Horse" (numbered-card)
  const sec3heading = page.locator('h2:has-text("Why Choose High Horse")').first()
  if (await sec3heading.isVisible()) {
    const section = sec3heading.locator('xpath=ancestor::section[1]')
    await section.screenshot({ path: 'scratchpad/sec3-whychoose.png' })
    console.log('✓ Section 3 screenshot taken')
  } else {
    console.log('✗ Section 3 heading not found')
  }

  // Section 1 — "How Voice SEO Helps Businesses Grow" (dark benefits)
  const sec1heading = page.locator('h2:has-text("How Voice SEO Helps Businesses Grow")').first()
  if (await sec1heading.isVisible()) {
    const section = sec1heading.locator('xpath=ancestor::section[1]')
    await section.screenshot({ path: 'scratchpad/sec1-benefits.png' })
    console.log('✓ Section 1 screenshot taken')
  } else {
    console.log('✗ Section 1 heading not found')
  }

  // Section 2 — "What Drives Voice Search Visibility" (clean bordered)
  const sec2heading = page.locator('h2:has-text("What Drives Voice Search Visibility")').first()
  if (await sec2heading.isVisible()) {
    const section = sec2heading.locator('xpath=ancestor::section[1]')
    await section.screenshot({ path: 'scratchpad/sec2-drivers.png' })
    console.log('✓ Section 2 screenshot taken')
  } else {
    console.log('✗ Section 2 heading not found')
  }

  await browser.close()
  console.log('\nAll screenshots saved to scratchpad/')
}

main().catch(e => { console.error(e); process.exit(1) })
