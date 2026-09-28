# SenseMeter 90-Day Exposure and Inquiry Growth Plan

> **Goal:** Increase qualified Google exposure and turn that exposure into measurable RFQs for SenseMeter without mass-producing low-value pages or using artificial traffic and link schemes.

**Baseline evidence:** Google Search Console comparison for 2026-08-29 through 2026-09-25 showed 13 clicks, 442 impressions, 2.9% CTR, and average position 24. The strongest actionable cluster is compressed-air dew point measurement, followed by model searches such as MDM300 and application searches for natural-gas moisture, glove-box oxygen, and industrial humidity.

**Operating principle:** Release one coherent search-intent cluster, verify indexing and conversion behavior, then expand the next cluster. Keep Russian and English intent separate. Do not create one page per keyword variation.

---

## Phase 0: Establish the production baseline

**Timing:** Day 0-1

- [x] Optimize the English compressed-air dew-point application page around:
  - `compressed air dew point testing`
  - `dew point meter for compressed air`
  - `portable dew point meter for compressed air`
  - `compressed air dew point monitor`
- [x] Add the weekly live SEO monitor and push it to GitHub.
- [ ] Inspect the production checkout and PM2 process before deployment.
- [ ] Back up the current production release, pull the verified GitHub revision, install dependencies, build, and restart only the SenseMeter PM2 process.
- [ ] Verify the deployed commit, HTTP status, RFQ form, canonical, hreflang, robots.txt, and sitemap.xml.
- [ ] Run the GitHub workflow `线上SEO巡检` manually and preserve the report.
- [ ] Inspect `/en/applications/compressed-air-dew-point` in Google Search Console and request indexing once after deployment.

**Release gate:** Production checks must pass before any further keyword copy is released.

## Phase 1: Make inquiries measurable

**Timing:** Day 1-7

- [ ] Submit a real production test RFQ and confirm that the sales mailbox receives it.
- [ ] Confirm the existing Yandex Metrica goals for successful RFQ submission, Telegram clicks, PDF downloads, and product engagement.
- [ ] Obtain a GA4 measurement ID or Google Tag Manager container from the user before adding Google-side conversion measurement.
- [ ] Track these primary Google conversions:
  - Successful RFQ submission.
  - Telegram contact click.
  - Sales email contact click, if a clickable email action is introduced.
- [ ] Track these secondary signals separately:
  - Product datasheet download.
  - Product-page to RFQ click.
  - Meaningful product-page engagement.
- [ ] Create a simple inquiry log containing date, country, requested model/application, source, qualified status, and outcome.

**Measurement gate:** Do not start paid Google Ads until at least one real RFQ conversion path is verified end to end.

## Phase 2: Grow the highest-value organic clusters

**Timing:** Day 8-45

### Cluster A: Compressed-air dew point

- [ ] Leave the newly deployed page stable for 14-28 days.
- [ ] Review query impressions, average position, CTR, landing-page clicks, and RFQs.
- [ ] Improve the title/snippet only if impressions rise but CTR remains weak.
- [ ] Improve technical selection content and internal links only if average position remains outside the top 20.

### Cluster B: MDM300 and portable dew-point instruments

- [ ] Use the MDM300 and MDM300-IS queries already present in Search Console.
- [ ] Improve the existing MDM300 product page instead of creating duplicate keyword pages.
- [ ] Clarify portable use, application fit, selection inputs, datasheet access, and RFQ path using confirmed product facts only.
- [ ] Link the product page and compressed-air/natural-gas application pages in both directions.

### Cluster C: Natural-gas moisture

- [ ] Optimize the existing application page around:
  - `natural gas moisture analyzer`
  - `ppm moisture analyzer for natural gas`
  - `moisture analyzers for natural gas`
- [ ] Add practical selection content for pressure, sample conditioning, range, hazardous-area needs, outputs, and documentation only when supported by product evidence.
- [ ] Strengthen links to the relevant Easidew and MDM300 product pages.

### Cluster D: Secondary industrial applications

- [ ] Optimize the existing glove-box oxygen page around `oxygen analyzer for glovebox applications`.
- [ ] Optimize the industrial-humidity page around `industrial humidity monitoring` and related confirmed Russian queries.
- [ ] Optimize flow-control accessory pages for `gas flow limiter` and `gas flow restrictor` only if the accessories match those search intents.

**Content gate:** Each cluster needs Search Console evidence or confirmed buyer language, accurate product facts, a unique landing page, useful selection guidance, internal links, and a clear RFQ action.

## Phase 3: Increase trust, authority, and GEO readiness

**Timing:** Day 30-75

- [ ] Strengthen visible company identity, contact details, supply origin, service scope, and delivery-responsibility wording.
- [ ] Add verifiable datasheets, calibration/documentation information, and model-to-application relationships.
- [ ] Publish a small number of evidence-rich technical selection guides rather than frequent generic articles.
- [ ] Make key answers easy to quote: short definitions, comparison tables, selection criteria, and clearly sourced technical statements.
- [ ] Seek legitimate mentions from manufacturers, distributors, industry directories, customers, technical partners, and relevant professional communities.
- [ ] Never buy ranking links, automate forum links, or generate large numbers of near-duplicate pages.

## Phase 4: Launch a controlled Google Ads pilot

**Timing:** Day 45-90, only after conversion tracking passes

- [ ] Confirm target countries, sales languages, priority products, monthly budget, and excluded markets with the user.
- [ ] Start with Search campaigns only.
- [ ] Separate ad groups by intent:
  - Compressed-air dew-point meter.
  - Portable dew-point meter / MDM300.
  - Natural-gas moisture analyzer.
  - Glove-box oxygen analyzer.
- [ ] Begin with exact and phrase match for high-intent terms.
- [ ] Add negative keywords from the search-terms report, especially jobs, free, DIY, definition-only, unrelated consumer meters, and unsupported regions or products.
- [ ] Send each ad group to its matching application or product page, never the homepage by default.
- [ ] Optimize against qualified RFQs, not clicks alone.

## Automation and review cadence

- [x] Weekly: GitHub live SEO monitor for 16 priority URLs, robots.txt, and sitemap.xml.
- [ ] Weekly after deployment: review failed monitor runs and fix only confirmed issues.
- [ ] Every 28 days: compare Search Console with the previous 28 days.
- [ ] Monthly: update the keyword-to-page map and choose only one or two clusters for the next cycle.
- [ ] Quarterly: review indexed pages, duplicate intent, backlinks, conversion rate, and inquiry quality.

## Decision rules

- **Position 8-30 with impressions but low CTR:** improve title and description while preserving page intent.
- **Position worse than 30 with relevant impressions:** strengthen content usefulness, internal links, and authority signals.
- **Clicks without RFQs:** improve offer clarity, trust, product fit, and RFQ friction before chasing more traffic.
- **No impressions after indexing:** verify demand and page intent before creating more content.
- **Irrelevant impressions:** narrow copy and, for paid campaigns, add negative keywords.

## Success metrics

### First 30 days

- Priority release is deployed and indexable.
- RFQ delivery and conversion measurement are verified.
- The compressed-air cluster has a clean 28-day post-release baseline.
- No critical live SEO monitor failures remain unresolved.

### Days 31-60

- Target-cluster impressions and clicks improve versus the pre-release baseline.
- At least one priority cluster moves toward the top 20 without sacrificing inquiry relevance.
- MDM300 and natural-gas landing pages are aligned with confirmed search demand.

### Days 61-90

- Qualified organic inquiries have a measured baseline and an upward trend.
- CTR improves from the 2.9% starting reference where ranking and query mix are comparable.
- Paid search, if launched, is judged by qualified RFQ cost rather than raw clicks.

These are operating targets, not ranking guarantees. Google states that useful, reliable, people-first content and clear descriptive page signals are core practices, while keyword stuffing, automated link creation, and scaled low-value content can violate spam policies.

## Information required from the user at later gates

The following items are not required for the current production deployment, but they are required before the corresponding phase:

1. Priority countries and countries that must be excluded.
2. Priority products and approximate commercial importance.
3. Current monthly qualified-inquiry count.
4. GA4 or Google Tag Manager account access/ID.
5. Monthly Google Ads test budget.
6. Official datasheets or confirmed technical facts for every product page being expanded.

## Primary references

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google people-first content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google Ads keyword matching: https://support.google.com/google-ads/answer/14996023
- Google Ads search-terms report: https://support.google.com/google-ads/answer/2472708
