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

// 路径解析 - 使用相对于根目录的绝对路径
export const resolvePath = relativePath => {
  // 始终使用相对于根目录的路径
  return '/' + relativePath;
};

// 防抖函数
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};
