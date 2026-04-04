'use client';

import { useState, useEffect } from 'react';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectInfo from '@/components/project/ProjectInfo';
import ProjectVideoPlayer from '@/components/project/ProjectVideoPlayer';
import ProjectGallery from '@/components/project/ProjectGallery';
import StormBackground from '@/components/project/StormBackground';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export default function ProjectPageClient({ project }: { project: any }) {
  const [playerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('project-page');
    return () => document.body.classList.remove('project-page');
  }, []);

  return (
    <>
      <StormBackground />

      <ProjectHero title={project.title} image={project.image} category={project.category} year={project.year} duration={project.duration} workVideo={project.workVideo} onWatch={() => setPlayerOpen(true)} />

      <ProjectInfo project={project} onWatch={() => setPlayerOpen(true)} />

      <ProjectGallery images={project.gallery ?? []} />

      {playerOpen && (
        <ProjectVideoPlayer
          src={project.workVideo}
          poster={project.workVideoPoster ?? project.image}
          onClose={() => setPlayerOpen(false)}
        />
      )}

      <ScrollProgressButton position='center' />
    </>
  );
}
