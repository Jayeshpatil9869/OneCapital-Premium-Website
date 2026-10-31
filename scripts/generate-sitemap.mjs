/**
 * Writes public/sitemap.xml for the Vite SPA (canonical https://1capital.in).
 * Run: node scripts/generate-sitemap.mjs  |  npm run sitemap
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const site = 'https://1capital.in';
const today = new Date().toISOString().slice(0, 10);

/** @type {{ path: string; changefreq: string; priority: string }[]} */
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions', changefreq: 'weekly', priority: '0.9' },
  { path: '/solutions/capital-strategy', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/portfolio-management', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/wealth-management', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/mutual-funds', changefreq: 'weekly', priority: '0.8' },
  { path: '/solutions/pms-aif', changefreq: 'weekly', priority: '0.8' },
  { path: '/solutions/equity', changefreq: 'monthly', priority: '0.6' },
  { path: '/solutions/equity-baskets', changefreq: 'monthly', priority: '0.6' },
  { path: '/solutions/options-baskets', changefreq: 'monthly', priority: '0.6' },
  { path: '/solutions/passive-income-strategy', changefreq: 'monthly', priority: '0.6' },
  { path: '/solutions/nifty-50-hedging', changefreq: 'monthly', priority: '0.6' },
  { path: '/solutions/investment-advisory', changefreq: 'monthly', priority: '0.7' },
  { path: '/approach', changefreq: 'monthly', priority: '0.7' },
  { path: '/team', changefreq: 'monthly', priority: '0.7' },
  { path: '/insights', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/newsletter', changefreq: 'monthly', priority: '0.5' },
  { path: '/calculators', changefreq: 'monthly', priority: '0.7' },
  { path: '/calculators/sip', changefreq: 'monthly', priority: '0.6' },
  { path: '/calculators/lumpsum', changefreq: 'monthly', priority: '0.6' },
  { path: '/calculators/step-up-sip', changefreq: 'monthly', priority: '0.6' },
  { path: '/calculators/swp', changefreq: 'monthly', priority: '0.6' },
  { path: '/calculators/goal-planning', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];

const blogSlugs = [
  'what-are-aif-and-pms',
  'is-pms-better-than-mutual-funds',
  'is-mutual-fund-better-than-fd',
  'invest-10000-in-mutual-funds',
  'fd-or-bonds',
];

const urls = [
  ...staticRoutes,
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.65',
  })),
];

const body = urls
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${site}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = join(root, 'public', 'sitemap.xml');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, xml, 'utf8');
console.log(`Wrote ${urls.length} URLs → ${out}`);
