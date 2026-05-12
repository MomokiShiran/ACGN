/**
 * Loader.js - 动态模块加载器
 * 根据页面需求动态加载对应的 JS 模块
 */

(function () {
  'use strict';

  // 模块依赖关系配置
  const modules = {
    'core': { src: 'assets/js/core.js', deps: [] },
    'data-loader': { src: 'assets/js/data-loader.js', deps: ['core'] },
    'sidebar': { src: 'assets/js/sidebar.js', deps: ['core', 'data-loader'] },
    'dynamic': { src: 'assets/js/dynamic.js', deps: ['core', 'data-loader'] },
    'site-detail': { src: 'assets/js/site-detail.js', deps: ['core', 'data-loader'] },
    'features': { src: 'assets/js/features.js', deps: ['core'] }
  };

  const loaded = new Set();
  const loading = new Map();

  // 获取当前路径相对于根目录的相对路径前缀
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

  // 加载单个脚本
  const loadScript = (src) => {
    const prefix = getPathPrefix();
    const fullSrc = prefix + src;

    if (loading.has(fullSrc)) {
      return loading.get(fullSrc);
    }
    if (loaded.has(fullSrc)) {
      return Promise.resolve();
    }

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

  // 递归加载模块及其依赖
  const loadModule = async (moduleName) => {
    const module = modules[moduleName];
    if (!module) {
      console.warn(`[Loader] 模块未找到: ${moduleName}`);
      return;
    }

    // 先加载依赖
    for (const dep of module.deps) {
      await loadModule(dep);
    }

    // 加载当前模块
    await loadScript(module.src);
  };

  // 页面模块配置
  const pageModules = {
    'index': ['core', 'data-loader', 'sidebar', 'dynamic'],
    'site-detail': ['core', 'data-loader', 'sidebar', 'site-detail'],
    'default': ['core', 'data-loader', 'sidebar']
  };

  // 检测当前页面并加载对应模块
  const detectAndLoad = async () => {
    const path = window.location.pathname;
    let moduleSet;

    // 判断是否是根目录的首页
    if (path === '/' || path === '/index.html') {
      moduleSet = 'index';
    } else if (path.endsWith('/sites/detail.html')) {
      moduleSet = 'site-detail';
    } else {
      moduleSet = 'default';
    }

    // 加载页面模块（core 会被作为依赖自动加载）
    const pageMods = pageModules[moduleSet] || pageModules['default'];
    for (const mod of pageMods) {
      await loadModule(mod);
    }

    // 触发 DOMContentLoaded 后的初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.dispatchEvent(new CustomEvent('app:loaded'));
      });
    } else {
      window.dispatchEvent(new CustomEvent('app:loaded'));
    }
  };

  // 暴露接口
  window.loader = {
    loadModule,
    loadScript,
    detectAndLoad
  };

  // 自动启动
  detectAndLoad();
})();
