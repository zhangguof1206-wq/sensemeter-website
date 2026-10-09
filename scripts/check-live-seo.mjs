import { formatMarkdownReport, runLiveSeoAudit } from "./lib/live-seo-audit.mjs";
import { writeAuditReports } from "./lib/live-seo-report-files.mjs";

function readArgument(name) {
  const index = process.argv.indexOf(name);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Missing value for ${name}.`);
  return value;
}

const baseUrl = readArgument("--base-url") || process.env.SEO_AUDIT_BASE_URL || "https://sensemeter.ru";
const outputPath = readArgument("--output");
const jsonPath = readArgument("--output-json");

try {
  const report = await runLiveSeoAudit({ baseUrl });
  const markdown = formatMarkdownReport(report);
  console.log(markdown);

  for (const path of await writeAuditReports(report, { markdownPath: outputPath, jsonPath })) {
    console.log(`Report written to ${path}`);
  }

  if (!report.passed) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
}
