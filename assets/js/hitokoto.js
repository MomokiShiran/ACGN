/**
 * 一言模块 - 加载和显示随机一言
 */

import { qs, qsa } from './utils.js';

// 一言 API
const HITOKOTO_API = 'https://v1.hitokoto.cn/';

// 获取一言数据
const fetchHitokoto = async () => {
  console.log('[Hitokoto] 正在请求一言 API:', HITOKOTO_API);
  try {
    const response = await fetch(HITOKOTO_API);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const data = await response.json();
    console.log(`[Hitokoto] 获取成功: ${data.hitokoto?.substring(0, 30)}...`);
    return data;
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

  console.log('[Hitokoto] 显示一言到元素');
  element.innerHTML = text;
};

// 初始化一言功能
export const initHitokoto = async () => {
  // 查找所有 hitokoto 元素
  const hitokotoElements = qsa('.hitokoto, #hitokoto');

  console.log('[Hitokoto] 找到', hitokotoElements.length, '个一言容器');
  
  if (hitokotoElements.length === 0) {
    console.log('[Hitokoto] 未找到容器，跳过初始化');
    return;
  }

  const hitokoto = await fetchHitokoto();

  if (hitokoto) {
    hitokotoElements.forEach(el => {
      displayHitokoto(hitokoto, el);
    });
  } else {
    console.log('[Hitokoto] 未获取到一言数据');
  }
};
