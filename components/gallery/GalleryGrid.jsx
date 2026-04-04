'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_SIZE = 24;

function altFromUrl(url, index) {
  try {
    const path = decodeURIComponent(new URL(url).pathname);
    const afterUpload = path.split('/upload/')[1] ?? '';
    // Strip transformations (e.g. f_auto,q_auto/)
    const publicId = afterUpload.replace(/^[^/]+\//, '');
    const parts = publicId.replace(/\.[^.]+$/, '').split('/');
    // e.g. ['work', 'jaya', 'work', 'gallery', '01_bts']
    const slug = parts[1] ?? '';
    const filename = (parts[parts.length - 1] ?? '').replace(/[_-]/g, ' ').replace(/^\d+\s*/, '').trim();
    const label = slug ? `${slug.charAt(0).toUpperCase()}${slug.slice(1)}` : `Image ${index + 1}`;
    return filename ? `${label} — ${filename}` : `${label} — behind the scenes ${index + 1}`;
  } catch {
    return `Behind the scenes — ${index + 1}`;
  }
}

export default function GalleryGrid({ images }) {
  const t = useTranslations('galleryPage');
  const [count, setCount] = useState(PAGE_SIZE);
  const prevCount = useRef(PAGE_SIZE);
  const heading = t('heading').split('\n');

  const visible = images.slice(0, count);
  const hasMore = count < images.length;

  const loadMore = () => {
    prevCount.current = count;
    setCount((c) => c + PAGE_SIZE);
  };

  return (
    <section className="site-px pt-24 md:pt-36 pb-16 md:pb-24">
      <div className="site-max">

        {/* Overline + count */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30">
            {t('overline')}
          </p>
          {images.length > 0 && (
            <p className="font-meta text-xs tracking-widest uppercase text-white/20">
              {Math.min(count, images.length)} / {images.length}
            </p>
          )}
        </div>

        {/* Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-white leading-none mb-16 md:mb-24">
          {heading.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        {/* Empty state */}
        {images.length === 0 ? (
          <p className="font-meta text-xs tracking-widest uppercase text-white/20">
            {t('empty')}
          </p>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {visible.map((src, i) => {
                const isNew = i >= prevCount.current;
                return (
                  <motion.div
                    key={src}
                    className="break-inside-avoid overflow-hidden group"
                    initial={isNew ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: isNew ? (i - prevCount.current) * 0.04 : 0 }}
                  >
                    <img
                      src={src}
                      alt={altFromUrl(src, i)}
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={i < 6 ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-16 md:mt-24 mb-4">
                <button
                  onClick={loadMore}
                  className="font-meta text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300 px-8 py-3 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {t('loadMore')} — {images.length - count}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
