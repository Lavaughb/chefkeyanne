import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const serviceList = [
  {
    id: '01',
    title: 'By The Tray Dining',
    subtitle: 'The Signature Experience',
    desc: 'Intimate, multi-course gastronomic journeys crafted within your private sanctuary. Chef Keyanne merges ancestral Caribbean wisdom with contemporary French technique to curate a menu that tells your story.',
    features: ['Custom Menu Curation', 'Wine & Spirit Pairing', 'Full Staffing Option', 'Tablescape Design']
  },
  {
    id: '02',
    title: 'Professional Catering',
    subtitle: 'Large Scale Excellence',
    desc: 'From high-end galas to significant celebrations. We provide full-service catering that maintains the integrity of island spices while meeting the logistical demands of premium events.',
    features: ['Buffet & Plated Options', 'On-site Chef Stations', 'Full Event Logistics', 'Dietary Customization']
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
    title: 'By The Tray',
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
            <button onClick={() => navigate('/services')} className="text-[11px] uppercase tracking-[0.4em] text-primary transition-all font-bold underline underline-offset-8 decoration-primary/30">Services</button>
            <button onClick={() => navigate('/gallery')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Gallery</button>
            <button onClick={() => navigate('/contact')} className="text-[11px] uppercase tracking-[0.4em] text-white/50 hover:text-primary transition-all">Contact</button>
          </nav>
        </div>
      </header>

      {/* --- 2. HEADER --- */}
      <section className="pt-60 pb-32 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-6xl md:text-9xl font-display uppercase tracking-widest mb-12 leading-tight">
          Services
        </h1>
        <div className="w-24 h-px bg-primary/40 mx-auto mb-16" />
        <p className="text-white/70 text-xl md:text-2xl leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
          Authentic Caribbean expertise scaled for any occasion. Whether an intimate dinner for two or a wedding for two hundred, we bring <span className="text-white italic font-serif">excellence to the table</span>.
        </p>
      </section>

      {/* --- 3. EXPANDED SERVICES LIST --- */}
      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto space-y-px bg-white/5 border border-white/5">
          {serviceList.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-background-dark p-10 md:p-20 transition-all duration-700 hover:bg-neutral-900/40"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
                
                {/* ID & Header (Bigger text on the left) */}
                <div className="lg:w-2/5">
                  <span className="text-primary font-display text-5xl mb-6 block opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    {service.id}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-display uppercase tracking-[0.15em] mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-primary tracking-[0.5em] text-xs uppercase font-medium">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description & Features (Larger bullet text) */}
                <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  <div className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                    {service.desc}
                  </div>

                  <div>
                    <ul className="space-y-5">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.2em] text-white/50 group-hover:text-white/90 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
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

      {/* --- 4. CTA SECTION --- */}
      <section className="pb-32 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-neutral-900 border border-white/5 p-16 md:p-24 rounded-[3rem] shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px]" />
          
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-8 relative z-10">Ready to curate your event?</h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto font-light relative z-10">
            Contact us today to discuss your vision and receive a bespoke proposal tailored to your specific requirements.
          </p>
          <button 
            onClick={() => navigate('/gallery')}
            className="relative z-10 px-16 py-6 bg-primary text-black text-xs tracking-[0.5em] uppercase font-bold hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Start Inquiry
          </button>
        </div>
      </section>

      {/* --- 5. SHARED FOOTER --- */}
      <footer className="py-24 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h4 className="text-primary tracking-[0.4em] uppercase font-bold italic mb-6 text-3xl">IRIEMAN</h4>
            <p className="text-white/40 text-sm leading-relaxed font-light">Defining the future of luxury Caribbean dining. From intimate plates to grand-scale excellence.</p>
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
              <a href="https://www.instagram.com/iriemancaribbeancuisine?igsh=MXN0MjY0Z3dieGFtcQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-colors block">Instagram</a>
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