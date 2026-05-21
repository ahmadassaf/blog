/**
 * Details/FAQ Component
 *
 * @description An interactive disclosure component for displaying expandable FAQ sections or details.
 * Uses Headless UI's Disclosure component to create accessible collapsible content areas with
 * plus/minus icons indicating the open/closed state.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { Disclosure } from '@headlessui/react';

import Icon from '@/components/primitives/Icon';

const Details = ({ title, children, ...rest }) => (
  <div className='mx-auto divide-y divide-gray-900/10 my-8'>
    <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white mt-0'>{title}</h2>
    <dl className='mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white'>

      <Disclosure as='div' key={ title } className='pt-6'>
        {({ open }) => (
          <>
            <dt>
              <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900 dark:text-white'>
                <span className='text-base font-semibold leading-7'>{title}</span>
                <span className='ml-6 flex h-7 items-center'>
                  {open ? (
                    <Icon name='Minus' size='sm' decorative />
                  ) : (
                    <Icon name='Plus' size='sm' decorative />
                  )}
                </span>
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as='dd' className='mt-2 p-0'>
              <div className='text-base leading-7 text-gray-600 dark:text-gray-300' { ...rest }>
                {children}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </dl>
  </div>
);

export default Details;
