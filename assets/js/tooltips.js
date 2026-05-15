/**
 * 工具提示模块
 */

import { qsa } from './utils.js';

// 初始化工具提示
export const initTooltips = selector => {
  if (typeof bootstrap !== 'undefined') {
    qsa(selector || '[data-bs-toggle="tooltip"]').forEach(
      el => new bootstrap.Tooltip(el, { trigger: 'hover' })
    );
  }
};
