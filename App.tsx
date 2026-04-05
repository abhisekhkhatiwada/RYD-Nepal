import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Bike, MessageCircle } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Support from './pages/Support';
import Contact from './pages/Contact';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Plans', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Support', path: '/support' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' || location.pathname === '' : location.pathname === path;

  return (
    <nav aria-label="Main navigation — RYD Nepal bike rental Kathmandu" className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${scrolled ? 'shadow-md shadow-slate-100' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-primary p-1.5 rounded-xl group-hover:bg-primary-600 transition-colors">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-slate-900">RYD </span>
              <span className="text-lg font-black tracking-tight text-primary">Nepal</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-600 transition-all shadow-sm hover:shadow-md hover:shadow-primary-100 flex items-center gap-1.5"
            >
              Rent Now
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block w-full mt-2 bg-primary text-white px-4 py-3 rounded-xl text-sm font-bold text-center hover:bg-primary-600 transition-colors"
            >
              Rent Now — Rs. 700/day
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8" aria-label="RYD Nepal — bike rental Kathmandu, motorcycle rental Nepal, contact information">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center space-x-2.5 mb-5">
              <div className="bg-primary p-1.5 rounded-xl">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-lg font-black tracking-tight text-white">RYD </span>
                <span className="text-lg font-black tracking-tight text-primary">Nepal</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Nepal's #1 motorcycle rental for gig workers. Rent a Hero Super Splendor 125cc in Kathmandu from Rs. 700/day. Earn on Pathao, InDrive, Yango & Tootle. Own after 1.5 years. बाइक भाडामा काठमाडौं — अब तपाईंको कमाउने पालो।
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/ryd.nepal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RYD Nepal Instagram"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a
                href="https://www.facebook.com/rydnp2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RYD Nepal Facebook"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@ryd.nepal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RYD Nepal TikTok"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              </a>
              <a
                href="https://wa.me/9779709197877?text=Hello%20RYD%20Nepal%2C%20I%27m%20interested%20in%20renting%20a%20bike."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp RYD Nepal"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Pages</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Rental Plans', to: '/services' },
                { label: 'Blog', to: '/blog' },
                { label: 'Rider Support', to: '/support' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Plans</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Weekly — Rs. 5,600/week</li>
              <li>Pro Monthly — Rs. 7,000/wk</li>
              <li>Prepayment — Rs. 21,000/month</li>
              <li className="text-primary font-medium">Own after 1.5 years</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">Dhalane Pul, Kapan, Kathmandu<br/><span className="text-slate-500 text-xs">Office & Workshop — Near Dhalane Bridge</span></span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+9779709197877" className="text-slate-400 hover:text-white transition-colors">+977-9709197877</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:support@rydnepal.com" className="text-slate-400 hover:text-white transition-colors">support@rydnepal.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center">
            &copy; {new Date().getFullYear()} RYD Nepal Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs text-center">
            As covered by ShareHub Nepal · Insurance Khabar · Corporate Khabar
          </p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/9779709197877?text=Hello%20RYD%20Nepal%2C%20I%27m%20interested%20in%20renting%20a%20bike."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center bg-green-500 hover:bg-green-600 text-white p-3 sm:px-4 sm:py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <MessageCircle className="w-5 h-5 flex-shrink-0" />
    <span className="hidden sm:inline text-sm font-bold ml-2">WhatsApp Us</span>
  </a>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;
