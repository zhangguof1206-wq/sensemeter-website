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

按用户上传的 2026-09-09 至 2026-10-06 报表，先处理俄语 `/applications/compressed-air-dew-point`：74 次曝光、0 点击、平均排名 18.11。压力条件、取样和询盘信息增补已于 2026-10-09 北京时间 16:41:10 在 VPS 发布，正式 HTTP 内容复查通过。不是所有页面都要每天重写。

英语 `/en/applications/compressed-air-dew-point` 同期为 78 次曝光、0 点击、平均排名 45.5，暂保留现有版本观察。以下查询确实出现在历史 Search Console 数据中；没有页面过滤证据时，不将属性级查询强行归因给单一页面：

- `compressed air dew point testing`
- `dew point meter for compressed air`
- `portable dew point meter for compressed air`
- `compressed air dew point monitor`

优化时保留当前URL、canonical、hreflang和推荐产品。不要为每个近义词分别建立重复页面。

## 本轮发布计划

2026-10-10 索引排除核查：用户报告仅列出 `/cookie-policy` 与 `/privacy` 两页；代码及线上 GET 均确认有意设置 `noindex, follow`、HTTP 200。保留此设置，不点“验证修复”，不请求这两页收录。此结论只针对该类排除，不代表所有未收录原因已核查。下一步请用户选择 sensemeter.ru 的 Metrica 统计项（代码 ID 为 `110136437`），提供“目标”（Goals/Цели）列表，核对 `rfq_submit_success`。按[官方说明](https://yandex.ru/support/metrica/en/general/goal-js-event)，当前可从左侧菜单进入 Goals；不要求必须找到旧的“设置 → 目标”路径。不要将代码里已有事件等同后台统计验收，也不要重复发送测试邮件。

用户随后已提供目标列表：统计 ID `110136437`，`RFQ Submit Success` 的规则为 `ID contains: rfq_submit_success`，与代码相符，无需重复新建。当前截图 `Statistics · Hidden` 未展示次数/转化率；下一步先点击该已观察到的菜单查看选项，再指导显示统计。配置核对通过不等同事件接收、实际询盘或来源归因已验收。不要修改/删除已有目标或人为发送 reachGoal 制造业务转化。

目标：先让已验收的俄语内容和中英文询盘场景预填在正式站生效，再从实际发布日期观察曝光与有效询盘。业务版本固定为 `57ba2739143818e360790ebf27e9e3fb844c534c`，后续文档提交不等于新的已验收构建。

- [x] GitHub 隔离构建及 4 个询盘浏览器场景通过；模拟提交未发送真实邮件。6 页共 12 次 Lighthouse 检查通过，报告已下载并校验。
- [x] 2026-10-09 北京时间 15:37 直接读取正式俄语露点页和两个带应用参数的联系页，均 HTTP 200；新 FAQ 未出现，实际联系表单用途输入没有默认值。GitHub 验收不代表线上已经更新。
- [x] 用户登录并提供只读检查截图：主仓库干净、main 落后 49 个提交；PM2 运行 `bbfeab7` 独立目录，状态 online；Node 22.22.3、npm 10.9.8；可用内存约 2.0GiB、无 Swap；磁盘可用 5.3GiB；私密配置文件存在。未把历史目录当作当前事实，配置存在不等于本轮实际送达已验证。
- [x] 用户截图确认独立目录 `/var/www/sensemeter-website-release-20261009-075046-57ba273` 完成构建并输出 `PREPARE_OK`、`NOT_SWITCHED`。固定版本、依赖、配置链接及测试由前一整段准备命令验证，截图未单独展示所有测试明细；旧 PM2 目录保留，尚未切换。
- [x] 用户截图确认 `RU_PAGES_OK`、`EN_PAGES_OK`、`PREVIEW_OK: 10 page checks; no email sent; not switched`。临时入口上的预填、型号、未知/重复参数回退、俄语 FAQ 及正式域名 canonical 检查通过；这是 HTTP 验证，不等同浏览器或邮件送达。
- [x] 用户确认收到本轮测试邮件，并回答用途正确，具体为“Промышленные измерители точки росы для сжатого воздуха”。这是用户确认的实际送达/用途证据，不是 CI 模拟提交；没有独立的本轮 API 截图，不将两种证据混写。
- [x] 用户截图确认 `LIVE_PAGES_OK`、`UPGRADE_OK`、PM2 状态保存且 online。正式目录 `/var/www/sensemeter-website-release-20261009-075046-57ba273`，版本 `57ba273`，上线时间 `2026-10-09T08:41:10Z`，即北京时间 16:41:10。未发生回滚，不将恢复脚本准备当作实际回滚验证。
- [x] 助手上线后独立读取正式域名：北京时间 16:43:24 完成 21 页轻量巡检，全部通过，robots/sitemap 正常；16:44:22 完成 RU/EN 内容及联系页共 10 请求，新增 FAQ、用途预填、完整型号选中、未知/重复参数回退通过。均为 GET，不再次发邮件，不等同本轮人工视觉验收。
- [x] 用户截图确认俄语露点主页面已请求建立索引，且当前网址在 Google 服务中；仅确认请求已接收和已有索引状态，不证明新版内容已重新处理。
- [ ] 2026-10-23 初步复盘，2026-11-06 再检查完整周期，数据尚未齐全时等 Search Console 更新后导出；保留上线前基线与实际有效询盘记录。

[该版本的 GitHub 验收](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37899137532)。VPS 发布及正式 HTTP 复核已取得上述证据，不宣称排名或询盘已经增长。下文准备/切换命令为本次已执行的历史操作步骤，不要再次重复发布或发送测试邮件。

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

### 真实测试邮件

以下会实际发送一封邮件。用户同意后在服务器执行，收件人仍由现有网站私密配置决定，不更改邮箱或密钥。回复地址采用配置中的发件邮箱；用途从临时联系页实际预填输入读取。测试姓名和正文标记 `TEST-57ba273`，不是客户询盘，不计入有效询盘或转化统计。

发送前原子写入 `/tmp/sensemeter-57ba273-mail-attempted.json`，同一版本重复执行会停止，避免重复邮件；记录只有时间和“已尝试”状态，没有邮箱、密码或客户内容。API 成功与用户收到邮件是不同步骤。超时或失败也不要删除记录重试，因为邮件可能已发送；先核对收件情况和错误。

```bash
(
set -eu
NEW=/var/www/sensemeter-website-release-20261009-075046-57ba273
PORT=3237
umask 077
test "$(git -C "$NEW" rev-parse HEAD)" = 57ba2739143818e360790ebf27e9e3fb844c534c
cd "$NEW"
test -s .next/BUILD_ID
test "$(readlink -f .env.production.local)" = /root/sensemeter-config/website.env
if test -n "$(ss -H -ltn "sport = :$PORT")"; then
  echo "PORT_BUSY: $PORT"
  exit 1
fi
NODE_ENV=production node node_modules/next/dist/bin/next start -H 127.0.0.1 -p "$PORT" >/tmp/sensemeter-57ba273-mail-3237.log 2>&1 &
SPID=$!
cleanup() { kill "$SPID" 2>/dev/null || true; wait "$SPID" 2>/dev/null || true; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
export PREVIEW_PORT="$PORT" PREVIEW_PID="$SPID"
NODE_ENV=production node --no-warnings --experimental-strip-types --input-type=module <<'MAIL'
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import nextEnv from '@next/env';
import { compressedAirDewPoint as d } from './src/data/applications/compressed-air-dew-point.ts';
nextEnv.loadEnvConfig(process.cwd(), false, {info(){}, error(){}, log(){}});
const email = (process.env.RFQ_FROM_EMAIL || process.env.RFQ_SMTP_USER || '').trim();
assert.ok(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'CONFIGURED_SENDER_EMAIL_MISSING');
const base = `http://127.0.0.1:${process.env.PREVIEW_PORT}`;
let html;
for (let n = 0; n < 40; n++) {
  process.kill(Number(process.env.PREVIEW_PID), 0);
  try {
    const r = await fetch(base + '/contact?application=' + d.slug, {signal:AbortSignal.timeout(5000), redirect:'error'});
    if (r.status === 200) { html = await r.text(); break; }
  } catch {}
  await delay(500);
}
assert.ok(html, 'PREVIEW_NOT_READY');
const input = html.match(/<input\b[^>]*id="application"[^>]*>/i)?.[0];
const application = input?.match(/\bvalue="([^"]*)"/)?.[1];
assert.equal(application, d.content.ru.title, 'APPLICATION_PREFILL_MISSING');
const body = new URLSearchParams({Email:email, Name:'TEST-57ba273', Company:'SenseMeter internal deployment test', 'Product Model':'MDM300 / MDM300 I.S.', Application:application, Message:'TEST-57ba273: internal pre-release verification only. Not a customer RFQ; no quote required.', 'Personal Data Consent':'accepted'});
await writeFile('/tmp/sensemeter-57ba273-mail-attempted.json', JSON.stringify({at:new Date().toISOString(), state:'attempted'}), {flag:'wx', mode:0o600});
const r = await fetch(base + '/api/rfq-email', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body, signal:AbortSignal.timeout(60000), redirect:'error'});
const result = await r.json();
assert.ok(r.ok && result.ok === true, 'TEST_EMAIL_FAILED: ' + (result.error || r.status));
console.log('TEST_EMAIL_API_OK: wait for inbox confirmation; not switched');
MAIL
)
```

用户已确认本轮邮件收到，且 `Application` 为俄语压缩空气露点应用名称；没有再单独询问型号字段，不将其当作本轮收件确认事实。CI 与临时 HTTP 已检查型号保留。邮件已完成送达验证，不要重发。正式网站仍未切换。

### 切换前读取实际启动参数

以下只读命令已经由用户执行并提供截图，确认当前目录、实际 npm 参数、启动模式和端口。只输出启动字段，不输出完整环境；参数含疑似密钥名时停止输出。用结果生成切换和回滚命令，不能将历史 `npm start -p 3000` 当成精确参数；不需再次执行本段。

```bash
pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{try{const p=JSON.parse(s).filter(x=>x.name==="sensemeter-website");if(p.length!==1)throw Error();const e=p[0].pm2_env;const args=e.args??[];if(/password|secret|token|api[_-]?key/i.test(JSON.stringify(args)))throw Error();const port=e.env?.PORT??e.PORT;console.log(JSON.stringify({name:p[0].name,status:e.status,cwd:e.pm_cwd,script:e.pm_exec_path,args,mode:e.exec_mode,interpreter:e.exec_interpreter,port:/^\d+$/.test(String(port??""))?String(port):null},null,2));}catch{console.error("PM2_START_INFO_FAILED");process.exitCode=1;}})'
ss -H -ltn "sport = :3000"
```

后续切换仍需核对目标固定版本及构建产物，保存原始启动方式，验证正式域名新内容、预填、canonical 和 HTTP 状态，失败尝试恢复旧版本，成功后再保存 PM2 状态。获取启动信息本身不执行切换或再次发邮件。

### 正式切换及失败恢复

用户截图确认当前实际 args 为 `["start", "--", "-p", "3000"]`、fork_mode、解释器 `/usr/bin/node`、脚本 `/usr/bin/npm`，旧目录仍在线，3000 端口正在监听。`port: null` 仅表示未单独设置 PORT 环境变量，不代表服务没有端口。

本步骤会重启这个网站进程，单进程切换可能短暂中断访问；保留旧目录，不更改 Nginx、邮箱配置或其他 PM2 应用。先在仅 root 可访问的目录保存 PM2 快照及新旧启动配置，环境值不输出、不上传 GitHub。保留已有环境、启动参数、日志路径和常用重启设置，只更换 cwd；新版本显式采用 production 环境。依据 [PM2 配置文件说明](https://pm2.keymetrics.io/docs/usage/application-declaration/) 和 [进程管理说明](https://pm2.keymetrics.io/docs/usage/process-management/)。

以下命令本轮已由用户执行，截图及随后正式域名复查确认切换成功，不需重复执行。出现错误或中断后尝试恢复旧配置并检查可访问性；若出现 `ROLLBACK_NEEDS_HELP`，不要继续重复切换，发终端结果。恢复检查只是旧入口 HTTP 可访问，不宣称完成全部业务复核。不要上传备份目录或完整 PM2 快照。

```bash
(
set -Eeuo pipefail
umask 077
export NEW=/var/www/sensemeter-website-release-20261009-075046-57ba273
export OLD=/var/www/sensemeter-website-release-20260929-055145-bbfeab7
export D="/root/sensemeter-config/switch-$(date -u +%Y%m%d-%H%M%S)-57ba273"
test "$(git -C "$NEW" rev-parse HEAD)" = 57ba2739143818e360790ebf27e9e3fb844c534c
test -s "$NEW/.next/BUILD_ID"
test -s "$OLD/.next/BUILD_ID"
test "$(readlink -f "$NEW/.env.production.local")" = /root/sensemeter-config/website.env
test -s /root/sensemeter-config/website.env
mkdir -m 700 "$D"
pm2 jlist >"$D/snapshot.json"
node --input-type=module <<'CONFIG'
import fs from 'node:fs';
import assert from 'node:assert/strict';
const p = JSON.parse(fs.readFileSync(process.env.D + '/snapshot.json', 'utf8')).filter(x => x.name === 'sensemeter-website');
assert.equal(p.length, 1); const e = p[0].pm2_env;
assert.equal(e.status, 'online'); assert.equal(e.pm_cwd, process.env.OLD);
assert.equal(e.pm_exec_path, '/usr/bin/npm'); assert.equal(e.exec_interpreter, '/usr/bin/node');
assert.equal(e.exec_mode, 'fork_mode'); assert.deepEqual(e.args, ['start', '--', '-p', '3000']);
assert.ok(!e.env || (typeof e.env === 'object' && !Array.isArray(e.env)));
const c = {name:'sensemeter-website', script:e.pm_exec_path, cwd:e.pm_cwd, args:e.args, interpreter:e.exec_interpreter, exec_mode:'fork', instances:1, env:e.env || {}};
for (const k of ['node_args','autorestart','max_memory_restart','min_uptime','max_restarts','restart_delay','exp_backoff_restart_delay','kill_timeout','listen_timeout','wait_ready','watch','ignore_watch','cron_restart','merge_logs','log_date_format','time','vizion','source_map_support']) if (e[k] !== undefined) c[k] = e[k];
if (e.pm_out_log_path) c.out_file = e.pm_out_log_path;
if (e.pm_err_log_path) c.error_file = e.pm_err_log_path;
fs.writeFileSync(process.env.D + '/old.json', JSON.stringify({apps:[c]}), {flag:'wx', mode:0o600});
fs.writeFileSync(process.env.D + '/new.json', JSON.stringify({apps:[{...c, cwd:process.env.NEW, env:{...c.env, NODE_ENV:'production'}}]}), {flag:'wx', mode:0o600});
CONFIG
printf 'ROLLBACK_DIR=%s\n' "$D"
ready() { for n in $(seq 1 40); do if curl -fsS --max-time 3 http://127.0.0.1:3000/contact >/dev/null 2>&1; then return 0; fi; sleep 1; done; return 1; }
CHANGED=0
rollback() { rc=${1:-$?}; trap - ERR INT TERM HUP; set +e; if test "$CHANGED" = 1; then echo 'RESTORING_OLD_VERSION'; pm2 delete sensemeter-website >/dev/null 2>&1; pm2 start "$D/old.json" --only sensemeter-website; if ready && pm2 save; then echo 'ROLLBACK_HTTP_OK'; else echo 'ROLLBACK_NEEDS_HELP'; fi; fi; exit "$rc"; }
trap rollback ERR
trap 'rollback 130' INT
trap 'rollback 143' TERM
trap 'rollback 129' HUP
CHANGED=1
pm2 delete sensemeter-website
pm2 start "$D/new.json" --only sensemeter-website
ready
cd "$NEW"
node --no-warnings --experimental-strip-types --input-type=module <<'VERIFY'
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { compressedAirDewPoint as d } from './src/data/applications/compressed-air-dew-point.ts';
import { auditHtmlPage } from './scripts/lib/live-seo-audit.mjs';
let p; try { p = JSON.parse(execFileSync('pm2', ['jlist'], {encoding:'utf8', timeout:10000, stdio:['ignore','pipe','ignore']})).filter(x => x.name === 'sensemeter-website'); } catch { throw Error('PM2_STATE_READ_FAILED'); }
assert.equal(p.length, 1); assert.equal(p[0].pm2_env.status, 'online'); assert.equal(p[0].pm2_env.pm_cwd, process.env.NEW);
for (const base of ['http://127.0.0.1:3000', 'https://sensemeter.ru']) for (const locale of ['ru', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  for (const path of [prefix + d.path, prefix + '/contact?application=' + d.slug]) {
    const r = await fetch(base + path, {headers:{'Cache-Control':'no-cache'}, signal:AbortSignal.timeout(15000), redirect:'error'}), html = await r.text();
    assert.deepEqual(auditHtmlPage({baseUrl:'https://sensemeter.ru', path:path.split('?')[0], status:r.status, html}).issues, [], base + path);
    if (path.includes('/contact?')) assert.ok(html.match(/<input\b[^>]*id="application"[^>]*>/i)?.[0].includes(`value="${d.content[locale].title}"`), 'PREFILL_MISSING');
    else if (locale === 'ru') for (const f of d.content.ru.faqs.slice(-2)) assert.ok(html.includes(f.question) && html.includes(f.answer), 'RU_FAQ_MISSING');
  }
}
console.log('LIVE_PAGES_OK: local and public; no email sent');
VERIFY
pm2 save
CHANGED=0
printf 'UPGRADE_OK\nCURRENT_VERSION=57ba273\nCURRENT_DIR=%s\n' "$NEW"
date -u '+DEPLOYED_AT_UTC=%Y-%m-%dT%H:%M:%SZ'
pm2 status
)
```

本轮已收到 `UPGRADE_OK`、`LIVE_PAGES_OK` 与 online 截图，助手正式域名内容复查及 21 页轻量巡检已通过。用户已提交本轮俄语露点页索引请求；手动网页展示检查尚无本轮确认。此前已验证测试邮件，不自动重发。

### 请求重新索引及观察日期

1. 在 Search Console 顶部“网址检查”输入 `https://sensemeter.ru/applications/compressed-air-dew-point`。
2. 检查该网址；需要时先“测试实际网址”，确认没有索引阻止，再点击“请求建立索引”。已收录页面也可请求重新抓取本轮更新。
3. 提交一次即可，记录提交结果；不提交带 application/model 参数的联系页变体，不为未改变的英文内容反复提交。
4. 在 2026-10-23 初步查看露点页曝光、查询点击和有效询盘，2026-11-06 再查看完整 28 天周期。Search Console 有数据延迟时等完整数据再比较；这是评估日期，不是排名承诺或已创建提醒。

[Google 官方说明](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)：请求抓取不保证收录，多次提交同一网址不会加快抓取。用户已提供本轮请求成功截图，检查的网址为俄语露点主页面，背景显示该网址在 Google 服务中；未展示新版内容重抓取时间或抓取内容，不宣称新版本已重新处理。此段保留为操作说明，不需要再次提交。

### 上线后的业务观察

每次有效询盘只记录日期、页面/产品、来源证据、是否为真实采购或选型需求、跟进状态；不将客户姓名、邮箱或询盘正文提交到 GitHub。仅有邮件数量时不推断全部来自 Google，有确认的来源才做归因。

第 14 天先看相关页面曝光、商业查询点击和实际询盘；第 28 天再比较完整同口径周期。新内容上线不能保证立即收录或排名提升，样本很少时保留观察而非每天改标题。技术故障可立即修复，不受内容观察窗口限制。

## 重要边界

- 本地检查通过不代表已经发布。
- GitHub Actions 检查通过只代表当时的线上页面技术信号正常，不代表 Google 已经收录或提高排名。
- 修改代码后仍然要经过本地检查、人工确认和 Ubuntu VPS 发布流程。
- Google Ads 只在RFQ提交、Telegram点击等转化追踪验证正常后启动。
