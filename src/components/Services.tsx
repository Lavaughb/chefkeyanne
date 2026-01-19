const services = [
  { title: 'Private Dining', desc: 'Intimate multi-course journeys in your own home.', icon: 'local_dining' },
  { title: 'Corporate Events', desc: 'Elevated catering that leaves a lasting impression.', icon: 'business_center' },
  { title: 'Weddings', desc: 'Bespoke menus for your most unforgettable day.', icon: 'favorite' }
];

export const Services = () => {
  return (
    <section id="services" className="w-full py-24 bg-background-dark text-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((s) => (
            <div key={s.title} className="group p-8 border border-white/5 hover:border-primary/50 transition-all duration-500 bg-neutral-900/50">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">{s.icon}</span>
              <h3 className="text-2xl font-display mb-4 tracking-widest">{s.title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};