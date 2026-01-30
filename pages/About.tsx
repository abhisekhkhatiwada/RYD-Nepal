import React from 'react';
import { Target, Eye, Heart, Globe, Shield, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-800">Empowering Nepal's Gig Workers</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            RYD Nepal Pvt. Ltd. was founded on a simple realization: many hardworking people in Kathmandu want to work in ride-sharing and delivery but lack the capital to buy their own vehicle.
          </p>
        </div>
      </section>

      {/* Story & Context */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://assets-cdn.kathmandupost.com/uploads/source/news/2019/miscellaneous/tootle-nepal-15012019112335.jpg?q=80&w=1000&auto=format&fit=crop" alt="Hero Super Splendor in Kathmandu context" className="rounded-3xl shadow-xl object-cover h-[500px] w-full" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The Local Context</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                In the bustling urban landscape of Kathmandu, Pokhara, and beyond, platforms like Pathao, InDrive, and Tootle have revolutionized mobility and employment. However, the high price of motorcycles and steep interest rates from banks make ownership impossible for many.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We fill this gap by providing high-quality Hero Super Splendor 125cc motorcycles for a small weekly or monthly subscription fee. We don't just rent bikes; we rent opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700">
              <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/20">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To provide inclusive and affordable transportation solutions that enable every hardworking Nepali to participate in the growing digital gig economy without financial stress.
              </p>
            </div>
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700">
              <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/20">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                To be the leading mobility-as-a-service provider in Nepal, fueled by our Hero Super Splendor fleet and supporting delivery professionals nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500">What drives us every single day</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Empathy', text: 'We understand our riders\' challenges.' },
              { icon: Shield, title: 'Safety', text: 'Well-maintained Splendors for safer roads.' },
              { icon: Globe, title: 'Empowerment', text: 'Creating jobs and supporting families.' },
              { icon: CheckCircle, title: 'Integrity', text: 'No hidden fees, no complicated contracts.' }
            ].map((value, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-block bg-primary-50 p-6 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-500 text-sm">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;