import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import { ChevronRight, Shield, Clock, Settings, TrendingUp, Star, CheckCircle, Bike, Users, Gift, Instagram, Facebook } from 'lucide-react';

const Home: React.FC = () => {
  useSEO({
    title: 'RYD Nepal | Rent a Bike in Kathmandu — Earn Rs. 40,000–60,000/Month on Pathao & InDrive',
    description: 'Rent a Hero Super Splendor 125cc motorcycle in Kathmandu from Rs. 700/day. Earn Rs. 40,000–60,000/month on Pathao, InDrive, Yango & Tootle. No loan, no down payment, own the bike after 1.5 years. बाइक भाडामा काठमाडौं — RYD Nepal.',
    keywords: 'bike rent Kathmandu, motorcycle rental Nepal, rent bike Kathmandu, earn money Kathmandu, earn in Nepal, gig work Nepal, Pathao rider Nepal, InDrive bike Nepal, Tootle Nepal, Yango Nepal, Hero Splendor rent, cheapest bike rental Kathmandu, rent to own bike Nepal, how to earn money in Kathmandu, daily bike rental Nepal, food delivery bike rent Nepal, बाइक भाडामा काठमाडौं, काठमाडौंमा कमाउनुहोस्, RYD Nepal',
    path: '/',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', url: 'https://rydnepal.com/' },
    ]),
  });

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>RYD Nepal | Rent a Bike in Kathmandu — Earn Rs. 40k–60k/Month</title>
        <meta name="description" content="Rent a Hero Super Splendor 125cc motorcycle in Kathmandu from Rs. 700/day. Earn Rs. 40,000–60,000/month on Pathao, InDrive, Yango & Tootle. No loan, no down payment, own the bike after 1.5 years." />
        <link rel="canonical" href="https://www.rydnepal.com/" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-14 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-10 lg:mb-0 z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary-700 text-xs font-bold uppercase tracking-wider">Bikes Available Now in Kathmandu</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-4">
                Rent a Bike in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">Kathmandu & Earn.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                Rent a <strong>Hero Super Splendor 125cc</strong> from just <strong>Rs. 700/day</strong> and start earning on <strong>Pathao, InDrive, Yango, or Tootle</strong> — no purchase, no loan, no down payment needed.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/services" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary-200 flex items-center justify-center">
                  See Rental Plans <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                  Our Story
                </Link>
              </div>

              <div className="mt-8 flex items-center space-x-5">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary-700" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-yellow-400 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-500 font-medium">Trusted by 500+ Riders in Kathmandu</p>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative h-64 sm:h-80 lg:h-[600px] mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl lg:rounded-[40px] transform rotate-2 -z-10"></div>
              <div className="rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl h-full border-4 lg:border-8 border-white">
                <img
                  src="https://images.deccanchronicle.com/dc-Cover-ilbrrabfksagbfb0ompgpgran2-20180314162754.Medi.jpeg"
                  alt="Hero Super Splendor 125cc motorcycle available for rent in Kathmandu — RYD Nepal bike rental fleet"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute bottom-4 right-4 lg:-bottom-8 lg:-right-8 bg-white px-4 py-3 lg:p-6 rounded-2xl lg:rounded-3xl shadow-xl border border-slate-100 animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 p-2 lg:p-3 rounded-xl shadow-lg shadow-green-200">
                    <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Bike Rent From</p>
                    <p className="text-lg lg:text-2xl font-black text-slate-900">Rs. 700<span className="text-sm font-semibold text-slate-400">/day</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100" aria-label="RYD Nepal statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Riders in Kathmandu', val: '500+' },
              { label: 'Bikes in Fleet', val: '120+' },
              { label: 'Avg. Monthly Earnings', val: 'Rs. 45k' },
              { label: 'Emergency Support', val: '< 30min' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-primary mb-1">{stat.val}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sagoon Welcome Kit Banner */}
      <section className="py-10 bg-gradient-to-r from-primary-50 to-primary-100 border-b border-primary-100" aria-label="Free welcome kit for new riders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary-200 flex-shrink-0">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Free Welcome Kit — Sagoon</p>
                <h2 className="text-xl font-bold text-slate-900">Every New Rider Gets a Starter Kit Worth Rs. 3,000+</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              {['Helmet', 'Phone Mount', 'Raincoat', 'Rs. 1,500 Fuel Credit'].map((item, i) => (
                <span key={i} className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-primary-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-primary mr-1" />{item}
                </span>
              ))}
            </div>
            <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-100 whitespace-nowrap flex-shrink-0">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50" aria-label="How bike rental works in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">How to Rent a Bike in Kathmandu</h2>
            <p className="text-slate-500">Get on the road and start earning in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "1. Register & Apply", desc: "Submit your driving license and citizenship copy at our Kapan office (Dhalane Pul) in Kathmandu or apply online. Takes less than 30 minutes." },
              { icon: Shield, title: "2. Verify & Get Your Bike", desc: "Our team verifies your documents and prepares your well-maintained Hero Super Splendor 125cc motorcycle with a Rs. 1,500 fuel coupon." },
              { icon: Bike, title: "3. Start Earning Today", desc: "Pick up your keys, collect your free Sagoon welcome kit, and start earning on Pathao, InDrive, Yango, or Tootle the same day." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300">
                <div className="bg-primary w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-primary-100">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits / Why Choose */}
      <section className="py-20" aria-label="Why choose RYD Nepal for bike rental in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose RYD Nepal for Bike Rental in Kathmandu?</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We understand the hustle of Kathmandu's streets. Our motorcycle rental service is designed to remove every barrier between you and earning a full income through ride-sharing and delivery platforms.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Insurance Support Included', desc: 'Full insurance included with every bike rental. We handle claims paperwork so you stay on the road earning.' },
                  { icon: Settings, title: 'Zero Maintenance Cost', desc: 'Full servicing every 1,500km at our Kapan workshop — oil changes, brake checks, tire inspections all included in your rental.' },
                  { icon: TrendingUp, title: 'Rent to Own — Own After 1.5 Years', desc: 'On the Pro plan, own your Hero Super Splendor after 1.5 years of rental payments. No bank EMI, no credit check needed.' },
                  { icon: Clock, title: '24/7 Breakdown Support in Kathmandu Valley', desc: 'Emergency assistance anywhere in Kathmandu Valley — replacement bike dispatched within 30 minutes.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg mt-1">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 hidden sm:grid grid-cols-2 gap-4">
              <img src="https://merogaadi.s3.us-east-2.amazonaws.com/images/makes/Hero%20Super%20Splendor-1588416954-817.jpg?q=80&w=400&h=500&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-8 object-cover h-[280px] md:h-[360px] lg:h-[400px] w-full" alt="Hero Super Splendor 125cc detail view — available for rent at RYD Nepal Kathmandu" loading="lazy" />
              <img src="https://imgd.aeplcdn.com/642x361/n/cw/ec/126977/hero-super-splendor-right-front-three-quarter0.jpeg?isig=0&q=75?q=80&w=400&h=500&auto=format&fit=crop" className="rounded-2xl shadow-lg object-cover h-[280px] md:h-[360px] lg:h-[400px] w-full" alt="Hero Super Splendor 125cc side profile — cheapest bike rental in Kathmandu Nepal" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden" aria-label="Rider reviews and success stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Rider Success Stories from Kathmandu</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Real reviews from riders earning on Pathao, InDrive, Yango, and Tootle with RYD Nepal bikes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ram Thapa',
                role: 'Pathao Partner Rider',
                text: 'RYD Nepal changed my life. I couldn\'t afford to buy a bike in Kathmandu, but now I earn Rs. 50,000 every month on Pathao using their rental service. The Sagoon kit on day one was a great surprise.',
              },
              {
                name: 'Sita Gurung',
                role: 'Food Delivery Rider, Kathmandu',
                text: 'The free maintenance is what makes RYD Nepal worth it. I never worry about oil changes or repairs — they handle everything at the Kapan workshop. After 1.5 years, this Hero Splendor will be mine.',
              },
              {
                name: 'Binod Rai',
                role: 'InDrive Partner, Kathmandu',
                text: 'RYD Nepal\'s support is amazing. I had a flat tire in Balaju at 8 PM and they sent a replacement bike within 40 minutes. No other motorcycle rental in Kathmandu does this.',
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center font-bold text-primary-800 text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-primary font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earn in Kathmandu — Primary SEO keyword section */}
      <section className="py-20 bg-white" aria-label="Earning potential on ride-sharing platforms in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Gig Economy Nepal — Earn Without Investment</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              How to Earn Money in Kathmandu with a Rental Bike
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Thousands of people earn a full-time income in Kathmandu using Pathao, InDrive, Yango, and Tootle every day.
              The only thing stopping most people? They don't own a motorcycle. RYD Nepal removes that barrier with affordable <Link to="/services" className="text-primary font-semibold hover:underline">bike rental plans from Rs. 700/day</Link>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                platform: 'Pathao',
                color: 'bg-red-50 border-red-100',
                badge: 'bg-red-500',
                earning: 'Rs. 40,000 – 60,000',
                period: 'per month',
                desc: 'Nepal\'s largest ride-hailing platform. Earn from rides and food deliveries across Kathmandu. Become a Pathao rider with a RYD Nepal rental bike — no bike purchase needed.',
              },
              {
                platform: 'InDrive',
                color: 'bg-blue-50 border-blue-100',
                badge: 'bg-blue-600',
                earning: 'Rs. 35,000 – 55,000',
                period: 'per month',
                desc: 'Negotiate your own fares on InDrive. Popular with riders who want more control over their earnings in Kathmandu Valley. Works perfectly with RYD Nepal\'s Hero Splendor.',
              },
              {
                platform: 'Yango',
                color: 'bg-purple-50 border-purple-100',
                badge: 'bg-purple-600',
                earning: 'Rs. 35,000 – 55,000',
                period: 'per month',
                desc: 'A fast-growing global ride-hailing platform now in Kathmandu. Yango offers competitive fares and growing demand. Start earning with a RYD Nepal rental bike.',
              },
              {
                platform: 'Tootle',
                color: 'bg-amber-50 border-amber-100',
                badge: 'bg-amber-500',
                earning: 'Rs. 30,000 – 50,000',
                period: 'per month',
                desc: 'Nepal\'s pioneer ride-hailing app. Tootle riders cover wide areas of Kathmandu and earn consistent daily income. Register as a Tootle rider with a rental bike from RYD Nepal.',
              },
            ].map((p, i) => (
              <div key={i} className={`rounded-3xl p-8 border-2 ${p.color}`}>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-bold mb-5 ${p.badge}`}>
                  {p.platform}
                </div>
                <div className="mb-4">
                  <p className="text-2xl font-black text-slate-900">{p.earning}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{p.period}</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-base sm:text-lg mb-1">Your rent is Rs. 700/day. Your earning potential is Rs. 1,500–2,500/day.</p>
              <p className="text-slate-400 text-sm">After bike rent, most active RYD Nepal riders net Rs. 700–1,700 profit every single day in Kathmandu.</p>
            </div>
            <Link to="/services" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-900/30 whitespace-nowrap flex-shrink-0">
              See All Rental Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Nepali Language SEO Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100" aria-label="बाइक भाडामा काठमाडौं — RYD Nepal Nepali information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
              बाइक भाडामा काठमाडौं — काठमाडौंमा कमाउनुहोस्
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              RYD Nepal बाट काठमाडौंमा <strong>हिरो सुपर स्प्लेन्डर 125cc</strong> बाइक भाडामा लिनुहोस् — रु. ७००/दिन बाट सुरु।
              पाठाओ, इनड्राइभ, र टुटलमा <strong>महिनाको रु. ४०,०००–६०,००० कमाउनुहोस्</strong>।
              लोन चाहिँदैन, डाउन पेमेन्ट चाहिँदैन। <strong>१.५ वर्षपछि बाइक तपाईंको आफ्नै</strong> हुन्छ।
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              हाम्रो कार्यालय कपन, ढलाने पुल नजिक, काठमाडौंमा छ।
              फोन: ९७०९१९७८७७।
              ५००+ राइडरहरूले विश्वास गर्ने — अब तपाईंको कमाउने पालो।
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-100">
                आवेदन दिनुहोस् (Apply Now)
              </Link>
              <Link to="/services" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                भाडा योजनाहरू हेर्नुहोस् (View Plans)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-16 bg-white" aria-label="RYD Nepal blog — rent to own bike financial analysis">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-primary-900 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-3">New Blog Post</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  Why Rs. 1,000/Day Rent-to-Own Makes Financial Sense
                </h2>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  Full financial breakdown with real data: Hero Splendor 125cc at Rs. 2,66,900, petrol at Rs. 202/litre, earnings from Pathao, InDrive & Yango. Every rupee accounted for — in English and नेपाली।
                </p>
                <Link to="/blog" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-900/30 w-fit">
                  Read Full Analysis <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center p-8 bg-white/5">
                <div className="text-center space-y-4">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-slate-400 text-xs mb-1">Daily Net Profit</p>
                    <p className="text-4xl font-black text-white">Rs. 633</p>
                    <p className="text-primary-300 text-xs mt-1">after rent + fuel</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-slate-400 text-xs mb-1">Own the Bike In</p>
                    <p className="text-4xl font-black text-white">1.5 <span className="text-lg">Years</span></p>
                    <p className="text-primary-300 text-xs mt-1">zero down payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-12 bg-white border-b border-slate-100" aria-label="Media coverage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">As Covered By Nepal Media</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-semibold text-sm">
            <span className="hover:text-primary transition-colors cursor-default">ShareHub Nepal</span>
            <span className="text-slate-200">|</span>
            <span className="hover:text-primary transition-colors cursor-default">Insurance Khabar</span>
            <span className="text-slate-200">|</span>
            <span className="hover:text-primary transition-colors cursor-default">Corporate Khabar</span>
          </div>
        </div>
      </section>

      {/* Social Media Strip */}
      <section className="py-12 bg-slate-50" aria-label="Follow RYD Nepal on social media">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 mb-6 text-sm font-medium">Follow RYD Nepal riders' journey on social media</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://www.instagram.com/ryd.nepal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all font-semibold text-slate-700 text-sm"
            >
              <Instagram className="w-5 h-5 text-pink-500" />
              <span>@ryd.nepal</span>
            </a>
            <a
              href="https://www.facebook.com/rydnp2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all font-semibold text-slate-700 text-sm"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>RYD Nepal | Kathmandu</span>
            </a>
            <a
              href="https://www.tiktok.com/@ryd.nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all font-semibold text-slate-700 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              <span>@ryd.nepal</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" aria-label="Start renting a bike in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl md:rounded-[40px] p-8 sm:p-12 md:p-20 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join 500+ Riders <br/> Earning in Kathmandu</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md">Get your Hero Super Splendor 125cc keys today. No credit checks, no loan hassle — just Rs. 700/day and you're earning on Pathao, InDrive, Yango, or Tootle.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary-900/40">
                    Rent a Bike Now
                  </Link>
                  <Link to="/support" className="bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-700 transition-all">
                    How it Works
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img src="https://techsathi.com/wp-content/uploads/2024/04/Pathao-Nepal-Ridesharing-Nepal.jpg?q=80&w=1974&auto=format&fit=crop" className="rounded-3xl shadow-2xl rotate-2 object-cover h-[350px] w-full" alt="Pathao rider earning money in Kathmandu with RYD Nepal rental bike" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
