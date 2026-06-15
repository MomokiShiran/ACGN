/**
 * 动态模块加载器
 */

// 立即加载骨架屏（最优先注入，保证用户能立刻看到占位内容
import './skeleton-renderer.js';

// 主入口加载函数
const loadApp = async () => {
  const pageType = document.body.dataset.pageType;

  if (pageType === 'home') {
    // 首页：并行加载 core, sidebar, dynamic, search
    const [, sidebarModule, dynamicModule, searchModule] = await Promise.all([
      import('./core.js'),
      import('./sidebar-loader.js'),
      import('./dynamic-loader.js'),
      import('./search-loader.js'),
    ]);

    // 等所有模块加载完再初始化
    sidebarModule.initSidebar();
    dynamicModule.initDynamic();
    searchModule.initSearch();
  } else if (pageType === 'detail') {
    // 详情页：并行加载 core, sidebar, site-detail
    const [, sidebarModule, siteDetailModule] = await Promise.all([
      import('./core.js'),
      import('./sidebar-loader.js'),
      import('./site-detail-loader.js'),
    ]);

    // 等所有模块加载完再初始化
    sidebarModule.initSidebar();
    siteDetailModule.initSiteDetail();
  } else {
    // 其他页面：并行加载 core, sidebar
    const [, sidebarModule] = await Promise.all([
      import('./core.js'),
      import('./sidebar-loader.js'),
    ]);

    // 等所有模块加载完再初始化
    sidebarModule.initSidebar();
  }
};

// 确保 DOM 加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadApp);
} else {
  loadApp();
}
