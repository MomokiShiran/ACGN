/**
 * Sidebar.js - 动态侧边栏菜单渲染
 */

(function () {
  'use strict';

  const { qs } = window.utils || { qs: sel => document.querySelector(sel) };

  const renderSidebar = data => {
    const mainCategories = data.categories;

    let html = '';
    mainCategories.forEach(cat => {
      if (cat.id === 'tool-collection' && cat.children && cat.children.length > 0) {
        const subHtml = cat.children.map(c => genSideSubItem(c)).join('');
        html +=
          '<li class="sidebar-item">' +
          '<a href="javascript:;" class="sidebar-menu-link">' +
          '<i class="' +
          (cat.icon || 'fas fa-toolbox') +
          ' icon-fw icon-lg me-2"></i>' +
          '<span class="sidebar-menu-text">' +
          cat.name +
          '</span>' +
          '<i class="iconfont icon-arrow-r-m sidebar-more sidebar-more-icon text-sm"></i>' +
          '</a><ul class="sidebar-submenu">' +
          subHtml +
          '</ul></li>';
      } else if (!cat.children || cat.children.length === 0) {
        html += genSideItem(cat);
      }
    });

    const navList = qs('#sidebar-nav-list');
    if (navList) navList.innerHTML = html;

    [
      'sidebar-skeleton',
      'sidebar-content',
      'sidebar-bottom-skeleton',
      'sidebar-bottom-content',
    ].forEach((id, i) => {
      const el = qs('#' + id);
      if (el) el.classList.toggle('skeleton-hidden', i % 2 === 0);
    });
  };

  const genSideItem = c =>
    '<li class="sidebar-item"><a href="/index.html#' +
    c.id +
    '" class="sidebar-menu-link">' +
    '<i class="' +
    (c.icon || 'fas fa-link') +
    ' icon-fw icon-lg me-2"></i>' +
    '<span class="sidebar-menu-text">' +
    c.name +
    '</span></a></li>';

  const genSideSubItem = c =>
    '<li class="sidebar-item"><a href="/index.html#' +
    c.id +
    '" class="sidebar-menu-link">' +
    '<span class="sidebar-menu-text">' +
    c.name +
    '</span></a></li>';

  const init = () => {
    if (window.DataLoader) {
      window.DataLoader.onLoaded(renderSidebar);
      window.DataLoader.load();
    }
  };

  if (window.loader) {
    window.addEventListener('app:loaded', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
