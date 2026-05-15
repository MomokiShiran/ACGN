/**
 * 网站详情页模块
 */

import { qs } from './utils.js';
import { initTooltips } from './tooltips.js';
import { onDataLoaded, loadData } from './data-loader.js';

const DEFAULT_FAVICON_URL = new URL('../../assets/images/favicon.png', import.meta.url).href;

const findSiteInData = (data, siteId) => {
  for (let category of data.categories) {
    const found = category.sites ? category.sites.find(s => s.id === siteId) : null;
    if (found) {
      return { site: found, categoryName: category.name };
    }
    if (category.children) {
      for (let subCategory of category.children) {
        const subFound = subCategory.sites ? subCategory.sites.find(s => s.id === siteId) : null;
        if (subFound) {
          return { site: subFound, categoryName: subCategory.name };
        }
      }
    }
  }
  return null;
};

const findAndRenderSite = (data, siteId) => {
  const result = findSiteInData(data, siteId);
  if (result) {
    renderSite(result.site, result.categoryName);
  } else {
    loadSitetrash(siteId);
  }
};

const loadSitetrash = async siteId => {
  console.log('[SiteDetail] 未在主数据中找到站点，尝试从 sitetrash.json 加载，siteId:', siteId);
  try {
    const sitetrashPath = new URL('../../data/sitetrash.json', import.meta.url).href;
    console.log('[SiteDetail] 请求:', sitetrashPath);
    const data = await (await fetch(sitetrashPath)).json();
    console.log('[SiteDetail] sitetrash.json 加载完成');
    const result = findSiteInData(data, siteId);

    if (!result) {
      console.log('[SiteDetail] 在 sitetrash.json 中也未找到站点');
      showError('未找到该网站');
      return;
    }

    console.log('[SiteDetail] 在 sitetrash.json 中找到站点，开始渲染');
    renderSite(result.site, result.categoryName);
  } catch (err) {
    console.error('[SiteDetail] 加载 sitetrash.json 失败:', err);
    showError('加载网站信息失败，请刷新页面重试。');
  }
};

const renderSite = (site, categoryName) => {
  const faviconUrl = site.icon
    ? /^(?:https?:)?\/\//.test(site.icon) || site.icon.startsWith('/')
      ? site.icon
      : new URL('../../' + site.icon.replace(/^\.\/?/, ''), import.meta.url).href
    : DEFAULT_FAVICON_URL;

  document.title = site.name + ' | MyACGN';

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

  initTooltips();
};

const showError = message => {
  qs('#skeleton-loading').classList.add('skeleton-hidden');
  qs('#site-content').classList.remove('skeleton-hidden');
  qs('#site-name').textContent = '错误';
  qs('#site-category').textContent = '';
  qs('#site-description').textContent = message;
  qs('#site-detail-content').innerHTML =
    `<div class="alert alert-danger">${message}</div><a href="../../" class="btn btn-primary">返回首页</a>`;
};

// 初始化网站详情页
export const initSiteDetail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = parseInt(urlParams.get('id'));

  if (!siteId) {
    showError('未找到网站ID');
    return;
  }

  onDataLoaded(data => {
    findAndRenderSite(data, siteId);
  });
  loadData();
};
