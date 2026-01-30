import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Clock, Settings, TrendingUp, Star, CheckCircle, Bike, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0 z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary-700 text-xs font-bold uppercase tracking-wider">Available Now in Kathmandu</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Reach Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">Destination.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Empowering Kathmandu's riders with affordable Hero Super Splendor 125cc rentals. Join 500+ Pathao and InDrive partners today.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/services" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary-200 flex items-center justify-center transform hover:-translate-y-1">
                  Start Riding Now <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                  Our Story
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-yellow-400 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-500 font-medium">Trusted by 500+ Riders</p>
                </div>
              </div>
            </div>
            
            <div className="relative lg:h-[600px]">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] transform rotate-3 -z-10"></div>
              <div className="rounded-[40px] overflow-hidden shadow-2xl h-full border-8 border-white">
                <img 
                  src="https://images.deccanchronicle.com/dc-Cover-ilbrrabfksagbfb0ompgpgran2-20180314162754.Medi.jpeg" 
                  alt="Hero Super Splendor 125cc Premium Commuter" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 animate-bounce-slow">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-2xl shadow-lg shadow-green-200">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Weekly Cost</p>
                    <p className="text-2xl font-black text-slate-900">Rs. 5,600</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Riders', val: '500+' },
              { label: 'Bikes in Fleet', val: '120+' },
              { label: 'Avg. Earnings/mo', val: 'Rs. 45k' },
              { label: 'Support Speed', val: '< 30min' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-primary mb-1">{stat.val}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Restoration */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">How RYD Nepal Works</h2>
            <p className="text-slate-500">Get on the road in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "1. Register & Apply", desc: "Submit your driving license and citizenship copy online or at our office." },
              { icon: Shield, title: "2. Verify & Confirm", desc: "Our team verifies your documents and prepares your well-maintained Hero Super Splendor 125cc." },
              { icon: Bike, title: "3. Pick Up & Ride", desc: "Pick up your keys, get your helmet, and start earning on your preferred platform." }
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose RYD Nepal?</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We understand the hustle of Kathmandu's streets. Our service is designed to remove the barriers between you and your livelihood.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Insurance Support', desc: 'We assist with third-party insurance claims and safety training.' },
                  { icon: Settings, title: 'Zero Maintenance Cost', desc: 'We handle all servicing, oil changes, and regular repairs.' },
                  { icon: TrendingUp, title: 'Income Focused', desc: 'No heavy EMI. Low weekly rent keeps more profit in your pocket.' },
                  { icon: Clock, title: '24/7 Support', desc: 'Emergency breakdown assistance within the Kathmandu Valley.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg mt-1">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0 grid grid-cols-2 gap-4">
              <img src="https://merogaadi.s3.us-east-2.amazonaws.com/images/makes/Hero%20Super%20Splendor-1588416954-817.jpg?q=80&w=400&h=500&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-8 object-cover h-[400px]" alt="Hero Super Splendor Detail" />
              <img src="https://imgd.aeplcdn.com/642x361/n/cw/ec/126977/hero-super-splendor-right-front-three-quarter0.jpeg?isig=0&q=75?q=80&w=400&h=500&auto=format&fit=crop" className="rounded-2xl shadow-lg object-cover h-[400px]" alt="Hero Super Splendor 125cc Side Profile" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Rider Success Stories</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Don't just take our word for it. Hear from the people who keep Kathmandu moving.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Ram Thapa', 
                role: 'Pathao Partner', 
                text: 'RYD Nepal changed my life. I couldn\'t afford a bike, but now I earn Rs. 50,000 every month using their rental service.',
                img: 'https://i.pravatar.cc/150?u=ram'
              },
              { 
                name: 'Sita Gurung', 
                role: 'Food Delivery', 
                text: 'The maintenance is what makes it worth it. I never worry about oil changes or repairs. I just ride and earn.',
                img: 'https://i.pravatar.cc/150?u=sita'
              },
              { 
                name: 'Binod Rai', 
                role: 'Gig Worker', 
                text: 'Support is amazing. I had a flat tire in Balaju at 8 PM, and they sent a replacement bike within 40 minutes.',
                img: 'https://i.pravatar.cc/150?u=binod'
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <img src={t.img} className="w-12 h-12 rounded-full object-cover" alt={t.name} />
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

      {/* CTA section refined */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join the RYD <br/> Community</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md">Get your Hero Super Splendor keys today and start earning. No credit checks, no hassle.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary-900/40">
                    Book Now
                  </Link>
                  <Link to="/support" className="bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-700 transition-all">
                    How it Works
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img src="https://techsathi.com/wp-content/uploads/2024/04/Pathao-Nepal-Ridesharing-Nepal.jpg?q=80&w=1974&auto=format&fit=crop" className="rounded-3xl shadow-2xl rotate-2 object-cover h-[350px] w-full" alt="Hero Super Splendor Detail View" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;