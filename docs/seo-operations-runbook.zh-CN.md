# SenseMeter SEO 自动巡检与增长操作手册

## 目标

这套工作流用于保护 SenseMeter 已经获得的搜索曝光，及时发现会影响收录、排名和询盘页面的技术问题。

它不会刷流量、自动发外链或批量生成文章，也不会直接改变 Google 排名。

## 自动检查内容

GitHub 每天北京时间 09:15 左右自动检查 `https://sensemeter.ru` 的 21 个重点页面；每周一 10:15 左右另做完整诊断：

- 俄语和英语首页、目录页。
- 压缩空气露点、天然气水分、工业湿度、手套箱氧分析及气候箱页面。
- 中英文联系入口；只读取页面，不发送询盘或确认实际邮件送达。
- MDM300、HMP3/HMPX 和 GPR 高意向产品页。
- HTTP 状态、title、meta description、canonical、robots noindex、H1 数量和 hreflang。
- `robots.txt` 是否正常引用 `sitemap.xml`。
- Sitemap 是否包含所有被监控的重点页面。

## 在 GitHub 手动运行

1. 打开 GitHub 上的 `sensemeter-website` 仓库。
2. 点击顶部 `Actions`。
3. 在左侧选择“线上SEO巡检”。
4. 点击右侧 `Run workflow`。
5. 保持分支为 `main`，默认只做轻量检查；需要全站/浏览器诊断才勾选 `full_audit`，再点击绿色 `Run workflow`。
6. 等待运行结束，点开最新任务查看摘要；排队和网络会影响时间。

## 如何解读结果

- 绿色：未发现会阻止索引的技术故障。
- 黄色 warning：标题或描述长度需要人工评估，不代表页面无法收录。
- 红色：打开任务摘要，查看具体页面和错误代码。不要盲目重新提交索引。

巡检报告也会作为 `live-seo-report` 附件保留30天，包括可读 Markdown 和结构化 JSON。它们保存了检查日期、页面范围、问题和实际信号，用于未来比较；下载并留存重要基线，附件到期后不能保证仍可取回。

每日自动检查不等于每日自动决策或网站已经优化。后者需要本对话每日任务实际创建并获得工具权限，再依据搜索数据提出或执行改动。当前不要认为应用每日任务已启用。

## 每月 Google Search Console 复盘

1. 选择“过去28天”并与“先前28天”比较。
2. 先看点击、曝光、CTR 和平均排名的变化。
3. 在“查询”中优先找曝光上升、排名8至30、但点击偏低的商业搜索词。
4. 在“网页”中查找对应URL，一次只优化一个主题集群。
5. 修改上线后观察14至28天，不每天反复改标题或提交收录。

## 当前首要增长页面

按用户上传的 2026-09-09 至 2026-10-06 报表，先处理俄语 `/applications/compressed-air-dew-point`：74 次曝光、0 点击、平均排名 18.11。已准备压力条件、取样和询盘信息增补，等待 VPS 发布。不是所有页面都要每天重写。

英语 `/en/applications/compressed-air-dew-point` 同期为 78 次曝光、0 点击、平均排名 45.5，暂保留现有版本观察。以下查询确实出现在历史 Search Console 数据中；没有页面过滤证据时，不将属性级查询强行归因给单一页面：

- `compressed air dew point testing`
- `dew point meter for compressed air`
- `portable dew point meter for compressed air`
- `compressed air dew point monitor`

优化时保留当前URL、canonical、hreflang和推荐产品。不要为每个近义词分别建立重复页面。

## 本轮发布计划

目标：先让已验收的俄语内容和中英文询盘场景预填在正式站生效，再从实际发布日期观察曝光与有效询盘。业务版本固定为 `57ba2739143818e360790ebf27e9e3fb844c534c`，后续文档提交不等于新的已验收构建。

- [x] GitHub 隔离构建及 4 个询盘浏览器场景通过；模拟提交未发送真实邮件。6 页共 12 次 Lighthouse 检查通过，报告已下载并校验。
- [x] 2026-10-09 北京时间 15:37 直接读取正式俄语露点页和两个带应用参数的联系页，均 HTTP 200；新 FAQ 未出现，实际联系表单用途输入没有默认值。GitHub 验收不代表线上已经更新。
- [x] 用户登录并提供只读检查截图：主仓库干净、main 落后 49 个提交；PM2 运行 `bbfeab7` 独立目录，状态 online；Node 22.22.3、npm 10.9.8；可用内存约 2.0GiB、无 Swap；磁盘可用 5.3GiB；私密配置文件存在。未把历史目录当作当前事实，配置存在不等于本轮实际送达已验证。
- [x] 用户截图确认独立目录 `/var/www/sensemeter-website-release-20261009-075046-57ba273` 完成构建并输出 `PREPARE_OK`、`NOT_SWITCHED`。固定版本、依赖、配置链接及测试由前一整段准备命令验证，截图未单独展示所有测试明细；旧 PM2 目录保留，尚未切换。
- [ ] 在未占用的本地端口启动新版本；验证 RU/EN 预填、未知/重复参数回退、俄语 FAQ、原 canonical 及 HTTP 状态。临时地址的 canonical 应保持正式域名，不能因端口差异改成 localhost。
- [ ] 经用户确认后，对临时版本发一封有明确测试标识的询盘，并由用户确认收到且用途字段正确。CI 模拟提交不能替代这个送达检查。
- [ ] 记录旧 PM2 启动信息后切换正式进程，验证正式域名页面和询盘入口；若验证失败，恢复旧目录和原启动信息。验证后保存 PM2 状态，记录实际目录、提交、上线时间。命令需根据只读检查结果生成，不能照抄历史目录。
- [ ] 上线后手动运行一次轻量线上巡检；只对本轮有实质变化的主页面检查/请求索引，不反复提交。第 14 天和第 28 天导出同口径数据，保留上线前基线与实际有效询盘记录。

[该版本的 GitHub 验收](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37899137532)。发布步骤尚未在 VPS 执行；不宣称排名或询盘已经增长。

### 登录后的只读检查

以下只检查状态，不更新、重启或输出邮件密码。先在 Ubuntu 登录成功后运行，并发送结果；不在 Windows 本地运行。`PM2_TARGET_NOT_UNIQUE` 表示目标不唯一或不存在，应停止发布并核对。

```bash
hostname
node --version
npm --version
free -h
df -h / /var/www
git -C /var/www/sensemeter-website-new status -sb
git -C /var/www/sensemeter-website-new worktree list
pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{try{const p=JSON.parse(s).filter(x=>x.name==="sensemeter-website");if(p.length!==1)throw Error("PM2_TARGET_NOT_UNIQUE");const e=p[0].pm2_env;console.log(JSON.stringify({name:p[0].name,status:e.status,cwd:e.pm_cwd,script:e.pm_exec_path,nodeVersion:e.node_version},null,2));}catch(e){console.error(e.message);process.exitCode=1;}})'
if test -s /root/sensemeter-config/website.env; then
  echo "PRIVATE_CONFIG_EXISTS"
else
  echo "PRIVATE_CONFIG_MISSING"
fi
```

不要运行 `cat website.env`、`pm2 env` 或输出完整 `pm2 jlist` 后截图。进程环境变量中看不到邮件配置不一定代表缺失，Next.js 可能从私密文件读取；最终以配置链接及真实测试邮件为准。

### 独立目录构建

根据上述截图准备以下命令。只在已登录的 Ubuntu 终端执行；括号把失败停止限制在本次准备过程，避免退出 SSH。它不调用 PM2、不更换 Nginx 配置，也不发送询盘。若出错，保留现有版本和新目录并发送错误，不删除任何发布目录。

Next.js 当前锁定版本的默认 worker 数取决于 `CIRCLE_NODE_TOTAL - 1`，本次设置为 2 即单 worker；`NODE_OPTIONS` 将单进程 JS 堆限制为 1024MiB。这不是整个进程树的硬内存上限，也不保证 2GiB 一定足够；构建失败时不得盲目扩大内存限额。

```bash
(
set -eu
REPO=/var/www/sensemeter-website-new
TARGET=57ba2739143818e360790ebf27e9e3fb844c534c
CONFIG=/root/sensemeter-config/website.env
NEW="/var/www/sensemeter-website-release-$(date -u +%Y%m%d-%H%M%S)-57ba273"
test -s "$CONFIG"
test ! -e "$NEW"
test ! -L "$NEW"
test "$(git -C "$REPO" remote get-url origin)" = "https://github.com/zhangguof1206-wq/sensemeter-website.git"
git -C "$REPO" -c http.version=HTTP/1.1 fetch --progress origin main
git -C "$REPO" cat-file -e "$TARGET^{commit}"
git -C "$REPO" merge-base --is-ancestor "$TARGET" origin/main
git -C "$REPO" worktree add --detach "$NEW" "$TARGET"
test "$(git -C "$NEW" rev-parse HEAD)" = "$TARGET"
ln -s "$CONFIG" "$NEW/.env.production.local"
cd "$NEW"
printf 'STAGING_DIR=%s\n' "$NEW"
npm ci --no-audit --no-fund --registry https://registry.npmjs.org
npm run test:rfq-application
npm run test:dew-point-content
npm run check:rfq-email
CIRCLE_NODE_TOTAL=2 NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=1024 nice -n 10 npm run build:release
test -s .next/BUILD_ID
printf 'PREPARE_OK\nSTAGING_DIR=%s\nNOT_SWITCHED\n' "$NEW"
)
```

用户发送 `PREPARE_OK` 与 `STAGING_DIR` 后，再分步安排临时端口检查和真实测试邮件。不能把本段准备完成等同于正式上线。

### 临时入口验证

本轮实际新目录为 `/var/www/sensemeter-website-release-20261009-075046-57ba273`。以下启动的是仅绑定 `127.0.0.1:3237` 的临时进程，端口已占用时停止；不打开防火墙、不调用 PM2、不提交表单。读取页面时使用正式域名作为预期 canonical，复用现有巡检解析器。脚本结束或失败后只停止本次创建的临时进程，不按端口批量杀进程。

```bash
(
set -eu
NEW=/var/www/sensemeter-website-release-20261009-075046-57ba273
TARGET=57ba2739143818e360790ebf27e9e3fb844c534c
PORT=3237
LOG=/tmp/sensemeter-57ba273-preview-3237.log
test "$(git -C "$NEW" rev-parse HEAD)" = "$TARGET"
cd "$NEW"
test -s .next/BUILD_ID
test "$(readlink -f .env.production.local)" = /root/sensemeter-config/website.env
if test -n "$(ss -H -ltn "sport = :$PORT")"; then
  echo "PORT_BUSY: $PORT"
  exit 1
fi
node node_modules/next/dist/bin/next start -H 127.0.0.1 -p "$PORT" >"$LOG" 2>&1 &
SPID=$!
cleanup() { kill "$SPID" 2>/dev/null || true; wait "$SPID" 2>/dev/null || true; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
export PREVIEW_PORT="$PORT" PREVIEW_PID="$SPID"
node --no-warnings --experimental-strip-types --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { compressedAirDewPoint as d } from './src/data/applications/compressed-air-dew-point.ts';
import { auditHtmlPage } from './scripts/lib/live-seo-audit.mjs';
const base = `http://127.0.0.1:${process.env.PREVIEW_PORT}`;
const get = path => fetch(base + path, {signal: AbortSignal.timeout(5000), redirect: 'error'});
let ready = false;
for (let n = 0; n < 40; n++) {
  process.kill(Number(process.env.PREVIEW_PID), 0);
  try { if ((await get('/contact')).status === 200) { ready = true; break; } } catch {}
  await delay(500);
}
assert.ok(ready, 'PREVIEW_NOT_READY');
async function html(path) {
  const r = await get(path), body = await r.text();
  const a = auditHtmlPage({baseUrl:'https://sensemeter.ru', path:path.split('?')[0], status:r.status, html:body});
  assert.deepEqual(a.issues, [], path);
  return body;
}
const field = h => { const t = h.match(/<input\b[^>]*id="application"[^>]*>/i)?.[0]; assert.ok(t, 'APPLICATION_FIELD_MISSING'); return t; };
for (const locale of ['ru', 'en']) {
  const contact = locale === 'en' ? '/en/contact' : '/contact';
  const h = await html(contact + '?application=' + d.slug + '&model=MDM300%20%2F%20MDM300%20I.S.');
  assert.ok(field(h).includes(`value="${d.content[locale].title}"`), locale + ' prefill');
  assert.doesNotMatch(field(h), /readonly|disabled/i);
  assert.ok(h.includes('value="MDM300 / MDM300 I.S." selected=""'), locale + ' model');
  for (const q of ['', '?application=unknown', '?application=' + d.slug + '&application=unknown'])
    assert.doesNotMatch(field(await html(contact + q)), /value="[^"]+"/);
  const a = await html((locale === 'en' ? '/en' : '') + d.path);
  if (locale === 'ru') for (const f of d.content.ru.faqs.slice(-2)) {
    assert.ok(a.includes(f.question) && a.includes(f.answer), 'RU_FAQ_MISSING');
  }
  console.log(locale.toUpperCase() + '_PAGES_OK');
}
const api = await get('/api/rfq-email');
assert.equal(api.status, 405);
assert.equal((await api.json()).error, 'method_not_allowed');
console.log('PREVIEW_OK: 10 page checks; no email sent; not switched');
NODE
)
```

只有收到 `RU_PAGES_OK`、`EN_PAGES_OK`、`PREVIEW_OK` 后，才安排发送一封明确标注的真实测试邮件。此处为 HTTP 验证，不替代已完成的 GitHub 浏览器交互测试，也不能证明正式站已部署或邮件送达。

### 上线后的业务观察

每次有效询盘只记录日期、页面/产品、来源证据、是否为真实采购或选型需求、跟进状态；不将客户姓名、邮箱或询盘正文提交到 GitHub。仅有邮件数量时不推断全部来自 Google，有确认的来源才做归因。

第 14 天先看相关页面曝光、商业查询点击和实际询盘；第 28 天再比较完整同口径周期。新内容上线不能保证立即收录或排名提升，样本很少时保留观察而非每天改标题。技术故障可立即修复，不受内容观察窗口限制。

## 重要边界

- 本地检查通过不代表已经发布。
- GitHub Actions 检查通过只代表当时的线上页面技术信号正常，不代表 Google 已经收录或提高排名。
- 修改代码后仍然要经过本地检查、人工确认和 Ubuntu VPS 发布流程。
- Google Ads 只在RFQ提交、Telegram点击等转化追踪验证正常后启动。
