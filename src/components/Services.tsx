import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});
const allImages = Object.values(imageModules) as string[];

// Asset Identification - Synced with Home.tsx 'aboutPortrait'
const brandingImg = allImages.find(p => p.toLowerCase().includes('test')) || allImages[0];
const logoImg = allImages.find(p => p.toLowerCase().includes('logo')) || "";

const serviceList = [
  {
    id: '01',
    title: 'Private Dining',
    subtitle: 'The Signature Experience',
    desc: 'Pickup for large tray orders. Our signature service for hosts who want to provide authentic Caribbean flavors in a shared, communal format. Perfect for gatherings that require soul and scale.',
    features: ['Large Tray Options', 'Perfect Pairings', 'Full course options', 'Ready to order options']
  },
  {
    id: '02',
    title: 'Professional Catering',
    subtitle: 'Large Scale Excellence',
    desc: 'From high-end galas to significant celebrations. We provide catering options that maintain the integrity of island spices while meeting the logistical demands of premium events.',
    features: ['Buffet & Plated Options', 'Full course options', 'Dietary Customization']
  },
  {
    id: '03',
    title: 'Corporate Hospitality',
    subtitle: 'Elevated Professionalism',
    desc: 'Leave a lasting impression on clients and colleagues. Our corporate service provides sophisticated Caribbean menus designed for product launches, board meetings, and office celebrations.',
    features: ['Punctual Delivery', 'Professional Setup', 'Branded Menu Options', 'Recurring Service Plans']
  },
  {
    id: '04',
    title: 'Large Orders',
    subtitle: 'Authenticity At Scale',
    desc: 'Large format ordering for gatherings that require authentic soul. Perfect for hosts who want to provide premium Caribbean flavors in a shared, communal format.',
    features: ['Half & Full Tray Sizes', 'Ready-to-Serve Packaging', 'Signature Irieman Sauces', 'Pickup or Delivery']
  },
  {
    id: '05',
    title: 'Weddings',
    subtitle: 'Unforgettable Unions',
    desc: 'Your most significant day deserves a menu that resonates. We work closely with couples to design a culinary narrative that celebrates their union with elegance and flavor.',
    features: ['Rehearsal Dinners', 'Cocktail Hour Canapés', 'Champagne Service', 'Late-night Bites']
  }
];

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // PREVENT BODY SCROLL WHEN MENU IS OPEN (The Google Standard for Mobile UX)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const handleNav = (path: string) => {
    if (path === 'about') {
      scrollToSection('about');
    } else {
      navigate(path === 'home' ? '/' : `/${path.toLowerCase()}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-black">
      
      {/* --- 1. NAVIGATION --- */}
      <header className="fixed top-0 left-0 z-[100] w-full px-6 py-4 md:px-12 md:py-6 bg-background-dark/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group z-[110]" onClick={() => navigate('/')}>
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white/10 overflow-hidden">
               <img src={logoImg} alt="Irieman Logo" className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <h2 className="text-white text-lg md:text-3xl font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase font-display leading-none">IRIEMAN</h2>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Gallery', 'Menu', 'Contact'].map((item) => (
              <button key={item} onClick={() => handleNav(item.toLowerCase())} className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all hover:-translate-y-0.5">{item}</button>
            ))}
          </nav>

          <button className="lg:hidden z-[110] p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>

          {/* ADDED: MOBILE OVERLAY TRAY */}
          <div className={`fixed top-0 left-0 w-full h-screen bg-background-dark/98 backdrop-blur-3xl transition-all duration-500 z-[105] flex flex-col items-center justify-center gap-10 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}>
             {['Home', 'About', 'Gallery', 'Menu', 'Contact'].map((item, idx) => (
              <button 
                key={item} 
                onClick={() => handleNav(item.toLowerCase())}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`text-2xl uppercase tracking-[0.6em] text-white/80 hover:text-primary font-display transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- 2. HEADER --- */}
      <section className="pt-48 md:pt-64 pb-12 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-9xl font-display uppercase tracking-widest mb-10 leading-tight">Services</h1>
        <div className="w-24 h-px bg-primary/40 mx-auto mb-16" />
      </section>

      {/* --- 3. HERO --- */}
      <section className="px-6 mb-32 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-6 border border-primary/20 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-3 border border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
          
          <div className="relative w-72 h-72 md:w-[550px] md:h-[550px] rounded-full overflow-hidden border-4 border-primary shadow-[0_0_60px_rgba(242,185,13,0.15)] bg-neutral-900">
            <img 
              src={brandingImg} 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms]" 
              alt="Chef Portrait" 
            />
          </div>
        </div>
      </section>

      {/* --- 4. SERVICES LIST --- */}
      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto space-y-px bg-white/5 border border-white/5">
          {serviceList.map((service) => (
            <div key={service.id} className="group relative bg-background-dark p-10 md:p-20 transition-all duration-700 hover:bg-neutral-900/40">
              <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
                <div className="lg:w-2/5">
                  <span className="text-primary font-display text-5xl mb-6 block opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">{service.id}</span>
                  <h3 className="text-4xl md:text-5xl font-display uppercase tracking-[0.15em] mb-4 leading-tight">{service.title}</h3>
                  <p className="text-primary tracking-[0.5em] text-xs uppercase font-medium">{service.subtitle}</p>
                </div>
                <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  <div className="text-white/60 text-lg md:text-xl leading-relaxed font-light">{service.desc}</div>
                  <div>
                    <ul className="space-y-5">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.2em] text-white/50 group-hover:text-white/90 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,185,13,0.5)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. CTA SECTION --- */}
      <section className="pb-32 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-neutral-900 border border-white/5 p-16 md:p-24 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px]" />
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-8 relative z-10">Ready to curate your event?</h2>
          <button onClick={() => navigate('/contact')} className="relative z-10 px-16 py-6 bg-primary text-black text-xs tracking-[0.5em] uppercase font-bold hover:bg-white transition-all shadow-xl active:scale-95">Start Inquiry</button>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-sm leading-relaxed font-light">Defining the future of luxury Caribbean dining.</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white/20 mb-8">Navigation</h5>
              <ul className="space-y-4 text-[11px] uppercase tracking-widest text-white/60">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors text-left uppercase">About</button></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/20 mb-6 md:mb-8">Social</h5>
              <a href="https://www.instagram.com/iriemancaribbeancuisine" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-colors block">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};