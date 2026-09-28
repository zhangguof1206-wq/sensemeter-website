export const monitoredPaths = [
  "/",
  "/en",
  "/catalog",
  "/en/catalog",
  "/applications/compressed-air-dew-point",
  "/en/applications/compressed-air-dew-point",
  "/applications/natural-gas-moisture-monitoring",
  "/en/applications/natural-gas-moisture-monitoring",
  "/applications/industrial-humidity-monitoring",
  "/en/applications/industrial-humidity-monitoring",
  "/applications/glove-box-oxygen-analysis",
  "/en/applications/glove-box-oxygen-analysis",
  "/products/mdm300",
  "/en/products/mdm300",
  "/en/products/hmp3-hmpx",
  "/en/products/gpr-1500"
];

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of tag.matchAll(pattern)) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<")) continue;
    attributes[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attributes;
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || [];
}

function findTagByAttribute(html, tagName, attribute, expectedValue) {
  return getTags(html, tagName)
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes[attribute]?.toLowerCase() === expectedValue.toLowerCase());
}

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\/+$/, "");
}

function absoluteUrl(baseUrl, path) {
  return new URL(path, `${normalizeBaseUrl(baseUrl)}/`).toString();
}

function comparableUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return value;
  }
}

function textContent(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function issue(code, message) {
  return { code, message };
}

export function auditHtmlPage({ baseUrl, path, status, html }) {
  const issues = [];
  const warnings = [];
  const expectedCanonical = absoluteUrl(baseUrl, path);
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = textContent(titleMatch?.[1]);
  const description = findTagByAttribute(html, "meta", "name", "description")?.content?.trim() || "";
  const robots = findTagByAttribute(html, "meta", "name", "robots")?.content?.toLowerCase() || "";
  const canonical = getTags(html, "link")
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes.rel?.toLowerCase().split(/\s+/).includes("canonical"))?.href || "";
  const alternates = new Map(
    getTags(html, "link")
      .map((tag) => parseAttributes(tag))
      .filter((attributes) => attributes.rel?.toLowerCase().split(/\s+/).includes("alternate") && attributes.hreflang)
      .map((attributes) => [attributes.hreflang.toLowerCase(), attributes.href || ""])
  );
  const h1Count = getTags(html, "h1").length;

  if (status !== 200) issues.push(issue("HTTP_STATUS", `Expected HTTP 200, received ${status}.`));
  if (!title) issues.push(issue("TITLE_MISSING", "Page title is missing."));
  if (!description) issues.push(issue("DESCRIPTION_MISSING", "Meta description is missing."));
  if (robots.split(/[,\s]+/).includes("noindex")) issues.push(issue("NOINDEX", "Page is marked noindex."));
  if (!canonical) {
    issues.push(issue("CANONICAL_MISSING", "Canonical URL is missing."));
  } else if (comparableUrl(canonical) !== comparableUrl(expectedCanonical)) {
    issues.push(issue("CANONICAL_MISMATCH", `Canonical is ${canonical}; expected ${expectedCanonical}.`));
  }
  if (h1Count !== 1) issues.push(issue("H1_COUNT", `Expected one H1, found ${h1Count}.`));

  const missingAlternates = ["ru-ru", "en", "x-default"].filter((language) => !alternates.has(language));
  if (missingAlternates.length) {
    issues.push(issue("HREFLANG_MISSING", `Missing hreflang: ${missingAlternates.join(", ")}.`));
  }

  if (title && (title.length < 20 || title.length > 65)) {
    warnings.push(issue("TITLE_LENGTH", `Title length is ${title.length}; review the search snippet.`));
  }
  if (description && (description.length < 70 || description.length > 170)) {
    warnings.push(issue("DESCRIPTION_LENGTH", `Description length is ${description.length}; review the search snippet.`));
  }

  return {
    path,
    status,
    issues,
    warnings,
    signals: { title, description, canonical, robots, h1Count, alternates: Object.fromEntries(alternates) }
  };
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchText(fetchImpl, url, { retries = 2, retryDelayMs = 400 } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        headers: { "User-Agent": "SenseMeter-SEO-Monitor/1.0" },
        redirect: "follow",
        signal: AbortSignal.timeout(20_000)
      });
      if (response.status < 500 || attempt === retries) {
        return { status: response.status, text: await response.text() };
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < retries && retryDelayMs > 0) await wait(retryDelayMs * (attempt + 1));
  }

  return { status: 0, text: "", error: lastError instanceof Error ? lastError.message : String(lastError) };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

export async function runLiveSeoAudit({
  baseUrl = "https://sensemeter.ru",
  routes = monitoredPaths,
  fetchImpl = fetch,
  concurrency = 3,
  retryDelayMs = 400
} = {}) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const robotsUrl = `${normalizedBaseUrl}/robots.txt`;
  const sitemapUrl = `${normalizedBaseUrl}/sitemap.xml`;
  const [robotsResponse, sitemapResponse] = await Promise.all([
    fetchText(fetchImpl, robotsUrl, { retryDelayMs }),
    fetchText(fetchImpl, sitemapUrl, { retryDelayMs })
  ]);
  const siteIssues = [];

  if (robotsResponse.status !== 200) {
    siteIssues.push(issue("ROBOTS_STATUS", `robots.txt returned ${robotsResponse.status}.`));
  } else if (!robotsResponse.text.includes(`Sitemap: ${sitemapUrl}`)) {
    siteIssues.push(issue("ROBOTS_SITEMAP", `robots.txt does not declare ${sitemapUrl}.`));
  }

  if (sitemapResponse.status !== 200) {
    siteIssues.push(issue("SITEMAP_STATUS", `sitemap.xml returned ${sitemapResponse.status}.`));
  } else {
    for (const path of routes) {
      const url = absoluteUrl(normalizedBaseUrl, path);
      if (!sitemapResponse.text.includes(`<loc>${url}</loc>`)) {
        siteIssues.push(issue("SITEMAP_URL_MISSING", `sitemap.xml is missing ${url}.`));
      }
    }
  }

  const pages = await mapWithConcurrency(routes, concurrency, async (path) => {
    const url = absoluteUrl(normalizedBaseUrl, path);
    const response = await fetchText(fetchImpl, url, { retryDelayMs });
    if (response.error) {
      return {
        path,
        status: response.status,
        issues: [issue("FETCH_ERROR", response.error)],
        warnings: [],
        signals: { title: "", description: "", canonical: "", robots: "", h1Count: 0, alternates: {} }
      };
    }
    return auditHtmlPage({ baseUrl: normalizedBaseUrl, path, status: response.status, html: response.text });
  });
  const passed = siteIssues.length === 0 && pages.every((page) => page.issues.length === 0);

  return {
    checkedAt: new Date().toISOString(),
    baseUrl: normalizedBaseUrl,
    robotsPassed: robotsResponse.status === 200 && robotsResponse.text.includes(`Sitemap: ${sitemapUrl}`),
    sitemapPassed: sitemapResponse.status === 200 && !siteIssues.some((entry) => entry.code.startsWith("SITEMAP")),
    siteIssues,
    pages,
    passed
  };
}

function formatEntries(entries) {
  return entries.length ? entries.map((entry) => `${entry.code}: ${entry.message}`).join("<br>") : "-";
}

export function formatMarkdownReport(report) {
  const passedPages = report.pages.filter((page) => page.issues.length === 0).length;
  const warningCount = report.pages.reduce((total, page) => total + page.warnings.length, 0);
  const lines = [
    "# SenseMeter live SEO report",
    "",
    `- Checked: ${report.checkedAt}`,
    `- Site: ${report.baseUrl}`,
    `- Result: ${report.passed ? "PASS" : "FAIL"}`,
    `- Pages: ${passedPages} pages passed / ${report.pages.length} checked`,
    `- Warnings: ${warningCount}`,
    "",
    "## Site checks",
    "",
    `- robots.txt: ${report.robotsPassed ? "pass" : "fail"}`,
    `- sitemap.xml: ${report.sitemapPassed ? "pass" : "fail"}`
  ];

  if (report.siteIssues.length) {
    lines.push("", "## Site issues", "", ...report.siteIssues.map((entry) => `- **${entry.code}**: ${entry.message}`));
  }

  lines.push(
    "",
    "## Monitored pages",
    "",
    "| Page | HTTP | Issues | Warnings |",
    "| --- | ---: | --- | --- |",
    ...report.pages.map((page) => `| ${page.path} | ${page.status} | ${formatEntries(page.issues)} | ${formatEntries(page.warnings)} |`),
    ""
  );

  return lines.join("\n");
}
