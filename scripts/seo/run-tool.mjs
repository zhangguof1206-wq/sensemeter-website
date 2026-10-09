import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import settings from '../../tools/seo/settings.cjs';
import { installSiteone } from './siteone.mjs';
import { validateSiteoneReport, validateUnlighthouseReport } from './report-validation.mjs';

const { root, baseUrl, reportDir, siteoneArgs } = settings;
const tool = process.argv[2];
const supported = ['siteone', 'unlighthouse', 'lighthouse'];
if (!supported.includes(tool)) throw new Error(`Choose one of: ${supported.join(', ')}`);
const base = baseUrl();
const output = reportDir(base);
await mkdir(output, { recursive: true });
const startedAt = new Date().toISOString();

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('exit', code => resolve(code ?? 1));
  });
}

let exitCode = 1;
let error;
try {
  if (tool === 'siteone') {
    exitCode = await run(await installSiteone(), siteoneArgs(base, output));
    if (exitCode === 0) {
      validateSiteoneReport(JSON.parse(await readFile(join(output, 'siteone.json'), 'utf8')), settings.keyPaths, base);
    }
  } else if (tool === 'unlighthouse') {
    exitCode = await run(process.execPath, [
      join(root, 'tools/seo/node_modules/@unlighthouse/cli/bin/unlighthouse-ci.mjs'),
      '--config-file', join(root, 'tools/seo/unlighthouse.config.mjs'),
    ]);
    if (exitCode === 0) {
      validateUnlighthouseReport(JSON.parse(await readFile(join(output, 'unlighthouse/ci-result.json'), 'utf8')), settings.keyPaths);
    }
  } else {
    const args = [join(root, 'tools/seo/node_modules/@lhci/cli/src/cli.js')];
    const config = '--config=tools/seo/lighthouserc.cjs';
    exitCode = await run(process.execPath, [...args, 'collect', config]);
    if (exitCode === 0) {
      // Save diagnostics before assertions, including a failing audit's evidence.
      const uploadCode = await run(process.execPath, [...args, 'upload', config]);
      const assertionCode = await run(process.execPath, [...args, 'assert', config]);
      exitCode = uploadCode || assertionCode;
    }
  }
} catch (failure) {
  exitCode = 1;
  error = failure.message;
  console.error(error);
} finally {
  await writeFile(join(output, `${tool}-run.json`), JSON.stringify({
    tool, baseUrl: base, startedAt, finishedAt: new Date().toISOString(),
    exitCode, ...(error ? { error } : {}),
    scope: base === 'https://sensemeter.ru' ? 'live' : 'local build; not production verification',
  }, null, 2));
  await writeFile(join(output, 'README.zh-CN.md'), [
    '# 诊断报告说明', '', `检查地址：${base}`, '',
    base === 'https://sensemeter.ru' ? '这是线上诊断，不等同于 Google 已收录。' : '这是本地构建诊断，不代表线上状态。正式域名 canonical、HTTP 本地连接、未访问外部地址导致的告警不能据此改动线上配置。', '',
    '先看各工具的 *-run.json：退出状态为 0 才算工具完成；失败或缺失报告不能当作通过。', '',
    'SiteOne 聚焦 HTML，不下载图片、脚本和 PDF。图片格式、压缩、表单标签等警告需要浏览器复核；不要照着分数机械修改页面。联系页的不同询盘参数可能被报为重复标题，应结合 canonical 判断。', '',
    '法律政策页、感谢页可以有 noindex；产品、应用页面的 noindex 应优先处理。Unlighthouse 汇总与单页 Lighthouse 报告位于 unlighthouse 文件夹。',
  ].join('\n'));
}
process.exitCode = exitCode;
