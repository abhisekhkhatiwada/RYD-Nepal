import React, { useState } from 'react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Apply Now — Rent a Bike in Kathmandu | RYD Nepal Contact, Office Location & Phone',
    description: 'Apply for a Hero Super Splendor 125cc rental in Kathmandu. RYD Nepal office at Dhalane Pul, Kapan, Kathmandu (near Dhalane Bridge). Call +977-9709197877. Sunday–Friday 9AM–6PM. Start earning on Pathao, InDrive, Tootle today.',
    keywords: 'RYD Nepal contact, RYD Nepal phone number, RYD Nepal office Kathmandu, bike rental application Kathmandu, apply for bike rental Nepal, rent bike Kapan, motorcycle rental Kapan Kathmandu, Dhalane Pul bike rental, how to apply Pathao rider, bike rental near me Kathmandu, RYD Nepal address, आरवाईडी नेपाल सम्पर्क, बाइक भाडा आवेदन काठमाडौं',
    path: '/contact',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'Contact / Apply', url: 'https://rydnepal.com/contact' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact RYD Nepal — Apply for Bike Rental in Kathmandu',
        description: 'Apply for a motorcycle rental in Kathmandu or contact RYD Nepal for inquiries about bike rental plans, Pathao/InDrive/Tootle registration, and more.',
        url: 'https://rydnepal.com/contact',
        mainEntity: { '@id': 'https://rydnepal.com/#business' },
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-in zoom-in duration-500 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Application Sent!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for applying to rent a bike in Kathmandu. Our team will contact you within 2-4 hours to discuss your Hero Super Splendor rental and help you get started on Pathao, InDrive, or Tootle.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary font-bold hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-100" aria-label="Contact RYD Nepal for bike rental in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Rent a Bike in Kathmandu</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Apply for Bike <br/> Rental Today</h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                Ready to start earning on Pathao, InDrive, or Tootle? Apply for a <strong>Hero Super Splendor 125cc</strong> rental at RYD Nepal. Questions about our <Link to="/services" className="text-primary font-semibold hover:underline">rental plans</Link>, the Sagoon welcome kit, or the application process? We're here to help.
              </p>

              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'Office & Workshop — Kapan, Kathmandu', val: 'Dhalane Pul, Kapan, Kathmandu (Near Dhalane Bridge)' },
                  { icon: Phone, title: 'Call / WhatsApp', val: '+977-9709197877' },
                  { icon: Mail, title: 'Email Support', val: 'support@rydnepal.com' },
                  { icon: Clock, title: 'Working Hours', val: 'Sunday – Friday: 9 AM – 6 PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 mb-1">{item.title}</h2>
                      <p className="text-slate-500 text-sm">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Follow RYD Nepal</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/ryd.nepal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-pink-300 hover:shadow-md transition-all text-sm font-semibold text-slate-700"
                  >
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span>@ryd.nepal</span>
                  </a>
                  <a
                    href="https://www.facebook.com/rydnp2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-sm font-semibold text-slate-700"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>RYD Nepal | Kathmandu</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@ryd.nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-slate-400 hover:shadow-md transition-all text-sm font-semibold text-slate-700"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
                    <span>@ryd.nepal</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 relative z-10">Bike Rental Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ram Bahadur"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="98xxxxxxxx"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preferred Rental Plan</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none cursor-pointer text-slate-700">
                    <option>Daily Flex (Rs. 800/day)</option>
                    <option>Standard Weekly (Rs. 5,600/week)</option>
                    <option>Pro Monthly (Rs. 7,000/week — rent to own)</option>
                    <option>Enterprise / Bulk Bike Rental</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Platform You'll Ride On</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none cursor-pointer text-slate-700">
                    <option>Pathao</option>
                    <option>InDrive</option>
                    <option>Tootle</option>
                    <option>Food Delivery (Foodmandu, etc.)</option>
                    <option>Other / Not Yet Registered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself and your riding experience in Kathmandu..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:bg-primary-600 transition-all flex items-center justify-center shadow-xl shadow-primary-100 group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Submit Bike Rental Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="RYD Nepal office location map in Kathmandu">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Find RYD Nepal's Office in Kathmandu</h2>
          <p className="text-slate-500 text-sm">Dhalane Pul, Kapan, Kathmandu — near Dhalane Bridge</p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-3xl sm:rounded-[50px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative w-full h-56 sm:h-80 md:h-[450px] bg-slate-100 rounded-3xl sm:rounded-[40px] overflow-hidden shadow-xl border-4 border-white">
            <iframe
              src="https://maps.google.com/maps?q=27.729590,85.350096&output=embed&z=17"
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen
              loading="lazy"
              title="RYD Nepal office location map — Dhalane Pul, Kapan, Kathmandu"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
