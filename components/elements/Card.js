import { cn } from '@/components/utils/TailwindUtils';

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

