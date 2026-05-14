/**
 * 数据加载模块
 */

import { resolvePath } from './utils.js';

let cachedData = null;
let loadingPromise = null;
const subscribers = [];

export const onDataLoaded = callback => {
  if (cachedData) {
    callback(cachedData);
  } else {
    subscribers.push(callback);
  }
};

export const loadData = async () => {
  if (cachedData) return cachedData;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const dataPath = resolvePath('data/sites.json');
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

export const getData = () => cachedData;
