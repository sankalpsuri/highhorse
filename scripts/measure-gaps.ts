import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/display-and-visual-advertising-campaign-management', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)

  // Scroll to trigger all ScrollReveal
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

  const gaps = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'))
    const results: any[] = []
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i]
      const rect = s.getBoundingClientRect()
      const bg = getComputedStyle(s).backgroundColor
      const text = s.querySelector('h2')?.textContent?.trim().slice(0, 50) || s.querySelector('h3')?.textContent?.trim().slice(0, 50) || '(no heading)'
      const paddingTop = getComputedStyle(s).paddingTop
      const paddingBottom = getComputedStyle(s).paddingBottom
      const marginTop = getComputedStyle(s).marginTop
      const marginBottom = getComputedStyle(s).marginBottom

      let gapToNext = 0
      if (i < sections.length - 1) {
        const nextRect = sections[i + 1].getBoundingClientRect()
        gapToNext = nextRect.top - rect.bottom
      }

      results.push({
        index: i,
        heading: text,
        top: Math.round(rect.top + window.scrollY),
        bottom: Math.round(rect.bottom + window.scrollY),
        height: Math.round(rect.height),
        bg,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom,
        gapToNext: Math.round(gapToNext),
      })
    }
    return results
  })

  for (const g of gaps) {
    console.log(`[${g.index}] "${g.heading}"`)
    console.log(`    top=${g.top} bottom=${g.bottom} height=${g.height}`)
    console.log(`    bg=${g.bg} pt=${g.paddingTop} pb=${g.paddingBottom} mt=${g.marginTop} mb=${g.marginBottom}`)
    console.log(`    gap to next section: ${g.gapToNext}px`)
    console.log()
  }

  await browser.close()
}

main().catch(console.error)
