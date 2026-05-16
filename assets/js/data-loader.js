/**
 * 数据加载模块
 */

let cachedData = null;
let loadingPromise = null;
const subscribers = [];

// 注册数据加载完成回调
export const onDataLoaded = callback => {
  if (cachedData) {
    console.log('[DataLoader] 使用缓存数据，立即回调');
    callback(cachedData);
  } else {
    console.log(`[DataLoader] 订阅数据加载完成事件，当前订阅数: ${subscribers.length + 1}`);
    subscribers.push(callback);
  }
};

// 加载站点数据
export const loadData = async () => {
  if (cachedData) {
    console.log('[DataLoader] 返回已缓存的数据');
    return cachedData;
  }
  if (loadingPromise) {
    console.log('[DataLoader] 数据正在加载中，等待现有请求完成');
    return loadingPromise;
  }

  console.log('[DataLoader] 开始加载站点数据');
  loadingPromise = (async () => {
    try {
      const dataPath = new URL('../../data/sites.json', import.meta.url).href;
      console.log('[DataLoader] 正在请求:', dataPath);
      const response = await fetch(dataPath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('[DataLoader] 数据请求成功，解析 JSON...');
      cachedData = await response.json();

      console.log('[DataLoader] 数据解析完成，站点数量:', cachedData?.sites?.length || 0);

      console.log('[DataLoader] 通知', subscribers.length, '个订阅者');
      subscribers.forEach(callback => callback(cachedData));
      subscribers.length = 0;

      console.log('[DataLoader] 数据加载完成');
      return cachedData;
    } catch (err) {
      console.error('[DataLoader] 加载数据失败:', err);
      loadingPromise = null;
      throw err;
    }
  })();
  return loadingPromise;
};

// 获取已缓存的数据
export const getData = () => {
  console.log('[DataLoader] 获取缓存数据:', cachedData ? '已存在' : '不存在');
  return cachedData;
};
