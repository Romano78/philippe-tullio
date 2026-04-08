'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectInfo from '@/components/project/ProjectInfo';
import ProjectVideoPlayer from '@/components/project/ProjectVideoPlayer';
import ProjectGallery from '@/components/project/ProjectGallery';
import StormBackground from '@/components/project/StormBackground';
import Contact from '@/components/contact';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export default function ProjectPageClient({ project }: { project: any }) {
  const locale = useLocale();
  const title = typeof project.title === 'object' ? (project.title[locale] ?? project.title.fr) : project.title;
  const category = typeof project.category === 'object' ? (project.category[locale] ?? project.category.fr) : project.category;

  const [playerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('project-page');
    return () => document.body.classList.remove('project-page');
  }, []);

  return (
    <>
      <StormBackground />

      <ProjectHero title={title} image={project.image} category={category} year={project.year} duration={project.duration} workVideo={project.workVideo || project.videoUrl} onWatch={() => setPlayerOpen(true)} />

      <ProjectInfo project={project} onWatch={() => setPlayerOpen(true)} />

      <ProjectGallery images={project.gallery ?? []} title={title} />

      <Contact />

      <AnimatePresence>
        {playerOpen && (
          <ProjectVideoPlayer
            src={project.videoUrl ?? project.workVideo}
            poster={project.workVideoPoster ?? project.image}
            onClose={() => setPlayerOpen(false)}
          />
        )}
      </AnimatePresence>

      <ScrollProgressButton position='center' />
    </>
  );
}
