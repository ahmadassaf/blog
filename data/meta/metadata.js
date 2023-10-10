import AuthorMetadata from './authorMetadata';
import SiteMetadata from './siteMetadata';

const siteMetadata = {
  ...AuthorMetadata,
  ...SiteMetadata
};

module.exports = siteMetadata;
