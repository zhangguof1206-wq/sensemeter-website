# SenseMeter Yandex 每周 SEO 运营记录表

适用网站：https://sensemeter.ru
建议频率：每周一次，建议周一上午记录。

这张表用于观察趋势，不用于判断某一天的好坏。新站前期重点看 4-8 周变化。

## 1. 每周固定填写

| 周期 | 记录日期 | Webmaster 严重错误 | Yandex 收录页数量 | Reindex 排队页数量 | Metrica 访问量 | 搜索来源访问量 | RFQ 成功提交 | 本周处理事项 | 下周动作 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 第 1 周 | 2026-06-29 | 0 |  |  |  |  |  | 提交俄语和英文产品页；等待 Yandex 处理 | 复查 In queue 是否变为 Request processed |
| 第 2 周 |  |  |  |  |  |  |  |  |  |
| 第 3 周 |  |  |  |  |  |  |  |  |  |
| 第 4 周 |  |  |  |  |  |  |  |  |  |
| 第 5 周 |  |  |  |  |  |  |  |  |  |
| 第 6 周 |  |  |  |  |  |  |  |  |  |
| 第 7 周 |  |  |  |  |  |  |  |  |  |
| 第 8 周 |  |  |  |  |  |  |  |  |  |

## 2. 每一列在哪里看

### Webmaster 严重错误

位置：

```text
Yandex Webmaster -> Summary -> Troubleshooting / Site problems
```

填写方法：

- 显示 `No errors`：填 `0`
- 有红色错误：填错误数量，并截图保存

### Yandex 收录页数量

位置：

```text
Yandex Webmaster -> Indexing -> Pages in search
```

填写方法：

- 记录当前在搜索库里的页面数量
- 如果页面数量短期不变，不要频繁修改网站，先看 4-8 周趋势

### Reindex 排队页数量

位置：

```text
Yandex Webmaster -> Indexing -> Reindex pages -> Sent pages
```

填写方法：

- 数一数仍显示 `In queue` 的页面数量
- `Request processed` 不算排队
- 旧的红色 Error 如果已经重新提交过，不要重复统计

### Metrica 访问量

位置：

```text
Yandex Metrica -> Overview
```

填写方法：

- 时间范围选择最近 7 天
- 记录 Visits 或 Users，保持每周用同一个指标

### 搜索来源访问量

位置：

```text
Yandex Metrica -> Acquisition -> Search engines
```

填写方法：

- 时间范围选择最近 7 天
- 记录来自搜索引擎的访问量

### RFQ 成功提交

位置：

```text
Yandex Metrica -> Goals
```

填写方法：

- 找到 `rfq_submit_success`
- 记录最近 7 天成功提交次数
- 如果有访问但没有 RFQ，优先检查产品页按钮、表单和联系方式是否明显

## 3. 每周结论怎么写

每周只写一句结论，避免复杂分析。

示例：

```text
本周 Yandex 已处理大部分提交页面，收录仍在等待；继续观察，不重复提交。
```

```text
本周搜索访问开始出现，但 RFQ 为 0；下周优先检查产品页询价按钮和表单路径。
```

```text
本周有 RFQ 转化；下周记录转化来自哪个页面，并继续优化同类产品页。
```

## 4. 判断是否需要动作

### 需要马上处理

- Webmaster 出现红色严重错误
- 网站打不开
- sitemap 打不开
- RFQ 表单不能提交
- 重要产品图片不显示

### 可以下周处理

- 黄色建议
- 个别页面还在 `In queue`
- 重复 title/description 仍显示旧抓取日期
- 想继续优化某个产品页描述

### 暂时不要处理

- 刚提交 1-3 天还没收录
- 新站短期没排名
- 某个页面重复提交过一次

## 5. 每周操作顺序

1. 先看 Webmaster 是否有红色错误。
2. 再看 Reindex 里还有多少 `In queue`。
3. 再看 Pages in search 收录页数量。
4. 再看 Metrica 最近 7 天访问量。
5. 最后看 RFQ 目标是否有提交。
6. 填写表格，并写一句下周动作。
