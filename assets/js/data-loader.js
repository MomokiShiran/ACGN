/**
 * DataLoader.js - 统一数据加载管理
 * 避免 sidebar 和 dynamic 重复加载 sites.json
 */

(function () {
  'use strict';

  const { qs, resolvePath } = window.utils || {
    qs: (sel) => document.querySelector(sel),
    resolvePath: (p) => p
  };

  let cachedData = null;
  let loadingPromise = null;
  const subscribers = [];

  // 订阅数据加载完成事件
  const onDataLoaded = (callback) => {
    if (cachedData) {
      callback(cachedData);
    } else {
      subscribers.push(callback);
    }
  };

  // 加载数据（只加载一次）
  const loadData = async () => {
    // 如果已经有缓存，直接返回
    if (cachedData) {
      return cachedData;
    }

    // 如果正在加载中，等待完成
    if (loadingPromise) {
      return loadingPromise;
    }

    // 开始加载
    loadingPromise = (async () => {
      try {
        const dataPath = resolvePath('data/sites.json');
        const response = await fetch(dataPath);
        cachedData = await response.json();

        // 通知所有订阅者
        subscribers.forEach(callback => callback(cachedData));
        subscribers.length = 0; // 清空订阅者列表

        return cachedData;
      } catch (err) {
        console.error('[DataLoader] 加载数据失败:', err);
        loadingPromise = null;
        throw err;
      }
    })();

    return loadingPromise;
  };

  // 暴露到全局
  window.DataLoader = {
    load: loadData,
    onLoaded: onDataLoaded,
    get: () => cachedData
  };
})();
