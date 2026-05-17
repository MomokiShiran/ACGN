/**
 * 首页站点卡片渲染模块
 */

import { qs, isPC } from './utils.js';
import { initTooltips } from './tooltips-loader.js';
import { genCatSection } from './site-renderer.js';
import { genFriendLinks } from './friendlink-renderer.js';
import { onDataLoaded, loadData } from './data-loader.js';
import { onFriendLinksLoaded, loadFriendLinks } from './friendlink-loader.js';

let siteData = null;
let friendLinksData = null;

const renderSiteCards = () => {
  if (!siteData || !friendLinksData) {
    console.log('[Dynamic] 数据尚未完全加载，等待中...');
    return;
  }

  let html = '';

  siteData.categories.forEach(cat => {
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach(subCat => {
        if (subCat.sites && subCat.sites.length > 0) html += genCatSection(subCat);
      });
    } else if (cat.sites && cat.sites.length > 0) {
      html += genCatSection(cat);
    }
  });

  html += genFriendLinks(friendLinksData.links);

  const container = qs('#site-content');
  const skeleton = qs('#skeleton-loading');
  if (container) container.innerHTML = html;
  if (skeleton) skeleton.classList.add('skeleton-hidden');
  if (container) container.classList.remove('skeleton-hidden');

  initTooltips(isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
};

const onSiteDataLoaded = data => {
  console.log('[Dynamic] 站点数据加载完成');
  siteData = data;
  renderSiteCards();
};

const onFriendDataLoaded = data => {
  console.log('[Dynamic] 友情链接数据加载完成');
  friendLinksData = data;
  renderSiteCards();
};

// 初始化首页动态内容
export const initDynamic = () => {
  onDataLoaded(onSiteDataLoaded);
  onFriendLinksLoaded(onFriendDataLoaded);
  loadData();
  loadFriendLinks();
};
