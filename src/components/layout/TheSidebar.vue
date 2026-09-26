<template>
  <div
    id="sidebar"
    class="sidebar-nav sidebar"
    :class="{ show: sidebarStore.isMobileOpen, 'mini-sidebar': sidebarStore.isMinimized }"
  >
    <div class="sidebar-nav-inner">
      <div class="sidebar-logo">
        <div class="logo overflow-hidden">
          <router-link to="/" class="sidebar-logo-link">
            <img class="logo-img" :src="logoUrl" height="40" alt="MyACGN" loading="lazy" />
          </router-link>
        </div>
      </div>

      <div class="sidebar-menu">
        <div class="sidebar-menu-inner">
          <ul class="sidebar-nav-list" id="sidebar-nav-list">
            <li v-for="cat in store.categories" :key="cat.id" class="sidebar-item">
              <router-link :to="{ path: '/', hash: '#' + cat.id }" class="sidebar-menu-link">
                <img
                  :src="resolveNavIcon(cat.icon)"
                  class="sidebar-cat-icon"
                  alt=""
                  @error="handleIconError"
                />
                <span class="sidebar-menu-text">{{ cat.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="sidebar-theme">
          <button
            v-for="item in THEME_MODES"
            :key="item.value"
            type="button"
            class="theme-btn"
            :class="{ active: themeStore.sourceMode === item.value }"
            :aria-label="item.label"
            :title="item.label"
            @click="themeStore.setMode(item.value)"
          >
            <img class="theme-icon" :src="themeIcons[item.value]" alt="" />
          </button>
          <button
            type="button"
            class="theme-btn theme-btn-mini"
            :aria-label="currentLabel"
            :title="currentLabel"
            @click="cycleTheme"
          >
            <img class="theme-icon" :src="themeIcons[themeStore.sourceMode]" alt="" />
          </button>
        </div>
        <ul class="sidebar-nav-list">
          <li class="sidebar-item">
            <router-link to="/sitetrash" class="sidebar-menu-link">
              <img class="sidebar-cat-icon" :src="trashIcon" alt="" />
              <span class="sidebar-menu-text">失效归档</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/postsite" class="sidebar-menu-link">
              <img class="sidebar-cat-icon" :src="linkIcon" alt="" />
              <span class="sidebar-menu-text">投稿&反馈</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSitesStore } from '@/stores/sites'
import { useSidebarStore } from '@/stores/sidebar'
import { useThemeStore } from '@/stores/theme'
import { THEME_MODES } from '@/composables/themeConstants'
import { resolveNavIcon, handleIconError } from '@/composables/useSiteIcon'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'
import trashIcon from '@/assets/icons/trash.svg'
import linkIcon from '@/assets/icons/link.svg'
import sunIcon from '@/assets/icons/sun.svg'
import moonIcon from '@/assets/icons/moon.svg'
import autoIcon from '@/assets/icons/auto.svg'

const store = useSitesStore()

const sidebarStore = useSidebarStore()
const themeStore = useThemeStore()

const themeIcons = {
  light: sunIcon,
  dark: moonIcon,
  auto: autoIcon,
}

// 当前模式标签（供迷你单钮 tooltip / aria）
const currentLabel = computed(
  () => THEME_MODES.find((m) => m.value === themeStore.sourceMode.value)?.label ?? ''
)

// 迷你侧栏单钮：点击按 浅色 → 深色 → 跟随系统 循环，图标跟随当前模式
const cycleTheme = () => {
  const idx = THEME_MODES.findIndex((m) => m.value === themeStore.sourceMode.value)
  themeStore.setMode(THEME_MODES[(idx + 1) % THEME_MODES.length].value)
}
</script>

<style scoped>
.sidebar-nav {
  --divider: rgba(129, 129, 129, 0.15);
  flex: 0 0 150px;
  font-size: 0.75rem;
  height: 100vh;
  z-index: 1080;
  position: sticky;
  top: 0;
  background: var(--sidebar-bg);
  transition: flex-basis 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.sidebar-nav.mini-sidebar {
  flex-basis: 60px;
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
  transition: background-color 0.3s;
  overflow: hidden;
}
.sidebar-logo {
  box-sizing: border-box;
  height: 74px;
  background: var(--sidebar-bg);
  border-bottom: 1px solid var(--divider);
  transition: background-color 0.2s;
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
  overflow: hidden;
}
.sidebar-logo-link {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.logo-img {
  max-height: 40px;
  width: auto;
}
.sidebar-menu {
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.sidebar-menu-link {
  display: block;
  overflow: hidden;
  padding: 0 0 0 16px;
  line-height: 50px;
  max-height: 50px;
  color: var(--sidebar-text);
  text-decoration: none;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  transition:
    color 0.3s,
    background-color 0.3s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.sidebar-menu-link:active {
  color: var(--primary);
}
.sidebar-item {
  position: relative;
}
.sidebar-item > .sidebar-menu-link:hover {
  color: var(--primary);
  background: var(--sidebar-hover);
}
.sidebar-footer {
  flex-shrink: 0;
  padding: 8px 0;
  border-top: 1px solid var(--divider);
}
.sidebar-theme {
  display: flex;
  gap: 8px;
  padding: 0 12px 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--divider);
}
.theme-btn {
  box-sizing: border-box;
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: var(--input-bg);
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.theme-btn:hover {
  background: var(--sidebar-hover);
}
.theme-btn.active {
  border-color: var(--primary);
}
.theme-icon {
  width: 16px;
  height: 16px;
}
/* 迷你单钮默认隐藏，仅折叠态显示 */
.theme-btn-mini {
  display: none;
}
.mini-sidebar .sidebar-theme {
  flex-direction: column;
  gap: 4px;
  padding: 0 4px 8px;
}
.mini-sidebar .theme-btn:not(.theme-btn-mini) {
  display: none;
}
.mini-sidebar .theme-btn-mini {
  display: flex;
}
.mini-sidebar .theme-btn {
  flex: none;
  width: 100%;
}
.mini-sidebar .logo-img {
  max-height: 32px;
}
.sidebar-nav-list {
  margin: 0;
  padding: 0;
}
.sidebar-cat-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  flex-shrink: 0;
  vertical-align: middle;
}
.sidebar-menu-text {
  opacity: 1;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}
.mini-sidebar .sidebar-menu-text {
  opacity: 0;
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
    transition: visibility 0.2s;
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
    transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(-100%);
  }
  .sidebar-nav.show .sidebar-nav-inner {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(0);
  }
}
</style>
