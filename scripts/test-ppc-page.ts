import { chromium } from 'playwright'
import path from 'path'

const SCRATCHPAD = process.env.SCRATCHPAD || 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'
const PPC_URL = 'http://localhost:3000/ppc-advertising-management-and-performance-marketing'
const UI_FILE = `file:///${path.resolve('ui/PPC Services.dc.html').replace(/\\/g, '/')}`

async function main() {
  const browser = await chromium.launch({ headless: true })

  // ── 1440px Live page ──
  const livePage = await browser.newPage()
  await livePage.setViewportSize({ width: 1440, height: 900 })
  await livePage.goto(PPC_URL, { waitUntil: 'networkidle', timeout: 30000 })
  await livePage.waitForTimeout(2000)

  // Full page screenshot
  await livePage.screenshot({ path: path.join(SCRATCHPAD, 'live-full-1440.png'), fullPage: true })
  console.log('✓ live-full-1440.png')

  // Section screenshots by scrolling
  const sections = await livePage.$$('section, [data-section]')
  console.log(`Found ${sections.length} sections on live page`)

  // Take a screenshot of each major visible block
  const liveHeight = await livePage.evaluate(() => document.body.scrollHeight)
  const step = 900
  let idx = 0
  for (let y = 0; y < liveHeight; y += step) {
    await livePage.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await livePage.waitForTimeout(300)
    await livePage.screenshot({ path: path.join(SCRATCHPAD, `live-section-${idx}.png`) })
    idx++
  }
  console.log(`✓ ${idx} viewport screenshots at 1440px`)

  // ── 1440px Design file ──
  const designPage = await browser.newPage()
  await designPage.setViewportSize({ width: 1440, height: 900 })
  await designPage.goto(UI_FILE, { waitUntil: 'networkidle', timeout: 30000 })
  await designPage.waitForTimeout(2000)
  await designPage.screenshot({ path: path.join(SCRATCHPAD, 'design-full-1440.png'), fullPage: true })
  console.log('✓ design-full-1440.png')

  const designHeight = await designPage.evaluate(() => document.body.scrollHeight)
  let dIdx = 0
  for (let y = 0; y < designHeight; y += step) {
    await designPage.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await designPage.waitForTimeout(300)
    await designPage.screenshot({ path: path.join(SCRATCHPAD, `design-section-${dIdx}.png`) })
    dIdx++
  }
  console.log(`✓ ${dIdx} viewport screenshots of design`)

  // ── Responsive checks ──
  for (const width of [390, 768]) {
    const rPage = await browser.newPage()
    await rPage.setViewportSize({ width, height: 844 })
    await rPage.goto(PPC_URL, { waitUntil: 'networkidle', timeout: 30000 })
    await rPage.waitForTimeout(2000)

    // Check for horizontal scroll
    const hasHScroll = await rPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    console.log(`${width}px: horizontal scroll = ${hasHScroll ? '⚠ YES' : '✓ NO'}`)

    await rPage.screenshot({ path: path.join(SCRATCHPAD, `live-${width}w.png`), fullPage: true })
    console.log(`✓ live-${width}w.png`)
    await rPage.close()
  }

  // ── Check another page hasn't changed ──
  const otherPage = await browser.newPage()
  await otherPage.setViewportSize({ width: 1440, height: 900 })
  await otherPage.goto('http://localhost:3000/seo-services', { waitUntil: 'networkidle', timeout: 30000 })
  await otherPage.waitForTimeout(1000)
  await otherPage.screenshot({ path: path.join(SCRATCHPAD, 'other-seo-1440.png'), fullPage: true })
  console.log('✓ other-seo-1440.png (verify unchanged)')
  await otherPage.close()

  await livePage.close()
  await designPage.close()
  await browser.close()
  console.log('\nDone! Screenshots saved to:', SCRATCHPAD)
}

main().catch(console.error)
