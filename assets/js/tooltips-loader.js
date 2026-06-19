// 自定义工具提示模块

import { qsa } from './utils.js';

// 使用WeakMap存储元素对应的tooltip实例，键为DOM元素
const tooltipInstances = new WeakMap();

// 创建tooltip实例

function createTooltip(element, options = {}) {
  const title = element.getAttribute('title') || element.getAttribute('data-bs-title') || '';
  const placement = options.placement || element.getAttribute('data-bs-placement') || 'top';

  let tooltipEl = null;
  let visible = false;
  let hideTimeout = null;

  // 提取title属性，兼容Bootstrap的data-bs-title属性
  if (element.getAttribute('title')) {
    element.setAttribute('data-original-title', element.getAttribute('title'));
    element.removeAttribute('title');
  }

  // 计算tooltip位置
  // 优先使用用户指定的方向，根据元素位置和tooltip尺寸计算最终坐标
  // 同时处理视口边界溢出，确保tooltip始终在可视区域内
  const calcPosition = () => {
    tooltipEl.style.visibility = 'hidden';
    tooltipEl.style.display = 'block';

    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const offset = 8;
    let top, left;

    switch (placement) {
      case 'bottom':
        top = elementRect.bottom + window.scrollY + offset;
        left = elementRect.left + window.scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = elementRect.top + window.scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.left + window.scrollX - tooltipRect.width - offset;
        break;
      case 'right':
        top = elementRect.top + window.scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.right + window.scrollX + offset;
        break;
      case 'top':
      default:
        top = elementRect.top + window.scrollY - tooltipRect.height - offset;
        left = elementRect.left + window.scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
    }

    const padding = 16;
    const viewportWidth = window.innerWidth;
    if (left < padding) left = padding;
    else if (left + tooltipRect.width > viewportWidth - padding) left = viewportWidth - tooltipRect.width - padding;

    tooltipEl.style.visibility = 'visible';
    return { top, left };
  };

  // 取消待执行的隐藏操作
  const cancelHide = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  };

  // 显示tooltip
  const show = () => {
    cancelHide();
    if (visible || !title) return;

    tooltipEl = document.createElement('div');
    tooltipEl.className = `custom-tooltip bs-tooltip-${placement}`;
    tooltipEl.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${title}</div>`;
    document.body.appendChild(tooltipEl);
    tooltipEl.style.opacity = '0';

    requestAnimationFrame(() => {
      const pos = calcPosition();
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.top = `${pos.top}px`;
      tooltipEl.style.left = `${pos.left}px`;
      tooltipEl.style.transform = 'none';
      tooltipEl.classList.add('show');
      tooltipEl.style.opacity = '';
      visible = true;
    });
  };

  // 隐藏tooltip
  const hide = () => {
    if (!visible || !tooltipEl) return;

    tooltipEl.classList.remove('show');
    if (tooltipEl.parentNode) tooltipEl.parentNode.removeChild(tooltipEl);
    tooltipEl = null;
    visible = false;
  };

  const handleMouseEnter = show;
  const handleMouseLeave = () => {
    hideTimeout = setTimeout(hide, 100);
  };

  // 绑定鼠标事件
  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  // 销毁tooltip实例，移除事件监听并恢复原始title属性
  const destroy = () => {
    cancelHide();
    hide();
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    const originalTitle = element.getAttribute('data-original-title');
    if (originalTitle) {
      element.setAttribute('title', originalTitle);
      element.removeAttribute('data-original-title');
    }
  };

  return { show, hide, destroy };
}

// 初始化页面中的所有tooltip元素
export const initTooltips = (selector) => {
  const targetSelector = selector || '[data-bs-toggle="tooltip"]';
  qsa(targetSelector).forEach((el) => {
    // 避免重复初始化
    if (tooltipInstances.has(el)) return;
    const tooltip = createTooltip(el, { placement: el.getAttribute('data-bs-placement') || 'top' });
    tooltipInstances.set(el, tooltip);
  });
};

// 事件委托：自动初始化鼠标悬停到的tooltip元素
// 使用捕获阶段监听mouseenter事件，实现动态元素的tooltip支持
document.addEventListener('mouseenter', (e) => {
  if (!e.target || typeof e.target.closest !== 'function') return;
  const el = e.target.closest('[data-bs-toggle="tooltip"]');
  if (el && !tooltipInstances.has(el)) {
    const tooltip = createTooltip(el, { placement: el.getAttribute('data-bs-placement') || 'top' });
    tooltipInstances.set(el, tooltip);
    tooltip.show();
  }
}, true);
