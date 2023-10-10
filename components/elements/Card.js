import GithubMeta from '@/components/elements/GithubMeta';
import Link from '@/components/elements/Link';

const Card = ({ title, subtitle, href, meta }) => (
  <div className='group border-2 border-gray-200 border-opacity-60 hover:border-[#ddd] dark:border-gray-700 dark:hover:border-blue-700'>
    <Link href={ href }>
      <div className='p-6 pb-2'>
        <h2 className='mb-3 text-xl font-bold leading-8 tracking-tight group-hover:text-blue-700'>{title}</h2>
        <h4 className='group-hover:text-blue-400 text-sm'>{subtitle}</h4>
      </div>
    </Link>

    { meta && <GithubMeta meta={ meta }/> }

  </div>
);

export default Card;
