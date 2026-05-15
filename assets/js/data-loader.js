/**
 * 数据加载模块
 */

let cachedData = null;
let loadingPromise = null;
const subscribers = [];

// 注册数据加载完成回调
export const onDataLoaded = callback => {
  if (cachedData) {
    callback(cachedData);
  } else {
    subscribers.push(callback);
  }
};

// 加载站点数据
export const loadData = async () => {
  if (cachedData) return cachedData;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const dataPath = './data/sites.json';
      const response = await fetch(dataPath);
      cachedData = await response.json();
      subscribers.forEach(callback => callback(cachedData));
      subscribers.length = 0;
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
export const getData = () => cachedData;
