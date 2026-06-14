import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Clock, ArrowRight, Calendar } from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

export interface BlogPostMeta {
  slug: string;
  title: string;
  titleNe: string;
  excerpt: string;
  excerptNe: string;
  date: string;
  dateNe: string;
  readTime: string;
  readTimeNe: string;
  tag: string;
  tagNe: string;
  /** Path under /og/ used for the listing thumbnail and the social card */
  cover: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'bike-rental-kathmandu-uber-pathao-indrive',
    title: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive: Rent from Rs. 700/Day',
    titleNe: 'काठमाडौंमा बाइक भाडामा, उबर, पाठाओ र इनड्राइभका लागि: दिनको रु. ७०० देखि',
    excerpt:
      'Uber has officially launched in Kathmandu with Uber Bike. Four platforms now compete for riders. Rent a Hero Super Splendor 125cc from Rs. 700/day with zero down payment and earn on Uber, Pathao, InDrive, Yango and Tootle the same day.',
    excerptNe:
      'उबर अब काठमाडौंमा उबर बाइक सहित आइसक्यो। अब चार प्लेटफर्मले राइडर खोज्दैछन्। दिनको रु. ७०० मा हिरो सुपर स्प्लेन्डर 125cc भाडामा लिएर उबर, पाठाओ, इनड्राइभ, यांगो र टुटलमा आजै कमाउनुहोस्।',
    date: 'June 14, 2026',
    dateNe: '२०२६ जुन १४',
    readTime: '8 min read',
    readTimeNe: '८ मिनेट पठन',
    tag: 'Ride-Sharing & Earnings',
    tagNe: 'राइड-सेयरिङ र कमाइ',
    cover: '/og/bike-rental-uber-pathao.webp',
  },
  {
    slug: 'gig-economy-kathmandu-bike-rental',
    title: 'The Gig Economy in Kathmandu: Work Today, Get Paid Today',
    titleNe: 'काठमाडौंमा गिग इकोनोमीको उदय: आजै काम, आजै पैसा',
    excerpt:
      'Ride-sharing is now formally recognised in the latest national budget. Here is how Kathmandu riders earn daily payouts in 2026 and how to start with zero investment, even without owning a bike.',
    excerptNe:
      'पछिल्लो राष्ट्रिय बजेटले राइड-सेयरिङलाई औपचारिक मान्यता दिएको छ। काठमाडौंका राइडरहरूले २०२६ मा कसरी दैनिक कमाउँछन् र बाइक नभए पनि शून्य लगानीमा कसरी सुरु गर्ने।',
    date: 'May 31, 2026',
    dateNe: '२०२६ मे ३१',
    readTime: '9 min read',
    readTimeNe: '९ मिनेट पठन',
    tag: 'Gig Economy & Earnings',
    tagNe: 'गिग इकोनोमी र कमाइ',
    cover: '/og/gig-economy-kathmandu.jpg',
  },
  {
    slug: 'why-ryd-nepal-best-bike-rental-kathmandu',
    title: 'Why RYD Nepal Is the Bike Rental Near You in Kathmandu That Riders Actually Trust',
    titleNe: 'किन RYD Nepal काठमाडौंको सबैभन्दा भरपर्दो बाइक भाडा सेवा हो',
    excerpt:
      'Free bi-weekly maintenance, well-maintained Hero Super Splendor bikes, 30-minute breakdown response, and 24/7 flat-tire help across Kathmandu — exactly what makes us different.',
    excerptNe:
      'निःशुल्क हरेक २ हप्ताको सर्भिस, राम्ररी मर्मत गरिएको हिरो सुपर स्प्लेन्डर, ३० मिनेटमा ब्रेकडाउन सहायता र काठमाडौंभरि २४/७ फ्ल्याट टायर सहायता।',
    date: 'May 17, 2026',
    dateNe: '२०२६ मे १७',
    readTime: '10 min read',
    readTimeNe: '१० मिनेट पठन',
    tag: 'Service & Maintenance',
    tagNe: 'सेवा र मर्मत',
    cover: '/og/why-ryd-nepal.jpg',
  },
  {
    slug: 'rent-to-own-hero-splendor-125',
    title: 'Why Paying Rs. 1,000/Day to Rent-to-Own a Bike Makes Financial Sense',
    titleNe: 'किन दिनको रु. १,००० तिरेर बाइक आफ्नो बनाउन आर्थिक रूपमा सम्भव छ',
    excerpt:
      'A complete, data-driven financial breakdown for Kathmandu gig riders. Every rupee accounted for — rent, fuel, earnings, and bike ownership after 1.5 years.',
    excerptNe:
      'काठमाडौंका गिग राइडरहरूको लागि पूर्ण आर्थिक विश्लेषण। भाडा, इन्धन, आम्दानी र १.५ वर्षपछि बाइक स्वामित्व — हरेक रुपैयाँको हिसाब।',
    date: 'April 5, 2026',
    dateNe: 'चैत्र २२, २०८२',
    readTime: '12 min read',
    readTimeNe: '१२ मिनेट पठन',
    tag: 'Financial Analysis',
    tagNe: 'आर्थिक विश्लेषण',
    cover: '/og/rent-to-own-splendor.jpg',
  },
];

const BlogIndex: React.FC = () => {
  useSEO({
    title: 'Blog — Bike Rental Tips, Guides & Rider Stories | RYD Nepal',
    description:
      'Read RYD Nepal\'s blog for financial guides, rider tips, and news about motorcycle rental, gig economy earnings, and rent-to-own bikes in Kathmandu.',
    keywords:
      'RYD Nepal blog, bike rental guide Kathmandu, gig rider tips Nepal, motorcycle rental Nepal, rent to own bike blog',
    path: '/blog',
    ogTitle: 'Honest Guides for Kathmandu Gig Riders — RYD Nepal Blog',
    ogDescription: 'Real numbers from 500+ active riders. Financial breakdowns, maintenance tips, and the truth about earning on Pathao, InDrive, Yango and Tootle.',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'RYD Nepal Blog',
        url: 'https://www.rydnepal.com/blog',
        description:
          'Financial guides, rider tips, and news about motorcycle rental and gig economy in Kathmandu.',
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://www.rydnepal.com',
        },
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>RYD Nepal Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Rider Guides &amp; <span className="text-primary">Financial Tips</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Real numbers, honest advice, and actionable guides for Kathmandu gig riders.
          </p>
        </div>
      </section>

      {/* Post listing */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[1200/630] overflow-hidden bg-slate-100">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3 items-center mb-4 text-xs font-semibold">
                  <span className="bg-primary-50 text-primary px-3 py-1 rounded-full">{post.tag}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-2">{post.excerpt}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{post.excerptNe}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;
