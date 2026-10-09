const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const keyPaths = [
  '/', '/en',
  '/applications/compressed-air-dew-point', '/en/applications/compressed-air-dew-point',
  '/products/mdm300', '/en/products/mdm300',
  '/products/hmp3-hmpx', '/en/products/hmp3-hmpx',
  '/contact', '/en/contact',
];

function baseUrl(value = process.env.SEO_TOOLS_BASE_URL || 'http://127.0.0.1:3219') {
  const url = new URL(value);
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if ((!local && url.origin !== 'https://sensemeter.ru') || !['http:', 'https:'].includes(url.protocol)
    || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('Use a localhost origin or https://sensemeter.ru, without credentials or paths.');
  }
  return url.origin;
}

function reportDir(base = baseUrl()) {
  return path.join(root, 'artifacts/seo-tools', base === 'https://sensemeter.ru' ? 'live' : 'local');
}

function siteoneArgs(base, output) {
  return [
    `--url=${base}/`, '--workers=1', '--max-reqs-per-sec=2', '--max-visited-urls=500',
    '--timeout=15', '--memory-limit=512M', '--no-cache', '--http-cache-dir=off',
    '--no-color', '--hide-progress-bar',
    '--disable-all-assets',
    `--output-html-report=${path.join(output, 'siteone.html')}`,
    `--output-json-file=${path.join(output, 'siteone.json')}`,
    `--output-text-file=${path.join(output, 'siteone.txt')}`,
  ];
}

module.exports = { root, keyPaths, baseUrl, reportDir, siteoneArgs };
