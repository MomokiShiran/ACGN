/**
 * 动态模块加载器
 */

// 主入口加载函数
const loadApp = async () => {
  const pageType = document.body.dataset.pageType;

  if (pageType === 'home') {
    // 首页：并行加载 core, sidebar, dynamic
    const [, sidebarModule, dynamicModule] = await Promise.all([
      import('./core.js'),
      import('./sidebar.js'),
      import('./dynamic.js'),
    ]);

    // 等所有模块加载完再初始化
    sidebarModule.initSidebar();
    dynamicModule.initDynamic();
  } else if (pageType === 'detail') {
    // 详情页：并行加载 core, sidebar, site-detail
    const [, sidebarModule, siteDetailModule] = await Promise.all([
      import('./core.js'),
      import('./sidebar.js'),
      import('./site-detail.js'),
    ]);

    // 等所有模块加载完再初始化
    sidebarModule.initSidebar();
    siteDetailModule.initSiteDetail();
  } else {
    // 其他页面：并行加载 core, sidebar
    const [, sidebarModule] = await Promise.all([import('./core.js'), import('./sidebar.js')]);

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
