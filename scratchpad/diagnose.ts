import { chromium } from '@playwright/test'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`))

  await page.goto('http://localhost:3000/voice-search-seo-optimization-services', { waitUntil: 'networkidle' })

  // Count all sections in the page
  const sectionCount = await page.locator('section').count()
  console.log(`Total <section> elements: ${sectionCount}`)

  // For each section, log type, dimensions, background, visibility
  for (let i = 0; i < sectionCount; i++) {
    const sec = page.locator('section').nth(i)
    const box = await sec.boundingBox()
    const info = await sec.evaluate(el => {
      const style = getComputedStyle(el)
      const h2 = el.querySelector('h2')
      return {
        bg: style.backgroundColor,
        color: style.color,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        overflow: style.overflow,
        height: el.offsetHeight,
        childCount: el.children.length,
        headingText: h2?.textContent?.trim().slice(0, 60) || '(no h2)',
        dataSurface: el.getAttribute('data-surface'),
        innerHTML: el.innerHTML.slice(0, 200),
      }
    })
    console.log(`\nSection ${i}: "${info.headingText}"`)
    console.log(`  box: ${box ? `${box.x},${box.y} ${box.width}x${box.height}` : 'null'}`)
    console.log(`  bg: ${info.bg}, color: ${info.color}, display: ${info.display}`)
    console.log(`  visibility: ${info.visibility}, opacity: ${info.opacity}, overflow: ${info.overflow}`)
    console.log(`  height: ${info.height}, children: ${info.childCount}, surface: ${info.dataSurface}`)
    console.log(`  html preview: ${info.innerHTML.slice(0, 120)}`)
  }

  // Take a viewport-cropped screenshot at y=800 (scroll past hero)
  await page.evaluate(() => window.scrollTo(0, 800))
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'scratchpad/scroll-800.png' })

  // Scroll to where the dark section should be
  await page.evaluate(() => window.scrollTo(0, 2000))
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'scratchpad/scroll-2000.png' })

  if (errors.length) {
    console.log('\n=== CONSOLE ERRORS ===')
    errors.forEach(e => console.log(e))
  } else {
    console.log('\nNo console errors.')
  }

  await browser.close()
}

main().catch(e => { console.error(e); process.exit(1) })
