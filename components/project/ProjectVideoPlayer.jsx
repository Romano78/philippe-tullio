'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectVideoPlayer({ src, poster, onClose }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play();
    return () => videoRef.current?.pause();
  }, []);

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
      transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <button
        onClick={onClose}
        aria-label='Close video'
        className='absolute top-6 right-6 z-10 p-2 text-white/50 hover:text-white transition-colors duration-200'
      >
        <X size={24} />
      </button>

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className='w-full max-w-6xl max-h-[85vh] aspect-video'
        style={{ outline: 'none' }}
      />
    </motion.div>
  );
}
