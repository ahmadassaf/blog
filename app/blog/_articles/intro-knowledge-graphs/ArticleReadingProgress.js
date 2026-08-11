'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import styles from './KnowledgeGraphsArticle.module.css';

export default function ArticleReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 'damping': 32, 'mass': 0.25, 'stiffness': 180 });

  return (
    <motion.div
      aria-hidden='true'
      className={ styles.readingProgress }
      style={{ 'scaleX': reduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
