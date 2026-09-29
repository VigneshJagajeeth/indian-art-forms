import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const LotusAnimation = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform values for the lotus petals as the user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.8, 0.2, 0]);
  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Lotus SVG path (simplified stylized traditional Indian lotus)
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
      <motion.div 
        style={{ scale, opacity }}
        className="relative flex items-center justify-center opacity-30 mix-blend-multiply"
      >
        <motion.svg 
          style={{ rotate: rotateOuter }}
          width="800" height="800" viewBox="0 0 100 100" 
          className="absolute text-amber-800/10"
        >
          {/* Outer Petals */}
          <path d="M50 0 C70 40, 100 50, 100 50 C100 50, 70 60, 50 100 C30 60, 0 50, 0 50 C0 50, 30 40, 50 0 Z" fill="currentColor"/>
          <path d="M14.6 14.6 C42.9 30.2, 85.4 14.6, 85.4 14.6 C85.4 14.6, 69.8 42.9, 85.4 85.4 C57.1 69.8, 14.6 85.4, 14.6 85.4 C14.6 85.4, 30.2 57.1, 14.6 14.6 Z" fill="currentColor"/>
        </motion.svg>
        
        <motion.svg 
          style={{ rotate: rotateInner }}
          width="600" height="600" viewBox="0 0 100 100" 
          className="absolute text-rose-800/10"
        >
          {/* Inner Petals */}
          <path d="M50 10 C65 45, 90 50, 90 50 C90 50, 65 55, 50 90 C35 55, 10 50, 10 50 C10 50, 35 45, 50 10 Z" fill="currentColor"/>
          <path d="M21.7 21.7 C44.3 34.2, 78.3 21.7, 78.3 21.7 C78.3 21.7, 65.8 44.3, 78.3 78.3 C55.7 65.8, 21.7 78.3, 21.7 78.3 C21.7 78.3, 34.2 55.7, 21.7 21.7 Z" fill="currentColor"/>
        </motion.svg>
        
        <motion.div 
           className="w-32 h-32 rounded-full bg-amber-500/20 blur-3xl absolute"
        />
      </motion.div>
    </div>
  );
};
