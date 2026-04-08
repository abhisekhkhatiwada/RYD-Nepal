import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import { Check, Shield, Wrench, Clock, Zap, Gift, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  useSEO({
    title: 'Bike Rental Plans Kathmandu — From Rs. 700/Day | RYD Nepal Motorcycle Rental Pricing',
    description: 'Rent a Hero Super Splendor 125cc in Kathmandu: Weekly Rs. 5,600/week, Pro Monthly Rs. 7,000/week, Prepayment Rs. 21,000/month (Rs. 700/day) with rent-to-own after 1.5 years. Free maintenance, Sagoon kit, 24/7 support. Cheapest bike rental in Kathmandu for Pathao, InDrive, Yango & Tootle riders.',
    keywords: 'bike rental plans Kathmandu, motorcycle rental price Nepal, cheapest bike rent Kathmandu, daily bike rental Kathmandu, weekly bike rental Nepal, monthly motorcycle rental Kathmandu, rent to own bike Nepal, rent to own motorcycle Kathmandu, Hero Splendor rent price, bike on rent Kathmandu price, affordable motorcycle rental Nepal, Pathao bike rental cost, gig worker bike rental, बाइक भाडा काठमाडौं मूल्य, मोटरसाइकल भाडा नेपाल',
    path: '/services',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'Rental Plans', url: 'https://rydnepal.com/services' },
      ]),
    ],
  });

  const plans = [
    {
      id: 'weekly',
      name: 'Weekly',
      price: 'Rs. 5,600',
      period: 'per week',
      desc: 'Flexible weekly plan for gig workers in Kathmandu. Pay week by week on Pathao, InDrive, Yango, or Tootle.',
      features: [
        'Hero Super Splendor 125cc',
        'Sagoon welcome kit (first time)',
        'Routine service included',
        '1 Helmet provided',
        'Rs. 1,500 fuel coupon on pickup',
        'Full insurance guidance',
        '24/7 breakdown support'
      ],
      isPopular: false
    },
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: 'Rs. 7,000',
      period: 'per week',
      desc: 'Best value for full-time Pathao, InDrive, Yango, or Tootle riders — own the Hero Super Splendor after just 1.5 years of rental.',
      features: [
        'Hero Super Splendor 125cc (brand new)',
        'Sagoon welcome kit included',
        'All servicing included',
        '1 Helmet provided',
        'Rs. 1,500 fuel coupon on pickup',
        'Phone mount & charger',
        'Own the bike after 1.5 years',
        'Priority breakdown assistance'
      ],
      isPopular: true
    },
    {
      id: 'prepayment',
      name: 'Prepayment',
      price: 'Rs. 21,000',
      period: 'per month',
      desc: 'Pay the full month upfront and save — only Rs. 700/day. The most affordable option for committed riders.',
      features: [
        'Hero Super Splendor 125cc',
        'Sagoon welcome kit (first time)',
        'Only Rs. 700/day (Rs. 100/day savings)',
        'All servicing included',
        '1 Helmet provided',
        'Rs. 1,500 fuel coupon on pickup',
        'Full insurance guidance',
        '24/7 breakdown support'
      ],
      isPopular: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>Bike Rental Plans — Weekly, Monthly &amp; Rent-to-Own | RYD Nepal</title>
        <meta name="description" content="Rent a Hero Super Splendor 125cc in Kathmandu: Weekly Rs. 5,600/week, Pro Monthly Rs. 7,000/week, Prepayment Rs. 21,000/month. Includes free maintenance, insurance, and rent-to-own after 1.5 years." />
        <link rel="canonical" href="https://www.rydnepal.com/services" />
      </Helmet>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-6">Bike Rental Plans in Kathmandu — Affordable Motorcycle Rental Pricing</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Transparent pricing for our Hero Super Splendor 125cc fleet. No hidden costs, no surprises — the cheapest bike rental in Kathmandu for gig workers.
          </p>
        </div>
      </section>

      {/* Sagoon Kit Callout */}
      <section className="py-10 bg-primary-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="bg-primary p-3 rounded-2xl flex-shrink-0">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Free Sagoon Welcome Kit for Every New Rider in Kathmandu</p>
              <p className="text-sm text-slate-600">Includes a helmet, phone mount, raincoat, and Rs. 1,500 fuel credit — on us, once, when you join RYD Nepal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Motorcycle rental pricing plans">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-6 sm:p-10 border-2 transition-all hover:shadow-xl ${
                plan.isPopular ? 'border-primary shadow-primary-50 shadow-lg' : 'border-slate-100'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Best Value
                </span>
              )}
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h2>
              <p className="text-slate-500 text-sm mb-8">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 text-sm ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-600 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block w-full py-4 rounded-xl font-bold transition-all text-center ${
                  plan.isPopular
                    ? 'bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary-100'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                Choose This Plan
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Price Comparison — SEO content */}
      <section className="py-16 bg-white border-y border-slate-100" aria-label="Bike rental price comparison Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why RYD Nepal Is the Cheapest Bike Rental in Kathmandu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-bold text-red-700 mb-3">Buying a Bike Outright</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>Rs. 2,50,000+ upfront for a new Hero Splendor</li>
                  <li>Rs. 3,000–5,000/month for EMI interest</li>
                  <li>Rs. 2,000–4,000/month for maintenance</li>
                  <li>Insurance, registration extra costs</li>
                  <li>Credit check & bank approval required</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-green-700 mb-3">Renting from RYD Nepal</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>From Rs. 700/day — no upfront cost</li>
                  <li>Zero maintenance cost — included free</li>
                  <li>Insurance guidance included</li>
                  <li>Free Sagoon kit worth Rs. 3,000+</li>
                  <li>No credit check, no bank loan needed</li>
                  <li>Own the bike after 1.5 years (Pro plan)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Details */}
      <section className="py-20 bg-slate-50" aria-label="What's included in every bike rental plan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Included in Every Motorcycle Rental Plan</h2>
            <p className="text-slate-500">We take care of the heavy lifting so you can focus on earning in Kathmandu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Bike Maintenance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Servicing every 1,500km at our <strong>Kapan workshop (near Dhalane Bridge)</strong> — oil change, brake check, tire inspection, and parts replacement. All free with your rental.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Insurance Assistance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every rental bike comes with full insurance. We guide you through the claims process and keep your paperwork hassle-free so you stay earning.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Roadside Support</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Breakdown anywhere in Kathmandu Valley? Call our hotline. We dispatch a technician or a replacement bike quickly so your earning hours on Pathao, InDrive, Yango, or Tootle aren't wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ownership Path */}
      <section className="py-20" aria-label="Rent to own motorcycle plan in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 text-primary font-bold mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="uppercase tracking-widest text-xs">Pro Plan — Rent to Own Motorcycle</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Own Your Bike After 1.5 Years — Nepal's First Rent-to-Own Motorcycle Program</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                On the Pro Monthly plan, every week of rent builds toward full ownership. After 1.5 years of continuous rental, the Hero Super Splendor is legally transferred to you — with zero bank loans, no interest, and no credit score requirements. The smartest way to own a motorcycle in Kathmandu.
              </p>
              <ul className="space-y-3">
                {['No bank loan or EMI required', 'No credit check needed', 'Legal transfer of vehicle ownership', 'Ride it, earn from it on Pathao/InDrive/Yango/Tootle, then own it'].map((pt, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-block bg-slate-800 border border-slate-700 rounded-3xl p-8">
                <p className="text-slate-400 text-sm mb-2">Total path to ownership</p>
                <p className="text-5xl font-black text-white mb-2">1.5 <span className="text-2xl font-semibold text-slate-400">Years</span></p>
                <p className="text-slate-500 text-xs">~Rs. 7,000/week x 78 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nepali Language Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100" aria-label="बाइक भाडा योजना काठमाडौं">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">बाइक भाडा योजनाहरू — काठमाडौं</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            RYD Nepal ले काठमाडौंमा हिरो सुपर स्प्लेन्डर 125cc बाइक भाडामा दिन्छ।
            <strong>साप्ताहिक रु. ५,६००</strong>, <strong>प्रो मासिक रु. ७,०००/हप्ता</strong>, वा <strong>प्रिपेमेन्ट रु. २१,०००/महिना (रु. ७००/दिन)</strong> —
            १.५ वर्षपछि बाइक आफ्नै। सम्पूर्ण मर्मत, बीमा सहायता, र २४/७ सपोर्ट समावेश।
          </p>
          <Link to="/contact" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all">
            आवेदन दिनुहोस् (Apply Now)
          </Link>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 text-primary font-bold mb-2">
                <Zap className="w-5 h-5" />
                <span>Optional Add-ons for Delivery Riders</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Enhance Your Delivery Setup</h3>
              <p className="text-slate-500 max-w-lg mb-4">Upgrade your food delivery or ride-sharing setup with optional accessories available for rent alongside your motorcycle.</p>
              <div className="flex flex-wrap gap-2">
                {['Delivery Box', 'Extra Raincoat', 'Phone Holder'].map((item, i) => (
                  <span key={i} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium">{item}</span>
                ))}
              </div>
            </div>
            <Link to="/contact" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all whitespace-nowrap">
              Ask About Add-ons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
