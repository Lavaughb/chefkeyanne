import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Contact: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            <button onClick={() => navigate('/gallery')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Gallery</button>
            <button onClick={() => navigate('/contact')} className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold underline underline-offset-8 decoration-primary/30 transition-all">Contact</button>
          </nav>
        </div>
      </header>

      {/* --- 2. HEADER --- */}
      <section className="pt-60 pb-20 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest mb-10 leading-tight">
          Inquire
        </h1>
        <p className="text-white/50 text-xl tracking-[0.2em] uppercase font-light">
          Let’s Curate Your Next Culinary Experience
        </p>
      </section>

      {/* --- 3. CONTACT CARD & INFO --- */}
      <section className="pb-40 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Business Card */}
          <div className="lg:w-2/3 bg-neutral-900 border border-white/5 p-10 md:p-20 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <span className="material-symbols-outlined text-9xl text-primary">restaurant</span>
            </div>
            
            <h2 className="text-3xl font-display uppercase tracking-widest mb-8">Business Relations</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-16 font-light max-w-xl">
              For event bookings, private dining requests, or corporate partnerships, please reach out via our official channels. Our team typically responds within 24–48 hours to begin the curation process.
            </p>

            {/* Vertical Stacked Contact Methods */}
            <div className="flex flex-col gap-12">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Email Official</p>
                <a href="mailto:catering@iriemancaribbeancuisine.com" className="text-xl md:text-3xl font-light hover:text-primary transition-colors block break-words lg:break-normal">
                  catering@iriemancaribbeancuisine.com
                </a>
              </div>
              
              <div className="w-12 h-px bg-white/10" />

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Direct Line</p>
                <a href="tel:407-431-2977" className="text-xl md:text-3xl font-light hover:text-primary transition-colors block">
                  +1 (407)-431-2977
                </a>
              </div>
            </div>
          </div>

          {/* Social / Side Info */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-neutral-950 border border-white/5 p-10 rounded-[2rem] flex-1">
              <h3 className="text-xs uppercase tracking-[0.5em] text-white/30 mb-8">Social Connection</h3>
              <p className="text-white/60 mb-8 font-light italic">Follow the artistry and stay updated with recent plates.</p>
              <a 
                href="https://www.instagram.com/chefkeyanne/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group py-4 border-b border-white/10"
              >
                <span className="text-lg uppercase tracking-widest group-hover:text-primary transition-colors">Instagram</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-primary">north_east</span>
              </a>
            </div>

            <div className="bg-primary p-10 rounded-[2rem] text-black shadow-xl shadow-primary/5">
              <h3 className="text-xs uppercase tracking-[0.5em] font-bold mb-4 opacity-70">Availability</h3>
              <p className="text-lg leading-tight font-bold uppercase tracking-wider">
                Now accepting bookings for 2026. 
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. SHARED FOOTER --- */}
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

export default Contact;