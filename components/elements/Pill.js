/**
 * Pill Component
 *
 * @description Small badge-like component for displaying tags or labels.
 * Can be rendered as a clickable link or static text with customizable colors
 * and hover effects.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Link from 'next/link';

/**
 * Color mappings for pills to ensure proper Tailwind purging
 */
const colorClasses = {
  'amber': 'bg-amber-600',
  'blue': 'bg-blue-600',
  'cyan': 'bg-cyan-600',
  'emerald': 'bg-emerald-600',
  'fuchsia': 'bg-fuchsia-600',
  'gray': 'bg-gray-600',
  'green': 'bg-green-600',
  'indigo': 'bg-indigo-600',
  'lime': 'bg-lime-600',
  'orange': 'bg-orange-600',
  'pink': 'bg-pink-600',
  'purple': 'bg-purple-600',
  'red': 'bg-red-600',
  'rose': 'bg-rose-600',
  'teal': 'bg-teal-600',
  'violet': 'bg-violet-600',
  'yellow': 'bg-yellow-600'
};

/**
 * Pill component for displaying tags or labels
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Text content to display in the pill
 * @param {string} [props.link] - Optional URL to make pill clickable
 * @param {string} [props.color='blue'] - Color name for background (must be in colorClasses)
 * @returns {JSX.Element} Pill component as link or span
 *
 * @example
 * <Pill text="JavaScript" color="blue" link="/tags/javascript" />
 * <Pill text="Featured" color="green" />
 */
const Pill = ({ text, link, color = 'blue' }) => {
  const baseClasses = 'text-xs sm:text-sm my-1 mr-1 inline-flex items-center rounded-sm px-2.5 py-0.5 uppercase text-white font-medium transition-opacity duration-200';
  const colorClass = colorClasses[color] || colorClasses.blue;
  const hoverClasses = link ? 'hover:opacity-70 cursor-pointer' : '';

  const className = `${baseClasses} ${colorClass} ${hoverClasses}`.trim();

  if (link) return (
    <Link href={ link } className={ className }>
      {text}
    </Link>
  );

  return (
    <span className={ className }>
      {text}
    </span>
  );
};

export default Pill;
