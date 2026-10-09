import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { assetFor, verifyArchive } from './siteone.mjs';
import { validateSiteoneReport, validateUnlighthouseReport } from './report-validation.mjs';

const require = createRequire(import.meta.url);
const { keyPaths, baseUrl, siteoneArgs } = require('../../tools/seo/settings.cjs');

test('only explicit localhost or the production HTTPS origin can be audited', () => {
  assert.equal(baseUrl('http://127.0.0.1:3219/'), 'http://127.0.0.1:3219');
  assert.equal(baseUrl('https://sensemeter.ru'), 'https://sensemeter.ru');
  for (const url of ['https://example.com', 'http://sensemeter.ru', 'https://sensemeter.ru/en', 'https://user:pass@sensemeter.ru', 'https://sensemeter.ru?token=a']) {
    assert.throws(() => baseUrl(url));
  }
});

test('priority audits cover Russian and English commercial pages, not legal pages', () => {
  assert.equal(new Set(keyPaths).size, keyPaths.length);
  for (const slug of ['mdm300', 'hmp3-hmpx']) {
    assert.ok(keyPaths.includes(`/products/${slug}`));
    assert.ok(keyPaths.includes(`/en/products/${slug}`));
  }
  assert.ok(keyPaths.includes('/en/applications/compressed-air-dew-point'));
  assert.ok(!keyPaths.some(path => /privacy|thank-you|consent/.test(path)));
});

test('SiteOne is rate limited, fresh, bounded, and does not upload reports', () => {
  const args = siteoneArgs('http://127.0.0.1:3219', 'artifacts/report');
  assert.ok(args.includes('--workers=1'));
  assert.ok(args.includes('--max-reqs-per-sec=2'));
  assert.ok(args.includes('--max-visited-urls=500'));
  assert.ok(args.includes('--no-cache'));
  assert.ok(!args.some(arg => /upload|mail|allowed-domain/.test(arg)));
});

test('SiteOne archives are pinned and tampered downloads are rejected', () => {
  assert.match(assetFor('win32', 'x64').sha256, /^[0-9a-f]{64}$/);
  assert.match(assetFor('linux', 'x64').sha256, /^[0-9a-f]{64}$/);
  assert.match(assetFor('linux', 'x64').name, /2\.5\.1-linux-x64/);
  assert.throws(() => assetFor('darwin', 'x64'), /Unsupported/);
  assert.throws(() => verifyArchive(Buffer.from('wrong'), '0'.repeat(64)), /SHA256/);
});

test('Lighthouse CI saves privately and blocks indexing regressions', () => {
  const { ci } = require('../../tools/seo/lighthouserc.cjs');
  assert.equal(ci.upload.target, 'filesystem');
  for (const audit of ['is-crawlable', 'document-title', 'meta-description', 'http-status-code']) {
    assert.equal(ci.assert.assertions[audit][0], 'error');
  }
  assert.equal(ci.collect.numberOfRuns, 2);
});

test('Lighthouse identifies its head-only metadata reader to Next.js without disabling mobile emulation', () => {
  const { ci } = require('../../tools/seo/lighthouserc.cjs');
  const { HTML_LIMITED_BOT_UA_RE } = require('next/dist/shared/lib/router/utils/is-bot.js');
  const agent = ci.collect.settings.emulatedUserAgent;
  assert.equal(typeof agent, 'string');
  assert.match(agent, /Android.*Mobile.*Chrome-Lighthouse/);
  assert.ok(HTML_LIMITED_BOT_UA_RE.test(agent));
  assert.notEqual(ci.collect.settings.formFactor, 'desktop');
});

test('code regression triggers include the actual src directory for push and PR', async () => {
  const workflow = await readFile(new URL('../../.github/workflows/seo-regression.yml', import.meta.url), 'utf8');
  const filters = workflow.split('\n').filter(line => /^\s+paths:/.test(line));
  assert.equal(filters.length, 2);
  assert.ok(filters.every(line => line.includes("'src/**'")));
});

test('Unlighthouse uses a supported reporter and includes both languages without sampling', async () => {
  const { default: config } = await import('../../tools/seo/unlighthouse.config.mjs');
  assert.equal(config.ci.reporter, 'jsonExpanded');
  assert.equal(config.puppeteerClusterOptions.maxConcurrency, 1);
  assert.equal(config.scanner.ignoreI18nPages, false);
  assert.equal(config.scanner.dynamicSampling, false);
  assert.deepEqual(config.urls, keyPaths);
});

test('partial or failed Unlighthouse scans cannot be reported as successful', () => {
  const categories = Object.fromEntries(['performance', 'accessibility', 'best-practices', 'seo'].map(key => [key, { score: 0.9 }]));
  validateUnlighthouseReport({ routes: [{ path: '/en/', categories }] }, ['/en']);
  assert.throws(() => validateUnlighthouseReport({ routes: [] }, ['/en']), /missing valid audits/);
  assert.throws(() => validateUnlighthouseReport({ routes: [{ path: '/en', categories: {} }] }, ['/en']), /missing valid audits/);
});

test('SiteOne requires actual results for priority pages and rejects capped scans', () => {
  const base = 'http://127.0.0.1:3219';
  const valid = { stats: { totalUrls: 1 }, results: [{ url: `${base}/`, status: '200' }] };
  validateSiteoneReport(valid, ['/'], base);
  assert.throws(() => validateSiteoneReport(valid, ['/en'], base), /missing or unhealthy/);
  assert.throws(() => validateSiteoneReport({ ...valid, stats: { totalUrls: 500 } }, ['/'], base), /URL limit/);
});
