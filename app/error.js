/**
 * Route Error Boundary
 *
 * @description Client-side error boundary rendered by Next.js when a route
 * segment throws at runtime. Mirrors the 404 page's layout language and offers
 * a retry action alongside a way back to the homepage.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { Button, Typography } from '@gaudi/design-system';

/**
 * Error boundary component for runtime route failures
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The error that was thrown
 * @param {Function} props.reset - Re-renders the route segment
 *
 * @returns {JSX.Element} Error page with retry and homepage navigation
 */
export default function RouteError({ error, reset }) {
  return (
    <div className='flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6'>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <Typography variant='error-title'>
          500
        </Typography>
      </div>
      <div className='max-w-md'>
        <Typography variant='heading-lg' className='mb-4'>
          Something went wrong loading this page.
        </Typography>
        <Typography variant='paragraph-md' className='mb-8'>
          {error?.digest ? `The error has been logged (reference ${error.digest}). ` : ''}
          You can retry, or head back to the homepage.
        </Typography>
        <div className='flex flex-wrap gap-3'>
          <Button variant='solid' tone='blue' size='md' onClick={ () => reset() }>
            Try again
          </Button>
          <Button variant='outline' tone='gray' size='md' href='/'>
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
