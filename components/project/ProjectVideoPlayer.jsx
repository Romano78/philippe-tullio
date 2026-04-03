'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ProjectVideoPlayer({ src, poster, onClose }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  // Play on open, pause on close
  useEffect(() => {
    videoRef.current?.play();
    return () => videoRef.current?.pause();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/95'
      style={{ animation: 'fadeIn 0.4s ease' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Close */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-10 p-2 text-white/50 hover:text-white transition-colors'
      >
        <X size={24} />
      </button>

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className='w-full max-w-6xl max-h-[85vh] aspect-video'
        style={{ outline: 'none' }}
      />
    </div>
  );
}
