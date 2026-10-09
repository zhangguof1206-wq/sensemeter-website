import settings from './settings.cjs';

const { baseUrl, keyPaths, reportDir } = settings;
export default {
  site: baseUrl(),
  urls: keyPaths,
  cache: false,
  chrome: { useDownloadFallback: false },
  outputPath: `${reportDir()}/unlighthouse`,
  scanner: {
    device: 'mobile', samples: 1, throttle: true,
    crawler: false, sitemap: false, robotsTxt: false,
    ignoreI18nPages: false, dynamicSampling: false, maxRoutes: keyPaths.length,
  },
  puppeteerClusterOptions: { maxConcurrency: 1 },
  puppeteerOptions: {
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  },
  ci: { buildStatic: true, reporter: 'jsonExpanded' },
};
