'use client';

import { motion } from 'framer-motion';

const ease = [0.43, 0.13, 0.23, 0.96];

export function AnimateIn({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateHeading({ children, className, delay = 0 }) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        initial={{ yPercent: 110 }}
        whileInView={{ yPercent: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}
