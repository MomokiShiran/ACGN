/**
 * 搜索模块：根据关键字在站点名称和描述中做模糊匹配
 */

import { qs } from './utils.js';
import { onDataLoaded, loadData } from './data-loader.js';
import { onFriendLinksLoaded, loadFriendLinks } from './friendlink-loader.js';
import { genSiteCard, genCatSection } from './site-renderer.js';
import { genFriendLinks } from './friendlink-renderer.js';

let siteData = null;
let friendLinksData = null;
let searchInput = null;
let searchBtn = null;
let siteContainer = null;
let clearBtn = null;

// 防抖
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// 在站点名称和描述中做不区分大小写的关键字匹配
const filterSites = keyword => {
  if (!siteData || !siteData.categories) return [];
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];

  const matches = [];
  const seenIds = new Set();

  siteData.categories.forEach(cat => {
    const pools = [];
    if (cat.sites && cat.sites.length) pools.push(cat.sites);
    if (cat.children && cat.children.length) {
      cat.children.forEach(sub => {
        if (sub.sites && sub.sites.length) pools.push(sub.sites);
      });
    }
    pools.forEach(sites => {
      sites.forEach(site => {
        const haystack = [site.name || '', site.description || '']
          .join(' ')
          .toLowerCase();
        if (haystack.indexOf(kw) !== -1) {
          if (!seenIds.has(site.id)) {
            seenIds.add(site.id);
            matches.push(site);
          }
        }
      });
    });
  });

  return matches;
};

// 恢复默认显示
const renderOriginal = () => {
  if (!siteContainer || !siteData) return;

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
  if (friendLinksData && friendLinksData.links) {
    html += genFriendLinks(friendLinksData.links);
  }
  siteContainer.innerHTML = html;
};

// 渲染搜索结果
const renderResults = keyword => {
  if (!siteContainer) return;

  // 有输入时显示清除按钮，输入为空则隐藏并恢复默认视图
  if (clearBtn) {
    clearBtn.style.display = keyword.trim() ? 'flex' : 'none';
  }

  if (!keyword.trim()) {
    renderOriginal();
    return;
  }

  const matches = filterSites(keyword);

  if (matches.length === 0) {
    siteContainer.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:var(--text-muted, #888);">
        <div style="font-size:48px;margin-bottom:12px;">🔍</div>
        <div>没找到匹配的站点，试试其他关键字吧</div>
      </div>`;
    return;
  }

  let html = `
    <h4 class="text-gray text-lg mb-4 d-flex flex-fill">
      <i class="site-tag iconfont icon-tag icon-lg me-1"></i>搜索结果（${matches.length}）
    </h4>
    <div class="row">
      ${matches.map(site => genSiteCard(site)).join('')}
    </div>`;

  if (friendLinksData && friendLinksData.links) {
    html += genFriendLinks(friendLinksData.links);
  }
  siteContainer.innerHTML = html;
};

// 处理搜索输入（带防抖）
const handleSearch = debounce(() => {
  if (!searchInput) return;
  renderResults(searchInput.value);
}, 200);

// 初始化搜索模块
export const initSearch = () => {
  searchInput = qs('#search-input');
  searchBtn = qs('#search-btn');
  siteContainer = qs('#site-content');
  clearBtn = qs('#search-clear');

  if (!searchInput) return;

  // 数据就绪后监听
  onDataLoaded(data => {
    siteData = data;
  });
  loadData();

  onFriendLinksLoaded(data => {
    friendLinksData = data;
  });
  loadFriendLinks();

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        renderResults('');
        searchInput.focus();
      }
    });
  }

  searchInput.addEventListener('input', handleSearch);

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      searchInput.blur();
    } else if (e.key === 'Escape') {
      searchInput.value = '';
      renderResults('');
    }
  });
};
