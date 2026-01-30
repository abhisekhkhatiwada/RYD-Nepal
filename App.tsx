import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ChevronRight, Bike, Shield, Settings, Clock, CheckCircle2 } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Support from './pages/Support';
import Contact from './pages/Contact';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Support', path: '/support' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">RYD <span className="text-primary">Nepal</span></span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path || (location.pathname === '' && link.path === '/')
                    ? 'text-primary'
                    : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-600 transition-all shadow-sm">
              Rent Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'bg-primary-50 text-primary' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">RYD <span className="text-primary">Nepal</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering the gig economy in Nepal by providing affordable, well-maintained motorcycles for ride-sharing and delivery services.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary">Our Plans</Link></li>
              <li><Link to="/support" className="hover:text-primary">Rider Support</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/support" className="hover:text-primary">FAQs</Link></li>
              <li><Link to="/support" className="hover:text-primary">Maintenance Request</Link></li>
              <li><Link to="/support" className="hover:text-primary">Emergency Help</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+977-1-4200000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@rydnepal.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-xs text-center">
            &copy; {new Date().getFullYear()} RYD Nepal Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Facebook className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
            <Instagram className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
            <Twitter className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

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
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;