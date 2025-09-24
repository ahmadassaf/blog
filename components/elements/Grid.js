/**
 * Grid Components
 *
 * @description Grid layout components for responsive content organization.
 * Includes main Grid container and GridItem components with hover animations
 * and responsive breakpoints.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { cn } from '@/components/utils/TailwindUtils';

/**
 * Main grid container component with responsive layout
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Grid items to display
 * @returns {JSX.Element} Responsive grid container
 *
 * @example
 * <Grid className="custom-gap">
 *   <GridItem title="Item 1" description="Description" />
 * </Grid>
 */
export const Grid = ({ className, children }) => (
  <div
    className={ cn(
      'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto ', className
    ) }
  >
    {children}
  </div>
);

/**
 * Individual grid item component with hover animations
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} props.title - Item title
 * @param {string} props.description - Item description
 * @param {React.ReactNode} [props.header] - Optional header content
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @returns {JSX.Element} Animated grid item
 *
 * @example
 * <GridItem
 *   title="Feature Title"
 *   description="Feature description"
 *   icon={<SomeIcon />}
 *   header={<div>Header content</div>}
 * />
 */
export const GridItem = ({ className, title, description, header, icon }) => (
  <div
    className={ cn(
      'row-span-1 rounded-xl group/grid hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', className
    ) }
  >
    {header}
    <div className='group-hover/grid:translate-x-2 transition duration-200'>
      {icon}
      <div className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2'>
        {title}
      </div>
      <div className='font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300'>
        {description}
      </div>
    </div>
  </div>
);
