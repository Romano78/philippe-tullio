'use client';

export default function ProjectPreview({ video, poster, onWatch }) {
  return (
    <div className='relative w-full rounded-sm overflow-hidden' style={{ aspectRatio: '16/9' }}>
      {/* Media */}
      {video ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 w-full h-full object-cover'
        />
      ) : poster ? (
        <img src={poster} alt='' className='absolute inset-0 w-full h-full object-cover' />
      ) : (
        <div className='absolute inset-0 bg-surface-low' />
      )}

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Centered CTA */}
      {onWatch && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <button
            onClick={onWatch}
            className='group flex flex-col items-center gap-3'
          >
            <div className='flex items-center justify-center w-14 h-14 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 group-hover:border-white/80 group-hover:scale-110'>
              <svg viewBox='0 0 24 24' fill='white' className='w-5 h-5 ml-0.5'>
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
            <span className='font-meta text-xs tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300'>
              Watch full film
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
