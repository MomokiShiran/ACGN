/**
 * 骨架屏渲染模块 - 统一通过 JS 生成骨架屏 HTML，让 HTML 文件保持清爽
 *
 * 用法：在 HTML 中放一个占位 div，通过 data-skeleton-type 指定类型：
 *   <div id="sidebar-skeleton" data-skeleton-type="sidebar"></div>
 *   <div id="sidebar-bottom-skeleton" data-skeleton-type="sidebar-bottom"></div>
 *   <div id="content-skeleton" data-skeleton-type="home|site-detail|announcements|announcement-detail|article"></div>
 */

// ========== 基础元素生成函数 ==========
const sidebarItem = () => `
  <div class="skeleton-sidebar-item">
    <div class="skeleton-sidebar-icon"></div>
    <div class="skeleton-sidebar-text"></div>
  </div>`;

const card = () => `
  <div class="skeleton-card-inner">
    <div class="skeleton-card-content">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-text-group">
        <div class="skeleton-text-line"></div>
        <div class="skeleton-text-line short"></div>
      </div>
    </div>
  </div>`;

// ========== 骨架屏类型 ==========
const SKEL = {
  // 侧边栏主体（12 项）
  sidebar: () => `
    <div class="sidebar-scroll">
      <div class="sidebar-menu-inner skeleton-sidebar-menu">
        ${Array(12).fill(sidebarItem()).join('')}
      </div>
    </div>`,

  // 侧边栏底部（2 项）
  'sidebar-bottom': () => `
    <div class="flex-bottom">
      <div class="skeleton-sidebar-menu">
        ${Array(2).fill(sidebarItem()).join('')}
      </div>
    </div>`,

  // 首页主体：2 个分类，每个分类 6 张卡片
  home: () => `
    <div class="skeleton-category">
      <div class="skeleton-title"></div>
      <div class="row">
        ${Array(6).fill(card()).map(c => `<div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">${c}</div>`).join('')}
      </div>
    </div>
    <div class="skeleton-category">
      <div class="skeleton-title"></div>
      <div class="row">
        ${Array(6).fill(card()).map(c => `<div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">${c}</div>`).join('')}
      </div>
    </div>`,

  // 站点详情页
  'site-detail': () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="skeleton-site-header">
        <div class="url-img rounded-circle me-3 d-flex align-items-center justify-content-center" style="width:80px;height:80px;flex-shrink:0;position:relative;">
          <div class="skeleton-site-logo"></div>
        </div>
        <div class="skeleton-site-info">
          <div class="skeleton-site-name mb-3"></div>
          <div class="skeleton-site-url mb-2"></div>
          <div class="skeleton-site-desc mb-2"></div>
          <div class="skeleton-site-desc short mb-3"></div>
          <div class="skeleton-site-tags">
            <div class="skeleton-tag mb-2"></div>
            <div class="skeleton-tag mb-2"></div>
            <div class="skeleton-tag mb-2"></div>
          </div>
          <div class="d-flex align-items-center mt-3">
            <div class="skeleton-btn me-2 d-inline-block"></div>
            <div class="skeleton-btn d-inline-block"></div>
          </div>
        </div>
      </div>
      <div class="skeleton-article-content">
        <div class="skeleton-article-line long mb-3"></div>
        <div class="skeleton-article-line long mb-3"></div>
        <div class="skeleton-article-line long mb-3"></div>
        <div class="skeleton-article-line short"></div>
      </div>
    </div>`,

  // 公告列表页
  announcements: () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <div class="skeleton-title mb-4"></div>
        ${Array(4)
          .fill(0)
          .map(
            () => `
          <div class="skeleton-announcement-card">
            <div class="skeleton-announcement-title"></div>
            <div class="skeleton-announcement-meta"></div>
            <div class="skeleton-announcement-desc"></div>
            <div class="skeleton-announcement-desc short"></div>
          </div>`
          )
          .join('')}
      </div>
    </div>`,

  // 公告详情页（文章样式）
  'announcement-detail': () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body skeleton-article">
        <div class="skeleton-article-title"></div>
        <div class="skeleton-article-meta"></div>
        <div class="skeleton-article-content">
          <div class="skeleton-article-line long"></div>
          <div class="skeleton-article-line long"></div>
          <div class="skeleton-article-line short"></div>
          <div class="skeleton-article-line long"></div>
          <div class="skeleton-article-line long"></div>
          <div class="skeleton-article-line short"></div>
          <div class="skeleton-article-line long"></div>
        </div>
      </div>
    </div>`,

  // 通用文章页（about / disclaimer / privacy 等静态页面也可以用）
  article: () => `
    <div class="skeleton-article">
      <div class="skeleton-article-title"></div>
      <div class="skeleton-article-meta"></div>
      <div class="skeleton-article-content">
        ${Array(7).fill('<div class="skeleton-article-line long"></div>').join('')}
        <div class="skeleton-article-line short"></div>
      </div>
    </div>`,
};

// ========== 注入所有骨架屏 ==========
const injectSkeletons = () => {
  document.querySelectorAll('[data-skeleton-type]').forEach(el => {
    const type = el.dataset.skeletonType;
    const renderer = SKEL[type];
    if (!renderer) return;

    // 只在占位容器为空时注入，避免重复
    if (!el.dataset.skeletonInjected) {
      el.innerHTML = renderer();
      el.dataset.skeletonInjected = '1';
    }
  });
};

// ========== 对外工具：隐藏某个骨架屏 ==========
export const hideSkeleton = selector => {
  const el = document.querySelector(selector);
  if (el) el.classList.add('skeleton-hidden');
};

// ========== 对外工具：显示某个骨架屏 ==========
export const showSkeleton = selector => {
  const el = document.querySelector(selector);
  if (el) el.classList.remove('skeleton-hidden');
};

// 模块一加载就注入（早于其他异步模块，用户能立刻看到骨架屏）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectSkeletons);
} else {
  injectSkeletons();
}
