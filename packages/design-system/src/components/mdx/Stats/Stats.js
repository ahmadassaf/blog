/**
 * Stats Component
 *
 * @description Interactive statistics display component with trend indicators.
 * Shows statistical data in a responsive grid with change indicators and visual trend arrows.
 * Used within MDX content to present data metrics, analytics, or performance indicators.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Icon from '@/components/primitives/Icon';

/**
 * Utility function to combine CSS class names
 *
 * @param {...string} classes - CSS class names to combine
 * @returns {string} Combined class names string
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Renders a statistics grid with trend indicators
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.stats - Array of statistic objects
 * @param {string} props.stats[].name - The name/label of the statistic
 * @param {string} props.stats[].stat - The current statistical value
 * @param {string} props.stats[].previousStat - The previous statistical value for comparison
 * @param {string} props.stats[].change - The change amount/percentage
 * @param {('increase'|'decrease')} props.stats[].changeType - Whether the change is positive or negative
 * @param {string} props.text - The title/heading for the statistics section
 * @returns {JSX.Element} A div containing the statistics grid
 *
 * @example
 * // In MDX content:
 * <Stats
 *   text="Monthly Analytics"
 *   stats={[
 *     {
 *       name: 'Total Subscribers',
 *       stat: '71,897',
 *       previousStat: '70,946',
 *       change: '12%',
 *       changeType: 'increase'
 *     },
 *     {
 *       name: 'Avg. Open Rate',
 *       stat: '58.16%',
 *       previousStat: '56.14%',
 *       change: '2.02%',
 *       changeType: 'increase'
 *     }
 *   ]}
 * />
 */
const Stats = ({ stats, text }) => (
  <div>
    <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white'>{ text }</h2>
    <dl className='mt-5 grid grid-cols-1 overflow-hidden md:grid-cols-3'>
      {stats.map((item) => (
        <div key={ item.name } className='py-5 pr-4'>
          <dt className='text-base font-normal text-gray-900 dark:text-white'>{item.name}</dt>
          <dd className='mt-1 flex items-baseline justify-between md:block lg:flex'>
            <div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
              {item.stat}
              <span className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-300'>from {item.previousStat}</span>
            </div>

            <div
              className={ classNames(
                item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
              ) }
            >
              {item.changeType === 'increase' ? (
                <Icon name='ArrowUp' size='md' decorative className='-ml-1 mr-0.5 self-center text-green-500'/>
              ) : (
                <Icon name='ArrowDown' size='md' decorative className='-ml-1 mr-0.5 self-center text-red-500'/>
              )}

              <span className='sr-only'> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Stats;
