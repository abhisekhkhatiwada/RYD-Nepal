import React from 'react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import { Target, Eye, Heart, Globe, Shield, CheckCircle, Award, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  useSEO({
    title: 'About RYD Nepal — Kathmandu\'s #1 Bike Rental for Gig Workers | Pathao, InDrive & Tootle Riders',
    description: 'RYD Nepal Pvt. Ltd. empowers gig workers in Kathmandu with affordable Hero Super Splendor 125cc motorcycle rentals. 500+ active riders, dedicated Kapan workshop, rent-to-own program. Founded to help people earn without buying a bike.',
    keywords: 'about RYD Nepal, RYD Nepal company, bike rental company Kathmandu, motorcycle rental company Nepal, gig economy Nepal, Pathao partner Nepal, InDrive partner Kathmandu, who is RYD Nepal, Abhishek Khatiwada RYD, motorcycle rental startup Nepal, best bike rental Kathmandu, आरवाईडी नेपाल बारेमा',
    path: '/about',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'About Us', url: 'https://rydnepal.com/about' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About RYD Nepal — Motorcycle Rental Company in Kathmandu',
        description: 'Learn about RYD Nepal Pvt. Ltd., Kathmandu\'s leading motorcycle rental company empowering gig workers on Pathao, InDrive, and Tootle.',
        url: 'https://rydnepal.com/about',
        mainEntity: { '@id': 'https://rydnepal.com/#organization' },
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">About RYD Nepal Pvt. Ltd.</p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Empowering Kathmandu's Gig Workers with Affordable Bike Rental</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            RYD Nepal was founded on a simple realization: many hardworking people in Kathmandu want to earn through ride-sharing and delivery on <strong>Pathao, InDrive, and Tootle</strong> but lack the capital to buy their own motorcycle.
          </p>
        </div>
      </section>

      {/* Story & Context */}
      <section className="py-20" aria-label="The story behind bike rental in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://assets-cdn.kathmandupost.com/uploads/source/news/2019/miscellaneous/tootle-nepal-15012019112335.jpg?q=80&w=1000&auto=format&fit=crop" alt="Gig economy riders on motorcycles in Kathmandu, Nepal — Pathao, InDrive, and Tootle partners" className="rounded-3xl shadow-xl object-cover h-56 sm:h-80 lg:h-[500px] w-full" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Bike Rental Matters in Kathmandu</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                In the bustling urban landscape of Kathmandu, platforms like <strong>Pathao, InDrive, and Tootle</strong> have revolutionized mobility and employment. Thousands of riders earn Rs. 40,000–60,000 per month. However, the high price of motorcycles (Rs. 2,50,000+) and steep bank interest rates make ownership impossible for many aspiring gig workers.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We fill this gap by providing high-quality <strong>Hero Super Splendor 125cc</strong> motorcycles for an <Link to="/services" className="text-primary font-semibold hover:underline">affordable daily, weekly, or monthly rental fee</Link> — with a clear path to full ownership after 1.5 years. We don't just rent bikes in Kathmandu; we rent opportunities.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our tagline says it all: <strong className="text-slate-800">"Now it's your turn to earn." — अब तपाईंको कमाउने पालो।</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-900 text-white" aria-label="RYD Nepal mission and vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-700">
              <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/20">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed">
                To provide inclusive and affordable motorcycle rental solutions in Kathmandu that enable every hardworking Nepali to participate in the growing gig economy — earning on Pathao, InDrive, Tootle, and food delivery platforms without the financial stress of buying a bike.
              </p>
            </div>
            <div className="bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-700">
              <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/20">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-slate-400 leading-relaxed">
                To be Nepal's leading mobility-as-a-service company — empowering thousands of gig workers across the country with well-maintained bikes, fair pricing, a genuine rent-to-own motorcycle path, and the best rider support in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white" aria-label="Company milestones and growth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">RYD Nepal Milestones</h2>
            <p className="text-slate-500">Growing step by step alongside Kathmandu's gig riders</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2"></div>
            <div className="space-y-12">
              {[
                {
                  year: '2025',
                  title: 'RYD Nepal Founded in Kathmandu',
                  desc: 'Launched with a fleet of 50 Hero Super Splendor 125cc motorcycles in Kathmandu under President Abhishek Khatiwada, targeting Pathao, InDrive, and Tootle riders who need affordable bike rental.',
                  icon: () => <Award className="w-6 h-6 text-white" />,
                  side: 'left'
                },
                {
                  year: '2025',
                  title: 'Fleet Expanded to 120+ Bikes',
                  desc: 'Rapid rider onboarding drove fleet expansion to 120+ motorcycles. Introduced the Sagoon welcome kit — helmet, phone mount, raincoat, and Rs. 1,500 fuel credit — for every new rider in Kathmandu.',
                  icon: () => <CheckCircle className="w-6 h-6 text-white" />,
                  side: 'right'
                },
                {
                  year: 'February 2026',
                  title: 'Own Motorcycle Workshop Launched — Kapan',
                  desc: 'Inaugurated a dedicated bike service workshop near Dhalane Bridge, Kapan, Kathmandu. Offering oil changes, brake checks, tire inspections, parts replacement, and emergency support. Endorsed by Kathmandu Valley Traffic Police SSP Nawaraj Adhikari.',
                  icon: () => <Wrench className="w-6 h-6 text-white" />,
                  side: 'left'
                },
              ].map((milestone, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${milestone.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full">
                    <div className={`bg-slate-50 border border-slate-100 rounded-3xl p-8 ${milestone.side === 'right' ? 'md:text-right' : ''}`}>
                      <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-2">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 z-10 bg-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-primary-100 border-4 border-white">
                    <milestone.icon />
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-slate-50" aria-label="RYD Nepal leadership team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership</h2>
            <p className="text-slate-500">The people driving RYD Nepal forward</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm text-center max-w-sm w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-300 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black text-primary-800">
                AK
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Abhishek Khatiwada</h3>
              <p className="text-primary font-semibold text-sm mb-4">President, RYD Nepal Pvt. Ltd.</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                "Service will be more systematic and effective after the operation of our own workshop. Our goal is to make motorcycle rental in Kathmandu accessible to every aspiring gig worker."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" aria-label="RYD Nepal core values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500">What drives Nepal's leading bike rental company every single day</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Empathy', text: 'We understand our riders\' challenges in Kathmandu and design every rental service with them in mind.' },
              { icon: Shield, title: 'Safety', text: 'Well-maintained Hero Splendors, regular servicing at Kapan workshop, and insurance support for safer roads.' },
              { icon: Globe, title: 'Empowerment', text: 'Creating real income opportunities and a path to motorcycle ownership for gig workers across Nepal.' },
              { icon: CheckCircle, title: 'Integrity', text: 'No hidden fees, no complicated rental contracts — just clear, honest terms for every bike rental.' }
            ].map((value, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-block bg-primary-50 p-6 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50 border-t border-primary-100" aria-label="Apply for bike rental">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Earning in Kathmandu?</h2>
          <p className="text-slate-600 mb-8">Join 500+ riders who trust RYD Nepal. Rent a Hero Super Splendor 125cc from Rs. 800/day and start earning on Pathao, InDrive, or Tootle today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg">
              View Rental Plans
            </Link>
            <Link to="/contact" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
