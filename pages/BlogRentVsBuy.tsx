import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Scale, Wallet, CheckCircle,
  XCircle, MapPin, Phone, Mail, ShieldCheck, Wrench, AlertTriangle, TrendingUp,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const URL = 'https://www.rydnepal.com/blog/rent-vs-buy-vs-emi-bike-nepal';

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with prerender.mjs);
// qNe/aNe render when the reader switches to Nepali.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'Is RYD rent-to-own more expensive than buying a bike outright in Nepal?',
    a: 'Yes, and we do not hide it. Over 18 months the Pro Monthly plan totals about Rs. 5,46,000, while a new Hero Super Splendor costs around Rs. 2.56 to 2.67 lakh in cash. The difference pays for zero down payment, insurance, all maintenance, a 30-minute replacement bike, and starting to earn from day one without a loan.',
    qNe: 'के RYD को भाडामा-लिएर-आफ्नो बनाउने योजना नेपालमा बाइक सिधै किन्नुभन्दा महँगो छ?',
    aNe: 'हो, र हामी यो लुकाउँदैनौं। १८ महिनामा प्रो मासिक योजनाको कुल करिब रु. ५,४६,००० हुन्छ, जबकि नयाँ हिरो सुपर स्प्लेन्डरको नगद मूल्य करिब रु. २.५६ देखि २.६७ लाख पर्छ। फरक रकमले शून्य डाउन पेमेन्ट, बीमा, सबै मर्मत, ३० मिनेटमा रिप्लेसमेन्ट बाइक, र लोनबिना पहिलो दिनदेखि कमाइ सुरु गर्ने सुविधा किन्छ।',
  },
  {
    q: 'What is the bike loan interest rate in Nepal in 2026?',
    a: 'Promotional schemes advertise rates from around 7.99% (for example Yamaha finance offers), while hire-purchase lenders like Hulas Finserv charge roughly 12 to 16% depending on your down payment. Most schemes require a 30 to 50% down payment plus income documents and often a guarantor.',
    qNe: '२०२६ मा नेपालमा बाइक लोनको ब्याजदर कति छ?',
    aNe: 'प्रवर्द्धनात्मक योजनाहरूले करिब ७.९९% देखिको दर विज्ञापन गर्छन् (जस्तै यामाहा फाइनान्स अफर), जबकि हुलास फिनसर्भ जस्ता हायर-पर्चेज कम्पनीहरूले डाउन पेमेन्ट अनुसार करिब १२ देखि १६% लिन्छन्। धेरैजसो योजनामा ३० देखि ५०% डाउन पेमेन्ट, आम्दानीका कागजात र प्रायः जमानीकर्ता चाहिन्छ।',
  },
  {
    q: 'Can a Pathao rider get a bike loan without a salary slip?',
    a: 'It is difficult. Banks and finance companies usually ask for income proof, a guarantor, and a large down payment. Gig income without payslips is often rejected. RYD Nepal requires no credit check, no guarantor, and no down payment.',
    qNe: 'के पाठाओ राइडरले तलब पर्चीबिना बाइक लोन पाउन सक्छ?',
    aNe: 'गाह्रो छ। बैंक र फाइनान्स कम्पनीहरूले सामान्यतया आम्दानीको प्रमाण, जमानीकर्ता र ठूलो डाउन पेमेन्ट माग्छन्। तलब पर्चीबिनाको गिग आम्दानी प्रायः अस्वीकृत हुन्छ। RYD Nepal मा क्रेडिट चेक छैन, जमानीकर्ता चाहिँदैन, र डाउन पेमेन्ट छैन।',
  },
  {
    q: 'How much does a second-hand bike cost in Kathmandu?',
    a: 'Listings on Hamrobazaar and RamroGaadi start around Rs. 42,000, but a reliable commuter bike that can survive daily gig mileage typically costs Rs. 1 to 1.8 lakh, plus ownership transfer (namsari) fees and whatever hidden repairs the seller did not mention.',
    qNe: 'काठमाडौंमा सेकेन्ड ह्यान्ड बाइक कति पर्छ?',
    aNe: 'हाम्रोबजार र राम्रोगाडीमा सूचीहरू करिब रु. ४२,००० बाट सुरु हुन्छन्, तर दैनिक गिग माइलेज थेग्न सक्ने भरपर्दो कम्युटर बाइक सामान्यतया रु. १ देखि १.८ लाख पर्छ, त्यसमाथि नामसारी शुल्क र बिक्रेताले नभनेका लुकेका मर्मत खर्च थपिन्छन्।',
  },
  {
    q: 'How much does bike ownership transfer (namsari) cost in Nepal?',
    a: 'Government transfer fees run roughly Rs. 1,000 to 10,000 depending on the province and vehicle, and agents typically charge around Rs. 1,200 on top. Both buyer and seller must appear at the transport office with the blue book and tax clearance, which many sellers delay or avoid.',
    qNe: 'नेपालमा बाइक नामसारी गर्न कति खर्च लाग्छ?',
    aNe: 'सरकारी नामसारी शुल्क प्रदेश र सवारी अनुसार करिब रु. १,००० देखि १०,००० सम्म पर्छ, र एजेन्टहरूले माथि करिब रु. १,२०० थप लिन्छन्। किन्ने र बेच्ने दुवै ब्लुबुक र कर चुक्ता प्रमाणसहित यातायात कार्यालयमा उपस्थित हुनुपर्छ, जुन धेरै बिक्रेताले ढिलाइ वा बेवास्ता गर्छन्।',
  },
  {
    q: "Do I really own the bike at the end of RYD's rent-to-own plan?",
    a: 'Yes. On the Pro Monthly plan (Rs. 7,000/week), the Hero Super Splendor 125cc is transferred to your name after 1.5 years of payments. The Weekly (Rs. 5,600/week) and Prepayment (Rs. 21,000/month) plans are pure rentals with no ownership at the end.',
    qNe: 'के RYD को योजना सकिएपछि बाइक साँच्चै मेरो हुन्छ?',
    aNe: 'हुन्छ। प्रो मासिक योजनामा (रु. ७,०००/हप्ता), १.५ वर्षको भुक्तानीपछि हिरो सुपर स्प्लेन्डर 125cc तपाईंको नाममा नामसारी हुन्छ। साप्ताहिक (रु. ५,६००/हप्ता) र प्रिपेमेन्ट (रु. २१,०००/महिना) योजनाहरू शुद्ध भाडा हुन्, अन्त्यमा स्वामित्व हुँदैन।',
  },
  {
    q: 'Which option is cheapest overall: cash, used, EMI, or rent-to-own?',
    a: 'On pure rupees, buying new in cash is cheapest if you have around Rs. 2.6 lakh saved. If you have savings plus salary documents, a bank EMI beats rent-to-own in the long run. Rent-to-own wins when you have neither and need a bike earning money this week.',
    qNe: 'समग्रमा सबैभन्दा सस्तो विकल्प कुन हो: नगद, पुरानो, EMI वा भाडामा-लिएर-आफ्नो?',
    aNe: 'शुद्ध रुपैयाँको हिसाबले, करिब रु. २.६ लाख बचत छ भने नगदमा नयाँ किन्नु सबैभन्दा सस्तो हो। बचत र तलबका कागजात दुवै छन् भने दीर्घकालमा बैंक EMI ले भाडामा-लिएर-आफ्नोलाई जित्छ। दुवै छैन र यही हप्ता कमाउने बाइक चाहिन्छ भने भाडामा-लिएर-आफ्नो जित्छ।',
  },
];

const QUICK_FACTS: [string, string][] = [
  ['4 ways to get a bike: cash, used, EMI, rent-to-own', 'बाइक पाउने ४ तरिका: नगद, पुरानो, EMI, भाडामा-लिएर-आफ्नो'],
  ['New Hero Super Splendor: roughly Rs. 2.56 to 2.67 lakh', 'नयाँ हिरो सुपर स्प्लेन्डर: करिब रु. २.५६ देखि २.६७ लाख'],
  ['Bank EMI: 30 to 50% down payment + income documents', 'बैंक EMI: ३० देखि ५०% डाउन पेमेन्ट + आम्दानीका कागजात'],
  ['RYD rent-to-own: Rs. 0 down, earn from day one', 'RYD भाडामा-लिएर-आफ्नो: रु. ० डाउन, पहिलो दिनदेखि कमाइ'],
];

// Honest 18-month rent-to-own math, side by side with the sticker price.
const HONEST_ROWS: [string, string, string, string][] = [
  // [label EN, value EN, label NE, value NE]
  ['Pro Monthly plan', 'Rs. 7,000/week × 78 weeks (18 months)', 'प्रो मासिक योजना', 'रु. ७,०००/हप्ता × ७८ हप्ता (१८ महिना)'],
  ['Total you pay RYD', 'About Rs. 5,46,000', 'तपाईंले RYD लाई तिर्ने कुल', 'करिब रु. ५,४६,०००'],
  ['New Super Splendor sticker price', 'Rs. 2,56,900 (TL) to Rs. 2,66,900 (XTec BS6)', 'नयाँ सुपर स्प्लेन्डरको सूचीमूल्य', 'रु. २,५६,९०० (TL) देखि रु. २,६६,९०० (XTec BS6)'],
  ['Difference', 'Roughly Rs. 2.8 to 2.9 lakh more than the showroom price', 'फरक', 'शोरुम मूल्यभन्दा करिब रु. २.८ देखि २.९ लाख बढी'],
];

// The big 4-way comparison. One object per option, en/ne pairs per field.
const COMPARE: {
  option: string; optionNe: string;
  upfront: string; upfrontNe: string;
  total: string; totalNe: string;
  included: string; includedNe: string;
  own: string; ownNe: string;
  risk: string; riskNe: string;
  highlight?: boolean;
}[] = [
  {
    option: 'Buy new (cash)', optionNe: 'नयाँ किन्ने (नगद)',
    upfront: 'Rs. 2.56 to 2.67 lakh + registration', upfrontNe: 'रु. २.५६ देखि २.६७ लाख + दर्ता',
    total: 'Roughly Rs. 3.1 to 3.4 lakh incl. maintenance & insurance', totalNe: 'मर्मत र बीमासहित करिब रु. ३.१ देखि ३.४ लाख',
    included: 'Nothing; you pay all servicing, insurance, repairs', includedNe: 'केही छैन; सर्भिसिङ, बीमा, मर्मत सबै आफैं तिर्ने',
    own: 'Yes, from day one', ownNe: 'हुन्छ, पहिलो दिनदेखि',
    risk: 'Capital locked in a depreciating bike; years of saving first', riskNe: 'मूल्य घट्दै जाने बाइकमा पुँजी अड्किन्छ; पहिले वर्षौंको बचत चाहिन्छ',
  },
  {
    option: 'Buy used', optionNe: 'पुरानो किन्ने',
    upfront: 'Rs. 42,000 (risky) to Rs. 1.8 lakh (reliable) + namsari', upfrontNe: 'रु. ४२,००० (जोखिमपूर्ण) देखि रु. १.८ लाख (भरपर्दो) + नामसारी',
    total: 'Unpredictable; repairs can add Rs. 50,000+ over 18 months', totalNe: 'अनिश्चित; १८ महिनामा मर्मतले रु. ५०,०००+ थप्न सक्छ',
    included: 'Nothing; no warranty, unknown history', includedNe: 'केही छैन; वारेन्टी छैन, इतिहास अज्ञात',
    own: 'Yes, if namsari actually completes', ownNe: 'हुन्छ, नामसारी साँच्चै पूरा भयो भने',
    risk: 'Hidden damage, transfer hassle, breakdowns eat gig income', riskNe: 'लुकेको क्षति, नामसारी झन्झट, ब्रेकडाउनले गिग कमाइ खान्छ',
  },
  {
    option: 'Bank / finance EMI', optionNe: 'बैंक / फाइनान्स EMI',
    upfront: '30 to 50% down: roughly Rs. 77,000 to 1.28 lakh', upfrontNe: '३० देखि ५०% डाउन: करिब रु. ७७,००० देखि १.२८ लाख',
    total: 'Roughly Rs. 3.4 to 3.8 lakh incl. interest, maintenance & insurance', totalNe: 'ब्याज, मर्मत र बीमासहित करिब रु. ३.४ देखि ३.८ लाख',
    included: 'Nothing; EMIs due even in months you cannot ride', includedNe: 'केही छैन; चलाउन नसकेको महिनामा पनि EMI तिर्नुपर्छ',
    own: 'Yes, after the loan clears', ownNe: 'हुन्छ, ऋण चुक्ता भएपछि',
    risk: 'Rejection without salary slips; repossession if you miss EMIs', riskNe: 'तलब पर्चीबिना अस्वीकृति; EMI छुटे बाइक फिर्ता लगिन्छ',
  },
  {
    option: 'RYD rent-to-own (Pro Monthly)', optionNe: 'RYD भाडामा-लिएर-आफ्नो (प्रो मासिक)',
    upfront: 'Rs. 0', upfrontNe: 'रु. ०',
    total: 'About Rs. 5,46,000, everything included', totalNe: 'करिब रु. ५,४६,०००, सबै समावेश',
    included: 'Insurance, all maintenance every 1,500 km, 24/7 breakdown support, 30-min replacement bike', includedNe: 'बीमा, हरेक १,५०० किमिमा सबै मर्मत, २४/७ ब्रेकडाउन सहायता, ३० मिनेटमा रिप्लेसमेन्ट बाइक',
    own: 'Yes, after 1.5 years', ownNe: 'हुन्छ, १.५ वर्षपछि',
    risk: 'Highest total cost; weekly payments must stay on track', riskNe: 'सबैभन्दा बढी कुल लागत; साप्ताहिक भुक्तानी नियमित राख्नुपर्छ',
    highlight: true,
  },
];

// What the rent-to-own premium actually buys.
const PREMIUM_ITEMS: [React.ComponentType<{ className?: string }>, string, string][] = [
  [Wallet, 'Zero down payment. No Rs. 25,000 to 77,000+ entry barrier, no years of saving before you can start.', 'शून्य डाउन पेमेन्ट। रु. २५,००० देखि ७७,०००+ को प्रवेश बाधा छैन, सुरु गर्नुअघि वर्षौंको बचत चाहिँदैन।'],
  [TrendingUp, 'Earning from day one. Over 18 months an active rider grosses roughly Rs. 7 to 11 lakh on Pathao, Uber, InDrive and Yango while the bike pays for itself.', 'पहिलो दिनदेखि कमाइ। १८ महिनामा सक्रिय राइडरले पाठाओ, उबर, इनड्राइभ र यांगोमा करिब रु. ७ देखि ११ लाख कुल कमाउँछ, बाइकले आफ्नो मूल्य आफैं तिर्छ।'],
  [Wrench, 'Maintenance and insurance included. At gig mileage, servicing, oil, brakes, tires and insurance realistically cost Rs. 3,000 to 5,000/month if you pay them yourself, roughly Rs. 55,000 to 90,000 over 18 months.', 'मर्मत र बीमा समावेश। गिग माइलेजमा सर्भिसिङ, मोबिल, ब्रेक, टायर र बीमा आफैं तिर्दा यथार्थमा महिनाको रु. ३,००० देखि ५,००० पर्छ, १८ महिनामा करिब रु. ५५,००० देखि ९०,०००।'],
  [ShieldCheck, 'Uptime protection. A breakdown day costs Rs. 1,500 to 2,500 in lost earnings; the 30-minute replacement bike keeps you on the road.', 'अपटाइम सुरक्षा। ब्रेकडाउनको एक दिनले रु. १,५०० देखि २,५०० कमाइ गुमाउँछ; ३० मिनेटको रिप्लेसमेन्ट बाइकले तपाईंलाई सडकमै राख्छ।'],
  [CheckCircle, 'No rejection risk. No credit check, no guarantor, no salary slips, no loan file that can be refused.', 'अस्वीकृतिको जोखिम छैन। क्रेडिट चेक छैन, जमानीकर्ता छैन, तलब पर्ची छैन, अस्वीकार हुन सक्ने ऋण फाइल छैन।'],
  [Scale, 'No resale or transfer hassle. No haggling on Hamrobazaar, no namsari queues, no buyer who disappears.', 'पुनर्बिक्री वा नामसारीको झन्झट छैन। हाम्रोबजारमा मोलमोलाइ छैन, नामसारीको लाइन छैन, हराउने खरिदकर्ता छैन।'],
];

const BlogRentVsBuy: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'Rent vs Buy vs EMI: The Real Cost of Getting a Bike for Pathao in Nepal (2026) | RYD Nepal'
      : 'भाडा कि किन्ने कि EMI: नेपालमा पाठाओका लागि बाइकको वास्तविक लागत (२०२६) | RYD Nepal',
    description: en
      ? 'Rent-to-own costs more than a bank EMI on paper. We show the full 18-month math for buying new, buying used, bike EMI and RYD rent-to-own in Nepal, honestly.'
      : 'कागजमा भाडामा-लिएर-आफ्नो बैंक EMI भन्दा महँगो छ। नयाँ किन्ने, पुरानो किन्ने, बाइक EMI र RYD भाडामा-लिएर-आफ्नोको पूरा १८ महिने हिसाब इमानदारीपूर्वक हेर्नुहोस्।',
    keywords:
      'bike loan nepal, second hand bike vs rent, bike emi nepal, rent to own bike nepal, bike price nepal pathao, hero super splendor price nepal, two wheeler loan nepal, used bike kathmandu, bike namsari cost nepal, RYD Nepal',
    path: '/blog/rent-vs-buy-vs-emi-bike-nepal',
    ogType: 'article',
    ogTitle: 'Rent vs Buy vs EMI: The Honest Math of Getting a Bike for Pathao in Nepal',
    ogDescription:
      'Yes, rent-to-own totals more than the showroom price. Here is the full table anyway: cash vs used vs EMI vs RYD rent-to-own, with every number on it.',
    ogImage: 'https://www.rydnepal.com/og/rent-vs-buy-emi.jpg',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'Rent vs Buy vs EMI: The Real Cost of Getting a Bike for Pathao in Nepal', url: URL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Rent vs Buy vs EMI: The Real Cost of Getting a Bike for Pathao in Nepal (2026)',
        description:
          'An honest 18-month comparison of the four ways to get a bike for gig work in Kathmandu: buying new in cash, buying used, bank EMI, and RYD Nepal rent-to-own, including the full cost table.',
        image: 'https://www.rydnepal.com/og/rent-vs-buy-emi.jpg',
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
          { '@type': 'Thing', name: 'Bike Loan Nepal' },
          { '@type': 'Thing', name: 'Rent to Own Bike Nepal' },
          { '@type': 'Thing', name: 'Bike EMI Nepal' },
          { '@type': 'Thing', name: 'Second Hand Bike Kathmandu' },
        ],
        mentions: [
          { '@type': 'Product', name: 'Hero Super Splendor 125' },
          { '@type': 'SoftwareApplication', name: 'Pathao' },
          { '@type': 'Organization', name: 'Hulas Finserv' },
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
            <Scale className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog · The Honest Comparison' : 'RYD Nepal ब्लग · इमानदार तुलना'}</span>
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
              <>Rent vs Buy vs EMI: The Real Cost of <span className="text-primary">Getting a Bike for Pathao</span> in Nepal (2026)</>
            ) : (
              <>भाडा कि किन्ने कि EMI: नेपालमा <span className="text-primary">पाठाओका लागि बाइक</span> पाउने वास्तविक लागत (२०२६)</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'You need a bike to earn in Kathmandu. Pathao, Uber Bike, InDrive, Yango, food delivery: every rupee of that income starts with two wheels under you. There are exactly four ways to get them: buy new in cash, buy used, take a bank EMI, or rent-to-own. This article puts real numbers on all four, including the one comparison most rental companies would rather you did not see.'
              : 'काठमाडौंमा कमाउन तपाईंलाई बाइक चाहिन्छ। पाठाओ, उबर बाइक, इनड्राइभ, यांगो, खाना डेलिभरी: त्यो आम्दानीको हरेक रुपैयाँ तपाईंमुनिको दुई पाङ्ग्राबाट सुरु हुन्छ। बाइक पाउने ठ्याक्कै चार तरिका छन्: नगदमा नयाँ किन्ने, पुरानो किन्ने, बैंक EMI लिने, वा भाडामा-लिएर-आफ्नो बनाउने। यो लेखले चारै विकल्पमा वास्तविक संख्या राख्छ, त्यो तुलना पनि जुन धेरैजसो भाडा कम्पनीहरू तपाईंले नदेखेको चाहन्थे।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: July 1, 2026' : 'प्रकाशित: २०२६ जुलाई १'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {en ? '10 min read' : '१० मिनेट पठन'}
            </span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Money & Ownership' : 'पैसा र स्वामित्व'}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {en ? (
            <>A quick promise before we start: <strong>we will not hide our own numbers.</strong> RYD Nepal&apos;s rent-to-own plan, added up over 18 months, costs more than a new Hero Super Splendor&apos;s showroom price. You will see that in a table below, in full. We think the honest math still makes rent-to-own the right choice for a specific kind of person, and the wrong choice for others. By the end, you will know which one you are.</>
          ) : (
            <>सुरु गर्नुअघि एउटा वाचा: <strong>हामी आफ्नै संख्या लुकाउँदैनौं।</strong> RYD Nepal को भाडामा-लिएर-आफ्नो योजना, १८ महिनामा जोड्दा, नयाँ हिरो सुपर स्प्लेन्डरको शोरुम मूल्यभन्दा बढी पर्छ। त्यो तपाईंले तल तालिकामा पूरै देख्नुहुनेछ। इमानदार हिसाबले पनि भाडामा-लिएर-आफ्नो एक खास किसिमको मानिसका लागि सही र अरूका लागि गलत छनोट हो भन्ने हामी ठान्छौं। लेखको अन्त्यसम्म, तपाईं कुन हो भन्ने थाहा पाउनुहुनेछ।</>
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

        {/* Option 1: buy new cash */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Option 1: Buy new with cash, around Rs. 2.56 to 2.67 lakh' : 'विकल्प १: नगदमा नयाँ किन्ने, करिब रु. २.५६ देखि २.६७ लाख'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'The Hero Super Splendor 125, the workhorse of Kathmandu gig riders, lists at around Rs. 2,56,900 for the TL variant and Rs. 2,66,900 for the newer XTec BS6 variant (prices vary slightly by dealer and region). On top of the sticker price come registration and road tax, plus insurance of very roughly Rs. 8,000 to 12,000 per year for meaningful coverage.'
            : 'काठमाडौंका गिग राइडरहरूको भरपर्दो साथी हिरो सुपर स्प्लेन्डर 125 को सूचीमूल्य TL भेरियन्टका लागि करिब रु. २,५६,९०० र नयाँ XTec BS6 भेरियन्टका लागि रु. २,६६,९०० छ (डिलर र क्षेत्र अनुसार मूल्य अलिकति फरक पर्छ)। सूचीमूल्यमाथि दर्ता र सडक कर थपिन्छ, साथै अर्थपूर्ण बीमाका लागि वर्षको धेरै हदसम्म रु. ८,००० देखि १२,०००।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'And ownership is not free after the purchase either. A gig rider covering 80 to 120 km a day puts serious wear on a commuter bike: oil changes, brake pads, tires, chain and sprocket work. Paid out of pocket, that realistically runs Rs. 2,500 to 4,000 a month at gig mileage. Over 18 months, add roughly Rs. 45,000 to 70,000 to the cash price.'
            : 'र किनेपछि स्वामित्व पनि निःशुल्क छैन। दिनको ८० देखि १२० किमि चलाउने गिग राइडरले कम्युटर बाइकमा निकै चाप पार्छ: मोबिल परिवर्तन, ब्रेक प्याड, टायर, चेन र स्प्रोकेटको काम। आफ्नै खल्तीबाट तिर्दा, गिग माइलेजमा त्यो यथार्थमा महिनाको रु. २,५०० देखि ४,००० पर्छ। १८ महिनामा, नगद मूल्यमा करिब रु. ४५,००० देखि ७०,००० थप्नुहोस्।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <><strong>Who this suits:</strong> anyone who already has around Rs. 2.6 lakh sitting in savings. If that is you, buying new in cash is genuinely the cheapest path to a bike, and we will say so again at the end. The problem is that for most people considering gig work, that pile of cash is precisely the thing that does not exist.</>
          ) : (
            <><strong>यो कसका लागि उपयुक्त छ:</strong> जोसँग पहिले नै बचतमा करिब रु. २.६ लाख छ। त्यो तपाईं हो भने, नगदमा नयाँ किन्नु साँच्चै बाइकसम्मको सबैभन्दा सस्तो बाटो हो, र हामी अन्त्यमा फेरि त्यही भन्नेछौं। समस्या के हो भने गिग काम सोच्ने धेरैजसो मानिसका लागि, त्यो नगदको थुप्रो नै ठ्याक्कै नभएको कुरा हो।</>
          )}
        </p>

        {/* Option 2: buy used */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Option 2: Buy used, from Rs. 42,000 on Hamrobazaar (read the fine print)' : 'विकल्प २: पुरानो किन्ने, हाम्रोबजारमा रु. ४२,००० देखि (स-साना अक्षर पढ्नुहोस्)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Used listings on Hamrobazaar and RamroGaadi start around Rs. 42,000, and on paper this looks like the obvious budget move. In practice, a bike that cheap is usually a decade old with six-digit kilometres, and a used commuter you can actually trust for daily gig work tends to cost Rs. 1 to 1.8 lakh. Then the hidden costs begin:'
            : 'हाम्रोबजार र राम्रोगाडीमा पुराना सूचीहरू करिब रु. ४२,००० बाट सुरु हुन्छन्, र कागजमा यो स्पष्ट बजेट-मैत्री कदम देखिन्छ। व्यवहारमा, त्यति सस्तो बाइक प्रायः दशक पुरानो र छ-अंकको किलोमिटर चलेको हुन्छ, र दैनिक गिग कामका लागि साँच्चै भरोसा गर्न सकिने पुरानो कम्युटर रु. १ देखि १.८ लाख पर्छ। त्यसपछि लुकेका खर्चहरू सुरु हुन्छन्:'}
        </p>
        <ul className="space-y-3 mb-4 text-slate-600">
          <li className="flex gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Namsari (ownership transfer) cost and hassle.</strong> Government transfer fees run roughly Rs. 1,000 to 10,000 by province and vehicle, agents charge around Rs. 1,200 more, and both buyer and seller must show up at the transport office with the blue book and tax clearance. Many sellers stall, and riding a bike still registered to a stranger is a risk you carry.</> : <><strong>नामसारीको खर्च र झन्झट।</strong> सरकारी नामसारी शुल्क प्रदेश र सवारी अनुसार करिब रु. १,००० देखि १०,००० पर्छ, एजेन्टले करिब रु. १,२०० थप लिन्छन्, र किन्ने-बेच्ने दुवै ब्लुबुक र कर चुक्तासहित यातायात कार्यालय पुग्नुपर्छ। धेरै बिक्रेता ढिलाइ गर्छन्, र अर्कैको नाममा दर्ता भएको बाइक चलाउनु तपाईंले बोक्ने जोखिम हो।</>}</span></li>
          <li className="flex gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Unknown maintenance history, no warranty.</strong> You cannot see a skipped oil change or a flooded engine in a photo. Whatever breaks after handover is your bill.</> : <><strong>अज्ञात मर्मत इतिहास, वारेन्टी छैन।</strong> छुटेको मोबिल परिवर्तन वा डुबेको इन्जिन फोटोमा देखिँदैन। हस्तान्तरणपछि जे बिग्रन्छ, त्यो तपाईंकै बिल हो।</>}</span></li>
          <li className="flex gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Repairs eat gig earnings twice.</strong> Once at the workshop, and again in the rides you miss while the bike sits there. An old bike at gig mileage can easily burn Rs. 50,000+ in repairs and lost days over 18 months.</> : <><strong>मर्मतले गिग कमाइ दुई पटक खान्छ।</strong> एक पटक वर्कशपमा, र फेरि बाइक त्यहीँ थन्किँदा छुटेका राइडहरूमा। गिग माइलेजमा पुरानो बाइकले १८ महिनामा मर्मत र गुमेका दिनमा सजिलै रु. ५०,०००+ जलाउन सक्छ।</>}</span></li>
          <li className="flex gap-3"><XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Platform verification risk.</strong> Pathao requires a valid blue book, up-to-date tax and insurance to register. It does not publish a clear maximum vehicle age, but a very old, rough bike is more likely to be flagged at verification and far more likely to fail you on the road.</> : <><strong>प्लेटफर्म प्रमाणीकरणको जोखिम।</strong> पाठाओमा दर्ता गर्न मान्य ब्लुबुक, अद्यावधिक कर र बीमा चाहिन्छ। यसले स्पष्ट अधिकतम सवारी उमेर प्रकाशित गर्दैन, तर धेरै पुरानो, जीर्ण बाइक प्रमाणीकरणमा रोकिने र सडकमा धोका दिने सम्भावना धेरै बढी हुन्छ।</>}</span></li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'A good used bike bought from someone you trust can absolutely work out. But as a plan for starting gig work, "cheap used bike" is a lottery ticket where the losing outcome is your income source dying in a workshop.'
            : 'चिनेको, भरोसा भएको मान्छेबाट किनेको राम्रो पुरानो बाइकले पक्कै काम गर्न सक्छ। तर गिग काम सुरु गर्ने योजनाका रूपमा, "सस्तो पुरानो बाइक" यस्तो चिट्ठा हो जसको हार्ने नतिजा भनेको तपाईंको आम्दानीको स्रोत वर्कशपमा मर्नु हो।'}
        </p>

        {/* Option 3: EMI */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Option 3: Bank or finance EMI, if they approve you' : 'विकल्प ३: बैंक वा फाइनान्स EMI, उनीहरूले स्वीकृत गरे भने'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Two-wheeler financing in Nepal comes from banks and hire-purchase companies like Hulas Finserv, plus brand schemes (Yamaha has advertised finance from around 7.99%). Typical hire-purchase rates run roughly 12 to 16%, and the rate depends on how much you put down: Hulas Finserv, for example, has offered 16% at 30% down, 14% at 40% down, and 12% at 50% down on 24-month tenures. Promotional single-digit rates exist but usually demand large down payments.'
            : 'नेपालमा दुई पाङ्ग्रे फाइनान्सिङ बैंक र हुलास फिनसर्भ जस्ता हायर-पर्चेज कम्पनीहरूबाट आउँछ, साथै ब्रान्ड योजनाहरूबाट (यामाहाले करिब ७.९९% देखिको फाइनान्स विज्ञापन गरेको छ)। सामान्य हायर-पर्चेज दर करिब १२ देखि १६% चल्छ, र दर तपाईंले कति डाउन गर्नुहुन्छ भन्नेमा भर पर्छ: उदाहरणका लागि, हुलास फिनसर्भले २४ महिने अवधिमा ३०% डाउनमा १६%, ४०% डाउनमा १४%, र ५०% डाउनमा १२% दिएको छ। एकल-अंकका प्रवर्द्धनात्मक दरहरू छन् तर प्रायः ठूलो डाउन पेमेन्ट माग्छन्।'}
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Run the numbers on a Rs. 2.56 lakh Super Splendor: a 30% down payment is about Rs. 77,000 up front. Financing the remaining Rs. 1.8 lakh at around 14% over 24 months means an EMI of roughly Rs. 8,500 to 9,000 a month, whether you rode that month or not. Total paid lands around Rs. 2.85 to 3 lakh, plus maintenance and insurance on top, exactly as with a cash purchase.'
            : 'रु. २.५६ लाखको सुपर स्प्लेन्डरमा हिसाब गरौं: ३०% डाउन पेमेन्ट भनेको अग्रिम करिब रु. ७७,००० हो। बाँकी रु. १.८ लाख करिब १४% मा २४ महिनामा फाइनान्स गर्दा महिनाको करिब रु. ८,५०० देखि ९,००० EMI पर्छ, त्यो महिना चलाए पनि नचलाए पनि। तिरेको कुल करिब रु. २.८५ देखि ३ लाख पुग्छ, माथि मर्मत र बीमा थपिन्छ, ठ्याक्कै नगद खरिद जस्तै।'}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <p className="font-bold text-slate-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> {en ? 'The part the brochures skip' : 'ब्रोसरहरूले छुटाउने कुरा'}</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {en
              ? 'Approval requires income documents, usually a salary slip or business registration, often a guarantor, and a credit history. Gig workers are the exact profile finance companies struggle to approve: real income, but no payslip to prove it. Many riders who could comfortably afford Rs. 9,000 a month never get the chance to, because the loan file is rejected before the bike is ever discussed. And if EMIs slip later, the financed bike can be repossessed.'
              : 'स्वीकृतिका लागि आम्दानीका कागजात चाहिन्छ, प्रायः तलब पर्ची वा व्यवसाय दर्ता, धेरैजसो जमानीकर्ता, र क्रेडिट इतिहास। गिग कामदारहरू ठ्याक्कै त्यही प्रोफाइल हुन् जसलाई फाइनान्स कम्पनीहरू स्वीकृत गर्न धकाउँछन्: वास्तविक आम्दानी छ, तर प्रमाणित गर्ने तलब पर्ची छैन। महिनाको रु. ९,००० सजिलै तिर्न सक्ने धेरै राइडरले कहिल्यै मौका पाउँदैनन्, किनभने बाइकको कुरै हुनुअघि ऋण फाइल अस्वीकृत हुन्छ। र पछि EMI छुट्यो भने, फाइनान्स गरिएको बाइक फिर्ता लगिन सक्छ।'}
          </p>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <><strong>Who this suits:</strong> someone with a salaried job (or documented business income), savings for the down payment, and a guarantor. For that person, EMI is cheaper than rent-to-own over the long run, and we will not pretend otherwise.</>
          ) : (
            <><strong>यो कसका लागि उपयुक्त छ:</strong> तलबी जागिर (वा कागजात भएको व्यवसाय आम्दानी), डाउन पेमेन्टका लागि बचत, र जमानीकर्ता भएको व्यक्ति। त्यस्तो व्यक्तिका लागि, दीर्घकालमा EMI भाडामा-लिएर-आफ्नोभन्दा सस्तो छ, र हामी अन्यथा नाटक गर्दैनौं।</>
          )}
        </p>

        {/* Option 4: RYD rent-to-own */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Option 4: RYD rent-to-own, and yes, here is the uncomfortable table' : 'विकल्प ४: RYD भाडामा-लिएर-आफ्नो, र हो, असहज तालिका यहाँ छ'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en ? (
            <>On RYD Nepal&apos;s <Link to="/services" className="text-primary font-semibold hover:underline">Pro Monthly plan</Link>, you pay Rs. 7,000 a week and the Hero Super Splendor 125cc becomes yours after 1.5 years. Multiply it out and do not flinch:</>
          ) : (
            <>RYD Nepal को <Link to="/services" className="text-primary font-semibold hover:underline">प्रो मासिक योजना</Link>मा, तपाईं हप्ताको रु. ७,००० तिर्नुहुन्छ र १.५ वर्षपछि हिरो सुपर स्प्लेन्डर 125cc तपाईंको हुन्छ। गुणा गर्नुहोस् र नडराउनुहोस्:</>
          )}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {HONEST_ROWS.map(([le, ve, ln, vn], i) => (
                <tr key={i} className={i === HONEST_ROWS.length - 1 ? 'bg-amber-50/60' : ''}>
                  <td className="p-4 font-semibold text-slate-900">{en ? le : ln}</td>
                  <td className="p-4">{en ? ve : vn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'There it is. Over the full term you pay roughly twice the showroom sticker. If total rupees were the only thing that mattered, this article would end here and we would tell you to buy in cash. But the premium is not money vanishing; it is buying six specific things:'
            : 'त्यहीँ छ। पूरा अवधिमा तपाईं शोरुम मूल्यको करिब दोब्बर तिर्नुहुन्छ। कुल रुपैयाँ मात्रै महत्त्वपूर्ण कुरा भए, यो लेख यहीँ सकिन्थ्यो र हामी तपाईंलाई नगदमा किन्न भन्थ्यौं। तर त्यो थप रकम हराउने पैसा होइन; यसले छवटा खास कुरा किन्छ:'}
        </p>
        <ul className="space-y-3 mb-6 text-slate-600">
          {PREMIUM_ITEMS.map(([Icon, eng, nep], i) => (
            <li key={i} className="flex gap-3"><Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? eng : nep}</span></li>
          ))}
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>Add it up honestly: the included maintenance, insurance and uptime protection are realistically worth somewhere around Rs. 4,000 to 6,000 a month at gig mileage, or Rs. 70,000 to 1 lakh over the term. That covers a large slice of the gap, not all of it. The rest is the price of walking in with empty pockets on Monday and earning by Tuesday. We wrote a full breakdown of the ownership plan in{' '}
              <Link to="/blog/rent-to-own-hero-splendor-125" className="text-primary font-semibold hover:underline">our rent-to-own Hero Splendor guide</Link>.</>
          ) : (
            <>इमानदारीपूर्वक जोड्नुहोस्: समावेश गरिएको मर्मत, बीमा र अपटाइम सुरक्षा गिग माइलेजमा यथार्थमा महिनाको करिब रु. ४,००० देखि ६,०००, वा अवधिभरमा रु. ७०,००० देखि १ लाख बराबर छ। यसले फरकको ठूलो हिस्सा ढाक्छ, सबै होइन। बाँकी भनेको सोमबार खाली खल्ती लिएर आउने र मंगलबारदेखि कमाउने सुविधाको मूल्य हो। स्वामित्व योजनाको पूरा विवरण हामीले{' '}
              <Link to="/blog/rent-to-own-hero-splendor-125" className="text-primary font-semibold hover:underline">हाम्रो भाडामा-लिएर-आफ्नो हिरो स्प्लेन्डर गाइड</Link>मा लेखेका छौं।</>
          )}
        </p>

        {/* Big comparison table */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'All four options, side by side (18-month view)' : 'चारै विकल्प, सँगसँगै (१८ महिने दृष्टिकोण)'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en
            ? 'Fuel is excluded everywhere since it is the same on every option. Figures are honest estimates for a Super Splendor-class commuter at gig mileage; your exact numbers will vary.'
            : 'इन्धन सबैतिर हटाइएको छ किनभने यो हरेक विकल्पमा उस्तै हो। यी संख्याहरू गिग माइलेजमा सुपर स्प्लेन्डर-वर्गको कम्युटरका लागि इमानदार अनुमान हुन्; तपाईंका ठ्याक्कै संख्या फरक पर्नेछन्।'}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Option' : 'विकल्प'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Upfront cost' : 'अग्रिम खर्च'}</th>
                <th className="text-left p-4 font-bold">{en ? '18-month total' : '१८ महिने कुल'}</th>
                <th className="text-left p-4 font-bold">{en ? "What's included" : 'के समावेश छ'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Own at end?' : 'अन्त्यमा आफ्नै?'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Biggest risk' : 'सबैभन्दा ठूलो जोखिम'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {COMPARE.map((row, i) => (
                <tr key={i} className={row.highlight ? 'bg-primary-50/40' : ''}>
                  <td className="p-4 font-semibold text-slate-900">{en ? row.option : row.optionNe}</td>
                  <td className="p-4">{en ? row.upfront : row.upfrontNe}</td>
                  <td className="p-4">{en ? row.total : row.totalNe}</td>
                  <td className="p-4">{en ? row.included : row.includedNe}</td>
                  <td className="p-4">{en ? row.own : row.ownNe}</td>
                  <td className="p-4">{en ? row.risk : row.riskNe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
          <p className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" /> {en ? 'The number the table cannot show' : 'तालिकाले देखाउन नसक्ने संख्या'}</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {en
              ? 'Every buying option requires months or years of saving before the first ride. Rent-to-own inverts the order: an active rider grossing Rs. 1,500 to 2,500 a day earns roughly Rs. 7 to 11 lakh over the same 18 months the payments run. The most expensive column in the table is the only one where the bike funds itself while you use it. More on the earning side in our guide to the gig economy in Kathmandu, linked below.'
              : 'हरेक किन्ने विकल्पमा पहिलो राइडअघि महिनौं वा वर्षौंको बचत चाहिन्छ। भाडामा-लिएर-आफ्नोले क्रम उल्ट्याउँछ: दिनको रु. १,५०० देखि २,५०० कुल कमाउने सक्रिय राइडरले भुक्तानी चल्ने उही १८ महिनामा करिब रु. ७ देखि ११ लाख कमाउँछ। तालिकाको सबैभन्दा महँगो स्तम्भ नै एक मात्र यस्तो हो जहाँ बाइकले तपाईंले प्रयोग गर्दागर्दै आफ्नो मूल्य आफैं तिर्छ। कमाइको पक्षबारे थप हाम्रो काठमाडौं गिग अर्थतन्त्र गाइडमा, तल लिंक छ।'}
          </p>
        </div>

        {/* Which should you choose */}
        <h2 className="text-2xl font-black text-slate-900 mb-6">{en ? 'So which should YOU choose? The honest answer' : 'त तपाईंले कुन रोज्ने? इमानदार जवाफ'}</h2>
        <div className="space-y-4 mb-12">
          <div className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center">1</div>
            <div>
              <p className="font-bold text-slate-900">{en ? 'You have around Rs. 2.6 lakh in cash: buy new.' : 'तपाईंसँग करिब रु. २.६ लाख नगद छ: नयाँ किन्नुहोस्।'}</p>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                {en
                  ? 'Cheapest total cost, ownership from day one, no interest, no rent. Do not rent from us or anyone else; go to the showroom. We mean it.'
                  : 'सबैभन्दा सस्तो कुल लागत, पहिलो दिनदेखि स्वामित्व, ब्याज छैन, भाडा छैन। हामीबाट वा अरू कसैबाट भाडामा नलिनुहोस्; शोरुम जानुहोस्। हामी साँच्चै भन्दैछौं।'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center">2</div>
            <div>
              <p className="font-bold text-slate-900">{en ? 'You have savings for a down payment plus a salary slip: take the EMI.' : 'तपाईंसँग डाउन पेमेन्टका लागि बचत र तलब पर्ची छ: EMI लिनुहोस्।'}</p>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                {en
                  ? 'With documents a bank will accept, financing is cheaper than rent-to-own over the full term. Compare rates hard: the gap between a promotional 8% and a standard 16% is tens of thousands of rupees.'
                  : 'बैंकले स्वीकार गर्ने कागजात छन् भने, पूरा अवधिमा फाइनान्सिङ भाडामा-लिएर-आफ्नोभन्दा सस्तो हुन्छ। दरहरू राम्ररी तुलना गर्नुहोस्: प्रवर्द्धनात्मक ८% र सामान्य १६% बीचको फरक दसौं हजार रुपैयाँ हो।'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 bg-primary-50 border border-primary-200 rounded-2xl p-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center">3</div>
            <div>
              <p className="font-bold text-slate-900">{en ? 'You have neither, and you want to start earning this week: rent-to-own.' : 'तपाईंसँग दुवै छैन, र यही हप्ता कमाउन थाल्न चाहनुहुन्छ: भाडामा-लिएर-आफ्नो।'}</p>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                {en
                  ? 'No savings, no salary slip, no guarantor, and every month of waiting is a month of Pathao income you never see. Rent-to-own costs more in total, and it is the only door that is actually open. You walk in with your license and citizenship copy, and ride out earning the same day.'
                  : 'बचत छैन, तलब पर्ची छैन, जमानीकर्ता छैन, र पर्खिएको हरेक महिना भनेको कहिल्यै नदेख्ने पाठाओ आम्दानीको महिना हो। भाडामा-लिएर-आफ्नो कुलमा बढी पर्छ, र यो नै एक मात्र साँच्चै खुला ढोका हो। तपाईं लाइसेन्स र नागरिकताको प्रतिलिपि लिएर आउनुहुन्छ, र उही दिन कमाउँदै फर्कनुहुन्छ।'}
              </p>
            </div>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>Still deciding whether gig work itself is worth it? Our deep dive into{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">Kathmandu&apos;s gig economy and what riders actually earn</Link>{' '}
              covers the income side of this equation in detail.</>
          ) : (
            <>गिग काम आफैं गर्न लायक छ कि छैन भनेर अझै सोच्दै हुनुहुन्छ? हाम्रो{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">काठमाडौंको गिग अर्थतन्त्र र राइडरहरूले वास्तवमा कति कमाउँछन्</Link>{' '}
              भन्ने लेखले यो समीकरणको आम्दानी पक्ष विस्तारमा समेट्छ।</>
          )}
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
          <h2 className="text-3xl font-black mb-4">{en ? 'You have seen our full math. Now run yours.' : 'तपाईंले हाम्रो पूरा हिसाब देख्नुभयो। अब आफ्नो गर्नुहोस्।'}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            {en
              ? 'If you have the cash or the loan file, go buy a bike, sincerely. If you do not, we built RYD Nepal for exactly you: zero down payment, no credit check, insurance and maintenance included, a replacement bike within 30 minutes, and a Hero Super Splendor that becomes yours after 1.5 years.'
              : 'तपाईंसँग नगद वा ऋण फाइल छ भने, गएर बाइक किन्नुहोस्, साँच्चै। छैन भने, हामीले RYD Nepal ठ्याक्कै तपाईंकै लागि बनाएका हौं: शून्य डाउन पेमेन्ट, क्रेडिट चेक छैन, बीमा र मर्मत समावेश, ३० मिनेटभित्र रिप्लेसमेन्ट बाइक, र १.५ वर्षपछि तपाईंकै हुने हिरो सुपर स्प्लेन्डर।'}
          </p>
          <p className="text-white font-semibold mb-8">
            {en
              ? 'Weekly at Rs. 5,600, Pro Monthly rent-to-own at Rs. 7,000/week, or Prepayment at Rs. 21,000/month (Rs. 700/day). Pick up from Dhalane Pul, Kapan, and start earning today.'
              : 'साप्ताहिक रु. ५,६००, प्रो मासिक भाडामा-लिएर-आफ्नो रु. ७,०००/हप्ता, वा प्रिपेमेन्ट रु. २१,०००/महिना (रु. ७००/दिन)। ढलाने पुल, कपनबाट लिनुहोस् र आजै कमाउन सुरु गर्नुहोस्।'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all inline-flex items-center justify-center gap-2">
              {en ? 'Apply Now' : 'अहिले आवेदन दिनुहोस्'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center">
              {en ? 'Compare All Plans' : 'सबै योजना तुलना गर्नुहोस्'}
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

export default BlogRentVsBuy;
