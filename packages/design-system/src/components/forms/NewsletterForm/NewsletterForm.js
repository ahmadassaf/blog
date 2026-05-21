/**
 * Newsletter Form Component
 *
 * @description Newsletter subscription form component that integrates with Buttondown API.
 * Provides email validation, submission handling, and success/error feedback states.
 * Features responsive design with inline form layout and disabled state after subscription.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useRef, useState } from 'react';

import Button from '@/components/primitives/Button';
import { cn } from '@/components/utilities/cn';

/**
 * Newsletter subscription form component
 *
 * @description Renders a newsletter subscription form with email input and submit button.
 * Handles form submission to Buttondown API, manages subscription state, and provides
 * user feedback for success and error cases.
 *
 * @param {Object} props - Component props
 * @param {string} [props.title='Subscribe to the newsletter'] - Form title (currently unused in display)
 *
 * @returns {JSX.Element} Newsletter subscription form
 *
 * @example
 * <NewsletterForm title="Join our newsletter" />
 */
const NewsletterForm = ({ className, classNames = {}, title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef(null);
  const [ error, setError ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ subscribed, setSubscribed ] = useState(false);

  /**
   * Handles newsletter subscription form submission
   *
   * @param {Event} _error - Form submission event
   */
  const subscribe = async(_error) => {
    _error.preventDefault();

    const res = await fetch(`/api/buttondown`, {
      'body': JSON.stringify({
        'email': inputEl.current.value
      }),
      'headers': {
        'Content-Type': 'application/json'
      },
      'method': 'POST'
    });

    const { 'error': responseError } = await res.json();

    if (responseError) {
      setError(true);
      setMessage('Your e-mail address is invalid or you are already subscribed!');

      return;
    }

    inputEl.current.value = '';
    setError(false);
    setSubscribed(true);
    setMessage('Successfully! 🎉 You are now subscribed.');
  };

  return (
    <div className={ cn('mt-8 xl:col-span-2 xl:mt-0', className, classNames.root) }>
      <h3 className={ cn('text-base font-medium text-gray-900 dark:text-white', classNames.title) }>{title}</h3>
      <p className={ cn('mt-4 text-base text-gray-400 md:text-sm', classNames.description) }>
        The latest articles, readings, and resources, sent to your inbox monthly
      </p>
      <form className={ cn('mt-4 sm:flex sm:max-w-md', classNames.form) } onSubmit={ subscribe }>
        <label htmlFor='email-address' className='sr-only'>
          Email address
        </label>
        <input
          autoComplete='email'
          id='email-input'
          name='email'
          placeholder={ subscribed ? "You're subscribed !  🎉" : 'Enter your email' }
          ref={ inputEl }
          required
          type='email'
          disabled={ subscribed }
          aria-invalid={ error || undefined }
          className={ cn('w-full min-w-0 appearance-none rounded-sm border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-xs placeholder-gray-500 focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 md:text-sm', classNames.input) }
        />
        <div className={ cn('mt-3 sm:ml-3 sm:mt-0 sm:shrink-0', classNames.action) }>
          <Button
            type='submit'
            disabled={ subscribed }
            className={ cn('w-full', classNames.button) }
            size='sm'
            variant='solid'
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </Button>
        </div>
      </form>
      {message ? <p className={ cn('mt-3 text-sm', error ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400', classNames.message) }>{message}</p> : null}
    </div>
  );
};

export default NewsletterForm;

/**
 * Blog-specific newsletter form with styled wrapper
 *
 * @description Newsletter form variant with additional styling and background for use within blog content.
 * Wraps the main NewsletterForm component with centered layout and background styling.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Form title to pass to NewsletterForm
 *
 * @returns {JSX.Element} Styled newsletter form for blog context
 *
 * @example
 * <BlogNewsletterForm title="Subscribe for updates" />
 */
export const BlogNewsletterForm = ({ classNames = {}, title }) => (
  <div className={ cn('flex items-center justify-center', classNames.root) }>
    <div className={ cn('bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8', classNames.frame) }>
      <NewsletterForm title={ title } classNames={ classNames.form } />
    </div>
  </div>
);
