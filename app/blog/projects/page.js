'use client';

import { useState } from 'react';
import { allProjects } from 'contentlayer/generated';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import GithubMeta from '@/components/elements/GithubMeta';
import { cn } from '@/components/utils/TailwindUtils';

export default function Projects({ className }) {
  const [ hoveredIndex, setHoveredIndex ] = useState(null);

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Projects
          </h1>
        </div>
        <div>
          <div className={ cn('grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10', className) }>
            {allProjects.map((project, idx) => (
              <Link
                href={ `/blog/${project.externalLink}` }
                key={ project?.externalLink }
                className='relative group  block p-2 h-full w-full'
                onMouseEnter={ () => setHoveredIndex(idx) }
                onMouseLeave={ () => setHoveredIndex(null) }
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className='absolute inset-0 h-full w-full bg-gray-200 dark:bg-white/[0.8] block  rounded-3xl'
                      layoutId='hoverBackground'
                      initial={{ 'opacity': 0 }}
                      animate={{ 'opacity': 1, 'transition': { 'duration': 0.15 } }}
                      exit={{ 'opacity': 0, 'transition': { 'delay': 0.2, 'duration': 0.15 } }}
                    />
                  )}
                </AnimatePresence>
                <Card>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.subtitle}</CardDescription>
                  { project.meta && <GithubMeta meta={ project.meta }/> }
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const Card = ({ className, children }) => (
  <div
    className={ cn(
      'rounded-2xl h-full w-full p-2 overflow-hidden bg-white border dark:bg-black border-grey-400 dark:border-white/[0.2] group-hover:border-grey-700 relative z-20', className
    ) }
  >
    <div className='relative z-50'>
      <div className='p-2'>{children}</div>
    </div>
  </div>
);
export const CardTitle = ({ className, children }) => (
  <h4 className={ cn('text-black dark:text-white font-bold tracking-wide mt-4', className) }>
    {children}
  </h4>
);
export const CardDescription = ({ className, children }) => (
  <p
    className={ cn(
      'mt-8 text-black dark:text-white tracking-wide leading-relaxed text-sm', className
    ) }
  >
    {children}
  </p>
);
