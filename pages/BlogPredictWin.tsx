import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Trophy, Gift, CheckCircle, ThumbsUp, Share2,
  Users, Calendar, Zap, Instagram, Facebook, Bike, AlertCircle,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const URL = 'https://www.rydnepal.com/blog/ryd-predict-win-fifa-world-cup-2026';

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with prerender.mjs);
// qNe/aNe render when the reader switches to Nepali.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'How do I participate in the RYD Predict & Win giveaway?',
    a: 'Three steps: like the RYD Nepal page, share the match prediction post, and tag 2 friends in the comment with your prediction. An individual prediction post goes live on our Facebook, Instagram, and TikTok pages as soon as each match is fixed.',
    qNe: 'RYD Predict & Win गिभअवेमा कसरी भाग लिने?',
    aNe: 'तीन चरण: RYD Nepal को पेज लाइक गर्नुहोस्, म्याच प्रेडिक्सन पोस्ट सेयर गर्नुहोस्, र कमेन्टमा आफ्नो प्रेडिक्सनसहित २ जना साथीलाई ट्याग गर्नुहोस्। हरेक खेल पक्का हुनेबित्तिकै हाम्रो फेसबुक, इन्स्टाग्राम र टिकटकमा प्रेडिक्सन पोस्ट आउँछ।',
  },
  {
    q: 'Is the giveaway free to enter?',
    a: 'Yes, completely free. You do not need to rent a bike or pay anything — just like, share, tag, and predict.',
    qNe: 'के गिभअवेमा भाग लिन निःशुल्क छ?',
    aNe: 'हो, पूर्ण रूपमा निःशुल्क। बाइक भाडामा लिनु वा केही तिर्नु पर्दैन — लाइक, सेयर, ट्याग र प्रेडिक्ट मात्र गर्नुहोस्।',
  },
  {
    q: 'How are the winners chosen for each match?',
    a: 'For every prediction post, 2 lucky winners are drawn from everyone who predicted the result correctly and completed all three steps (like, share, tag 2 friends). Round of 16 winners get Rs. 500 each, quarter-final winners Rs. 1,000 each, semi-final winners Rs. 2,000 each, and final winners Rs. 3,000 each.',
    qNe: 'हरेक खेलका विजेता कसरी छानिन्छन्?',
    aNe: 'हरेक प्रेडिक्सन पोस्टमा सही नतिजा प्रेडिक्ट गरेर तीनै चरण (लाइक, सेयर, २ साथी ट्याग) पूरा गर्नेहरूमध्येबाट २ भाग्यशाली विजेता निकालिन्छ। राउन्ड अफ १६ का विजेताले रु. ५००/व्यक्ति, क्वाटर फाइनलका रु. १,०००, सेमी फाइनलका रु. २,००० र फाइनलका रु. ३,०००/व्यक्ति पाउँछन्।',
  },
  {
    q: 'How do I win the Rs. 20,000 bumper prize?',
    a: 'Correctly predict all 7 big knockout results — the 4 quarter-finals, both semi-finals, and the final. If more than one participant gets all 7 right, the bumper winner is chosen by lucky draw among them.',
    qNe: 'रु. २०,००० बम्पर पुरस्कार कसरी जित्ने?',
    aNe: 'सबै ७ ठूला नकआउट नतिजा सही प्रेडिक्ट गर्नुहोस् — ४ क्वाटर फाइनल, दुवै सेमी फाइनल र फाइनल। एकभन्दा बढीले सबै ७ सही पारे भने बम्पर विजेता तिनीहरूमध्येबाट गोलाप्रथाबाट छानिन्छ।',
  },
  {
    q: 'Where will the prediction posts and winner announcements appear?',
    a: 'On RYD Nepal\'s official Facebook, Instagram, and TikTok pages. Follow all three so you never miss a match post — each one goes live as soon as the fixture is confirmed.',
    qNe: 'प्रेडिक्सन पोस्ट र विजेता घोषणा कहाँ आउँछ?',
    aNe: 'RYD Nepal को आधिकारिक फेसबुक, इन्स्टाग्राम र टिकटक पेजमा। तीनवटै फलो गर्नुहोस् — हरेक खेल पक्का हुनेबित्तिकै पोस्ट आउँछ।',
  },
  {
    q: 'Who can participate in the giveaway?',
    a: 'Anyone in Nepal with a Facebook, Instagram, or TikTok account. You do not need to be an RYD rider — though if the World Cup fever inspires you to start earning, our bikes rent from Rs. 700/day.',
    qNe: 'गिभअवेमा को-को भाग लिन सक्छन्?',
    aNe: 'फेसबुक, इन्स्टाग्राम वा टिकटक अकाउन्ट भएका नेपालका जो कोही। RYD राइडर हुनु पर्दैन — तर विश्वकपको जोशले कमाउन सुरु गर्ने मन बनायो भने हाम्रा बाइक दिनको रु. ७०० देखि भाडामा पाइन्छ।',
  },
];

// [stage EN, stage NE, prize EN, prize NE]
const PRIZE_ROWS: [string, string, string, string][] = [
  ['Round of 16', 'राउन्ड अफ १६', '2 lucky winners — Rs. 500 each', '२ भाग्यशाली विजेता — रु. ५००/व्यक्ति'],
  ['Quarter Final', 'क्वाटर फाइनल', '2 lucky winners — Rs. 1,000 each', '२ भाग्यशाली विजेता — रु. १,०००/व्यक्ति'],
  ['Semi Final', 'सेमी फाइनल', '2 lucky winners — Rs. 2,000 each', '२ भाग्यशाली विजेता — रु. २,०००/व्यक्ति'],
  ['Final', 'फाइनल', '2 lucky winners — Rs. 3,000 each', '२ भाग्यशाली विजेता — रु. ३,०००/व्यक्ति'],
];

// [stage EN, stage NE, dates EN, dates NE]
const SCHEDULE_ROWS: [string, string, string, string][] = [
  ['Round of 16', 'राउन्ड अफ १६', 'July 4–8, 2026', 'जुलाई ४–८, २०२६'],
  ['Quarter Finals', 'क्वाटर फाइनल', 'July 10–12, 2026', 'जुलाई १०–१२, २०२६'],
  ['Semi Finals', 'सेमी फाइनल', 'July 15–16, 2026', 'जुलाई १५–१६, २०२६'],
  ['Third-Place Match', 'तेस्रो स्थानको खेल', 'July 19, 2026', 'जुलाई १९, २०२६'],
  ['Final — MetLife Stadium, New Jersey', 'फाइनल — मेटलाइफ स्टेडियम, न्यू जर्सी', 'July 20, 2026', 'जुलाई २०, २०२६'],
];

const STEPS: [React.ComponentType<{ className?: string }>, string, string, string, string][] = [
  [ThumbsUp, '1. Like the page', 'Like RYD Nepal on Facebook, Instagram, or TikTok — wherever you saw the match post.', '१. पेज लाइक गर्नुहोस्', 'फेसबुक, इन्स्टाग्राम वा टिकटकमा RYD Nepal लाइक/फलो गर्नुहोस् — जहाँ म्याच पोस्ट देख्नुभयो।'],
  [Share2, '2. Share the post', 'Share the individual match prediction post to your profile or story.', '२. पोस्ट सेयर गर्नुहोस्', 'म्याच प्रेडिक्सन पोस्ट आफ्नो प्रोफाइल वा स्टोरीमा सेयर गर्नुहोस्।'],
  [Users, '3. Tag 2 friends & predict', 'Comment your prediction and tag 2 friends. That\'s your entry — done in 30 seconds.', '३. २ साथी ट्याग गरी प्रेडिक्ट गर्नुहोस्', 'कमेन्टमा आफ्नो प्रेडिक्सन लेख्नुहोस् र २ जना साथीलाई ट्याग गर्नुहोस्। ३० सेकेन्डमा तपाईंको इन्ट्री पूरा।'],
];

const BlogPredictWin: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'RYD Predict & Win: FIFA World Cup 2026 Giveaway — Win Up to Rs. 20,000 | RYD Nepal'
      : 'RYD Predict & Win: फिफा विश्वकप २०२६ गिभअवे — रु. २०,००० सम्म जित्नुहोस् | RYD Nepal',
    description: en
      ? 'Predict FIFA World Cup 2026 knockout results with RYD Nepal: 2 cash winners per match (Rs. 500–3,000) plus a Rs. 20,000 bumper for all 7 big results. Free entry.'
      : 'RYD Nepal सँग फिफा विश्वकप २०२६ नकआउट नतिजा प्रेडिक्ट गरेर नगद जित्नुहोस्: हरेक खेलमा २ विजेता (रु. ५००–३,०००) र सबै ७ नतिजा मिलाउनेलाई रु. २०,००० बम्पर। निःशुल्क — लाइक, सेयर, २ साथी ट्याग।',
    keywords:
      'RYD Nepal giveaway, predict and win Nepal, FIFA World Cup 2026 giveaway Nepal, world cup prediction contest Nepal, FIFA world cup 2026 prediction, world cup 2026 schedule Nepal time, world cup 2026 knockout Nepal, win cash Nepal giveaway, world cup 2026 Nepal, RYD predict and win, football giveaway Kathmandu, FIFA 2026 predict and win',
    path: '/blog/ryd-predict-win-fifa-world-cup-2026',
    ogType: 'article',
    ogTitle: 'Predict the World Cup. Win Up to Rs. 20,000 Cash. Free Entry.',
    ogDescription:
      'RYD Nepal\'s FIFA World Cup 2026 Predict & Win: 2 cash winners on every knockout match post, and Rs. 20,000 for predicting all 7 big results. Like, share, tag 2 friends.',
    ogImage: 'https://www.rydnepal.com/og/predict-win-worldcup.jpg',
    datePublished: '2026-07-01',
    dateModified: '2026-07-11',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'RYD Predict & Win: FIFA World Cup 2026 Giveaway', url: URL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'RYD Predict & Win: FIFA World Cup 2026 Giveaway — Win Up to Rs. 20,000',
        description:
          'RYD Nepal\'s FIFA World Cup 2026 Predict & Win giveaway: 2 cash winners per knockout match (Rs. 500 to 3,000 each) and a Rs. 20,000 bumper prize for predicting all 4 quarter-finals, both semi-finals and the final correctly. Free entry via Facebook, Instagram, and TikTok.',
        image: 'https://www.rydnepal.com/og/predict-win-worldcup.jpg',
        mainEntityOfPage: URL,
        author: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: 'https://www.rydnepal.com' },
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://www.rydnepal.com',
          logo: { '@type': 'ImageObject', url: 'https://www.rydnepal.com/logo.png' },
        },
        datePublished: '2026-07-01',
        dateModified: '2026-07-11',
        inLanguage: ['en', 'ne'],
        about: [
          { '@type': 'Thing', name: 'FIFA World Cup 2026' },
          { '@type': 'Thing', name: 'Giveaway Nepal' },
          { '@type': 'Thing', name: 'Football Prediction Contest' },
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
            <Trophy className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Giveaway · FIFA World Cup 2026' : 'RYD Nepal गिभअवे · फिफा विश्वकप २०२६'}</span>
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
              <>Predict & Win: <span className="text-primary-300">Win Up to Rs. 20,000</span> This World Cup with RYD Nepal</>
            ) : (
              <>Predict & Win: यो विश्वकपमा RYD Nepal सँग <span className="text-primary-300">रु. २०,००० सम्म जित्नुहोस्</span></>
            )}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl">
            {en
              ? 'The FIFA World Cup 2026 knockout rounds are here — and RYD Nepal is turning every big match into a chance to win cash. Predict results, tag your friends, and win up to Rs. 3,000 per match, or take the Rs. 20,000 bumper prize for calling all 7 big results.'
              : 'फिफा विश्वकप २०२६ को नकआउट राउन्ड आइपुग्यो — र RYD Nepal ले हरेक ठूलो खेललाई नगद जित्ने मौकामा बदल्दैछ। नतिजा प्रेडिक्ट गर्नुहोस्, साथी ट्याग गर्नुहोस्, र हरेक खेलमा रु. ३,००० सम्म जित्नुहोस् — वा सबै ७ नतिजा मिलाएर रु. २०,००० बम्पर लैजानुहोस्।'}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{en ? 'July 1, 2026' : '२०२६ जुलाई १'}</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" />{en ? '5 min read' : '५ मिनेट पठन'}</span>
            <span className="flex items-center gap-1.5"><Gift className="w-4 h-4" />{en ? 'Free entry' : 'निःशुल्क इन्ट्री'}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Poster */}
        <figure className="mb-12">
          <img
            src="/images/predict-win-poster.jpeg"
            alt={en ? 'RYD Nepal Predict & Win FIFA World Cup 2026 giveaway poster — Rs. 20,000 bumper cash prize' : 'RYD Nepal Predict & Win फिफा विश्वकप २०२६ गिभअवे पोस्टर — रु. २०,००० बम्पर नगद पुरस्कार'}
            className="rounded-3xl shadow-xl border border-slate-100 w-full max-w-xl mx-auto"
            loading="eager"
          />
          <figcaption className="text-center text-sm text-slate-400 mt-4">
            {en ? 'Rent. Ride. Earn — and now, Predict & Win.' : 'Rent. Ride. Earn — र अब, Predict & Win।'}
          </figcaption>
        </figure>

        <div className="prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {en
              ? 'Kathmandu runs on football fever every World Cup — late-night screenings, office bracket debates, and group chats that never sleep. This year, RYD Nepal is adding real cash to the fun. From the Round of 16 all the way to the final at MetLife Stadium on July 20 (Nepal time), every big match becomes a Predict & Win post on our social pages.'
              : 'हरेक विश्वकपमा काठमाडौं फुटबल ज्वरोले चल्छ — मध्यरातका स्क्रिनिङ, अफिसका बहस, र कहिल्यै नसुत्ने ग्रुप च्याटहरू। यसपालि RYD Nepal ले यो रमाइलोमा साँच्चैको नगद थप्दैछ। राउन्ड अफ १६ देखि जुलाई २० (नेपाल समय) को मेटलाइफ स्टेडियमको फाइनलसम्म, हरेक ठूलो खेल हाम्रा सोसल पेजमा Predict & Win पोस्ट बन्नेछ।'}
          </p>
          <p className="text-slate-600 leading-relaxed mb-10">
            {en
              ? 'The rules are simple, entry is free, and winners are announced right where you entered — on our Facebook, Instagram, and TikTok pages. Individual match posts go live as soon as each fixture is confirmed, so follow the pages now and keep your notifications on.'
              : 'नियम सरल छ, इन्ट्री निःशुल्क छ, र विजेताको घोषणा तपाईंले भाग लिएकै ठाउँमा हुन्छ — हाम्रो फेसबुक, इन्स्टाग्राम र टिकटक पेजमा। हरेक खेल पक्का हुनेबित्तिकै म्याच पोस्ट आउँछ, त्यसैले अहिल्यै पेज फलो गरेर नोटिफिकेसन अन राख्नुहोस्।'}
          </p>
        </div>

        {/* How to participate */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          {en ? 'How to Participate — 30 Seconds Per Match' : 'कसरी भाग लिने — हरेक खेलमा ३० सेकेन्ड'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {STEPS.map(([Icon, titleEn, descEn, titleNe, descNe], i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition-all">
              <div className="bg-primary w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-100 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{en ? titleEn : titleNe}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{en ? descEn : descNe}</p>
            </div>
          ))}
        </div>

        {/* Where to enter */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-100 rounded-3xl p-6 sm:p-8 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {en ? 'Prediction posts drop here' : 'प्रेडिक्सन पोस्ट यहाँ आउँछ'}
          </p>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {en ? 'Follow all three pages so you never miss a match' : 'तीनवटै पेज फलो गर्नुहोस् — कुनै खेल नछुटोस्'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.facebook.com/rydnp2025" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>RYD Nepal | Kathmandu</span>
            </a>
            <a href="https://www.instagram.com/ryd.nepal/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <Instagram className="w-5 h-5 text-pink-500" />
              <span>@ryd.nepal</span>
            </a>
            <a href="https://www.tiktok.com/@ryd.nepal" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              <span>@ryd.nepal</span>
            </a>
          </div>
        </div>

        {/* Prize table */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          {en ? 'The Prizes — Every Knockout Match Pays' : 'पुरस्कार — हरेक नकआउट खेलमा इनाम'}
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-5 py-4 rounded-tl-2xl font-bold">{en ? 'Stage' : 'चरण'}</th>
                <th className="text-left px-5 py-4 rounded-tr-2xl font-bold">{en ? 'Prize Per Match' : 'प्रति खेल पुरस्कार'}</th>
              </tr>
            </thead>
            <tbody>
              {PRIZE_ROWS.map(([stEn, stNe, prEn, prNe], i) => (
                <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-5 py-4 font-semibold text-slate-900 border-b border-slate-100">{en ? stEn : stNe}</td>
                  <td className="px-5 py-4 text-slate-600 border-b border-slate-100">{en ? prEn : prNe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live tracker CTA */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl px-6 py-5 mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-700 font-semibold">
            {en
              ? 'Every fixture, Nepal-time kickoff, live bracket, result, and winner — updated after every match.'
              : 'हरेक फिक्स्चर, नेपाल समयको किकअफ, लाइभ ब्राकेट, नतिजा र विजेता — हरेक खेलपछि अपडेट।'}
          </p>
          <Link to="/prize" className="inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-600 transition-all whitespace-nowrap flex-shrink-0">
            {en ? 'Track matches & winners live' : 'खेल र विजेता लाइभ हेर्नुहोस्'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bumper */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-primary p-4 rounded-2xl shadow-lg shadow-primary-900/40 flex-shrink-0">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-1">
                {en ? 'Bumper Giveaway' : 'बम्पर गिभअवे'}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {en ? 'Rs. 20,000 Cash — Predict All 7 Big Results' : 'रु. २०,००० नगद — सबै ७ ठूला नतिजा प्रेडिक्ट गर्नुहोस्'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                {en
                  ? 'Call the winners of all 4 quarter-finals, both semi-finals, and the final correctly, and Rs. 20,000 cash is yours. If more than one participant gets a perfect 7, the winner is drawn from among them.'
                  : 'सबै ४ क्वाटर फाइनल, दुवै सेमी फाइनल र फाइनलको विजेता सही भन्नुहोस्, अनि रु. २०,००० नगद तपाईंको। एकभन्दा बढीले पूरै ७ मिलाए भने तिनीहरूमध्येबाट गोलाप्रथाबाट विजेता निकालिन्छ।'}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          {en ? 'World Cup 2026 Knockout Schedule — Mark Your Calendar' : 'विश्वकप २०२६ नकआउट तालिका — पात्रोमा चिन्ह लगाउनुहोस्'}
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-5 py-4 rounded-tl-2xl font-bold">{en ? 'Stage' : 'चरण'}</th>
                <th className="text-left px-5 py-4 rounded-tr-2xl font-bold">
                  {en ? 'Dates (Nepal Time)' : 'मिति (नेपाल समय अनुसार)'}
                </th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_ROWS.map(([stEn, stNe, dEn, dNe], i) => (
                <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-5 py-4 font-semibold text-slate-900 border-b border-slate-100">{en ? stEn : stNe}</td>
                  <td className="px-5 py-4 text-slate-600 border-b border-slate-100">{en ? dEn : dNe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mb-14 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
          {en
            ? 'Most matches kick off late night or early morning Nepal time — prediction posts open well before kickoff, so you can enter during the day.'
            : 'धेरैजसो खेल नेपाली समयअनुसार मध्यरात वा बिहान सबेरै सुरु हुन्छन् — प्रेडिक्सन पोस्ट किकअफभन्दा निकै अगाडि खुल्छ, त्यसैले दिनमै भाग लिन सकिन्छ।'}
        </p>

        {/* Brand tie-in */}
        <div className="bg-gradient-to-br from-slate-900 to-primary-900 rounded-3xl p-8 sm:p-10 mb-14 text-center md:text-left">
          <div className="md:flex items-center justify-between gap-8">
            <div>
              <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-2">
                {en ? 'Rent. Ride. Earn.' : 'Rent. Ride. Earn.'}
              </p>
              <h3 className="text-2xl font-black text-white mb-3">
                {en ? 'Watching Legends Hustle on the Pitch? Start Your Own Hustle.' : 'मैदानमा खेलाडीको मिहिनेत हेर्दै हुनुहुन्छ? आफ्नै कमाइ सुरु गर्नुहोस्।'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl mb-6 md:mb-0">
                {en
                  ? 'A Hero Super Splendor 125cc from Rs. 700/day, zero down payment, and you\'re earning on Pathao, InDrive, Yango or Uber Bike this week — with the bike becoming yours after 1.5 years.'
                  : 'दिनको रु. ७०० देखि हिरो सुपर स्प्लेन्डर 125cc, शून्य डाउन पेमेन्ट — र यही हप्ता पाठाओ, इनड्राइभ, यांगो वा उबर बाइकमा कमाउन सुरु। १.५ वर्षपछि बाइक तपाईंकै।'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0 justify-center">
              <Link to="/services" className="bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-900/30 whitespace-nowrap inline-flex items-center justify-center">
                <Bike className="w-4 h-4 mr-2" />
                {en ? 'See Rental Plans' : 'भाडा योजना हेर्नुहोस्'}
              </Link>
              <Link to="/contact" className="bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all whitespace-nowrap inline-flex items-center justify-center">
                {en ? 'Apply Now' : 'आवेदन दिनुहोस्'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          {en ? 'Predict & Win — FAQ' : 'Predict & Win — बारम्बार सोधिने प्रश्न'}
        </h2>
        <div className="space-y-4 mb-14">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <summary className="flex items-start justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 list-none">
                <span className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  {en ? f.q : f.qNe}
                </span>
              </summary>
              <p className="px-6 pb-5 pl-14 text-sm text-slate-600 leading-relaxed">{en ? f.a : f.aNe}</p>
            </details>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-xs text-slate-400 leading-relaxed mb-10">
          {en
          ? 'This giveaway is organised by RYD Nepal Pvt. Ltd. and is not sponsored, endorsed, or administered by FIFA, Meta, or TikTok. Prizes are paid in Nepali Rupees and are subject to applicable TDS as per the prevailing Government of Nepal regulations. Winners are contacted through the platform they entered on and announced publicly on RYD Nepal\'s pages. RYD Nepal reserves the right to amend giveaway terms; any changes will be announced on the official pages.'
          : 'यो गिभअवे RYD Nepal Pvt. Ltd. द्वारा आयोजित हो र FIFA, Meta वा TikTok द्वारा प्रायोजित, समर्थन गरिएको वा व्यवस्थापन गरिएको होइन। पुरस्कार नेपाली रुपैयाँमा प्रदान गरिनेछ र नेपाल सरकारको प्रचलित नियमअनुसार लागू हुने TDS (कर कट्टी) कटाइनेछ। विजेतालाई उनीहरूले भाग लिएकै प्लेटफर्ममार्फत सम्पर्क गरिनेछ र RYD Nepal का आधिकारिक पेजहरूमा सार्वजनिक घोषणा गरिनेछ। गिभअवेका सर्तहरू परिमार्जन गर्ने अधिकार RYD Nepal मा सुरक्षित छ; कुनै पनि परिवर्तन आधिकारिक पेजहरूमा घोषणा गरिनेछ।'} 
        </p>
        {/* Related posts */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{en ? 'Read next' : 'अर्को पढ्नुहोस्'}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/blog/how-to-become-pathao-rider-without-bike" className="flex-1 bg-slate-50 hover:bg-primary-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 hover:text-primary transition-all">
              {en ? 'How to Become a Pathao Rider Without Owning a Bike →' : 'आफ्नै बाइक नभई पाठाओ राइडर कसरी बन्ने →'}
            </Link>
            <Link to="/blog/pathao-vs-indrive-vs-yango-rider-earnings" className="flex-1 bg-slate-50 hover:bg-primary-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 hover:text-primary transition-all">
              {en ? 'Pathao vs InDrive vs Yango: Which Pays More? →' : 'पाठाओ vs इनड्राइभ vs यांगो: कसले बढी तिर्छ? →'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPredictWin;
