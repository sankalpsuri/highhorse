import { chromium } from 'playwright'
import path from 'path'

const OUT = 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'
const PPC_URL = 'http://localhost:3000/ppc-advertising-management-and-performance-marketing'
const UI_FILE = `file:///${path.resolve('ui/PPC Services.dc.html').replace(/\\/g, '/')}`

async function main() {
  const browser = await chromium.launch({ headless: true })

  // Live page at 1440px
  const p = await browser.newPage()
  await p.setViewportSize({ width: 1440, height: 900 })
  await p.goto(PPC_URL, { waitUntil: 'networkidle', timeout: 30000 })
  await p.waitForTimeout(3000)

  // Scroll through each viewport-height chunk
  const h = await p.evaluate(() => document.body.scrollHeight)
  const step = 900
  for (let i = 0, y = 0; y < h; y += step, i++) {
    await p.evaluate(s => window.scrollTo(0, s), y)
    await p.waitForTimeout(400)
    await p.screenshot({ path: path.join(OUT, `live-${i}.png`) })
  }
  console.log(`✓ Live: ${Math.ceil(h / step)} screenshots`)

  // Design at 1440px
  const d = await browser.newPage()
  await d.setViewportSize({ width: 1440, height: 900 })
  await d.goto(UI_FILE, { waitUntil: 'networkidle', timeout: 30000 })
  await d.waitForTimeout(2000)
  const dh = await d.evaluate(() => document.body.scrollHeight)
  for (let i = 0, y = 0; y < dh; y += step, i++) {
    await d.evaluate(s => window.scrollTo(0, s), y)
    await d.waitForTimeout(400)
    await d.screenshot({ path: path.join(OUT, `design-${i}.png`) })
  }
  console.log(`✓ Design: ${Math.ceil(dh / step)} screenshots`)

  await browser.close()
}

main().catch(console.error)
