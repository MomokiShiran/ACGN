/**
 * 侧边栏交互模块
 */

import { qs, qsa, debounce } from './utils.js';

let isMin = false;
let isMobileMin = false;
let sidebarPopupTimeout = null;

// 侧边栏最小化
export const triggerLsmMini = (noAnim = false) => {
  const checkbox = qs('.header-mini-btn input[type="checkbox"]');
  const sidebar = qs('.sidebar-nav');
  if (!sidebar) return;

  const isChecked = checkbox?.checked ?? true;
  const width = isChecked ? 150 : 60;

  if (isChecked) {
    sidebar.classList.remove('mini-sidebar');
    qsa('.sidebar-menu ul ul').forEach(el => (el.style.display = 'none'));
  } else {
    qsa('.sidebar-item.sidebar-show').forEach(el => el.classList.remove('sidebar-show'));
    qsa('.sidebar-menu ul').forEach(el => el.removeAttribute('style'));
    sidebar.classList.add('mini-sidebar');
  }

  if (noAnim) {
    sidebar.style.width = width + 'px';
  } else {
    const startWidth = parseInt(window.getComputedStyle(sidebar).width || '220', 10);
    const startTime = performance.now();
    const animate = time => {
      const progress = Math.min((time - startTime) / 200, 1);
      sidebar.style.width = startWidth + (width - startWidth) * progress + 'px';
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
};

// 根据窗口大小调整侧边栏
export const triggerResizable = (noAnim = false) => {
  const winWidth = window.innerWidth;
  if (!isMin && winWidth > 767.98 && winWidth < 1024) {
    const checkbox = qs('.header-mini-btn input[type="checkbox"]');
    if (checkbox) checkbox.checked = false;
    triggerLsmMini(noAnim);
    isMin = true;
    if (isMobileMin) {
      qs('.sidebar')?.classList.add('mini-sidebar');
      isMobileMin = false;
    }
  } else if ((isMin && winWidth >= 1024) || (isMobileMin && !isMin && winWidth >= 1024)) {
    const checkbox = qs('.header-mini-btn input[type="checkbox"]');
    if (checkbox) checkbox.checked = true;
    triggerLsmMini(noAnim);
    isMin = false;
    isMobileMin = false;
  } else if (winWidth < 767.98) {
    const sidebar = qs('.sidebar');
    if (sidebar && sidebar.classList.contains('mini-sidebar')) {
      sidebar.classList.remove('mini-sidebar');
      isMobileMin = true;
      isMin = false;
    }
  }
};

// 初始化侧边栏事件
export const initSidebarInteraction = () => {
  // 迷你侧边栏hover
  document.addEventListener('mouseover', e => {
    const sidebarNav = qs('.sidebar-nav.mini-sidebar');
    if (!sidebarNav) return;

    const items = qsa(
      '.sidebar-menu ul:first-of-type > li, .flex-bottom ul:first-of-type > li',
      sidebarNav
    );
    let target = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].contains(e.target)) {
        target = items[i];
        break;
      }
    }

    if (target) {
      const offset = target.closest('.flex-bottom') ? -3 : 2;
      let popup = qs('.second.sidebar-popup');
      if (!popup) {
        popup = document.createElement('div');
        popup.className = 'second.sidebar-popup sidebar-menu-inner text-sm';
        popup.innerHTML = '<div></div>';
        document.body.appendChild(popup);
      }
      const inner = popup.querySelector('div');
      if (inner) inner.innerHTML = target.innerHTML;
      popup.style.display = 'block';
      const top = target.getBoundingClientRect().top + offset;
      const popupHeight = popup.offsetHeight;
      popup.style.top =
        (window.innerHeight - top <= 0 ? window.innerHeight - popupHeight - 8 : top) + 'px';
    }
  });

  document.addEventListener('mouseout', e => {
    const sidebarNav = qs('.sidebar-nav.mini-sidebar');
    const firstMenu = sidebarNav ? qs('.sidebar-menu ul:first-of-type', sidebarNav) : null;
    const popup = qs('.second.sidebar-popup');

    const overMenu = firstMenu && firstMenu.contains(e.relatedTarget);
    const overPopup = popup && popup.contains(e.relatedTarget);

    if (!overMenu && !overPopup) {
      clearTimeout(sidebarPopupTimeout);
      sidebarPopupTimeout = setTimeout(() => {
        const popupEl = qs('.second.sidebar-popup');
        if (popupEl) popupEl.style.display = 'none';
      }, 100);
    }
  });

  // 事件监听
  document.addEventListener('click', e => {
    // 侧边栏菜单
    const menuLink = e.target.closest('.sidebar-menu-inner a');
    if (menuLink && !qs('.sidebar-nav')?.classList.contains('mini-sidebar')) {
      const li = menuLink.closest('.sidebar-item');
      if (li) {
        qsa('.sidebar-item', li).forEach(item => item.classList.remove('sidebar-show'));
        const nextUl = menuLink.nextElementSibling;
        if (nextUl && nextUl.tagName === 'UL') {
          const hidden = nextUl.style.display === 'none' || !nextUl.style.display;
          nextUl.style.display = hidden ? 'block' : 'none';
          li.classList.toggle('sidebar-show', hidden);
        }
      }
    }
    // 侧边栏关闭
    const link = e.target.closest('a');
    if (link && link.getAttribute('target') !== '_blank') {
      const sidebar = qs('.sidebar');
      if (sidebar?.classList.contains('show') && typeof bootstrap !== 'undefined') {
        bootstrap.Modal.getInstance(sidebar)?.hide();
      }
    }
    // 迷你按钮
    if (e.target.closest('.mini-button')) {
      triggerLsmMini();
    }
  });

  window.addEventListener('resize', debounce(triggerResizable, 200));
};
