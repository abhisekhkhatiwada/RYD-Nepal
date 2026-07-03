import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy, Gift, Bell, Sparkles } from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const SEO_TITLE = 'RYD Giveaway Prize Details | RYD Nepal';
const SEO_DESCRIPTION =
  'Prize details for the RYD Nepal FIFA World Cup 2026 Giveaway will be available soon.';

const Prize: React.FC = () => {
  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords:
      'RYD Nepal giveaway prize, FIFA World Cup 2026 prize, RYD Nepal prizes',
    path: '/prize',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Prize Details', url: 'https://www.rydnepal.com/prize' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Prize Details',
        description: SEO_DESCRIPTION,
        url: 'https://www.rydnepal.com/prize',
      },
    ],
  });

  const teasers = [
    {
      icon: Gift,
      title: 'Something Big',
      desc: 'A World Cup-worthy prize is in the works.',
    },
    {
      icon: Bell,
      title: 'Get Notified',
      desc: "Follow along so you don't miss the reveal.",
    },
    {
      icon: Sparkles,
      title: 'Worth the Wait',
      desc: "We're making sure it's one to remember.",
    },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <link rel="canonical" href="https://www.rydnepal.com/prize" />
      </Helmet>

      <section className="relative py-24 md:py-32 min-h-[70vh] flex items-center overflow-hidden bg-slate-50">
        {/* Decorative background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0"
        >
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8 animate-in zoom-in duration-500">
            <Trophy className="w-10 h-10 text-primary" aria-hidden="true" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            FIFA World Cup 2026 Giveaway
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Prize Details
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We're putting the finishing touches on the prize details —
            it'll be worth the wait.
          </p>

          <p className="text-slate-500 mt-3">
            Check back soon, or follow us so you're the first to know.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 font-semibold shadow-lg">
            Coming Soon
          </div>

          {/* Teaser cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {teasers.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-1">{title}</h2>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prize;