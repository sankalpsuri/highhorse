import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  // Check SEO page (uses both cardGridSection and challengeGridSection)
  await page.goto('http://localhost:3000/search-engine-optimization-seo-growth-services', { waitUntil: 'networkidle' })
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  console.log(`SEO page scrollWidth: ${scrollWidth} (should be 1440)`)

  // Check for console errors
  const errors: string[] = []
  page.on('pageerror', err => errors.push(err.message))

  await page.screenshot({ path: 'scratchpad/regression-seo-full.png', fullPage: true })
  console.log('✓ SEO full page screenshot')

  // Scroll to where cardGridSection likely is
  await page.evaluate(() => window.scrollTo(0, 2500))
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'scratchpad/regression-seo-scroll.png' })
  console.log('✓ SEO scroll screenshot')

  // Check AI automation page (uses challengeGridSection)
  await page.goto('http://localhost:3000/ai-marketing-workflow-automation-solutions', { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, 1800))
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'scratchpad/regression-ai-scroll.png' })
  console.log('✓ AI automation scroll screenshot')

  if (errors.length) {
    console.log('\nERRORS:', errors)
  } else {
    console.log('\nNo page errors.')
  }

  await browser.close()
}

main().catch(e => { console.error(e); process.exit(1) })
