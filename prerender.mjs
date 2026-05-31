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
// Per-route fields:
//   title, description, canonical, priority, changefreq → SERP + sitemap
//   ogTitle, ogDescription, ogImage                     → Facebook / LinkedIn / WhatsApp cards
//   ogType                                              → "website" for pages, "article" for blog posts
//   datePublished, dateModified                         → required for article-type OG cards
//
// Branded 1200×630 social cards live in public/og/. Each blog post has its own
// hook-line image; non-blog pages fall back to the RYD workshop shot which
// shows the real fleet and signage — strongest brand asset we have.
const DEFAULT_OG_IMAGE = 'https://www.rydnepal.com/og/why-ryd-nepal.jpg';

const ROUTE_META = {
  '/': {
    title: 'RYD Nepal | Rent a Bike in Kathmandu — Earn Rs. 40k–60k/Month',
    description: 'Rent a Hero Super Splendor 125cc motorcycle in Kathmandu from Rs. 700/day. Earn Rs. 40,000–60,000/month on Pathao, InDrive, Yango & Tootle. No loan, no down payment, own the bike after 1.5 years.',
    canonical: 'https://www.rydnepal.com/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: '2026-05-31',
    ogTitle: 'Rent a Bike in Kathmandu. Earn Rs. 40k–60k/Month on Pathao & InDrive.',
    ogDescription: 'Zero down payment. Free maintenance. Own the bike after 1.5 years. RYD Nepal is how thousands of Kathmandu riders earn daily on Pathao, InDrive, Yango and Tootle.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/about': {
    title: "About RYD Nepal — Kathmandu's Largest Bike Rental Fleet",
    description: 'RYD Nepal Pvt. Ltd. empowers gig workers in Kathmandu with affordable Hero Super Splendor 125cc motorcycle rentals. 500+ active riders, dedicated Kapan workshop, rent-to-own program.',
    canonical: 'https://www.rydnepal.com/about',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: '2026-05-17',
    ogTitle: '500+ Riders. 120+ Bikes. One Mission: Earnings for Every Kathmandu Hustler.',
    ogDescription: 'RYD Nepal is built by riders, for riders. Free workshop in Kapan, rent-to-own in 1.5 years, and the only fleet that puts gig workers first.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/services': {
    title: 'Bike Rental Plans — Weekly, Monthly & Rent-to-Own | RYD Nepal',
    description: 'Rent a Hero Super Splendor 125cc in Kathmandu: Weekly Rs. 5,600/week, Pro Monthly Rs. 7,000/week, Prepayment Rs. 21,000/month. Includes free maintenance, insurance, and rent-to-own after 1.5 years.',
    canonical: 'https://www.rydnepal.com/services',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-05-17',
    ogTitle: 'Rs. 700/Day. Hero Splendor 125cc. Yours After 18 Months.',
    ogDescription: 'Weekly, monthly, or prepaid bike rental in Kathmandu. Maintenance included. No bank loan. No credit check. Walk in with a licence, ride out the same day.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact RYD Nepal — Apply to Rent a Bike in Kathmandu',
    description: 'Apply to rent a motorcycle in Kathmandu. Fill out our quick form or call +977-9709197877. Office at Dhalane Pul, Kapan, Kathmandu. Get started with Pathao, InDrive, Yango or Tootle today.',
    canonical: 'https://www.rydnepal.com/contact',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: '2026-05-17',
    ogTitle: 'Ready to Ride? Apply in 2 Minutes — RYD Nepal, Kapan, Kathmandu.',
    ogDescription: 'Call +977-9709197877 or walk into our Dhalane Pul office with your licence and citizenship. Start earning on Pathao, InDrive, Yango or Tootle today.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/support': {
    title: 'Rider Support & FAQ — RYD Nepal',
    description: '24/7 breakdown assistance, workshop at Kapan, and answers to all your questions about renting a bike with RYD Nepal. Get support via WhatsApp or call us anytime.',
    canonical: 'https://www.rydnepal.com/support',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: '2026-05-17',
    ogTitle: '24/7 Rider Support. 30-Minute Breakdown Response Across Kathmandu.',
    ogDescription: 'Flat tire on Ring Road at 10 PM? We dispatch help in 30 minutes. Every answer about rentals, paperwork, insurance, and workshop hours is here.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/blog': {
    title: 'RYD Nepal Blog — Bike Rental Guides & Rider Stories from Kathmandu',
    description: 'Real-world guides for Kathmandu gig riders: financial breakdowns, maintenance tips, and honest answers about renting a bike for Pathao, InDrive, Yango and Tootle.',
    canonical: 'https://www.rydnepal.com/blog',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: '2026-05-31',
    ogTitle: 'Honest Guides for Kathmandu Gig Riders — RYD Nepal Blog',
    ogDescription: 'Real numbers from 500+ active riders. Financial breakdowns, maintenance tips, and the truth about earning on Pathao, InDrive, Yango and Tootle.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  },
  '/blog/rent-to-own-hero-splendor-125': {
    title: 'Why Rent-to-Own a Hero Splendor 125 Makes Sense | RYD Nepal Blog',
    description: 'A data-driven breakdown of why paying Rs. 1,000/day to rent-to-own a Hero Super Splendor 125cc is smarter than a bank loan in Kathmandu. Real numbers for Pathao and InDrive riders.',
    canonical: 'https://www.rydnepal.com/blog/rent-to-own-hero-splendor-125',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-04-05',
    ogTitle: 'Rs. 1,000/Day → Bike Worth Rs. 2.66 Lakh After 18 Months. The Maths.',
    ogDescription: 'Every rupee accounted for: rent, fuel, real Pathao earnings, and bike ownership at the end. The full financial breakdown for Kathmandu gig riders.',
    ogImage: 'https://www.rydnepal.com/og/rent-to-own-splendor.jpg',
    ogType: 'article',
    datePublished: '2026-04-05',
    dateModified: '2026-04-05',
  },
  '/blog/why-ryd-nepal-best-bike-rental-kathmandu': {
    title: 'Why RYD Nepal Is Kathmandu’s Most Reliable Bike Rental Near You',
    description: 'Free bi-weekly maintenance, well-maintained bikes, 30-minute breakdown response, and 24/7 flat-tire help in Kathmandu. Here is why RYD Nepal is the bike rental near you that gig riders actually trust.',
    canonical: 'https://www.rydnepal.com/blog/why-ryd-nepal-best-bike-rental-kathmandu',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-05-17',
    ogTitle: 'Why 500+ Kathmandu Riders Trust RYD Over Every Other Bike Rental',
    ogDescription: 'Free service every 2 weeks. 30-minute flat-tire response inside Ring Road. Replacement bike if yours is down. Read what makes RYD different.',
    ogImage: 'https://www.rydnepal.com/og/why-ryd-nepal.jpg',
    ogType: 'article',
    datePublished: '2026-05-17',
    dateModified: '2026-05-17',
  },
  '/blog/gig-economy-kathmandu-bike-rental': {
    title: 'Work Today, Get Paid Today: Kathmandu’s Gig Economy Boom 2026 | RYD Nepal',
    description: 'Ride-sharing is now formally recognised in Nepal’s latest national budget. Here is how Kathmandu riders earn daily payouts in 2026 and how to start with zero investment, even without a bike.',
    canonical: 'https://www.rydnepal.com/blog/gig-economy-kathmandu-bike-rental',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-05-31',
    ogTitle: 'Work Today, Get Paid Today: Kathmandu’s Gig Economy in 2026',
    ogDescription: 'Ride-sharing is now legally backed in Nepal’s new budget. Earn Rs. 1,800–3,500/day on Pathao, InDrive, Yango or Tootle. Rent a bike for Rs. 700/day. Zero loan.',
    ogImage: 'https://www.rydnepal.com/og/gig-economy-kathmandu.jpg',
    ogType: 'article',
    datePublished: '2026-05-31',
    dateModified: '2026-05-31',
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

  // Replace <meta property="og:url"> — template hard-codes it to the homepage,
  // so without this every page advertised "/" as its Open Graph URL.
  page = page.replace(
    /<meta\s+property="og:url"[^>]*\/?>/i,
    `<meta property="og:url" content="${escAttr(meta.canonical)}">`,
  );

  // ── Per-route social card rewrites (Facebook / LinkedIn / WhatsApp / Twitter)
  // Without these, every blog post shows the homepage card when shared.
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  const ogImage = meta.ogImage;
  const ogType = meta.ogType || 'website';

  page = page.replace(
    /<meta\s+property="og:type"[^>]*\/?>/i,
    `<meta property="og:type" content="${escAttr(ogType)}">`,
  );
  page = page.replace(
    /<meta\s+property="og:title"[^>]*\/?>/i,
    `<meta property="og:title" content="${escAttr(ogTitle)}">`,
  );
  page = page.replace(
    /<meta\s+property="og:description"[^>]*\/?>/i,
    `<meta property="og:description" content="${escAttr(ogDescription)}">`,
  );
  if (ogImage) {
    page = page.replace(
      /<meta\s+property="og:image"[^>]*\/?>/i,
      `<meta property="og:image" content="${escAttr(ogImage)}">`,
    );
  }

  // Twitter card — large image preview on twitter.com and x.com
  page = page.replace(
    /<meta\s+name="twitter:title"[^>]*\/?>/i,
    `<meta name="twitter:title" content="${escAttr(ogTitle)}">`,
  );
  page = page.replace(
    /<meta\s+name="twitter:description"[^>]*\/?>/i,
    `<meta name="twitter:description" content="${escAttr(ogDescription)}">`,
  );
  if (ogImage) {
    page = page.replace(
      /<meta\s+name="twitter:image"[^>]*\/?>/i,
      `<meta name="twitter:image" content="${escAttr(ogImage)}">`,
    );
  }

  // Article-only tags — published / modified timestamps for OG article cards.
  // We insert them just before </head> so they only appear on blog posts.
  if (ogType === 'article' && meta.datePublished) {
    const articleTags =
      `    <meta property="article:published_time" content="${escAttr(meta.datePublished)}">\n` +
      `    <meta property="article:modified_time" content="${escAttr(meta.dateModified || meta.datePublished)}">\n` +
      `    <meta property="article:author" content="RYD Nepal Pvt. Ltd.">\n` +
      `    <meta property="article:section" content="Blog">\n`;
    page = page.replace('</head>', `${articleTags}  </head>`);
  }

  // Point every hreflang alternate at this route. The template hard-codes them
  // all to the homepage, which wrongly tells Google each page is "/".
  page = page.replace(
    /(<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href=")[^"]+("[^>]*>)/gi,
    `$1${escAttr(meta.canonical)}$2`,
  );

  // Inject rendered body HTML into the root div (no inline head tags)
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyHtml}</div>`,
  );

  // Write output as a FLAT .html file: dist/about.html — never dist/about/index.html.
  // Cloudflare Pages serves a flat .html at its clean URL with NO trailing slash
  // (/about → 200) and 308-redirects /about/ → /about. A directory-based
  // index.html does the reverse (/about → 308 → /about/), which made every
  // canonical URL in sitemap.xml resolve to a redirect — the Search Console error.
  const outFile =
    route === '/'
      ? path.resolve(__dirname, 'dist/index.html')
      : path.resolve(__dirname, 'dist', route.slice(1) + '.html');

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
}

// ── 4. Generate sitemap.xml ───────────────────────────────────────────────────
// Use per-route `lastmod` from ROUTE_META when defined. Falling back to today's
// date for every URL (the old behavior) tells Google that unchanged content was
// modified on every deploy, which can dampen ranking signals.
const today = new Date().toISOString().split('T')[0];
const urlEntries = Object.entries(ROUTE_META)
  .map(
    ([r, { priority, changefreq, lastmod }]) =>
      `  <url>\n    <loc>https://www.rydnepal.com${r}</loc>\n    <lastmod>${lastmod || today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap);
console.log('\n   ✓ dist/sitemap.xml');

// ── 5. Clean up ───────────────────────────────────────────────────────────────
fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true, force: true });
console.log('\n✅  Pre-render complete!\n');
