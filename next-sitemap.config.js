/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://zlwebster.com",
  generateRobotsTxt: true,   // will auto-generate robots.txt
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 10000,        // effectively disables splitting
  generateIndexSitemap: false, // ensures only one sitemap.xml (no sitemap-0.xml)
};