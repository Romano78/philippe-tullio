'use client';

/**
 * PillCta — rounded pill button/link
 * Props: href | onClick | icon (JSX, right side) | children | className
 */
export default function PillCta({ href, onClick, icon, children, className = '' }) {
  const base = `inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-meta text-xs tracking-widest uppercase text-white/70 border border-white/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:text-white hover:border-white/50 hover:bg-white/5 ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className='shrink-0'>{icon}</span>}
    </>
  );

  if (href) {
    return <a href={href} className={base}>{content}</a>;
  }

  return <button type='button' onClick={onClick} className={base}>{content}</button>;
}
