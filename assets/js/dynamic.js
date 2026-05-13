/**
 * Dynamic.js - 首页站点卡片渲染
 */

(function () {
  'use strict';

  const { qs, isPC } = window.utils || { qs: sel => document.querySelector(sel), isPC: () => true };

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

    if (window.initTooltips)
      window.initTooltips(isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
  };

  const genCatSection = c =>
    '<h4 class="text-gray text-lg mb-4 d-flex flex-fill">' +
    '<i class="site-tag iconfont icon-tag icon-lg me-1" id="' +
    c.id +
    '"></i>' +
    c.name +
    '</h4><div class="row">' +
    c.sites.map(site => genSiteCard(site)).join('') +
    '</div>';

  const genSiteCard = site => {
    const iconUrl = site.icon || 'assets/images/favicon.png';
    const newBadge = site.isNew
      ? '<span class="badge badge-danger text-ss me-1" title="新">New</span>'
      : '';
    return (
      '<div class="url-card col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2"><div class="url-body default">' +
      '<a href="sites/detail.html?id=' +
      site.id +
      '" target="_blank" data-id="' +
      site.id +
      '" data-url="' +
      site.url +
      '" class="card no-c mb-4 site-' +
      site.id +
      '" data-bs-toggle="tooltip" data-bs-placement="bottom" title="' +
      site.description +
      '" rel="noopener noreferrer">' +
      '<div class="card-body"><div class="url-content d-flex align-items-center">' +
      '<div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">' +
      '<img loading="lazy" src="' +
      iconUrl +
      '" onerror="this.src=\'assets/images/favicon.png\'"></div>' +
      '<div class="url-info flex-fill"><div class="text-sm overflowClip_1">' +
      newBadge +
      '<strong>' +
      site.name +
      '</strong></div>' +
      '<p class="overflowClip_1 m-0 text-muted text-xs">' +
      site.description +
      '</p></div></div></div></a>' +
      '<a href="' +
      site.url +
      '" class="togo text-center text-muted" target="_blank" data-id="' +
      site.id +
      '" data-bs-toggle="tooltip" data-bs-placement="right" title="直达" rel="nofollow noopener noreferrer">' +
      '<i class="iconfont icon-goto"></i></a></div></div>'
    );
  };

  const genFriendLinks = () =>
    '<h4 class="text-gray text-lg mb-4"><i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接</h4>' +
    '<div class="friendlink text-xs card no-hover-card"><div class="card-body">' +
    '<a href="https://ciyuan.cat/" title="次元猫导航" target="_blank" rel="noopener noreferrer" class="friendlink-link">次元猫导航</a>' +
    '<a href="https://xiaoyou66.com/" title="二次元技术宅" target="_blank" rel="noopener noreferrer" class="friendlink-link">小游</a>' +
    '<a href="https://msiv.tv/" title="阿瓦隆！遗世独立的理想乡" target="_blank" rel="noopener noreferrer" class="friendlink-link">弥生寺</a>' +
    '<a href="https://www.acgbox.link/" class="friendlink-link">ACG盒子</a>' +
    '<a href="https://www.mgnacg.com/" title="专注动漫的二次元小站" class="friendlink-link">橘子动漫</a>' +
    '<a href="https://www.myiys.com/" title="技术导航-动漫导航-二次元导航" class="friendlink-link">ACGN导航</a>' +
    '<a href="/friends/index.html" target="_blank" title="更多链接" rel="noopener noreferrer" class="friendlink-link">更多链接</a>' +
    '</div></div>';

  const init = () => {
    if (window.DataLoader) {
      window.DataLoader.onLoaded(renderSiteCards);
      window.DataLoader.load();
    }
  };

  if (window.loader) {
    window.addEventListener('app:loaded', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
