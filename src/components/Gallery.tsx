import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 * Dynamically imports all images from your assets folder.
 * Using Eager loading for immediate availability on the Edge.
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});

// 1. Define our Exclusion & Specific Asset Logic
const EXCLUDED_KEYWORDS = ['banner', 'test', 'about', 'logo', 'hero', 'inactive'];

// 2. Process images with a focus on O(n) efficiency
// We want to separate the "Logo" and the "Gallery" images in one pass
const rawEntries = Object.entries(imageModules) as [string, string][];

const allImages = rawEntries
  .filter(([path]) => {
    const lowerPath = path.toLowerCase();
    // Only include if NONE of the excluded keywords exist in the filename
    return !EXCLUDED_KEYWORDS.some(keyword => lowerPath.includes(keyword));
  })
  .map(([, url]) => url);

// Find that Logo specifically - fallback to a string to avoid hydration mismatches
const logoImg = (rawEntries.find(([path]) => path.toLowerCase().includes('logo'))?.[1]) || "";

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
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
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-black font-sans antialiased">
      
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
          <div className={`fixed top-0 left-0 w-full h-screen bg-background-dark/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center gap-8 z-[105] ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}>
             <img src={logoImg} className="w-20 h-20 rounded-full border border-white/10 mb-8 opacity-80" alt="Branding" />
             
             {['Home', 'About', 'Services', 'Menu', 'Contact'].map((item, idx) => (
              <button 
                key={item} 
                onClick={() => handleNav(item.toLowerCase())}
                style={{ transitionDelay: `${idx * 75}ms` }}
                className={`text-3xl uppercase tracking-[0.6em] text-white/80 hover:text-primary font-display transition-all ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-primary mb-4 md:mb-6 animate-pulse">The Visuals</h2>
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none mb-8">The Gallery</h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* CSS Grid with modern aspect-ratio handling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((img, i) => (
            <div 
              key={i} 
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 cursor-none"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img} 
                alt={`Irieman Dish ${i}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <span className="material-symbols-outlined text-white text-5xl font-extralight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  fullscreen
                </span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">View Detail</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 3. LIGHTBOX (Modal) --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 transition-all cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/30 hover:text-primary transition-colors z-[210] active:scale-90">
            <span className="material-symbols-outlined text-5xl font-light">close</span>
          </button>
          
          <img 
            src={selectedImg} 
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300" 
            alt="Enlarged view" 
          />
        </div>
      )}

      {/* --- 4. FOOTER --- */}
      <footer className="py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">
              Crafting high-fidelity Caribbean culinary experiences. 
              Refined flavors. Zero compromises. Shipping globally soon.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white/20 mb-8">Sitemap</h5>
              <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-white/60">
                <li><button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white/20 mb-8">Connect</h5>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-primary transition-colors block">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-32 text-center text-[10px] uppercase tracking-[0.8em] text-white/10">
          © 2026 Irieman | Built for the Edge
        </div>
      </footer>
    </div>
  );
};

export default Gallery;