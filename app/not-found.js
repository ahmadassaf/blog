/**
 * 404 Not Found Page Component
 *
 * @description Custom 404 error page component that displays a user-friendly
 * message when a page is not found, along with navigation back to homepage.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Button, Typography } from '@ahmadassaf/design-system';

/**
 * 404 error page component
 *
 * @returns {JSX.Element} 404 error page with message and navigation
 *
 * @example
 * // Automatically rendered by Next.js for non-existent routes
 * <FourZeroFour />
 */
export default function FourZeroFour() {
  return (
    <>
      <div className='flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <Typography variant='error-title'>
            404
          </Typography>
        </div>
        <div className='max-w-md'>
          <Typography variant='heading-lg' className='mb-4'>
            Sorry we couldn't find this page.
          </Typography>
          <Typography variant='paragraph-md' className='mb-8'>
            But dont worry, you can find plenty of other things on the homepage
          </Typography>
          <Button variant='solid' tone='blue' size='md' href='/'>
            Back to homepage
          </Button>
        </div>
      </div>
    </>
  );
}
