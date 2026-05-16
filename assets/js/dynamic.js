/**
 * 首页站点卡片渲染模块
 */

import { qs, isPC } from './utils.js';
import { initTooltips } from './tooltips.js';
import { genCatSection, genFriendLinks } from './site-renderer.js';
import { onDataLoaded, loadData } from './data-loader.js';

const renderSiteCards = data => {
  let html = '';

  data.categories.forEach(cat => {
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach(subCat => {
        if (subCat.sites && subCat.sites.length > 0) html += genCatSection(subCat);
      });
    } else if (cat.sites && cat.sites.length > 0) {
      html += genCatSection(cat);
    }
  });

  html += genFriendLinks();

  const container = qs('#site-content');
  const skeleton = qs('#skeleton-loading');
  if (container) container.innerHTML = html;
  if (skeleton) skeleton.classList.add('skeleton-hidden');
  if (container) container.classList.remove('skeleton-hidden');

  initTooltips(isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
};

// 初始化首页动态内容
export const initDynamic = () => {
  onDataLoaded(renderSiteCards);
  loadData();
};
