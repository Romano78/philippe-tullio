export const DARK_BG = { background: 'rgba(255,255,255,0.04)' };

export function Img({ src, alt, ratio = '4 / 3', eager = false, className = '' }) {
  if (!src) return <div style={{ ...DARK_BG, aspectRatio: ratio }} className={`w-full ${className}`} />;
  return (
    <img src={src} alt={alt} className={`w-full object-cover ${className}`}
      style={{ aspectRatio: ratio }} loading={eager ? 'eager' : 'lazy'} />
  );
}

export function Gallery({ images = [], count = 4, aspect = '16 / 9', rowAspect = '4 / 3' }) {
  const slots = images.length ? images : Array(count).fill(null);
  const [first, ...rest] = slots;
  const restSlots = rest.length ? rest : Array(Math.max(count - 1, 2)).fill(null);
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="overflow-hidden">
        {first
          ? <img src={first} alt="" className="w-full object-cover" style={{ aspectRatio: aspect }} loading="lazy" />
          : <div style={{ ...DARK_BG, aspectRatio: aspect }} className="w-full" />
        }
      </div>
      {restSlots.length > 0 && (
        <div className="grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${restSlots.length}, 1fr)` }}>
          {restSlots.map((src, i) => (
            <div key={i} className="overflow-hidden">
              {src
                ? <img src={src} alt="" className="w-full object-cover" style={{ aspectRatio: rowAspect }} loading="lazy" />
                : <div style={{ ...DARK_BG, aspectRatio: rowAspect }} className="w-full" />
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
