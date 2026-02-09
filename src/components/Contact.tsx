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
const logoImg = allImages.find(p => p.toLowerCase().includes('logo')) || "";

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      
      {/* --- 1. SHARED NAV BAR --- */}
      <header className="fixed top-0 left-0 z-[100] w-full px-6 py-4 md:px-12 md:py-6 bg-background-dark/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* BRANDING GROUP */}
          <div 
            className="flex items-center gap-4 cursor-pointer group z-[110]" 
            onClick={() => navigate('/')}
          >
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/50">
               <img 
                src={logoImg} 
                alt="Irieman Logo" 
                className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
               />
            </div>
            <h2 className="text-white text-lg md:text-3xl font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase font-display leading-none">
              IRIEMAN
            </h2>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Services', 'Gallery', 'Menu'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNav(item.toLowerCase())}
                className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all hover:-translate-y-0.5"
              >
                {item}
              </button>
            ))}
            <button className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold underline underline-offset-8">
              Contact
            </button>
          </nav>

          {/* Mobile Toggle Button */}
          <button 
            className="lg:hidden z-[110] p-2 text-primary active:scale-90 transition-transform" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Mobile Overlay */}
          <div className={`fixed top-[73px] md:top-[96px] left-0 w-full h-[calc(100vh-73px)] bg-background-dark/98 backdrop-blur-3xl transition-all duration-500 z-[105] flex flex-col items-center justify-center gap-10 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}>
            {['Home', 'About', 'Services', 'Gallery', 'Menu', 'Contact'].map((item, idx) => (
              <button 
                key={item} 
                onClick={() => handleNav(item.toLowerCase())}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`text-2xl uppercase tracking-[0.6em] text-white/80 hover:text-primary font-display transition-all ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- 2. HEADER --- */}
      <section className="pt-48 md:pt-64 pb-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-primary text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4">Get In Touch</h2>
        <h1 className="text-5xl md:text-9xl font-display uppercase tracking-widest mb-10 leading-tight">
          Inquire
        </h1>
        <p className="text-white/50 text-sm md:text-xl tracking-[0.2em] uppercase font-light">
          Let’s Curate Your Next Culinary Experience
        </p>
      </section>

      {/* --- 3. CONTACT CARD & INFO --- */}
      <section className="pb-40 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Business Card */}
          <div className="lg:w-2/3 bg-neutral-900/40 backdrop-blur-sm border border-white/5 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 md:opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[10rem] text-primary">restaurant</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest mb-8">Business Relations</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-16 font-light max-w-xl">
              For event bookings, private dining requests, or corporate partnerships, please reach out via our official channels. Our team typically responds within 24–48 hours to begin the curation process.
            </p>

            <div className="flex flex-col gap-12">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Email Official</p>
                <a href="mailto:catering@iriemancaribbeancuisine.com" className="text-lg md:text-3xl font-light hover:text-primary transition-colors block break-words">
                  catering@iriemancaribbeancuisine.com
                </a>
              </div>
              
              <div className="w-12 h-px bg-white/10" />

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Direct Line</p>
                <a href="tel:407-431-2977" className="text-2xl md:text-4xl font-light hover:text-primary transition-colors block">
                  +1 (407)-431-2977
                </a>
              </div>
            </div>
          </div>

          {/* Social / Side Info */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-neutral-950 border border-white/5 p-10 rounded-[2rem] flex-1">
              <h3 className="text-xs uppercase tracking-[0.5em] text-white/30 mb-8">Social Connection</h3>
              <p className="text-white/60 mb-8 font-light italic">Follow the culinary artistry and stay updated with our recent plates.</p>
              <a 
                href="https://www.instagram.com/iriemancaribbeancuisine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group py-4 border-b border-white/10"
              >
                <span className="text-lg uppercase tracking-widest group-hover:text-primary transition-colors">Instagram</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-primary">north_east</span>
              </a>
            </div>

            <div className="bg-primary p-10 rounded-[2rem] text-black shadow-xl shadow-primary/10">
              <h3 className="text-xs uppercase tracking-[0.5em] font-bold mb-4 opacity-70">
                Availability
              </h3>
                            {/* First Paragraph */}
              <p className="text-xl leading-tight font-bold uppercase tracking-wider mb-6">
                Now accepting bookings for 2026.
              </p>
              {/* Second Paragraph - Fancy/Italicized Style */}
              <p className="text-2xl leading-tight italic font-serif opacity-90 border-t border-black/10 pt-6">
                You do the relaxing, we'll do the cooking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. SHARED FOOTER --- */}
      <footer className="py-20 md:py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-2xl md:text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed">Defining the future of luxury Caribbean dining. From intimate plates to grand-scale excellence.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <div>
              <h5 className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/20 mb-6 md:mb-8">Navigation</h5>
              <ul className="space-y-3 md:space-y-4 text-[10px] md:text-[11px] uppercase tracking-widest text-white/60">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors text-left uppercase">About</button></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/20 mb-6 md:mb-8">Social</h5>
              <a href="https://www.instagram.com/iriemancaribbeancuisine" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-colors block">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-20 md:mt-28 text-center text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/10">
          © 2026 Irieman Caribbean Cuisine | Authentic Excellence
        </div>


      </footer>
    </div>
  );
};

export default Contact;