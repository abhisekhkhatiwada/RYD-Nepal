import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Zap, Bike, TrendingUp,
  Wallet, CheckCircle, MapPin, Phone, Mail, Percent, Layers, Fuel,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const URL = 'https://www.rydnepal.com/blog/pathao-vs-indrive-vs-yango-rider-earnings';

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with prerender.mjs);
// qNe/aNe render when the reader switches to Nepali.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'Can I ride for Pathao and InDrive at the same time?',
    a: 'Yes. Multi-apping is common and allowed in Kathmandu. Most full-time riders keep Pathao, InDrive, and Yango installed on one phone and accept whichever request pays best. One bike works on all platforms.',
    qNe: 'के म एकैसाथ पाठाओ र इनड्राइभ दुवैमा चलाउन सक्छु?',
    aNe: 'सक्नुहुन्छ। काठमाडौंमा एकैसाथ धेरै एप चलाउनु सामान्य र अनुमति प्राप्त कुरा हो। धेरैजसो पूर्णकालीन राइडरले एउटै फोनमा पाठाओ, इनड्राइभ र यांगो राखेर जुन अनुरोधले बढी तिर्छ त्यही स्वीकार गर्छन्। एउटै बाइक सबै प्लेटफर्ममा काम गर्छ।',
  },
  {
    q: 'Which app pays riders more in Nepal: Pathao, InDrive, or Yango?',
    a: 'Per ride, Yango leaves the most in your pocket with a reported commission of around 3%, versus around 10% on InDrive and around 20% on Pathao bike rides. But Pathao still has the most ride requests. Most riders in Kathmandu earn the most by running two or three apps together.',
    qNe: 'नेपालमा कुन एपले राइडरलाई बढी तिर्छ: पाठाओ, इनड्राइभ वा यांगो?',
    aNe: 'प्रति राइड हिसाबले, करिब ३% कमिसनका साथ यांगोले तपाईंको खल्तीमा सबैभन्दा बढी छोड्छ, जबकि इनड्राइभमा करिब १०% र पाठाओ बाइक राइडमा करिब २०% छ। तर पाठाओमा अझै सबैभन्दा धेरै राइड अनुरोध आउँछन्। काठमाडौंका धेरैजसो राइडरले दुई-तीनवटा एप सँगै चलाएर सबैभन्दा बढी कमाउँछन्।',
  },
  {
    q: 'What is the Pathao commission rate in Nepal?',
    a: 'Pathao charges around 20% commission on bike ride fares in Nepal. It has also introduced volume-based tiers, where high-volume riders reportedly pay much lower rates, plus daily and weekly quest bonuses on top of fares.',
    qNe: 'नेपालमा पाठाओको कमिसन दर कति हो?',
    aNe: 'पाठाओले नेपालमा बाइक राइड भाडामा करिब २०% कमिसन लिन्छ। यसले राइड संख्यामा आधारित तह पनि ल्याएको छ, जसमा धेरै राइड गर्ने राइडरले निकै कम दर तिर्ने बताइन्छ, साथै भाडामाथि दैनिक र साप्ताहिक क्वेस्ट बोनस पनि छन्।',
  },
  {
    q: 'Which app is best for beginners in Kathmandu?',
    a: 'Start with Pathao. It has the highest demand, so a new rider fills the day with requests quickly. Once you know the city rhythm, add InDrive and Yango in week two, that combination is where earnings jump.',
    qNe: 'काठमाडौंमा नयाँ राइडरका लागि कुन एप उत्तम हो?',
    aNe: 'पाठाओबाट सुरु गर्नुहोस्। यसको माग सबैभन्दा बढी छ, त्यसैले नयाँ राइडरको दिन अनुरोधले छिट्टै भरिन्छ। सहरको चाल बुझेपछि दोस्रो हप्तामा इनड्राइभ र यांगो थप्नुहोस्, कमाइ उफ्रने ठाउँ त्यही संयोजन हो।',
  },
  {
    q: 'Does Yango work with a rented bike?',
    a: 'Yes. Yango, like Pathao and InDrive, needs a bike, a driving license, and your documents, not proof that you own the bike. A RYD Nepal rental from Rs. 700/day works on Yango, Pathao, InDrive, Uber Bike, and Tootle.',
    qNe: 'के यांगो भाडाको बाइकमा काम गर्छ?',
    aNe: 'गर्छ। पाठाओ र इनड्राइभजस्तै यांगोलाई बाइक, सवारी चालक अनुमतिपत्र र तपाईंका कागजात चाहिन्छ, बाइक तपाईंकै हो भन्ने प्रमाण होइन। दिनको रु. ७०० को RYD Nepal भाडा यांगो, पाठाओ, इनड्राइभ, उबर बाइक र टुटलमा काम गर्छ।',
  },
  {
    q: 'How much can I earn per day riding in Kathmandu?',
    a: 'Active full-time riders gross around Rs. 1,500 to 2,500 per day across platforms. After Rs. 700/day bike rent and roughly Rs. 367 in fuel, most RYD Nepal riders net Rs. 700 to 1,700 in daily profit.',
    qNe: 'काठमाडौंमा राइड गरेर म दिनको कति कमाउन सक्छु?',
    aNe: 'सक्रिय पूर्णकालीन राइडरले प्लेटफर्महरूमा गरी दिनको करिब रु. १,५०० देखि २,५०० कुल कमाउँछन्। रु. ७००/दिन बाइक भाडा र करिब रु. ३६७ इन्धनपछि, धेरैजसो RYD Nepal राइडरले दिनको रु. ७०० देखि १,७०० खुद नाफा गर्छन्।',
  },
  {
    q: 'Do I need to own a bike to sign up for these apps?',
    a: 'No. None of the platforms require ownership papers in your name to ride. RYD Nepal rents you a Hero Super Splendor 125cc from Rs. 700/day with zero down payment, free maintenance, and a path to owning the bike after 1.5 years.',
    qNe: 'के यी एपमा दर्ता हुन आफ्नै बाइक चाहिन्छ?',
    aNe: 'चाहिँदैन। कुनै पनि प्लेटफर्मले चलाउन तपाईंकै नाममा स्वामित्वको कागजात माग्दैन। RYD Nepal ले तपाईंलाई दिनको रु. ७०० देखि हिरो सुपर स्प्लेन्डर 125cc भाडामा दिन्छ, शून्य डाउन पेमेन्ट, निःशुल्क मर्मत, र १.५ वर्षपछि बाइक आफ्नै बनाउने बाटोसहित।',
  },
];

const QUICK_FACTS: [string, string][] = [
  ['Pathao: ~20% commission, most demand', 'पाठाओ: ~२०% कमिसन, सबैभन्दा धेरै माग'],
  ['InDrive: ~10% commission, you negotiate fares', 'इनड्राइभ: ~१०% कमिसन, भाडा तपाईं आफैं मोलतोल गर्नुहुन्छ'],
  ['Yango: ~3% launch commission, growing fast', 'यांगो: ~३% लन्च कमिसन, छिटो बढ्दै'],
  ['Smart riders run 2-3 apps on one rented bike', 'चलाख राइडरले एउटै भाडाको बाइकमा २-३ एप चलाउँछन्'],
];

const COMMISSION_ROWS: [string, string, string, string, string][] = [
  // [platform, commission EN, model EN, commission NE, model NE]
  ['Pathao', '~20% on bike rides', 'App-set fares, volume tiers reportedly cut the rate for high-ride-count days, plus quest bonuses', '~२०% बाइक राइडमा', 'एपले भाडा तोक्छ, धेरै राइड गर्ने दिनमा तहगत छुटले दर घटाउने बताइन्छ, साथै क्वेस्ट बोनस'],
  ['InDrive', '~10% (incl. VAT)', 'Bidding model: the passenger offers a fare, you accept, counter, or skip', '~१०% (भ्याटसहित)', 'बिडिङ मोडेल: यात्रुले भाडा प्रस्ताव गर्छ, तपाईं स्वीकार, काउन्टर वा स्किप गर्नुहुन्छ'],
  ['Yango', '~3% (reported launch rate)', 'App-set fares; Yango has said it will hold commission at about 3% for its first three years in Nepal', '~३% (रिपोर्ट गरिएको लन्च दर)', 'एपले भाडा तोक्छ; यांगोले नेपालमा पहिलो तीन वर्ष कमिसन करिब ३% मै राख्ने बताएको छ'],
  ['Uber Bike', 'New entrant (June 2026)', 'Launch-phase incentives; rates still settling as it builds its Kathmandu rider base', 'नयाँ आगन्तुक (जुन २०२६)', 'लन्च-चरणका प्रोत्साहन; काठमाडौंमा राइडर आधार बनाउँदै गर्दा दरहरू स्थिर हुँदैछन्'],
  ['Tootle', 'Low flat fee / subscription-style', 'The original Nepali player, smaller ride volume today but loyal users', 'न्यून स्थिर शुल्क / सदस्यता शैली', 'मौलिक नेपाली खेलाडी, आज राइड संख्या कम तर वफादार प्रयोगकर्ता'],
];

const EARN_ROWS: [string, string, string, string, string, string][] = [
  // [platform EN, monthly EN, note EN, platform NE, monthly NE, note NE]
  ['Pathao', 'Rs. 40,000 to 60,000', 'Highest request volume, less idle time', 'पाठाओ', 'रु. ४०,००० देखि ६०,०००', 'सबैभन्दा धेरै अनुरोध, कम खाली समय'],
  ['InDrive', 'Rs. 35,000 to 55,000', 'Fewer requests, but you pick the fares worth taking', 'इनड्राइभ', 'रु. ३५,००० देखि ५५,०००', 'कम अनुरोध, तर लिन लायक भाडा तपाईं आफैं छान्नुहुन्छ'],
  ['Yango', 'Rs. 35,000 to 55,000', 'Lowest commission, demand growing since May 2025', 'यांगो', 'रु. ३५,००० देखि ५५,०००', 'सबैभन्दा कम कमिसन, मे २०२५ देखि माग बढ्दै'],
  ['Tootle', 'Rs. 30,000 to 50,000', 'Good as a supplement, not a primary app', 'टुटल', 'रु. ३०,००० देखि ५०,०००', 'पूरकका रूपमा राम्रो, मुख्य एपका रूपमा होइन'],
  ['2-3 apps together', 'Rs. 45,000 to 70,000+', 'The multi-app rider fills the gaps one app leaves', '२-३ एप सँगै', 'रु. ४५,००० देखि ७०,०००+', 'मल्टि-एप राइडरले एउटा एपले छोडेको खाली समय भर्छ'],
];

const VERDICT_ROWS: [string, string, string, string][] = [
  // [rider type EN, pick EN, rider type NE, pick NE]
  ['Complete beginner', 'Pathao first, add Yango in week two', 'पूर्ण नयाँ राइडर', 'पहिले पाठाओ, दोस्रो हप्तामा यांगो थप्नुहोस्'],
  ['Wants maximum per-ride cut', 'Yango (~3% commission) with InDrive as backup', 'प्रति राइड बढी हिस्सा चाहने', 'यांगो (~३% कमिसन), ब्याकअपमा इनड्राइभ'],
  ['Confident negotiator, knows the city', 'InDrive, cherry-pick the best bids', 'आत्मविश्वासी मोलतोलकर्ता, सहर चिन्ने', 'इनड्राइभ, उत्तम बिड मात्र छान्नुहोस्'],
  ['Full-time, income-focused', 'All three, plus Uber Bike as it grows', 'पूर्णकालीन, आम्दानी केन्द्रित', 'तीनै वटा, साथै बढ्दै गरेको उबर बाइक'],
  ['Delivery + rides mix', 'Pathao (food + parcels) with Yango for ride gaps', 'डेलिभरी + राइड मिश्रण', 'पाठाओ (खाना + पार्सल), राइडको खाली समयमा यांगो'],
];

const BlogPlatformComparison: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'Pathao vs InDrive vs Yango: Which Pays Kathmandu Riders More in 2026? | RYD Nepal'
      : 'पाठाओ vs इनड्राइभ vs यांगो: २०२६ मा काठमाडौंका राइडरलाई कसले बढी तिर्छ? | RYD Nepal',
    description: en
      ? 'Pathao takes around 20% commission, InDrive around 10%, Yango a reported 3%. We compare commissions, demand, and real daily earnings for Kathmandu riders in 2026, and show why the smartest riders run all three apps on one rented bike from Rs. 700/day.'
      : 'पाठाओले करिब २०% कमिसन लिन्छ, इनड्राइभले करिब १०%, यांगोले रिपोर्ट अनुसार ३%। हामी २०२६ मा काठमाडौंका राइडरका लागि कमिसन, माग र वास्तविक दैनिक कमाइ तुलना गर्छौं, र किन सबैभन्दा चलाख राइडरले दिनको रु. ७०० को एउटै भाडाको बाइकमा तीनै एप चलाउँछन् भनेर देखाउँछौं।',
    keywords:
      'pathao vs indrive, yango rider nepal, pathao commission rate, indrive rider earnings nepal, which app pays riders more nepal, yango commission nepal, pathao vs indrive vs yango, ride sharing apps kathmandu, bike rental kathmandu, RYD Nepal',
    path: '/blog/pathao-vs-indrive-vs-yango-rider-earnings',
    ogType: 'article',
    ogTitle: 'Pathao vs InDrive vs Yango: Which Pays Kathmandu Riders More in 2026?',
    ogDescription:
      'Same bike, same hours, very different take-home. Pathao ~20% commission, InDrive ~10%, Yango ~3%. The full 2026 earnings comparison for Kathmandu riders.',
    ogImage: 'https://www.rydnepal.com/og/pathao-indrive-yango.jpg',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'Pathao vs InDrive vs Yango: Rider Earnings Compared', url: URL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Pathao vs InDrive vs Yango: Which Pays Kathmandu Riders More in 2026?',
        description:
          'A commission-by-commission, rupee-by-rupee comparison of Pathao, InDrive, and Yango for Kathmandu riders in 2026, plus the multi-app strategy that beats picking just one.',
        image: 'https://www.rydnepal.com/og/pathao-indrive-yango.jpg',
        mainEntityOfPage: URL,
        author: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: 'https://www.rydnepal.com' },
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://www.rydnepal.com',
          logo: { '@type': 'ImageObject', url: 'https://www.rydnepal.com/logo.png' },
        },
        datePublished: '2026-07-01',
        dateModified: '2026-07-01',
        inLanguage: ['en', 'ne'],
        about: [
          { '@type': 'Thing', name: 'Pathao Commission Rate Nepal' },
          { '@type': 'Thing', name: 'InDrive Rider Earnings Nepal' },
          { '@type': 'Thing', name: 'Yango Rider Nepal' },
          { '@type': 'Thing', name: 'Ride Sharing Earnings Kathmandu' },
        ],
        mentions: [
          { '@type': 'SoftwareApplication', name: 'Pathao' },
          { '@type': 'SoftwareApplication', name: 'InDrive' },
          { '@type': 'SoftwareApplication', name: 'Yango' },
          { '@type': 'SoftwareApplication', name: 'Uber' },
          { '@type': 'SoftwareApplication', name: 'Tootle' },
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
            <span>{en ? 'RYD Nepal Blog · Platform Comparison' : 'RYD Nepal ब्लग · प्लेटफर्म तुलना'}</span>
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
              <>Pathao vs InDrive vs Yango: <span className="text-primary">Which Pays Kathmandu Riders More</span> in 2026?</>
            ) : (
              <>पाठाओ vs इनड्राइभ vs यांगो: २०२६ मा <span className="text-primary">काठमाडौंका राइडरलाई कसले बढी तिर्छ</span>?</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'Same bike. Same hours. Same Kathmandu traffic. Yet two riders working the same streets can go home with very different money, because the app they ride for takes a very different cut. Pathao keeps around 20% of every bike fare, InDrive around 10%, and newcomer Yango a reported 3%. Here is the honest, number-by-number comparison nobody else has written properly.'
              : 'उही बाइक। उही घण्टा। उही काठमाडौंको ट्राफिक। तैपनि उही सडकमा काम गर्ने दुई राइडर निकै फरक पैसा लिएर घर जान सक्छन्, किनभने उनीहरूले चलाउने एपले निकै फरक हिस्सा काट्छ। पाठाओले हरेक बाइक भाडाको करिब २०% राख्छ, इनड्राइभले करिब १०%, र नयाँ आएको यांगोले रिपोर्ट अनुसार ३%। अरू कसैले राम्ररी नलेखेको इमानदार, संख्या-संख्याको तुलना यहाँ छ।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: July 1, 2026' : 'प्रकाशित: २०२६ जुलाई १'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {en ? '9 min read' : '९ मिनेट पठन'}
            </span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Platform Comparison' : 'प्लेटफर्म तुलना'}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {en ? (
            <>One thing before we start: whichever app wins for you, none of them pays a rupee until you have a bike. <strong>RYD Nepal</strong> rents you a{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">Hero Super Splendor 125cc from Rs. 700/day</Link>,
              no loan, no down payment, and the same bike works on Pathao, InDrive, Yango, Uber Bike, and Tootle simultaneously. Keep that in mind as you read, it changes the whole comparison.</>
          ) : (
            <>सुरु गर्नुअघि एउटा कुरा: तपाईंका लागि जुन एप जिते पनि, बाइक नभएसम्म कुनैले पनि एक रुपैयाँ तिर्दैन। <strong>RYD Nepal</strong> ले तपाईंलाई{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">दिनको रु. ७०० देखि हिरो सुपर स्प्लेन्डर 125cc</Link>{' '}
              भाडामा दिन्छ, लोन छैन, डाउन पेमेन्ट छैन, र उही बाइक पाठाओ, इनड्राइभ, यांगो, उबर बाइक र टुटलमा एकैसाथ काम गर्छ। पढ्दै गर्दा यो सम्झनुहोस्, यसले पूरै तुलना नै बदल्छ।</>
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

        {/* Commission comparison */}
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Percent className="w-6 h-6 text-primary" />
          {en ? 'Commission rates: how big a cut does each app take?' : 'कमिसन दर: हरेक एपले कति ठूलो हिस्सा काट्छ?'}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en
            ? 'Commission is the single biggest difference between the platforms, and the one riders talk about least when choosing. Here is where things stand in mid-2026 (rates can change, treat the newer figures as reported rather than guaranteed):'
            : 'कमिसन नै प्लेटफर्महरूबीचको सबैभन्दा ठूलो भिन्नता हो, र छान्दा राइडरले सबैभन्दा कम कुरा गर्ने विषय पनि। २०२६ को मध्यसम्मको अवस्था यस्तो छ (दरहरू परिवर्तन हुन सक्छन्, नयाँ आँकडालाई ग्यारेन्टी नभई रिपोर्ट गरिएको मान्नुहोस्):'}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Platform' : 'प्लेटफर्म'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Commission' : 'कमिसन'}</th>
                <th className="text-left p-4 font-bold">{en ? 'How fares work' : 'भाडा कसरी चल्छ'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {COMMISSION_ROWS.map(([plat, ce, me, cn, mn], i) => (
                <tr key={i} className={i === 2 ? 'bg-primary-50/40' : ''}>
                  <td className="p-4 font-semibold text-slate-900">{plat}</td>
                  <td className="p-4">{en ? ce : cn}</td>
                  <td className="p-4">{en ? me : mn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Put that in rupees. On a Rs. 300 fare, Pathao keeps around Rs. 60, InDrive around Rs. 30, and Yango around Rs. 9. Over 15 rides a day, that gap between Pathao and Yango is roughly Rs. 750, close to a full day of bike rent.'
            : 'यसलाई रुपैयाँमा हेरौं। रु. ३०० को भाडामा, पाठाओले करिब रु. ६०, इनड्राइभले करिब रु. ३०, र यांगोले करिब रु. ९ राख्छ। दिनको १५ राइडमा, पाठाओ र यांगोबीचको त्यो अन्तर करिब रु. ७५० हुन्छ, झन्डै एक दिनको बाइक भाडा बराबर।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>So Yango wins outright? Not so fast. Commission only matters on rides you actually get, and that brings us to demand. (New to the whole scene? Our guide to{' '}
              <Link to="/blog/bike-rental-kathmandu-uber-pathao-indrive" className="text-primary font-semibold hover:underline">Uber Bike's launch in Kathmandu</Link>{' '}
              covers the newest entrant in detail.)</>
          ) : (
            <>त्यसो भए यांगोले सिधै जित्यो? त्यति छिटो होइन। कमिसनको अर्थ तपाईंले वास्तवमै पाउने राइडमा मात्र हुन्छ, र त्यसले हामीलाई मागतिर लैजान्छ। (यो क्षेत्रमा नयाँ हुनुहुन्छ? हाम्रो{' '}
              <Link to="/blog/bike-rental-kathmandu-uber-pathao-indrive" className="text-primary font-semibold hover:underline">काठमाडौंमा उबर बाइकको लन्च</Link>{' '}
              बारेको गाइडले सबैभन्दा नयाँ आगन्तुकलाई विस्तारमा समेट्छ।)</>
          )}
        </p>

        {/* Demand */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Demand and ride volume: the part the commission chart hides' : 'माग र राइड संख्या: कमिसन तालिकाले लुकाउने कुरा'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'A 3% commission on zero rides is still zero. What each platform actually delivers in Kathmandu today looks like this:'
            : 'शून्य राइडमा ३% कमिसन पनि शून्य नै हो। आज काठमाडौंमा हरेक प्लेटफर्मले वास्तवमा के दिन्छ, यस्तो देखिन्छ:'}
        </p>
        <ul className="space-y-3 mb-4 text-slate-600">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Pathao has the most demand, by far.</strong> Years of head start, the biggest user base, and it is not just rides: Pathao Food and parcel delivery keep a rider busy between ride requests. If you only install one app, requests-per-hour is why it should be Pathao.</> : <><strong>पाठाओसँग सबैभन्दा धेरै माग छ, निकै फरकले।</strong> वर्षौंको अग्रता, सबैभन्दा ठूलो प्रयोगकर्ता आधार, र राइड मात्र होइन: पाठाओ फुड र पार्सल डेलिभरीले राइड अनुरोधहरूबीच राइडरलाई व्यस्त राख्छ। एउटै एप राख्ने हो भने, प्रति घण्टा अनुरोधकै कारण त्यो पाठाओ हुनुपर्छ।</>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Yango is growing fast.</strong> Since launching in Kathmandu in May 2025 with TaxiMandu, its low fares have pulled in passengers quickly, and its rock-bottom commission has pulled in drivers. Request volume is still below Pathao's, but the trend is one-directional.</> : <><strong>यांगो छिटो बढ्दैछ।</strong> मे २०२५ मा ट्याक्सीमाण्डूसँग मिलेर काठमाडौंमा सुरु भएदेखि, यसको सस्तो भाडाले यात्रुहरूलाई छिटो तानेको छ, र यसको न्यूनतम कमिसनले चालकहरूलाई। अनुरोध संख्या अझै पाठाओभन्दा कम छ, तर प्रवृत्ति एकतर्फी छ।</>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>InDrive is a different game entirely.</strong> Passengers propose a fare, you accept, counter, or ignore. Fewer requests than Pathao, but an experienced rider who knows which trips are worth what can consistently earn more per kilometre. It rewards city knowledge.</> : <><strong>इनड्राइभ पूरै फरक खेल हो।</strong> यात्रुले भाडा प्रस्ताव गर्छ, तपाईं स्वीकार, काउन्टर वा बेवास्ता गर्नुहुन्छ। पाठाओभन्दा कम अनुरोध, तर कुन यात्रा कतिमा लायक भन्ने जान्ने अनुभवी राइडरले प्रति किलोमिटर निरन्तर बढी कमाउन सक्छ। यसले सहरको ज्ञानलाई पुरस्कृत गर्छ।</>}</span></li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Uber Bike and Tootle round out the field.</strong> Uber Bike (live since June 2026) is spending on launch incentives to attract riders, and Tootle remains a useful supplement during peak hours.</> : <><strong>उबर बाइक र टुटलले सूची पूरा गर्छन्।</strong> उबर बाइक (जुन २०२६ देखि सञ्चालनमा) राइडर तान्न लन्च प्रोत्साहनमा खर्च गर्दैछ, र टुटल पिक आवरमा उपयोगी पूरक बनिरहेको छ।</>}</span></li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'The pattern is clear: Pathao gives you volume, Yango gives you margin, InDrive gives you control. That is exactly why the question "which one should I choose?" has a better answer than any single app.'
            : 'ढाँचा स्पष्ट छ: पाठाओले संख्या दिन्छ, यांगोले मार्जिन दिन्छ, इनड्राइभले नियन्त्रण दिन्छ। ठ्याक्कै यही कारणले "मैले कुन छान्ने?" भन्ने प्रश्नको उत्तर कुनै एउटा एपभन्दा राम्रो छ।'}
        </p>

        {/* Earnings table */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Realistic earnings per platform in Kathmandu (2026)' : 'काठमाडौंमा प्लेटफर्म अनुसार यथार्थ कमाइ (२०२६)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en
            ? 'These ranges come from what active full-time riders in the Valley consistently report. A committed rider grosses around Rs. 1,500 to 2,500 per day; the monthly picture per platform:'
            : 'यी दायराहरू उपत्यकाका सक्रिय पूर्णकालीन राइडरले निरन्तर बताउने आधारमा आएका हुन्। लगनशील राइडरले दिनको करिब रु. १,५०० देखि २,५०० कुल कमाउँछ; प्लेटफर्म अनुसार मासिक चित्र:'}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Platform' : 'प्लेटफर्म'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Monthly earning range' : 'मासिक कमाइ दायरा'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Why' : 'किन'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {EARN_ROWS.map(([pe, me, we, pn, mn, wn], i) => (
                <tr key={i} className={i === EARN_ROWS.length - 1 ? 'bg-primary-50/40' : ''}>
                  <td className="p-4 font-semibold text-slate-900">{en ? pe : pn}</td>
                  <td className="p-4">{en ? me : mn}</td>
                  <td className="p-4">{en ? we : wn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>Notice the last row. The riders at the top of the earning range are almost never single-app riders. For a deeper breakdown of monthly rider incomes, see our guide on{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">how much Pathao and InDrive riders earn in Kathmandu</Link>.</>
          ) : (
            <>अन्तिम पङ्क्ति हेर्नुहोस्। कमाइ दायराको माथिल्लो भागका राइडरहरू झन्डै कहिल्यै एउटै एपका राइडर हुँदैनन्। मासिक राइडर आम्दानीको थप विस्तृत विवरणका लागि,{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">काठमाडौंमा पाठाओ र इनड्राइभ राइडरले कति कमाउँछन्</Link>{' '}
              भन्ने हाम्रो गाइड हेर्नुहोस्।</>
          )}
        </p>

        {/* Multi-apping */}
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" />
          {en ? 'The real answer: run 2-3 apps on one bike' : 'वास्तविक उत्तर: एउटै बाइकमा २-३ एप चलाउनुहोस्'}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Ask the highest earners at any fuel pump in Kathmandu which app they ride for and you will get the same answer: all of them. The strategy is simple:'
            : 'काठमाडौंको कुनै पनि पेट्रोल पम्पमा सबैभन्दा बढी कमाउनेहरूलाई कुन एपमा चलाउनुहुन्छ भनेर सोध्नुहोस्, उही उत्तर पाउनुहुन्छ: सबैमा। रणनीति सरल छ:'}
        </p>
        <ul className="space-y-3 mb-4 text-slate-600">
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Peak hours (8-11 AM, 4-8 PM):</strong> Pathao on, because request volume is king when the whole city is moving.</> : <><strong>पिक आवर (बिहान ८-११, बेलुका ४-८):</strong> पाठाओ अन, किनभने पूरै सहर चलिरहेका बेला अनुरोधको संख्या नै राजा हो।</>}</span></li>
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Off-peak gaps:</strong> Yango and InDrive open. A Yango ride at 3% commission or a well-negotiated InDrive fare beats sitting idle waiting for Pathao.</> : <><strong>अफ-पिक खाली समय:</strong> यांगो र इनड्राइभ खोल्नुहोस्। ३% कमिसनको यांगो राइड वा राम्ररी मोलतोल गरेको इनड्राइभ भाडा, पाठाओ कुरेर खाली बस्नुभन्दा राम्रो हो।</>}</span></li>
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Meal times:</strong> switch to Pathao Food delivery, lunch and dinner rushes pay while ride demand dips.</> : <><strong>खाना खाने समय:</strong> पाठाओ फुड डेलिभरीमा जानुहोस्, राइडको माग घट्दा लन्च र डिनरको भीडले तिर्छ।</>}</span></li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'And here is the part that matters for anyone without a bike: none of the platforms care whether the bike is owned or rented. One rented Hero Super Splendor 125cc from RYD Nepal registers on Pathao, InDrive, Yango, Uber Bike, and Tootle at the same time. One fixed daily cost, five earning streams.'
            : 'र बाइक नभएका जो कोहीका लागि महत्त्वपूर्ण कुरा यो हो: बाइक आफ्नै हो कि भाडाको, कुनै प्लेटफर्मलाई मतलब छैन। RYD Nepal को एउटा भाडाको हिरो सुपर स्प्लेन्डर 125cc एकैसाथ पाठाओ, इनड्राइभ, यांगो, उबर बाइक र टुटलमा दर्ता हुन्छ। एउटा निश्चित दैनिक खर्च, पाँचवटा कमाइका स्रोत।'}
        </p>

        {/* Fixed costs */}
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Fuel className="w-6 h-6 text-primary" />
          {en ? 'The costs that stay the same no matter which app you pick' : 'जुन एप छाने पनि उस्तै रहने खर्चहरू'}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Commission is the app\'s cut. Everything else comes out of your pocket identically on every platform:'
            : 'कमिसन एपको हिस्सा हो। बाँकी सबै खर्च हरेक प्लेटफर्ममा उस्तै गरी तपाईंकै खल्तीबाट जान्छ:'}
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
          <p className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" /> {en ? 'The daily math, with real numbers' : 'दैनिक हिसाब, वास्तविक संख्यासहित'}</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>{en ? 'Gross earnings: Rs. 1,500 to 2,500/day across 2-3 apps' : 'कुल कमाइ: २-३ एपमा गरी दिनको रु. १,५०० देखि २,५००'}</li>
            <li>{en ? 'Fuel: about Rs. 367/day (100 km at 55 km/l, petrol around Rs. 202/litre)' : 'इन्धन: दिनको करिब रु. ३६७ (५५ किमि/लिटरमा १०० किमि, पेट्रोल करिब रु. २०२/लिटर)'}</li>
            <li>{en ? 'Bike rent: Rs. 700/day (RYD Nepal prepayment plan, Rs. 21,000/month)' : 'बाइक भाडा: रु. ७००/दिन (RYD Nepal प्रिपेमेन्ट योजना, रु. २१,०००/महिना)'}</li>
            <li>{en ? 'Maintenance, servicing, brakes, tires: Rs. 0, included in the rent' : 'मर्मत, सर्भिसिङ, ब्रेक, टायर: रु. ०, भाडामै समावेश'}</li>
            <li className="font-bold text-slate-900">{en ? 'Net profit: Rs. 700 to 1,700 every single day, whichever apps you run' : 'खुद नाफा: हरेक दिन रु. ७०० देखि १,७००, जुनसुकै एप चलाए पनि'}</li>
          </ul>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'This is where owning versus renting flips the usual logic. A bike owner carries servicing bills, repair surprises, and the Rs. 2,66,900 upfront cost of the machine itself. A RYD Nepal rider pays one flat number, and every plan includes free maintenance at our Kapan workshop, insurance support, and 24/7 breakdown assistance with a replacement bike within 30 minutes, so a flat tire never eats a day of Pathao, InDrive, and Yango income.'
            : 'यहीँ किन्ने कि भाडामा लिने भन्ने सामान्य तर्क उल्टिन्छ। बाइक मालिकले सर्भिसिङ बिल, मर्मतका अप्रत्याशित खर्च, र मेसिन आफैंको रु. २,६६,९०० अग्रिम लागत बोक्छ। RYD Nepal राइडरले एउटै निश्चित रकम तिर्छ, र हरेक योजनामा हाम्रो कपन वर्कशपमा निःशुल्क मर्मत, बीमा सहायता, र ३० मिनेटभित्र रिप्लेसमेन्ट बाइकसहित २४/७ ब्रेकडाउन सहायता समावेश छ, त्यसैले टायर पन्चरले कहिल्यै पाठाओ, इनड्राइभ र यांगोको एक दिनको आम्दानी खाँदैन।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>On the <Link to="/services" className="text-primary font-semibold hover:underline">Pro Monthly rent-to-own plan (Rs. 7,000/week)</Link>, the bike becomes yours after 1.5 years, so the money you spend earning across three apps is also quietly buying you the bike.</>
          ) : (
            <><Link to="/services" className="text-primary font-semibold hover:underline">प्रो मासिक भाडामा-लिएर-आफ्नो बनाउने योजना (रु. ७,०००/हप्ता)</Link> मा, १.५ वर्षपछि बाइक तपाईंको आफ्नै हुन्छ, त्यसैले तीन एपमा कमाउन खर्च गरेको पैसाले चुपचाप बाइक पनि किनिरहेको हुन्छ।</>
          )}
        </p>

        {/* Verdict */}
        <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          {en ? 'Verdict: who should pick what' : 'निष्कर्ष: कसले के छान्ने'}
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'If you are…' : 'यदि तपाईं…'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Best pick' : 'उत्तम छनोट'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {VERDICT_ROWS.map(([te, pe, tn, pn], i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-slate-900">{en ? te : tn}</td>
                  <td className="p-4">{en ? pe : pn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'The honest verdict for 2026: Pathao pays the most in total because of demand, Yango pays the most per fare because of commission, InDrive pays the most per kilometre to riders who negotiate well, and the multi-app rider beats all three single-app answers. The bike is the constant; the apps are just channels.'
            : '२०२६ को इमानदार निष्कर्ष: मागका कारण कुल हिसाबमा पाठाओले सबैभन्दा बढी तिर्छ, कमिसनका कारण प्रति भाडा यांगोले सबैभन्दा बढी दिन्छ, राम्ररी मोलतोल गर्ने राइडरलाई प्रति किलोमिटर इनड्राइभले सबैभन्दा बढी दिन्छ, र मल्टि-एप राइडरले यी तीनै एकल-एप उत्तरलाई जित्छ। बाइक स्थिर कुरा हो; एपहरू त च्यानल मात्र हुन्।'}
        </p>

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
          <h2 className="text-3xl font-black mb-4">{en ? 'Whichever app wins, you need a bike first.' : 'जुन एपले जिते पनि, तपाईंलाई पहिले बाइक चाहिन्छ।'}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            {en
              ? 'Five platforms are now competing for riders in Kathmandu, and the commission war between Pathao, InDrive, and Yango means more money stays with the rider than ever before. The riders collecting that money are the ones already on the road. You do not need to buy a bike. You do not need a loan. You need a bike this week.'
              : 'अहिले काठमाडौंमा पाँचवटा प्लेटफर्म राइडरका लागि प्रतिस्पर्धा गर्दैछन्, र पाठाओ, इनड्राइभ र यांगोबीचको कमिसन युद्धको अर्थ पहिलेभन्दा बढी पैसा राइडरकै हातमा रहन्छ भन्ने हो। त्यो पैसा उठाउनेहरू पहिले नै सडकमा भएका राइडर हुन्। तपाईंले बाइक किन्नु पर्दैन। तपाईंलाई लोन चाहिँदैन। तपाईंलाई यही हप्ता एउटा बाइक चाहिन्छ।'}
          </p>
          <p className="text-white font-semibold mb-8">
            {en
              ? 'Rent a Hero Super Splendor 125cc from RYD Nepal for Rs. 700/day, ride on Pathao, InDrive, Yango, Uber Bike & Tootle from day one, and own the bike after 1.5 years.'
              : 'RYD Nepal बाट हिरो सुपर स्प्लेन्डर 125cc दिनको रु. ७०० मा भाडामा लिनुहोस्, पहिलो दिनदेखि नै पाठाओ, इनड्राइभ, यांगो, उबर बाइक र टुटलमा चलाउनुहोस्, र १.५ वर्षपछि बाइक आफ्नो बनाउनुहोस्।'}
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

export default BlogPlatformComparison;
