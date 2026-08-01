# 日报页面组件规范

正文继续使用 Markdown；可视化使用仓库内置的原生 Web Components，不依赖外部 CDN。

## 风险卡片

在“今日摘要”之后插入：

```html
<risk-cards data-items="信用风险|高|high|逾期率上升,合规风险|中|medium|监管规则待落地,市场机会|谨慎乐观|low|钱包信贷需求增长"></risk-cards>
```

每项格式：`名称|展示值|等级|备注`，项目之间用英文逗号分隔。等级只能为：

- `low`
- `medium`
- `high`
- `critical`

属性值中不要使用英文逗号或竖线。

## 趋势图

仅当有至少 2 个同口径、可验证的数据点时插入：

```html
<trend-chart
  data-title="近月通胀趋势"
  data-labels="3月,4月,5月,6月"
  data-values="3.7,2.8,1.5,1.9"
  data-unit="%"
  data-color="#3f51b5"
  data-source="国家统计局月度 CPI">
</trend-chart>
```

要求：

- `data-labels` 与 `data-values` 数量一致。
- 数值必须来自报告所引用的可靠来源。
- 不得为了画图补造历史数据。
- 数据不足时省略图表，正文明确说明。
- 每篇报告最多 2 张趋势图，优先选择汇率、通胀、政策利率、逾期率等业务相关指标。

## 安全限制

- 不插入未经审查的第三方脚本、iframe 或远程 HTML。
- 不把搜索结果原始 HTML 直接嵌入页面。
- 不在属性中写 Token、Cookie 或其他秘密。
