'use client';

export default function ProjectGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className='site-px pt-0 pb-16 md:pb-20 lg:pb-[7.5rem] relative z-10'>
      <div className='site-max'>
        <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>
          Behind the scenes
        </p>
        <h2 className='font-display text-4xl md:text-6xl uppercase text-white leading-none mb-12'>
          Galerie
        </h2>

        <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
          {images.map((src, i) => (
            <div key={i} className='break-inside-avoid'>
              <img
                src={src}
                alt=''
                className='w-full object-cover rounded-sm'
                loading='lazy'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
