export function validateSiteoneReport(report, expectedPaths, base) {
  if (!report.stats?.totalUrls || report.stats.totalUrls >= 500) {
    throw new Error('SiteOne scan is empty or reached its URL limit; review coverage.');
  }
  const results = new Map((report.results || []).map(result => [result.url.replace(/\/$/, ''), result]));
  const missing = expectedPaths.filter(path => {
    const result = results.get(`${base}${path}`.replace(/\/$/, ''));
    return !result || Number(result.status) !== 200;
  });
  if (missing.length) throw new Error(`SiteOne priority pages missing or unhealthy: ${missing.join(', ')}`);
}

export function validateUnlighthouseReport(report, expectedPaths) {
  const normalize = path => path.replace(/\/$/, '') || '/';
  const routes = new Map((report.routes || []).map(route => [normalize(route.path), route]));
  const incomplete = expectedPaths.filter(path => {
    const route = routes.get(normalize(path));
    return !route || ['performance', 'accessibility', 'best-practices', 'seo'].some(category =>
      !Number.isFinite(route.categories?.[category]?.score));
  });
  if (incomplete.length) throw new Error(`Unlighthouse missing valid audits: ${incomplete.join(', ')}`);
}
