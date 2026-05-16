/**
 * 工具提示模块
 */

import { qsa } from './utils.js';

// 缓存已初始化的 tooltip 实例
const tooltipInstances = new WeakMap();

// 初始化 tooltips
export const initTooltips = selector => {
  if (typeof bootstrap === 'undefined') return;
  qsa(selector || '[data-bs-toggle="tooltip"]').forEach(el => {
    if (tooltipInstances.has(el)) return;
    const tooltip = new bootstrap.Tooltip(el, { trigger: 'hover' });
    tooltipInstances.set(el, tooltip);
  });
};

// 事件委托：自动处理动态元素
document.addEventListener('mouseover', e => {
  const el = e.target.closest('[data-bs-toggle="tooltip"]');
  if (el && typeof bootstrap !== 'undefined' && !tooltipInstances.has(el)) {
    const tooltip = new bootstrap.Tooltip(el, { trigger: 'hover' });
    tooltipInstances.set(el, tooltip);
  }
});
