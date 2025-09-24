/**
 * Card Component
 *
 * @description Reusable card component with rounded borders, hover effects,
 * and dark mode support. Used for displaying content in a structured layout
 * with title, subtitle, and optional children content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { cn } from '@/components/utils/TailwindUtils';

/**
 * Card component for displaying content in a structured layout
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Card title text
 * @param {string} props.subtitle - Card subtitle/description text
 * @param {Object} [props.meta] - Additional metadata (unused in current implementation)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Optional child content
 * @returns {JSX.Element} Styled card component
 *
 * @example
 * <Card
 *   title="Sample Title"
 *   subtitle="This is a description"
 *   className="custom-spacing"
 * >
 *   <div>Additional content</div>
 * </Card>
 */
const Card = ({ title, subtitle, meta, className, children }) => (
  <div
    className={ cn('rounded-2xl h-full w-full p-2 overflow-hidden bg-white border dark:bg-gray-900 border-grey-400 dark:border-white/[0.2] group-hover:border-grey-700 relative z-20', className) }
  >
    <div className='relative z-50'>
      <div className='p-2'>
        <h4 className={ cn('text-black dark:text-white font-bold tracking-wide mt-4', className) }>
          {title}
        </h4>
        <p className={ cn('mt-2 text-black dark:text-white tracking-wide leading-relaxed text-sm', className) }>
          {subtitle}
        </p>
        { children }
      </div>
    </div>
  </div>
);

export default Card;

