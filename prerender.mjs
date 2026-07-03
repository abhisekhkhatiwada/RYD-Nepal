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
const SITE = 'https://www.rydnepal.com';

// BreadcrumbList builder — emits the trail Google shows in place of the raw URL.
const crumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

// FAQPage builder — eligible for the expandable FAQ rich result under the listing.
const faq = (qa) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const blogPosting = ({ headline, description, url, image, datePublished, dateModified }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline,
  description,
  image,
  mainEntityOfPage: url,
  author: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: SITE },
  publisher: {
    '@type': 'Organization',
    name: 'RYD Nepal Pvt. Ltd.',
    url: SITE,
    logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
  },
  datePublished,
  dateModified: dateModified || datePublished,
});

const ROUTE_META = {
  '/': {
    title: 'Bike Rental in Kathmandu — Rent from Rs. 700/Day | RYD Nepal',
    description: 'Bike rental in Kathmandu made simple. Rent a Hero Super Splendor 125cc from Rs. 700/day — no loan, no down payment. Earn Rs. 40,000–60,000/month on Pathao, InDrive, Yango & Tootle and own the bike after 1.5 years.',
    canonical: 'https://www.rydnepal.com/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: '2026-07-01',
    ogTitle: 'Rent a Bike in Kathmandu. Earn Rs. 40k–60k/Month on Pathao & InDrive.',
    ogDescription: 'Zero down payment. Free maintenance. Own the bike after 1.5 years. RYD Nepal is how thousands of Kathmandu riders earn daily on Pathao, InDrive, Yango and Tootle.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      crumb([{ name: 'Home', url: `${SITE}/` }]),
    ],
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'About', url: `${SITE}/about` },
      ]),
    ],
  },
 '/prize': {
    title: 'Prize Details — FIFA World Cup 2026 Giveaway | RYD Nepal',
    description:
      'Prize details for the RYD Nepal FIFA World Cup 2026 Giveaway. Explore the rewards, winner information, and prize distribution details.',
    canonical: 'https://www.rydnepal.com/prize',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: '2026-07-03',
    ogTitle: 'Prize Details — RYD Nepal FIFA World Cup 2026 Giveaway',
    ogDescription:
      'Discover the prizes for the RYD Nepal FIFA World Cup 2026 Giveaway. Full prize details and winner information will be available soon.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Prize Details', url: `${SITE}/prize` },
      ]),
    ],
  },
  '/services': {
    title: 'Bike Rent in Kathmandu — Price Per Day, Week & Month | RYD Nepal',
    description: 'Bike rent in Kathmandu price list: Hero Super Splendor 125cc from Rs. 700/day, Rs. 5,600/week or Rs. 21,000/month — free maintenance, insurance & rent-to-own after 1.5 years. Transparent bike rental pricing for Pathao, InDrive, Yango & Tootle riders.',
    canonical: 'https://www.rydnepal.com/services',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-06-11',
    ogTitle: 'Rs. 700/Day. Hero Splendor 125cc. Yours After 18 Months.',
    ogDescription: 'Weekly, monthly, or prepaid bike rental in Kathmandu. Maintenance included. No bank loan. No credit check. Walk in with a licence, ride out the same day.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Bike Rental Plans', url: `${SITE}/services` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Hero Super Splendor 125cc — Bike Rent in Kathmandu',
        description:
          'Bike rent in Kathmandu on a Hero Super Splendor 125cc from Rs. 700/day (Rs. 21,000/month prepaid), Rs. 5,600/week, or Rs. 7,000/week on the rent-to-own Pro plan. Free maintenance, insurance guidance and 24/7 breakdown support included.',
        brand: { '@type': 'Brand', name: 'Hero' },
        image: DEFAULT_OG_IMAGE,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '500',
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'NPR',
          lowPrice: '700',
          highPrice: '21000',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
          url: `${SITE}/services`,
        },
      },
      faq([
        [
          'How much does it cost to rent a bike in Kathmandu per day?',
          'At RYD Nepal a Hero Super Splendor 125cc costs from Rs. 700/day on the prepaid monthly plan (Rs. 21,000/month). Weekly rental is Rs. 5,600/week and the rent-to-own Pro plan is Rs. 7,000/week. Free maintenance, insurance guidance and 24/7 breakdown support are included in every plan.',
        ],
        [
          'What is the cheapest bike rent in Kathmandu with price?',
          'The cheapest option is the prepaid monthly plan at Rs. 21,000/month, which works out to just Rs. 700/day — Rs. 100/day cheaper than paying weekly. There are no hidden charges; maintenance, insurance support and roadside help are all included.',
        ],
        [
          'What documents do I need to rent a bike in Kathmandu?',
          'You need a valid Nepali driving licence and a citizenship copy. Bring them to our Kapan office (Dhalane Pul) or apply online — verification takes under 30 minutes and you can ride out the same day.',
        ],
        [
          'Is there a deposit to rent a motorcycle from RYD Nepal?',
          'Requirements are kept minimal so gig riders can start earning fast. Contact us at +977-9709197877 for the current deposit and document details for your chosen plan.',
        ],
        [
          'Can I own the bike after renting?',
          'Yes. On the Pro Monthly rent-to-own plan, the Hero Super Splendor 125cc is legally transferred to you after 1.5 years of continuous rental — with no bank loan, no interest and no credit check.',
        ],
      ]),
    ],
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Contact', url: `${SITE}/contact` },
      ]),
    ],
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Support', url: `${SITE}/support` },
      ]),
      faq([
        [
          'What areas in Kathmandu does RYD Nepal cover for breakdown support?',
          'We provide 24/7 breakdown and flat-tire assistance across the entire Kathmandu Valley, with a typical 30-minute response time inside the Ring Road from our Kapan workshop near Dhalane Bridge.',
        ],
        [
          'How often is the bike serviced and who pays for it?',
          'Every rental includes free servicing every 1,500 km (oil change, brake check, tire inspection and parts replacement) at our Kapan workshop. The rider pays nothing for routine maintenance.',
        ],
        [
          'How do I contact RYD Nepal for support?',
          'Call or WhatsApp +977-9709197877 any time, or visit our office at Dhalane Pul, Kapan, Kathmandu. Support is available 24/7 for breakdowns.',
        ],
      ]),
    ],
  },
  '/blog': {
    title: 'RYD Nepal Blog — Bike Rental Guides & Rider Stories from Kathmandu',
    description: 'Real-world guides for Kathmandu gig riders: financial breakdowns, maintenance tips, and honest answers about renting a bike for Pathao, InDrive, Yango and Tootle.',
    canonical: 'https://www.rydnepal.com/blog',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: '2026-07-01',
    ogTitle: 'Honest Guides for Kathmandu Gig Riders — RYD Nepal Blog',
    ogDescription: 'Real numbers from 500+ active riders. Financial breakdowns, maintenance tips, and the truth about earning on Pathao, InDrive, Yango and Tootle.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'RYD Nepal Blog',
        url: `${SITE}/blog`,
        description:
          'Financial guides, rider tips, and news about motorcycle rental and gig economy in Kathmandu.',
        publisher: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: SITE },
      },
    ],
  },
  '/blog/ryd-predict-win-fifa-world-cup-2026': {
    // DRAFT: page renders at its URL but gets noindex/nofollow and is excluded
    // from sitemap.xml. Flip to false (or delete the flag) to publish — and
    // also unset `hidden` on the matching BLOG_POSTS entry in BlogIndex.tsx.
    // draft: true,
    title: 'RYD Predict & Win: FIFA World Cup 2026 Giveaway — Win Up to Rs. 20,000',
    description: 'Predict FIFA World Cup 2026 knockout results with RYD Nepal and win cash: 2 winners per match (Rs. 500–3,000 each) plus a Rs. 20,000 bumper prize for predicting all 7 big results. Free entry — like, share, tag 2 friends.',
    canonical: 'https://www.rydnepal.com/blog/ryd-predict-win-fifa-world-cup-2026',
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: '2026-07-01',
    ogTitle: 'Predict the World Cup. Win Up to Rs. 20,000 Cash. Free Entry.',
    ogDescription: 'RYD Nepal\'s FIFA World Cup 2026 Predict & Win: 2 cash winners on every knockout match post, and Rs. 20,000 for predicting all 7 big results. Like, share, tag 2 friends.',
    ogImage: 'https://www.rydnepal.com/og/predict-win-worldcup.jpg',
    ogType: 'article',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'RYD Predict & Win: FIFA World Cup 2026 Giveaway', url: `${SITE}/blog/ryd-predict-win-fifa-world-cup-2026` },
      ]),
      blogPosting({
        headline: 'RYD Predict & Win: FIFA World Cup 2026 Giveaway — Win Up to Rs. 20,000',
        description:
          'RYD Nepal\'s FIFA World Cup 2026 Predict & Win giveaway: 2 cash winners per knockout match (Rs. 500 to 3,000 each) and a Rs. 20,000 bumper prize for predicting all 4 quarter-finals, both semi-finals and the final correctly. Free entry via Facebook, Instagram, and TikTok.',
        url: `${SITE}/blog/ryd-predict-win-fifa-world-cup-2026`,
        image: `${SITE}/og/predict-win-worldcup.jpg`,
        datePublished: '2026-07-01',
      }),
      faq([
        ['How do I participate in the RYD Predict & Win giveaway?', 'Three steps: like the RYD Nepal page, share the match prediction post, and tag 2 friends in the comment with your prediction. An individual prediction post goes live on our Facebook, Instagram, and TikTok pages as soon as each match is fixed.'],
        ['Is the giveaway free to enter?', 'Yes, completely free. You do not need to rent a bike or pay anything — just like, share, tag, and predict.'],
        ['How are the winners chosen for each match?', 'For every prediction post, 2 lucky winners are drawn from everyone who predicted the result correctly and completed all three steps. Round of 16 winners get Rs. 500 each, quarter-final winners Rs. 1,000 each, semi-final winners Rs. 2,000 each, and final winners Rs. 3,000 each.'],
        ['How do I win the Rs. 20,000 bumper prize?', 'Correctly predict all 7 big knockout results — the 4 quarter-finals, both semi-finals, and the final. If more than one participant gets all 7 right, the bumper winner is chosen by lucky draw among them.'],
        ['Where will the prediction posts and winner announcements appear?', 'On RYD Nepal\'s official Facebook, Instagram, and TikTok pages. Follow all three so you never miss a match post — each one goes live as soon as the fixture is confirmed.'],
        ['Who can participate in the giveaway?', 'Anyone in Nepal with a Facebook, Instagram, or TikTok account. You do not need to be an RYD rider.'],
      ]),
    ],
  },
  '/blog/how-to-become-pathao-rider-without-bike': {
    title: 'How to Become a Pathao Rider in Nepal Without a Bike (2026)',
    description: 'Become a Pathao rider in Nepal without owning a bike. Rent from Rs. 700/day at RYD Nepal, register on the Pathao app in 24 hours, and earn Rs. 40,000 to 60,000/month.',
    canonical: 'https://www.rydnepal.com/blog/how-to-become-pathao-rider-without-bike',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-07-01',
    ogTitle: 'No Bike? No Problem. Become a Pathao Rider This Week.',
    ogDescription: 'The complete 2026 path: rent a Hero Super Splendor from Rs. 700/day, register on Pathao in 24 hours, and start earning — no loan, no down payment, no credit check.',
    ogImage: 'https://www.rydnepal.com/og/become-pathao-rider.jpg',
    ogType: 'article',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'How to Become a Pathao Rider Without Owning a Bike', url: `${SITE}/blog/how-to-become-pathao-rider-without-bike` },
      ]),
      blogPosting({
        headline: 'How to Become a Pathao Rider in Nepal Without Owning a Bike (2026 Guide)',
        description:
          'Step-by-step 2026 guide to becoming a Pathao rider in Nepal without owning a bike: licence requirements, renting from Rs. 700/day, Pathao app registration, onboarding fee, and realistic daily earnings.',
        url: `${SITE}/blog/how-to-become-pathao-rider-without-bike`,
        image: `${SITE}/og/become-pathao-rider.jpg`,
        datePublished: '2026-07-01',
      }),
      faq([
        ['Can I use a rented bike for Pathao in Nepal?', 'Yes. Pathao verifies the bike\'s bluebook and registration papers, not who owns it. RYD Nepal provides all the bike documents you need for Pathao registration, so a rented bike works exactly like an owned one.'],
        ['How much is the Pathao onboarding fee in Nepal?', 'Around Rs. 2,500, paid once during registration. It is non-refundable, so make sure your license and bike documents are ready before you pay.'],
        ['How long does Pathao verification take?', 'Pathao usually reviews your documents within about 24 hours. After approval, you complete a short in-app training module and quiz, then you can go online and start earning.'],
        ['Do I need a professional driving license for Pathao?', 'No. A valid Nepali motorcycle license (category A) is enough for bike rides and deliveries. It can be professional or non-professional.'],
        ['How much can a Pathao rider earn per day in Kathmandu?', 'Full-time riders in Kathmandu typically gross Rs. 1,500 to 2,500 per day. After Pathao\'s commission (around 20%), fuel, and Rs. 700/day bike rent, most active RYD Nepal riders net roughly Rs. 700 to 1,700 per day.'],
        ['What if the bike breaks down during a Pathao delivery?', 'RYD Nepal runs 24/7 breakdown and flat-tire assistance across Kathmandu Valley and dispatches a replacement bike within 30 minutes, so you keep earning instead of losing the day.'],
        ['What documents do I need to rent a bike from RYD Nepal for Pathao?', 'Just your driving license and citizenship copy. There is no down payment, no bank loan, and no credit check, and you can collect the bike the same day from our Kapan office (Dhalane Pul).'],
        ['Will the rented bike ever become mine?', 'Yes. On the Pro Monthly rent-to-own plan (Rs. 7,000/week), the Hero Super Splendor 125cc becomes yours after 1.5 years of rental payments, with zero down payment.'],
      ]),
    ],
  },
  '/blog/pathao-vs-indrive-vs-yango-rider-earnings': {
    title: 'Pathao vs InDrive vs Yango: Which Pays Kathmandu Riders More in 2026?',
    description: 'Pathao takes ~20% commission, InDrive ~10%, Yango just ~3%. Real 2026 earnings comparison for Kathmandu riders — and why smart riders run all three apps.',
    canonical: 'https://www.rydnepal.com/blog/pathao-vs-indrive-vs-yango-rider-earnings',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-07-01',
    ogTitle: 'Pathao ~20%. InDrive ~10%. Yango ~3%. Same Bike, Very Different Take-Home.',
    ogDescription: 'The commission, demand and real daily-earnings comparison for Kathmandu riders in 2026 — and why the smartest riders run all three apps on one rented bike.',
    ogImage: 'https://www.rydnepal.com/og/pathao-indrive-yango.jpg',
    ogType: 'article',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'Pathao vs InDrive vs Yango: Which Pays Riders More?', url: `${SITE}/blog/pathao-vs-indrive-vs-yango-rider-earnings` },
      ]),
      blogPosting({
        headline: 'Pathao vs InDrive vs Yango: Which Pays Kathmandu Riders More in 2026?',
        description:
          'Commission rates, demand and realistic daily earnings compared across Pathao (~20%), InDrive (~10%) and Yango (~3%) for Kathmandu riders in 2026, plus the multi-apping strategy that maximises take-home.',
        url: `${SITE}/blog/pathao-vs-indrive-vs-yango-rider-earnings`,
        image: `${SITE}/og/pathao-indrive-yango.jpg`,
        datePublished: '2026-07-01',
      }),
      faq([
        ['Can I ride for Pathao and InDrive at the same time?', 'Yes. Multi-apping is common and allowed in Kathmandu. Most full-time riders keep Pathao, InDrive, and Yango installed on one phone and accept whichever request pays best. One bike works on all platforms.'],
        ['Which app pays riders more in Nepal: Pathao, InDrive, or Yango?', 'Per ride, Yango leaves the most in your pocket with a reported commission of around 3%, versus around 10% on InDrive and around 20% on Pathao bike rides. But Pathao still has the most ride requests, so most riders earn the most by running two or three apps together.'],
        ['What is the Pathao commission rate in Nepal?', 'Pathao charges around 20% commission on bike ride fares in Nepal. It has also introduced volume-based tiers, where high-volume riders reportedly pay much lower rates, plus daily and weekly quest bonuses on top of fares.'],
        ['Which app is best for beginners in Kathmandu?', 'Start with Pathao. It has the highest demand, so a new rider fills the day with requests quickly. Once you know the city rhythm, add InDrive and Yango — that combination is where earnings jump.'],
        ['Does Yango work with a rented bike?', 'Yes. Yango, like Pathao and InDrive, needs a bike, a driving license, and your documents — not proof that you own the bike. A RYD Nepal rental from Rs. 700/day works on Yango, Pathao, InDrive, Uber Bike, and Tootle.'],
        ['How much can I earn per day riding in Kathmandu?', 'Active full-time riders gross around Rs. 1,500 to 2,500 per day across platforms. After Rs. 700/day bike rent and roughly Rs. 367 in fuel, most RYD Nepal riders net Rs. 700 to 1,700 in daily profit.'],
        ['Do I need to own a bike to sign up for these apps?', 'No. None of the platforms require ownership papers in your name to ride. RYD Nepal rents you a Hero Super Splendor 125cc from Rs. 700/day with zero down payment, free maintenance, and a path to owning the bike after 1.5 years.'],
      ]),
    ],
  },
  '/blog/rent-vs-buy-vs-emi-bike-nepal': {
    title: 'Rent vs Buy vs EMI: Real Cost of a Bike for Pathao in Nepal (2026)',
    description: 'Rent-to-own costs more than a bank EMI on paper. We show the full 18-month math for buying new, buying used, bike EMI and RYD rent-to-own in Nepal, honestly.',
    canonical: 'https://www.rydnepal.com/blog/rent-vs-buy-vs-emi-bike-nepal',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-07-01',
    ogTitle: 'Cash vs Used vs EMI vs Rent-to-Own: The Uncomfortable 18-Month Table.',
    ogDescription: 'Yes, rent-to-own totals more than the sticker price — and we show exactly why riders still choose it. The honest math for every way to get a bike in Kathmandu.',
    ogImage: 'https://www.rydnepal.com/og/rent-vs-buy-emi.jpg',
    ogType: 'article',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'Rent vs Buy vs EMI: The Real Cost of a Bike in Nepal', url: `${SITE}/blog/rent-vs-buy-vs-emi-bike-nepal` },
      ]),
      blogPosting({
        headline: 'Rent vs Buy vs EMI: The Real Cost of Getting a Bike for Pathao in Nepal (2026)',
        description:
          'The honest 18-month comparison of all four ways to get a bike for gig work in Kathmandu: buying new in cash, buying used, bank EMI, and RYD Nepal rent-to-own — every fee and hidden cost included.',
        url: `${SITE}/blog/rent-vs-buy-vs-emi-bike-nepal`,
        image: `${SITE}/og/rent-vs-buy-emi.jpg`,
        datePublished: '2026-07-01',
      }),
      faq([
        ['Is RYD rent-to-own more expensive than buying a bike outright in Nepal?', 'Yes, and we do not hide it. Over 18 months the Pro Monthly plan totals about Rs. 5,46,000, while a new Hero Super Splendor costs around Rs. 2.56 to 2.67 lakh in cash. The difference pays for zero down payment, insurance, all maintenance, a 30-minute replacement bike, and starting to earn from day one without a loan.'],
        ['What is the bike loan interest rate in Nepal in 2026?', 'Promotional schemes advertise rates from around 7.99%, while hire-purchase lenders charge roughly 12 to 16% depending on your down payment. Most schemes require a 30 to 50% down payment plus income documents and often a guarantor.'],
        ['Can a Pathao rider get a bike loan without a salary slip?', 'It is difficult. Banks and finance companies usually ask for income proof, a guarantor, and a large down payment. Gig income without payslips is often rejected. RYD Nepal requires no credit check, no guarantor, and no down payment.'],
        ['How much does a second-hand bike cost in Kathmandu?', 'Listings start around Rs. 42,000, but a reliable commuter bike that can survive daily gig mileage typically costs Rs. 1 to 1.8 lakh, plus ownership transfer (namsari) fees and whatever hidden repairs the seller did not mention.'],
        ['How much does bike ownership transfer (namsari) cost in Nepal?', 'Government transfer fees run roughly Rs. 1,000 to 10,000 depending on the province and vehicle, and agents typically charge around Rs. 1,200 on top. Both buyer and seller must appear at the transport office with the blue book and tax clearance.'],
        ['Do I really own the bike at the end of RYD\'s rent-to-own plan?', 'Yes. On the Pro Monthly plan (Rs. 7,000/week), the Hero Super Splendor 125cc is transferred to your name after 1.5 years of payments. The Weekly and Prepayment plans are pure rentals with no ownership at the end.'],
        ['Which option is cheapest overall: cash, used, EMI, or rent-to-own?', 'On pure rupees, buying new in cash is cheapest if you have around Rs. 2.6 lakh saved. If you have savings plus salary documents, a bank EMI beats rent-to-own in the long run. Rent-to-own wins when you have neither and need a bike earning money this week.'],
      ]),
    ],
  },
  '/blog/bike-rental-kathmandu-uber-pathao-indrive': {
    title: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive: Rent from Rs. 700/Day | RYD Nepal',
    description: 'Uber just launched in Kathmandu with Uber Bike. Rent a bike in Kathmandu from RYD Nepal for Rs. 700/day, no loan, no down payment, and earn Rs. 40,000 to 60,000/month on Uber, Pathao, InDrive & Yango. Own the bike after 1.5 years.',
    canonical: 'https://www.rydnepal.com/blog/bike-rental-kathmandu-uber-pathao-indrive',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-06-14',
    ogTitle: 'Uber Is Live in Kathmandu. Rent a Bike for Rs. 700/Day and Start Earning.',
    ogDescription: 'Uber, Pathao, InDrive and Yango are now competing for riders in Kathmandu. Rent a Hero Super Splendor 125cc from Rs. 700/day, zero down payment, own it after 1.5 years.',
    ogImage: 'https://www.rydnepal.com/og/bike-rental-uber-pathao.webp',
    ogType: 'article',
    datePublished: '2026-06-14',
    dateModified: '2026-06-14',
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive', url: `${SITE}/blog/bike-rental-kathmandu-uber-pathao-indrive` },
      ]),
      blogPosting({
        headline: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive: Rent from Rs. 700/Day',
        description:
          'Uber launched Uber Bike in Kathmandu in June 2026. How to rent a bike in Kathmandu from Rs. 700/day and earn on Uber, Pathao, InDrive, Yango and Tootle with zero investment.',
        url: `${SITE}/blog/bike-rental-kathmandu-uber-pathao-indrive`,
        image: `${SITE}/og/bike-rental-uber-pathao.webp`,
        datePublished: '2026-06-14',
      }),
      faq([
        ['How much does it cost to rent a bike in Kathmandu per day?', 'Bike rental at RYD Nepal starts at Rs. 700/day on the prepayment plan (Rs. 21,000/month). Weekly is Rs. 5,600 and the rent-to-own Pro Monthly plan is Rs. 7,000/week.'],
        ['Can I rent a bike to ride for Uber in Kathmandu?', 'Yes. Uber launched Uber Bike in Kathmandu in June 2026. A RYD Nepal rental works for Uber Bike as well as Pathao, InDrive, Yango, and Tootle. One bike, all platforms.'],
        ['How much does a Pathao rider earn in Nepal?', 'Active Pathao riders in Kathmandu typically earn Rs. 40,000 to 60,000 per month. After Rs. 700/day rent and fuel, most RYD Nepal riders net Rs. 700 to 1,700 in profit per day.'],
        ['Do I need a down payment or a loan?', 'No. There is zero down payment, no bank loan, and no credit check. You pay daily, weekly, or monthly and start earning immediately.'],
        ['Can I rent a bike for food delivery in Kathmandu?', 'Yes. The same rental works for delivery and ride-sharing platforms across Kathmandu Valley.'],
        ['Do you provide flat-tire and breakdown assistance?', 'Yes, 24/7 across Kathmandu Valley, with a replacement bike dispatched within 30 minutes.'],
        ['Will I own the bike?', 'On the Pro Monthly plan, the Hero Super Splendor 125cc is yours after 1.5 years of rental payments.'],
      ]),
    ],
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'Rent-to-Own Hero Splendor 125', url: `${SITE}/blog/rent-to-own-hero-splendor-125` },
      ]),
      blogPosting({
        headline: 'Why Paying Rs. 1,000/Day to Rent-to-Own a Bike Makes Financial Sense',
        description:
          'A data-driven breakdown of why paying Rs. 1,000/day to rent-to-own a Hero Super Splendor 125cc is smarter than a bank loan in Kathmandu. Real numbers for Pathao and InDrive riders.',
        url: `${SITE}/blog/rent-to-own-hero-splendor-125`,
        image: `${SITE}/og/rent-to-own-splendor.jpg`,
        datePublished: '2026-04-05',
      }),
    ],
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'Why RYD Nepal Is the Bike Rental Riders Trust', url: `${SITE}/blog/why-ryd-nepal-best-bike-rental-kathmandu` },
      ]),
      blogPosting({
        headline: 'Why RYD Nepal Is the Bike Rental Near You in Kathmandu That Riders Actually Trust',
        description:
          'Free bi-weekly maintenance, well-maintained bikes, 30-minute breakdown response, and 24/7 flat-tire help in Kathmandu. Here is why RYD Nepal is the bike rental near you that gig riders actually trust.',
        url: `${SITE}/blog/why-ryd-nepal-best-bike-rental-kathmandu`,
        image: `${SITE}/og/why-ryd-nepal.jpg`,
        datePublished: '2026-05-17',
      }),
    ],
  },
  '/blog/gig-economy-kathmandu-bike-rental': {
    title: 'How Much Do Pathao & InDrive Riders Earn in Kathmandu? (2026 Guide)',
    description: 'How much do Pathao, InDrive, Yango and Tootle riders really earn in Kathmandu in 2026? Real daily payout numbers, running costs, and how to start earning with zero investment — even without your own bike.',
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
    jsonLd: [
      crumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: 'How Much Do Pathao & InDrive Riders Earn in Kathmandu?', url: `${SITE}/blog/gig-economy-kathmandu-bike-rental` },
      ]),
      blogPosting({
        headline: 'How Much Do Pathao & InDrive Riders Earn in Kathmandu? (2026 Guide)',
        description:
          'How much do Pathao, InDrive, Yango and Tootle riders really earn in Kathmandu in 2026? Real daily payout numbers, running costs, and how to start earning with zero investment — even without your own bike.',
        url: `${SITE}/blog/gig-economy-kathmandu-bike-rental`,
        image: `${SITE}/og/gig-economy-kathmandu.jpg`,
        datePublished: '2026-05-31',
      }),
    ],
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

  // Draft routes: reachable at their URL, but invisible to search engines.
  if (meta.draft) {
    page = page
      .replace(
        /<meta\s+name="robots"[^>]*\/?>/i,
        '<meta name="robots" content="noindex, nofollow">',
      )
      .replace(
        /<meta\s+name="googlebot"[^>]*\/?>/i,
        '<meta name="googlebot" content="noindex, nofollow">',
      )
      .replace(
        /<meta\s+name="bingbot"[^>]*\/?>/i,
        '<meta name="bingbot" content="noindex, nofollow">',
      );
  }

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

  // Per-route JSON-LD → static HTML. useSEO only injects this client-side after
  // hydration, so crawlers never saw BreadcrumbList / BlogPosting / FAQPage /
  // Product on first crawl. We emit it server-side with id="page-jsonld" so the
  // client hook cleanly replaces (not duplicates) it on hydration.
  if (meta.jsonLd) {
    const schemas = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
    const payload = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
      .replace(/</g, '\\u003c'); // neutralise any "</script>" inside string values
    const ldTag = `    <script type="application/ld+json" id="page-jsonld">${payload}</script>\n`;
    page = page.replace('</head>', `${ldTag}  </head>`);
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
  .filter(([, meta]) => !meta.draft) // draft routes stay out of the sitemap
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
