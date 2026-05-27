'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/components/utilities/cn';

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = ({ children, className, sideOffset = 8, ...props }) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      sideOffset={ sideOffset }
      className={ cn('z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-lg outline-none data-[state=open]:animate-in dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200', className) }
      { ...props }
    >
      {children}
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Portal>
);

const HoverCardExample = ({ children, content, trigger }) => (
  <HoverCard>
    <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
    <HoverCardContent>{content || children}</HoverCardContent>
  </HoverCard>
);

export default HoverCardExample;
