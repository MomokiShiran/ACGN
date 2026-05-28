/**
 * UI 模块 - 事件监听等核心功能
 */

import { qs } from './utils.js';

let scrollTimeout = null;

// 初始化 UI 事件
export const initUI = ThemeManager => {
  document.addEventListener('click', e => {
    // 主题切换
    if (e.target.closest('.switch-dark-mode')) {
      e.preventDefault();
      if (ThemeManager) ThemeManager.toggle();
    }
    // 返回顶部
    if (e.target.closest('.go-up')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      const goUp = qs('.go-up');
      if (goUp) goUp.style.display = window.scrollY >= 50 ? 'block' : 'none';
      scrollTimeout = null;
    }, 50);
  });
};
