import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { formatMarkdownReport } from './live-seo-audit.mjs';

export async function writeAuditReports(report, { markdownPath, jsonPath } = {}) {
  const outputs = [
    markdownPath && { path: resolve(markdownPath), content: `${formatMarkdownReport(report)}\n` },
    jsonPath && { path: resolve(jsonPath), content: `${JSON.stringify(report, null, 2)}\n` },
  ].filter(Boolean);
  if (new Set(outputs.map(output => output.path)).size !== outputs.length) {
    throw new Error('Markdown and JSON reports need different paths.');
  }
  for (const output of outputs) {
    await mkdir(dirname(output.path), { recursive: true });
    await writeFile(output.path, output.content, 'utf8');
  }
  return outputs.map(output => output.path);
}
