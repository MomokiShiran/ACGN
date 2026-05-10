/**
 * Dynamic.js
 */

(function () {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const loadSiteData = async () => {
    try {
      const data = await (await fetch('data/sites.json')).json();
      renderSidebar(data);
      renderSiteCards(data);
      if (typeof window.initTooltips === 'function') {
        window.initTooltips(
          typeof window.isPC === 'function' && window.isPC()
            ? undefined
            : '.qr-img[data-bs-toggle="tooltip"]'
        );
      }
    } catch (err) {
      console.error('加载数据失败:', err);
    }
  };

  const renderSidebar = data => {
    const mainCategories = data.categories;

    let html = '';
    mainCategories.forEach(cat => {
      if (cat.id === 'tool-collection' && cat.children && cat.children.length > 0) {
        const subHtml = cat.children.map(c => genSideSubItem(c)).join('');
        html +=
          '<li class="sidebar-item">' +
          '<a href="javascript:;" class="sidebar-menu-link">' +
          '<i class="' + (cat.icon || 'fas fa-toolbox') + ' icon-fw icon-lg me-2"></i>' +
          '<span class="sidebar-menu-text">' + cat.name + '</span>' +
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

  const renderSiteCards = data => {
    let html = '';
    
    data.categories.forEach(cat => {
      if (cat.children && cat.children.length > 0) {
        cat.children.forEach(subCat => {
          if (subCat.sites && subCat.sites.length > 0) {
            html += genCatSection(subCat);
          }
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
  };

  const genCatSection = c => {
    const sites = c.sites.map(site => genSiteCard(site)).join('');
    return (
      '<h4 class="text-gray text-lg mb-4 d-flex flex-fill">' +
      '<i class="site-tag iconfont icon-tag icon-lg me-1" id="' +
      c.id +
      '"></i>' +
      c.name +
      '</h4><div class="row">' +
      sites +
      '</div>'
    );
  };

  const genSiteCard = site => {
    let host;
    try {
      host = new URL(site.url).hostname;
    } catch {
      host = 'example.com';
    }
    const newBadge = site.isNew
      ? '<span class="badge badge-danger text-ss me-1" title="新">New</span>'
      : '';
    return (
      '<div class="url-card col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">' +
      '<div class="url-body default">' +
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
      '<div class="card-body">' +
      '<div class="url-content d-flex align-items-center">' +
      '<div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">' +
      '<img loading="lazy" src="https://favicon.im/' +
      host +
      '" onerror="this.src=\'assets/images/favicon.png\'">' +
      '</div>' +
      '<div class="url-info flex-fill">' +
      '<div class="text-sm overflowClip_1">' +
      newBadge +
      '<strong>' +
      site.name +
      '</strong></div>' +
      '<p class="overflowClip_1 m-0 text-muted text-xs">' +
      site.description +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</a>' +
      '<a href="' +
      site.url +
      '" class="togo text-center text-muted" target="_blank" data-id="' +
      site.id +
      '" data-bs-toggle="tooltip" data-bs-placement="right" title="直达" rel="nofollow noopener noreferrer">' +
      '<i class="iconfont icon-goto"></i>' +
      '</a>' +
      '</div>' +
      '</div>'
    );
  };

  const genFriendLinks = () =>
    '<h4 class="text-gray text-lg mb-4">' +
    '<i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接</h4>' +
    '<div class="friendlink text-xs card no-hover-card">' +
    '<div class="card-body">' +
    '<a href="https://ciyuan.cat/" title="次元猫导航" target="_blank" rel="noopener noreferrer" class="friendlink-link">次元猫导航</a>' +
    '<a href="https://xiaoyou66.com/" title="二次元技术宅" target="_blank" rel="noopener noreferrer" class="friendlink-link">小游</a>' +
    '<a href="https://msiv.tv/" title="阿瓦隆！遗世独立的理想乡" target="_blank" rel="noopener noreferrer" class="friendlink-link">弥生寺</a>' +
    '<a href="https://www.acgbox.link/" class="friendlink-link">ACG盒子</a>' +
    '<a href="https://www.mgnacg.com/" title="专注动漫的二次元小站" class="friendlink-link">橘子动漫</a>' +
    '<a href="https://www.myiys.com/" title="技术导航-动漫导航-二次元导航" class="friendlink-link">ACGN导航</a>' +
    '<a href="/friends/index.html" target="_blank" title="更多链接" rel="noopener noreferrer" class="friendlink-link">更多链接</a>' +
    '</div>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', loadSiteData);
})();
