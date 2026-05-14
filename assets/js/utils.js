/**
 * 工具函数模块
 */

// 选择器工具
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// 设备检测
export const isPC = () =>
  !['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'].some(
    agent => navigator.userAgent.includes(agent)
  );

// 路径解析 - 获取相对于根目录的路径
export const resolvePath = relativePath => {
  const currentPath = window.location.pathname;
  // 判断是否在根目录（/ 或 /index.html）
  if (currentPath === '/' || currentPath === '/index.html') {
    return relativePath;
  }
  // 处理子目录
  const pathSegments = currentPath
    .split('/')
    .filter(segment => segment.length > 0 && !segment.endsWith('.html'));
  return '../'.repeat(pathSegments.length) + relativePath;
};

// 防抖函数
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};
