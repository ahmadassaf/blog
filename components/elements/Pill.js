import Link from 'next/link';

const Pill = ({ text, link, color }) => (
  <Link href={ link } className={ `font-small max-sm:text-xs my-1 mr-1 inline-flex items-center rounded-sm bg-${color}-600 px-2.5 py-0.5 hover:cursor-pointer hover:opacity-60 text-sm font-medium uppercase text-white ` }>
    {text}
  </Link>
);

export default Pill;
