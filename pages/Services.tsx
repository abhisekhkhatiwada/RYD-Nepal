import React from 'react';
import { Check, Info, Shield, Wrench, Clock, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const plans = [
    {
      id: 'weekly',
      name: 'Standard Weekly',
      price: 'Rs. 5,600',
      period: 'per week',
      desc: 'Perfect for part-time riders testing the waters.',
      features: [
        'Hero Super Splendor 125cc',
        'Routine Service included',
        'Well Maintained Bike',
        '1 Helmet provided',
        'Third-party Insurance guidance'
      ],
      isPopular: false
    },
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: 'Rs. 7,000',
      period: 'per week',
      desc: 'Best value for full-time dedicated gig workers.',
      features: [
        'Hero Super Splendor 125cc',
        'All Servicing Included',
        'Brand new Bike',
        '1 Helmet provided',
        'Phone Mount & Charger',
        'Own Bike after 1.5 Years'
      ],
      isPopular: true
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-6">Our Rental Plans</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Transparent pricing for our Hero Super Splendor fleet with no hidden costs.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-3xl p-10 border-2 transition-all hover:shadow-xl ${
                plan.isPopular ? 'border-primary shadow-primary-50 shadow-lg' : 'border-slate-100'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Best Value
                </span>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-8">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 text-sm ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-600 text-sm">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.isPopular ? 'bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary-100' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                Choose This Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included Details */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Included in Every Plan</h2>
            <p className="text-slate-500">We take care of the heavy lifting for your Hero Super Splendor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">Full Maintenance</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Regular servicing every 1,500km including oil change, brake check, and tire inspection at our partner workshops.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">Insurance Assistance</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Our bikes come with third-party insurance. We help you navigate the documentation if any incident occurs.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">Roadside Support</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Breakdown? Call our hotline. We provide quick fixes or a replacement bike within the Valley.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 text-primary font-bold mb-2">
                <Zap className="w-5 h-5" />
                <span>Optional Add-ons</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Enhance Your Delivery Kit</h3>
              <p className="text-slate-500 max-w-lg">Need a delivery box, extra raincoat, or high-capacity power bank? We offer these for the Splendor fleet.</p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              See Accessory Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;