const path = require('node:path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  'enabled': process.env.ANALYZE === 'true'
});
const { withContentlayer } = require('next-contentlayer2');

const rootDir = process.cwd();

/*
 * You might need to insert additional domains in script-src if you are using external services.
 * 'unsafe-eval' is required: post pages compile MDX client-side via new Function
 * (contentlayer2 / @gaudi mdx runtime); 'unsafe-inline' is required by Next's
 * inline bootstrap scripts (no nonce support without static rendering).
 */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`;

const securityHeaders = [

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    'key': 'Content-Security-Policy',
    'value': ContentSecurityPolicy.replace(/\n/g, '')
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    'key': 'Referrer-Policy',
    'value': 'strict-origin-when-cross-origin'
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    'key': 'X-Frame-Options',
    'value': 'DENY'
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    'key': 'X-Content-Type-Options',
    'value': 'nosniff'
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    'key': 'X-DNS-Prefetch-Control',
    'value': 'on'
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    'key': 'Strict-Transport-Security',
    'value': 'max-age=31536000; includeSubDomains'
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    'key': 'Permissions-Policy',
    'value': 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = () => {
  const plugins = [ withContentlayer, withBundleAnalyzer ];

  return plugins.reduce((acc, next) => next(acc), {
    'eslint': {
      'dirs': [ 'app', 'layouts', 'lib', 'scripts' ]
    },
    'experimental': {
      'optimizePackageImports': [ 'framer-motion', '@heroicons/react', 'react-icons' ]
    },
    async headers() {
      return [
        {
          'headers': securityHeaders,
          'source': '/(.*)'
        }
      ];
    },

    'images': {
      'dangerouslyAllowSVG': true,
      'formats': [ 'image/webp', 'image/avif' ],
      'minimumCacheTTL': 60,
      'remotePatterns': [
        {
          'hostname': '**',
          'protocol': 'https'
        }
      ]
    },

    'pageExtensions': [ 'ts', 'tsx', 'js', 'jsx', 'md', 'mdx' ],

    'reactStrictMode': true,

    // Permanent redirects for slugs that carried typos before being renamed
    async redirects() {
      return [
        {
          'destination': '/blog/category/engineering/gaudi-bar-widget',
          'permanent': true,
          'source': '/blog/category/engineering/guadi-bar-widget'
        },
        {
          'destination': '/blog/category/data/introduction-multi-dimensional-dbs',
          'permanent': true,
          'source': '/blog/category/data/introduction-multi-dimenstional-dbs'
        }
      ];
    },
    'transpilePackages': [ '@gaudi/design-system' ],
    'turbopack': {

      /*
       * Root is the parent workspace so Turbopack can resolve the design
       * system when it is linked from ../design-system during local
       * development. Harmless otherwise (production builds use webpack).
       */
      'root': path.join(rootDir, '..'),
      'rules': {
        '*.svg': {
          'as': '*.js',
          'loaders': [ '@svgr/webpack' ]
        }
      }
    },
    'webpack': (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/app': path.join(rootDir, 'app'),
        '@/data': path.join(rootDir, 'data'),
        '@/layouts': path.join(rootDir, 'layouts'),
        '@/lib': path.join(rootDir, 'lib'),
        '@/public': path.join(rootDir, 'public')
      };
      config.resolve.alias['contentlayer/generated'] = path.join(rootDir, '.contentlayer/generated');

      config.module.rules.push({
        'test': /\.svg$/,
        'use': [ '@svgr/webpack' ]
      });

      /*
       * No custom splitChunks: forcing single named `vendors`/`common` chunks
       * folded every vendor module — including dynamically-imported mermaid,
       * d3, and recharts — into the initial bundle on every route (1.6 MB
       * shared First Load JS). Next's default splitting keeps async imports
       * async and splits per route.
       */

      return config;
    }
  });
};
