import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const OUT = 'C:\\Users\\ishme\\AppData\\Local\\Temp\\claude\\screenshots'

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/display-and-visual-advertising-campaign-management', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)

  // Scroll to trigger ScrollReveal
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

  // Measure the video section internals
  const info = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'))
    // Section 8 = "See What High-Performing..."
    const videoSection = sections[8]
    const nextSection = sections[9]
    if (!videoSection || !nextSection) return null

    const vsRect = videoSection.getBoundingClientRect()
    const nsRect = nextSection.getBoundingClientRect()

    // Find the video element
    const video = videoSection.querySelector('video')
    const videoRect = video?.getBoundingClientRect()

    // Find the video container div (direct child with overflow hidden)
    const videoContainer = video?.parentElement
    const containerRect = videoContainer?.getBoundingClientRect()

    // Find the rsp-section div
    const rspDiv = videoSection.querySelector('.rsp-section')
    const rspRect = rspDiv?.getBoundingClientRect()
    const rspStyle = rspDiv ? getComputedStyle(rspDiv) : null

    // Find the SectionHeader wrapper
    const headerWrapper = rspDiv?.firstElementChild
    const headerRect = headerWrapper?.getBoundingClientRect()

    return {
      videoSection: { top: Math.round(vsRect.top + scrollY), bottom: Math.round(vsRect.bottom + scrollY), height: Math.round(vsRect.height) },
      nextSection: { top: Math.round(nsRect.top + scrollY), bottom: Math.round(nsRect.bottom + scrollY), height: Math.round(nsRect.height) },
      rspSection: rspRect ? { top: Math.round(rspRect.top + scrollY), bottom: Math.round(rspRect.bottom + scrollY), height: Math.round(rspRect.height), pt: rspStyle?.paddingTop, pb: rspStyle?.paddingBottom } : null,
      headerWrapper: headerRect ? { top: Math.round(headerRect.top + scrollY), bottom: Math.round(headerRect.bottom + scrollY), height: Math.round(headerRect.height), tag: headerWrapper?.tagName, className: (headerWrapper as HTMLElement)?.className } : null,
      videoContainer: containerRect ? { top: Math.round(containerRect.top + scrollY), bottom: Math.round(containerRect.bottom + scrollY), height: Math.round(containerRect.height) } : null,
      video: videoRect ? { top: Math.round(videoRect.top + scrollY), bottom: Math.round(videoRect.bottom + scrollY), height: Math.round(videoRect.height), naturalW: (video as HTMLVideoElement).videoWidth, naturalH: (video as HTMLVideoElement).videoHeight } : null,
      gapBetween: Math.round(nsRect.top - vsRect.bottom),
    }
  })

  console.log(JSON.stringify(info, null, 2))

  // Take a clip screenshot of the transition area
  if (info) {
    const clipY = info.videoContainer ? info.videoContainer.bottom - 100 : info.videoSection.bottom - 200
    await page.screenshot({
      path: path.join(OUT, 'gap-video-to-gain.png'),
      clip: { x: 0, y: clipY, width: 1440, height: 500 },
    })
    console.log('Screenshot saved: gap-video-to-gain.png')
  }

  await browser.close()
}

main().catch(console.error)
