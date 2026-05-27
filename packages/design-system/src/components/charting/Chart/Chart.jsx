import { cn } from '@/components/utilities/cn';

const maxValue = (data) => Math.max(...data.map((item) => item.value), 1);

export const BarChart = ({ ariaLabel = 'Bar chart', className, data = [] }) => {
  const max = maxValue(data);

  return (
    <div role='img' aria-label={ ariaLabel } className={ cn('rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950', className) }>
      <div className='flex h-56 items-end gap-3'>
        {data.map((item) => (
          <div key={ item.label } className='flex min-w-12 flex-1 flex-col items-center gap-2'>
            <div className='flex w-full items-end rounded-t-md bg-blue-50 dark:bg-blue-950' style={{ 'height': '100%' }}>
              <div className='w-full rounded-t-md bg-blue-600' style={{ 'height': `${Math.max(8, (item.value / max) * 100)}%` }} />
            </div>
            <span className='text-xs font-medium text-gray-600 dark:text-gray-300'>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sparkline = ({ ariaLabel = 'Sparkline chart', className, data = [] }) => {
  const max = maxValue(data);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
    const y = 100 - (item.value / max) * 100;

    return `${x},${y}`;
  }).join(' ');

  return (
    <svg role='img' aria-label={ ariaLabel } viewBox='0 0 100 100' className={ cn('h-24 w-full text-blue-600', className) } preserveAspectRatio='none'>
      <polyline fill='none' stroke='currentColor' strokeWidth='4' points={ points } vectorEffect='non-scaling-stroke' />
    </svg>
  );
};

export default BarChart;
