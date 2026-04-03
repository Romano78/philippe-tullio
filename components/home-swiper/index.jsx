'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ProjectSection from './ProjectSection';
import ThumbnailStrip from './ThumbnailStrip';
import { useLenis } from '@/components/lenis-context';

export default function HomeSwiper({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const lenisRef = useLenis();
  const isSnapping = useRef(false);
  const pendingSnap = useRef(false);

  // IntersectionObserver — tracks active section for thumbnail strip
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.5 },
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [projects]);

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (!lenis) return;

    let wheelTimeout = null;

    // Step 1 — user stops the wheel → mark that a snap is wanted
    const onWheel = () => {
      if (isSnapping.current) return;
      pendingSnap.current = false;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        pendingSnap.current = true;
      }, 150);
    };

    // Step 2 — Lenis scroll tick: once pendingSnap is set AND velocity is low, fire the snap
    const onScroll = ({ velocity }) => {
      if (!pendingSnap.current || isSnapping.current) return;
      if (Math.abs(velocity) > 0.2) return;

      pendingSnap.current = false;

      let closest = null;
      let closestDist = Infinity;

      sectionRefs.current.forEach((ref) => {
        if (!ref) return;
        const dist = Math.abs(ref.getBoundingClientRect().top);
        if (dist < closestDist) {
          closestDist = dist;
          closest = ref;
        }
      });

      if (closest && closestDist > 8) {
        isSnapping.current = true;
        lenis.scrollTo(closest, {
          duration: 1,
          onComplete: () => { isSnapping.current = false; },
        });
        setTimeout(() => { isSnapping.current = false; }, 1600);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    lenis.on('scroll', onScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      lenis.off('scroll', onScroll);
      clearTimeout(wheelTimeout);
    };
  }, [lenisRef, projects]);

  const handleThumbClick = useCallback((index) => {
    const lenis = lenisRef?.current;
    const target = sectionRefs.current[index];
    if (!lenis || !target) return;
    isSnapping.current = true;
    lenis.scrollTo(target, {
      duration: 1.2,
      onComplete: () => { isSnapping.current = false; },
    });
  }, [lenisRef]);

  return (
    <>
      <ThumbnailStrip
        projects={projects}
        activeIndex={activeIndex}
        onThumbClick={handleThumbClick}
      />

      <div>
        {projects.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            sectionRef={(el) => {
              sectionRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </>
  );
}
