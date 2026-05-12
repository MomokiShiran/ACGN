/**
 * features.js - 功能模块
 * 包含: data-loader, sidebar, dynamic, site-detail
 */

(function () {
  'use strict';

  const { qs, resolvePath } = window.utils || {
    qs: (sel) => document.querySelector(sel),
    resolvePath: (p) => p
  };

  let cachedData = null;
  let loadingPromise = null;
  const subscribers = [];

  // 订阅数据加载完成事件
  const onDataLoaded = (callback) => {
    if (cachedData) {
      callback(cachedData);
    } else {
      subscribers.push(callback);
    }
  };

  // 加载数据（只加载一次）
  const loadData = async () => {
    // 如果已经有缓存，直接返回
    if (cachedData) {
      return cachedData;
    }

    // 如果正在加载中，等待完成
    if (loadingPromise) {
      return loadingPromise;
    }

    // 开始加载
    loadingPromise = (async () => {
      try {
        const dataPath = resolvePath('data/sites.json');
        const response = await fetch(dataPath);
        cachedData = await response.json();

        // 通知所有订阅者
        subscribers.forEach(callback => callback(cachedData));
        subscribers.length = 0; // 清空订阅者列表

        return cachedData;
      } catch (err) {
        console.error('[DataLoader] 加载数据失败:', err);
        loadingPromise = null;
        throw err;
      }
    })();

    return loadingPromise;
  };

  // 暴露到全局
  window.DataLoader = {
    load: loadData,
    onLoaded: onDataLoaded,
    get: () => cachedData
  };
})();

(function () {
  'use strict';

  const { qs } = window.utils || { qs: (sel) => document.querySelector(sel) };

  const renderSidebar = (data) => {
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

    // 侧边栏骨架屏处理
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

  const genSideItem = (c) =>
    '<li class="sidebar-item"><a href="/index.html#' +
    c.id +
    '" class="sidebar-menu-link">' +
    '<i class="' +
    (c.icon || 'fas fa-link') +
    ' icon-fw icon-lg me-2"></i>' +
    '<span class="sidebar-menu-text">' +
    c.name +
    '</span></a></li>';

  const genSideSubItem = (c) =>
    '<li class="sidebar-item"><a href="/index.html#' +
    c.id +
    '" class="sidebar-menu-link">' +
    '<span class="sidebar-menu-text">' +
    c.name +
    '</span></a></li>';

  // 等待 app 加载完成后，使用 DataLoader 加载数据
  const init = () => {
    if (window.DataLoader) {
      window.DataLoader.onLoaded(renderSidebar);
      window.DataLoader.load();
    } else {
      // 回退方案：直接加载
      const loadSidebarData = async () => {
        try {
          const { resolvePath } = window.utils || { resolvePath: (p) => p };
          const dataPath = resolvePath('data/sites.json');
          const data = await (await fetch(dataPath)).json();
          renderSidebar(data);
        } catch (err) {
          console.error('[Sidebar] 加载数据失败:', err);
        }
      };
      loadSidebarData();
    }
  };

  if (window.loader) {
    window.addEventListener('app:loaded', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

(function () {
  'use strict';

  const { qs, isPC } = window.utils || {
    qs: (sel) => document.querySelector(sel),
    isPC: () => true
  };

  const renderSiteCards = (data) => {
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

    // 初始化工具提示
    if (window.initTooltips) {
      window.initTooltips(isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
    }
  };

  const genCatSection = (c) => {
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

  const genSiteCard = (site) => {
    const iconUrl = site.icon || 'assets/images/favicon.png';
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
      '<img loading="lazy" src="' +
      iconUrl +
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

  // 等待 app 加载完成后，使用 DataLoader 加载数据
  const init = () => {
    if (window.DataLoader) {
      window.DataLoader.onLoaded(renderSiteCards);
      window.DataLoader.load();
    } else {
      // 回退方案：直接加载
      const loadSiteData = async () => {
        try {
          const data = await (await fetch('data/sites.json')).json();
          renderSiteCards(data);
        } catch (err) {
          console.error('[Dynamic] 加载数据失败:', err);
        }
      };
      loadSiteData();
    }
  };

  if (window.loader) {
    window.addEventListener('app:loaded', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

(function () {
  'use strict';

  const { qs, resolvePath } = window.utils || {
    qs: sel => document.querySelector(sel),
    resolvePath: p => p
  };

  const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = parseInt(urlParams.get('id'));

    if (!siteId) {
      showError('未找到网站ID');
      return;
    }

    // 使用 DataLoader 获取已加载的数据，避免重复请求
    if (window.DataLoader) {
      window.DataLoader.onLoaded(data => {
        findAndRenderSite(data, siteId);
      });
      window.DataLoader.load();
    } else {
      // 回退方案：直接加载
      loadDataDirectly(siteId);
    }
  };

  const findAndRenderSite = (data, siteId) => {
    let site = null;
    let categoryName = '';

    // 先找 sites.json
    for (let category of data.categories) {
      const found = category.sites ? category.sites.find(s => s.id === siteId) : null;
      if (found) {
        site = found;
        categoryName = category.name;
        break;
      }
      // 检查二级分类
      if (category.children) {
        for (let subCategory of category.children) {
          const subFound = subCategory.sites ? subCategory.sites.find(s => s.id === siteId) : null;
          if (subFound) {
            site = subFound;
            categoryName = subCategory.name;
            break;
          }
        }
        if (site) break;
      }
    }

    // 如果没找到，尝试单独加载 sitetrash.json
    if (!site) {
      loadSitetrash(siteId);
      return;
    }

    renderSite(site, categoryName);
  };

  const loadSitetrash = async (siteId) => {
    try {
      const sitetrashPath = resolvePath('data/sitetrash.json');
      const data = await (await fetch(sitetrashPath)).json();
      let site = null;
      let categoryName = '';

      for (let category of data.categories) {
        const found = category.sites ? category.sites.find(s => s.id === siteId) : null;
        if (found) {
          site = found;
          categoryName = category.name;
          break;
        }
        if (category.children) {
          for (let subCategory of category.children) {
            const subFound = subCategory.sites ? subCategory.sites.find(s => s.id === siteId) : null;
            if (subFound) {
              site = subFound;
              categoryName = subCategory.name;
              break;
            }
          }
          if (site) break;
        }
      }

      if (!site) {
        showError('未找到该网站');
        return;
      }

      renderSite(site, categoryName);
    } catch (err) {
      showError('加载网站信息失败，请刷新页面重试。');
    }
  };

  const loadDataDirectly = async (siteId) => {
    try {
      // 先尝试 sites.json
      const sitesPath = resolvePath('data/sites.json');
      let data = await (await fetch(sitesPath)).json();
      findAndRenderSite(data, siteId);
    } catch (err) {
      showError('加载网站信息失败，请刷新页面重试。');
    }
  };

  const renderSite = (site, categoryName) => {
    // 使用自定义icon或fallback到默认
    const faviconUrl = site.icon
      ? site.icon.startsWith('/')
        ? site.icon
        : '/' + site.icon
      : resolvePath('assets/images/favicon.png');

    document.title = site.name + ' | MyACGN';

    // 更新 meta 标签
    const metaKeywords = qs('meta[name="keywords"]');
    const metaDescription = qs('meta[name="description"]');
    const metaOgTitle = qs('meta[property="og:title"]');
    const metaOgDescription = qs('meta[property="og:description"]');
    const metaOgImage = qs('meta[property="og:image"]');
    const metaOgUrl = qs('meta[property="og:url"]');
    const linkCanonical = qs('link[rel="canonical"]');

    if (metaKeywords) metaKeywords.setAttribute('content', site.name + ',MyACGN');
    if (metaDescription) metaDescription.setAttribute('content', site.description);
    if (metaOgTitle) metaOgTitle.setAttribute('content', site.name + ' | MyACGN');
    if (metaOgDescription) metaOgDescription.setAttribute('content', site.description);
    if (metaOgImage) metaOgImage.setAttribute('content', faviconUrl);
    if (metaOgUrl) metaOgUrl.setAttribute('content', window.location.href);
    if (linkCanonical) linkCanonical.setAttribute('href', window.location.href);

    // 更新 DOM
    qs('#site-blur').style.backgroundImage = `url(${faviconUrl})`;
    qs('#site-icon').setAttribute('src', faviconUrl);
    qs('#site-icon').setAttribute('alt', site.name);
    qs('#site-icon').setAttribute('title', site.name);

    qs('#site-category').textContent = categoryName;
    qs('#site-name').textContent = site.name;
    qs('#site-description').textContent = site.description;
    qs('#site-created-at').textContent = '收录时间：' + (site.createdAt || '未知');
    qs('#site-url').setAttribute('href', site.url);
    qs('#site-url').setAttribute('title', site.name);

    const qrUrl = site.url ? encodeURIComponent(site.url) : '';
    qs('#site-qr').setAttribute(
      'data-bs-original-title',
      `<img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrUrl}' width='150'>`
    );

    qs('#site-detail-content').textContent = site.detail || site.description;

    qs('#skeleton-loading').classList.add('skeleton-hidden');
    qs('#site-content').classList.remove('skeleton-hidden');

    // 初始化工具提示
    if (window.initTooltips) {
      window.initTooltips();
    }
  };

  const showError = (message) => {
    qs('#skeleton-loading').classList.add('skeleton-hidden');
    qs('#site-content').classList.remove('skeleton-hidden');
    qs('#site-name').textContent = '错误';
    qs('#site-category').textContent = '';
    qs('#site-description').textContent = message;
    qs('#site-detail-content').innerHTML =
      `<div class="alert alert-danger">${message}</div><a href="/" class="btn btn-primary">返回首页</a>`;
  };

  // 启动
  if (window.loader) {
    window.addEventListener('app:loaded', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
