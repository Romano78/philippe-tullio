'use client';

/**
 * LinkCta — nav-style underline link, works as <a> or <button>
 * Props: href | onClick | icon (JSX, right side) | children | className
 */
export default function LinkCta({ href, onClick, icon, children, className = '' }) {
  const base = `relative inline-flex items-center gap-1.5 cursor-pointer font-meta text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 group ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className='shrink-0'>{icon}</span>}
      <span className='absolute -bottom-1 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out' />
    </>
  );

  if (href) {
    return <a href={href} className={base}>{content}</a>;
  }

  return <button type='button' onClick={onClick} className={base}>{content}</button>;
}
