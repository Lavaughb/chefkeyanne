import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * ASSET PIPELINE
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});
const allImages = Object.values(imageModules) as string[];

const pdfModules = import.meta.glob('../assets/*.pdf', { 
  eager: true, 
  import: 'default' 
});
const pdfFiles = Object.values(pdfModules) as string[];

// Asset Identification
const brandingImg = allImages.find(p => p.toLowerCase().includes('logo')) || allImages[0];
const logoImg = allImages.find(p => p.toLowerCase().includes('logo')) || "";
const menuLink = pdfFiles.find(p => p.toLowerCase().includes('menu')) || pdfFiles[0];

const Menu: React.FC = () => {
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
    <div className="bg-background-dark text-white antialiased min-h-screen selection:bg-primary selection:text-black">
      
      {/* --- 1. SHARED NAV BAR --- */}
      <header className="fixed top-0 left-0 z-[100] w-full px-6 py-4 md:px-12 md:py-6 bg-background-dark/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group z-[110]" onClick={() => navigate('/')}>
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/50">
               <img src={logoImg} alt="Irieman Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-white text-lg md:text-3xl font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase font-display leading-none">IRIEMAN</h2>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
              <button key={item} onClick={() => handleNav(item.toLowerCase())} className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">{item}</button>
            ))}
          </nav>

          <button className="lg:hidden z-[110] p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* --- 2. LARGE CIRCULAR HERO SECTION --- */}
      <section className="pt-48 md:pt-60 pb-16 flex flex-col items-center">
        <div className="relative group">
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
          
          {/* Circular Image Container */}
          <div className="relative w-64 h-64 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-primary shadow-[0_0_50px_rgba(242,185,13,0.2)]">
            <img 
              src={brandingImg} 
              alt="Irieman Culinary Heritage" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary text-black px-8 py-2 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase whitespace-nowrap shadow-xl">
            Est. 2026
          </div>
        </div>
      </section>

      {/* --- 3. MENU CONTENT --- */}
      <main className="pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-primary text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4">The Selection</h2>
            <h1 className="text-5xl md:text-8xl font-display uppercase tracking-widest leading-tight mb-12">
              Our Menu
            </h1>
            
            <div className="w-full border border-white/5 bg-neutral-900/40 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 backdrop-blur-sm flex flex-col items-center shadow-2xl">
              <p className="text-white/60 leading-relaxed text-lg md:text-xl mb-12 font-light max-w-2xl">
                A curated journey through Caribbean heritage, blending traditional soul with modern refinement. Experience the vibrant flavors of the islands reimagined for the sophisticated palate.
              </p>

              <a 
                href={menuLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-6 bg-primary text-black text-[11px] tracking-[0.5em] uppercase font-bold hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/10 active:scale-95 mb-10"
              >
                Open Full PDF Menu
              </a>
              
              <div className="flex items-center gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/20">
                <span className="h-px w-12 bg-white/10"></span>
                <span>Best viewed on tablet or desktop</span>
                <span className="h-px w-12 bg-white/10"></span>
              </div>
            </div>
        </div>
      </main>

      {/* --- 4. SHARED FOOTER --- */}
      <footer className="py-20 md:py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-2xl md:text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed">Defining the future of luxury Caribbean dining.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-20">
             <ul className="space-y-4 text-[10px] md:text-[11px] uppercase tracking-widest text-white/60">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Menu;