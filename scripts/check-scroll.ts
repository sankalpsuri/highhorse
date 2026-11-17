import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  for (const w of [390, 768]) {
    const p = await browser.newPage()
    await p.setViewportSize({ width: w, height: 900 })
    await p.goto('http://localhost:3000/display-and-visual-advertising-campaign-management', { waitUntil: 'networkidle', timeout: 30000 })
    await p.waitForTimeout(2000)
    const scrollW = await p.evaluate(() => document.documentElement.scrollWidth)
    const clientW = await p.evaluate(() => document.documentElement.clientWidth)
    console.log(`${w}px: scrollWidth=${scrollW} clientWidth=${clientW} overflow=${scrollW > clientW}`)
    await p.close()
  }
  await browser.close()
}

main().catch(console.error)
