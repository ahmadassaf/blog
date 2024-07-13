'use client';

import { useState } from 'react';
import { GoRepoForked, GoStar } from 'react-icons/go';
import { allProjects } from 'contentlayer/generated';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import Card from '@/components/elements/Card';
import { cn } from '@/components/utils/TailwindUtils';
import GithubColors from '@/data/meta/githubMetaColors';

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
                      className='absolute inset-0 h-full w-full bg-gradient-to-r from-[#5865d5] to-[#89c6fc] opacity-30 dark:bg-white/[0.8] block rounded-3xl'
                      layoutId='hoverBackground'
                      initial={{ 'opacity': 0 }}
                      animate={{ 'opacity': 1, 'transition': { 'duration': 0.15 } }}
                      exit={{ 'opacity': 0, 'transition': { 'delay': 0.2, 'duration': 0.15 } }}
                    />
                  )}
                </AnimatePresence>
                <Card title={ project.title } subtitle={ project.subtitle } meta={ project.meta } className={ className }>
                  <CardMeta StargazersCount={ project.meta.stargazers_count } ForksCount={ project.meta.forks_count } Language={ project.meta.language } />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const CardMeta = ({ StargazersCount, ForksCount, Language }) => (
  <div className='flex group/meta mt-4'>
    <div className='flex items-center space-x-3 pr-4'>
      <GoStar className='group-hover/meta:stroke-blue-700 dark:outline-white'/>
      <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{StargazersCount}</span>
    </div>
    <div className='flex items-center space-x-3 pr-4'>
      <GoRepoForked className='group-hover/meta:stroke-blue-700'/>
      <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{ForksCount}</span>
    </div>
    <div className='flex items-center space-x-3'>
      <span className={ `rounded inline-block h-3 w-3` } style={{ 'background': `${GithubColors[Language]}` }}></span>
      <span className='text-xs font-medium text-gray-90 dark:text-gray-100 group-hover/meta:text-blue-700'>{Language}</span>
    </div>
  </div>
);
