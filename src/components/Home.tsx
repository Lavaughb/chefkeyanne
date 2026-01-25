import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * ASSET PIPELINE
 * Dynamically imports all images from your assets folder.
 */
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  import: 'default' 
});
const allImages = Object.values(imageModules) as string[];

// Filter Logic
const heroBanners = allImages.filter(p => p.toLowerCase().includes('banner')).sort().slice(0, 3);
const marqueeImages = allImages.slice(0, 10); 
const aboutPortrait = allImages.find(p => p.toLowerCase().includes('about')) || allImages[0];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroBanners.length);
  }, [heroBanners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background-dark text-white antialiased selection:bg-primary selection:text-black">
      
      {/* --- 1. LUXURY NAV BAR (Large Branding, No Icon) --- */}
      <header className="fixed top-0 left-0 z-50 w-full px-8 py-8 bg-background-dark/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.5em] uppercase font-display leading-none">
              IRIEMAN
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-12">
            {['About', 'Services', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => item === 'Gallery' || item === 'Services' || item === 'Contact'? navigate(`/${item.toLowerCase()}`) : scrollToSection(item.toLowerCase())}
                className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all hover:translate-y-[-1px]"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* --- 2. HERO SECTION WITH PAGINATION --- */}
      <section className="relative h-svh w-full overflow-hidden">
        {heroBanners.map((img, index) => (
          <div key={img} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} className="h-full w-full object-cover object-center scale-105" alt="Banner" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-[11rem] font-thin tracking-[0.25em] uppercase leading-none font-display drop-shadow-2xl animate-in fade-in zoom-in duration-1000">
            IRIEMAN
          </h1>
          <p className="text-primary tracking-[0.8em] uppercase mt-8 text-sm md:text-xl font-light">
            Caribbean Cuisine
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="mt-16 px-14 py-5 bg-primary text-black text-[11px] tracking-[0.5em] uppercase font-bold hover:bg-white transition-all shadow-2xl active:scale-95"
          >
            Inquire Now
          </button>
        </div>

        {/* Manual Navigation Arrows */}
        <div className="absolute inset-0 z-40 flex items-center justify-between px-8 pointer-events-none">
          <button onClick={prevSlide} className="pointer-events-auto p-4 rounded-full border border-white/10 bg-black/30 hover:bg-primary hover:text-black transition-all group backdrop-blur-sm">
            <span className="material-symbols-outlined text-4xl group-hover:scale-110">chevron_left</span>
          </button>
          <button onClick={nextSlide} className="pointer-events-auto p-4 rounded-full border border-white/10 bg-black/30 hover:bg-primary hover:text-black transition-all group backdrop-blur-sm">
            <span className="material-symbols-outlined text-4xl group-hover:scale-110">chevron_right</span>
          </button>
        </div>

        {/* Page Indicators (Dots) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-4">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-700 rounded-full ${i === currentIndex ? 'w-16 bg-primary' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* --- 3. OUR EXPERTISE (Dynamic Bento Layout) --- */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-xs uppercase tracking-[0.6em] text-primary mb-6">The Mastery</h2>
          <p className="text-5xl md:text-7xl font-display uppercase tracking-widest leading-tight">Our Expertise</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 group relative min-h-[500px] overflow-hidden bg-neutral-900 border border-white/5 p-16 flex flex-col justify-end transition-all hover:border-primary/40">
            <span className="text-primary text-6xl font-display mb-8">01</span>
            <h3 className="text-4xl font-display uppercase tracking-widest mb-6">Private Dining</h3>
            <p className="max-w-lg text-white/50 leading-relaxed text-lg group-hover:text-white/80 transition-colors">
              Intimate, multi-course gastronomic journeys crafted within your private sanctuary. Every menu is a unique collaboration between heritage and your personal palate.
            </p>
          </div>

          <div className="md:col-span-4 group relative min-h-[500px] overflow-hidden bg-neutral-950 border border-white/5 p-12 flex flex-col justify-end transition-all hover:border-primary/40">
            <span className="text-primary text-6xl font-display mb-8">02</span>
            <h4 className="text-2xl uppercase tracking-widest mb-6">Premium Catering</h4>
            <p className="text-white/40 leading-relaxed">Large-scale event logistics met with the soul of island spices.</p>
          </div>

          <div className="md:col-span-4 group relative min-h-[500px] overflow-hidden bg-neutral-950 border border-white/5 p-12 flex flex-col justify-end transition-all hover:border-primary/40">
            <span className="text-primary text-6xl font-display mb-8 dream">03</span>
            <h4 className="text-2xl uppercase tracking-widest mb-6">Consulting</h4>
            <p className="text-white/40 leading-relaxed">Menu engineering and operational strategy for luxury brands.</p>
          </div>

          <div className="md:col-span-8 group relative min-h-[500px] overflow-hidden bg-neutral-900 border border-white/5 p-16 flex flex-col justify-end transition-all hover:border-primary/40">
            <span className="text-primary text-6xl font-display mb-8">04</span>
            <h3 className="text-4xl font-display uppercase tracking-widest mb-6">Event Curation</h3>
            <p className="max-w-lg text-white/50 leading-relaxed text-lg group-hover:text-white/80 transition-colors">
              Beyond the plate—we design the atmosphere, the rhythm, and the memories of your signature event.
            </p>
          </div>
        </div>

        {/* Link to Full Services */}
        <div className="mt-24 text-center">
          <Link to="/services" className="inline-block group">
            <span className="text-[12px] uppercase tracking-[0.6em] text-primary group-hover:text-white transition-colors">
              Explore All Services
            </span>
            <div className="h-px w-full bg-primary/30 mt-2 group-hover:bg-white transition-all duration-500" />
          </Link>
        </div>
      </section>

      {/* --- 4. AUTO-SCROLLING MARQUEE --- */}
      <section className="py-12 overflow-hidden border-y border-white/5 bg-black/40">
        <div className="flex w-max animate-marquee gap-6 px-6 hover:pause-marquee">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div 
              key={i} 
              className="w-[350px] h-[450px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/5"
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} className="w-full h-full object-cover transition-all duration-700 hover:scale-110" alt="Irieman Dish" />
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. MODAL / LIGHTBOX --- */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-20" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors focus:outline-none">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <img src={selectedImg} className="max-w-full max-h-full object-contain rounded-lg animate-in zoom-in-95 duration-300 shadow-2xl" alt="Full View" />
        </div>
      )}

      {/* --- 6. ABOUT THE CHEF (Framed & Elegant) --- */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto border border-white/5 bg-neutral-900/20 rounded-[3rem] overflow-hidden p-8 md:p-20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img src={aboutPortrait} className="w-full h-full object-cover" alt="Chef Portrait" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-xs uppercase tracking-[0.5em] text-primary mb-8">The Visionary</h2>
              <h3 className="text-5xl md:text-6xl font-display uppercase tracking-widest mb-10 leading-tight">Chef Keyanne</h3>
              <p className="text-white/60 leading-relaxed text-lg mb-10 font-light">
                Pioneering a new standard for Caribbean dining. Chef Keyanne merges ancestral wisdom with contemporary French technique to create moments of pure culinary artistry.
              </p>
              <div className="w-24 h-px bg-primary/60" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. FOOTER --- */}
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

export default Home;