import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/display-and-visual-advertising-campaign-management', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)

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

  const result = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'))
    const data: any[] = []

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i]
      const rect = s.getBoundingClientRect()
      const bg = getComputedStyle(s).backgroundColor
      const heading = s.querySelector('h2')?.textContent?.trim().slice(0, 50) || '(no heading)'

      // Find the rsp-section div inside
      const rspDiv = s.querySelector('.rsp-section')
      let rspPt = '0', rspPb = '0'
      if (rspDiv) {
        const cs = getComputedStyle(rspDiv)
        rspPt = cs.paddingTop
        rspPb = cs.paddingBottom
      }

      // Find last visible child content bottom
      const allChildren = Array.from(s.querySelectorAll('*'))
      let lastContentBottom = rect.top
      for (const child of allChildren) {
        const cr = child.getBoundingClientRect()
        if (cr.height > 0 && cr.width > 0) {
          lastContentBottom = Math.max(lastContentBottom, cr.bottom)
        }
      }

      data.push({
        index: i,
        heading,
        sectionTop: Math.round(rect.top + window.scrollY),
        sectionBottom: Math.round(rect.bottom + window.scrollY),
        lastContentBottom: Math.round(lastContentBottom + window.scrollY),
        bg,
        rspPaddingTop: rspPt,
        rspPaddingBottom: rspPb,
      })
    }

    // Calculate content-to-content gaps
    const gaps: any[] = []
    for (let i = 0; i < data.length - 1; i++) {
      const curr = data[i]
      // Find first visible content top in next section
      const nextS = sections[i + 1]
      const nextChildren = Array.from(nextS.querySelectorAll('h2, h3, p, span, img, svg'))
      let firstContentTop = data[i + 1].sectionBottom
      for (const child of nextChildren) {
        const cr = child.getBoundingClientRect()
        if (cr.height > 0 && cr.width > 0) {
          firstContentTop = Math.min(firstContentTop, Math.round(cr.top + window.scrollY))
        }
      }

      gaps.push({
        from: curr.heading,
        to: data[i + 1].heading,
        sectionGap: data[i + 1].sectionTop - curr.sectionBottom,
        contentGap: firstContentTop - curr.lastContentBottom,
        fromBg: curr.bg,
        toBg: data[i + 1].bg,
      })
    }

    return { sections: data, gaps }
  })

  console.log('=== SECTION INFO ===')
  for (const s of result.sections) {
    console.log(`[${s.index}] "${s.heading}"`)
    console.log(`    section: ${s.sectionTop}–${s.sectionBottom}  content ends: ${s.lastContentBottom}`)
    console.log(`    bg=${s.bg}  rsp-pt=${s.rspPaddingTop}  rsp-pb=${s.rspPaddingBottom}`)
    console.log()
  }

  console.log('=== GAPS ===')
  for (const g of result.gaps) {
    console.log(`"${g.from}" → "${g.to}"`)
    console.log(`    section gap: ${g.sectionGap}px  content gap: ${g.contentGap}px`)
    console.log(`    bg: ${g.fromBg} → ${g.toBg}`)
    console.log()
  }

  await browser.close()
}

main().catch(console.error)
