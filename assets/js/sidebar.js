  /**
 * Sidebar.js - 动态侧边栏
 */

(function () {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const loadSidebarData = async () => {
    try {
      // 计算正确的 data 路径
      const currentPath = window.location.pathname;
      let dataPath = 'data/sites.json';

      // 如果不在根目录，需要调整路径
      if (!currentPath.endsWith('/') && !currentPath.includes('index.html')) {
        // 计算需要多少个 ../ 才能回到根目录
        const pathSegments = currentPath
          .split('/')
          .filter(segment => segment.length > 0 && !segment.endsWith('.html'));
        dataPath = '../'.repeat(pathSegments.length) + dataPath;
      } else if (currentPath.includes('index.html')) {
        // 如果是 index.html 但在子目录
        const pathSegments = currentPath
          .split('/')
          .filter(segment => segment.length > 0 && !segment.endsWith('.html'));
        if (pathSegments.length > 0) {
          dataPath = '../'.repeat(pathSegments.length) + dataPath;
        }
      }

      const data = await (await fetch(dataPath)).json();
      renderSidebar(data);

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
    } catch (err) {
      console.error('加载侧边栏数据失败:', err);
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

  document.addEventListener('DOMContentLoaded', loadSidebarData);
})();
