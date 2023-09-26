const AnalyticsMetadata = {
  'analytics': {
    'googleAnalyticsId': '',
    'plausibleDataDomain': '',
    'posthogAnalyticsId': '',
    'simpleAnalytics': false,
    'umamiWebsiteId': process.env.UMAMI_WEBSITE_ID || ''
  }
};

module.exports = AnalyticsMetadata;
