import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Zap, Bike, TrendingUp,
  Wallet, CheckCircle, MapPin, Phone, Mail, Star, ShieldCheck, Wrench,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const URL = 'https://www.rydnepal.com/blog/bike-rental-kathmandu-uber-pathao-indrive';

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with prerender.mjs);
// qNe/aNe render when the reader switches to Nepali.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'How much does it cost to rent a bike in Kathmandu per day?',
    a: 'Bike rental at RYD Nepal starts at Rs. 700/day on the prepayment plan (Rs. 21,000/month). Weekly is Rs. 5,600 and the rent-to-own Pro Monthly plan is Rs. 7,000/week.',
    qNe: 'काठमाडौंमा दिनको बाइक भाडा कति पर्छ?',
    aNe: 'RYD Nepal मा बाइक भाडा प्रिपेमेन्ट योजनामा दिनको रु. ७०० बाट सुरु हुन्छ (रु. २१,०००/महिना)। साप्ताहिक रु. ५,६०० र भाडामा-लिएर-आफ्नो बनाउने प्रो मासिक योजना रु. ७,०००/हप्ता हो।',
  },
  {
    q: 'Can I rent a bike to ride for Uber in Kathmandu?',
    a: 'Yes. Uber launched Uber Bike in Kathmandu in June 2026. A RYD Nepal rental works for Uber Bike as well as Pathao, InDrive, Yango, and Tootle. One bike, all platforms.',
    qNe: 'के म काठमाडौंमा उबर चलाउन बाइक भाडामा लिन सक्छु?',
    aNe: 'सक्नुहुन्छ। उबरले जुन २०२६ मा काठमाडौंमा उबर बाइक सुरु गर्‍यो। RYD Nepal को भाडा उबर बाइकका साथै पाठाओ, इनड्राइभ, यांगो र टुटलका लागि पनि काम गर्छ। एउटै बाइक, सबै प्लेटफर्म।',
  },
  {
    q: 'How much does a Pathao rider earn in Nepal?',
    a: 'Active Pathao riders in Kathmandu typically earn Rs. 40,000 to 60,000 per month. After Rs. 700/day rent and fuel, most RYD Nepal riders net Rs. 700 to 1,700 in profit per day.',
    qNe: 'नेपालमा पाठाओ राइडरले कति कमाउँछ?',
    aNe: 'काठमाडौंका सक्रिय पाठाओ राइडरले सामान्यतया महिनाको रु. ४०,००० देखि ६०,००० कमाउँछन्। रु. ७००/दिन भाडा र इन्धनपछि, धेरैजसो RYD Nepal राइडरले दिनको रु. ७०० देखि १,७०० खुद नाफा गर्छन्।',
  },
  {
    q: 'Do I need a down payment or a loan?',
    a: 'No. There is zero down payment, no bank loan, and no credit check. You pay daily, weekly, or monthly and start earning immediately.',
    qNe: 'के मलाई डाउन पेमेन्ट वा लोन चाहिन्छ?',
    aNe: 'पर्दैन। शून्य डाउन पेमेन्ट, बैंक ऋण छैन, र क्रेडिट चेक छैन। तपाईं दैनिक, साप्ताहिक वा मासिक तिर्नुहुन्छ र तुरुन्तै कमाउन सुरु गर्नुहुन्छ।',
  },
  {
    q: 'Can I rent a bike for food delivery in Kathmandu?',
    a: 'Yes. The same rental works for delivery and ride-sharing platforms across Kathmandu Valley.',
    qNe: 'के म काठमाडौंमा खाना डेलिभरीका लागि बाइक भाडामा लिन सक्छु?',
    aNe: 'सक्नुहुन्छ। उही भाडा काठमाडौं उपत्यकाभरि डेलिभरी र राइड-सेयरिङ प्लेटफर्महरूका लागि काम गर्छ।',
  },
  {
    q: 'Do you provide flat-tire and breakdown assistance?',
    a: 'Yes, 24/7 across Kathmandu Valley, with a replacement bike dispatched within 30 minutes.',
    qNe: 'के तपाईंहरू फ्ल्याट-टायर र ब्रेकडाउन सहायता दिनुहुन्छ?',
    aNe: 'दिन्छौं, काठमाडौं उपत्यकाभरि २४/७, ३० मिनेटभित्र रिप्लेसमेन्ट बाइक पठाइन्छ।',
  },
  {
    q: 'Will I own the bike?',
    a: 'On the Pro Monthly plan, the Hero Super Splendor 125cc is yours after 1.5 years of rental payments.',
    qNe: 'के बाइक मेरो आफ्नै हुन्छ?',
    aNe: 'प्रो मासिक योजनामा, १.५ वर्षको भाडा भुक्तानीपछि हिरो सुपर स्प्लेन्डर 125cc तपाईंको आफ्नै हुन्छ।',
  },
];

const QUICK_FACTS: [string, string][] = [
  ['Bike rent from Rs. 700/day', 'दिनको रु. ७०० देखि बाइक भाडा'],
  ['Earn Rs. 40,000 to 60,000/month', 'महिनाको रु. ४०,००० देखि ६०,००० कमाउनुहोस्'],
  ['Zero down payment, free maintenance', 'शून्य डाउन पेमेन्ट, निःशुल्क मर्मत'],
  ['Own the bike after 1.5 years', '१.५ वर्षपछि बाइक आफ्नै'],
];

const PRICE_ROWS: [string, string, string, string, string, string][] = [
  // [plan EN, price EN, incl EN, plan NE, price NE, incl NE]
  ['Weekly', 'Rs. 5,600/week', 'Hero Super Splendor 125cc, Sagoon welcome kit, routine service', 'साप्ताहिक', 'रु. ५,६००/हप्ता', 'हिरो सुपर स्प्लेन्डर 125cc, सगुन वेलकम किट, नियमित सर्भिस'],
  ['Pro Monthly', 'Rs. 7,000/week', 'Own the bike after 1.5 years, all servicing included', 'प्रो मासिक', 'रु. ७,०००/हप्ता', '१.५ वर्षपछि बाइक आफ्नै, सबै सर्भिसिङ समावेश'],
  ['Prepayment', 'Rs. 21,000/month (Rs. 700/day)', 'Pay upfront and save, all servicing included', 'प्रिपेमेन्ट', 'रु. २१,०००/महिना (रु. ७००/दिन)', 'अग्रिम तिरेर बचत गर्नुहोस्, सबै सर्भिसिङ समावेश'],
];

const EARN_ROWS: [string, string, string][] = [
  // [platform, range EN, range NE]
  ['Pathao', 'Rs. 40,000 to 60,000', 'रु. ४०,००० देखि ६०,०००'],
  ['InDrive', 'Rs. 35,000 to 55,000', 'रु. ३५,००० देखि ५५,०००'],
  ['Yango', 'Rs. 35,000 to 55,000', 'रु. ३५,००० देखि ५५,०००'],
  ['Uber Bike', 'New platform, a fresh earning stream in Kathmandu', 'नयाँ प्लेटफर्म, काठमाडौंमा नयाँ कमाइको स्रोत'],
  ['Tootle', 'Rs. 30,000 to 50,000', 'रु. ३०,००० देखि ५०,०००'],
];

const STEPS: [string, string, string, string][] = [
  ['Register & apply', 'Bring your driving license and citizenship copy to our Kapan office (Dhalane Pul), or apply online. Takes under 30 minutes.', 'दर्ता र आवेदन', 'आफ्नो सवारी चालक अनुमतिपत्र र नागरिकताको प्रतिलिपि हाम्रो कपन कार्यालय (ढलाने पुल) मा ल्याउनुहोस्, वा अनलाइन आवेदन दिनुहोस्। ३० मिनेटभन्दा कम लाग्छ।'],
  ['Verify & collect', 'We verify your documents and hand over a well-maintained Hero Super Splendor 125cc with a Rs. 1,500 fuel coupon.', 'प्रमाणीकरण र संकलन', 'हामी तपाईंका कागजात प्रमाणित गर्छौं र रु. १,५०० इन्धन कुपनसहित राम्ररी मर्मत गरिएको हिरो सुपर स्प्लेन्डर 125cc हस्तान्तरण गर्छौं।'],
  ['Start earning today', 'Collect your free Sagoon kit and start riding on Uber, Pathao, InDrive, Yango, or Tootle the same day.', 'आजै कमाउन सुरु गर्नुहोस्', 'आफ्नो निःशुल्क सगुन किट लिनुहोस् र उही दिन उबर, पाठाओ, इनड्राइभ, यांगो वा टुटलमा चलाउन सुरु गर्नुहोस्।'],
];

const BENEFITS: [React.ComponentType<{ className?: string }>, string, string][] = [
  [Star, '500+ active riders already earning in Kathmandu', 'काठमाडौंमा ५००+ सक्रिय राइडर पहिले नै कमाउँदै'],
  [Bike, '120+ bikes in our fleet', 'हाम्रो फ्लिटमा १२०+ बाइक'],
  [CheckCircle, 'Free Sagoon welcome kit worth Rs. 3,000+ (helmet, phone mount, raincoat, Rs. 1,500 fuel credit)', 'रु. ३,०००+ मूल्यको निःशुल्क सगुन वेलकम किट (हेलमेट, फोन माउन्ट, रेनकोट, रु. १,५०० इन्धन क्रेडिट)'],
  [Wrench, 'Free maintenance, oil changes, brakes, tires, all included', 'निःशुल्क मर्मत, मोबिल परिवर्तन, ब्रेक, टायर, सबै समावेश'],
  [ShieldCheck, '24/7 breakdown and flat-tire assistance anywhere in Kathmandu Valley, replacement bike within 30 minutes', 'काठमाडौं उपत्यका जहाँसुकै २४/७ ब्रेकडाउन र फ्ल्याट-टायर सहायता, ३० मिनेटभित्र रिप्लेसमेन्ट बाइक'],
  [CheckCircle, 'Insurance support, we handle the claims paperwork', 'बीमा सहायता, दावीको कागजी प्रक्रिया हामी सम्हाल्छौं'],
  [TrendingUp, 'Path to ownership after 1.5 years', '१.५ वर्षपछि स्वामित्वको बाटो'],
];

const BlogUberPathao: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'Bike Rental in Kathmandu for Uber, Pathao & InDrive: Rent from Rs. 700/Day | RYD Nepal'
      : 'काठमाडौंमा उबर, पाठाओ र इनड्राइभका लागि बाइक भाडामा: दिनको रु. ७०० देखि | RYD Nepal',
    description: en
      ? 'Uber just launched in Kathmandu with Uber Bike. Rent a bike in Kathmandu from RYD Nepal for Rs. 700/day, no loan, no down payment, and earn Rs. 40,000 to 60,000/month on Uber, Pathao, InDrive & Yango. Own the bike after 1.5 years.'
      : 'उबर अब काठमाडौंमा उबर बाइक सहित आइसक्यो। RYD Nepal बाट दिनको रु. ७०० मा बाइक भाडामा लिनुहोस्, लोन छैन, डाउन पेमेन्ट छैन, र उबर, पाठाओ, इनड्राइभ र यांगोमा महिनाको रु. ४०,००० देखि ६०,००० कमाउनुहोस्। १.५ वर्षपछि बाइक आफ्नै।',
    keywords:
      'bike rental kathmandu, bike rent in kathmandu, rent bike kathmandu, bike rent kathmandu price per day, rent bike for Uber Nepal, Uber Bike Kathmandu, how much does pathao rider earn in nepal, scooter rental kathmandu, bike rental for delivery, rent to own bike nepal, RYD Nepal',
    path: '/blog/bike-rental-kathmandu-uber-pathao-indrive',
    ogType: 'article',
    ogTitle: 'Uber Is Live in Kathmandu. Rent a Bike for Rs. 700/Day and Start Earning.',
    ogDescription:
      'Uber, Pathao, InDrive and Yango are now competing for riders in Kathmandu. Rent a Hero Super Splendor 125cc from Rs. 700/day, zero down payment, own it after 1.5 years.',
    ogImage: 'https://www.rydnepal.com/og/bike-rental-uber-pathao.webp',
    datePublished: '2026-06-14',
    dateModified: '2026-06-14',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive', url: URL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Bike Rental in Kathmandu for Uber, Pathao & InDrive: Rent from Rs. 700/Day',
        description:
          'Uber launched Uber Bike in Kathmandu in June 2026. How to rent a bike in Kathmandu from Rs. 700/day and earn on Uber, Pathao, InDrive, Yango and Tootle with zero investment.',
        image: 'https://www.rydnepal.com/og/bike-rental-uber-pathao.webp',
        mainEntityOfPage: URL,
        author: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: 'https://www.rydnepal.com' },
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://www.rydnepal.com',
          logo: { '@type': 'ImageObject', url: 'https://www.rydnepal.com/logo.png' },
        },
        datePublished: '2026-06-14',
        dateModified: '2026-06-14',
        inLanguage: ['en', 'ne'],
        about: [
          { '@type': 'Thing', name: 'Bike Rental Kathmandu' },
          { '@type': 'Thing', name: 'Uber Bike Nepal' },
          { '@type': 'Thing', name: 'Ride Sharing Kathmandu' },
          { '@type': 'Thing', name: 'Rent to Own Bike Nepal' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Uber' },
          { '@type': 'Organization', name: 'Pathao' },
          { '@type': 'Organization', name: 'InDrive' },
          { '@type': 'Organization', name: 'Yango' },
          { '@type': 'Organization', name: 'Tootle' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {en ? 'Back to Blog' : 'ब्लगमा फर्कनुहोस्'}
          </Link>
          <div className="flex items-center space-x-2 text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog · Uber Is Live in Kathmandu' : 'RYD Nepal ब्लग · उबर अब काठमाडौंमा'}</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ne')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${!en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              नेपाली
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
            {en ? (
              <>Bike Rental in Kathmandu for <span className="text-primary">Uber, Pathao &amp; InDrive</span>: Rent from Rs. 700/Day</>
            ) : (
              <>काठमाडौंमा <span className="text-primary">उबर, पाठाओ र इनड्राइभ</span>का लागि बाइक भाडामा: दिनको रु. ७०० देखि</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'Uber has officially launched in Kathmandu, and it brought Uber Bike with it. For the first time, four major ride-hailing platforms are competing for riders in the Valley at once: Uber, Pathao, InDrive, and Yango. The demand for two-wheeler riders has never been higher. The only thing standing between most people and that income is owning a bike.'
              : 'उबर अब आधिकारिक रूपमा काठमाडौंमा सुरु भएको छ, उबर बाइक सहित। पहिलो पटक, चारवटा प्रमुख राइड-हेलिङ प्लेटफर्महरू एकैसाथ उपत्यकामा राइडरका लागि प्रतिस्पर्धा गर्दैछन्: उबर, पाठाओ, इनड्राइभ र यांगो। दुई पाङ्ग्रे राइडरको माग कहिल्यै यति धेरै थिएन। धेरैजसो मानिस र यो आम्दानीको बीचमा भएको एउटै कुरा हो: आफ्नो बाइक।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: June 14, 2026' : 'प्रकाशित: २०२६ जुन १४'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {en ? '8 min read' : '८ मिनेट पठन'}
            </span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Ride-Sharing & Earnings' : 'राइड-सेयरिङ र कमाइ'}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {en ? (
            <>That is exactly what <strong>RYD Nepal</strong> solves. Rent a{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">Hero Super Splendor 125cc in Kathmandu from Rs. 700/day</Link>,
              no loan, no down payment, no credit check, and start earning the same day. Pick up from our Kapan workshop near Ring Road.</>
          ) : (
            <><strong>RYD Nepal</strong> ले ठ्याक्कै यही समस्या समाधान गर्छ। काठमाडौंमा{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">हिरो सुपर स्प्लेन्डर 125cc दिनको रु. ७०० मा</Link>{' '}
              भाडामा लिनुहोस्, लोन छैन, डाउन पेमेन्ट छैन, क्रेडिट चेक छैन, र उही दिन कमाउन सुरु गर्नुहोस्। रिङरोड नजिकैको हाम्रो कपन वर्कशपबाट लिनुहोस्।</>
          )}
        </p>

        {/* Quick facts */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wide mb-3">{en ? 'Quick facts' : 'मुख्य कुराहरू'}</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            {QUICK_FACTS.map(([eng, nep], i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{en ? eng : nep}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why now */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Why now is the best time to rent a bike in Kathmandu' : 'किन अहिले काठमाडौंमा बाइक भाडामा लिने उत्तम समय हो'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? "In June 2026, Uber officially entered the Nepali market, going live in Kathmandu after a soft launch in late May. Alongside its car options (Uber Go and Uber Comfort), it launched Uber Bike, a two-wheeler ride service built for Kathmandu's traffic."
            : 'जुन २०२६ मा, उबर आधिकारिक रूपमा नेपाली बजारमा प्रवेश गर्‍यो, मे महिनाको अन्त्यतिर सफ्ट लन्च गरेपछि काठमाडौंमा सञ्चालनमा आयो। कार विकल्पहरू (उबर गो र उबर कम्फर्ट) सँगै, यसले उबर बाइक सुरु गर्‍यो, काठमाडौंको ट्राफिकका लागि बनाइएको दुई पाङ्ग्रे राइड सेवा।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">{en ? 'Here is why that matters if you are thinking about renting a bike:' : 'यदि तपाईं बाइक भाडामा लिने सोच्दै हुनुहुन्छ भने यो किन महत्त्वपूर्ण छ:'}</p>
        <ul className="space-y-3 mb-4 text-slate-600">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Four platforms now compete for riders.</strong> Uber joins Pathao, InDrive, and Yango. When platforms compete, riders win: more ride requests, more incentives, more ways to fill your day.</> : <><strong>अब चार प्लेटफर्म राइडरका लागि प्रतिस्पर्धा गर्छन्।</strong> उबर पाठाओ, इनड्राइभ र यांगोसँग जोडिन्छ। जब प्लेटफर्महरू प्रतिस्पर्धा गर्छन्, राइडरले फाइदा पाउँछन्: बढी राइड अनुरोध, बढी प्रोत्साहन, दिन भर्ने बढी उपाय।</>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Uber Bike means demand for two-wheelers specifically.</strong> This is exactly the work a RYD Nepal rental is built for.</> : <><strong>उबर बाइकको अर्थ विशेष गरी दुई पाङ्ग्रेको माग हो।</strong> RYD Nepal को भाडा ठ्याक्कै यही कामका लागि बनेको हो।</>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Early riders capture the most.</strong> New platforms invest heavily in their launch phase to grow their rider base. The people already on the road when demand surges are the ones who benefit first.</> : <><strong>सुरुका राइडरले सबैभन्दा बढी फाइदा लिन्छन्।</strong> नयाँ प्लेटफर्महरूले आफ्नो राइडर आधार बढाउन लन्च चरणमा धेरै लगानी गर्छन्। माग बढ्दा सडकमा पहिले नै भएकाहरूले नै पहिलो फाइदा पाउँछन्।</>}</span></li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'When a global giant enters the market, the riders who already have a bike cash in. The ones still saving up to buy one miss the window.'
            : 'जब कुनै विश्वव्यापी ठूलो कम्पनी बजारमा आउँछ, पहिले नै बाइक भएका राइडरले फाइदा उठाउँछन्। बाइक किन्न पैसा जम्मा गर्दै बस्नेहरूले अवसर गुमाउँछन्।'}
        </p>

        {/* Price table */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'How much does a bike rental cost in Kathmandu? (Price per day)' : 'काठमाडौंमा बाइक भाडा कति पर्छ? (दिनको मूल्य)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">{en ? 'Straightforward, all-in pricing. No hidden fees, no deposit traps:' : 'सरल, सबै समावेश मूल्य। कुनै लुकेको शुल्क छैन, कुनै डिपोजिट जाल छैन:'}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Plan' : 'योजना'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Price' : 'मूल्य'}</th>
                <th className="text-left p-4 font-bold">{en ? "What's included" : 'के समावेश छ'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {PRICE_ROWS.map(([pe, pre, ie, pn, prn, ien], i) => (
                <tr key={i} className={i === 1 ? 'bg-primary-50/40' : ''}>
                  <td className="p-4 font-semibold text-slate-900">{en ? pe : pn}</td>
                  <td className="p-4">{en ? pre : prn}</td>
                  <td className="p-4">{en ? ie : ien}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? "Every plan includes free maintenance at our Kapan workshop, insurance support, and 24/7 breakdown assistance. Bike rent in Kathmandu starts at just Rs. 700/day, less than a single good day's earnings on any platform."
            : 'हरेक योजनामा हाम्रो कपन वर्कशपमा निःशुल्क मर्मत, बीमा सहायता, र २४/७ ब्रेकडाउन सहायता समावेश छ। काठमाडौंमा बाइक भाडा दिनको रु. ७०० बाट सुरु हुन्छ, जुन कुनै पनि प्लेटफर्ममा एक राम्रो दिनको कमाइभन्दा कम हो।'}
        </p>

        {/* Earnings */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'How much can you earn? (How much does a Pathao rider earn in Nepal?)' : 'तपाईं कति कमाउन सक्नुहुन्छ? (नेपालमा पाठाओ राइडरले कति कमाउँछ?)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">{en ? 'This is the question every new rider asks. Here is the honest breakdown across all four platforms in Kathmandu:' : 'यो प्रश्न हरेक नयाँ राइडरले सोध्छ। काठमाडौंका चारै प्लेटफर्मको इमानदार विवरण यहाँ छ:'}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr><th className="text-left p-4 font-bold">{en ? 'Platform' : 'प्लेटफर्म'}</th><th className="text-left p-4 font-bold">{en ? 'Monthly earning range' : 'मासिक कमाइ दायरा'}</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {EARN_ROWS.map(([plat, re, rn], i) => (
                <tr key={i}><td className="p-4 font-semibold text-slate-900">{plat}</td><td className="p-4">{en ? re : rn}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
          <p className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" /> {en ? 'The daily math, with real numbers' : 'दैनिक हिसाब, वास्तविक संख्यासहित'}</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>{en ? 'Gross earnings: about Rs. 2,000/day on Pathao, InDrive, or Yango' : 'कुल कमाइ: पाठाओ, इनड्राइभ वा यांगोमा दिनको करिब रु. २,०००'}</li>
            <li>{en ? 'Fuel: about Rs. 367/day (100 km at 55 km/l, petrol about Rs. 202/litre)' : 'इन्धन: दिनको करिब रु. ३६७ (५५ किमि/लिटरमा १०० किमि, पेट्रोल करिब रु. २०२/लिटर)'}</li>
            <li>{en ? 'Bike rent: Rs. 700/day' : 'बाइक भाडा: रु. ७००/दिन'}</li>
            <li className="font-bold text-slate-900">{en ? 'Net profit: Rs. 700 to 1,700 every single day' : 'खुद नाफा: हरेक दिन रु. ७०० देखि १,७००'}</li>
          </ul>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? "Your rent is fixed. Your earning ceiling just went up with Uber's arrival, because with multiple apps open at once, you spend less time waiting and more time on paid rides."
            : 'तपाईंको भाडा निश्चित छ। उबरको आगमनसँगै तपाईंको कमाइको सीमा बढेको छ, किनभने एकैसाथ धेरै एप खुला राख्दा, तपाईं पर्खाइमा कम र पैसा कमाउने राइडमा बढी समय बिताउनुहुन्छ।'}
        </p>

        {/* Buy vs rent */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Why buying a bike does not make sense (and renting does)' : 'किन बाइक किन्नुको अर्थ छैन (र भाडामा लिनुको छ)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'A new Hero Super Splendor 125cc BS6 costs around Rs. 2,66,900 in Nepal. To buy one outright takes years of saving. A bank loan means a down payment, a credit check, paperwork, and EMIs that start before you have earned a rupee.'
            : 'नेपालमा नयाँ हिरो सुपर स्प्लेन्डर 125cc BS6 को मूल्य करिब रु. २,६६,९०० पर्छ। एकमुष्ट किन्न वर्षौंको बचत चाहिन्छ। बैंक ऋण भनेको डाउन पेमेन्ट, क्रेडिट चेक, कागजी प्रक्रिया, र एक रुपैयाँ नकमाउँदै सुरु हुने EMI हो।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en ? 'By the time most people can afford their own bike, the launch-phase opportunity is gone.' : 'धेरैजसो मानिसले आफ्नै बाइक किन्न सक्ने हुँदासम्म, लन्च चरणको अवसर सकिइसकेको हुन्छ।'}
        </p>
        <p className="text-slate-700 font-semibold mb-3">{en ? "RYD Nepal's rent-to-own model removes every barrier:" : 'RYD Nepal को भाडामा-लिएर-आफ्नो बनाउने मोडेलले हरेक बाधा हटाउँछ:'}</p>
        <ul className="space-y-3 mb-4 text-slate-600">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <>Ride now, pay daily from Rs. 700, <strong>zero upfront cost</strong></> : <>अहिले नै चलाउनुहोस्, दिनको रु. ७०० बाट तिर्नुहोस्, <strong>कुनै अग्रिम खर्च छैन</strong></>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? 'No loan, no credit check, no down payment' : 'लोन छैन, क्रेडिट चेक छैन, डाउन पेमेन्ट छैन'}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? 'Free servicing every 1,500 km at our Kapan workshop' : 'हाम्रो कपन वर्कशपमा हरेक १,५०० किमिमा निःशुल्क सर्भिसिङ'}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Own the Hero Super Splendor after 1.5 years</strong> on the Pro plan</> : <>प्रो योजनामा <strong>१.५ वर्षपछि हिरो सुपर स्प्लेन्डर आफ्नै</strong></>}</span></li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'After 18 months on the Pro plan, you have earned an income and you own a Rs. 2,66,900 bike, from zero investment.'
            : 'प्रो योजनामा १८ महिनापछि, तपाईंले आम्दानी पनि गर्नुभयो र शून्य लगानीबाट रु. २,६६,९०० को बाइक पनि आफ्नो बनाउनुभयो।'}
        </p>

        {/* All in one */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Bike rental for delivery and ride-sharing, all in one' : 'डेलिभरी र राइड-सेयरिङ दुवैका लागि बाइक भाडा, एकैमा'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">{en ? 'A RYD Nepal bike is not limited to one app. The same rental works for:' : 'RYD Nepal को बाइक एउटै एपमा सीमित छैन। उही भाडा यीका लागि काम गर्छ:'}</p>
        <ul className="space-y-3 mb-12 text-slate-600">
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Ride-sharing:</strong> Uber Bike, Pathao, InDrive, Yango, Tootle</> : <><strong>राइड-सेयरिङ:</strong> उबर बाइक, पाठाओ, इनड्राइभ, यांगो, टुटल</>}</span></li>
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Food and parcel delivery:</strong> run delivery on the platforms that need riders</> : <><strong>खाना र पार्सल डेलिभरी:</strong> राइडर चाहिने प्लेटफर्महरूमा डेलिभरी गर्नुहोस्</>}</span></li>
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Personal use:</strong> it is your bike to ride</> : <><strong>व्यक्तिगत प्रयोग:</strong> यो तपाईंकै चलाउने बाइक हो</>}</span></li>
        </ul>

        {/* What you get */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'What you get with RYD Nepal' : 'RYD Nepal सँग तपाईंले के पाउनुहुन्छ'}</h2>
        <ul className="space-y-3 mb-8 text-slate-600">
          {BENEFITS.map(([Icon, eng, nep], i) => (
            <li key={i} className="flex gap-3"><Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? eng : nep}</span></li>
          ))}
        </ul>
        <blockquote className="border-l-4 border-primary bg-slate-50 rounded-r-2xl p-6 mb-12 text-slate-700 italic">
          {en
            ? '“I had a flat tire in Balaju at 8 PM and they sent a replacement bike within 40 minutes. No other motorcycle rental in Kathmandu does this.”'
            : '“मेरो बालाजुमा बेलुका ८ बजे टायर पन्चर भयो र उनीहरूले ४० मिनेटभित्र रिप्लेसमेन्ट बाइक पठाए। काठमाडौंमा अरू कुनै मोटरसाइकल भाडा सेवाले यसो गर्दैन।”'}
          <span className="block mt-2 not-italic text-sm font-semibold text-slate-500">{en ? 'Binod Rai, InDrive partner, Kathmandu' : 'विनोद राई, इनड्राइभ पार्टनर, काठमाडौं'}</span>
        </blockquote>

        {/* Steps */}
        <h2 className="text-2xl font-black text-slate-900 mb-6">{en ? 'How to rent a bike in Kathmandu, 3 steps' : 'काठमाडौंमा बाइक कसरी भाडामा लिने, ३ चरण'}</h2>
        <div className="space-y-4 mb-12">
          {STEPS.map(([te, de, tn, dn], i) => (
            <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center">{i + 1}</div>
              <div>
                <p className="font-bold text-slate-900">{en ? te : tn}</p>
                <p className="text-slate-600 text-sm leading-relaxed mt-1">{en ? de : dn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-slate-900 mb-6">{en ? 'Frequently asked questions' : 'बारम्बार सोधिने प्रश्नहरू'}</h2>
        <div className="space-y-4 mb-12">
          {FAQ.map((item, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-slate-200 p-6 open:shadow-sm transition-all" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-900 list-none">
                <span>{en ? item.q : item.qNe}</span>
                <span className="ml-4 flex-shrink-0 text-primary transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{en ? item.a : item.aNe}</p>
            </details>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">{en ? 'Rent your bike today. Uber is here, the riders are signing up.' : 'आजै बाइक भाडामा लिनुहोस्। उबर आइसक्यो, राइडरहरू दर्ता हुँदैछन्।'}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            {en
              ? 'Uber’s arrival is the kind of moment that creates a few winners and a lot of “I wish I had started earlier.” The winners are the riders already on the road when demand surges. You do not need to buy. You do not need a loan. You need a bike on the road this week.'
              : 'उबरको आगमन यस्तो क्षण हो जसले केही विजेता र धेरै “मैले पहिले नै सुरु गरेको भए हुन्थ्यो” बनाउँछ। विजेता भनेका माग बढ्दा सडकमा पहिले नै भएका राइडर हुन्। तपाईंले किन्नु पर्दैन। तपाईंलाई लोन चाहिँदैन। तपाईंलाई यही हप्ता सडकमा एउटा बाइक चाहिन्छ।'}
          </p>
          <p className="text-white font-semibold mb-8">
            {en
              ? 'Rent a Hero Super Splendor 125cc from RYD Nepal for Rs. 700/day, earn on Uber, Pathao, InDrive, Yango & Tootle the same day, and own the bike after 1.5 years.'
              : 'RYD Nepal बाट हिरो सुपर स्प्लेन्डर 125cc दिनको रु. ७०० मा भाडामा लिनुहोस्, उही दिन उबर, पाठाओ, इनड्राइभ, यांगो र टुटलमा कमाउनुहोस्, र १.५ वर्षपछि बाइक आफ्नो बनाउनुहोस्।'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all inline-flex items-center justify-center gap-2">
              {en ? 'Apply Now' : 'अहिले आवेदन दिनुहोस्'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center">
              {en ? 'See All Rental Prices' : 'सबै भाडा मूल्य हेर्नुहोस्'}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-left text-sm text-slate-300 max-w-xl mx-auto">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary flex-shrink-0" /> {en ? 'Dhalane Pul, Kapan, Kathmandu' : 'ढलाने पुल, कपन, काठमाडौं'}</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary flex-shrink-0" /> +977-9709197877</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary flex-shrink-0" /> support@rydnepal.com</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary flex-shrink-0" /> {en ? 'Sunday to Friday, 9 AM to 6 PM' : 'आइतबार देखि शुक्रबार, बिहान ९ देखि बेलुका ६ बजे'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogUberPathao;
