/**
 * UI 模块 - 事件监听等核心功能
 */

import { qs } from './utils.js';

let scrollTimeout = null;

// 平滑滚动到指定元素
const smoothScrollTo = targetElement => {
  const headerHeight = 74; // 头部导航栏高度
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

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
    // 锚点链接平滑滚动
    const anchorLink = e.target.closest('a[href^="#"]');
    if (anchorLink) {
      const targetId = anchorLink.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          smoothScrollTo(targetElement);
          // 更新 URL 哈希但不跳转
          history.pushState(null, null, targetId);
        }
      }
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
