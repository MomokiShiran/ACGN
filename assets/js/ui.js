/**
 * UI 模块 - 工具提示、消息提示、事件监听等
 */

import { qs, qsa, isPC } from './utils.js';

let scrollTimeout = null;

// 工具提示
export const initTooltips = selector => {
  if (typeof bootstrap !== 'undefined') {
    qsa(selector || '[data-bs-toggle="tooltip"]').forEach(
      el => new bootstrap.Tooltip(el, { trigger: 'hover' })
    );
  }
};

// 消息提示
export const showAlert = data => {
  const types = {
    1: ['成功', 'success', 'icon-adopt'],
    2: ['信息', 'info', 'icon-tishi'],
    3: ['警告', 'warning', 'icon-warning'],
    4: ['错误', 'danger', 'icon-close-circle'],
  };
  const config = types[data.status];
  if (!config) return;
  let placeholder = qs('.alert-placeholder.text-sm');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.className = 'alert-placeholder.text-sm';
    placeholder.style.cssText =
      'position:fixed;bottom:10px;right:10px;z-index:1000;text-align:right';
    document.body.appendChild(placeholder);
  }
  const alertBody = document.createElement('div');
  alertBody.className = 'alert-body';
  alertBody.innerHTML =
    '<div class="alert alert-' +
    config[1] +
    ' text-lg pr-4 pr-md-5" style="text-align:initial">' +
    '<i class="iconfont ' +
    config[2] +
    ' icon-lg" style="vertical-align:middle;margin-right:10px"></i>' +
    '<span style="vertical-align:middle">' +
    config[0] +
    '</span><br>' +
    '<span class="text-md" style="margin-left:30px;vertical-align:middle">' +
    (data.msg || '') +
    '</span></div>';
  alertBody.style.display = 'none';
  placeholder.appendChild(alertBody);

  alertBody.style.opacity = '0';
  alertBody.style.display = 'block';
  let fadeInOpacity = 0;
  const fadeIn = setInterval(() => {
    if (fadeInOpacity >= 1) {
      clearInterval(fadeIn);
      setTimeout(() => {
        let fadeOutOpacity = 1;
        const fadeOut = setInterval(() => {
          if (fadeOutOpacity <= 0) {
            clearInterval(fadeOut);
            alertBody.remove();
          } else {
            fadeOutOpacity -= 0.1;
            alertBody.style.opacity = fadeOutOpacity.toString();
          }
        }, 30);
      }, 3500);
    } else {
      fadeInOpacity += 0.1;
      alertBody.style.opacity = fadeInOpacity.toString();
    }
  }, 20);
};

// 初始化 UI 事件
export const initUI = ThemeManager => {
  document.addEventListener('click', e => {
    // 主题切换
    if (e.target.closest('.switch-dark-mode, .switch-mode')) {
      e.preventDefault();
      if (ThemeManager) ThemeManager.toggle();
    }
    // 返回顶部
    if (e.target.closest('.go-up, .go-to-up')) {
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
