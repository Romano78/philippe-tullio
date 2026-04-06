'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ease } from '@/config/cubic-beziers';

function toEmbedUrl(src) {
  try {
    const url = new URL(src);
    // YouTube
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      const id = url.hostname.includes('youtu.be')
        ? url.pathname.slice(1)
        : url.searchParams.get('v');
      const start = url.searchParams.get('t')?.replace('s', '') ?? null;
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`;
    }
    // Vimeo
    if (url.hostname.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
  } catch {}
  return null;
}

export default function ProjectVideoPlayer({ src, poster, onClose }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const embedUrl = toEmbedUrl(src);

  useEffect(() => {
    if (!embedUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => { if (!embedUrl) videoRef.current?.pause(); };
  }, [embedUrl]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/95'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: ease.smooth }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <button
        onClick={onClose}
        aria-label='Close video'
        className='absolute top-6 right-6 z-10 p-2 text-white/50 hover:text-white transition-colors duration-200'
      >
        <X size={24} />
      </button>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          className='w-full max-w-6xl max-h-[85vh] aspect-video'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={{ border: 'none' }}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          className='w-full max-w-6xl max-h-[85vh] aspect-video'
          style={{ outline: 'none' }}
        />
      )}
    </motion.div>
  );
}
