import { chromium } from 'playwright'
import path from 'path'

const OUT = 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'

async function main() {
  const browser = await chromium.launch({ headless: true })

  for (const width of [1440, 390]) {
    const p = await browser.newPage()
    await p.setViewportSize({ width, height: 900 })
    await p.goto('http://localhost:3000/case-studies', { waitUntil: 'networkidle', timeout: 30000 })
    await p.waitForTimeout(3000)
    await p.screenshot({ path: path.join(OUT, `cs-${width}.png`), fullPage: true })
    console.log(`✓ cs-${width}.png`)
    await p.close()
  }

  await browser.close()
}

main().catch(console.error)
