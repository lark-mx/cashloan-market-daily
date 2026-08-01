# Astro 日报内容规范

每个国家每日创建一个文件：

```text
src/content/reports/<country>/YYYY-MM-DD.md
```

正文使用 Markdown；风险卡片、雷达图、指标卡和趋势图由 Astro 根据 frontmatter 自动渲染，日报任务不要手写 HTML 或 JavaScript。

## Frontmatter 模板

```yaml
---
country: argentina
countryName: '阿根廷'
flag: '🇦🇷'
date: 2026-08-01
riskScore: 84
opportunityScore: 55
confidence: 78
headline: '一句话市场结论'
summary: '两到三句摘要'
risks:
  credit: 92
  regulatory: 68
  macro: 76
  fraud: 58
  competition: 81
  funding: 74
metrics:
  - label: '年通胀'
    value: '33.5'
    unit: '%'
    change: '持续回落'
    direction: down
signals:
  - '立即执行的业务动作或重点监控事项。'
chart:
  title: '家庭贷款违约率变化'
  labels: ['2023-12', '2026-06']
  values: [2.8, 13.0]
  unit: '%'
  source: '来源名称'
---
```

允许的 `country`：`argentina`、`colombia`、`peru`、`vietnam`、`mexico`、`guatemala`、`dominican-republic`、`kenya`。

## 约束

- `riskScore`、`opportunityScore`、`confidence` 和六个风险维度均为 0–100。
- 风险分数必须根据当日证据审慎判断，不得制造虚假精度；同一评分方法跨日保持一致。
- `metrics` 推荐 4 项，数值无法验证时不填。
- `direction` 只能是 `up`、`down`、`flat`。
- `signals` 推荐 3 项，必须是可执行判断。
- `chart` 可选，只能使用至少两个同口径、来源可靠的数据点。数据不足时完全省略 chart。
- 正文按“重点动态 / 今日判断 / 信息说明”组织，不使用 Markdown 表格。
- 来源必须包含可访问链接，不编造数据、机构、时间和 URL。
- 禁止远程脚本、iframe、原始第三方 HTML、Token、Cookie 和其他秘密。
