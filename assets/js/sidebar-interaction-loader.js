/**
 * 侧边栏交互模块 - 自定义实现，移除 Bootstrap 依赖
 */

import { qs, qsa, debounce } from './utils.js';

let isMin = false;
let isMobileMin = false;

// 显示移动端侧边栏
const showSidebar = () => {
  const sidebar = qs('.sidebar');
  if (sidebar) {
    sidebar.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

// 隐藏移动端侧边栏
const hideSidebar = () => {
  const sidebar = qs('.sidebar');
  if (sidebar) {
    sidebar.classList.remove('show');
    document.body.style.overflow = '';
  }
};

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
    sidebar.style.width = `${width}px`;
  } else {
    const startWidth = parseInt(window.getComputedStyle(sidebar).width || '220', 10);
    const startTime = performance.now();
    const animate = time => {
      const progress = Math.min((time - startTime) / 200, 1);
      sidebar.style.width = `${startWidth + (width - startWidth) * progress}px`;
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
    // 移动端窗口改变时隐藏侧边栏
    hideSidebar();
  }
};

// 初始化侧边栏事件
export const initSidebarInteraction = () => {
  // 移动端侧边栏切换按钮
  const sidebarToggle = qs('#sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const sidebar = qs('.sidebar');
      if (sidebar?.classList.contains('show')) {
        hideSidebar();
      } else {
        showSidebar();
      }
    });
  }



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
    const sidebar = qs('.sidebar');
    const isSidebarToggle = e.target.closest('#sidebar-toggle');
    const isSidebarInner = sidebar?.querySelector('.sidebar-nav-inner')?.contains(e.target);
    
    // 点击侧边栏外部区域关闭
    if (sidebar?.classList.contains('show') && !isSidebarToggle && !isSidebarInner) {
      hideSidebar();
    }
    
    // 点击链接时关闭移动端侧边栏（排除侧边栏切换按钮）
    const link = e.target.closest('a');
    if (link && link.getAttribute('target') !== '_blank' && !isSidebarToggle) {
      if (sidebar?.classList.contains('show')) {
        hideSidebar();
      }
    }
    
    // 迷你按钮
    if (e.target.closest('.mini-button')) {
      triggerLsmMini();
    }
  });

  // ESC键关闭侧边栏
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebar = qs('.sidebar');
      if (sidebar?.classList.contains('show')) {
        hideSidebar();
      }
    }
  });
  
  window.addEventListener('resize', debounce(triggerResizable, 200));
};
