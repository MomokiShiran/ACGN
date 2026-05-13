/**
 * Loader.js - 动态模块加载器
 */

(function () {
  'use strict';

  const loaded = new Set();
  const loading = new Map();

  const getPathPrefix = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/index.html') return '';
    const pathSegments = currentPath
      .split('/')
      .filter(segment => segment.length > 0 && !segment.endsWith('.html'));
    return '../'.repeat(pathSegments.length);
  };

  const loadScript = src => {
    const prefix = getPathPrefix();
    const fullSrc = prefix + src;
    if (loading.has(fullSrc)) return loading.get(fullSrc);
    if (loaded.has(fullSrc)) return Promise.resolve();

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = fullSrc;
      script.async = false;
      script.onload = () => {
        loaded.add(fullSrc);
        loading.delete(fullSrc);
        resolve();
      };
      script.onerror = () => {
        loading.delete(fullSrc);
        reject(new Error(`Failed to load ${fullSrc}`));
      };
      document.head.appendChild(script);
    });

    loading.set(fullSrc, promise);
    return promise;
  };

  const detectAndLoad = async () => {
    const path = window.location.pathname;

    await loadScript('assets/js/core.js');

    if (path === '/' || path === '/index.html') {
      await loadScript('assets/js/sidebar.js');
      await loadScript('assets/js/dynamic.js');
    } else if (path.endsWith('/sites/detail.html')) {
      await loadScript('assets/js/sidebar.js');
      await loadScript('assets/js/site-detail.js');
    } else {
      await loadScript('assets/js/sidebar.js');
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.dispatchEvent(new CustomEvent('app:loaded'));
      });
    } else {
      window.dispatchEvent(new CustomEvent('app:loaded'));
    }
  };

  detectAndLoad();
})();
