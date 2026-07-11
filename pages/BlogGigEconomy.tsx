import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Wallet, Clock, MapPin, Phone, MessageCircle,
  CheckCircle, XCircle, Bike, TrendingUp, Star, Instagram, Facebook,
  Calendar, Zap, Briefcase, ShieldCheck, Banknote, Landmark, Coins,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const SOCIAL = {
  tiktok: 'https://www.tiktok.com/@ryd.nepal',
  facebook: 'https://www.facebook.com/rydnp2025',
  instagram: 'https://www.instagram.com/ryd.nepal/',
  whatsapp: 'https://wa.me/9779709197877?text=Hello%20RYD%20Nepal%2C%20I%27m%20interested%20in%20renting%20a%20bike.',
  phone: 'tel:+9779709197877',
};

const BlogGigEconomy: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'How Much Do Pathao & InDrive Riders Earn in Kathmandu? (2026 Guide)'
      : 'काठमाडौंमा Pathao र InDrive राइडरले कति कमाउँछन्? (२०२६ गाइड)',
    description: en
      ? 'A practical 2026 guide to the ride-sharing gig economy in Kathmandu. How much riders earn, how the new national budget treats ride-sharing, and how to start with zero investment by renting a Hero Super Splendor 125cc from RYD Nepal at Rs. 700 a day.'
      : 'काठमाडौंको राइड-सेयरिङ गिग इकोनोमीको २०२६ को व्यावहारिक गाइड। राइडरले कति कमाउँछन्, नयाँ राष्ट्रिय बजेटले राइड-सेयरिङलाई कसरी हेर्छ, र RYD Nepal बाट दिनको रु. ७०० मा हिरो सुपर स्प्लेन्डर 125cc भाडामा लिएर कसरी शून्य लगानीमा सुरु गर्ने।',
    keywords:
      'gig economy kathmandu, ride sharing nepal, bike rental kathmandu, bike rental nepal, rent bike kathmandu, rent a bike in kathmandu, bike rent in kathmandu, bike rent in ktm, ryd nepal, ryd, ride now pvt ltd, pathao rider earning nepal, indrive rider nepal, yango rider kathmandu, tootle rider, work today get paid today, daily payout gig nepal, rent to own bike kathmandu, motorcycle rental kathmandu, kapan bike rental, बाइक भाडा काठमाडौं, गिग इकोनोमी नेपाल, राइड सेयरिङ नेपाल',
    path: '/blog/gig-economy-kathmandu-bike-rental',
    ogType: 'article',
    ogTitle: en
      ? 'Work Today, Get Paid Today: Kathmandu’s Gig Economy in 2026'
      : 'आजै काम, आजै पैसा: २०२६ मा काठमाडौंको गिग इकोनोमी',
    ogDescription: en
      ? 'Ride-sharing is now legally backed in Nepal’s new budget. Earn Rs. 1,800–3,500/day on Pathao, InDrive, Yango or Tootle. Rent a bike for Rs. 700/day. Zero loan, zero down payment.'
      : 'राइड-सेयरिङ अब नेपालको नयाँ बजेटले औपचारिक रूपमा चिनेको छ। पाठाओ, इनड्राइभ, यांगो वा टुटलमा दिनको रु. १,८००–३,५०० कमाउनुहोस्। बाइक भाडा दिनको रु. ७००।',
    ogImage: 'https://www.rydnepal.com/og/gig-economy-kathmandu.jpg',
    datePublished: '2026-05-31',
    dateModified: '2026-05-31',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'The Gig Economy in Kathmandu', url: 'https://www.rydnepal.com/blog/gig-economy-kathmandu-bike-rental' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'The Gig Economy in Kathmandu: Work Today, Get Paid Today',
        'alternativeHeadline': 'काठमाडौंमा गिग इकोनोमी: आजै काम, आजै पैसा',
        'description': 'How ride-sharing and delivery riders in Kathmandu earn daily payouts in 2026, what the new national budget changes for gig workers, and how to start earning with zero investment by renting a bike from RYD Nepal.',
        'author': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://www.rydnepal.com' },
        'publisher': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://www.rydnepal.com', 'logo': { '@type': 'ImageObject', 'url': 'https://www.rydnepal.com/logo.png' } },
        'datePublished': '2026-05-31',
        'dateModified': '2026-05-31',
        'image': 'https://www.rydnepal.com/blog/gig-economy-kathmandu.jpg',
        'mainEntityOfPage': 'https://www.rydnepal.com/blog/gig-economy-kathmandu-bike-rental',
        'inLanguage': ['en', 'ne'],
        'keywords': 'gig economy kathmandu, ride sharing nepal, bike rental kathmandu, rent a bike in kathmandu, pathao rider earning nepal, RYD Nepal',
        'about': [
          { '@type': 'Thing', 'name': 'Gig Economy Nepal' },
          { '@type': 'Thing', 'name': 'Ride Sharing Kathmandu' },
          { '@type': 'Thing', 'name': 'Motorcycle Rental' },
          { '@type': 'Thing', 'name': 'Rent to Own Bike Nepal' },
        ],
        'mentions': [
          { '@type': 'Organization', 'name': 'Pathao' },
          { '@type': 'Organization', 'name': 'InDrive' },
          { '@type': 'Organization', 'name': 'Yango' },
          { '@type': 'Organization', 'name': 'Tootle' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Do I need to own a bike to start riding for Pathao, InDrive, Yango or Tootle in Kathmandu?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. You can rent a well-maintained Hero Super Splendor 125cc from RYD Nepal at Rs. 700 a day on the monthly prepayment plan, or Rs. 800 a day on the daily plan. There is no down payment, no bank loan, and no credit check.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is ride-sharing legal in Nepal in 2026?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. Ride-sharing is now formally recognised in the latest national budget, which signals broader policy support for the gig economy and platform-based earning in Nepal.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How fast do gig riders get paid in Nepal?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Most ride-sharing and delivery platforms in Kathmandu settle earnings the same day or the next morning, either to a digital wallet or directly to a linked bank account.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What documents do I need to rent a bike from RYD Nepal?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'A valid Nepali driving licence (Category A) and a citizenship document. Walk in to our Dhalane Pul, Kapan office and you can ride out the same day.',
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>Gig Economy Kathmandu: Work Today, Get Paid Today | RYD Nepal Blog</title>
        <meta name="description" content="A 2026 guide to the ride-sharing gig economy in Kathmandu. Daily payouts, the new budget's stance on ride-sharing, and how to start with zero investment by renting a bike from RYD Nepal." />
        <link rel="canonical" href="https://www.rydnepal.com/blog/gig-economy-kathmandu-bike-rental" />
      </Helmet>

      {/* ── Hero ── */}
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
            <Zap className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog · Gig Economy 2026' : 'RYD Nepal ब्लग · गिग इकोनोमी २०२६'}</span>
          </div>

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
            {en ? (
              <>How Much Do <span className="text-primary">Pathao &amp; InDrive Riders</span> Earn in Kathmandu? Work Today, Get Paid Today</>
            ) : (
              <>काठमाडौंमा <span className="text-primary">Pathao र InDrive राइडर</span>ले कति कमाउँछन्? आजै काम, आजै पैसा</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'Have you ever stared at your bank balance in the middle of the month and wished you did not have to wait for payday? In Kathmandu, the 9-to-5 is no longer the only way to build a life. Every day, students, parents, and side-hustlers switch on a ride-sharing app and decide exactly how much they want to earn.'
              : 'महिनाको बीचमा बैंक ब्यालेन्स हेरेर पगारको दिन कुर्न नपरे हुन्थ्यो भन्ने कहिल्यै लागेको छ? काठमाडौंमा अब ९ देखि ५ को जागिर मात्र जीवन चलाउने बाटो होइन। हरेक दिन विद्यार्थी, अभिभावक र साइड-हसलरहरू राइड-सेयरिङ एप अन गर्छन् र आफूले कति कमाउने आफै तय गर्छन्।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: May 31, 2026' : 'प्रकाशित: २०२६ मे ३१'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">{en ? '9 min read' : '९ मिनेट पठन'}</span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Gig Economy & Earnings' : 'गिग इकोनोमी र कमाइ'}</span>
          </div>
        </div>
      </section>

      {/* ── Cover image (magazine-overlap) ── */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
          <img
            src="/og/gig-economy-kathmandu.jpg"
            alt={en
              ? 'Young Pathao rider on a Hero Super Splendor 125cc in Kathmandu checking a ride request — RYD Nepal gig economy 2026'
              : 'काठमाडौंमा पाठाओ राइडर हिरो सुपर स्प्लेन्डर 125cc मा राइड अनुरोध हेर्दै — RYD Nepal गिग इकोनोमी २०२६'}
            className="w-full rounded-2xl shadow-2xl border border-slate-200 aspect-[1200/630] object-cover"
            loading="eager"
            width={1200}
            height={630}
          />
        </div>
      </div>

      {/* ── At-a-glance stats ── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Wallet, label: en ? 'Daily Payout' : 'दैनिक भुक्तानी', val: en ? 'Same day' : 'उही दिन', color: 'text-emerald-600' },
              { icon: TrendingUp, label: en ? 'Daily Earning Range' : 'दैनिक कमाइ दायरा', val: 'Rs. 1,800 – 3,500', color: 'text-primary' },
              { icon: Briefcase, label: en ? 'Start Cost with RYD' : 'RYD सँग सुरुवात खर्च', val: 'Rs. 0', color: 'text-blue-600' },
              { icon: Bike, label: en ? 'Daily Rent' : 'दैनिक भाडा', val: 'Rs. 700 – 800', color: 'text-amber-600' },
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

      {/* ── Article body ── */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose-slate">

        {/* Section: What is happening */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary-100 p-2 rounded-xl"><Zap className="w-5 h-5 text-primary" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'What is actually happening on the streets of Kathmandu' : 'काठमाडौंका सडकमा वास्तवमा के भइरहेको छ'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {en ? (
              <>
                <p>
                  Walk past Bagbazar at 8 in the morning, or Naxal at 9 in the evening, and the pattern is hard to miss.
                  Helmeted riders glancing at their phones between trips, food bags strapped to fuel tanks, and the soft
                  ping of a new order arriving. This is not a side trend. It is the way thousands of young Nepalis now
                  pay rent, cover tuition, and put away savings.
                </p>
                <p>
                  Welcome to the Kathmandu gig economy. Through ride-sharing apps and delivery platforms, riders are
                  taking direct control of their income. You decide when you log in, which trips you accept, and when
                  you call it a day. There is no manager, no monthly review, and no waiting until the 25th to see money.
                </p>
                <p className="font-semibold text-slate-900">
                  In this guide we break down why "work today, get paid today" is changing how Kathmandu earns, what the
                  latest national budget signals about the future of ride-sharing in Nepal, and how you can start without
                  owning a bike.
                </p>
              </>
            ) : (
              <>
                <p>
                  बिहान ८ बजे बागबजार वा साँझ ९ बजे नक्साल नजिक हिँड्नुहोस्, दृश्य उस्तै हुन्छ। हेल्मेट लगाएर फोन हेर्दै
                  गरेका राइडरहरू, इन्धन ट्याङ्कीमा बाँधिएको खानाको झोला, र नयाँ अर्डर आउँदा बज्ने सूचना। यो साइड ट्रेन्ड
                  होइन। हजारौं नेपाली युवाले घर भाडा तिर्ने, फीस तिर्ने र बचत गर्ने तरिका यही बनेको छ।
                </p>
                <p>
                  यो हो काठमाडौंको गिग इकोनोमी। राइड-सेयरिङ र डेलिभरी एपहरूमार्फत राइडरहरूले आफ्नो आम्दानीमा सीधै नियन्त्रण
                  लिएका छन्। कहिले लग-इन गर्ने, कुन ट्रिप लिने र कहिले बन्द गर्ने, सबै तपाईंको हातमा हुन्छ। म्यानेजर छैन,
                  मासिक समीक्षा छैन, र पैसा देख्न २५ गते कुर्नु पर्दैन।
                </p>
                <p className="font-semibold text-slate-900">
                  यो गाइडमा हामी हेर्छौं "आजै काम, आजै पैसा" ले काठमाडौंलाई कसरी फेरिरहेको छ, पछिल्लो राष्ट्रिय बजेटले राइड-सेयरिङको
                  भविष्यबारे के संकेत दिएको छ, र बाइक नभए पनि कसरी सुरु गर्न सकिन्छ।
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section: Budget signal */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl"><Landmark className="w-5 h-5 text-emerald-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? "What the new national budget signals for gig workers" : 'नयाँ राष्ट्रिय बजेटले गिग कामदारहरूलाई के संकेत दिन्छ'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {en ? (
              <>
                <p>
                  With ride-sharing now formally recognised in the latest national budget, the policy ground under
                  Nepal's gig economy is finally catching up to the reality on the road. For years riders worked in a
                  grey area. The budget's nod to ride-sharing matters because it tells banks, insurers, and local
                  authorities that this work is here to stay.
                </p>
                <p>
                  Practically, this means more institutional support is on the way: clearer rules for platforms, a
                  cleaner path to insurance for working bikes, and more confidence for first-time riders who were
                  worried whether the income source was even legal. If you have been waiting for "the right time" to
                  try gig riding, the policy timing has never been better.
                </p>
              </>
            ) : (
              <>
                <p>
                  पछिल्लो राष्ट्रिय बजेटले राइड-सेयरिङलाई औपचारिक रूपमा चिनाएसँगै नेपालको गिग इकोनोमीमा नीतिगत
                  आधार सडकको वास्तविकतासँग मेल खान थालेको छ। वर्षौंदेखि राइडरहरू अस्पष्ट क्षेत्रमा काम गरिरहेका थिए। बजेटको
                  सम्बोधनले बैंक, बिमा कम्पनी र स्थानीय निकायलाई स्पष्ट संकेत दिन्छ कि यो काम लामो समयसम्म रहन्छ।
                </p>
                <p>
                  व्यावहारिक रूपमा यसको अर्थ हो: प्लेटफर्महरूका लागि स्पष्ट नियम, काममा चलाइने बाइकका लागि सजिलो बिमा बाटो,
                  र पहिलो पटक राइड गर्न लाग्ने व्यक्तिहरूका लागि आम्दानी स्रोत वैध हो भन्ने भरोसा। यदि "सही समय" कुरिरहनुभएको छ
                  भने, नीतिगत हिसाबले अहिले भन्दा राम्रो समय भएको छैन।
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section: Why riders choose this */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-amber-100 p-2 rounded-xl"><Coins className="w-5 h-5 text-amber-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Three reasons riders are switching to the gig economy' : 'राइडरहरू गिग इकोनोमी रोज्नुका तीन कारण'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-1 gap-4 mb-6">
            {[
              {
                icon: Banknote,
                title: en ? '1. Same-day money in your wallet' : '१. उही दिन वालेटमा पैसा',
                body: en
                  ? 'A traditional job asks you to trade 30 days of work before seeing one rupee. Ride-sharing flips the rule. Finish a shift, and the earnings settle to your digital wallet or linked bank account that same evening. Need Rs. 2,000 for groceries by tomorrow morning? Put on the helmet, complete a few trips across Ring Road, and the money is yours by dinner.'
                  : '१. परम्परागत जागिरमा एक रुपैयाँ देख्न ३० दिन कुर्नुपर्छ। राइड-सेयरिङले यो नियम उल्ट्याउँछ। सिफ्ट सकेपछि उही साँझ डिजिटल वालेट वा लिङ्क गरिएको बैंक खातामा पैसा आइपुग्छ। भोलि बिहानको लागि रु. २,००० किनमेल खर्च चाहियो? हेल्मेट लगाउनुहोस्, रिङ रोडमा केही ट्रिप गर्नुहोस्, र खाना खाने बेलासम्म पैसा हातमा हुन्छ।',
              },
              {
                icon: ShieldCheck,
                title: en ? '2. You are your own boss, on your own clock' : '२. आफ्नो समयमा आफै मालिक',
                body: en
                  ? 'Want to sleep in on a Tuesday? Have college classes until noon? Already holding a day job and want to hustle from 6 PM to 10 PM? Ride-sharing gives full freedom. No fixed login times, no leave applications, no manager checking up. You log in when you want to earn, and log out when you want to rest. Your monthly salary is exactly the number of hours you decide to commit, multiplied by your hourly average.'
                  : '२. मंगलबार ढिलो उठ्ने चाहना छ? दिउँसो १२ बजेसम्म कलेज छ? साँझ ६ देखि १० बजेसम्म साइड कमाइ गर्न चाहनुहुन्छ? राइड-सेयरिङले पूर्ण स्वतन्त्रता दिन्छ। निश्चित लग-इन समय छैन, बिदा आवेदन छैन, म्यानेजरको निगरानी छैन। कमाउन मन लाग्दा लग-इन, आराम गर्न मन लाग्दा लग-आउट। तपाईंको महिनाको आम्दानी = तपाईंले दिने घण्टा × औसत प्रति घण्टा कमाइ।',
              },
              {
                icon: TrendingUp,
                title: en ? '3. Real demand in Kathmandu, real earning ceiling' : '३. काठमाडौंमा वास्तविक माग, वास्तविक कमाइ',
                body: en
                  ? 'Kathmandu traffic is unforgiving, and that is exactly what makes ride-sharing valuable. For public transport, a passenger may have to walk a kilometre to the nearest bus stop. With ride-sharing, one tap brings a bike to their doorstep. A focused rider running multiple apps comfortably clears Rs. 1,800 to Rs. 3,500 on a normal weekday. For a careful, honest breakdown of platform-by-platform earnings (Pathao, InDrive, Yango, Tootle), read our full numbers guide linked below.'
                  : '३. काठमाडौंको ट्राफिक कठिन छ, र यही कारण राइड-सेयरिङ मूल्यवान छ। सार्वजनिक यातायातका लागि यात्रुले एक किलोमिटर हिँडेर बस स्टपमा पुग्नुपर्छ। राइड-सेयरिङमा एउटा क्लिकमा बाइक ढोकामै आइपुग्छ। बहु-एप चलाउने मेहनती राइडरले सामान्य कार्यदिनमा रु. १,८०० देखि रु. ३,५०० सम्म कमाउँछ। पाठाओ, इनड्राइभ, यांगो, टुटलको प्लेटफर्म-वार पूर्ण विवरणको लागि तलको लिङ्क पढ्नुहोस्।',
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-slate-700">
            {en ? (
              <>
                Want the platform-by-platform earnings table for Pathao, InDrive, Yango and Tootle, based on data from 500+ active RYD riders?{' '}
                <Link to="/blog/why-ryd-nepal-best-bike-rental-kathmandu" className="font-bold text-primary hover:underline">
                  Read the full 2026 earnings breakdown →
                </Link>
              </>
            ) : (
              <>
                पाठाओ, इनड्राइभ, यांगो र टुटलको प्लेटफर्म-वार कमाइ तालिका हेर्न चाहनुहुन्छ? ५००+ सक्रिय RYD राइडरहरूको डेटामा आधारित।{' '}
                <Link to="/blog/why-ryd-nepal-best-bike-rental-kathmandu" className="font-bold text-primary hover:underline">
                  पूर्ण २०२६ कमाइ विवरण पढ्नुहोस् →
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Section: The bike problem */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-xl"><Bike className="w-5 h-5 text-red-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'The missing piece: what if you do not have a bike?' : 'मूल अवरोध: तपाईंसँग बाइक छैन भने?'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {en ? (
              <>
                <p>
                  The gig economy promises freedom, but it usually has one large barrier. You need a reliable bike.
                  Buying a brand-new motorcycle in Nepal means juggling bank finance, high interest, a down payment in
                  lakhs, and ongoing service bills you can never quite predict. For a student or a first-time earner,
                  that is an impossible starting line.
                </p>
                <p>
                  If you do not have lakhs of rupees sitting in your bank account, does that lock you out of this
                  booming economy? Not at all. This is exactly the problem RYD Nepal exists to solve.
                </p>
              </>
            ) : (
              <>
                <p>
                  गिग इकोनोमीले स्वतन्त्रता दिन्छ, तर एउटा ठूलो अवरोध छ। तपाईंलाई भरपर्दो बाइक चाहिन्छ। नेपालमा नयाँ
                  मोटरसाइकल किन्न बैंक फाइनान्स, उच्च ब्याज, लाखौंको डाउन पेमेन्ट र हरेक महिना अनुमान गर्न नसकिने सर्भिस
                  बिल आउँछ। विद्यार्थी वा पहिलो पटक कमाउन लागेको व्यक्तिको लागि यो असम्भव सुरुवात रेखा हो।
                </p>
                <p>
                  बैंकमा लाखौं रुपैयाँ छैन भने यो बूम-गर्दै गरेको इकोनोमीबाट तपाईं बाहिर हुनुहुन्छ? बिल्कुलै होइन। यही समस्या
                  समाधान गर्न RYD Nepal को स्थापना भएको हो।
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section: RYD removes the barrier */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'How RYD Nepal lets you start with zero investment' : 'RYD Nepal सँग शून्य लगानीमा कसरी सुरु गर्ने'}
            </h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'We believe a lack of capital should not stand between you and your financial independence. Here is exactly what we remove from the equation so you can start earning this week.'
              : 'पैसाको कमीले तपाईंको आर्थिक स्वतन्त्रतालाई रोक्न नहुने हाम्रो मान्यता हो। यो हप्ता कमाउन सुरु गर्न हामी कुन कुन अवरोध हटाउँछौं, हेर्नुहोस्।'}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: en ? 'Zero investment to start' : 'सुरु गर्न शून्य लगानी',
                body: en
                  ? 'No bike purchase. No bank loan. No down payment in lakhs. Our rental plan starts at Rs. 800 a day, or Rs. 700 a day on the monthly prepayment plan. You walk in with your licence, you walk out with a bike.'
                  : 'बाइक किन्नु पर्दैन। बैंक ऋण चाहिँदैन। लाखौंको डाउन पेमेन्ट छैन। हाम्रो भाडा योजना दिनको रु. ८०० देखि सुरु हुन्छ, मासिक प्रिपेमेन्टमा दिनको रु. ७००। लाइसेन्स लिएर आउनुहोस्, बाइक लिएर फर्कनुहोस्।',
              },
              {
                title: en ? 'We cover the maintenance' : 'सर्भिसको खर्च हाम्रो',
                body: en
                  ? 'Gig work is hard on a bike. With RYD Nepal you never pay for routine servicing. Every 2,000 km your bike gets a full check at our Kapan workshop, completely free.'
                  : 'गिग कामले बाइकमा भार पार्छ। RYD Nepal सँग नियमित सर्भिसको खर्च तपाईंले तिर्नु पर्दैन। हरेक २,००० किमीमा कपन वर्कशपमा पूर्ण जाँच, पूर्ण रूपमा निःशुल्क।',
              },
              {
                title: en ? 'Rent-to-own after 1.5 years' : '१.५ वर्षपछि स्वामित्व',
                body: en
                  ? 'Our rental is not a forever bill. After 1.5 years of consistent payments, the Hero Super Splendor 125cc becomes 100% yours. You ride it, you earn from it, and you keep it.'
                  : 'हाम्रो भाडा कहिल्यै नसकिने बिल होइन। १.५ वर्षको नियमित भुक्तानीपछि हिरो सुपर स्प्लेन्डर 125cc १००% तपाईंको हुन्छ। तपाईंले चलाउनुहुन्छ, कमाउनुहुन्छ र राख्नुहुन्छ।',
              },
              {
                title: en ? 'No credit check, no paperwork drama' : 'क्रेडिट जाँच छैन, कागजी झमेला छैन',
                body: en
                  ? 'A bank loan needs collateral, a guarantor, and weeks of waiting. We need your driving licence and citizenship. That is it. You can be on the road today.'
                  : 'बैंक ऋणका लागि धितो, जमानी र हप्तौंको पर्खाइ चाहिन्छ। हामीलाई तपाईंको सवारी लाइसेन्स र नागरिकता मात्र चाहिन्छ। बस्। तपाईं आज नै सडकमा हुन सक्नुहुन्छ।',
              },
            ].map((c, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-slate-900 leading-snug">{c.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed ml-8">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Owning vs renting comparison */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-slate-100 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-slate-700" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Buying a bike on loan vs renting from RYD' : 'ऋणमा बाइक किन्ने बनाम RYD बाट भाडामा लिने'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-red-900">{en ? 'Bank loan, brand-new bike' : 'बैंक ऋण, नयाँ बाइक'}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• {en ? 'Down payment in lakhs, locked away' : 'लाखौंको डाउन पेमेन्ट, फसेर रहन्छ'}</li>
                <li>• {en ? 'Monthly EMI for 3 to 5 years' : '३ देखि ५ वर्षसम्म मासिक किस्ता'}</li>
                <li>• {en ? 'Every service, tyre, and oil change on you' : 'हरेक सर्भिस, टायर, तेल खर्च तपाईंको'}</li>
                <li>• {en ? 'Insurance, tax, registration paperwork' : 'बिमा, कर, दर्ता कागजात'}</li>
                <li>• {en ? 'Missed EMI hurts your credit history' : 'किस्ता छुटे क्रेडिट इतिहास बिग्रिन्छ'}</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-emerald-900">RYD Nepal</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• {en ? 'Zero down payment, ride out today' : 'शून्य डाउन पेमेन्ट, आजै बाइक लिनुहोस्'}</li>
                <li>• {en ? 'Rs. 700 a day on monthly prepayment' : 'मासिक प्रिपेमेन्टमा दिनको रु. ७००'}</li>
                <li>• {en ? 'Free routine service every 2,000 km' : 'हरेक २,००० किमीमा निःशुल्क सर्भिस'}</li>
                <li>• {en ? 'Paperwork handled by us' : 'कागजात हामी सम्हाल्छौं'}</li>
                <li>• {en ? 'Own the bike after 1.5 years, no credit risk' : '१.५ वर्षपछि बाइक आफ्नो, क्रेडिट जोखिम छैन'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Find us */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary-100 p-2 rounded-xl"><MapPin className="w-5 h-5 text-primary" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Where to find us in Kathmandu' : 'हामीलाई काठमाडौंमा कहाँ भेट्ने'}
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'Our office and workshop sit at the same address: Dhalane Pul, Kapan, Kathmandu. Bring your driving licence and citizenship, ask any question in person, pick up your Hero Super Splendor 125cc, and start your first shift the same day.'
              : 'हाम्रो कार्यालय र वर्कशप एकै ठेगानामा छन्: ढलाने पुल, कपन, काठमाडौं। सवारी लाइसेन्स र नागरिकता लिएर आउनुहोस्, प्रत्यक्ष भेटेर प्रश्न सोध्नुहोस्, हिरो सुपर स्प्लेन्डर 125cc लिनुहोस्, र पहिलो सिफ्ट उही दिन सुरु गर्नुहोस्।'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href={SOCIAL.phone} className="flex items-center space-x-3 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary-200 hover:shadow-sm transition-all">
              <div className="bg-primary-50 p-2.5 rounded-xl"><Phone className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{en ? 'Call us, 24/7' : 'फोन गर्नुहोस्, २४/७'}</p>
                <p className="font-bold text-slate-900">+977-9709197877</p>
              </div>
            </a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-white border border-slate-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all">
              <div className="bg-emerald-50 p-2.5 rounded-xl"><MessageCircle className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{en ? 'WhatsApp us' : 'WhatsApp गर्नुहोस्'}</p>
                <p className="font-bold text-slate-900">{en ? 'Same-day reply' : 'त्यही दिन जवाफ'}</p>
              </div>
            </a>
          </div>
        </section>

        {/* Section: See it on social */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-pink-100 p-2 rounded-xl"><Star className="w-5 h-5 text-pink-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'See real RYD riders before you walk in' : 'आउनु अघि RYD का राइडरहरू आफै हेर्नुहोस्'}
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'We post workshop footage, rider stories, and Kathmandu route updates every week on TikTok and Facebook. If you want to see what a working RYD bike looks like before you decide, start here:'
              : 'हामी हरेक हप्ता TikTok र Facebook मा वर्कशप भिडियो, राइडरका कथा र काठमाडौंका रुट अपडेट पोस्ट गर्छौं। निर्णय गर्नु अघि RYD बाइक काममा कस्तो देखिन्छ हेर्नुहोस्:'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center bg-slate-900 hover:bg-slate-800 text-white rounded-2xl p-5 transition-colors">
              <svg className="w-7 h-7 mb-2 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              <p className="text-xs font-bold">TikTok</p>
              <p className="text-[10px] opacity-60 mt-0.5">@ryd.nepal</p>
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 transition-colors">
              <Facebook className="w-7 h-7 mb-2" />
              <p className="text-xs font-bold">Facebook</p>
              <p className="text-[10px] opacity-80 mt-0.5">/rydnp2025</p>
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white rounded-2xl p-5 transition-opacity">
              <Instagram className="w-7 h-7 mb-2" />
              <p className="text-xs font-bold">Instagram</p>
              <p className="text-[10px] opacity-90 mt-0.5">@ryd.nepal</p>
            </a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-5 transition-colors">
              <MessageCircle className="w-7 h-7 mb-2" />
              <p className="text-xs font-bold">WhatsApp</p>
              <p className="text-[10px] opacity-80 mt-0.5">9709197877</p>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-br from-primary to-primary-700 text-white p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-black mb-3">
            {en ? 'Take control of your income today' : 'आजै आफ्नो आम्दानी आफ्नो हातमा लिनुहोस्'}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {en
              ? 'The gig economy is not a passing trend. It is the boost behind thousands of Kathmandu households this year. Do not let the lack of a motorcycle stand between you and Rs. 50,000 a month. Bring your driving licence and citizenship to our office at Dhalane Pul, Kapan, and ride out the same day.'
              : 'गिग इकोनोमी कुनै क्षणिक धारा होइन। यो वर्ष काठमाडौंका हजारौं घरपरिवारका लागि आर्थिक टेको बनेको छ। मोटरसाइकल नभएकाले महिनाको रु. ५०,००० कमाउने अवसर नछुटोस्। सवारी लाइसेन्स र नागरिकता लिएर ढलाने पुल, कपनस्थित हाम्रो कार्यालय आउनुहोस्, र उही दिन बाइक लिएर निस्कनुहोस्।'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
              {en ? 'Apply Now' : 'अहिले आवेदन दिनुहोस्'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-white/20">
              {en ? 'See Rental Plans' : 'भाडा योजना हेर्नुहोस्'}
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 border-t border-slate-100 pt-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{en ? 'Related Reading' : 'सम्बन्धित पठन'}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/blog/why-ryd-nepal-best-bike-rental-kathmandu" className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-primary-100 transition-all">
              <p className="text-xs text-primary font-bold mb-1">{en ? 'Service & Maintenance' : 'सेवा र मर्मत'}</p>
              <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {en ? 'Why RYD Nepal Is the Bike Rental Near You That Riders Trust' : 'किन RYD Nepal काठमाडौंको सबैभन्दा भरपर्दो बाइक भाडा सेवा हो'}
              </p>
            </Link>
            <Link to="/blog/rent-to-own-hero-splendor-125" className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-primary-100 transition-all">
              <p className="text-xs text-primary font-bold mb-1">{en ? 'Financial Analysis' : 'आर्थिक विश्लेषण'}</p>
              <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {en ? 'Why Paying Rs. 1,000/Day to Rent-to-Own a Bike Makes Financial Sense' : 'किन दिनको रु. १,००० तिरेर बाइक आफ्नो बनाउन आर्थिक रूपमा सम्भव छ'}
              </p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogGigEconomy;
