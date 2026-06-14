/**
 * 骨架屏渲染模块 - 统一通过 JS 生成骨架屏 HTML，让 HTML 文件保持清爽
 *
 * 用法：在 HTML 中放一个占位 div，通过 data-skeleton-type 指定类型：
 *   <div id="sidebar-skeleton" data-skeleton-type="sidebar"></div>
 *   <div id="sidebar-bottom-skeleton" data-skeleton-type="sidebar-bottom"></div>
 *   <div id="content-skeleton" data-skeleton-type="home|site-detail|announcements|announcement-detail|article"></div>
 */

// ========== 基础元素生成函数 ==========
const sidebarItem = (withArrow = false) => `
  <div class="skeleton-sidebar-item">
    <div class="skeleton-sidebar-icon skeleton-animation"></div>
    <div class="skeleton-sidebar-text skeleton-animation"></div>
    ${withArrow ? '<div class="skeleton-sidebar-text short skeleton-animation"></div>' : ''}
  </div>`;

const card = () => `
  <div class="skeleton-card-inner">
    <div class="skeleton-card-content">
      <div class="skeleton-avatar skeleton-animation"></div>
      <div class="skeleton-text-group">
        <div class="skeleton-text-line skeleton-animation"></div>
        <div class="skeleton-text-line short skeleton-animation"></div>
      </div>
    </div>
  </div>`;

// ========== 骨架屏类型 ==========
const SKEL = {
  // 侧边栏主体（12 项：10 普通 + 1 带箭头 + 1 普通）
  sidebar: () => `
    <div class="sidebar-scroll">
      <div class="sidebar-menu-inner skeleton-sidebar-menu">
        ${Array(10).fill(sidebarItem(false)).join('')}
        ${sidebarItem(true)}
        ${sidebarItem(false)}
      </div>
    </div>`,

  // 侧边栏底部（2 项）
  'sidebar-bottom': () => `
    <div class="flex-bottom">
      <div class="skeleton-sidebar-menu">
        ${Array(2).fill(sidebarItem(false)).join('')}
      </div>
    </div>`,

  // 首页主体：2 个分类，每个分类 6 张卡片
  home: () => `
    <div class="skeleton-category">
      <div class="skeleton-title skeleton-animation"></div>
      <div class="row">
        ${Array(6).fill(card()).map(c => `<div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">${c}</div>`).join('')}
      </div>
    </div>
    <div class="skeleton-category">
      <div class="skeleton-title skeleton-animation"></div>
      <div class="row">
        ${Array(6).fill(card()).map(c => `<div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">${c}</div>`).join('')}
      </div>
    </div>`,

  // 站点详情页
  'site-detail': () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="skeleton-site-header">
        <div class="url-img rounded-circle me-3 d-flex align-items-center justify-content-center" style="width:80px;height:80px;flex-shrink:0;position:relative;">
          <div class="skeleton-site-logo skeleton-animation"></div>
        </div>
        <div class="skeleton-site-info">
          <div class="skeleton-site-name skeleton-animation mb-3"></div>
          <div class="skeleton-site-url skeleton-animation mb-2"></div>
          <div class="skeleton-site-desc skeleton-animation mb-2"></div>
          <div class="skeleton-site-desc short skeleton-animation mb-3"></div>
          <div class="skeleton-site-tags">
            <div class="skeleton-tag skeleton-animation mb-2"></div>
            <div class="skeleton-tag skeleton-animation mb-2"></div>
            <div class="skeleton-tag skeleton-animation mb-2"></div>
          </div>
          <div class="d-flex align-items-center mt-3">
            <div class="skeleton-btn skeleton-animation me-2 d-inline-block"></div>
            <div class="skeleton-btn skeleton-animation d-inline-block"></div>
          </div>
        </div>
      </div>
      <div class="skeleton-article-content">
        <div class="skeleton-article-line long skeleton-animation mb-3"></div>
        <div class="skeleton-article-line long skeleton-animation mb-3"></div>
        <div class="skeleton-article-line long skeleton-animation mb-3"></div>
        <div class="skeleton-article-line short skeleton-animation"></div>
      </div>
    </div>`,

  // 公告列表页
  announcements: () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <div class="skeleton-title skeleton-animation mb-4"></div>
        ${Array(4)
          .fill(0)
          .map(
            () => `
          <div class="skeleton-announcement-card">
            <div class="skeleton-announcement-title skeleton-animation"></div>
            <div class="skeleton-announcement-meta skeleton-animation"></div>
            <div class="skeleton-announcement-desc skeleton-animation"></div>
            <div class="skeleton-announcement-desc short skeleton-animation"></div>
          </div>`
          )
          .join('')}
      </div>
    </div>`,

  // 公告详情页（文章样式）
  'announcement-detail': () => `
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body skeleton-article">
        <div class="skeleton-article-title skeleton-animation"></div>
        <div class="skeleton-article-meta skeleton-animation"></div>
        <div class="skeleton-article-content">
          <div class="skeleton-article-line long skeleton-animation"></div>
          <div class="skeleton-article-line long skeleton-animation"></div>
          <div class="skeleton-article-line short skeleton-animation"></div>
          <div class="skeleton-article-line long skeleton-animation"></div>
          <div class="skeleton-article-line long skeleton-animation"></div>
          <div class="skeleton-article-line short skeleton-animation"></div>
          <div class="skeleton-article-line long skeleton-animation"></div>
        </div>
      </div>
    </div>`,

  // 通用文章页（about / disclaimer / privacy 等静态页面也可以用）
  article: () => `
    <div class="skeleton-article">
      <div class="skeleton-article-title skeleton-animation"></div>
      <div class="skeleton-article-meta skeleton-animation"></div>
      <div class="skeleton-article-content">
        ${Array(7).fill('<div class="skeleton-article-line long skeleton-animation"></div>').join('')}
        <div class="skeleton-article-line short skeleton-animation"></div>
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
