import React, { useState } from 'react';
import { Phone, MessageSquare, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="pb-5 text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const Support: React.FC = () => {
  const faqs = [
    {
      question: "What documents do I need to rent a Hero Super Splendor?",
      answer: "You need a valid Nepali Motorcycle Riding License, a copy of your Citizenship card, and a recent passport-sized photograph. We also require a local reference."
    },
    {
      question: "Is there a security deposit?",
      answer: "Yes, we require a small refundable security deposit of Rs. 3,000 for weekly plans and Rs. 5,000 for monthly plans to cover minor damages or missing accessories."
    },
    {
      question: "Who pays for the fuel?",
      answer: "The rider is responsible for fuel costs. We provide the bike with a full tank, and we expect it to be returned with a full tank, or the difference will be deducted."
    },
    {
      question: "What happens if the bike breaks down?",
      answer: "Call our 24/7 hotline immediately. If you are within Kathmandu Valley, we will send a technician or a replacement bike within 1-2 hours."
    },
    {
      question: "Can I use the Hero Super Splendor for personal trips?",
      answer: "Yes, while the bikes are primarily for gig work, you are free to use them for personal mobility within the agreed geographical limits (usually Bagmati Province)."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Header */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-6">Support Center</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            We're here to keep you moving. Whether it's a flat tire or a billing question, we've got you covered.
          </p>
        </div>
      </section>

      {/* Emergency & Maintenance Contacts */}
      <section className="py-16 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start space-x-6">
            <div className="bg-red-50 p-4 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Emergency Assistance</h3>
              <p className="text-slate-500 text-sm mb-4">Accidents or major breakdowns on the road.</p>
              <a href="tel:+97714200000" className="inline-flex items-center text-primary font-bold hover:underline">
                <Phone className="w-4 h-4 mr-2" /> +977-1-4200000
              </a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start space-x-6">
            <div className="bg-primary-50 p-4 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">General Support</h3>
              <p className="text-slate-500 text-sm mb-4">Billing, plan changes, or document renewal.</p>
              <div className="flex space-x-4">
                <a href="#" className="inline-flex items-center text-primary font-bold hover:underline">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Request Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Maintenance Request Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Check Distance", text: "Look at your odometer for your Hero Super Splendor. Service is due every 1,500km." },
              { title: "Book Slot", text: "Message us 2 days in advance to book your service slot." },
              { title: "Drop Off", text: "Bring your bike to our Kalanki or Tinkune workshop by 10 AM." },
              { title: "Pick Up", text: "Collect your serviced bike by 4 PM on the same day." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 h-full">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary-200">
                    {i + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 mb-2 mt-2">{step.title}</h4>
                  <p className="text-slate-500 text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;