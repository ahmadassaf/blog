/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { LinkIcon, LinkSlashIcon } from '@heroicons/react/20/solid';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { AnimatePresence,  motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ImageFallback from '@/components/elements/ImageFallback';
import { cn } from '@/components/utils/TailwindUtils';

const Preview = ({ url, title, className, width = 200, height = 125, quality = 50, preview = true }) => {

  const [ data, setData ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(true);
  const [ isOpen, setOpen ] = React.useState(false);
  const [ isMounted, setIsMounted ] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    fetch(`/api/preview?url=${url}`)
      .then((res) => res.json())
      .then((_response) => {
        const response = JSON.parse(_response);

        if (title) response.title = title;

        setLoading(false);
        setData(response);
      });
  }, [ title, url ]);

  const springConfig = { 'damping': 15, 'stiffness': 100 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;

    x.set(offsetFromCenter);
  };

  // At the default state; the preview is not open and show the loader
  if (loading) return <img className='h-4 w-4 inline-flex m-0 mr-2' src='/static/icons/loading.svg' alt='Loading ...'/>;

  // If the URL is not reachable and was a status 404 from the API then show the disabled link icon
  else if (data.status === 404) return (
    <span className='inline-flex items-center align-middle'>
      <LinkSlashIcon className='h-4 w-4 m-0 mr-1' />
      <a href={ url }>{data.title ? data.title.split(':')[0] : url}</a>
    </span>
  );

  if (data.image) {
    data.image = data.image.startsWith('//') ? `https:${data.image}` : data.image;
    if (!data.image.startsWith('http')) data.image = `https://${data.image}`;
  }
  if (data.favicon) {
    data.favicon = data.favicon.startsWith('//') ? `https:${data.favicon}` : data.favicon;
    if (!data.favicon.startsWith('http')) data.favicon = `https://${data.image}`;
  }

  return (
    <>
      {isMounted ? (<span className='hidden'> <Image src={ data.image } width={ width } height={ height } quality={ quality } alt='hidden image' /> </span>) : null}

      <HoverCardPrimitive.Root openDelay={ 50 } closeDelay={ 100 } onOpenChange={ (open) => {
        setOpen(open);
      } } >
        <HoverCardPrimitive.Trigger onMouseMove={ handleMouseMove } className={ cn('text-black dark:text-white', className) } href={ url }>
          <span className='inline-flex items-center'>
            { data.favicon ? <ImageFallback className='h-4 w-4 !m-0 !mr-1' fallback='/static/icons/link.svg' src={ data.favicon } width={ 10 } height={ 10 } alt={ data ? data.title : 'Loading...' } /> : <LinkIcon className='h-4 w-4 m-0 mr-1' />}
            <button className='text-blue-600 text-left!' href={ url }>{data.title ? data.title.split(':')[0] : url}</button>
          </span>
        </HoverCardPrimitive.Trigger>
        { }
        {data.status === 200 && (
          <HoverCardPrimitive.Content className='[transform-origin:var(--radix-hover-card-content-transform-origin)]' side='top' align='center' sideOffset={ 10 }>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ 'opacity': 0, 'scale': 0.6, 'y': 20 }}
                  animate={{ 'opacity': 1, 'scale': 1, 'transition': { 'damping': 20, 'stiffness': 260, 'type': 'spring' }, 'y': 0 }}
                  exit={{ 'opacity': 0, 'scale': 0.6, 'y': 20 }}
                  className='shadow-xl rounded-xl'
                  style={{ 'x': translateX }} >
                  <Link href={ url } className='block p-1 bg-white border-2 border-transparent shadow-sm rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800' style={{ 'fontSize': 0 }} >
                    <Image src={ data.image } width={ width } height={ height } quality={ quality } className='rounded-lg' alt='preview image' />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>)}
      </HoverCardPrimitive.Root>
    </>
  );
};

export default Preview;
