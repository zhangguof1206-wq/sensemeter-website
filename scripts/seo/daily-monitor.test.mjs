import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { monitoredPaths, runLiveSeoAudit } from '../lib/live-seo-audit.mjs';

test('daily coverage includes existing inquiry and climate chamber pages in both languages', () => {
  for (const path of ['/contact', '/en/contact', '/applications/climate-chamber-humidity', '/en/applications/climate-chamber-humidity', '/products/hmp3-hmpx']) {
    assert.ok(monitoredPaths.includes(path), `Missing ${path}`);
  }
  assert.equal(new Set(monitoredPaths).size, monitoredPaths.length);
  assert.ok(!monitoredPaths.some(path => /privacy|consent|cookie|thank-you/.test(path)));
});

test('an empty audit scope cannot be reported as successful', async () => {
  await assert.rejects(runLiveSeoAudit({ routes: [], fetchImpl: async () => new Response('') }), /No pages/);
});

test('exhausted network retries create a failed report, not a healthy zero', async () => {
  const report = await runLiveSeoAudit({
    routes: ['/'], retryDelayMs: 0,
    fetchImpl: async () => { throw new Error('network unavailable'); },
  });
  assert.equal(report.passed, false);
  assert.equal(report.pages[0].status, 0);
  assert.equal(report.pages[0].issues[0].code, 'FETCH_ERROR');
  assert.ok(report.siteIssues.length > 0);
});

test('daily and weekly jobs are separated; manual full scans are explicit', async () => {
  const workflow = await readFile(new URL('../../.github/workflows/live-seo-monitor.yml', import.meta.url), 'utf8');
  assert.match(workflow, /cron: "15 1 \* \* \*"/);
  assert.match(workflow, /cron: "15 2 \* \* 1"/);
  assert.match(workflow, /full_audit:[\s\S]*?type: boolean[\s\S]*?default: false/);
  assert.match(workflow, /open-source-audits:[\s\S]*?if:.*github\.event\.schedule == '15 2 \* \* 1'.*inputs\.full_audit/);
  assert.match(workflow, /--output-json artifacts\/live-seo-report\.json/);
  assert.match(workflow, /if-no-files-found: error/);
});

test('both report formats preserve dates, coverage and failed page evidence', async () => {
  const { writeAuditReports } = await import('../lib/live-seo-report-files.mjs');
  const directory = await mkdtemp(join(tmpdir(), 'sensemeter-report-'));
  const report = {
    checkedAt: '2026-10-09T06:31:00.000Z', baseUrl: 'https://sensemeter.ru',
    passed: false, robotsPassed: true, sitemapPassed: true, siteIssues: [],
    pages: [{ path: '/products/mdm300', status: 200,
      issues: [{ code: 'NOINDEX', message: 'Page is marked noindex.' }], warnings: [],
      signals: { robots: 'noindex' } }],
  };
  try {
    const markdownPath = join(directory, 'nested/report.md');
    const jsonPath = join(directory, 'nested/report.json');
    await writeAuditReports(report, { markdownPath, jsonPath });
    const saved = JSON.parse(await readFile(jsonPath, 'utf8'));
    assert.deepEqual(saved, report);
    assert.match(await readFile(markdownPath, 'utf8'), /Result: FAIL/);
    assert.match(await readFile(markdownPath, 'utf8'), /NOINDEX/);
    await assert.rejects(writeAuditReports(report, { markdownPath, jsonPath: markdownPath }), /different paths/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
