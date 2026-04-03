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
    let wheelTimeout = null;

    const onWheel = () => {
      clearTimeout(wheelTimeout);
      const lenis = lenisRef?.current;
      if (!lenis || isSnapping.current) return;
      wheelTimeout = setTimeout(() => {
        const lenis = lenisRef?.current;
        if (!lenis || isSnapping.current) return;

        const windowH = window.innerHeight;
        // Use targetScroll (where Lenis is heading) not current position
        const destScroll = lenis.targetScroll ?? lenis.scroll;
        let target = null;

        for (let i = 0; i < sectionRefs.current.length; i++) {
          const ref = sectionRefs.current[i];
          if (!ref) continue;
          // Project where section will be when Lenis finishes
          const absTop = ref.getBoundingClientRect().top + lenis.scroll;
          const projTop = absTop - destScroll;
          if (projTop > 0) continue;

          const next = sectionRefs.current[i + 1];
          if (next) {
            const nextAbsTop = next.getBoundingClientRect().top + lenis.scroll;
            const nextProjTop = nextAbsTop - destScroll;
            if (nextProjTop > 0 && nextProjTop < windowH) {
              // 10% leniency around 50%: advance if next section will be > 50% visible
              target = nextProjTop < windowH * 0.5 ? next : ref;
              break;
            }
          }
          if (Math.abs(projTop) > 16) target = ref;
        }

        if (target) {
          isSnapping.current = true;
          lenis.scrollTo(target, {
            duration: 1,
            onComplete: () => { isSnapping.current = false; },
          });
          setTimeout(() => { isSnapping.current = false; }, 1600);
        }
      }, 500);
    };

    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
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
