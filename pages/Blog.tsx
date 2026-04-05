import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import {
  Calculator, TrendingUp, Fuel, Wrench, Shield, Clock, ChevronRight,
  CheckCircle, XCircle, ArrowRight, DollarSign, Calendar,
  BarChart3, PiggyBank, Bike, AlertTriangle, Gift
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   DATA — sourced April 2026
   ──────────────────────────────────────────────────────────────── */
const DATA = {
  bikePrice: 266900,        // Hero Super Splendor 125cc BS6 showroom Nepal
  mileageKmpl: 55,          // real-world average
  petrolPerLitre: 202,      // NPR, April 2026 Kathmandu
  dailyKmRidden: 100,       // average active rider
  dailyRent: 1000,          // Pro Monthly plan (Rs 7,000/week)
  weeklyRent: 7000,
  ownershipWeeks: 78,       // 1.5 years
  serviceIntervalWeeks: 2,
  serviceIntervalKm: 1800,
  serviceIfOwned: 1500,     // avg per service if paying yourself
  insurancePerYear: 6000,
  loanInterest: 0.10,       // 10% p.a. average
  loanDownPct: 0.50,
  loanMonths: 36,
  sagoonKitValue: 3000,
  fuelCreditValue: 1500,
  pathaoCommission: 0.15,
  avgGrossDailyEarning: 2000,
  workingDaysPerMonth: 26,
};

const fmt = (n: number) => n.toLocaleString('en-NP');
const fmtNe = (n: number) => n.toLocaleString('ne-NP');

/* derived numbers */
const dailyFuel = Math.round((DATA.dailyKmRidden / DATA.mileageKmpl) * DATA.petrolPerLitre);
const dailyProfit = DATA.avgGrossDailyEarning - dailyFuel - DATA.dailyRent;
const monthlyProfit = dailyProfit * DATA.workingDaysPerMonth;
const totalRentPaid = DATA.weeklyRent * DATA.ownershipWeeks;
const totalServicesInPeriod = Math.round((DATA.ownershipWeeks * 7) / (DATA.serviceIntervalWeeks * 7));
const maintenanceSaved = totalServicesInPeriod * DATA.serviceIfOwned;
const insuranceSaved = Math.round(DATA.insurancePerYear * 1.5);
const totalValueReceived = DATA.bikePrice + maintenanceSaved + insuranceSaved + DATA.sagoonKitValue + DATA.fuelCreditValue;
const effectivePremium = totalRentPaid - totalValueReceived;
const premiumPerDay = Math.round(effectivePremium / (DATA.ownershipWeeks * 7));

const loanDown = Math.round(DATA.bikePrice * DATA.loanDownPct);
const loanPrincipal = DATA.bikePrice - loanDown;
const monthlyRate = DATA.loanInterest / 12;
const emi = Math.round(loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, DATA.loanMonths) / (Math.pow(1 + monthlyRate, DATA.loanMonths) - 1));
const totalLoanCost = emi * DATA.loanMonths + loanDown;
const buyMonthlyCost = emi + (DATA.serviceIfOwned * 2) + Math.round(DATA.insurancePerYear / 12);

const earningsFirst18MonthsRYD = DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 18;
const costFirst18MonthsRYD = (dailyFuel * DATA.workingDaysPerMonth * 18) + totalRentPaid;
const netFirst18MonthsRYD = earningsFirst18MonthsRYD - costFirst18MonthsRYD;


/* ────────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────────── */
const Blog: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');

  useSEO({
    title: lang === 'en'
      ? 'Why Rs. 1,000/Day Rent-to-Own Bike Makes Sense — Full Calculation | RYD Nepal Blog'
      : 'किन दिनको रु. १,००० तिरेर बाइक आफ्नो बनाउन सम्भव छ — पूर्ण हिसाब | RYD Nepal ब्लग',
    description: lang === 'en'
      ? `Detailed financial breakdown: Rent a Hero Super Splendor 125cc BS6 at Rs. 1,000/day, earn Rs. ${fmt(DATA.avgGrossDailyEarning)}/day on Pathao/InDrive/Yango, own the bike after 1.5 years. Fuel cost Rs. ${fmt(dailyFuel)}/day at Rs. ${fmt(DATA.petrolPerLitre)}/litre. Free maintenance every 2 weeks. Complete rider profit calculation for Kathmandu.`
      : `पूर्ण आर्थिक विश्लेषण: हिरो सुपर स्प्लेन्डर 125cc BS6 दिनको रु. १,००० मा भाडामा लिनुहोस्, पाठाओ/इनड्राइभ/यांगोमा दिनको रु. ${fmtNe(DATA.avgGrossDailyEarning)} कमाउनुहोस्, १.५ वर्षपछि बाइक आफ्नो। इन्धन खर्च रु. ${fmtNe(dailyFuel)}/दिन। हरेक २ हप्तामा निःशुल्क सर्भिसिङ।`,
    keywords: 'rent to own bike Nepal, bike rental profit calculator Kathmandu, Rs 1000 per day bike rent, Hero Splendor 125 rent Nepal, Pathao rider income Nepal, gig worker bike rental profit, rent vs buy bike Nepal, motorcycle rental ROI Kathmandu, बाइक भाडा नाफा काठमाडौं, rent to own motorcycle calculation, daily bike rental profit Nepal, RYD Nepal blog, bike rental financial breakdown',
    path: '/blog/rent-to-own-hero-splendor-125',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'Blog', url: 'https://rydnepal.com/blog' },
        { name: 'Rent-to-Own Hero Splendor 125', url: 'https://rydnepal.com/blog/rent-to-own-hero-splendor-125' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Why Paying Rs. 1,000/Day to Rent-to-Own a Hero Splendor 125cc Makes Financial Sense for Kathmandu Riders',
        'alternativeHeadline': 'किन दिनको रु. १,००० तिरेर बाइक आफ्नो बनाउन सम्भव छ — काठमाडौं राइडरहरूको लागि पूर्ण आर्थिक विश्लेषण',
        'description': `Complete financial breakdown showing how Kathmandu gig riders earn profit renting a Hero Super Splendor 125cc at Rs. 1,000/day and own it after 1.5 years.`,
        'author': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://rydnepal.com' },
        'publisher': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://rydnepal.com', 'logo': { '@type': 'ImageObject', 'url': 'https://rydnepal.com/logo.png' } },
        'datePublished': '2026-04-05',
        'dateModified': '2026-04-05',
        'image': 'https://rydnepal.com/blog/hero-splendor-125-blue.jpg',
        'mainEntityOfPage': 'https://rydnepal.com/blog/rent-to-own-hero-splendor-125',
        'inLanguage': ['en', 'ne'],
        'keywords': 'rent to own bike Nepal, bike rental profit, Hero Splendor 125, Pathao rider income, gig economy Nepal',
        'articleBody': 'Detailed financial analysis comparing renting vs buying a motorcycle for gig work in Kathmandu...',
        'about': [
          { '@type': 'Thing', 'name': 'Motorcycle Rental' },
          { '@type': 'Thing', 'name': 'Gig Economy Nepal' },
          { '@type': 'Thing', 'name': 'Hero Super Splendor 125cc' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How much does it cost to rent a Hero Splendor 125 in Kathmandu?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The RYD Nepal Pro Monthly plan costs Rs. ${DATA.dailyRent}/day (billed at Rs. ${DATA.weeklyRent}/week). There is no down payment, no credit check, and no hidden fees. Daily rent includes insurance support, free bi-weekly maintenance, and 24/7 breakdown support.`,
            },
          },
          {
            '@type': 'Question',
            'name': 'How much can I earn as a Pathao/InDrive rider in Kathmandu?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Active Kathmandu riders average Rs. ${DATA.avgGrossDailyEarning} gross per day on Pathao, InDrive, Yango, and Tootle. After daily fuel (Rs. ${dailyFuel}) and RYD rent (Rs. ${DATA.dailyRent}), your daily net profit is Rs. ${dailyProfit}. Over 26 working days, that is Rs. ${monthlyProfit}/month in take-home income.`,
            },
          },
          {
            '@type': 'Question',
            'name': 'What happens if the bike breaks down?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'RYD Nepal provides 24/7 breakdown support. Call any time and a replacement bike is dispatched within 30 minutes. All mechanical repairs are handled by RYD at zero cost to the rider.',
            },
          },
          {
            '@type': 'Question',
            'name': `Do I own the bike after ${DATA.ownershipWeeks} weeks?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Yes. After completing ${DATA.ownershipWeeks} weeks (18 months) of the Pro plan, full ownership of the Hero Super Splendor 125cc BS6 is transferred to you at no extra cost. The bluebook (vehicle registration) is transferred to your name.`,
            },
          },
          {
            '@type': 'Question',
            'name': "What if I can't pay rent for a week?",
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'RYD Nepal offers flexible support for genuine hardship cases. There is no credit bureau involvement, no penalty fees, and no long-term financial damage — unlike a bank loan which charges penalties and reports defaults to the credit bureau.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How does RYD compare to a bank loan for buying a bike?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `A bank loan requires Rs. ${loanDown} down payment (${Math.round(DATA.loanDownPct * 100)}%) upfront and Rs. ${emi}/month EMI for 36 months. RYD requires zero upfront cost — you pay Rs. ${DATA.dailyRent}/day only on days you ride and earn. No credit check, start same or next day, free maintenance included.`,
            },
          },
        ],
      },
    ],
  });

  const en = lang === 'en';

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {en ? 'Back to Blog' : 'ब्लगमा फर्कनुहोस्'}
          </Link>
          <div className="flex items-center space-x-2 text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog — Financial Analysis' : 'RYD Nepal ब्लग — आर्थिक विश्लेषण'}</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ne')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'ne' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              नेपाली
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
            {en
              ? <>Why Paying <span className="text-primary">Rs. 1,000/Day</span> to Rent-to-Own a Bike Makes <span className="text-primary">Financial Sense</span></>
              : <>किन दिनको <span className="text-primary">रु. १,०००</span> तिरेर बाइक भाडा-बाट-आफ्नो बनाउन <span className="text-primary">आर्थिक रूपमा सम्भव</span> छ</>
            }
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? `A complete, no-BS financial breakdown for Kathmandu riders. Hero Super Splendor 125cc BS6. Petrol at Rs. ${fmt(DATA.petrolPerLitre)}/litre. Real earnings data from Pathao, InDrive, Yango & Tootle. Every rupee accounted for.`
              : `काठमाडौंका राइडरहरूको लागि पूर्ण आर्थिक विश्लेषण। हिरो सुपर स्प्लेन्डर 125cc BS6। पेट्रोल रु. ${fmtNe(DATA.petrolPerLitre)}/लिटर। पाठाओ, इनड्राइभ, यांगो र टुटलबाट वास्तविक आम्दानी डाटा। हरेक रुपैयाँको हिसाब।`
            }
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full">{en ? 'Published: April 5, 2026' : 'प्रकाशित: चैत्र २२, २०८२'}</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">{en ? '12 min read' : '१२ मिनेट पठन'}</span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Data-Driven Analysis' : 'तथ्यमा आधारित'}</span>
          </div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, label: en ? 'Daily Rent' : 'दैनिक भाडा', val: en ? `Rs. ${fmt(DATA.dailyRent)}` : `रु. ${fmtNe(DATA.dailyRent)}`, color: 'text-primary' },
              { icon: TrendingUp, label: en ? 'Daily Gross Earning' : 'दैनिक कुल आम्दानी', val: en ? `Rs. ${fmt(DATA.avgGrossDailyEarning)}` : `रु. ${fmtNe(DATA.avgGrossDailyEarning)}`, color: 'text-green-600' },
              { icon: Fuel, label: en ? 'Daily Fuel Cost' : 'दैनिक इन्धन खर्च', val: en ? `Rs. ${fmt(dailyFuel)}` : `रु. ${fmtNe(dailyFuel)}`, color: 'text-amber-600' },
              { icon: PiggyBank, label: en ? 'Daily Net Profit' : 'दैनिक खुद नाफा', val: en ? `Rs. ${fmt(dailyProfit)}` : `रु. ${fmtNe(dailyProfit)}`, color: 'text-emerald-600' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
                <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section 1: The Problem ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-xl"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'The Chicken-and-Egg Problem' : 'कुखुरा-र-अण्डा समस्या'}
            </h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            {en ? (
              <>
                <p>You want to earn money in Kathmandu. Pathao, InDrive, Yango, and Tootle are hiring riders every day. Riders are earning <strong>Rs. 40,000–80,000+ per month</strong>. But there's one problem:</p>
                <p className="text-xl font-bold text-slate-900">You need a bike to earn money. You need money to buy a bike.</p>
                <p>A brand new <strong>Hero Super Splendor 125cc BS6</strong> costs <strong>Rs. {fmt(DATA.bikePrice)}</strong> in Nepal. Most people don't have Rs. 2.67 lakh lying around. And getting a bank loan? You need proof of income, a credit history, and a <strong>down payment of at least Rs. {fmt(loanDown)}</strong> ({Math.round(DATA.loanDownPct * 100)}%).</p>
                <p>This is where <strong>RYD Nepal's Rs. 1,000/day rent-to-own model</strong> breaks the deadlock. Let's do the math — every single rupee of it.</p>
              </>
            ) : (
              <>
                <p>तपाईं काठमाडौंमा पैसा कमाउन चाहनुहुन्छ। पाठाओ, इनड्राइभ, यांगो, र टुटलले हरेक दिन राइडरहरू खोजिरहेका छन्। राइडरहरूले <strong>महिनाको रु. ४०,०००–८०,०००+</strong> कमाइरहेका छन्। तर एउटा समस्या छ:</p>
                <p className="text-xl font-bold text-slate-900">पैसा कमाउन बाइक चाहिन्छ। बाइक किन्न पैसा चाहिन्छ।</p>
                <p>नयाँ <strong>हिरो सुपर स्प्लेन्डर 125cc BS6</strong> को मूल्य नेपालमा <strong>रु. {fmtNe(DATA.bikePrice)}</strong> छ। धेरैसँग रु. २.६७ लाख छैन। बैंक लोन? आम्दानीको प्रमाण, क्रेडिट हिस्ट्री, र <strong>कम्तीमा रु. {fmtNe(loanDown)}</strong> ({fmtNe(Math.round(DATA.loanDownPct * 100))}%) डाउन पेमेन्ट चाहिन्छ।</p>
                <p>यही ठाउँमा <strong>RYD Nepal को दिनको रु. १,००० भाडा-बाट-आफ्नो मोडल</strong>ले समस्या समाधान गर्छ। हिसाब गरौं — हरेक रुपैयाँको।</p>
              </>
            )}
          </div>
        </section>

        {/* ── Section 2: The Bike ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary-100 p-2 rounded-xl"><Bike className="w-5 h-5 text-primary" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'The Bike: Hero Super Splendor 125cc BS6' : 'बाइक: हिरो सुपर स्प्लेन्डर 125cc BS6'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <img
              src="https://merogaadi.s3.us-east-2.amazonaws.com/images/makes/Hero%20Super%20Splendor-1588416954-817.jpg"
              alt="Hero Super Splendor 125cc BS6 — RYD Nepal rental fleet bike"
              className="rounded-2xl shadow-lg w-full h-64 object-contain bg-slate-50"
              loading="lazy"
            />
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">{en ? 'Key Specifications' : 'मुख्य विशेषताहरू'}</h3>
              <ul className="space-y-2.5 text-sm">
                {(en ? [
                  ['Engine', '124.7cc, Single Cylinder, Air-Cooled, BS6 FI'],
                  ['Power', '10.7 BHP @ 7,500 rpm'],
                  ['Torque', '10.6 Nm @ 6,000 rpm'],
                  ['Gearbox', '5-Speed'],
                  ['Real Mileage', `${DATA.mileageKmpl} km/l (city riding)`],
                  ['Tank Capacity', '13 Litres (~715 km range)'],
                  ['Showroom Price', `Rs. ${fmt(DATA.bikePrice)} (Nepal)`],
                  ['Ideal For', 'Pathao, InDrive, Yango, Tootle, Delivery'],
                ] : [
                  ['इन्जिन', '१२४.७cc, सिंगल सिलिन्डर, एयर-कूल्ड, BS6 FI'],
                  ['पावर', '१०.७ BHP @ ७,५०० rpm'],
                  ['टर्क', '१०.६ Nm @ ६,००० rpm'],
                  ['गियरबक्स', '५-स्पिड'],
                  ['वास्तविक माइलेज', `${fmtNe(DATA.mileageKmpl)} km/l (शहरी सवारी)`],
                  ['ट्याङ्क क्षमता', '१३ लिटर (~७१५ km रेन्ज)'],
                  ['शोरुम मूल्य', `रु. ${fmtNe(DATA.bikePrice)} (नेपाल)`],
                  ['उपयुक्त', 'पाठाओ, इनड्राइभ, यांगो, टुटल, डेलिभरी'],
                ]).map(([k, v], i) => (
                  <li key={i} className="flex justify-between">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-semibold text-slate-900 text-right">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {en
              ? `The Hero Super Splendor 125cc is the workhorse of Nepal's gig economy. With 55 km/l real-world mileage and a proven 125cc engine, it's the most fuel-efficient and reliable bike for daily ride-sharing and delivery work in Kathmandu Valley.`
              : `हिरो सुपर स्प्लेन्डर 125cc नेपालको गिग इकोनोमीको भरपर्दो बाइक हो। ५५ km/l वास्तविक माइलेज र भरपर्दो 125cc इन्जिनसहित, यो काठमाडौं उपत्यकामा दैनिक राइड-शेयरिंग र डेलिभरी कामको लागि सबैभन्दा इन्धन-कुशल बाइक हो।`
            }
          </p>
        </section>

        {/* ── Section 3: Daily Earnings Breakdown ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-green-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Daily Earnings: Platform-by-Platform Breakdown' : 'दैनिक आम्दानी: प्लेटफर्म अनुसार विश्लेषण'}
            </h2>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl">{en ? 'Platform' : 'प्लेटफर्म'}</th>
                  <th className="px-4 py-3 text-right">{en ? 'Commission' : 'कमिशन'}</th>
                  <th className="px-4 py-3 text-right">{en ? 'Avg Daily Gross' : 'दैनिक कुल'}</th>
                  <th className="px-4 py-3 text-right">{en ? 'Monthly Gross' : 'मासिक कुल'}</th>
                  <th className="px-4 py-3 text-right rounded-tr-xl">{en ? 'Monthly Net*' : 'मासिक खुद*'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Pathao', comm: '15–20%', daily: '1,800–2,500', monthly: '47,000–65,000', net: '17,000–35,000' },
                  { name: 'InDrive', comm: '10%', daily: '1,500–2,200', monthly: '39,000–57,000', net: '9,000–27,000' },
                  { name: 'Yango', comm: '3%', daily: '1,500–2,500', monthly: '39,000–65,000', net: '9,000–35,000' },
                  { name: 'Tootle', comm: '10–15%', daily: '1,200–2,000', monthly: '31,000–52,000', net: '1,000–22,000' },
                  { name: en ? 'Multi-Platform' : 'बहु-प्लेटफर्म', comm: '~12%', daily: '2,000–3,000', monthly: '52,000–78,000', net: '22,000–48,000' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i === 4 ? 'bg-green-50 font-semibold' : 'hover:bg-slate-50'}`}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.comm}</td>
                    <td className="px-4 py-3 text-right">{en ? 'Rs.' : 'रु.'} {row.daily}</td>
                    <td className="px-4 py-3 text-right">{en ? 'Rs.' : 'रु.'} {row.monthly}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-semibold">{en ? 'Rs.' : 'रु.'} {row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 italic">
            {en
              ? `*Net = Gross earnings − Bike rent (Rs. ${fmt(DATA.dailyRent)}/day × 26 days) − Fuel (Rs. ${fmt(dailyFuel)}/day × 26 days). Based on 26 working days/month, ${DATA.dailyKmRidden}km/day, petrol Rs. ${fmt(DATA.petrolPerLitre)}/litre, ${DATA.mileageKmpl}km/l mileage. April 2026 data.`
              : `*खुद = कुल आम्दानी − बाइक भाडा (रु. ${fmtNe(DATA.dailyRent)}/दिन × २६ दिन) − इन्धन (रु. ${fmtNe(dailyFuel)}/दिन × २६ दिन)। २६ कार्य दिन/महिना, ${fmtNe(DATA.dailyKmRidden)}km/दिन, पेट्रोल रु. ${fmtNe(DATA.petrolPerLitre)}/लिटर, ${fmtNe(DATA.mileageKmpl)}km/l माइलेज। चैत्र २०८२ डाटा।`
            }
          </p>
        </section>

        {/* ── Section 4: Daily P&L Calculator ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-xl"><Calculator className="w-5 h-5 text-blue-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Your Daily Profit & Loss — Every Rupee Accounted' : 'तपाईंको दैनिक नाफा-नोक्सान — हरेक रुपैयाँको हिसाब'}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-lg">
            {/* Income */}
            <div className="bg-green-50 p-6 border-b border-green-100">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {en ? 'INCOME (Per Day)' : 'आम्दानी (प्रति दिन)'}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">{en ? 'Gross earnings from rides/deliveries' : 'राइड/डेलिभरीबाट कुल आम्दानी'}</span>
                  <span className="font-bold text-green-700">{en ? 'Rs.' : 'रु.'} {en ? fmt(DATA.avgGrossDailyEarning) : fmtNe(DATA.avgGrossDailyEarning)}</span>
                </div>
                <p className="text-xs text-slate-500">{en ? '(Average across Pathao, InDrive, Yango — 8-10 hours/day, 8-12 rides)' : '(पाठाओ, इनड्राइभ, यांगोको औसत — ८-१० घण्टा/दिन, ८-१२ राइड)'}</p>
              </div>
            </div>

            {/* Expenses */}
            <div className="bg-red-50 p-6 border-b border-red-100">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {en ? 'EXPENSES (Per Day)' : 'खर्च (प्रति दिन)'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-slate-700">{en ? 'Bike Rent (RYD Nepal Pro Monthly)' : 'बाइक भाडा (RYD Nepal प्रो मासिक)'}</span>
                    <p className="text-xs text-slate-500">{en ? `Rs. ${fmt(DATA.weeklyRent)}/week ÷ 7 days` : `रु. ${fmtNe(DATA.weeklyRent)}/हप्ता ÷ ७ दिन`}</p>
                  </div>
                  <span className="font-bold text-red-600">- {en ? 'Rs.' : 'रु.'} {en ? fmt(DATA.dailyRent) : fmtNe(DATA.dailyRent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-slate-700">{en ? 'Fuel (Petrol)' : 'इन्धन (पेट्रोल)'}</span>
                    <p className="text-xs text-slate-500">{en ? `${DATA.dailyKmRidden}km ÷ ${DATA.mileageKmpl}km/l = ${(DATA.dailyKmRidden / DATA.mileageKmpl).toFixed(1)}L × Rs. ${fmt(DATA.petrolPerLitre)}/L` : `${fmtNe(DATA.dailyKmRidden)}km ÷ ${fmtNe(DATA.mileageKmpl)}km/l = ${(DATA.dailyKmRidden / DATA.mileageKmpl).toFixed(1)}L × रु. ${fmtNe(DATA.petrolPerLitre)}/L`}</p>
                  </div>
                  <span className="font-bold text-red-600">- {en ? 'Rs.' : 'रु.'} {en ? fmt(dailyFuel) : fmtNe(dailyFuel)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-slate-700">{en ? 'Maintenance' : 'मर्मत सम्भार'}</span>
                    <p className="text-xs text-slate-500">{en ? 'Included FREE by RYD Nepal (every 2 weeks / 1,800km)' : 'RYD Nepal ले निःशुल्क (हरेक २ हप्ता / १,८०० km)'}</p>
                  </div>
                  <span className="font-bold text-green-600">{en ? 'Rs.' : 'रु.'} 0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-slate-700">{en ? 'Insurance' : 'बीमा'}</span>
                    <p className="text-xs text-slate-500">{en ? 'Third-party insurance guidance included' : 'तेस्रो-पक्ष बीमा सहयोग समावेश'}</p>
                  </div>
                  <span className="font-bold text-green-600">{en ? 'Rs.' : 'रु.'} 0</span>
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{en ? 'NET DAILY PROFIT' : 'दैनिक खुद नाफा'}</h3>
                  <p className="text-emerald-200 text-sm">{en ? 'Money in YOUR pocket every day' : 'हरेक दिन तपाईंको खल्तीमा'}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{en ? 'Rs.' : 'रु.'} {en ? fmt(dailyProfit) : fmtNe(dailyProfit)}</p>
                  <p className="text-emerald-200 text-sm">{en ? `= Rs. ${fmt(monthlyProfit)}/month` : `= रु. ${fmtNe(monthlyProfit)}/महिना`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>{en ? 'Conservative estimate:' : 'न्यूनतम अनुमान:'}</strong>{' '}
            {en
              ? `We used Rs. ${fmt(DATA.avgGrossDailyEarning)}/day gross — that's on the lower end. Active multi-platform riders regularly earn Rs. 2,500–3,500/day, which would give Rs. ${fmt(2500 - dailyFuel - DATA.dailyRent)}–${fmt(3500 - dailyFuel - DATA.dailyRent)} daily profit.`
              : `हामीले दैनिक कुल रु. ${fmtNe(DATA.avgGrossDailyEarning)} प्रयोग गर्यौं — यो न्यून अनुमान हो। सक्रिय बहु-प्लेटफर्म राइडरहरूले नियमित रूपमा रु. २,५००–३,५००/दिन कमाउँछन्, जसले रु. ${fmtNe(2500 - dailyFuel - DATA.dailyRent)}–${fmtNe(3500 - dailyFuel - DATA.dailyRent)} दैनिक नाफा दिन्छ।`
            }
          </div>
        </section>

        {/* ── Section 5: 18-Month Projection ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-xl"><Calendar className="w-5 h-5 text-purple-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'The 18-Month Journey to Ownership' : '१८ महिनाको स्वामित्वको यात्रा'}
            </h2>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Month 1-6 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100">
                <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  {en ? 'MONTHS 1–6' : 'महिना १–६'}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{en ? 'Build Your Rhythm' : 'आफ्नो लय बनाउनुहोस्'}</h4>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>{en ? `✓ Total rent paid: Rs. ${fmt(DATA.weeklyRent * 26)}` : `✓ कुल भाडा: रु. ${fmtNe(DATA.weeklyRent * 26)}`}</li>
                  <li>{en ? `✓ Total earned (gross): Rs. ${fmt(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 6)}` : `✓ कुल कमाइ: रु. ${fmtNe(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 6)}`}</li>
                  <li>{en ? `✓ Net profit: Rs. ${fmt(monthlyProfit * 6)}` : `✓ खुद नाफा: रु. ${fmtNe(monthlyProfit * 6)}`}</li>
                  <li>{en ? '✓ ~13 free services completed' : '✓ ~१३ निःशुल्क सर्भिस सकियो'}</li>
                </ul>
              </div>
              {/* Month 7-12 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100">
                <div className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  {en ? 'MONTHS 7–12' : 'महिना ७–१२'}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{en ? 'Maximize Earnings' : 'आम्दानी बढाउनुहोस्'}</h4>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>{en ? `✓ Cumulative rent: Rs. ${fmt(DATA.weeklyRent * 52)}` : `✓ कुल भाडा: रु. ${fmtNe(DATA.weeklyRent * 52)}`}</li>
                  <li>{en ? `✓ Cumulative earned: Rs. ${fmt(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 12)}` : `✓ कुल कमाइ: रु. ${fmtNe(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 12)}`}</li>
                  <li>{en ? `✓ Cumulative net: Rs. ${fmt(monthlyProfit * 12)}` : `✓ कुल खुद नाफा: रु. ${fmtNe(monthlyProfit * 12)}`}</li>
                  <li>{en ? '✓ You know your routes, peak hours' : '✓ रुट र पीक घण्टा जान्नुहुन्छ'}</li>
                </ul>
              </div>
              {/* Month 13-18 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-primary shadow-lg">
                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  {en ? 'MONTHS 13–18' : 'महिना १३–१८'}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{en ? 'Ownership Transfer!' : 'स्वामित्व हस्तान्तरण!'}</h4>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>{en ? `✓ Total rent paid: Rs. ${fmt(totalRentPaid)}` : `✓ कुल भाडा: रु. ${fmtNe(totalRentPaid)}`}</li>
                  <li>{en ? `✓ Total earned: Rs. ${fmt(earningsFirst18MonthsRYD)}` : `✓ कुल कमाइ: रु. ${fmtNe(earningsFirst18MonthsRYD)}`}</li>
                  <li className="font-bold text-primary">{en ? `✓ Total net profit: Rs. ${fmt(netFirst18MonthsRYD)}` : `✓ कुल खुद नाफा: रु. ${fmtNe(netFirst18MonthsRYD)}`}</li>
                  <li className="font-bold text-primary">{en ? '✓ BIKE IS NOW YOURS!' : '✓ बाइक अब तपाईंको!'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-slate-600 mb-2">
              {en ? 'After 18 months with RYD Nepal, you walk away with:' : '१८ महिनापछि RYD Nepal सँग, तपाईंसँग:'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-primary-100">
                <p className="text-xs text-slate-500">{en ? 'Net Cash Earned' : 'खुद नगद आम्दानी'}</p>
                <p className="text-2xl font-black text-primary">{en ? 'Rs.' : 'रु.'} {en ? fmt(netFirst18MonthsRYD) : fmtNe(netFirst18MonthsRYD)}</p>
              </div>
              <div className="text-3xl font-black text-primary self-center">+</div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-primary-100">
                <p className="text-xs text-slate-500">{en ? 'A Bike Worth' : 'बाइक मूल्य'}</p>
                <p className="text-2xl font-black text-primary">{en ? 'Rs.' : 'रु.'} {en ? fmt(DATA.bikePrice) : fmtNe(DATA.bikePrice)}</p>
              </div>
            </div>
            <p className="text-primary-700 font-bold">
              {en
                ? `Total value created in 18 months: Rs. ${fmt(netFirst18MonthsRYD + DATA.bikePrice)}`
                : `१८ महिनामा सिर्जित कुल मूल्य: रु. ${fmtNe(netFirst18MonthsRYD + DATA.bikePrice)}`
              }
            </p>
          </div>
        </section>

        {/* ── Section 6: RYD vs Buying Comparison ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-amber-100 p-2 rounded-xl"><BarChart3 className="w-5 h-5 text-amber-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Head-to-Head: RYD Rent-to-Own vs Bank Loan vs Cash Purchase' : 'तुलना: RYD भाडा-बाट-आफ्नो vs बैंक लोन vs नगद खरिद'}
            </h2>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs">
                  <th className="px-3 py-3 text-left rounded-tl-xl">{en ? 'Factor' : 'विषय'}</th>
                  <th className="px-3 py-3 text-center bg-primary">{en ? 'RYD Nepal Pro' : 'RYD Nepal प्रो'}</th>
                  <th className="px-3 py-3 text-center">{en ? 'Bank Loan (EMI)' : 'बैंक लोन (EMI)'}</th>
                  <th className="px-3 py-3 text-center rounded-tr-xl">{en ? 'Cash Purchase' : 'नगद खरिद'}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {(en ? [
                  ['Upfront Cost', 'Rs. 0', `Rs. ${fmt(loanDown)} (${Math.round(DATA.loanDownPct * 100)}%)`, `Rs. ${fmt(DATA.bikePrice)}`],
                  ['Credit Check', 'None needed', 'Required', 'N/A'],
                  ['Monthly Cost', `Rs. ${fmt(DATA.weeklyRent * 4.33)}`, `Rs. ${fmt(buyMonthlyCost)}`, `Rs. ${fmt(DATA.serviceIfOwned * 2 + Math.round(DATA.insurancePerYear / 12))}`],
                  ['Maintenance', 'FREE (every 2 wks)', 'You pay Rs. 1,500/service', 'You pay Rs. 1,500/service'],
                  ['Insurance Support', 'Included', 'You arrange', 'You arrange'],
                  ['24/7 Support', 'Included', 'No', 'No'],
                  ['Welcome Kit', 'Rs. 3,000+ FREE', 'No', 'No'],
                  ['Time to Start Earning', 'Same day', '2–4 weeks', 'Same day (if you have Rs. 2.67L)'],
                  ['Total Paid (18 months)', `Rs. ${fmt(totalRentPaid)}`, `Rs. ${fmt(emi * 18 + loanDown)}*`, `Rs. ${fmt(DATA.bikePrice)}`],
                  ['Own the Bike?', 'YES ✓ (after 18 months)', 'After 36 months EMI', 'YES ✓ (day 1)'],
                  ['Total + Maintenance + Insurance', `Rs. ${fmt(totalRentPaid)}`, `Rs. ${fmt(emi * 18 + loanDown + DATA.serviceIfOwned * 2 * 18 + Math.round(DATA.insurancePerYear * 1.5))}*`, `Rs. ${fmt(DATA.bikePrice + DATA.serviceIfOwned * 2 * 18 + Math.round(DATA.insurancePerYear * 1.5))}`],
                ] : [
                  ['अग्रिम लागत', 'रु. ०', `रु. ${fmtNe(loanDown)} (${fmtNe(Math.round(DATA.loanDownPct * 100))}%)`, `रु. ${fmtNe(DATA.bikePrice)}`],
                  ['क्रेडिट चेक', 'आवश्यक छैन', 'आवश्यक', 'लागू हुँदैन'],
                  ['मासिक लागत', `रु. ${fmtNe(Math.round(DATA.weeklyRent * 4.33))}`, `रु. ${fmtNe(buyMonthlyCost)}`, `रु. ${fmtNe(DATA.serviceIfOwned * 2 + Math.round(DATA.insurancePerYear / 12))}`],
                  ['मर्मत सम्भार', 'निःशुल्क (हरेक २ हप्ता)', 'तपाईं तिर्नुहुन्छ रु. १,५००/सर्भिस', 'तपाईं तिर्नुहुन्छ रु. १,५००/सर्भिस'],
                  ['बीमा सहायता', 'समावेश', 'आफैं मिलाउनुहोस्', 'आफैं मिलाउनुहोस्'],
                  ['२४/७ सपोर्ट', 'समावेश', 'छैन', 'छैन'],
                  ['स्वागत किट', 'रु. ३,०००+ निःशुल्क', 'छैन', 'छैन'],
                  ['कमाउन सुरु', 'उही दिन', '२–४ हप्ता', 'उही दिन (रु. २.६७L भए)'],
                  ['कुल भुक्तानी (१८ महिना)', `रु. ${fmtNe(totalRentPaid)}`, `रु. ${fmtNe(emi * 18 + loanDown)}*`, `रु. ${fmtNe(DATA.bikePrice)}`],
                  ['बाइक आफ्नो?', 'हो ✓ (१८ महिनापछि)', '३६ महिना EMI पछि', 'हो ✓ (पहिलो दिन)'],
                ]).map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-medium text-slate-900">{row[0]}</td>
                    <td className="px-3 py-2.5 text-center bg-primary-50/50 font-semibold text-primary-700">{row[1]}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{row[2]}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 italic mb-4">
            {en
              ? `*Bank loan calculation: Rs. ${fmt(DATA.bikePrice)} bike, ${Math.round(DATA.loanDownPct * 100)}% down payment, 10% annual interest, 36-month EMI of Rs. ${fmt(emi)}/month. Still owe Rs. ${fmt(loanPrincipal - Math.round((emi * 18) - (loanPrincipal * DATA.loanInterest * 1.5 / 2)))} after 18 months.`
              : `*बैंक लोन हिसाब: रु. ${fmtNe(DATA.bikePrice)} बाइक, ${fmtNe(Math.round(DATA.loanDownPct * 100))}% डाउन पेमेन्ट, १०% वार्षिक ब्याज, ३६ महिना EMI रु. ${fmtNe(emi)}/महिना।`
            }
          </p>
        </section>

        {/* ── Section 7: Hidden Savings ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl"><PiggyBank className="w-5 h-5 text-emerald-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Hidden Savings Most People Miss' : 'धेरैले नदेख्ने लुकेका बचतहरू'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(en ? [
              {
                icon: Wrench, color: 'bg-blue-100 text-blue-600',
                title: `Free Maintenance = Rs. ${fmt(maintenanceSaved)} Saved`,
                desc: `${totalServicesInPeriod} services over 18 months × Rs. ${fmt(DATA.serviceIfOwned)}/service. Oil changes, brake checks, tire inspections, chain adjustments — all done at RYD Nepal's Kapan workshop. Every 2 weeks or 1,800km, whichever comes first.`
              },
              {
                icon: Shield, color: 'bg-green-100 text-green-600',
                title: `Insurance Support = Rs. ${fmt(insuranceSaved)} Saved`,
                desc: `Third-party insurance is Rs. ${fmt(DATA.insurancePerYear)}/year. Over 1.5 years that's Rs. ${fmt(insuranceSaved)} you don't pay separately. Plus, RYD handles claims paperwork — no running around insurance offices.`
              },
              {
                icon: Gift, color: 'bg-purple-100 text-purple-600',
                title: `Sagoon Welcome Kit = Rs. ${fmt(DATA.sagoonKitValue + DATA.fuelCreditValue)} Value`,
                desc: `Helmet, phone mount, raincoat, and Rs. ${fmt(DATA.fuelCreditValue)} fuel credit on your very first day. These are things you'd buy anyway — that's day-1 savings.`
              },
              {
                icon: Clock, color: 'bg-amber-100 text-amber-600',
                title: `Opportunity Cost of Waiting = Rs. ${fmt(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 2)}+`,
                desc: `Bank loans take 2–4 weeks to process. That's 2+ months of lost earning time. At Rs. ${fmt(DATA.avgGrossDailyEarning)}/day × 26 days × 2 months = Rs. ${fmt(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 2)} in gross income you'd never recover.`
              },
            ] : [
              {
                icon: Wrench, color: 'bg-blue-100 text-blue-600',
                title: `निःशुल्क मर्मत = रु. ${fmtNe(maintenanceSaved)} बचत`,
                desc: `१८ महिनामा ${fmtNe(totalServicesInPeriod)} सर्भिसहरू × रु. ${fmtNe(DATA.serviceIfOwned)}/सर्भिस। तेल परिवर्तन, ब्रेक जाँच, टायर निरीक्षण — सबै RYD Nepal को कपन कार्यशालामा। हरेक २ हप्ता वा १,८०० km, जुन पहिले आउँछ।`
              },
              {
                icon: Shield, color: 'bg-green-100 text-green-600',
                title: `बीमा सहायता = रु. ${fmtNe(insuranceSaved)} बचत`,
                desc: `तेस्रो-पक्ष बीमा वार्षिक रु. ${fmtNe(DATA.insurancePerYear)}। १.५ वर्षमा रु. ${fmtNe(insuranceSaved)} बचत। थप, RYD ले दावी कागजात सम्हाल्छ।`
              },
              {
                icon: Gift, color: 'bg-purple-100 text-purple-600',
                title: `सागुन स्वागत किट = रु. ${fmtNe(DATA.sagoonKitValue + DATA.fuelCreditValue)} मूल्य`,
                desc: `हेल्मेट, फोन माउन्ट, रेनकोट, र रु. ${fmtNe(DATA.fuelCreditValue)} इन्धन क्रेडिट पहिलो दिनमै। यी तपाईंले वैसे पनि किन्नुपर्ने कुराहरू हुन्।`
              },
              {
                icon: Clock, color: 'bg-amber-100 text-amber-600',
                title: `पर्खाइको अवसर लागत = रु. ${fmtNe(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 2)}+`,
                desc: `बैंक लोनमा २–४ हप्ता लाग्छ। रु. ${fmtNe(DATA.avgGrossDailyEarning)}/दिन × २६ दिन × २ महिना = रु. ${fmtNe(DATA.avgGrossDailyEarning * DATA.workingDaysPerMonth * 2)} कुल आम्दानी गुम्छ।`
              },
            ]).map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl ${item.color} flex-shrink-0 mt-0.5`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm">{en ? 'Total hidden value over 18 months:' : '१८ महिनाको कुल लुकेको मूल्य:'}</p>
                <p className="text-3xl font-black">{en ? 'Rs.' : 'रु.'} {en ? fmt(maintenanceSaved + insuranceSaved + DATA.sagoonKitValue + DATA.fuelCreditValue) : fmtNe(maintenanceSaved + insuranceSaved + DATA.sagoonKitValue + DATA.fuelCreditValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">{en ? 'Effective daily premium for ALL services:' : 'सबै सेवाको दैनिक प्रभावी प्रिमियम:'}</p>
                <p className="text-3xl font-black text-primary">{en ? 'Rs.' : 'रु.'} {en ? fmt(premiumPerDay) : fmtNe(premiumPerDay)}<span className="text-base font-normal text-slate-400">/{en ? 'day' : 'दिन'}</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 8: Servicing Deep Dive ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-xl"><Wrench className="w-5 h-5 text-indigo-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Servicing Schedule: Every 2 Weeks or 1,800km' : 'सर्भिसिङ तालिका: हरेक २ हप्ता वा १,८०० km'}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="bg-indigo-50 p-5 border-b border-indigo-100">
              <p className="text-sm text-slate-700 leading-relaxed">
                {en
                  ? `RYD Nepal services your Hero Super Splendor every 2 weeks or 1,800km (whichever comes first) at the Kapan workshop near Dhalane Bridge. This is more frequent than Hero's recommended schedule — because gig riders put serious mileage on these bikes.`
                  : `RYD Nepal ले तपाईंको हिरो सुपर स्प्लेन्डर हरेक २ हप्ता वा १,८०० km (जुन पहिले आउँछ) मा कपन कार्यशाला, ढलाने ब्रिजमा सर्भिस गर्छ। यो Hero को सिफारिश भन्दा बढी बारम्बार छ — किनभने गिग राइडरहरूले बाइकमा गम्भीर माइलेज राख्छन्।`
                }
              </p>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-slate-900 mb-3">{en ? 'What Every Service Includes:' : 'हरेक सर्भिसमा के-के समावेश:'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(en ? [
                  'Engine oil change (premium grade)',
                  'Oil filter inspection/replacement',
                  'Spark plug check & clean',
                  'Air filter cleaning',
                  'Brake pad inspection',
                  'Chain lubrication & tension',
                  'Tire pressure & tread check',
                  'Battery health check',
                  'Clutch cable adjustment',
                  'Full safety inspection',
                ] : [
                  'इन्जिन तेल परिवर्तन (प्रिमियम ग्रेड)',
                  'तेल फिल्टर निरीक्षण/प्रतिस्थापन',
                  'स्पार्क प्लग जाँच र सफाई',
                  'एयर फिल्टर सफाई',
                  'ब्रेक प्याड निरीक्षण',
                  'चेन लुब्रिकेशन र टेन्शन',
                  'टायर प्रेसर र ट्रेड जाँच',
                  'ब्याट्री स्वास्थ्य जाँच',
                  'क्लच केबल समायोजन',
                  'पूर्ण सुरक्षा निरीक्षण',
                ]).map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-5 border-t border-green-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-800">
                  {en ? `${totalServicesInPeriod} services × Rs. ${fmt(DATA.serviceIfOwned)}/service if you paid yourself` : `${fmtNe(totalServicesInPeriod)} सर्भिसहरू × रु. ${fmtNe(DATA.serviceIfOwned)}/सर्भिस आफैं तिर्दा`}
                </p>
                <p className="text-lg font-black text-green-700">
                  {en ? `= Rs. ${fmt(maintenanceSaved)} SAVED` : `= रु. ${fmtNe(maintenanceSaved)} बचत`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 9: Fuel Cost Deep Dive ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-xl"><Fuel className="w-5 h-5 text-orange-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Fuel Economics: Why the Splendor 125 is the Smart Choice' : 'इन्धन अर्थशास्त्र: किन स्प्लेन्डर 125 बुद्धिमानी छनौट हो'}
            </h2>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-orange-600">{en ? fmt(DATA.mileageKmpl) : fmtNe(DATA.mileageKmpl)}</p>
                <p className="text-xs text-slate-600">km/{en ? 'litre' : 'लिटर'} ({en ? 'real-world' : 'वास्तविक'})</p>
              </div>
              <div>
                <p className="text-2xl font-black text-orange-600">{en ? 'Rs.' : 'रु.'} {en ? fmt(DATA.petrolPerLitre) : fmtNe(DATA.petrolPerLitre)}</p>
                <p className="text-xs text-slate-600">{en ? 'per litre (Apr 2026)' : 'प्रति लिटर (चैत्र २०८२)'}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-orange-600">{en ? 'Rs.' : 'रु.'} {en ? (DATA.petrolPerLitre / DATA.mileageKmpl).toFixed(1) : (DATA.petrolPerLitre / DATA.mileageKmpl).toFixed(1)}</p>
                <p className="text-xs text-slate-600">{en ? 'cost per km' : 'प्रति km लागत'}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-orange-600">{en ? 'Rs.' : 'रु.'} {en ? fmt(dailyFuel) : fmtNe(dailyFuel)}</p>
                <p className="text-xs text-slate-600">{en ? `daily (${DATA.dailyKmRidden}km)` : `दैनिक (${fmtNe(DATA.dailyKmRidden)}km)`}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
            {en ? (
              <p>
                At today's petrol price of Rs. {fmt(DATA.petrolPerLitre)}/litre, the Hero Super Splendor's {DATA.mileageKmpl} km/l real-world mileage means you spend just <strong>Rs. {(DATA.petrolPerLitre / DATA.mileageKmpl).toFixed(1)} per kilometre</strong>. Compare this to a 150cc or 200cc bike that gives 35-45 km/l — you'd spend Rs. {(DATA.petrolPerLitre / 40).toFixed(1)}/km, nearly <strong>{Math.round(((DATA.petrolPerLitre / 40) / (DATA.petrolPerLitre / DATA.mileageKmpl) - 1) * 100)}% more on fuel alone</strong>. Over 18 months of daily riding, the Splendor saves you <strong>Rs. {fmt(Math.round((DATA.petrolPerLitre / 40 - DATA.petrolPerLitre / DATA.mileageKmpl) * DATA.dailyKmRidden * DATA.workingDaysPerMonth * 18))}</strong> in fuel vs a 150cc bike.
              </p>
            ) : (
              <p>
                आजको पेट्रोल मूल्य रु. {fmtNe(DATA.petrolPerLitre)}/लिटरमा, हिरो सुपर स्प्लेन्डरको {fmtNe(DATA.mileageKmpl)} km/l माइलेजले तपाईंलाई <strong>प्रति किलोमिटर रु. {(DATA.petrolPerLitre / DATA.mileageKmpl).toFixed(1)}</strong> मात्र खर्च हुन्छ। 150cc बाइकसँग तुलना गर्दा जसले 35-45 km/l दिन्छ — तपाईंले इन्धनमा मात्र <strong>~{Math.round(((DATA.petrolPerLitre / 40) / (DATA.petrolPerLitre / DATA.mileageKmpl) - 1) * 100)}% बढी</strong> खर्च गर्नुहुन्थ्यो। १८ महिनामा स्प्लेन्डरले 150cc बाइक भन्दा <strong>रु. {fmtNe(Math.round((DATA.petrolPerLitre / 40 - DATA.petrolPerLitre / DATA.mileageKmpl) * DATA.dailyKmRidden * DATA.workingDaysPerMonth * 18))}</strong> इन्धन बचत गर्छ।
              </p>
            )}
          </div>
        </section>

        {/* ── Section 10: Risk Comparison ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-xl"><Shield className="w-5 h-5 text-red-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Risk Analysis: What If Things Go Wrong?' : 'जोखिम विश्लेषण: यदि कुरा बिग्रियो भने?'}
            </h2>
          </div>

          <div className="space-y-3">
            {(en ? [
              { scenario: 'Bike breaks down at night', ryd: 'RYD sends replacement within 30 min. You lose minimal hours.', own: 'You call a mechanic, wait, pay Rs. 2,000+. You lose an entire evening\'s income.', rydGood: true },
              { scenario: 'Major engine repair needed', ryd: 'RYD handles it completely FREE. Replacement bike provided.', own: 'You pay Rs. 8,000–15,000. Bike out of service for days. Zero income.', rydGood: true },
              { scenario: 'Accident / damage', ryd: 'Insurance guidance included. RYD assists with claims.', own: 'You navigate insurance alone. Time lost = income lost.', rydGood: true },
              { scenario: 'You want to stop riding', ryd: 'Return the bike. No EMI hanging over you. Clean exit.', own: 'Still owe EMI to the bank. Selling used bike at a loss.', rydGood: true },
              { scenario: 'Can\'t pay for one week', ryd: 'Talk to RYD — flexible support for genuine cases.', own: 'Bank charges penalty + damages your credit score.', rydGood: true },
            ] : [
              { scenario: 'राती बाइक बिग्रियो', ryd: 'RYD ले ३० मिनेटमा प्रतिस्थापन पठाउँछ।', own: 'मेकानिक बोलाउनुहोस्, पर्खनुहोस्, रु. २,०००+ तिर्नुहोस्।', rydGood: true },
              { scenario: 'ठूलो इन्जिन मर्मत चाहियो', ryd: 'RYD ले पूर्ण निःशुल्क सम्हाल्छ। प्रतिस्थापन बाइक दिइन्छ।', own: 'तपाईं रु. ८,०००–१५,००० तिर्नुहुन्छ। दिनौं आम्दानी शून्य।', rydGood: true },
              { scenario: 'दुर्घटना / क्षति', ryd: 'बीमा सहयोग समावेश। RYD ले दावीमा सहायता गर्छ।', own: 'एक्लै बीमा म्यानेज। समय गुम्छ = आम्दानी गुम्छ।', rydGood: true },
              { scenario: 'राइडिंग छोड्नु छ', ryd: 'बाइक फिर्ता। कुनै EMI बाँकी छैन।', own: 'बैंकलाई अझै EMI तिर्नुपर्छ। बाइक घाटामा बेच्ने।', rydGood: true },
              { scenario: 'एक हप्ता तिर्न सकिएन', ryd: 'RYD सँग कुरा गर्नुहोस् — लचिलो सहयोग।', own: 'बैंकले जरिवाना लगाउँछ + क्रेडिट स्कोर बिग्रन्छ।', rydGood: true },
            ]).map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-900">{item.scenario}</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                  <div className="p-3 bg-green-50/50">
                    <p className="text-xs font-bold text-green-700 mb-1">{en ? 'RYD Nepal' : 'RYD Nepal'}</p>
                    <p className="text-xs text-slate-600">{item.ryd}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-red-600 mb-1">{en ? 'Own Bike / Loan' : 'आफ्नो बाइक / लोन'}</p>
                    <p className="text-xs text-slate-600">{item.own}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 11: The Verdict ── */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-primary-900 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              {en ? 'The Bottom Line' : 'निष्कर्ष'}
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              {en ? (
                <>
                  <p>
                    Yes, you pay more than the bike's sticker price over 18 months. The total rent is <strong className="text-white">Rs. {fmt(totalRentPaid)}</strong> vs the bike's price of <strong className="text-white">Rs. {fmt(DATA.bikePrice)}</strong>.
                  </p>
                  <p>
                    But that "extra" <strong className="text-white">Rs. {fmt(totalRentPaid - DATA.bikePrice)}</strong> buys you:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">Zero upfront cost</strong> — you don't need Rs. {fmt(loanDown)}+ to start</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">{totalServicesInPeriod} professional services</strong> worth Rs. {fmt(maintenanceSaved)}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">Insurance support</strong> worth Rs. {fmt(insuranceSaved)}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">24/7 breakdown support</strong> — replacement bike in 30 minutes</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">Welcome kit</strong> worth Rs. {fmt(DATA.sagoonKitValue + DATA.fuelCreditValue)}</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">Start earning from Day 1</strong> — no loan processing delay</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">Zero financial risk</strong> — no EMI, no credit damage if plans change</span></li>
                  </ul>
                  <p className="text-white text-xl font-bold mt-6">
                    After 18 months, you've earned Rs. {fmt(netFirst18MonthsRYD)} in net profit AND you own a bike worth Rs. {fmt(DATA.bikePrice)}. That's Rs. {fmt(netFirst18MonthsRYD + DATA.bikePrice)} of total value — from zero investment.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    हो, तपाईंले १८ महिनामा बाइकको स्टिकर मूल्य भन्दा बढी तिर्नुहुन्छ। कुल भाडा <strong className="text-white">रु. {fmtNe(totalRentPaid)}</strong> vs बाइकको मूल्य <strong className="text-white">रु. {fmtNe(DATA.bikePrice)}</strong>।
                  </p>
                  <p>
                    तर त्यो "अतिरिक्त" <strong className="text-white">रु. {fmtNe(totalRentPaid - DATA.bikePrice)}</strong> ले तपाईंलाई दिन्छ:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">शून्य अग्रिम लागत</strong> — रु. {fmtNe(loanDown)}+ चाहिँदैन</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">{fmtNe(totalServicesInPeriod)} व्यावसायिक सर्भिसहरू</strong> रु. {fmtNe(maintenanceSaved)} मूल्यको</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">बीमा सहायता</strong> रु. {fmtNe(insuranceSaved)} मूल्यको</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">२४/७ ब्रेकडाउन सपोर्ट</strong> — ३० मिनेटमा प्रतिस्थापन बाइक</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">स्वागत किट</strong> रु. {fmtNe(DATA.sagoonKitValue + DATA.fuelCreditValue)} मूल्यको</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">पहिलो दिनबाट कमाउन सुरु</strong> — लोन प्रोसेसिंग ढिलाइ छैन</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> <span><strong className="text-white">शून्य आर्थिक जोखिम</strong> — EMI छैन, क्रेडिट बिग्रिँदैन</span></li>
                  </ul>
                  <p className="text-white text-xl font-bold mt-6">
                    १८ महिनापछि, तपाईंले रु. {fmtNe(netFirst18MonthsRYD)} खुद नाफा कमाउनुभएको छ र रु. {fmtNe(DATA.bikePrice)} मूल्यको बाइक पनि तपाईंको हो। शून्य लगानीबाट कुल मूल्य: रु. {fmtNe(netFirst18MonthsRYD + DATA.bikePrice)}।
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-yellow-100 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-yellow-600" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Real Riders. Real Results.' : 'वास्तविक राइडरहरू। वास्तविक नतिजाहरू।'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {(en ? [
              {
                initial: 'R',
                name: 'Ramesh K.',
                location: 'Balaju, Kathmandu',
                months: '8 months with RYD',
                earnings: 'Rs. 45,000–55,000/month',
                platforms: 'Pathao + InDrive',
                color: 'bg-blue-600',
                quote: '"I had zero savings. RYD gave me a bike the same day I applied. Now I earn more than my previous office job, and in 10 more months the bike will be mine."',
              },
              {
                initial: 'S',
                name: 'Suman T.',
                location: 'Koteshwor, Kathmandu',
                months: '14 months with RYD',
                earnings: 'Rs. 50,000–65,000/month',
                platforms: 'Pathao + Yango',
                color: 'bg-emerald-600',
                quote: '"In 4 more months the bike is mine. Best decision I ever made. No bank would give me a loan without proof of income."',
              },
              {
                initial: 'B',
                name: 'Bikash M.',
                location: 'Chabahil, Kathmandu',
                months: '6 months with RYD',
                earnings: 'Rs. 38,000–48,000/month',
                platforms: 'InDrive + Tootle',
                color: 'bg-purple-600',
                quote: '"Free maintenance every 2 weeks saves me so much money. When my bike had issues at 9 PM, RYD sent a replacement in 20 minutes."',
              },
            ] : [
              {
                initial: 'र',
                name: 'रमेश के.',
                location: 'बालाजु, काठमाडौं',
                months: 'RYD सँग ८ महिना',
                earnings: 'रु. ४५,०००–५५,०००/महिना',
                platforms: 'पाठाओ + इनड्राइभ',
                color: 'bg-blue-600',
                quote: '"मसँग शून्य बचत थियो। RYD ले मैले आवेदन दिएकै दिन बाइक दियो। अब मैले अघिल्लो अफिस जबभन्दा बढी कमाउँछु, र १० महिनापछि बाइक मेरो हुन्छ।"',
              },
              {
                initial: 'सु',
                name: 'सुमन त.',
                location: 'कोटेश्वर, काठमाडौं',
                months: 'RYD सँग १४ महिना',
                earnings: 'रु. ५०,०००–६५,०००/महिना',
                platforms: 'पाठाओ + यांगो',
                color: 'bg-emerald-600',
                quote: '"४ महिनापछि बाइक मेरो हुन्छ। मैले गरेको सबैभन्दा राम्रो निर्णय। कुनै बैंकले आम्दानीको प्रमाण बिना लोन दिँदैनथ्यो।"',
              },
              {
                initial: 'बि',
                name: 'विकाश म.',
                location: 'चाबहिल, काठमाडौं',
                months: 'RYD सँग ६ महिना',
                earnings: 'रु. ३८,०००–४८,०००/महिना',
                platforms: 'इनड्राइभ + टुटल',
                color: 'bg-purple-600',
                quote: '"हरेक २ हप्तामा निःशुल्क मर्मतले मलाई धेरै पैसा बचाउँछ। राती ९ बजे बाइकमा समस्या आउँदा RYD ले २० मिनेटमा प्रतिस्थापन पठायो।"',
              },
            ]).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                <p className="text-slate-700 text-sm leading-relaxed italic flex-1 mb-5">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} text-white font-black text-sm flex items-center justify-center flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 truncate">{t.location} · {t.months}</p>
                    <p className="text-xs text-emerald-600 font-semibold">{t.earnings}</p>
                    <p className="text-xs text-slate-400">{t.platforms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 italic mt-4 text-center">
            {en
              ? 'Names changed for privacy. Earnings based on self-reported data from active RYD Nepal riders.'
              : 'गोपनीयताका लागि नामहरू परिवर्तन गरिएका छन्। आम्दानी सक्रिय RYD Nepal राइडरहरूको स्व-रिपोर्ट डाटामा आधारित।'}
          </p>
        </section>

        {/* ── FAQ Section ── */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-primary-100 p-2 rounded-xl"><Calculator className="w-5 h-5 text-primary" /></div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'Frequently Asked Questions' : 'बारम्बार सोधिने प्रश्नहरू'}
            </h2>
          </div>

          <div className="space-y-3">
            {/* FAQ 1 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? 'How much does it cost to rent a Hero Splendor 125 in Kathmandu?' : 'काठमाडौंमा हिरो स्प्लेन्डर 125 भाडामा लिन कति खर्च लाग्छ?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <p>
                    The RYD Nepal Pro Monthly plan costs <strong>Rs. {fmt(DATA.dailyRent)}/day</strong> (billed at Rs. {fmt(DATA.weeklyRent)}/week). There is <strong>no down payment</strong>, no credit check, and no hidden fees. Your daily rent covers insurance support, free bi-weekly maintenance at our Kapan workshop, and 24/7 breakdown support — all included.
                  </p>
                ) : (
                  <p>
                    RYD Nepal प्रो मासिक योजनाको मूल्य <strong>रु. {fmtNe(DATA.dailyRent)}/दिन</strong> (रु. {fmtNe(DATA.weeklyRent)}/हप्ताको दरले बिल हुन्छ)। <strong>कुनै डाउन पेमेन्ट छैन</strong>, क्रेडिट चेक छैन, र लुकेको शुल्क छैन। दैनिक भाडामा बीमा सहायता, कपन कार्यशालामा निःशुल्क द्वि-साप्ताहिक मर्मत, र २४/७ ब्रेकडाउन सपोर्ट सबै समावेश छ।
                  </p>
                )}
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? 'How much can I earn as a Pathao/InDrive rider?' : 'पाठाओ/इनड्राइभ राइडरको रूपमा म कति कमाउन सक्छु?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <p>
                    Active Kathmandu riders average <strong>Rs. {fmt(DATA.avgGrossDailyEarning)} gross per day</strong> across Pathao, InDrive, Yango, and Tootle. After paying daily fuel (Rs. {fmt(dailyFuel)}) and your RYD rent (Rs. {fmt(DATA.dailyRent)}), your <strong>daily net profit is Rs. {fmt(dailyProfit)}</strong>. Over a {DATA.workingDaysPerMonth}-working-day month, that's <strong>Rs. {fmt(monthlyProfit)}/month</strong> in take-home income — from zero upfront investment.
                  </p>
                ) : (
                  <p>
                    सक्रिय काठमाडौं राइडरहरू पाठाओ, इनड्राइभ, यांगो, र टुटलमा <strong>दैनिक रु. {fmtNe(DATA.avgGrossDailyEarning)} कुल</strong> आम्दानी गर्छन्। दैनिक इन्धन (रु. {fmtNe(dailyFuel)}) र RYD भाडा (रु. {fmtNe(DATA.dailyRent)}) तिरेपछि, तपाईंको <strong>दैनिक खुद नाफा रु. {fmtNe(dailyProfit)}</strong> हुन्छ। {fmtNe(DATA.workingDaysPerMonth)} कार्यदिनको महिनामा, यो <strong>रु. {fmtNe(monthlyProfit)}/महिना</strong> हो — शून्य अग्रिम लगानी बिना।
                  </p>
                )}
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? 'What happens if the bike breaks down?' : 'बाइक बिग्रियो भने के हुन्छ?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <p>
                    RYD Nepal provides <strong>24/7 breakdown support</strong>. Call our team any time — day or night — and a <strong>replacement bike is dispatched within 30 minutes</strong>. All repairs, major or minor, are handled by RYD at zero cost to you. A breakdown never kills a full day of earnings. Compare this to owning your own bike: a major repair can cost Rs. 8,000–15,000 and leave you off the road for days with zero income.
                  </p>
                ) : (
                  <p>
                    RYD Nepal ले <strong>२४/७ ब्रेकडाउन सपोर्ट</strong> प्रदान गर्छ। दिन वा रात जुनसुकै बेला हाम्रो टोलीलाई फोन गर्नुहोस् — <strong>३० मिनेटभित्र प्रतिस्थापन बाइक पठाइनेछ</strong>। साना वा ठूला सबै मर्मत RYD ले तपाईंलाई शून्य लागतमा सम्हाल्छ। ब्रेकडाउनले कहिल्यै पूरा दिनको आम्दानी खत्म गर्दैन। आफ्नै बाइकमा तुलना गर्दा ठूलो मर्मतमा रु. ८,०००–१५,००० लाग्न सक्छ र दिनौं आम्दानी ठप्प हुन्छ।
                  </p>
                )}
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? 'Do I own the bike after 18 months?' : '१८ महिनापछि बाइक मेरो हुन्छ?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <p>
                    Yes. After completing <strong>{DATA.ownershipWeeks} weeks (18 months)</strong> of the Pro plan, <strong>full ownership of the Hero Super Splendor 125cc BS6 is transferred to you</strong> — no extra payment required. The bike's bluebook (vehicle registration) is transferred to your name. You walk away owning an asset worth Rs. {fmt(DATA.bikePrice)} that you've already been earning from for a year and a half.
                  </p>
                ) : (
                  <p>
                    हो। प्रो योजनाको <strong>{fmtNe(DATA.ownershipWeeks)} हप्ता (१८ महिना)</strong> पूरा गरेपछि, <strong>हिरो सुपर स्प्लेन्डर 125cc BS6 को पूर्ण स्वामित्व तपाईंलाई हस्तान्तरण गरिन्छ</strong> — कुनै अतिरिक्त भुक्तानी चाहिँदैन। बाइकको ब्लुबुक (सवारी दर्ता) तपाईंको नाममा सर्छ। डेढ वर्षसम्म कमाइसकेको रु. {fmtNe(DATA.bikePrice)} मूल्यको सम्पत्ति लिएर जानुहुन्छ।
                  </p>
                )}
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? "What if I can't pay rent for a week?" : 'एक हप्ता भाडा तिर्न नसकें भने के हुन्छ?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <p>
                    Life happens — illness, festivals, family emergencies. RYD Nepal offers <strong>flexible support for genuine hardship cases</strong>. Talk to our team directly and we'll work something out. Contrast this with a bank loan: miss one EMI and the bank immediately charges a penalty, reports the default to the credit bureau, and damages your credit score for years. With RYD there's no credit bureau involvement, no penalty fees, and no long-term financial damage.
                  </p>
                ) : (
                  <p>
                    जीवनमा कुराहरू हुन्छन् — बिमारी, चाडपर्व, पारिवारिक आपत्काल। RYD Nepal ले <strong>वास्तविक कठिनाइका केसहरूमा लचिलो सहयोग</strong> प्रदान गर्छ। हाम्रो टोलीसँग सिधै कुरा गर्नुहोस् र हामी समाधान निकाल्छौं। बैंक लोनसँग तुलना गर्नुहोस्: एउटा EMI छुटायो भने बैंकले तुरुन्त जरिवाना लगाउँछ, क्रेडिट ब्यूरोलाई रिपोर्ट गर्छ, र वर्षौंसम्म क्रेडिट स्कोर बिगार्छ। RYD मा क्रेडिट ब्यूरो संलग्नता छैन, जरिवाना शुल्क छैन, र दीर्घकालीन आर्थिक क्षति हुँदैन।
                  </p>
                )}
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>{en ? 'How does RYD compare to a bank loan?' : 'RYD र बैंक लोनको तुलना कसरी गर्ने?'}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {en ? (
                  <>
                    <p className="mb-3">
                      A bank loan requires a <strong>Rs. {fmt(loanDown)} down payment ({Math.round(DATA.loanDownPct * 100)}%)</strong> upfront plus <strong>Rs. {fmt(emi)}/month EMI</strong> for 36 months, a credit check, and 2–4 weeks of processing. RYD requires <strong>zero upfront cost</strong> — you pay Rs. {fmt(DATA.dailyRent)}/day only on days you ride and earn.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-50 rounded-xl p-3">
                        <p className="font-bold text-red-700 mb-1">Bank Loan</p>
                        <ul className="space-y-1 text-slate-600">
                          <li>• Rs. {fmt(loanDown)} down payment</li>
                          <li>• Rs. {fmt(emi)}/month EMI (36 mo)</li>
                          <li>• Credit check required</li>
                          <li>• 2–4 week processing delay</li>
                          <li>• You pay all maintenance</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="font-bold text-green-700 mb-1">RYD Nepal</p>
                        <ul className="space-y-1 text-slate-600">
                          <li>• Rs. 0 upfront</li>
                          <li>• Rs. {fmt(DATA.dailyRent)}/day only</li>
                          <li>• No credit check</li>
                          <li>• Start same or next day</li>
                          <li>• Free maintenance included</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-3">
                      बैंक लोनमा <strong>रु. {fmtNe(loanDown)} डाउन पेमेन्ट ({fmtNe(Math.round(DATA.loanDownPct * 100))}%)</strong> अग्रिम चाहिन्छ, त्यसपछि ३६ महिनासम्म <strong>रु. {fmtNe(emi)}/महिना EMI</strong>, क्रेडिट चेक, र २–४ हप्ता प्रतीक्षा। RYD मा <strong>शून्य अग्रिम लागत</strong> — तपाईं राइड गर्ने र कमाउने दिनमात्र रु. {fmtNe(DATA.dailyRent)}/दिन तिर्नुहुन्छ।
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-50 rounded-xl p-3">
                        <p className="font-bold text-red-700 mb-1">बैंक लोन</p>
                        <ul className="space-y-1 text-slate-600">
                          <li>• रु. {fmtNe(loanDown)} डाउन पेमेन्ट</li>
                          <li>• रु. {fmtNe(emi)}/महिना EMI (३६ महिना)</li>
                          <li>• क्रेडिट चेक चाहिन्छ</li>
                          <li>• २–४ हप्ता प्रोसेसिंग</li>
                          <li>• तपाईं मर्मत तिर्नुहुन्छ</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="font-bold text-green-700 mb-1">RYD Nepal</p>
                        <ul className="space-y-1 text-slate-600">
                          <li>• रु. ० अग्रिम</li>
                          <li>• रु. {fmtNe(DATA.dailyRent)}/दिन मात्र</li>
                          <li>• क्रेडिट चेक छैन</li>
                          <li>• उही/अर्को दिन सुरु</li>
                          <li>• निःशुल्क मर्मत समावेश</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </details>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              {en ? 'Ready to Start Earning?' : 'कमाउन तयार हुनुहुन्छ?'}
            </h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              {en
                ? `Get your Hero Super Splendor 125cc BS6 today. Rs. ${fmt(DATA.dailyRent)}/day. Free maintenance every 2 weeks. Own it after 1.5 years. No down payment. No credit check.`
                : `आज नै हिरो सुपर स्प्लेन्डर 125cc BS6 लिनुहोस्। दिनको रु. ${fmtNe(DATA.dailyRent)}। हरेक २ हप्तामा निःशुल्क सर्भिस। १.५ वर्षपछि आफ्नो। डाउन पेमेन्ट छैन। क्रेडिट चेक छैन।`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-xl inline-flex items-center justify-center gap-2">
                {en ? 'Apply Now' : 'आवेदन दिनुहोस्'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
                {en ? 'View All Plans' : 'सबै योजनाहरू'} <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="text-xs text-slate-400 border-t border-slate-100 pt-6 space-y-1">
          <p className="font-bold text-slate-500">{en ? 'Data Sources (April 2026):' : 'डाटा स्रोतहरू (चैत्र २०८२):'}</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>{en ? 'Hero Super Splendor 125cc BS6 price: Rs. 2,66,900 — ' : 'हिरो सुपर स्प्लेन्डर 125cc BS6 मूल्य: रु. २,६६,९०० — '}CG Motors Nepal / Nepal Drives / TechLekh</li>
            <li>{en ? 'Petrol price: Rs. 202/litre — ' : 'पेट्रोल मूल्य: रु. २०२/लिटर — '}Nepal Oil Corporation (April 2026)</li>
            <li>{en ? 'Real-world mileage: 55 km/l — ' : 'वास्तविक माइलेज: ५५ km/l — '}BikeWale / 91Wheels owner reports</li>
            <li>{en ? 'Rider earnings: Pathao, InDrive, Yango, Tootle — ' : 'राइडर आम्दानी: पाठाओ, इनड्राइभ, यांगो, टुटल — '}Motar Company Nepal / ICT Frame / Kathmandu Post</li>
            <li>{en ? 'Bike loan interest: 7.7–13.2% — ' : 'बाइक लोन ब्याज: ७.७–१३.२% — '}AtalAuto / Hulas Finserv / Nepal bank rates 2025-2026</li>
            <li>{en ? 'Commission rates: Pathao 15-20%, InDrive 10%, Yango 3% — ' : 'कमिशन दरहरू: पाठाओ १५-२०%, इनड्राइभ १०%, यांगो ३% — '}Motar Company Nepal / GulmiResunga</li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default Blog;
