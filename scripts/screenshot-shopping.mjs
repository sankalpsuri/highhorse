import { chromium } from 'playwright';
import path from 'path';

const OUT = path.resolve('C:/Users/ishme/AppData/Local/Temp/claude/C--Users-ishme-high-horse/7435e791-167a-4714-876c-a2bfaf098371/scratchpad');
const URL = 'http://localhost:3000/google-shopping-ads-management-for-ecommerce';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Full page at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1000);

  // Full page screenshot
  await page.screenshot({
    path: path.join(OUT, 'shopping-full-1440.png'),
    fullPage: true,
  });
  console.log('Full page screenshot saved at 1440px');

  // Section-by-section screenshots
  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections`);

  for (let i = 0; i < sections.length; i++) {
    const info = await sections[i].evaluate(el => ({
      h2: el.querySelector('h2')?.textContent?.substring(0, 60) || '',
      h1: el.querySelector('h1')?.textContent?.substring(0, 60) || '',
      bg: window.getComputedStyle(el).backgroundColor,
      classes: el.className,
    }));
    const label = info.h1 || info.h2 || `section-${i}`;
    console.log(`  ${i}: bg=${info.bg} "${label}"`);

    await sections[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const box = await sections[i].boundingBox();
    if (box && box.height > 10) {
      const safeName = label.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
      await page.screenshot({
        path: path.join(OUT, `shopping-s${i}-${safeName}-1440.png`),
        clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 4000) },
      });
    }
  }

  // Check 390px for horizontal scroll
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(500);
  const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`\n390px viewport: scrollWidth=${scrollWidth390}, overflow=${scrollWidth390 > 390 ? 'YES' : 'no'}`);

  // Check 768px for horizontal scroll
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(500);
  const scrollWidth768 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`768px viewport: scrollWidth=${scrollWidth768}, overflow=${scrollWidth768 > 768 ? 'YES' : 'no'}`);

  // Verify other pages unaffected
  console.log('\n=== OTHER PAGES ===');
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  const homeH2s = await page.$$eval('h2', els => els.length);
  console.log(`Homepage: ${homeH2s} h2 elements`);

  await page.goto('http://localhost:3000/search-engine-optimization-seo-growth-services', { waitUntil: 'networkidle', timeout: 60000 });
  const seoH2s = await page.$$eval('h2', els => els.length);
  console.log(`SEO page: ${seoH2s} h2 elements`);

  await page.goto('http://localhost:3000/google-search-ads-management-for-lead-generation', { waitUntil: 'networkidle', timeout: 60000 });
  const searchH2s = await page.$$eval('h2', els => els.length);
  console.log(`Search Ads page: ${searchH2s} h2 elements`);

  await browser.close();
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });
