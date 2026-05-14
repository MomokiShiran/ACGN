/**
 * 侧边栏菜单渲染模块
 */

import { qs, BASE_URL } from './utils.js';
import { onDataLoaded, loadData } from './data-loader.js';

const genSideItem = c =>
  '<li class="sidebar-item"><a href="' + BASE_URL + '/index.html#' +
  c.id +
  '" class="sidebar-menu-link">' +
  '<i class="' +
  (c.icon || 'fas fa-link') +
  ' icon-fw icon-lg me-2"></i>' +
  '<span class="sidebar-menu-text">' +
  c.name +
  '</span></a></li>';

const genSideSubItem = c =>
  '<li class="sidebar-item"><a href="' + BASE_URL + '/index.html#' +
  c.id +
  '" class="sidebar-menu-link">' +
  '<span class="sidebar-menu-text">' +
  c.name +
  '</span></a></li>';

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

export const initSidebar = () => {
  onDataLoaded(renderSidebar);
  loadData();
};
