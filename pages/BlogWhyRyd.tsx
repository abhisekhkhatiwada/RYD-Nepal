import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Wrench, Shield, Clock, MapPin, Phone, MessageCircle,
  CheckCircle, XCircle, Bike, Sparkles, TrendingUp, Star, Instagram, Facebook,
  AlertTriangle, Gauge, Fuel, Award, Users, BarChart3, Calendar
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const SOCIAL = {
  tiktok: 'https://www.tiktok.com/@ryd.nepal',
  facebook: 'https://www.facebook.com/rydnp2025',
  instagram: 'https://www.instagram.com/ryd.nepal/',
  whatsapp: 'https://wa.me/9779709197877?text=Hello%20RYD%20Nepal%2C%20I%27m%20interested%20in%20renting%20a%20bike.',
  phone: 'tel:+9779709197877',
};

const BlogWhyRyd: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'Why RYD Nepal Is the Bike Rental Near You in Kathmandu That Riders Actually Trust (2026)'
      : 'किन RYD Nepal काठमाडौंको सबैभन्दा भरपर्दो बाइक भाडा सेवा हो — २०२६',
    description: en
      ? 'Free bi-weekly maintenance, well-maintained Hero Super Splendor bikes, 30-minute breakdown response, and 24/7 flat-tire help across Kathmandu. Here is exactly what makes RYD Nepal different from every other motorcycle rental in Kathmandu — from a rider\'s perspective.'
      : 'निःशुल्क हरेक २ हप्ताको सर्भिसिङ, राम्ररी मर्मत गरिएको हिरो सुपर स्प्लेन्डर, ३० मिनेटमा ब्रेकडाउन सहायता, र काठमाडौंभरि २४/७ फ्ल्याट टायर सहायता। RYD Nepal किन काठमाडौंको अरू बाइक भाडा सेवाहरूभन्दा फरक छ — राइडरको दृष्टिकोणबाट।',
    keywords:
      'bike rental kathmandu near me, rent bike kathmandu, motorcycle rental kathmandu, scooter rental kathmandu, flat tire assistance kathmandu, bike rent in kathmandu, rental bike near me, nearest bike rental, bike rental service near me, RYD Nepal review, why RYD Nepal, best bike rental Kathmandu, well maintained rental bike Nepal, free maintenance bike rental Nepal, 24/7 bike breakdown Kathmandu, how much does pathao rider earn in nepal, Hero Super Splendor maintenance, Kapan motorcycle workshop, ride company Kathmandu, rental riders Nepal, बाइक भाडा काठमाडौं नजिक, मोटरसाइकल भाडा काठमाडौं, RYD नेपाल समीक्षा',
    path: '/blog/why-ryd-nepal-best-bike-rental-kathmandu',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'Why RYD Nepal Is the Best Bike Rental in Kathmandu', url: 'https://www.rydnepal.com/blog/why-ryd-nepal-best-bike-rental-kathmandu' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Why RYD Nepal Is the Bike Rental Near You in Kathmandu That Riders Actually Trust',
        'alternativeHeadline': 'किन RYD Nepal काठमाडौंको सबैभन्दा भरपर्दो बाइक भाडा सेवा हो',
        'description': 'A rider-first look at why RYD Nepal\'s free maintenance, well-maintained Hero Super Splendor fleet, 24/7 breakdown support, and same-day flat tire help make it the most trusted motorcycle rental in Kathmandu.',
        'author': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://www.rydnepal.com' },
        'publisher': { '@type': 'Organization', 'name': 'RYD Nepal Pvt. Ltd.', 'url': 'https://www.rydnepal.com', 'logo': { '@type': 'ImageObject', 'url': 'https://www.rydnepal.com/logo.png' } },
        'datePublished': '2026-05-17',
        'dateModified': '2026-05-17',
        'image': 'https://www.rydnepal.com/blog/why-ryd-nepal.jpg',
        'mainEntityOfPage': 'https://www.rydnepal.com/blog/why-ryd-nepal-best-bike-rental-kathmandu',
        'inLanguage': ['en', 'ne'],
        'keywords': 'bike rental kathmandu near me, rent bike kathmandu, motorcycle rental kathmandu, flat tire assistance kathmandu, RYD Nepal, well maintained rental bike Nepal',
        'about': [
          { '@type': 'Thing', 'name': 'Motorcycle Rental' },
          { '@type': 'Thing', 'name': 'Bike Maintenance Kathmandu' },
          { '@type': 'Thing', 'name': 'Gig Economy Nepal' },
          { '@type': 'Thing', 'name': 'Hero Super Splendor 125cc' },
        ],
        'mentions': [
          { '@type': 'SoftwareApplication', 'name': 'Pathao' },
          { '@type': 'SoftwareApplication', 'name': 'InDrive' },
          { '@type': 'SoftwareApplication', 'name': 'Yango' },
          { '@type': 'SoftwareApplication', 'name': 'Tootle' },
        ],
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>Why RYD Nepal Is the Bike Rental Near You in Kathmandu Riders Trust | RYD Nepal Blog</title>
        <meta name="description" content="Free bi-weekly maintenance, well-maintained Hero Super Splendor bikes, 30-minute breakdown response, and 24/7 flat tire help across Kathmandu. What makes RYD Nepal different from any other motorcycle rental in Kathmandu." />
        <link rel="canonical" href="https://www.rydnepal.com/blog/why-ryd-nepal-best-bike-rental-kathmandu" />
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
            <Award className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog — Why Riders Choose Us' : 'RYD Nepal ब्लग — किन राइडरहरू हामीलाई रोज्छन्'}</span>
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
              <>Why RYD Nepal Is the <span className="text-primary">Bike Rental Near You</span> in Kathmandu That Riders Actually Trust</>
            ) : (
              <>किन <span className="text-primary">RYD Nepal</span> काठमाडौंको सबैभन्दा भरपर्दो बाइक भाडा सेवा हो</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'When you search "bike rental Kathmandu near me", you find a dozen options. They all look similar on the surface. This article breaks down exactly what is different about RYD Nepal — what we do for the bike, what we do for you when something goes wrong, and why our riders stay with us for years.'
              : '"बाइक भाडा काठमाडौं नजिक" खोज्दा एक दर्जन विकल्पहरू देखिन्छन्। बाहिरबाट हेर्दा सबै उस्तै देखिन्छन्। यस लेखमा RYD Nepal के कारणले फरक छ भनेर खुलाइएको छ — हामीले बाइकको लागि के गर्छौं, केही बिग्रिँदा तपाईंको लागि के गर्छौं, र हाम्रा राइडरहरू वर्षौंदेखि किन हामीसँगै रहन्छन्।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: May 17, 2026' : 'प्रकाशित: २०२६ मे १७'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">{en ? '10 min read' : '१० मिनेट पठन'}</span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Service & Maintenance' : 'सेवा र मर्मत'}</span>
          </div>
        </div>
      </section>

      {/* ── At-a-glance trust stats ── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Bike, label: en ? 'Bikes in Fleet' : 'फ्लीटमा बाइकहरू', val: '120+', color: 'text-primary' },
              { icon: Users, label: en ? 'Active Riders' : 'सक्रिय राइडरहरू', val: '500+', color: 'text-emerald-600' },
              { icon: Wrench, label: en ? 'Service Cycle' : 'सर्भिस अन्तराल', val: en ? 'Every 2 wks' : 'हरेक २ हप्ता', color: 'text-amber-600' },
              { icon: Clock, label: en ? 'Avg. Response' : 'औसत प्रतिक्रिया', val: en ? '< 30 min' : '< ३० मिनेट', color: 'text-blue-600' },
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

        {/* Section: The real problem with most rentals */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-xl"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'The real problem with most bike rentals in Kathmandu' : 'काठमाडौंका धेरै बाइक भाडा सेवाहरूको वास्तविक समस्या'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {en ? (
              <>
                <p>
                  Search "motorcycle rental Kathmandu" or "bike rent Kathmandu near me" and you'll see dozens of small operators.
                  On day one the bike looks fine. By month two, something starts to feel off — a slipping clutch, a soft brake,
                  a tire that loses pressure every weekend. By the time you ride for Pathao, InDrive, Yango or Tootle 8 hours
                  a day, that "small issue" becomes the reason you can't take the next ride.
                </p>
                <p>
                  Most rentals in Kathmandu are run as side businesses. There is no workshop. There is no service schedule.
                  When the bike breaks, the answer is usually "you fix it, send me the bill, I'll think about it." Riders end up paying
                  for chain repairs, brake pad replacements, and flat tire fixes out of their own daily earnings — which kills the whole
                  point of renting instead of buying.
                </p>
                <p className="font-semibold text-slate-900">
                  We built RYD Nepal because we are tired of watching gig workers lose money to bikes that should have been
                  serviced two months ago. Below is exactly what we do differently.
                </p>
              </>
            ) : (
              <>
                <p>
                  "मोटरसाइकल भाडा काठमाडौं" वा "बाइक भाडा काठमाडौं नजिक" खोज्दा थुप्रै साना अपरेटरहरू देखिन्छन्। पहिलो दिन बाइक राम्रो देखिन्छ।
                  दोस्रो महिनासम्म कुनै समस्या सुरु हुन्छ — क्लच चिप्लने, ब्रेक नरम, ट्यायरबाट हावा निस्किने। पाठाओ, इनड्राइभ, यांगो वा टुटलमा
                  ८ घण्टा चलाउँदा त्यो "सानो समस्या" तपाईंको अर्को राइड नलिने कारण बन्छ।
                </p>
                <p>
                  काठमाडौंका धेरै भाडा सेवाहरू साइड बिजनेसको रूपमा चलाइन्छ। वर्कशप छैन। सर्भिस तालिका छैन। बाइक बिग्रिँदा "आफै बनाउनुहोस्,
                  बिल पठाउनुहोस्" भन्ने जवाफ आउँछ। राइडरहरूले आफ्नै कमाइबाट चेन, ब्रेक प्याड र फ्ल्याट टायर मर्मत खर्च बेहोर्न पर्छ।
                </p>
                <p className="font-semibold text-slate-900">
                  हामीले RYD Nepal त्यसैले बनायौं — गिग कामदारहरूले समय मै सर्भिस नहुनुले पैसा गुमाएको हेर्न नसकेर। तल हामीले के फरक गर्छौं।
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section: What we do for the bike */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl"><Wrench className="w-5 h-5 text-emerald-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'What we do for the bike (so you don\'t have to)' : 'बाइकको लागि हामी के गर्छौं (ताकि तपाईंलाई गर्नुपर्दैन)'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Sparkles,
                title: en ? 'Well-maintained or brand-new bike on day one' : 'पहिलो दिनमै राम्ररी मर्मत गरिएको वा बिल्कुलै नयाँ बाइक',
                body: en
                  ? 'Every Hero Super Splendor 125cc in our fleet is either fresh from the showroom or has been through a full multi-point inspection in our Kapan workshop before it leaves our gate. No mystery history, no hidden cracks, no "owner sold it because the engine knocks."'
                  : 'हाम्रो फ्लीटको हरेक हिरो सुपर स्प्लेन्डर 125cc या त सोरूमबाट नयाँ हो वा कपन वर्कशपमा पूर्ण मल्टी-पोइन्ट इन्स्पेक्सन भएको हो। कुनै गोप्य इतिहास छैन।',
              },
              {
                icon: Gauge,
                title: en ? 'Free bi-weekly service — every 2 weeks or 1,800 km' : 'निःशुल्क हरेक २ हप्ताको सर्भिसिङ — २ हप्ता वा १,८०० किमिमा',
                body: en
                  ? 'Oil change, brake check, chain tension, tire pressure, light check, and a real mechanic eyeballing your bike. You don\'t pay for it. You don\'t schedule the parts. We text you, you drop it by 10 AM, you pick it up by 4 PM.'
                  : 'तेल परिवर्तन, ब्रेक जाँच, चेन तनाव, ट्यायर प्रेसर, बत्ती जाँच — सबै निःशुल्क। पार्ट्स खोज्ने झन्झट छैन। हामी सन्देश पठाउँछौं, तपाईं १० बजे ल्याउनुहोस्, ४ बजे लिनुहोस्।',
              },
              {
                icon: Shield,
                title: en ? 'Full mechanical repairs at zero cost to the rider' : 'राइडरलाई शून्य खर्चमा सबै मेकानिकल मर्मत',
                body: en
                  ? 'Carburetor, clutch plates, brake pads, chain, sprocket, electrical — anything that wears out from honest gig riding is on us. The only things you pay for are damages caused by an accident or visible misuse.'
                  : 'कार्बुरेटर, क्लच प्लेट, ब्रेक प्याड, चेन, स्प्रोकेट, इलेक्ट्रिकल — गिग राइडिङबाट हुने सबै मर्मत हाम्रो जिम्मा। दुर्घटना वा स्पष्ट दुरुपयोगबाट हुने मात्र तपाईंको।',
              },
              {
                icon: Fuel,
                title: en ? 'Mileage you can plan your day around — 60–70 km/l' : 'दिनको योजना बनाउन सकिने माइलेज — ६०–७० किमि/लिटर',
                body: en
                  ? 'A Hero Super Splendor 125cc that is actually maintained returns 60–70 km/l in Kathmandu traffic. A neglected one drops to 40 km/l. The difference is roughly Rs. 100/day in fuel — Rs. 3,000/month — that you keep in your pocket because the bike is tuned properly.'
                  : 'राम्ररी मर्मत गरिएको हिरो सुपर स्प्लेन्डर 125cc काठमाडौंको ट्राफिकमा ६०–७० किमि/लिटर दिन्छ। बिग्रिएकोले ४० किमि मात्र। फरक दिनको लगभग रु. १००, महिनाको रु. ३,००० — तपाईंको खल्तीमा रहन्छ।',
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-50 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: When things go wrong */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-xl"><Clock className="w-5 h-5 text-blue-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'When something goes wrong on the road' : 'सडकमा केही बिग्रिँदा'}
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed mb-6">
            {en ? (
              <p>
                A flat tire on Ring Road at 9:30 PM. A dead battery in Sinamangal mid-shift. A chain that pops near Koteshwor.
                These things happen — even to the best-maintained bikes. The question is what your rental does about it.
                Here is what RYD Nepal does:
              </p>
            ) : (
              <p>
                राति ९:३० बजे रिङ रोडमा फ्ल्याट टायर। सिनामंगलमा सिफ्टको बीचमा ब्याट्री मरेको। कोटेश्वर नजिक चेन निस्केको।
                राम्ररी मर्मत भएको बाइकमा पनि यस्ता घटना हुन्छन्। प्रश्न तपाईंको भाडा सेवाले के गर्छ भन्ने हो।
              </p>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
            <ol className="space-y-5">
              {[
                {
                  t: en ? 'Call our 24/7 line — +977-9709197877' : 'हाम्रो २४/७ लाइन फोन गर्नुहोस् — +९७७-९७०९१९७८७७',
                  d: en
                    ? 'Available 365 days. The phone is answered by a real person, not an IVR. Tell us where you are and what is wrong.'
                    : '३६५ दिन उपलब्ध। वास्तविक मानिसले उठाउँछन्, IVR होइन। कहाँ हुनुहुन्छ र के समस्या भनिदिनुहोस्।',
                },
                {
                  t: en ? 'Flat tire assistance in Kathmandu — average 30 minutes' : 'काठमाडौंमा फ्ल्याट टायर सहायता — औसत ३० मिनेट',
                  d: en
                    ? 'For flats inside Ring Road, our technician reaches you in 20–40 minutes. Tube repair or replacement is done on the spot and is free for RYD riders.'
                    : 'रिङ रोडभित्रको फ्ल्याट टायरको लागि हाम्रो टेक्निसियन २०–४० मिनेटमा पुग्छन्। ट्यूब मर्मत वा बदल्ने काम त्यहीँ हुन्छ — RYD राइडरहरूको लागि निःशुल्क।',
                },
                {
                  t: en ? 'Replacement bike if yours is down for the day' : 'दिनको लागि बाइक चलाउन नसकिने भए प्रतिस्थापन बाइक',
                  d: en
                    ? 'If repair will take more than an hour, we dispatch a replacement Hero Super Splendor so you don\'t lose your evening shift on Pathao/InDrive/Yango.'
                    : 'मर्मत एक घण्टाभन्दा बढी लाग्ने भए, अर्को हिरो सुपर स्प्लेन्डर पठाउँछौं — पाठाओ/इनड्राइभ/यांगोको साँझको सिफ्ट नगुमाउन।',
                },
                {
                  t: en ? 'No credit-bureau drama, no penalty fees' : 'क्रेडिट ब्यूरो झमेला छैन, जरिवाना छैन',
                  d: en
                    ? 'Hardship happens. Sickness, family emergency, a bad week. We work with you. Unlike a bank loan, missing a week with RYD does not destroy your credit report or trigger penalty interest.'
                    : 'कठिनाइ आउँछ — बिमारी, पारिवारिक आपत्काल, खराब हप्ता। हामी सहयोग गर्छौं। बैंक ऋणजस्तो होइन — एक हप्ता ढिलो भए क्रेडिट रिपोर्ट बिग्रिँदैन।',
                },
              ].map((s, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">{s.t}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Section: How much you'll actually earn */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-amber-100 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-amber-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'How much does a Pathao rider earn in Nepal? — honest 2026 numbers' : 'नेपालमा पाठाओ राइडरले कति कमाउँछ? — २०२६ का इमान्दार आँकडा'}
            </h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'This is one of the most-searched questions in Nepal in 2026, and the answer riders see online is almost always wrong — either inflated by recruiters or deflated by people who tried it for two weeks. Based on our 500+ active RYD riders, here is what a real month looks like in Kathmandu:'
              : 'यो २०२६ मा नेपालमा सबैभन्दा बढी खोजिने प्रश्नहरू मध्ये एक हो। अनलाइनमा देखिने जवाफहरू प्रायः गलत हुन्छन्। हाम्रा ५००+ सक्रिय RYD राइडरहरूको आधारमा वास्तविक महिनाको हिसाब:'}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-slate-900">{en ? 'Platform' : 'प्लेटफर्म'}</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-900">{en ? 'Gross / month' : 'कुल / महिना'}</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-900">{en ? 'Realistic net after fuel & rent' : 'इन्धन र भाडा कटाएर खुद'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { p: 'Pathao', g: 'Rs. 40,000 – 60,000', n: 'Rs. 16,000 – 27,000' },
                  { p: 'InDrive', g: 'Rs. 35,000 – 55,000', n: 'Rs. 12,000 – 23,000' },
                  { p: 'Yango', g: 'Rs. 35,000 – 55,000', n: 'Rs. 12,000 – 23,000' },
                  { p: 'Tootle', g: 'Rs. 30,000 – 50,000', n: 'Rs. 8,000 – 19,000' },
                ].map((r, i) => (
                  <tr key={i} className="bg-white">
                    <td className="py-3 px-4 font-semibold text-slate-900">{r.p}</td>
                    <td className="py-3 px-4 text-slate-600">{r.g}</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">{r.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 mt-3">
            {en
              ? 'Based on internal RYD Nepal data, 26 working days/month, Rs. 700/day prepayment plan, and Rs. 202/litre petrol (Kathmandu, May 2026). Top riders running multiple apps clear Rs. 30,000+ net monthly.'
              : 'RYD Nepal को आन्तरिक डेटा, २६ कार्य दिन/महिना, रु. ७००/दिनको प्रिपेमेन्ट योजना, र पेट्रोल रु. २०२/लिटरको आधारमा (काठमाडौं, मे २०२६)। बहु-एप चलाउने शीर्ष राइडरहरू महिनाको रु. ३०,०००+ खुद कमाउँछन्।'}
          </p>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-slate-700">
            {en ? (
              <>
                Want the full breakdown — bike price, fuel cost, what RYD covers, and what you keep after 18 months?{' '}
                <Link to="/blog/rent-to-own-hero-splendor-125" className="font-bold text-primary hover:underline">
                  Read our full financial guide →
                </Link>
              </>
            ) : (
              <>
                बाइक मूल्य, इन्धन खर्च, RYD ले के बेहोर्छ, र १८ महिनापछि तपाईंलाई के बच्छ — पूर्ण विवरण चाहनुहुन्छ?{' '}
                <Link to="/blog/rent-to-own-hero-splendor-125" className="font-bold text-primary hover:underline">
                  हाम्रो पूर्ण आर्थिक गाइड पढ्नुहोस् →
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Section: Why a 125cc and not a scooter */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-xl"><Bike className="w-5 h-5 text-purple-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Why we rent a 125cc bike, not a scooter' : 'किन हामी स्कूटर होइन १२५सीसी बाइक भाडामा दिन्छौं'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {en ? (
              <>
                <p>
                  "Scooter rental Kathmandu" is a popular search. Scooters are fine for short city errands. They are
                  not great for 8-hour gig days. The seat geometry, the smaller wheels, and the CVT transmission cost
                  you in three places: lower mileage on highways, more wear in stop-and-go traffic, and a sore lower
                  back by month two.
                </p>
                <p>
                  The Hero Super Splendor 125cc is a commuter bike designed for exactly this: long hours, mixed terrain,
                  rider + sometimes passenger, fuel-efficient at 60–70 km/l, and dirt-cheap to maintain because every
                  mechanic in Nepal knows it. If you are a serious gig rider, this is the right tool for the job.
                </p>
              </>
            ) : (
              <>
                <p>
                  "स्कूटर भाडा काठमाडौं" लोकप्रिय खोज हो। स्कूटर सहरको छोटो काममा ठीक छ। ८ घण्टाको गिग कामको लागि उत्तम होइन।
                  सिटको ढाँचा, साना पाङ्ग्रा र CVT ट्रान्समिशनले हाइवेमा कम माइलेज, ट्राफिकमा बढी टुटफुट र २ महिनापछि कम्मर दुख्ने
                  समस्या दिन्छ।
                </p>
                <p>
                  हिरो सुपर स्प्लेन्डर 125cc यही कामको लागि बनाइएको हो — लामो समय, मिश्रित बाटो, राइडर + कहिलेकाहीँ यात्रु,
                  ६०–७० किमि/लिटर माइलेज, र नेपालका हरेक मेकानिकले मर्मत गर्न सक्ने।
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section: RYD vs other rentals */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-slate-100 p-2 rounded-xl"><BarChart3 className="w-5 h-5 text-slate-700" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'RYD Nepal vs typical Kathmandu bike rentals' : 'RYD Nepal बनाम काठमाडौंका सामान्य बाइक भाडा सेवाहरू'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-emerald-900">RYD Nepal</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• {en ? 'Free service every 2 weeks at our Kapan workshop' : 'कपन वर्कशपमा हरेक २ हप्तामा निःशुल्क सर्भिस'}</li>
                <li>• {en ? '24/7 breakdown phone line answered by a person' : '२४/७ ब्रेकडाउन हटलाइन — मानिसले उठाउँछन्'}</li>
                <li>• {en ? 'Flat tire help, dispatched in ~30 minutes inside Ring Road' : 'फ्ल्याट टायर सहायता — रिङ रोडभित्र ~३० मिनेटमा'}</li>
                <li>• {en ? 'Free replacement bike if yours is down >1 hour' : '१ घण्टाभन्दा बढी डाउन भए निःशुल्क प्रतिस्थापन बाइक'}</li>
                <li>• {en ? 'Sagoon kit worth Rs. 3,000+ free on day one' : 'पहिलो दिनै रु. ३,०००+ मूल्यको सगुन किट निःशुल्क'}</li>
                <li>• {en ? 'Path to ownership in 1.5 years, no credit check' : '१.५ वर्षमा स्वामित्व, कुनै क्रेडिट जाँच छैन'}</li>
                <li>• {en ? 'Verified office at Dhalane Pul, Kapan' : 'ढलाने पुल, कपनमा प्रमाणित कार्यालय'}</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-red-900">{en ? 'Typical small rental shop' : 'सामान्य सानो भाडा पसल'}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• {en ? 'You pay for every service yourself' : 'हरेक सर्भिस तपाईंले आफै तिर्नुपर्छ'}</li>
                <li>• {en ? 'Phone goes to voicemail after 8 PM' : '८ बजेपछि फोन भ्वाइसमेल जान्छ'}</li>
                <li>• {en ? '"Sort it out yourself, send me the bill"' : '"आफै बनाउनुहोस्, बिल पठाउनुहोस्"'}</li>
                <li>• {en ? 'No replacement — your day\'s gone' : 'प्रतिस्थापन छैन — दिनभरको कमाइ गयो'}</li>
                <li>• {en ? 'No welcome kit, no fuel credit' : 'कुनै स्वागत किट छैन, इन्धन क्रेडिट छैन'}</li>
                <li>• {en ? 'You rent forever, never own' : 'सधैं भाडा तिर्ने, कहिल्यै आफ्नो नहुने'}</li>
                <li>• {en ? 'No verified address, no paperwork' : 'प्रमाणित ठेगाना छैन, कागजात छैन'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Find us / where we are */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary-100 p-2 rounded-xl"><MapPin className="w-5 h-5 text-primary" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Where to find us in Kathmandu' : 'हामीलाई काठमाडौंमा कहाँ भेट्ने'}
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'When riders search "bike rental near me" or "nearest bike rental" in Kathmandu, our Kapan office shows up because it is a verified location, not a hidden side gate. Office and workshop are at the same place — Dhalane Pul, Kapan — so you can pick up your bike, get it serviced, and ask questions without travelling across the valley.'
              : '"बाइक भाडा नजिक" वा "नजिकको बाइक भाडा" खोज्दा हाम्रो कपन कार्यालय देखिन्छ — किनकि यो प्रमाणित ठाउँ हो। कार्यालय र वर्कशप एकै स्थानमा छन् — ढलाने पुल, कपन — त्यसैले बाइक लिन, सर्भिस गर्न र प्रश्न सोध्न उपत्यका भरि भौंतारिनु पर्दैन।'}
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

        {/* Section: See it for yourself — social */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-pink-100 p-2 rounded-xl"><Star className="w-5 h-5 text-pink-600" /></div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {en ? 'Don\'t take our word for it — see the bikes and riders' : 'हाम्रो भन्दा आफै हेर्नुहोस् — बाइक र राइडरहरू'}
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {en
              ? 'We post real workshop footage, real rider stories, and real Kathmandu rides on TikTok and Facebook every week. If you want to see what a well-maintained RYD bike actually looks like before you walk into our office, start here:'
              : 'हामी TikTok र Facebook मा हरेक हप्ता वास्तविक वर्कशप भिडियो, राइडरहरूको कथा र काठमाडौंका सवारी अपडेट गर्छौं। RYD बाइक वास्तवमा कस्तो हुन्छ हेर्नु छ भने यहाँबाट सुरु गर्नुहोस्:'}
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
            {en ? 'Ready to start earning this week?' : 'यो हप्ता कमाउन तयार हुनुहुन्छ?'}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {en
              ? 'Walk into our Kapan office with your license and citizenship. Pick up your Hero Super Splendor 125cc, your Sagoon kit, and start riding for Pathao, InDrive, Yango or Tootle the same day.'
              : 'लाइसेन्स र नागरिकता लिएर कपन कार्यालय आउनुहोस्। हिरो सुपर स्प्लेन्डर 125cc र सगुन किट लिनुहोस्, र त्यही दिन पाठाओ, इनड्राइभ, यांगो वा टुटलमा कमाउन सुरु गर्नुहोस्।'}
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
            <Link to="/blog/rent-to-own-hero-splendor-125" className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-primary-100 transition-all">
              <p className="text-xs text-primary font-bold mb-1">{en ? 'Financial Analysis' : 'आर्थिक विश्लेषण'}</p>
              <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {en ? 'Why Paying Rs. 1,000/Day to Rent-to-Own a Bike Makes Financial Sense' : 'किन दिनको रु. १,००० तिरेर बाइक आफ्नो बनाउन आर्थिक रूपमा सम्भव छ'}
              </p>
            </Link>
            <Link to="/support" className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-primary-100 transition-all">
              <p className="text-xs text-primary font-bold mb-1">{en ? 'Rider Support' : 'राइडर सहयोग'}</p>
              <p className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {en ? 'Full FAQ: rental process, documents, breakdown help & workshop hours' : 'पूर्ण FAQ: भाडा प्रक्रिया, कागजात, ब्रेकडाउन सहायता र वर्कशप समय'}
              </p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogWhyRyd;
