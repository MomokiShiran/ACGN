/**
 * 侧边栏菜单渲染模块
 */

// 生成侧边栏菜单项
export const genSideItem = c => {
  console.log('[SidebarRenderer] genSideItem 输入参数:', c);
  const itemUrl = new URL(`../../index.html#${c.id}`, import.meta.url).href;
  return `
<li class="sidebar-item">
  <a href="${itemUrl}" class="sidebar-menu-link">
    <i class="${c.icon || 'fas fa-link'} icon-fw icon-lg me-2"></i>
    <span class="sidebar-menu-text">${c.name}</span>
  </a>
</li>`;
};

// 生成侧边栏子菜单项
export const genSideSubItem = c => {
  console.log('[SidebarRenderer] genSideSubItem 输入参数:', c);
  const itemUrl = new URL(`../../index.html#${c.id}`, import.meta.url).href;
  return `
<li class="sidebar-item">
  <a href="${itemUrl}" class="sidebar-menu-link">
    <span class="sidebar-menu-text">${c.name}</span>
  </a>
</li>`;
};
