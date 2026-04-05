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
}

export const BLOG_POSTS: BlogPostMeta[] = [
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
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'Blog', url: 'https://rydnepal.com/blog' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'RYD Nepal Blog',
        url: 'https://rydnepal.com/blog',
        description:
          'Financial guides, rider tips, and news about motorcycle rental and gig economy in Kathmandu.',
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://rydnepal.com',
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
