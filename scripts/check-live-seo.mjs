import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { formatMarkdownReport, runLiveSeoAudit } from "./lib/live-seo-audit.mjs";

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const baseUrl = readArgument("--base-url") || process.env.SEO_AUDIT_BASE_URL || "https://sensemeter.ru";
const outputPath = readArgument("--output");

try {
  const report = await runLiveSeoAudit({ baseUrl });
  const markdown = formatMarkdownReport(report);
  console.log(markdown);

  if (outputPath) {
    const absoluteOutputPath = resolve(outputPath);
    await mkdir(dirname(absoluteOutputPath), { recursive: true });
    await writeFile(absoluteOutputPath, `${markdown}\n`, "utf8");
    console.log(`Report written to ${absoluteOutputPath}`);
  }

  if (!report.passed) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
}
