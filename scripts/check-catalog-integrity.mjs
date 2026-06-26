import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const catalogPath = path.join(root, "src", "data", "catalog.ts");
const catalogSource = fs.readFileSync(catalogPath, "utf8");

const expectedNewProducts = [
  {
    slug: "pura-transmitter",
    category: "MICHELL",
    image: "Michell Pura.png",
    pdf: "Michell_Instruments_Pura_Transmitters_Datasheet.pdf"
  },
  {
    slug: "hygroflex1",
    category: "ROTRONIC",
    image: "Rotronic HF1.png",
    pdf: "RT_59034E_HygroFlex1.pdf"
  },
  {
    slug: "hmt370ex",
    category: "VAISALA",
    image: "Intrinsically Safe Humidity and Temperature Transmitter Series HMT370EX.png",
    pdf: "VA_HMT370EX-Datasheet-B211825EN-K.pdf"
  },
  {
    slug: "hmt310",
    category: "VAISALA",
    image: "Humidity and Temperature Transmitter Series HMT310.png",
    pdf: "VA_HMT310-Datasheet-B210769EN-J.pdf"
  },
  {
    slug: "hmp3-hmpx",
    category: "VAISALA",
    image: "Humidity and Temperature Probe HMP3.png",
    pdf: "VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf"
  },
  {
    slug: "dmt153",
    category: "VAISALA",
    image: "DMT153 Dew Point Transmitter.png",
    pdf: "VA_DMT153-Datasheet-B212905EN-B.pdf"
  },
  {
    slug: "dmt143-dmt143l",
    category: "VAISALA",
    image: "VA_DMT143-DMT143L.png",
    pdf: "VA_DMT143-Datasheet-B211207EN-L.pdf"
  }
];

const errors = [];

function expectSource(label, value) {
  if (!catalogSource.includes(value)) {
    errors.push(`${label} missing from catalog.ts: ${value}`);
  }
}

function expectFile(label, relativePath) {
  const fullPath = path.join(root, "public", relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`${label} missing: public/${relativePath}`);
  }
}

const categoryIds = [...catalogSource.matchAll(/id:\s*"([A-Z0-9]+)"/g)].map((match) => match[1]);
const categoryRefs = [...catalogSource.matchAll(/category:\s*"([A-Z0-9]+)"/g)].map((match) => match[1]);
const slugs = [...catalogSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

for (const category of ["MICHELL", "ROTRONIC", "VAISALA", "AII"]) {
  if (!categoryIds.includes(category)) {
    errors.push(`Category is not declared: ${category}`);
  }
}

for (const category of categoryRefs) {
  if (!categoryIds.includes(category)) {
    errors.push(`Product references undeclared category: ${category}`);
  }
}

for (const slug of slugs) {
  if (slugs.indexOf(slug) !== slugs.lastIndexOf(slug)) {
    errors.push(`Duplicate product slug: ${slug}`);
  }
}

const productImagePaths = [...catalogSource.matchAll(/image:\s*"assets\/products\/([^"]+)"/g)].map((match) => match[1]);
for (const imagePath of productImagePaths) {
  if (imagePath.includes("&")) {
    errors.push(`Product image filename should avoid ampersands for reliable static URLs: ${imagePath}`);
  }
}

expectFile("VAISALA category image", "assets/category-vaisala.png");

for (const product of expectedNewProducts) {
  expectSource("Product slug", `slug: "${product.slug}"`);
  expectSource("Product category", `category: "${product.category}"`);
  expectSource("Product image", `image: "assets/products/${product.image}"`);
  expectSource("Product datasheet", `pdf: "${product.pdf}"`);
  expectFile("Product image", `assets/products/${product.image}`);
  expectFile("Product datasheet", `datasheets/${product.pdf}`);
}

if (errors.length > 0) {
  console.error("Catalog integrity check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Catalog integrity check passed for ${expectedNewProducts.length} newly imported products.`);
