/**
 * Phase E — viewport regression checks for One Capital home.
 * Requires: npm run dev (default http://localhost:3000)
 * Run: node scripts/responsive-audit.mjs
 *
 * Uses Playwright if available (`npx playwright` / local install).
 */

import { createRequire } from 'node:module';
import process from 'node:process';

const require = createRequire(import.meta.url);
const BASE = process.env.OC_AUDIT_URL || 'http://localhost:3000/';

const VIEWPORTS = [
  { name: 'mobile375', width: 375, height: 812 },
  { name: 'mobile430', width: 430, height: 932 },
  { name: 'tablet768', width: 768, height: 1024 },
  { name: 'laptop1366', width: 1366, height: 768 },
  { name: 'desktop1920', width: 1920, height: 1080 },
  { name: 'tv2560', width: 2560, height: 1440 },
];

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    try {
      return require('playwright');
    } catch {
      return null;
    }
  }
}

async function measure(page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    document.documentElement.style.scrollBehavior = 'auto';
  });

  const top = await page.evaluate(() => {
    const clientW = document.documentElement.clientWidth;
    const overflowX =
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - clientW;

    const faq = [...document.querySelectorAll('p')].find((p) =>
      /Still have questions/i.test(p.textContent || ''),
    );
    const faqR = faq?.getBoundingClientRect();
    const faqOverflow = faqR
      ? faqR.width > clientW + 8 || faqR.left < -8 || faqR.right > clientW + 8
      : false;

    return { overflowX, faqOverflow };
  });

  await page.evaluate(() => {
    const label = [...document.querySelectorAll('p')].find((p) =>
      /portfolio value/i.test(p.textContent || ''),
    );
    const collage = label?.closest('[data-oc-wealth-collage]');
    collage?.closest('.oc-pillar-slot')?.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await page.waitForTimeout(250);

  const fr = await page.evaluate(() => {
    const collage = document.querySelector('[data-oc-wealth-collage]');
    const r = collage?.getBoundingClientRect();
    const cta = [...document.querySelectorAll('.oc-pillar-card a')].find((a) =>
      /explore/i.test(a.textContent || ''),
    );
    const card = collage?.closest('.oc-pillar-card');
    const cr = card?.getBoundingClientRect();
    const ctar = cta?.getBoundingClientRect();
    return {
      collageH: r ? Math.round(r.height) : 0,
      collageW: r ? Math.round(r.width) : 0,
      ctaInCard:
        !!(ctar && cr) &&
        ctar.bottom <= cr.bottom + 4 &&
        ctar.top >= cr.top - 4,
    };
  });

  return { ...top, ...fr };
}

async function main() {
  const pw = await loadPlaywright();
  if (!pw) {
    console.error(
      'Playwright not found. Install with: npm i -D playwright && npx playwright install chromium',
    );
    process.exit(1);
  }

  const { chromium } = pw;
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    try {
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(500);
      const m = await measure(page);
      const ok =
        m.overflowX <= 2 &&
        !m.faqOverflow &&
        m.collageH >= 180 &&
        m.ctaInCard;

      const line = `${vp.name} (${vp.width}x${vp.height}): overflowX=${m.overflowX} faqOverflow=${m.faqOverflow} collage=${m.collageW}x${m.collageH} ctaInCard=${m.ctaInCard} → ${ok ? 'PASS' : 'FAIL'}`;
      console.log(line);
      if (!ok) failures.push(line);
    } catch (err) {
      const line = `${vp.name}: ERROR ${err.message || err}`;
      console.error(line);
      failures.push(line);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (failures.length) {
    console.error(`\n${failures.length} viewport(s) failed.`);
    process.exit(1);
  }
  console.log('\nAll viewports passed.');
}

main();
