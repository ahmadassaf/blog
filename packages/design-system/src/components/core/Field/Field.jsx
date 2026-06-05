import { cn } from '@/components/utilities/cn';

export const Field = ({ children, className }) => <div className={ cn('grid gap-2', className) }>{children}</div>;

export const FieldLabel = ({ children, className, htmlFor }) => (
  <label htmlFor={ htmlFor } className={ cn('text-sm font-semibold text-gray-900 dark:text-gray-100', className) }>{children}</label>
);

export const FieldDescription = ({ children, className }) => (
  <p className={ cn('text-sm leading-6 text-gray-500 dark:text-gray-400', className) }>{children}</p>
);

export const FieldError = ({ children, className }) => (
  <p className={ cn('text-sm font-medium text-red-600 dark:text-red-400', className) }>{children}</p>
);

export const FieldInput = ({ className, ...props }) => (
  <input className={ cn('min-h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 shadow-xs placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100', className) } { ...props } />
);

export default Field;
