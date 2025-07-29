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

// External imports
import Link from 'next/link';

/**
 * Pill component for displaying tags or labels
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Text content to display in the pill
 * @param {string} [props.link] - Optional URL to make pill clickable
 * @param {string} [props.color] - Tailwind color name for background (e.g., 'blue', 'red')
 * @returns {JSX.Element} Pill component as link or span
 *
 * @example
 * <Pill text="JavaScript" color="blue" link="/tags/javascript" />
 * <Pill text="Featured" color="green" />
 */
const Pill = ({ text, link, color }) => {
  if (link) return (
    <Link href={ link } className={ `text-xs my-1 mr-1 inline-flex items-center rounded-xs bg-${color}-600 px-2.5 py-0.5 hover:cursor-pointer hover:opacity-60 uppercase text-white ` }>
      {text}
    </Link>
  );

  return (
    <span className={ `text-xs my-1 mr-1 inline-flex items-center rounded-xs bg-${color}-600 px-2.5 py-0.5 uppercase text-white ` }>
      {text}
    </span>
  );

};

export default Pill;
