'use client';

export default function ProjectInfo({ project }) {
  const { title, brand, category, year, duration, description, credits } = project;

  return (
    <section className='relative z-10 px-8 md:px-32 py-16 md:py-20 max-w-5xl'>
      {/* Label */}
      <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>
        {category} — {year}{duration ? ` — ${duration}` : ''}
      </p>

      {/* Title */}
      <h2 className='font-display text-5xl md:text-7xl uppercase text-white leading-none mb-3'>
        {title}
      </h2>
      <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-10'>{brand}</p>

      {/* Description */}
      {description && (
        <p className='font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-16'>
          {description.fr}
        </p>
      )}

      {/* Credits */}
      {credits && credits.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 mb-16'>
          {credits.map((c) => (
            <div key={c.role}>
              <p className='font-meta text-[10px] tracking-widest uppercase text-white/30 mb-1'>
                {c.role}
              </p>
              <p className='font-meta text-sm text-white/80'>{c.name}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
