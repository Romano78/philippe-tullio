'use client';

import { useState, useRef, useEffect } from 'react';
import ProjectSection from './ProjectSection';
import ThumbnailStrip from './ThumbnailStrip';

export default function HomeSwiper({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

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
  }, []);

  const handleThumbClick = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

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
