<template>
  <div class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-logo mobile-only">
        <img class="navbar-logo-img" loading="lazy" :src="logoUrl" height="40" alt="MyACGN" />
      </router-link>

      <div class="navbar-left">
        <div class="navbar-btn desktop-only">
          <button
            class="menu-label"
            type="button"
            :class="{ 'is-open': !sidebarStore.isMinimized }"
            :aria-expanded="!sidebarStore.isMinimized"
            :aria-label="sidebarStore.isMinimized ? '展开侧边栏' : '收起侧边栏'"
            @click="sidebarStore.toggleMini()"
          >
            <svg class="menu-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path class="menu-path line-1" d="M0 40h62c18 0 18-20-17 5L31 55"></path>
              <path class="menu-path line-2" d="M0 50h80"></path>
              <path class="menu-path line-3" d="M0 60h62c18 20 18 20-17 5L31 45"></path>
            </svg>
          </button>
        </div>

        <router-link to="/announcements" class="navbar-announcement" rel="announcement">
          公告
        </router-link>
      </div>

      <div class="navbar-right">
        <div class="navbar-hitokoto desktop-only">
          <div class="navbar-hitokoto-text">
            <span class="hitokoto">{{ hitokotoStore.text }}</span>
            <span v-if="hitokotoStore.from" class="hitokoto-from">—— {{ hitokotoStore.from }}</span>
          </div>
        </div>

        <div class="navbar-mobile mobile-only">
          <button
            type="button"
            class="navbar-toggle"
            id="sidebar-toggle"
            :aria-label="sidebarStore.isMobileOpen ? '关闭菜单' : '打开菜单'"
            :aria-expanded="sidebarStore.isMobileOpen"
            @click="sidebarStore.toggleMobile"
          >
            <img class="navbar-toggle-icon" aria-hidden="true" :src="menuIcon" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useHitokotoStore } from '@/stores/hitokoto'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'
import menuIcon from '@/assets/icons/menu.svg'

const sidebarStore = useSidebarStore()
const hitokotoStore = useHitokotoStore()

onMounted(() => {
  hitokotoStore.init()
})
</script>

<style scoped>
/* 顶部导航栏 */
.navbar {
  background: var(--header-bg);
  position: sticky;
  top: 0;
  z-index: 1080;
  backdrop-filter: blur(10px);
  transition: background-color 0.3s;
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 12px;
  gap: 8px;
}
.navbar-logo {
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.navbar-logo-img {
  max-height: 36px;
  width: auto;
  display: block;
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* 一言容器 */
.navbar-hitokoto {
  display: none;
}
.navbar-hitokoto-text {
  font-size: 0.875rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 1.5;
}

/* 移动端菜单开关 */
.navbar-mobile {
  display: none;
}
.navbar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  color: var(--text-muted);
  background: none;
  border: 0;
  border-radius: 6px;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.navbar-toggle:hover {
  color: var(--primary);
}
.navbar-toggle:active {
  color: var(--primary);
}
.navbar-toggle-icon {
  width: 24px;
  height: 24px;
}

/* 菜单按钮与 SVG 动画 */
.navbar-btn {
  height: 74px;
  width: 40px;
  border-radius: 6px;
  cursor: pointer;
}
.navbar-btn .menu-svg {
  margin: 0 -20px;
  height: 74px;
}
.navbar-btn .menu-path {
  fill: none;
  stroke: #888;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  --length: 24;
  --offset: -38;
  stroke-dasharray: var(--length) var(--total-length);
  stroke-dashoffset: var(--offset);
  transition:
    stroke-dasharray 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
    stroke-dashoffset 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
    stroke 0.2s;
}
.navbar-btn .menu-label {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.navbar-btn .menu-label.is-open .line-1,
.navbar-btn .menu-label.is-open .line-3 {
  --length: 12.602325267;
}
.navbar-btn .line-1,
.navbar-btn .line-3 {
  --total-length: 126.38166809082031;
}
.navbar-btn .line-2 {
  --total-length: 80;
}
.navbar-btn .menu-label:hover .menu-path {
  stroke: var(--primary);
}

.navbar-announcement {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--text);
  text-decoration: none;
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: normal;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.navbar-announcement:hover {
  color: var(--primary);
}

@media (min-width: 768px) {
  .navbar-inner {
    height: 74px;
    padding: 0 16px;
  }
  .navbar-logo {
    display: none !important;
  }
  .navbar-logo-img {
    max-height: 40px;
  }
  .navbar-hitokoto {
    display: block;
  }
}
@media (max-width: 767.98px) {
  .navbar-inner {
    height: 56px;
    padding: 0 12px;
  }
  .navbar-logo.mobile-only {
    display: flex !important;
  }
  .navbar-logo-img {
    max-height: 32px;
  }
  .navbar-mobile {
    display: block !important;
  }
}

/* 桌面端 / 移动端可见性 */
@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
  .mobile-only {
    display: none;
  }
}
@media (max-width: 767.98px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }
}
</style>
