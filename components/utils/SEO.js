import Head from 'next/head';
import { useRouter } from 'next/router';

import siteMetadata from '@/data/meta/metadata';

const CommonSEO = ({ title, description, slug, ogType, canonicalUrl }) => {
  const router = useRouter();
  console.log("canonicalUrl", canonicalUrl );
  console.log("router.asPath", router.asPath );
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={ description } />
      <meta property='og:url' content={ `${siteMetadata.siteUrl}${router.asPath}` } />
      <meta property='og:type' content={ ogType } />
      <meta property='og:site_name' content={ siteMetadata.title } />
      <meta property='og:description' content={ description } />
      <meta property='og:title' content={ title } />
      <meta property='og:image' content={ `/api/og?slug=${slug}` } key={ url } />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={ siteMetadata.twitter } />
      <meta name='twitter:title' content={ title } />
      <meta name='twitter:description' content={ description } />
      <meta name='twitter:image' content={ `/api/og?slug=${slug}` } />
      <link
        rel='canonical'
        href={ canonicalUrl || `${siteMetadata.siteUrl}${router.asPath}` }
      />
    </Head>
  );
};

export const PageSEO = ({ title, description, slug }) => {

  return (
    <CommonSEO
      title={ title }
      description={ description }
      ogType='website'
      ogImage={ `/api/og?slug=${slug}` }
      twImage={ `/api/og?slug=${slug}` }
    />
  );
};

export const TagSEO = ({ title, description, slug }) => {
  const router = useRouter();

  return (
    <>
      <CommonSEO
        title={ title }
        description={ description }
        ogType='website'
        ogImage={ `/api/og?slug=${slug}` }
        twImage={ `/api/og?slug=${slug}` }
      />
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title={ `${description} - RSS feed` }
          href={ `${siteMetadata.siteUrl}${router.asPath}/feed.xml` }
        />
      </Head>
    </>
  );
};

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  slug,
  canonicalUrl
}) => {

  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();

  let authorList;

  if (authorDetails) authorList = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      'name': author.name
    };
  });
  else authorList = {
    '@type': 'Person',
    'name': siteMetadata.author
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'author': authorList,
    'dateModified': modifiedAt,
    'datePublished': publishedAt,
    'description': summary,
    'headline': title,
    'image': `/api/og?slug=${slug}`,
    'mainEntityOfPage': {
      '@id': url,
      '@type': 'WebPage'
    },
    'publisher': {
      '@type': 'Organization',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
      },
      'name': siteMetadata.author
    }
  };

  return (
    <>
      <CommonSEO
        title={ title }
        description={ summary }
        ogType='article'
        ogImage={ `/api/og?slug=${slug}` }
        twImage={ `/api/og?slug=${slug}` }
        canonicalUrl={ canonicalUrl }
      />
      <Head>
        {date && <meta property='article:published_time' content={ publishedAt } />}
        {lastmod && <meta property='article:modified_time' content={ modifiedAt } />}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            '__html': JSON.stringify(structuredData, null, 2)
          }}
        />
      </Head>
    </>
  );
};
