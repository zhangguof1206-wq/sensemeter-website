import { createHash } from 'node:crypto';
import { chmod, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import settings from '../../tools/seo/settings.cjs';

const version = '2.5.1';
const assets = {
  'win32-x64': ['win-x64.zip', '6b6758daa866df99d9bd7a020b51eaeca2d5f52f3172ec5270f9f96b964c16db'],
  'linux-x64': ['linux-x64.tar.gz', '09278d958d4a087fa46093805cd33b085b96618001dd31d45c448ad724c9024e'],
};

export function assetFor(platform, arch) {
  const entry = assets[`${platform}-${arch}`];
  if (!entry) throw new Error(`Unsupported SiteOne platform: ${platform}-${arch}`);
  return { name: `siteone-crawler-v${version}-${entry[0]}`, sha256: entry[1] };
}

export function verifyArchive(bytes, expected) {
  if (createHash('sha256').update(bytes).digest('hex') !== expected) {
    throw new Error('SiteOne SHA256 verification failed; refusing to execute.');
  }
}

export async function installSiteone() {
  const asset = assetFor(process.platform, process.arch);
  const dir = resolve(settings.root, '.cache', 'siteone', version);
  await mkdir(dir, { recursive: true });
  const archive = join(dir, asset.name);
  if (!existsSync(archive)) {
    const url = `https://github.com/janreges/siteone-crawler/releases/download/v${version}/${asset.name}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
    if (!response.ok) throw new Error(`SiteOne download returned ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    verifyArchive(bytes, asset.sha256);
    await writeFile(archive, bytes);
  }
  verifyArchive(await readFile(archive), asset.sha256);
  // Extraction stays inside the versioned workspace cache; no global install.
  const extraction = spawnSync('tar', ['-xf', archive, '-C', dir], { windowsHide: true, stdio: 'inherit' });
  if (extraction.error) throw extraction.error;
  if (extraction.status !== 0) throw new Error('SiteOne archive extraction failed.');
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  const name = process.platform === 'win32' ? 'siteone-crawler.exe' : 'siteone-crawler';
  const executable = entries.find(entry => entry.isFile() && entry.name === name);
  if (!executable) throw new Error('SiteOne binary missing from verified archive.');
  const binary = join(executable.parentPath, executable.name);
  if (process.platform !== 'win32') await chmod(binary, 0o755);
  return binary;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  installSiteone().then(binary => console.log(`SiteOne installed: ${binary}`)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
