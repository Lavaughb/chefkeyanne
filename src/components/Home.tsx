import React, { useState, useEffect, useCallback } from 'react';

const heroImages = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2560&auto=format&fit=crop"
];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoized navigation functions to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  // Auto-rotate every 8 seconds (slightly longer to let users appreciate manual control)
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-svh w-full flex flex-col bg-background-dark text-white antialiased overflow-hidden">
      
      {/* 1. BACKGROUND LAYER - SLIDER LOGIC */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Map through images for smooth cross-fading */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index}`}
              className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-linear ${
                index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/20 to-background-dark z-20"></div>
      </div>

      {/* 2. MANUAL CONTROLS (ARROWS) */}
      <div className="absolute inset-0 z-40 flex items-center justify-between px-4 md:px-10 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto p-2 rounded-full border border-white/10 bg-black/10 hover:bg-primary hover:text-black transition-all group"
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto p-2 rounded-full border border-white/10 bg-black/10 hover:bg-primary hover:text-black transition-all group"
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
        </button>
      </div>

      {/* 3. NAVIGATION (STICKY) */}
      <header className="fixed top-0 left-0 z-50 w-full px-8 py-6 md:px-16 bg-background-dark/40 backdrop-blur-md border-b border-white/5">
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="material-symbols-outlined text-primary text-4xl">restaurant</span>
            <h2 className="text-white text-2xl font-bold tracking-[0.4em] uppercase hidden md:block font-display">Chef Keyanne</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-12">
            {['About', 'Services', 'Gallery', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-primary transition-all">{item}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* 4. MAIN HERO CONTENT */}
      <main className="relative z-30 h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-full max-w-none space-y-8 animate-in fade-in zoom-in duration-1000">
          <p className="text-primary text-sm md:text-lg tracking-[0.6em] uppercase font-light">IrieMan Culinary Experiences</p>
          <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-thin tracking-[0.2em] leading-none font-display drop-shadow-2xl">
            CHEF <br className="hidden md:block" /> KEYANNE
          </h1>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <button onClick={() => scrollToSection('contact')} className="w-full md:w-auto px-12 py-4 bg-primary text-background-dark uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-all shadow-2xl">Book a Tasting</button>
          </div>
        </div>
      </main>

      {/* 5. INDICATOR DOTS */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;