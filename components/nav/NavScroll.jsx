'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/config/cubic-beziers';

export default function NavScroll({ children }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 80) {
        setVisible(true);
      } else {
        setVisible(currentY < lastScrollY.current);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: ease.smooth }}
    >
      {children}
    </motion.header>
  );
}
