import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});
const allImages = Object.values(imageModules) as string[];

const heroBanners = allImages.filter(p => p.toLowerCase().includes('banner')).sort().slice(0, 3);
const marqueeImages = allImages.slice(0, 10); 
const aboutPortrait = allImages.find(p => p.toLowerCase().includes('test')) || allImages[0];
const logoImg = allImages.find(p => p.toLowerCase().includes('logo')) || "";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroBanners.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroBanners.length]);

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  // };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNav = (item: string) => {
    const path = item.toLowerCase();
    if (path === 'about') {
      scrollToSection('about');
    } else {
      navigate(`/${path}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-background-dark text-white antialiased selection:bg-primary selection:text-black">
      
      {/* --- 1. NAVIGATION --- */}
      <header className="fixed top-0 left-0 z-[100] w-full px-6 py-4 md:px-12 md:py-6 bg-background-dark/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group z-[110]" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500 shadow-xl shadow-black/50">
               <img src={logoImg} alt="Irieman Logo" className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <h2 className="text-white text-lg md:text-3xl font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase font-display leading-none">IRIEMAN</h2>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['About', 'Services', 'Gallery', 'Menu', 'Contact'].map((item) => (
              <button key={item} onClick={() => handleNav(item)} className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all hover:-translate-y-0.5">{item}</button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden z-[110] p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>

          {/* ADDED: Mobile Overlay (Missing in your previous version) */}
          <div className={`fixed top-0 left-0 w-full h-screen bg-background-dark/98 backdrop-blur-3xl transition-all duration-500 z-[105] flex flex-col items-center justify-center gap-10 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}>
             {['About', 'Services', 'Gallery', 'Menu', 'Contact'].map((item, idx) => (
              <button 
                key={item} 
                onClick={() => handleNav(item)}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`text-2xl uppercase tracking-[0.6em] text-white/80 hover:text-primary font-display transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- REST OF YOUR CODE (Hero, Expertise, etc.) --- */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
        {/* ... existing hero code ... */}
        <div className="absolute inset-0 z-0">
          {heroBanners.map((img, index) => (
            <div key={img} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img} className="h-full w-full object-cover scale-105" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-thin tracking-[0.15em] uppercase font-display">IRIEMAN</h1>
          <p className="text-primary tracking-[0.8em] uppercase mt-10 text-xl font-light">Caribbean Cuisine</p>
          <button onClick={() => navigate('/contact')} className="mt-20 px-16 py-6 bg-primary text-black text-[11px] tracking-[0.5em] uppercase font-extrabold hover:bg-white transition-all shadow-2xl active:scale-95">Inquire Now</button>
        </div>
      </section>

      <section id="services" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4">The Mastery</h2>
          <p className="text-4xl md:text-7xl font-display uppercase tracking-widest leading-tight">Our Expertise</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-neutral-900 border border-white/5 p-16 flex flex-col justify-end transition-all hover:border-primary/40 min-h-[500px]">
            <span className="text-primary text-6xl font-display mb-8">01</span>
            <h3 className="text-4xl font-display uppercase tracking-widest mb-6">By The Tray Dining</h3>
            <p className="max-w-lg text-white/50 leading-relaxed text-lg">Intimate, multi-course gastronomic journeys crafted within your private sanctuary.</p>
          </div>
          <div className="md:col-span-4 bg-neutral-950 border border-white/5 p-12 flex flex-col justify-end transition-all hover:border-primary/40 min-h-[500px]">
            <span className="text-primary text-6xl font-display mb-8">02</span>
            <h4 className="text-2xl uppercase tracking-widest mb-6">Premium Catering</h4>
            <p className="text-white/40 leading-relaxed text-sm">Large-scale event logistics met with the soul of island spices.</p>
          </div>
        </div>
      </section>

      <section className="py-12 overflow-hidden border-y border-white/5 bg-black/40">
        <div className="flex w-max animate-marquee gap-6 px-6">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div key={i} className="w-[350px] h-[450px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/5" onClick={() => setSelectedImg(img)}>
              <img src={img} className="w-full h-full object-cover hover:scale-110 transition-all duration-700" alt="Irieman Dish" />
            </div>
          ))}
        </div>
      </section>

      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} className="max-w-full max-h-[80vh] object-contain rounded-lg" alt="Full View" />
        </div>
      )}

      <section id="about" className="py-24 md:py-40 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="relative group mb-20">
            <div className="absolute -inset-6 border border-primary/20 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-3 border border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
            <div className="relative w-64 h-64 md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-4 border-primary shadow-[0_0_60px_rgba(242,185,13,0.15)] bg-neutral-900">
              <img src={aboutPortrait} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms]" alt="Chef Portrait" />
            </div>
          </div>

          <div className="text-center max-w-3xl">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-primary mb-8">The Vision</h2>
            <h3 className="text-4xl md:text-7xl font-display uppercase tracking-widest mb-10 leading-tight">Irieman Cuisine</h3>
            <p className="text-white/60 leading-relaxed text-lg md:text-2xl font-light italic font-serif mb-12">"You do the relaxing, we'll do the cooking."</p>
            <p className="text-white/40 leading-relaxed text-sm md:text-lg font-light mb-12">As a company we aspire to bring a memorable event with a thoughtful curated menu pleasing to you and your guests.</p>
            <div className="w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-sm leading-relaxed">Defining the future of luxury Caribbean dining.</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white/20 mb-8">Navigation</h5>
              <ul className="space-y-4 text-[11px] uppercase tracking-widest text-white/60">
                <li><button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-primary transition-colors uppercase">Home</button></li>
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
      </footer>
    </div>
  );
};

export default Home;