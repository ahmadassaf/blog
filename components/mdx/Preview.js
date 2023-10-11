
import Link from '@/components/elements/Link';
import IconGit from '@/static/icons/git/git.svg';

const Preview = ({ link, title }) => (
  <Link href={ link } className='group inline-flex align-center align-middle mr-2 text-gray-800 no-underline'>
    <IconGit className='w-5 h-6 align-middle mr-1 group-hover:fill-blue-600'/>{ title }
  </Link>
);

export default Preview;

