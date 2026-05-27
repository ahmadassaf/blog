/**
 * FAQ Component
 *
 * @description Collapsible FAQ section with expandable question-answer pairs.
 * Features smooth animations and accessible disclosure patterns using Headless UI.
 * Used within MDX content to present frequently asked questions in an organized format.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { Disclosure } from '@headlessui/react';

import Icon from '@/components/core/Icon';

/**
 * Renders a collapsible FAQ section
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.questions - Array of FAQ objects
 * @param {string} props.questions[].question - The question text
 * @param {string} props.questions[].answer - The answer text
 * @returns {JSX.Element} A div containing the FAQ section with expandable items
 *
 * @example
 * // In MDX content:
 * <Faq questions={[
 *   { question: "What is React?", answer: "A JavaScript library for building user interfaces." },
 *   { question: "How do I get started?", answer: "Begin by reading the official documentation." }
 * ]} />
 */
const Faq = ({ questions }) => (
  <div className='mx-auto divide-y divide-gray-900/10 my-8'>
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
                      <Icon name='Minus' size='sm' decorative />
                    ) : (
                      <Icon name='Plus' size='sm' decorative />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as='dd' className='mt-2 p-0'>
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
