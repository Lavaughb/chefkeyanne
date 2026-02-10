import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 * Dynamically imports all images from your assets folder.
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});

// 1. Get all image paths
const rawImages = Object.values(imageModules) as string[];

// 2. EXCLUDE "Banner" images from the main gallery grid
const excludedKeywords = ['banner', 'test', 'about', 'logo'];

const allImages = rawImages.filter(path => {
  const lowerPath = path.toLowerCase();
  // Returns true only if NONE of the keywords are found
  return !excludedKeywords.some(keyword => lowerPath.includes(keyword));
});
// 3. SPECIFIC LOGO IMPORT
const logoImg = rawImages.find(p => p.toLowerCase().includes('logo')) || "";

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    // If we are on the gallery page and need to find "about", 
    // we must navigate home first then scroll.
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
      
      {/* --- 1. SHARED NAV BAR (Logo Integration) --- */}
      <header className="fixed top-0 left-0 z-[100] w-full px-6 py-4 md:px-12 md:py-6 bg-background-dark/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* BRANDING GROUP */}
          <div 
            className="flex items-center gap-4 cursor-pointer group z-[110]" 
            onClick={() => navigate('/')}
          >
            {/* THE CIRCULAR LOGO */}
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
            {['Home', 'About', 'Services', 'Menu', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNav(item.toLowerCase())}
                className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all hover:-translate-y-0.5"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden z-[110] p-2 text-primary active:scale-90 transition-transform" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Mobile Overlay */}
          <div className={`fixed top-[73px] md:top-[96px] left-0 w-full h-[calc(100vh-73px)] bg-background-dark/98 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center gap-10 z-[105] ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}>
             <img src={logoImg} className="w-16 h-16 rounded-full border border-white/10 mb-4 opacity-50" alt="Branding" />
             
             {['Home', 'About', 'Services', 'Menu', 'Contact'].map((item, idx) => (
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

      {/* --- 2. GALLERY GRID --- */}
      <main className="pt-32 md:pt-48 pb-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-primary mb-4 md:mb-6">The Visuals</h2>
          <h1 className="text-4xl md:text-7xl font-display uppercase tracking-widest leading-tight mb-6">The Gallery</h1>
          <div className="w-24 h-px bg-primary mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {allImages.map((img, i) => (
            <div 
              key={i} 
              className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-900 border border-white/5 cursor-pointer"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img} 
                alt={`Irieman Dish ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl font-light">add</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 3. LIGHTBOX (Modal) --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 transition-all"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[210]">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          
          <img 
            src={selectedImg} 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            alt="Enlarged view" 
          />
        </div>
      )}

      {/* --- 4. FOOTER --- */}
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
                <li><button onClick={() => navigate('/')} className="hover:text-primary transition-colors uppercase">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors uppercase">About</button></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
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
        <div className="mt-20 md:mt-28 text-center text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/10">
          © 2026 Irieman Caribbean Cuisine | Authentic Excellence
        </div>
      </footer>
    </div>
  );
};

export default Gallery;