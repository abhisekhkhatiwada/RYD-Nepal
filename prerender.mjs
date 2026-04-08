/**
 * Static pre-render script for RYD Nepal.
 * Run after `vite build` via: node prerender.mjs
 *
 * Steps:
 *  1. Build an SSR bundle (entry-server.tsx → dist-ssr/)
 *  2. For each route, renderToString → strip inline head tags → inject into dist/index.html
 *  3. Replace <title>, <meta name="description">, <link rel="canonical"> in <head>
 *  4. Write dist/<route>/index.html
 *  5. Generate dist/sitemap.xml
 *
 * NOTE: React 19 renders <title>/<meta>/<link> inline (React Document Metadata API).
 * They are stripped from the rendered body HTML and injected correctly into <head>
 * via direct string replacement using the ROUTE_META table below.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Per-route metadata ────────────────────────────────────────────────────────
const ROUTE_META = {
  '/': {
    title: 'RYD Nepal | Rent a Bike in Kathmandu — Earn Rs. 40k–60k/Month',
    description: 'Rent a Hero Super Splendor 125cc motorcycle in Kathmandu from Rs. 700/day. Earn Rs. 40,000–60,000/month on Pathao, InDrive, Yango & Tootle. No loan, no down payment, own the bike after 1.5 years.',
    canonical: 'https://www.rydnepal.com/',
    priority: '1.0',
    changefreq: 'weekly',
  },
  '/about': {
    title: "About RYD Nepal — Kathmandu's Largest Bike Rental Fleet",
    description: 'RYD Nepal Pvt. Ltd. empowers gig workers in Kathmandu with affordable Hero Super Splendor 125cc motorcycle rentals. 500+ active riders, dedicated Kapan workshop, rent-to-own program.',
    canonical: 'https://www.rydnepal.com/about',
    priority: '0.8',
    changefreq: 'monthly',
  },
  '/services': {
    title: 'Bike Rental Plans — Weekly, Monthly & Rent-to-Own | RYD Nepal',
    description: 'Rent a Hero Super Splendor 125cc in Kathmandu: Weekly Rs. 5,600/week, Pro Monthly Rs. 7,000/week, Prepayment Rs. 21,000/month. Includes free maintenance, insurance, and rent-to-own after 1.5 years.',
    canonical: 'https://www.rydnepal.com/services',
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/contact': {
    title: 'Contact RYD Nepal — Apply to Rent a Bike in Kathmandu',
    description: 'Apply to rent a motorcycle in Kathmandu. Fill out our quick form or call +977-9709197877. Office at Dhalane Pul, Kapan, Kathmandu. Get started with Pathao, InDrive, Yango or Tootle today.',
    canonical: 'https://www.rydnepal.com/contact',
    priority: '0.7',
    changefreq: 'monthly',
  },
  '/support': {
    title: 'Rider Support & FAQ — RYD Nepal',
    description: '24/7 breakdown assistance, workshop at Kapan, and answers to all your questions about renting a bike with RYD Nepal. Get support via WhatsApp or call us anytime.',
    canonical: 'https://www.rydnepal.com/support',
    priority: '0.7',
    changefreq: 'monthly',
  },
  '/blog/rent-to-own-hero-splendor-125': {
    title: 'Why Rent-to-Own a Hero Splendor 125 Makes Sense | RYD Nepal Blog',
    description: 'A data-driven breakdown of why paying Rs. 1,000/day to rent-to-own a Hero Super Splendor 125cc is smarter than a bank loan in Kathmandu. Real numbers for Pathao and InDrive riders.',
    canonical: 'https://www.rydnepal.com/blog/rent-to-own-hero-splendor-125',
    priority: '0.9',
    changefreq: 'monthly',
  },
};

// ── 1. Build the SSR bundle ───────────────────────────────────────────────────
console.log('\n📦  Building SSR bundle…');
await build({
  configFile: path.resolve(__dirname, 'vite.config.ts'),
  mode: 'production',
  logLevel: 'warn',
  build: {
    ssr: path.resolve(__dirname, 'entry-server.tsx'),
    outDir: path.resolve(__dirname, 'dist-ssr'),
    emptyOutDir: true,
    rollupOptions: {
      output: { format: 'es' },
    },
  },
});
console.log('   ✓ SSR bundle ready\n');

// ── 2. Load template and SSR renderer ────────────────────────────────────────
const templatePath = path.resolve(__dirname, 'dist/index.html');
if (!fs.existsSync(templatePath)) {
  throw new Error(
    'dist/index.html not found — run `vite build` before `node prerender.mjs`',
  );
}
const template = fs.readFileSync(templatePath, 'utf-8');

const ssrEntry = path.resolve(__dirname, 'dist-ssr/entry-server.js');
const { render } = await import(ssrEntry);

// ── Helper: strip inline head tags that React 19 renders into the body ────────
// React 19's Document Metadata API renders <title>/<meta>/<link> inline.
// We remove them from the body HTML and inject the correct values into <head>.
function stripInlineHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s[^>]*name="description"[^>]*\/?>/gi, '')
    .replace(/<link\s[^>]*rel="canonical"[^>]*\/?>/gi, '');
}

// ── 3. Pre-render each route ──────────────────────────────────────────────────
console.log('🖨️   Pre-rendering routes…');
for (const [route, meta] of Object.entries(ROUTE_META)) {
  const rawHtml = render(route);
  const bodyHtml = stripInlineHeadTags(rawHtml);

  // Escape special chars for safe injection into HTML attributes
  const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  let page = template;

  // Replace <title> in <head>
  page = page.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${meta.title.replace(/&/g, '&amp;')}</title>`,
  );

  // Replace <meta name="description"> in <head>
  page = page.replace(
    /<meta\s+name="description"[^>]*\/?>/i,
    `<meta name="description" content="${escAttr(meta.description)}">`,
  );

  // Replace <link rel="canonical"> in <head>
  page = page.replace(
    /<link\s+rel="canonical"[^>]*\/?>/i,
    `<link rel="canonical" href="${escAttr(meta.canonical)}">`,
  );

  // Inject rendered body HTML into the root div (no inline head tags)
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyHtml}</div>`,
  );

  // Write output file
  const outDir =
    route === '/'
      ? path.resolve(__dirname, 'dist')
      : path.resolve(__dirname, 'dist', route.slice(1));

  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, page);
  console.log(`   ✓ dist${route === '/' ? '/index.html' : route + '/index.html'}`);
}

// ── 4. Generate sitemap.xml ───────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];
const urlEntries = Object.entries(ROUTE_META)
  .map(
    ([r, { priority, changefreq }]) =>
      `  <url>\n    <loc>https://www.rydnepal.com${r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap);
console.log('\n   ✓ dist/sitemap.xml');

// ── 5. Clean up ───────────────────────────────────────────────────────────────
fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true, force: true });
console.log('\n✅  Pre-render complete!\n');
