import Link from 'next/link';

const Pill = ({ text, link, color }) => {
  if (link) return (
    <Link href={ link } className={ `text-xs my-1 mr-1 inline-flex items-center rounded-sm bg-${color}-600 px-2.5 py-0.5 hover:cursor-pointer hover:opacity-60 uppercase text-white ` }>
      {text}
    </Link>
  );

  return (
    <span className={ `text-xs my-1 mr-1 inline-flex items-center rounded-sm bg-${color}-600 px-2.5 py-0.5 uppercase text-white ` }>
      {text}
    </span>
  );

};

export default Pill;
