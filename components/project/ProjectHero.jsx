'use client';

export default function ProjectHero({ title, image }) {
  if (!image) return null;

  return (
    <div className='relative z-10 w-full block' style={{ aspectRatio: '16/9', maxHeight: '75vh', marginTop: '-80px', display: 'block' }}>
      <img
        src={image}
        alt={title}
        className='absolute inset-0 w-full h-full object-cover'
      />
    </div>
  );
}
