'use client';

import { useState } from 'react';

import Icon from '@/components/core/Icon';
import { cn } from '@/components/utilities/cn';

export const Accordion = ({ children, className, defaultValue, type = 'single', value, onValueChange }) => {
  const [ internalValue, setInternalValue ] = useState(defaultValue || (type === 'multiple' ? [] : undefined));
  const currentValue = value ?? internalValue;

  const setValue = (nextValue) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={ cn('w-full divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950', className) }>
      {typeof children === 'function' ? children({ currentValue, setValue, type }) : children}
    </div>
  );
};

export const AccordionItem = ({ children, className, value }) => (
  <div className={ cn('first:rounded-t-lg last:rounded-b-lg', className) } data-value={ value }>
    {children}
  </div>
);

export const AccordionTrigger = ({ children, className, isOpen, onClick }) => (
  <button
    type='button'
    className={ cn('flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-gray-950 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-white dark:hover:bg-gray-900', className) }
    aria-expanded={ isOpen }
    onClick={ onClick }
  >
    <span>{children}</span>
    <Icon name='ChevronDown' decorative size='sm' className={ cn('transition-transform', isOpen && 'rotate-180') } />
  </button>
);

export const AccordionContent = ({ children, className, isOpen }) => {
  if (!isOpen) return null;

  return <div className={ cn('px-4 pb-4 text-sm leading-6 text-gray-600 dark:text-gray-300', className) }>{children}</div>;
};

export const AccordionGroup = ({ items = [], type = 'single', defaultValue, className }) => (
  <Accordion type={ type } defaultValue={ defaultValue || items[0]?.value } className={ className }>
    {({ currentValue, setValue }) => items.map((item) => {
      const isOpen = type === 'multiple' ? currentValue?.includes(item.value) : currentValue === item.value;
      let nextValue;

      if (type === 'multiple') nextValue = isOpen ? currentValue.filter((entry) => entry !== item.value) : [ ...(currentValue || []), item.value ];
      else nextValue = isOpen ? undefined : item.value;

      return (
        <AccordionItem key={ item.value } value={ item.value }>
          <AccordionTrigger isOpen={ isOpen } onClick={ () => setValue(nextValue) }>{item.title}</AccordionTrigger>
          <AccordionContent isOpen={ isOpen }>{item.content}</AccordionContent>
        </AccordionItem>
      );
    })}
  </Accordion>
);

export default AccordionGroup;
