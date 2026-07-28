import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const host = "sensemeter.ru";
const canonicalOrigin = "https://sensemeter.ru";
const endpoint = "https://yandex.com/indexnow";
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const confirmProduction = args.has("--confirm-production");
const allYandexUrls = args.has("--all-yandex-urls");
const urlsFileIndex = process.argv.indexOf("--urls-file");
const urlsFile = urlsFileIndex >= 0 ? process.argv[urlsFileIndex + 1] : "";
const key = process.env.INDEXNOW_KEY?.trim() || "";
const keyLocation = process.env.INDEXNOW_KEY_LOCATION?.trim() || `${canonicalOrigin}/${key}.txt`;

function usage(message = "") {
  if (message) console.error(message);
  console.error("Usage: INDEXNOW_KEY=<key> node scripts/indexnow-submit.mjs --dry-run --all-yandex-urls");
  console.error("Usage: INDEXNOW_KEY=<key> node scripts/indexnow-submit.mjs --confirm-production --urls-file changed-urls.txt");
  process.exit(1);
}

function parseUrls(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith(canonicalOrigin));
}

function readUrlList() {
  if (allYandexUrls) {
    const output = execFileSync(process.execPath, ["scripts/list-yandex-urls.mjs"], { encoding: "utf8" });
    return parseUrls(output);
  }

  if (!urlsFile) usage("Provide --all-yandex-urls for a first launch or --urls-file for changed URLs.");
  return parseUrls(readFileSync(urlsFile, "utf8"));
}

function assertCanonicalUrls(urls) {
  if (!urls.length) usage("No canonical URLs were found to submit.");

  const seen = new Set();
  for (const value of urls) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.host !== host) usage(`Non-canonical URL rejected: ${value}`);
    if (url.search || url.hash) usage(`URL with query or fragment rejected: ${value}`);
    if (url.pathname.includes("/thank-you")) usage(`Noindex URL rejected: ${value}`);
    if (seen.has(value)) usage(`Duplicate URL rejected: ${value}`);
    seen.add(value);
  }
}

if (!key) usage("INDEXNOW_KEY is required.");
if (!dryRun && !confirmProduction) usage("Use --dry-run locally, or --confirm-production after the updated site is live.");

const urlList = readUrlList();
assertCanonicalUrls(urlList);

const payload = {
  host,
  key,
  keyLocation,
  urlList
};

if (dryRun) {
  console.log(`IndexNow dry run: ${urlList.length} URL(s) prepared for ${host}.`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload)
});

if (!response.ok) {
  const text = await response.text();
  console.error(`IndexNow submission failed: HTTP ${response.status}`);
  console.error(text);
  process.exit(1);
}

console.log(`IndexNow submission accepted: ${urlList.length} URL(s).`);
