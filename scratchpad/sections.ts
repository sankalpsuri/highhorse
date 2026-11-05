import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3000/voice-search-seo-optimization-services', { waitUntil: 'networkidle' })

  // Section 1 (dark benefits) - "How Voice SEO Helps Businesses Grow"
  const sec1 = page.locator('section[data-surface="dark"]').first()
  await sec1.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec1.screenshot({ path: 'scratchpad/sec1-dark-benefits.png' })
  console.log('✓ Section 1 (dark benefits)')

  // Section 2 (clean bordered) - "What Drives Voice Search Visibility"
  const sec2 = page.locator('section').filter({ has: page.locator('h2:has-text("What Drives Voice Search Visibility")') })
  await sec2.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec2.screenshot({ path: 'scratchpad/sec2-clean-drivers.png' })
  console.log('✓ Section 2 (clean drivers)')

  // Section 3 (split numbered-card) - "Why Choose High Horse"
  const sec3 = page.locator('section').filter({ has: page.locator('h2:has-text("Why Choose High Horse")') })
  await sec3.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec3.screenshot({ path: 'scratchpad/sec3-why-choose.png' })
  console.log('✓ Section 3 (why choose)')

  // Section 4 (unified container) - "Key Components of Voice SEO"
  const sec4 = page.locator('section').filter({ has: page.locator('h2:has-text("Key Components of Voice SEO")') })
  await sec4.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec4.screenshot({ path: 'scratchpad/sec4-key-components.png' })
  console.log('✓ Section 4 (key components)')

  await browser.close()
  console.log('\nDone. Screenshots in scratchpad/')
}

main().catch(e => { console.error(e); process.exit(1) })
