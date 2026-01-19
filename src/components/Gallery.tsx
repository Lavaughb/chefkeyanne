export const Gallery = () => {
  return (
    <section id="gallery" className="w-full py-20 bg-background-dark">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-[800px]">
        <div className="bg-neutral-800 col-span-2 row-span-2 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Food 1" />
        </div>
        <div className="bg-neutral-800 col-span-2 overflow-hidden">
           <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Food 2" />
        </div>
        <div className="bg-neutral-800 overflow-hidden">
           <img src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Food 3" />
        </div>
        <div className="bg-neutral-800 overflow-hidden">
           <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Food 4" />
        </div>
      </div>
    </section>
  );
};