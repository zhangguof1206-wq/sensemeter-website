const { baseUrl, keyPaths, reportDir } = require('./settings.cjs');

const base = baseUrl();
const collect = {
  url: keyPaths.filter(url => /products|applications/.test(url)).map(url => base + url),
  numberOfRuns: 2,
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
    // Lighthouse 12 reads head metadata only; Next.js recognizes this bot identity.
    emulatedUserAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
  },
};
if (process.env.CHROME_PATH) collect.chromePath = process.env.CHROME_PATH;
if (process.env.SEO_TOOLS_START_SERVER === '1') {
  if (base === 'https://sensemeter.ru') throw new Error('Cannot start a local server for a live audit.');
  const port = new URL(base).port || '80';
  collect.startServerCommand = `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${port}`;
  collect.startServerReadyPattern = 'Ready';
  collect.startServerReadyTimeout = 60000;
}

module.exports = {
  ci: {
    collect,
    assert: {
      assertions: {
        'is-crawlable': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'http-status-code': ['error', { minScore: 1 }],
        'canonical': ['warn', { minScore: 1 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.65 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
      },
    },
    upload: { target: 'filesystem', outputDir: `${reportDir()}/lighthouse-ci` },
  },
};
