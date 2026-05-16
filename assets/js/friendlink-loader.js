/**
 * 友情链接数据加载模块
 */

let cachedData = null;
let loadingPromise = null;
const subscribers = [];

export const onFriendLinksLoaded = callback => {
  if (cachedData) {
    console.log('[FriendLinks] 使用缓存数据，立即回调');
    callback(cachedData);
  } else {
    console.log(`[FriendLinks] 订阅数据加载完成事件，当前订阅数: ${subscribers.length + 1}`);
    subscribers.push(callback);
  }
};

export const loadFriendLinks = async () => {
  if (cachedData) {
    console.log('[FriendLinks] 返回已缓存的数据');
    return cachedData;
  }
  if (loadingPromise) {
    console.log('[FriendLinks] 数据正在加载中，等待现有请求完成');
    return loadingPromise;
  }

  console.log('[FriendLinks] 开始加载友情链接数据');
  loadingPromise = (async () => {
    try {
      const dataPath = new URL('../../data/friends.json', import.meta.url).href;
      console.log('[FriendLinks] 正在请求:', dataPath);
      const response = await fetch(dataPath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('[FriendLinks] 数据请求成功，解析 JSON...');
      cachedData = await response.json();

      console.log('[FriendLinks] 数据解析完成，友情链接数量:', cachedData?.links?.length || 0);

      console.log('[FriendLinks] 通知', subscribers.length, '个订阅者');
      subscribers.forEach(callback => callback(cachedData));
      subscribers.length = 0;

      console.log('[FriendLinks] 数据加载完成');
      return cachedData;
    } catch (err) {
      console.error('[FriendLinks] 加载数据失败:', err);
      loadingPromise = null;
      throw err;
    }
  })();
  return loadingPromise;
};

export const getFriendLinks = () => {
  console.log('[FriendLinks] 获取缓存数据:', cachedData ? '已存在' : '不存在');
  return cachedData;
};
