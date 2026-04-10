import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Calendar, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Gifts', path: '/gifts' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
          isScrolled ? "bg-cream/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <Logo className="w-12 md:w-16" variant="dark" />
            <div className={cn(
              "flex flex-col transition-all duration-500",
              isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            )}>
              <span className="font-display font-black text-lg leading-none text-forest-deep">Whisper of Age</span>
              <span className="font-mono text-[10px] uppercase tracking-tighter text-forest-light">树聆之语</span>
            </div>
          </Link>

          {/* Global Hamburger Toggle */}
          <button
            className={cn(
              "p-3 rounded-full transition-all z-50",
              isScrolled 
                ? "bg-forest-deep text-cream shadow-xl hover:scale-110" 
                : "bg-forest-deep/10 text-forest-deep hover:bg-forest-deep hover:text-cream"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-forest-deep text-cream flex flex-col items-center justify-center p-10"
      >
        <div className="absolute top-10 left-10">
          <Logo className="w-20" variant="light" />
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-10 right-10 p-4 text-cream hover:rotate-90 transition-transform"
        >
          <X size={40} />
        </button>

        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "font-display text-5xl md:text-7xl font-black hover:text-gold transition-colors",
                  location.pathname === link.path ? "text-gold" : "text-cream"
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 mt-12"
          >
            <Link
              to="/workshops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-10 py-4 rounded-full border-2 border-cream text-cream font-display text-xl font-bold hover:bg-cream hover:text-forest-deep transition-all"
            >
              Book Workshop
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-10 py-4 rounded-full bg-terracotta text-cream font-display text-xl font-bold hover:bg-gold transition-all shadow-2xl shadow-black/20"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute bottom-10 left-10 opacity-10 font-display text-9xl font-black pointer-events-none select-none">
          树聆之语
        </div>
      </motion.div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <Logo className="w-16" variant="light" />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl leading-none">Whisper of Age</span>
              <span className="font-mono text-xs uppercase tracking-tighter opacity-70">树聆之语</span>
            </div>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed mb-8">
            Solace in Plants. Silent Listener. We bring tranquility and joy into your space through nature therapy.
          </p>
          <div className="flex gap-4">
            {['Facebook', 'Instagram', 'WhatsApp'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest-deep transition-all"
              >
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Explore</h4>
          <ul className="space-y-4 font-mono text-sm opacity-70">
            <li><Link to="/shop" className="hover:opacity-100 transition-opacity">Retail Plants</Link></li>
            <li><Link to="/workshops" className="hover:opacity-100 transition-opacity">Workshops</Link></li>
            <li><Link to="/gifts" className="hover:opacity-100 transition-opacity">Gift Boxes</Link></li>
            <li><Link to="/about" className="hover:opacity-100 transition-opacity">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-4 font-mono text-sm opacity-70">
            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Plant Care Guide</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6">Visit Us</h4>
          <p className="text-sm opacity-70 leading-relaxed mb-4">
            Find us at our next Pop-Up event or visit our nursery partner in Selangor.
          </p>
          <div className="flex items-center gap-2 text-terracotta font-bold">
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-cream/10 flex flex-col md:row items-center justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">
          © 2026 Whisper of Age. All rights reserved. Grow with us. 🌱
        </p>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest">
          <button className="hover:text-terracotta transition-colors">English</button>
          <span className="opacity-20">|</span>
          <button className="hover:text-terracotta transition-colors">中文</button>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/yournumber"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold">
        Chat with us
      </span>
    </motion.a>
  );
}
