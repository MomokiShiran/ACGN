/**
 * App.js - 兼容入口文件
 * 现在优先使用 loader.js 动态加载，此文件保留向后兼容性
 */

(function () {
  'use strict';

  // 如果 loader 不存在，回退到直接加载所有模块
  if (!window.loader) {
    const scripts = [
      'assets/js/core.js',
      'assets/js/data-loader.js',
      'assets/js/sidebar.js'
    ];

    // 获取路径前缀
    const getPathPrefix = () => {
      const currentPath = window.location.pathname;
      // 判断是否在根目录（/ 或 /index.html）
      if (currentPath === '/' || currentPath === '/index.html') {
        return '';
      }
      // 处理子目录
      const pathSegments = currentPath
        .split('/')
        .filter(segment => segment.length > 0 && !segment.endsWith('.html'));
      return '../'.repeat(pathSegments.length);
    };

    const prefix = getPathPrefix();
    const path = window.location.pathname;
    const isIndex = path === '/' || path === '/index.html';
    const isDetail = path.endsWith('/sites/detail.html');

    if (isIndex) {
      scripts.push('assets/js/dynamic.js');
    }
    if (isDetail) {
      scripts.push('assets/js/site-detail.js');
    }

    // 同步加载脚本
    const loadSync = (index) => {
      if (index >= scripts.length) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initApp);
        } else {
          initApp();
        }
        return;
      }

      const script = document.createElement('script');
      script.src = prefix + scripts[index];
      script.async = false;
      script.onload = () => loadSync(index + 1);
      script.onerror = () => loadSync(index + 1);
      document.head.appendChild(script);
    };

    const initApp = () => {
      // 初始化
      if (window.ThemeManager) window.ThemeManager.init();
      if (window.triggerResizable) window.triggerResizable(true);
      if (window.initTooltips && window.isPC) {
        window.initTooltips(window.isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
      }
    };

    loadSync(0);
  }
})();
