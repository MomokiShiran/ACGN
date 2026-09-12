<template>
  <div
    id="sidebar"
    class="sticky sidebar-nav sidebar"
    :class="{ show: isMobileOpen, 'mini-sidebar': isMinimized }"
  >
    <div class="sidebar-nav-inner">
      <div class="sidebar-logo">
        <div class="logo overflow-hidden">
          <router-link to="/">
            <img :src="logoUrl" height="40" alt="MyACGN" loading="lazy" />
          </router-link>
        </div>
      </div>

      <div class="sidebar-menu flex-fill">
        <div class="sidebar-menu-inner">
          <ul class="sidebar-nav-list" id="sidebar-nav-list">
            <li v-for="cat in categories" :key="cat.id" class="sidebar-item">
              <router-link :to="{ path: '/', hash: '#' + cat.id }" class="sidebar-menu-link">
                <i :class="cat.icon || 'fas fa-link'" class="fa-fw fa-lg me-2"></i>
                <span class="sidebar-menu-text">{{ cat.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar-footer">
        <ul class="sidebar-nav-list">
          <li class="sidebar-item">
            <router-link to="/sitetrash" class="sidebar-menu-link">
              <i class="fas fa-trash fa-fw fa-lg me-2"></i>
              <span class="sidebar-menu-text">失效归档</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/postsite" class="sidebar-menu-link">
              <i class="fas fa-link fa-fw fa-lg me-2"></i>
              <span class="sidebar-menu-text">投稿&反馈</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import { useSidebar } from '@/composables/useSidebar'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'

const store = useSitesStore()
const categories = store.categories

const { isMobileOpen, isMinimized } = useSidebar()
</script>

<style scoped>
.sidebar-nav {
  display: table-cell;
  font-size: var(--font-size-sm);
  width: 150px;
  height: 100vh;
  z-index: 1081;
  position: sticky;
  top: 0;
  background: var(--sidebar-bg);
  transition: width var(--transition-normal);
}
.sidebar-nav.mini-sidebar {
  width: 60px;
}
.sidebar-nav-inner {
  width: inherit;
  margin: 0;
  max-width: 190px;
  background: var(--sidebar-bg);
  pointer-events: inherit;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: background-color var(--transition-normal);
  overflow: hidden;
}
.sidebar-logo {
  height: 74px;
  background: var(--sidebar-bg);
  border-bottom: 1px solid rgba(129, 129, 129, 0.15);
  transition: background-color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.logo img {
  max-height: 40px;
  width: auto;
}
.sidebar-menu {
  transition: all var(--transition-normal);
}
.sidebar-menu-link {
  display: block;
  overflow: hidden;
  padding: 0;
  padding-left: var(--space-3);
  line-height: 50px;
  max-height: 50px;
  color: var(--sidebar-text);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  transition: all var(--transition-normal);
}
.sidebar-item {
  position: relative;
}
.sidebar-item > .sidebar-menu-link:hover {
  color: var(--primary);
  background: var(--sidebar-hover);
}
.sidebar-nav-inner .flex-fill {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.sidebar-footer {
  flex-shrink: 0;
  padding: var(--space-2) 0;
  border-top: 1px solid rgba(129, 129, 129, 0.15);
}
.mini-sidebar .sidebar-menu {
  width: 60px;
}
.mini-sidebar .logo img {
  max-height: 32px;
}
.sidebar-nav-list {
  margin: 0;
  padding: 0;
}
.mini-sidebar .sidebar-menu-text {
  display: none;
}

/* 桌面端始终显示侧栏（兜底，防止其它响应式规则误隐藏） */
@media (min-width: 768px) {
  .sidebar-nav {
    display: block !important;
  }
}

/* 移动端侧边栏：遮罩层 + 抽屉 */
@media (max-width: 767.98px) {
  .sidebar-nav {
    background: transparent !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    position: fixed !important;
    z-index: 1090 !important;
    display: block !important;
    padding-left: 0 !important;
    visibility: hidden;
    transition: visibility var(--transition-fast);
    pointer-events: none;
  }
  .sidebar-nav.show {
    visibility: visible;
    pointer-events: auto;
  }
  .sidebar-nav .sidebar-nav-inner {
    position: fixed;
    height: 100%;
    width: 17.5rem;
    will-change: transform;
    transition: transform var(--transition-fast) cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(-100%);
  }
  .sidebar-nav.show .sidebar-nav-inner {
    transition: transform var(--transition-fast) cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(0);
  }
}
</style>
