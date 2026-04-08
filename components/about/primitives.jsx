import Image from 'next/image';

export const DARK_BG = { background: 'rgba(255,255,255,0.04)' };

export function Img({ src, alt, ratio = '4 / 3', eager = false, className = '' }) {
  if (!src) return <div style={{ ...DARK_BG, aspectRatio: ratio }} className={`w-full ${className}`} />;
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill className="object-cover" priority={eager} />
    </div>
  );
}

export function Gallery({ images = [], count = 4, aspect = '16 / 9', rowAspect = '4 / 3' }) {
  const slots = images.length ? images : Array(count).fill(null);
  const [first, ...rest] = slots;
  const restSlots = rest.length ? rest : Array(Math.max(count - 1, 2)).fill(null);
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        {first
          ? <Image src={first} alt="" fill className="object-cover" />
          : <div style={{ ...DARK_BG }} className="w-full h-full" />
        }
      </div>
      {restSlots.length > 0 && (
        <div className="grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${restSlots.length}, 1fr)` }}>
          {restSlots.map((src, i) => (
            <div key={i} className="relative overflow-hidden" style={{ aspectRatio: rowAspect }}>
              {src
                ? <Image src={src} alt="" fill className="object-cover" />
                : <div style={{ ...DARK_BG }} className="w-full h-full" />
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionBreak({ label }) {
  return (
    <div className="site-px pt-14 md:pt-24 pb-8 md:pb-12 relative z-10">
      <div className="site-max">
        <p className="font-meta text-xs tracking-widest uppercase text-accent">{label}</p>
      </div>
    </div>
  );
}
