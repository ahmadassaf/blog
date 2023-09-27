import AuthorMetadata from './authorMetadata';
import CommentsMetadata from './commentsMetadata';
import NewsLetterMetadata from './newsletterMetadata';
import SiteMetadata from './siteMetadata';

const siteMetadata = {
  'comments': CommentsMetadata,
  'newsletter': NewsLetterMetadata,
  ...AuthorMetadata,
  ...SiteMetadata
};

module.exports = siteMetadata;
