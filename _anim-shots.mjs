import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const OUT = "C:/Users/ishme/AppData/Local/Temp/claude/C--Users-ishme-high-horse/20fe05b4-361a-475f-96ec-a9f44a79370c/scratchpad";

(async () => {
  const browser = await chromium.launch();

  for (const width of [1440, 390]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${BASE}/seo-landing`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Scroll to the How We Work section but don't trigger the animation yet
    // We'll manually set the state for each screenshot
    const section = page.locator('#how-we-work');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Wait for the entrance animation to start
    await page.waitForTimeout(2000);

    // Take screenshots at different fill states by clicking specific steps
    const states = [
      { name: "0-all-black", step: -1, desc: "Before animation (scroll to trigger, then take first frame)" },
      { name: "1-step1-filled", step: 0 },
      { name: "2-step3-filled", step: 2 },
      { name: "3-row1-filled", step: 4 },
      { name: "4-row2-filling", step: 7 },
      { name: "5-all-filled", step: 9 },
    ];

    for (const st of states) {
      if (st.step >= 0) {
        // Click on the step to set it
        const steps = section.locator('[style*="cursor: pointer"]');
        const stepEl = steps.nth(st.step);
        await stepEl.click();
        await page.waitForTimeout(800);
      }
      await section.screenshot({ path: `${OUT}/anim-${st.name}-${width}px.png` });
      console.log(`Saved: anim-${st.name}-${width}px.png`);
    }

    await page.close();
  }

  // Verify other pages unchanged
  for (const [name, path] of [["homepage", "/"], ["landing", "/landing"], ["contact", "/contact-search-performance-marketing-agency"], ["case-studies", "/case-studies"]]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT}/unchanged-${name}.png`, fullPage: false });
    console.log(`Saved: unchanged-${name}.png`);

    // Check console errors
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    if (errors.length) console.log(`  Console errors on ${path}:`, errors);
    await page.close();
  }

  // Check seo-landing for console errors
  const errPage = await browser.newPage();
  const errors = [];
  errPage.on('pageerror', err => errors.push(err.message));
  await errPage.setViewportSize({ width: 1440, height: 900 });
  await errPage.goto(`${BASE}/seo-landing`, { waitUntil: "networkidle" });
  await errPage.waitForTimeout(3000);
  console.log(`\nConsole errors on /seo-landing: ${errors.length ? errors.join('; ') : 'none'}`);
  await errPage.close();

  await browser.close();
  console.log("\nDone.");
})();
