import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});

// 1. Get all image paths
const rawImages = Object.values(imageModules) as string[];

// 2. EXCLUDE "Banner1" specifically, then use the rest for the gallery
const allImages = rawImages.filter(path => !path.toLowerCase().includes('banner1'));

// 3. Take a few for the Instagram snapshot (now excluding Banner1)
const instaSnapshots = allImages.slice(0, 4);

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    navigate('/');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-black">
      
      {/* --- 1. SHARED NAV BAR --- */}
      <header className="fixed top-0 left-0 z-50 w-full px-8 py-8 bg-background-dark/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.5em] uppercase font-display leading-none">
              IRIEMAN
            </h2>
          </Link>
          <nav className="hidden md:flex items-center gap-12">
            <button onClick={() => navigate('/')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">About</button>
            <button onClick={() => navigate('/services')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Services</button>
            <button onClick={() => navigate('/gallery')} className="text-[11px] uppercase tracking-[0.4em] text-primary transition-all font-bold">Gallery</button>
            <button onClick={() => navigate('/contact')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Contact</button>
          </nav>
        </div>
      </header>

      {/* --- 2. INTRO --- */}
      <section className="pt-52 pb-24 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-display uppercase tracking-widest mb-12 leading-tight">
          The Collection
        </h1>
        <div className="w-20 h-px bg-primary/40 mx-auto mb-12" />
        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-3xl mx-auto animate-in fade-in duration-1000">
          A curated exploration of <span className="text-white italic font-serif">authentic Caribbean cuisine</span>. 
          Each dish presented in this collection represents our commitment to heritage and modern culinary precision.
        </p>
      </section>

      {/* --- 3. INSTAGRAM SNAPSHOT --- */}
      <section className="pb-32 px-6 max-w-6xl mx-auto">
        <div className="group relative border border-white/10 bg-neutral-950/40 rounded-2xl overflow-hidden p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary p-0.5">
                   <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                      <img src={instaSnapshots[0]} className="w-full h-full object-cover" alt="Chef profile" />
                   </div>
                </div>
                <div>
                   <h3 className="text-lg font-bold tracking-widest">CHEFKEYANNE</h3>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Live from the kitchen</p>
                   </div>
                </div>
             </div>
             <a 
               href="https://www.instagram.com/chefkeyanne/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-6 py-3 border border-primary/30 text-primary text-[10px] uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all"
             >
               Follow Journey
             </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {instaSnapshots.map((img, i) => (
               <div key={i} className="aspect-square bg-neutral-900 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={img} className="w-full h-full object-cover" alt="Instagram Post" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 4. THE PROJECT GALLERY MASONRY --- */}
      <section className="pb-32 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
          {allImages.map((img, index) => {
            const isLarge = index % 7 === 0;
            const isTall = index % 5 === 0 && !isLarge;
            return (
              <div 
                key={img} 
                onClick={() => setSelectedImg(img)}
                className={`group relative overflow-hidden bg-neutral-900 cursor-pointer border border-white/5 
                  ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} 
                  ${isTall ? 'md:row-span-2' : ''}
                `}
              >
                <img 
                  src={img} 
                  alt="Irieman Plate" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                  <span className="text-white text-[10px] uppercase tracking-[0.6em]">View Plate</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- 5. MODAL LIGHTBOX --- */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-10 right-10 text-white/30 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-5xl font-light">close</span>
          </button>
          <img src={selectedImg} className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-500" alt="Full Plate" />
        </div>
      )}

      {/* --- 6. SHARED FOOTER --- */}
      <footer className="py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-sm leading-relaxed">Defining the future of luxury Caribbean dining. From intimate plates to grand-scale excellence.</p>
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
              <h5 className="text-[10px] uppercase tracking-widest text-white/20 mb-8">Social</h5>
              <a 
                href="https://www.instagram.com/chefkeyanne/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-colors block"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-28 text-center text-[10px] uppercase tracking-[0.5em] text-white/10">
          © 2026 Irieman Caribbean Cuisine | Authentic Excellence
        </div>
      </footer>
    </div>
  );
};