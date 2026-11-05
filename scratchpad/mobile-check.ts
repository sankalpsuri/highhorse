import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://localhost:3000/voice-search-seo-optimization-services', { waitUntil: 'networkidle' })

  // Check no horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
  console.log(`scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`)
  console.log(`Horizontal scroll: ${scrollWidth > clientWidth ? 'YES (BAD)' : 'NO (GOOD)'}`)

  // Section 1 (dark benefits)
  const sec1 = page.locator('section[data-surface="dark"]').first()
  await sec1.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec1.screenshot({ path: 'scratchpad/mobile-sec1.png' })
  console.log('✓ Mobile Section 1')

  // Section 2 (clean drivers)
  const sec2 = page.locator('section').filter({ has: page.locator('h2:has-text("What Drives Voice Search Visibility")') })
  await sec2.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec2.screenshot({ path: 'scratchpad/mobile-sec2.png' })
  console.log('✓ Mobile Section 2')

  // Section 3 (why choose)
  const sec3 = page.locator('section').filter({ has: page.locator('h2:has-text("Why Choose High Horse")') })
  await sec3.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec3.screenshot({ path: 'scratchpad/mobile-sec3.png' })
  console.log('✓ Mobile Section 3')

  // Section 4 (key components)
  const sec4 = page.locator('section').filter({ has: page.locator('h2:has-text("Key Components of Voice SEO")') })
  await sec4.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec4.screenshot({ path: 'scratchpad/mobile-sec4.png' })
  console.log('✓ Mobile Section 4')

  await browser.close()
  console.log('\nDone.')
}

main().catch(e => { console.error(e); process.exit(1) })
