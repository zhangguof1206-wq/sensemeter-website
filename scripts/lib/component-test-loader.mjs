import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export function createComponentLoader() {
  const cache = new Map();
  function load(path) {
    const absolute = resolve(root, path);
    const file = [absolute, `${absolute}.ts`, `${absolute}.tsx`, resolve(absolute, "index.ts")].find(candidate => existsSync(candidate) && /\.[cm]?[jt]sx?$/.test(candidate));
    if (!file) throw new Error(`Missing component test module: ${path}`);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const localRequire = id => {
      if (id === "next/link") return ({ children, ...props }) => React.createElement("a", props, children);
      if (id === "next/image") return ({ priority, fill, ...props }) => React.createElement("img", props);
      const target = id.startsWith("@/") ? resolve(root, "src", id.slice(2)) : id.startsWith(".") ? resolve(dirname(file), id) : null;
      if (!target) return require(id);
      if (target.includes(`${resolve(root, "src/components")}`) && !/[\\/](products|accessories)[\\/](detail-layout|product-visual|product-image-gallery|instrument-product-detail|mdm300-product-sample|accessory-detail-page|accessory-cards|accessory-specs|accessories-home-section)$/.test(target) && !/[\\/](site|metrica-goals|rfq-form|footer-contact-links)$/.test(target)) {
        return new Proxy({}, { get: () => () => null });
      }
      return load(target);
    };
    const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
    new Function("require", "module", "exports", outputText)(localRequire, module, module.exports);
    return module.exports;
  }
  return load;
}
