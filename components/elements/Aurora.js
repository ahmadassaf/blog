/**
 * Aurora Background Component
 *
 * @description A visually striking background component that creates an animated aurora borealis effect.
 * Features gradient animations, blur effects, and theme-aware styling that adapts to light/dark modes.
 * Used as a decorative background element to enhance the visual appeal of pages.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

import { cn } from '@/components/utils/TailwindUtils';

/**
 * Aurora background component with animated gradient effects
 *
 * @description Creates a full-height container with animated aurora background effects.
 * Features theme-aware gradients, optional radial gradient overlay, and smooth animations.
 * The component automatically adapts its appearance based on the current theme.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.ReactNode} props.children - Content to render over the aurora background
 * @param {boolean} [props.showRadialGradient=true] - Whether to show the radial gradient overlay
 * @param {...Object} props.props - Additional props passed to the container div
 *
 * @returns {JSX.Element} The rendered aurora background component
 *
 * @example
 * <AuroraBackground showRadialGradient={true}>
 *   <h1>Content over aurora background</h1>
 * </AuroraBackground>
 */
const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => (
  <main>
    <div className={ cn('relative flex flex-col min-h-[100vh] items-center justify-center transition-bg', className) }
      { ...props }
    >
      <div className='aurora absolute inset-x-0 top-0 h-[48rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]'>
        <div
          className={ cn(`
                bg-gradient-to-br from-blue-200/90 via-blue-100/80 to-transparent
                dark:from-blue-950/80 dark:via-indigo-950/60 dark:to-transparent
                pointer-events-none
                absolute inset-0
                [mask-image:radial-gradient(ellipse_at_100%_0%,black_18%,transparent_42%)]`) }
        ></div>
        <div
          className='bg-gradient-to-tl from-transparent via-purple-200/30 to-transparent
                dark:from-transparent dark:via-sky-900/30 dark:to-transparent
                pointer-events-none
                absolute inset-0
                [mask-image:radial-gradient(ellipse_at_95%_5%,black_12%,transparent_36%)]'
        ></div>
        <div
          className='bg-gradient-to-br from-transparent via-indigo-200/20 to-transparent
                dark:from-transparent dark:via-violet-950/25 dark:to-transparent
                pointer-events-none
                absolute inset-0
                [mask-image:radial-gradient(ellipse_at_90%_10%,black_12%,transparent_32%)]'
        ></div>
      </div>
      {children}
    </div>
  </main>
);

export default AuroraBackground;
