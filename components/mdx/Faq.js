
'use client';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Disclosure } from '@headlessui/react';

const Faq = ({ questions }) => (
  <div className='mx-auto divide-y divide-gray-900/10'>
    <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white mt-0'>FAQ</h2>
    <dl className='mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white'>
      {questions.map((faq) => (
        <Disclosure as='div' key={ faq.question } className='pt-6'>
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900 dark:text-white'>
                  <span className='text-base font-semibold leading-7'>{faq.question}</span>
                  <span className='ml-6 flex h-7 items-center'>
                    {open ? (
                      <FaMinus className='h-4 w-4' aria-hidden='true' />
                    ) : (
                      <FaPlus className='h-4 w-4' aria-hidden='true' />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                <p className='text-base leading-7 text-gray-600 dark:text-gray-300'>{faq.answer}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  </div>
);

export default Faq;

