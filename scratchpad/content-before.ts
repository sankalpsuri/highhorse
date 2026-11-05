import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3000/seo-content-marketing-and-demand-generation-services', { waitUntil: 'networkidle' })

  // Desktop screenshot of the target section
  const sec = page.locator('section').filter({ has: page.locator('h2:has-text("Content Marketing Services Designed to Drive Traffic")') })
  await sec.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await sec.screenshot({ path: 'scratchpad/content-before-desktop.png' })
  console.log('✓ Desktop before')

  // Also capture the section above and below for alternating rhythm check
  const allSections = page.locator('section')
  const count = await allSections.count()
  let targetIdx = -1
  for (let i = 0; i < count; i++) {
    const text = await allSections.nth(i).locator('h2').first().textContent().catch(() => '')
    if (text?.includes('Content Marketing Services Designed to Drive Traffic')) {
      targetIdx = i
      break
    }
  }
  if (targetIdx > 0) {
    await allSections.nth(targetIdx - 1).scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await allSections.nth(targetIdx - 1).screenshot({ path: 'scratchpad/content-before-above.png' })
    console.log('✓ Section above')
  }
  if (targetIdx >= 0 && targetIdx < count - 1) {
    await allSections.nth(targetIdx + 1).scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await allSections.nth(targetIdx + 1).screenshot({ path: 'scratchpad/content-before-below.png' })
    console.log('✓ Section below')
  }

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload({ waitUntil: 'networkidle' })
  const secMobile = page.locator('section').filter({ has: page.locator('h2:has-text("Content Marketing Services Designed to Drive Traffic")') })
  await secMobile.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await secMobile.screenshot({ path: 'scratchpad/content-before-mobile.png' })
  console.log('✓ Mobile before')

  await browser.close()
}

main().catch(e => { console.error(e); process.exit(1) })
