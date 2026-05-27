const withBundleAnalyzer = require('@next/bundle-analyzer')({
  'enabled': process.env.ANALYZE === 'true'
});
const { withContentlayer } = require('next-contentlayer2');

// You might need to insert additional domains in script-src if you are using external services
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
      'dirs': [ 'app', 'layouts', 'packages/design-system/src/components', 'scripts' ]
    },
    'experimental': {
      'optimizePackageImports': [ '@radix-ui/themes', 'framer-motion', '@tabler/icons-react', '@heroicons/react', 'react-icons' ]
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
        },
        {
          'hostname': '**',
          'protocol': 'http'
        }
      ]
    },
    'pageExtensions': [ 'ts', 'tsx', 'js', 'jsx', 'md', 'mdx' ],
    'reactStrictMode': true,
    'transpilePackages': [ '@gaudi/design-system' ],
    'turbopack': {
      'rules': {
        '*.svg': {
          'as': '*.js',
          'loaders': [ '@svgr/webpack' ]
        }
      }
    },
    'webpack': (config, { dev, isServer }) => {
      config.module.rules.push({
        'test': /\.svg$/,
        'use': [ '@svgr/webpack' ]
      });

      if (!dev && !isServer) {
        config.optimization.splitChunks.chunks = 'all';
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          'common': {
            'chunks': 'all',
            'minChunks': 2,
            'name': 'common',
            'priority': 5,
            'reuseExistingChunk': true
          },
          'vendor': {
            'chunks': 'all',
            'name': 'vendors',
            'priority': 10,
            'test': /[\\/]node_modules[\\/]/
          }
        };
      }

      return config;
    }
  });
};
