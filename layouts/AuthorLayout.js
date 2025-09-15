/**
 * Author Layout Component
 *
 * @description Layout component for author pages with name, occupation display,
 * and content area. Provides structured layout with typography styling
 * and dark mode support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Author page layout with header and content sections
 *
 * @param {Object} props - Component props
 * @param {Object} props.content - Author content with name and occupation
 * @param {string} props.content.name - Author's full name
 * @param {string} props.content.occupation - Author's occupation/title
 * @param {React.ReactNode} props.children - Author content/biography
 * @returns {JSX.Element} Author layout with header and content
 *
 * @example
 * <AuthorLayout content={{name: "John Doe", occupation: "Developer"}}>
 *   <p>Author biography content</p>
 * </AuthorLayout>
 */
export default function AuthorLayout({ content, children }) {
  const { name, occupation } = content;

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10 md:text-6xl md:leading-14'>{name}</h1>
          <h3 className='text-1xl sm:text-1xl leading-9 tracking-tight text-gray-600 dark:text-gray-100 sm:leading-10 md:text-2xl md:leading-14'>{occupation}</h3>
        </div>
        <div >
          <div className='prose max-w-none pt-8 pb-8 dark:prose-invert xl:col-span-2'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
