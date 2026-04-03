'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollProgressButtonProps {
  className?: string;
  position?: 'left' | 'center' | 'right';
}

export function ScrollProgressButton({
  className,
  position = 'right',
}: ScrollProgressButtonProps) {
  const [scrollProgress,    setScrollProgress]    = useState(0);
  const [displayedPct,      setDisplayedPct]      = useState(0);
  const [isScrolledPast300, setIsScrolledPast300] = useState(false);
  const [isMounted,         setIsMounted]         = useState(false);

  const displayedRef = useRef(0);
  const targetRef    = useRef(0);
  const rafRef       = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop    = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setIsScrolledPast300(scrollTop > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    targetRef.current = Math.round(scrollProgress * 100);
    if (rafRef.current !== null) return;

    const animate = () => {
      const target  = targetRef.current;
      const current = displayedRef.current;
      const delta   = target - current;

      if (Math.abs(delta) < 0.5) {
        const final = target;
        if (Math.round(displayedRef.current) !== final) setDisplayedPct(final);
        displayedRef.current = final;
        rafRef.current = null;
        return;
      }

      const step    = Math.sign(delta) * Math.max(1, Math.abs(delta) * 0.15);
      const next    = current + step;
      const nextInt = Math.round(next);
      const prevInt = Math.round(current);

      displayedRef.current = next;
      if (nextInt !== prevInt) setDisplayedPct(nextInt);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, [scrollProgress]);

  const handleClick = () => {
    window.scrollTo({
      top: isScrolledPast300 ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-700',
        position === 'left'   && 'left-3',
        position === 'center' && 'left-1/2 -translate-x-1/2',
        position === 'right'  && 'right-4',
        !isMounted && 'translate-y-16 scale-75 opacity-0',
        className,
      )}
      style={{
        background: `conic-gradient(#B8FF00 ${scrollProgress * 100}%, rgba(255,255,255,0.1) ${scrollProgress * 100}%)`,
      }}
      aria-label={isScrolledPast300 ? 'Back to top' : 'Scroll to bottom'}
    >
      <span
        className={cn(
          'absolute inset-1 flex flex-col items-center justify-center rounded-full bg-background transition-all duration-700',
          !isMounted && 'scale-0 opacity-0',
        )}
        style={{ transitionDelay: isMounted ? '150ms' : '0ms' }}
      >
        <div
          className="relative h-4 w-4 transition-transform duration-500"
          style={{
            transform: isScrolledPast300 ? 'rotate(0deg)' : 'rotate(180deg)',
            transitionDelay: isMounted ? '300ms' : '0ms',
          }}
        >
          <ArrowUp
            className={cn('h-4 w-4 text-foreground transition-opacity duration-500', !isMounted && 'opacity-0')}
            style={{ transitionDelay: isMounted ? '450ms' : '0ms' }}
          />
        </div>
        <span
          className={cn('text-[10px] font-medium text-foreground transition-all duration-500', !isMounted && 'translate-y-2 opacity-0')}
          style={{ transitionDelay: isMounted ? '600ms' : '0ms' }}
        >
          {displayedPct}%
        </span>
      </span>
    </button>
  );
}
