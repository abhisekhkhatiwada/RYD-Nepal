import React, { useState } from 'react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import { Phone, MessageSquare, AlertCircle, ChevronDown, ChevronUp, MapPin, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
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
  useSEO({
    title: 'Bike Rental Support & FAQ — RYD Nepal | How to Rent a Bike in Kathmandu, Maintenance, Ownership',
    description: 'Complete guide to renting a bike in Kathmandu with RYD Nepal. FAQ about Hero Super Splendor rental, documents needed, Sagoon kit, earning on Pathao/InDrive/Tootle, rent-to-own path, Kapan workshop maintenance, and 24/7 breakdown support.',
    keywords: 'how to rent bike Kathmandu, bike rental FAQ Nepal, documents for bike rental Kathmandu, Pathao rider requirements Nepal, InDrive driver registration, Tootle rider how to join, motorcycle maintenance Kathmandu, Kapan workshop RYD Nepal, rent to own bike FAQ, bike rental support Kathmandu, बाइक भाडा सहायता काठमाडौं, बाइक भाडा कसरी लिने',
    path: '/support',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://rydnepal.com/' },
        { name: 'Rider Support & FAQ', url: 'https://rydnepal.com/support' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Book Motorcycle Maintenance at RYD Nepal Kapan Workshop',
        description: 'Step-by-step guide to booking your Hero Super Splendor 125cc service at RYD Nepal\'s Kapan workshop in Kathmandu.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Check Odometer', text: 'Service is triggered every 1,500km on your Hero Super Splendor. Check your odometer regularly.' },
          { '@type': 'HowToStep', position: 2, name: 'Book Your Slot', text: 'Message or WhatsApp RYD Nepal at +977-9709197877 at least 2 days in advance to confirm a service slot at Kapan workshop.' },
          { '@type': 'HowToStep', position: 3, name: 'Drop Off by 10 AM', text: 'Bring your bike to Kapan workshop (near Dhalane Bridge, Kathmandu) by 10 AM on the confirmed date.' },
          { '@type': 'HowToStep', position: 4, name: 'Pick Up by 4 PM', text: 'Collect your fully serviced bike the same day by 4 PM — oil change, brakes, tires all checked.' },
        ],
      },
    ],
  });

  const faqs = [
    {
      question: "How much does it cost to rent a bike in Kathmandu?",
      answer: "RYD Nepal offers the cheapest bike rental in Kathmandu: Daily Flex at Rs. 800/day, Standard Weekly at Rs. 5,600/week, and Pro Monthly at Rs. 7,000/week. All plans include a Hero Super Splendor 125cc, maintenance, and 24/7 support. View our full pricing on our rental plans page."
    },
    {
      question: "What documents do I need to rent a Hero Super Splendor in Kathmandu?",
      answer: "You need a valid Nepali Motorcycle Riding License (मोटरसाइकल लाइसेन्स), a copy of your Citizenship card (नागरिकता), and a recent passport-sized photograph. We also require a local reference. Bring these to our Kapan office (Dhalane Pul) in Kathmandu or submit copies when applying online."
    },
    {
      question: "Is there a security deposit for bike rental?",
      answer: "Yes, we require a small refundable security deposit of Rs. 3,000 for the Daily and Weekly plans, and Rs. 5,000 for the Pro Monthly plan. This covers minor damages or missing accessories and is returned when you end the rental in good standing."
    },
    {
      question: "What is the Sagoon welcome kit for new riders?",
      answer: "The Sagoon kit is a free starter package worth Rs. 3,000+ given to every new RYD Nepal rider. It includes a helmet, phone holder/mount, raincoat, and Rs. 1,500 worth of fuel credit to get you started earning on Pathao, InDrive, or Tootle. It is provided once per rider, at onboarding."
    },
    {
      question: "Who pays for fuel when renting a bike?",
      answer: "You are responsible for fuel costs. Your Hero Super Splendor comes with a full tank on pickup. We expect you to return it with a full tank; otherwise the fuel difference is deducted from your deposit. New riders also get Rs. 1,500 fuel credit in their Sagoon kit. The Hero Splendor 125cc offers excellent mileage of 60-70 km/l, making it very fuel-efficient for gig work in Kathmandu."
    },
    {
      question: "What happens if my rental bike breaks down in Kathmandu?",
      answer: "Call our 24/7 hotline immediately at +977-9709197877. If you are within the Kathmandu Valley, we will dispatch a technician or a replacement bike. Most breakdowns are resolved within 30 minutes to 1 hour. Do not attempt repairs yourself — it may affect your security deposit."
    },
    {
      question: "How does the rent-to-own motorcycle plan work?",
      answer: "On the Pro Monthly plan (Rs. 7,000/week), after 1.5 years (78 weeks) of continuous rental, the Hero Super Splendor is legally transferred to your name at no additional cost. There is no bank loan, no EMI, and no credit check involved. You ride it, earn from it on Pathao/InDrive/Tootle, then own it. This is Nepal's first rent-to-own motorcycle program."
    },
    {
      question: "Where is the RYD Nepal motorcycle workshop in Kathmandu?",
      answer: "Our workshop is located at Kapan, near Dhalane Bridge, Kathmandu. Services are available Sunday through Friday. Book a service slot at least 2 days in advance by messaging us on WhatsApp. Drop off your bike by 10 AM and collect it by 4 PM on the same day. Service is triggered every 1,500km and includes oil change, brake check, tire inspection, and parts replacement — all free."
    },
    {
      question: "Can I use the rental bike for personal trips, not just gig work?",
      answer: "Yes. While our Hero Super Splendor 125cc bikes are primarily rented for gig work (Pathao, InDrive, Tootle, food delivery), you are free to use them for personal mobility within the agreed geographical limits — usually Bagmati Province / Kathmandu Valley."
    },
    {
      question: "How do I become a Pathao rider in Kathmandu?",
      answer: "Step 1: Apply at RYD Nepal with your license and citizenship. Step 2: Pick up your Hero Super Splendor 125cc. Step 3: Download the Pathao app and register as a rider partner with your documents. Step 4: Start accepting rides and earning Rs. 1,500–2,500 daily. We can help guide you through the Pathao registration process."
    },
    {
      question: "How do I join InDrive or Tootle as a rider in Nepal?",
      answer: "Rent a bike from RYD Nepal first, then register on InDrive or Tootle using your motorcycle license and vehicle documents. Both platforms accept RYD Nepal rental bikes. InDrive lets you negotiate fares (earn Rs. 35,000–55,000/month), while Tootle offers consistent daily rides (earn Rs. 30,000–50,000/month). We guide new riders through the registration process."
    },
    {
      question: "काठमाडौंमा बाइक भाडामा कसरी लिने? (How to rent a bike in Kathmandu?)",
      answer: "RYD Nepal बाट काठमाडौंमा बाइक भाडामा लिन: १) लाइसेन्स र नागरिकता लिएर कपन, ढलाने पुल कार्यालय आउनुहोस्। २) कागजात प्रमाणित भएपछि हिरो सुपर स्प्लेन्डर 125cc लिनुहोस्। ३) सगुन किट (हेल्मेट, फोन माउन्ट, रेनकोट, रु. १,५०० इन्धन क्रेडिट) पाउनुहोस्। ४) पाठाओ, इनड्राइभ, वा टुटलमा कमाउन सुरु गर्नुहोस्। भाडा रु. ८००/दिन बाट। फोन: ९७०९१९७८७७।"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Header */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-6">Bike Rental Support Center — Kathmandu</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Complete help for RYD Nepal riders. Whether it's a breakdown, billing question, maintenance booking, or help joining Pathao, InDrive, or Tootle — we've got you covered.
          </p>
        </div>
      </section>

      {/* Emergency & Maintenance Contacts */}
      <section className="py-16 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Emergency and support contacts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start space-x-6">
            <div className="bg-red-50 p-4 rounded-2xl flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Emergency Bike Assistance — 24/7</h2>
              <p className="text-slate-500 text-sm mb-4">Accidents, breakdowns, or flat tires anywhere in Kathmandu Valley — call immediately for emergency support.</p>
              <a href="tel:+9779709197877" className="inline-flex items-center text-primary font-bold hover:underline">
                <Phone className="w-4 h-4 mr-2" /> +977-9709197877
              </a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start space-x-6">
            <div className="bg-primary-50 p-4 rounded-2xl flex-shrink-0">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">General Rental Support</h2>
              <p className="text-slate-500 text-sm mb-4">Billing, plan changes, service bookings, Pathao/InDrive/Tootle registration help, or document renewal.</p>
              <a
                href="https://wa.me/9779709197877"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-bold hover:underline"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Info */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="RYD Nepal Kapan motorcycle workshop">
        <div className="bg-primary-50 border border-primary-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-primary p-4 rounded-2xl">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900 mb-1">RYD Nepal Motorcycle Workshop — Kapan, Kathmandu</h2>
            <p className="text-slate-600 text-sm">Full bike servicing, engine checks, brake & tire testing, parts replacement, and emergency technical support. Free for all rental riders.</p>
          </div>
          <div className="flex items-center space-x-2 text-primary font-semibold text-sm bg-white px-5 py-3 rounded-xl border border-primary-100 whitespace-nowrap">
            <MapPin className="w-4 h-4" />
            <span>Kapan, near Dhalane Bridge</span>
          </div>
        </div>
      </section>

      {/* Maintenance Request Steps */}
      <section className="py-20 bg-slate-50" aria-label="How to book motorcycle maintenance in Kathmandu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">How to Book Bike Maintenance — Kapan Workshop</h2>
          <p className="text-slate-500 text-center mb-12 text-sm">Service is due every 1,500km on your Hero Super Splendor 125cc — here's how to book it.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Check Odometer", text: "Maintenance is triggered every 1,500km on your Hero Super Splendor. Check your odometer regularly to stay ahead." },
              { title: "Book Your Slot", text: "Message or WhatsApp us at +977-9709197877 at least 2 days in advance to confirm a service slot at our Kapan workshop." },
              { title: "Drop Off by 10 AM", text: "Bring your bike to our Kapan workshop (near Dhalane Bridge, Kathmandu) by 10 AM on the confirmed date." },
              { title: "Pick Up by 4 PM", text: "Collect your fully serviced motorcycle the same day by 4 PM — oil change, brakes, tires all checked and ready for earning." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 h-full">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary-200">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2 mt-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20" aria-label="Frequently asked questions about bike rental in Kathmandu">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions — Bike Rental Kathmandu</h2>
          <p className="text-slate-500 text-center mb-8 text-sm">Everything you need to know about renting a motorcycle in Kathmandu with RYD Nepal.</p>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white" aria-label="Start renting">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions About Bike Rental in Kathmandu?</h2>
          <p className="text-slate-400 mb-8">Our team is ready to help. WhatsApp us or visit our Kapan office near Dhalane Bridge in Kathmandu.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/9779709197877?text=Hello%20RYD%20Nepal%2C%20I%20have%20a%20question%20about%20bike%20rental." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all">
              WhatsApp Us
            </a>
            <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all">
              Apply for a Bike
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
