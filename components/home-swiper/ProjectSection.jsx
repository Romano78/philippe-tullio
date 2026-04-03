'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n + 1).padStart(2, '0');

export default function ProjectSection({
  project,
  index,
  total,
  sectionRef: externalRef,
}) {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const directorRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);

  const setRef = useCallback(
    (el) => {
      sectionRef.current = el;
      if (typeof externalRef === 'function') externalRef(el);
    },
    [externalRef],
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !innerRef.current) return;

      // Set initial hidden state client-side (avoids hydration mismatch)
      gsap.set(titleRef.current, { yPercent: 110 });
      gsap.set([directorRef.current, metaRef.current, ctaRef.current], {
        opacity: 0,
        y: 10,
      });

      // Image cinematic tilt — enter tilted, straighten, exit opposite
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.fromTo(
        innerRef.current,
        { rotation: -7, scale: 1.3, yPercent: -20, opacity: 0.5 },
        { rotation: 0, scale: 1, yPercent: 0, opacity: 1, ease: 'none' },
      ).to(innerRef.current, {
        rotation: 7,
        scale: 1.3,
        yPercent: 20,
        opacity: 0.5,
        ease: 'none',
      });

      // Content reveal — fires as section enters viewport during snap
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      contentTl
        .to(directorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        })
        .to(
          titleRef.current,
          { yPercent: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.25',
        )
        .to(
          metaRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.4',
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3',
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={setRef}
      id={project.id}
      className='relative w-full overflow-hidden'
      style={{ height: '100svh' }}
    >
      {/* Image/Video — receives parallax */}
      <div ref={innerRef} className='absolute inset-0'>
        {project.video ? (
          <video
            src={project.video}
            poster={project.videoPoster ?? project.image}
            autoPlay
            muted
            loop
            playsInline
            className='absolute inset-0 w-full h-full object-cover'
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className='object-cover'
            priority={index === 0}
          />
        )}

        {/* Cinematic gradient */}
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      {/* Content — bound to this section */}
      <div className='absolute bottom-16 left-8 md:left-32 z-10 max-w-[46rem] '>
        {/* Director */}
        <p
          ref={directorRef}
          className='font-meta text-sm tracking-widest uppercase text-white/60 mb-3'
        >
          Un film de Tullio Philippe
        </p>

        {/* Title slide container */}
        <div className='overflow-hidden mb-6'>
          <h1
            ref={titleRef}
            className='font-display text-7xl md:text-9xl uppercase text-white leading-none'
          >
            {project.title}
          </h1>
        </div>

        {/* Brand — category — year */}
        <p
          ref={metaRef}
          className='font-meta text-xs tracking-widest uppercase text-white/40 mb-8'
        >
          {project.brand} — {project.category} — {project.year}
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Link
            href={`/work/${project.slug}`}
            className='inline-flex items-center gap-3 px-6 py-3 rounded-full font-meta text-xs tracking-widest uppercase text-white/80 border border-border transition-colors hover:bg-white/10 hover:text-white'
          >
            Watch Project
            <span className='text-accent'>→</span>
          </Link>
        </div>
      </div>

      {/* Project counter — bottom right */}
      <div className='absolute bottom-16 right-8 md:right-12 z-10'>
        <p className='font-meta text-xs tracking-widest text-white/30'>
          <span className='text-white/70'>{pad(index)}</span>
          {' / '}
          {pad(total - 1)}
        </p>
      </div>
    </section>
  );
}
