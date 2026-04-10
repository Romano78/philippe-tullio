'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/config/cubic-beziers';

export default function NavScroll({ children, hideOnScroll = true }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!hideOnScroll) return;

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
  }, [hideOnScroll]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      animate={{ y: hideOnScroll && !visible ? -100 : 0 }}
      transition={{ duration: 0.35, ease: ease.smooth }}
    >
      {children}
    </motion.header>
  );
}
