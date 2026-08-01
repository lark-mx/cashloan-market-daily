(() => {
  const parseList = (value = '') => value.split(',').map((item) => item.trim()).filter(Boolean);
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  class RiskCards extends HTMLElement {
    connectedCallback() {
      const items = parseList(this.dataset.items);
      if (!items.length) return;
      this.classList.add('risk-grid');
      this.innerHTML = items.map((item) => {
        const [label = '', value = '', level = 'medium', note = ''] = item.split('|').map((part) => part.trim());
        const normalized = ['low', 'medium', 'high', 'critical'].includes(level) ? level : 'medium';
        return `<article class="risk-card risk-${normalized}">
          <div class="risk-card__label">${escapeHtml(label)}</div>
          <div class="risk-card__value">${escapeHtml(value)}</div>
          <div class="risk-card__note">${escapeHtml(note)}</div>
        </article>`;
      }).join('');
    }
  }

  class TrendChart extends HTMLElement {
    connectedCallback() {
      const labels = parseList(this.dataset.labels);
      const values = parseList(this.dataset.values).map(Number);
      if (labels.length < 2 || labels.length !== values.length || values.some(Number.isNaN)) {
        this.innerHTML = '<p class="chart-error">趋势数据不足，暂不绘图。</p>';
        return;
      }

      const width = 760;
      const height = 280;
      const padding = { top: 30, right: 24, bottom: 52, left: 64 };
      const minValue = this.dataset.min ? Number(this.dataset.min) : Math.min(...values);
      const maxValue = this.dataset.max ? Number(this.dataset.max) : Math.max(...values);
      const range = maxValue - minValue || 1;
      const x = (index) => padding.left + index * ((width - padding.left - padding.right) / (values.length - 1));
      const y = (value) => padding.top + (maxValue - value) * ((height - padding.top - padding.bottom) / range);
      const points = values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
      const unit = this.dataset.unit || '';
      const color = this.dataset.color || '#3f51b5';
      const title = this.dataset.title || '趋势图';
      const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => maxValue - ratio * range);

      const grid = ticks.map((tick) => {
        const tickY = y(tick);
        return `<line x1="${padding.left}" y1="${tickY}" x2="${width - padding.right}" y2="${tickY}" class="chart-grid" />
          <text x="${padding.left - 10}" y="${tickY + 4}" text-anchor="end" class="chart-axis">${escapeHtml(tick.toFixed(1))}${escapeHtml(unit)}</text>`;
      }).join('');
      const xLabels = labels.map((label, index) => `<text x="${x(index)}" y="${height - 18}" text-anchor="middle" class="chart-axis">${escapeHtml(label)}</text>`).join('');
      const dots = values.map((value, index) => `<circle cx="${x(index)}" cy="${y(value)}" r="4" fill="${escapeHtml(color)}"><title>${escapeHtml(labels[index])}: ${escapeHtml(value)}${escapeHtml(unit)}</title></circle>`).join('');

      this.classList.add('trend-chart');
      this.innerHTML = `<div class="trend-chart__title">${escapeHtml(title)}</div>
        <div class="trend-chart__scroll"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}">
          ${grid}
          <polyline points="${points}" fill="none" stroke="${escapeHtml(color)}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          ${dots}${xLabels}
        </svg></div>
        ${this.dataset.source ? `<div class="trend-chart__source">数据来源：${escapeHtml(this.dataset.source)}</div>` : ''}`;
    }
  }

  if (!customElements.get('risk-cards')) customElements.define('risk-cards', RiskCards);
  if (!customElements.get('trend-chart')) customElements.define('trend-chart', TrendChart);
})();
