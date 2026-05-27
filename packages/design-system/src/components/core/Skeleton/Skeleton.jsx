import { cn } from '@/components/utilities/cn';

const Skeleton = ({ className, ...props }) => (
  <div className={ cn('animate-pulse rounded-md bg-gray-100 dark:bg-gray-800', className) } aria-hidden='true' { ...props } />
);

export default Skeleton;
