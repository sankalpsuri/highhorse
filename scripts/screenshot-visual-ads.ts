import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const OUT = 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'
const URL = 'http://localhost:3000/display-and-visual-advertising-campaign-management'

async function scrollToBottom(page: any) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0
      const distance = 400
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 80)
    })
  })
  await page.waitForTimeout(1500)
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

  const browser = await chromium.launch({ headless: true })

  for (const width of [1440, 768, 390]) {
    const p = await browser.newPage()
    await p.setViewportSize({ width, height: 900 })
    await p.goto(URL, { waitUntil: 'networkidle', timeout: 30000 })
    await p.waitForTimeout(2000)
    await scrollToBottom(p)
    await p.screenshot({ path: path.join(OUT, `va-${width}.png`), fullPage: true })
    console.log(`✓ va-${width}.png`)
    await p.close()
  }

  await browser.close()
}

main().catch(console.error)
