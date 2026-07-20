/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*', '/studio/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/apply', '/api/'],
      },
    ],
    additionalSitemaps: [],
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/how-it-works'),
    await config.transform(config, '/loan-options'),
    await config.transform(config, '/rates-fees'),
    await config.transform(config, '/faq'),
    await config.transform(config, '/borrower-rights'),
    await config.transform(config, '/apply'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/privacy-policy'),
    await config.transform(config, '/terms-of-use'),
  ],
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/apply': 0.95,
      '/loan-options': 0.9,
      '/rates-fees': 0.85,
      '/how-it-works': 0.8,
      '/faq': 0.8,
      '/borrower-rights': 0.75,
      '/about': 0.7,
      '/contact': 0.7,
      '/blog': 0.75,
      '/privacy-policy': 0.3,
      '/terms-of-use': 0.3,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
