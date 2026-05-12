/**
 * Site Detail.js - 网站详情页
 * 使用 DataLoader 共享数据源避免重复加载
 */

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
