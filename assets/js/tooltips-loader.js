/**
 * 自定义工具提示模块
 * 完全不依赖Bootstrap的实现
 */

import { qsa } from './utils.js';

// 缓存已初始化的tooltip实例
const tooltipInstances = new WeakMap();

// CustomTooltip类
class CustomTooltip {
  constructor(element, options = {}) {
    this.element = element;
    this.title = element.getAttribute('title') || element.getAttribute('data-bs-title') || '';
    this.placement = element.getAttribute('data-bs-placement') || 'top';
    this.customPlacement = options.placement || this.placement;
    
    // 清理元素的title属性，避免原生tooltip
    if (element.getAttribute('title')) {
      element.setAttribute('data-original-title', element.getAttribute('title'));
      element.removeAttribute('title');
    }
    
    this.tooltipEl = null;
    this.visible = false;
    this.hideTimeout = null;
    
    // 绑定事件
    this.handleMouseEnter = this.show.bind(this);
    this.handleMouseLeave = this.delayedHide.bind(this);
    this.handleTooltipMouseEnter = this.cancelHide.bind(this);
    this.handleTooltipMouseLeave = this.hide.bind(this);
    
    this.init();
  }
  
  init() {
    // 使用mouseenter/mouseleave代替mouseover/mouseout，避免冒泡导致的闪烁
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }
  
  createTooltip() {
    // 创建tooltip元素
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = `custom-tooltip bs-tooltip-${this.customPlacement}`;
    this.tooltipEl.innerHTML = `
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">${this.title}</div>
    `;
    
    // 添加tooltip自身的事件监听器，支持鼠标移动到tooltip上保持显示
    this.tooltipEl.addEventListener('mouseenter', this.handleTooltipMouseEnter);
    this.tooltipEl.addEventListener('mouseleave', this.handleTooltipMouseLeave);
    
    // 将tooltip添加到body
    document.body.appendChild(this.tooltipEl);
  }
  
  // 延迟隐藏
  delayedHide() {
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, 100); // 100ms的延迟
  }
  
  // 取消隐藏
  cancelHide() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  
  updatePosition() {
    if (!this.tooltipEl) return;
    
    // 先隐藏tooltip以获取准确的尺寸
    this.tooltipEl.style.visibility = 'hidden';
    this.tooltipEl.style.display = 'block';
    
    const elementRect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    
    let top, left;
    
    switch (this.customPlacement) {
      case 'bottom':
        top = elementRect.bottom + window.scrollY + 8;
        left = elementRect.left + window.scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = elementRect.top + window.scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.left + window.scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = elementRect.top + window.scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.right + window.scrollX + 8;
        break;
      case 'top':
      default:
        top = elementRect.top + window.scrollY - tooltipRect.height - 8;
        left = elementRect.left + window.scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
    }
    
    // 边界检查 - 确保tooltip不超出视口
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (left < 16) {
      left = 16;
    } else if (left + tooltipRect.width > viewportWidth - 16) {
      left = viewportWidth - tooltipRect.width - 16;
    }
    
    // 设置位置
    this.tooltipEl.style.position = 'absolute';
    this.tooltipEl.style.top = `${top}px`;
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.transform = 'none'; // 移除CSS中的transform，使用JS计算的位置
    this.tooltipEl.style.visibility = 'visible';
  }
  
  show() {
    // 取消任何待处理的隐藏
    this.cancelHide();
    
    if (this.visible || !this.title) return;
    
    if (!this.tooltipEl) {
      this.createTooltip();
    }
    
    // 先添加到DOM但不显示
    this.tooltipEl.style.display = 'block';
    this.tooltipEl.style.opacity = '0';
    
    // 使用requestAnimationFrame确保DOM更新后再计算位置
    requestAnimationFrame(() => {
      // 更新位置
      this.updatePosition();
      
      // 显示tooltip
      this.tooltipEl.classList.add('show');
      this.tooltipEl.style.opacity = '';
      this.visible = true;
    });
  }
  
  hide() {
    // 清理延迟隐藏的定时器
    this.cancelHide();
    
    if (!this.visible || !this.tooltipEl) return;
    
    this.tooltipEl.classList.remove('show');
    this.visible = false;
    
    // 移除元素
    if (this.tooltipEl && this.tooltipEl.parentNode) {
      // 先移除tooltip自身的事件监听器
      this.tooltipEl.removeEventListener('mouseenter', this.handleTooltipMouseEnter);
      this.tooltipEl.removeEventListener('mouseleave', this.handleTooltipMouseLeave);
      
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
      this.tooltipEl = null;
    }
  }
  
  destroy() {
    this.hide();
    // 移除事件监听器
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    // 恢复title属性
    const originalTitle = this.element.getAttribute('data-original-title');
    if (originalTitle) {
      this.element.setAttribute('title', originalTitle);
      this.element.removeAttribute('data-original-title');
    }
  }
}

// 初始化tooltips
export const initTooltips = (selector) => {
  const targetSelector = selector || '[data-bs-toggle="tooltip"]';
  qsa(targetSelector).forEach(el => {
    if (tooltipInstances.has(el)) return;
    
    const tooltip = new CustomTooltip(el, {
      placement: el.getAttribute('data-bs-placement') || 'top'
    });
    tooltipInstances.set(el, tooltip);
  });
};

// 事件委托：自动处理动态元素
document.addEventListener('mouseenter', (e) => {
  if (!e.target || typeof e.target.closest !== 'function') return;
  const el = e.target.closest('[data-bs-toggle="tooltip"]');
  if (el && !tooltipInstances.has(el)) {
    const tooltip = new CustomTooltip(el, {
      placement: el.getAttribute('data-bs-placement') || 'top'
    });
    tooltipInstances.set(el, tooltip);
    
    // 由于事件已经触发，我们需要手动调用一次show
    tooltip.show();
  }
}, true); // 使用捕获阶段
