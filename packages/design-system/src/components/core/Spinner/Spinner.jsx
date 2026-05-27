import { cn } from '@/components/utilities/cn';

const spinnerSizes = {
  'lg': 'size-8 border-2',
  'md': 'size-5 border-2',
  'sm': 'size-4 border-2',
  'xs': 'size-3 border'
};

const Spinner = ({ className, label = 'Loading', size = 'md' }) => (
  <span role='status' aria-label={ label } className={ cn('inline-block animate-spin rounded-full border-current border-r-transparent text-blue-600', spinnerSizes[size], className) } />
);

export default Spinner;
