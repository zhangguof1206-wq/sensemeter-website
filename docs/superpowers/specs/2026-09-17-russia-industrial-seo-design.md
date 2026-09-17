# Russia Industrial Instrumentation SEO Design

## Objective

Improve SenseMeter's relevance and conversion clarity for Russian industrial buyers searching for dew-point, gas-moisture, industrial-humidity, and oxygen-analysis instruments. The optimization uses existing URLs and page layouts, preserves the product catalog presentation, and remains local until separately approved for deployment.

## Confirmed Commercial Position

- SenseMeter supplies industrial measurement equipment from China to customers in Russia.
- International transport and customs-clearance support can be included according to the customer's chosen delivery arrangement.
- The quotation must confirm transport mode, customs responsibilities, taxes, costs, and delivery terms.
- Copy must not claim a Russian legal entity, local warehouse, local stock, fixed delivery time, official distributorship, or default DDP delivery.

Approved Russian supply wording:

> Поставка промышленного измерительного оборудования из Китая в Россию. Условия международной доставки, таможенного оформления и распределение расходов согласовываются при подготовке коммерческого предложения.

## Search-Intent Evidence

Current Russian results for the target topics favor category, application, and product pages rather than a single generic homepage. Ranking pages commonly combine an exact instrument category with process conditions, selection parameters, documentation, price or quotation actions, and delivery information.

Observed patterns:

- Dew-point pages use both `измеритель точки росы` and `преобразователь точки росы` and distinguish portable inspection from continuous installation.
- Gas-moisture pages lead with `анализатор влажности газа` and explain gas composition, pressure, sampling, and measurement units.
- Industrial-humidity pages organize products by installation environment and output signal.
- Oxygen-analyzer pages emphasize gas purity, measurement range, process application, and quotation/documentation.

Research references:

- https://www.pergam.ru/catalog/pci/vlagomer/fas-w.htm
- https://www.microfor.ru/products/catalog/dew-point-transducers/
- https://ridan.ru/catalog/industrial-automation/datciki-vlaznosti
- https://www.michell.com/ru/documents/Easidew_PRO_IS_97208_RU_Datasheet_v10-1.pdf

## Keyword-to-Page Map

### Homepage `/`

Purpose: broad commercial hub for industrial instrumentation supplied from China to Russia.

Primary topic: `промышленные измерительные приборы для России`.

Supporting topics: dew-point instruments, gas-moisture analyzers, industrial humidity sensors, oxygen analyzers, model selection, quotation, documentation, transport, and customs-clearance options.

### Compressed Air Dew Point

URL: `/applications/compressed-air-dew-point`

Primary topic: `промышленный измеритель точки росы`.

Secondary topic: `преобразователь точки росы`.

The title, H1, lead, selection heading, product heading, and internal links should distinguish portable meters from fixed transmitters while retaining compressed-air intent.

### Natural Gas Moisture

URL: `/applications/natural-gas-moisture-monitoring`

Primary topic: `анализатор влажности газа`.

Secondary topics: natural-gas moisture analysis, dew-point analysis, sampling, pressure, and hazardous-area requirements.

### Industrial Humidity

URL: `/applications/industrial-humidity-monitoring`

Primary topic: `промышленный датчик влажности`.

Secondary topics: humidity and temperature transmitters, duct, room, outdoor, and process monitoring.

### Oxygen Analysis

URL: `/applications/glove-box-oxygen-analysis`

Primary topic: `промышленный анализатор кислорода`.

Secondary topics: trace oxygen, gas purity, glove boxes, inert-gas systems, furnaces, and process lines.

## Content Changes

- Rewrite Russian metadata titles and descriptions so every target page has one distinct primary intent.
- Update Russian H1 and opening copy with natural wording; do not repeat exact keywords mechanically.
- Preserve verified technical content and product recommendations.
- Add process-specific selection language covering medium, pressure, expected range, installation, sampling, output/interface, documentation, and quantity where relevant.
- Add distinct quotation copy to each target page that explains supply from China to Russia and optional transport/customs support.
- Add natural internal links from the homepage and target application pages to the catalog, relevant products, and RFQ page without changing the existing visual layout.
- Keep English pages semantically aligned with the commercial facts, but focus Russian pages on the Russian queries.

## Structured Data and Technical SEO

- Keep every existing URL, canonical, hreflang pair, sitemap entry, and robots rule.
- Extend the organization sales contact with Russia as a served market and Russian/English support.
- Do not create a Russian address, local-business schema, warehouse schema, stock offer, shipping price, or delivery-time promise.
- Keep existing breadcrumb and user-visible FAQ structured data.
- Preserve metadata uniqueness and current title/description truncation safeguards.

## Files Expected to Change

- `src/app/page.tsx`
- `src/app/en/page.tsx`
- `src/lib/i18n.ts`
- `src/lib/seo.ts`
- `src/data/applications/compressed-air-dew-point.ts`
- `src/data/applications/natural-gas-moisture-monitoring.ts`
- `src/data/applications/industrial-humidity-monitoring.ts`
- `src/data/applications/glove-box-oxygen-analysis.ts`
- `scripts/check-seo.mjs`
- `scripts/check-i18n.mjs`

No catalog layout, product image, application layout, route, or deployment file should change.

## Acceptance Criteria

- Each target Russian query has one designated primary page.
- Homepage and target pages accurately state supply from China to Russia.
- Transport and customs support are described as customer-selected quotation options.
- No unsupported local-presence, certification, stock, price, delivery-time, or distributorship claim is introduced.
- Russian metadata titles and descriptions remain unique.
- Existing canonical, hreflang, sitemap, and application URLs remain unchanged.
- `check:seo`, `check:i18n`, `check:applications`, `check:application-links`, `typecheck`, and production build pass.
- Desktop and mobile previews show no text overflow or layout regression.
- Changes are committed locally and are not deployed.
