import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

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
          <h2 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for reaching out. Our team will contact you within 2-4 hours to discuss your Hero Super Splendor rental application.
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
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Reach Us</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Let's Get You <br/> on the Road</h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                Whether you have a question about our Hero Super Splendor fleet, pricing, or the application process, our team is here to help.
              </p>

              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'Our Office', val: 'Tinkune-32, Kathmandu (Near White House College)' },
                  { icon: Phone, title: 'Call/WhatsApp', val: '+977-1-4200000 / +977-9801234567' },
                  { icon: Mail, title: 'Email Support', val: 'support@rydnepal.com' },
                  { icon: Clock, title: 'Working Hours', val: 'Sunday - Friday: 9 AM - 6 PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0"></div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 relative z-10">Application Inquiry</h3>
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
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preferred Plan</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none cursor-pointer">
                    <option>Standard Weekly (Rs. 5,600)</option>
                    <option>Pro Weekly (Rs. 7,000)</option>
                    <option>Enterprise / Bulk Rental</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your experience in ride-sharing..." 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:bg-primary-600 transition-all flex items-center justify-center shadow-xl shadow-primary-100 group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-[50px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative w-full h-[450px] bg-slate-100 rounded-[40px] overflow-hidden shadow-xl border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.153495293245!2d85.3444697753697!3d27.68165387619623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19920959c997%3A0x67a99f6916540307!2sTinkune%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1709123456789!5m2!1sen!2snp" 
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;