'use client';

export default function ProjectCard({ title, poster, onClick }) {
  if (!onClick) return null;

  return (
    <div className='relative z-10 px-8 md:px-32 py-12'>
      {/* Title */}
      <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>Regarder</p>
      <h2 className='font-display text-4xl md:text-6xl uppercase text-white leading-none mb-10'>
        🍿 Lights out.
      </h2>

      <button
        onClick={onClick}
        className='group relative mx-auto block overflow-hidden rounded-sm cursor-pointer'
        style={{ width: '70%', paddingTop: '39.375%' /* 56.25% of 70% = 16:9 */ }}
      >
        {/* Poster */}
        {poster && (
          <img
            src={poster}
            alt={title}
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
        )}

        {/* Dark overlay */}
        <div className='absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/40' />

        {/* Play button */}
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-5'>
          <div className='flex items-center justify-center w-16 h-16 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 group-hover:border-white/80 group-hover:scale-110'>
            <svg viewBox='0 0 24 24' fill='white' className='w-6 h-6 ml-1'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </div>
          <p className='font-meta text-xs tracking-widest uppercase text-white/60 group-hover:text-white/90 transition-colors duration-300'>
            Regarder le film
          </p>
        </div>
      </button>
    </div>
  );
}
