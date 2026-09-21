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
            :class="{ active: mode === item.value }"
            :aria-label="item.label"
            :title="item.label"
            @click="setMode(item.value)"
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
            <img class="theme-icon" :src="themeIcons[mode]" alt="" />
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
import { useSidebar } from '@/composables/useSidebar'
import { useTheme } from '@/composables/useTheme'
import { THEME_MODES } from '@/composables/themeConstants'
import { resolveNavIcon, handleIconError } from '@/composables/useSiteIcon'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'
import trashIcon from '@/assets/icons/trash.svg'
import linkIcon from '@/assets/icons/link.svg'
import sunIcon from '@/assets/icons/sun.svg'
import moonIcon from '@/assets/icons/moon.svg'
import autoIcon from '@/assets/icons/auto.svg'

const store = useSitesStore()
const categories = store.categories

const { isMobileOpen, isMinimized } = useSidebar()
// 活跃态按持久化源模式(sourceMode)判断：auto 时实际模式已解析为 dark/light，
// 用 mode 判断会导致 auto 按钮永不高亮
const { sourceMode: mode, setMode } = useTheme()

const themeIcons = {
  light: sunIcon,
  dark: moonIcon,
  auto: autoIcon,
}

// 当前模式标签（供迷你单钮 tooltip / aria）
const currentLabel = computed(() => THEME_MODES.find((m) => m.value === mode.value)?.label ?? '')

// 迷你侧栏单钮：点击按 浅色 → 深色 → 跟随系统 循环，图标跟随当前模式
const cycleTheme = () => {
  const idx = THEME_MODES.findIndex((m) => m.value === mode.value)
  setMode(THEME_MODES[(idx + 1) % THEME_MODES.length].value)
}
</script>

<style scoped>
.sidebar-nav {
  display: table-cell;
  font-size: var(--font-size-sm);
  width: 150px;
  height: 100vh;
  z-index: var(--z-sidebar);
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
  padding-left: var(--space-4);
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
.sidebar-theme {
  display: flex;
  gap: var(--space-2);
  padding: 0 var(--space-3) var(--space-2);
  margin-bottom: var(--space-2);
  border-bottom: 1px solid rgba(129, 129, 129, 0.15);
}
.theme-btn {
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: var(--input-bg);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
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
  gap: var(--space-1);
  padding: 0 var(--space-1) var(--space-2);
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
.sidebar-cat-icon {
  width: 18px;
  height: 18px;
  margin-right: var(--space-2);
  flex-shrink: 0;
  vertical-align: middle;
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
    z-index: var(--z-modal) !important;
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
