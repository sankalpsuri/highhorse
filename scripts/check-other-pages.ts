import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const OUT = 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'

const PAGES = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'seo', url: 'http://localhost:3000/search-engine-optimisation-seo-services' },
  { name: 'ppc', url: 'http://localhost:3000/ppc-advertising-management-and-performance-marketing' },
]

async function scrollToBottom(page: any) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0
      const distance = 600
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 60)
    })
  })
  await page.waitForTimeout(1000)
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })

  for (const pg of PAGES) {
    const p = await browser.newPage()
    await p.setViewportSize({ width: 1440, height: 900 })
    await p.goto(pg.url, { waitUntil: 'networkidle', timeout: 30000 })
    await p.waitForTimeout(2000)
    await scrollToBottom(p)
    await p.screenshot({ path: path.join(OUT, `other-${pg.name}.png`), fullPage: true })
    console.log(`✓ ${pg.name}`)
    await p.close()
  }

  await browser.close()
}

main().catch(console.error)
