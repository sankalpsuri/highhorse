import { chromium } from 'playwright';
import path from 'path';

const OUT = path.resolve('C:/Users/ishme/AppData/Local/Temp/claude/C--Users-ishme-high-horse/7435e791-167a-4714-876c-a2bfaf098371/scratchpad');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/google-search-ads-management-for-lead-generation', { waitUntil: 'networkidle', timeout: 60000 });

  // Find the section with "Turn High-Intent Searches" that has 8 card titles (h3s)
  const sects = await page.$$('section');
  let target = null;
  let targetIdx = -1;
  for (let i = 0; i < sects.length; i++) {
    const h3Count = await sects[i].$$eval('h3', els => els.length);
    if (h3Count >= 6) {
      const h2Text = await sects[i].$eval('h2', el => el.textContent).catch(() => '');
      if (h2Text.includes('Turn High-Intent Searches')) {
        target = sects[i];
        targetIdx = i;
        break;
      }
    }
  }

  if (!target) {
    console.log('Target section not found! Listing all sections:');
    for (let i = 0; i < sects.length; i++) {
      const info = await sects[i].evaluate(el => ({
        h2: el.querySelector('h2')?.textContent?.substring(0, 50),
        h3Count: el.querySelectorAll('h3').length,
        bg: window.getComputedStyle(el).backgroundColor,
      }));
      console.log(`  ${i}: h3s=${info.h3Count} bg=${info.bg} "${info.h2}"`);
    }
    await browser.close();
    return;
  }

  console.log(`Found target section at index ${targetIdx}`);

  // Screenshot at 1440
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await target.boundingBox();
  if (box) {
    await page.screenshot({
      path: path.join(OUT, 'live-section-after-1440.png'),
      clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 3000) },
    });
    console.log(`Screenshot at 1440px (${box.width}x${box.height})`);
  }

  // Extract computed styles
  const styles = await page.evaluate((el) => {
    const cs = window.getComputedStyle(el);
    const r = {};
    r['01_section_bg'] = cs.backgroundColor;
    r['02_section_borderTop'] = `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`;
    r['03_section_borderBottom'] = `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`;
    r['04_section_padding'] = `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`;

    const container = el.querySelector('.rsp-section');
    if (container) {
      const ccs = window.getComputedStyle(container);
      r['05_container_maxWidth'] = ccs.maxWidth;
      r['06_container_padding'] = ccs.padding;
    }

    const eyebrow = el.querySelector('.sh-eyebrow span');
    r['07_eyebrow'] = eyebrow ? `"${eyebrow.textContent}" color=${window.getComputedStyle(eyebrow).color} size=${window.getComputedStyle(eyebrow).fontSize}` : '(MISSING)';

    r['08_headerLayout'] = el.querySelector('.sh-split') ? 'split' : 'stacked';

    const h2 = el.querySelector('h2');
    if (h2) {
      const hcs = window.getComputedStyle(h2);
      r['09_heading_size'] = hcs.fontSize;
      r['10_heading_weight'] = hcs.fontWeight;
      r['11_heading_lineHeight'] = hcs.lineHeight;
      r['12_heading_color'] = hcs.color;
      r['13_heading_maxWidth'] = hcs.maxWidth;
    }

    const desc = el.querySelector('.sh-right p') || el.querySelector('.sh-desc p');
    if (desc) {
      const dcs = window.getComputedStyle(desc);
      r['14_desc_color'] = dcs.color;
      r['15_desc_fontSize'] = dcs.fontSize;
      r['16_desc_maxWidth'] = dcs.maxWidth;
    }

    // Grid
    const grids = el.querySelectorAll('[style*="grid"]');
    for (const grid of grids) {
      const gcs = window.getComputedStyle(grid);
      if (gcs.display === 'grid') {
        r['17_grid_templateCols'] = gcs.gridTemplateColumns;
        r['18_grid_gap'] = gcs.gap;
        break;
      }
    }

    // Cards
    const hoverCards = el.querySelectorAll('.hh-card-hover');
    r['19_cardCount'] = hoverCards.length;
    r['20_cards_have_hover'] = hoverCards.length > 0;

    if (hoverCards.length > 0) {
      const c = hoverCards[0];
      const ccs = window.getComputedStyle(c);
      r['21_card_bg'] = ccs.backgroundColor;
      r['22_card_border'] = `${ccs.borderTopWidth} ${ccs.borderTopStyle} ${ccs.borderTopColor}`;
      r['23_card_borderRadius'] = ccs.borderRadius;
      r['24_card_padding'] = ccs.padding;
      r['25_card_display'] = ccs.display;
      r['26_card_gap'] = ccs.gap;

      // Icon badge (inline div, not .badge class)
      const badge = c.querySelector('div');
      if (badge) {
        const bcs = window.getComputedStyle(badge);
        if (parseInt(bcs.width) < 60) {
          r['27_iconBadge_size'] = `${bcs.width}x${bcs.height}`;
          r['28_iconBadge_bg'] = bcs.backgroundColor;
          r['29_iconBadge_border'] = `${bcs.borderTopWidth} ${bcs.borderTopStyle} ${bcs.borderTopColor}`;
          r['30_iconBadge_radius'] = bcs.borderRadius;
        }
      }

      const h3 = c.querySelector('h3');
      if (h3) {
        const h3cs = window.getComputedStyle(h3);
        r['31_cardTitle_fontSize'] = h3cs.fontSize;
        r['32_cardTitle_fontWeight'] = h3cs.fontWeight;
        r['33_cardTitle_lineHeight'] = h3cs.lineHeight;
        r['34_cardTitle_margin'] = h3cs.margin;
      }

      const p = c.querySelector('p');
      if (p) {
        const pcs = window.getComputedStyle(p);
        r['35_cardDesc_fontSize'] = pcs.fontSize;
        r['36_cardDesc_color'] = pcs.color;
        r['37_cardDesc_lineHeight'] = pcs.lineHeight;
      }
    }

    r['38_allTitles'] = Array.from(el.querySelectorAll('h3')).map(h => h.textContent);

    return r;
  }, target);

  console.log('\n=== AFTER FIX COMPUTED STYLES ===');
  for (const [key, val] of Object.entries(styles)) {
    console.log(`${key}: ${JSON.stringify(val)}`);
  }

  // Screenshot at 768 and 390
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  const sects768 = await page.$$('section');
  for (let i = 0; i < sects768.length; i++) {
    const h3Count = await sects768[i].$$eval('h3', els => els.length);
    if (h3Count >= 6) {
      const h2Text = await sects768[i].$eval('h2', el => el.textContent).catch(() => '');
      if (h2Text.includes('Turn High-Intent Searches')) {
        await sects768[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const b = await sects768[i].boundingBox();
        if (b) await page.screenshot({ path: path.join(OUT, 'live-section-after-768.png'), clip: { x: b.x, y: b.y, width: b.width, height: Math.min(b.height, 4000) } });
        console.log('\nScreenshot at 768px saved');
        break;
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const sects390 = await page.$$('section');
  for (let i = 0; i < sects390.length; i++) {
    const h3Count = await sects390[i].$$eval('h3', els => els.length);
    if (h3Count >= 6) {
      const h2Text = await sects390[i].$eval('h2', el => el.textContent).catch(() => '');
      if (h2Text.includes('Turn High-Intent Searches')) {
        await sects390[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const b = await sects390[i].boundingBox();
        if (b) await page.screenshot({ path: path.join(OUT, 'live-section-after-390.png'), clip: { x: b.x, y: b.y, width: b.width, height: Math.min(b.height, 6000) } });
        console.log('Screenshot at 390px saved');
        break;
      }
    }
  }

  // Verify OTHER sections unchanged - check homepage + 2 other pages
  console.log('\n=== CHECKING OTHER PAGES ARE UNCHANGED ===');

  // Homepage
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  const homeH2s = await page.$$eval('h2', els => els.map(e => e.textContent?.substring(0, 50)));
  console.log('Homepage h2s:', homeH2s.length, 'sections present');

  // SEO page
  await page.goto('http://localhost:3000/search-engine-optimization-seo-growth-services', { waitUntil: 'networkidle', timeout: 60000 });
  const seoH2s = await page.$$eval('h2', els => els.map(e => e.textContent?.substring(0, 50)));
  console.log('SEO page h2s:', seoH2s.length, 'sections present');

  await browser.close();
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });
