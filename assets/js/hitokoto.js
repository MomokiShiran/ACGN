/**
 * 一言模块 - 加载和显示随机一言
 */

import { qs, qsa } from './utils.js';

// 一言 API
const HITOKOTO_API = 'https://v1.hitokoto.cn/';

// 获取一言数据
const fetchHitokoto = async () => {
  try {
    const response = await fetch(HITOKOTO_API);
    if (!response.ok) throw new Error('API 请求失败');
    return await response.json();
  } catch (err) {
    console.error('[Hitokoto] 获取一言失败:', err);
    return null;
  }
};

// 显示一言
const displayHitokoto = (hitokoto, element) => {
  if (!hitokoto || !element) return;

  let text = hitokoto.hitokoto || '';
  if (hitokoto.from) {
    text += ` —— <span style="color: #666;">${hitokoto.from}</span>`;
  }

  element.innerHTML = text;
};

// 初始化一言功能
export const initHitokoto = async () => {
  // 查找所有 hitokoto 元素
  const hitokotoElements = qsa('.hitokoto, #hitokoto');

  if (hitokotoElements.length === 0) return;

  const hitokoto = await fetchHitokoto();

  hitokotoElements.forEach(el => {
    displayHitokoto(hitokoto, el);
  });
};
