<template>
  <div class="navbar big sticky header">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-logo mobile-only">
        <img loading="lazy" :src="logoUrl" height="40" alt="MyACGN" />
      </router-link>

      <div class="navbar-left">
        <div class="navbar-btn desktop-only">
          <label>
            <input
              class="mini-button"
              type="checkbox"
              :checked="!isMinimized"
              @change="triggerMini($event.target.checked)"
            />
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path class="line-1" d="M0 40h62c18 0 18-20-17 5L31 55"></path>
              <path class="line-2" d="M0 50h80"></path>
              <path class="line-3" d="M0 60h62c18 0 18 20-17-5L31 45"></path>
            </svg>
          </label>
        </div>

        <router-link to="/announcements" class="btn navbar-announcement" rel="announcement">
          公告
        </router-link>
      </div>

      <div class="navbar-right">
        <div class="navbar-hitokoto desktop-only">
          <div class="navbar-hitokoto-text overflowClip_1">
            <span class="hitokoto">{{ hitokotoText }}</span>
            <span v-if="hitokotoFrom" class="hitokoto-from text-muted"> —— {{ hitokotoFrom }}</span>
          </div>
        </div>

        <div class="navbar-mobile mobile-only">
          <button
            type="button"
            class="navbar-toggle"
            id="sidebar-toggle"
            :aria-label="isMobileOpen ? '关闭菜单' : '打开菜单'"
            :aria-expanded="isMobileOpen"
            @click="toggleMobile"
          >
            <i class="fas fa-th-large fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import { useHitokoto } from '@/composables/useHitokoto'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'

const { isMobileOpen, isMinimized, toggleMobile, triggerMini } = useSidebar()
const { init: initHitokoto, text: hitokotoText, from: hitokotoFrom } = useHitokoto()

onMounted(() => {
  initHitokoto()
})
</script>

<style scoped>
/* 顶部导航栏 */
.navbar {
  background: var(--header-bg);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-normal);
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
}
.navbar-logo img {
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
  font-size: var(--font-size-md);
  color: var(--text-muted);
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
  line-height: 1;
}
.navbar-toggle:hover {
  color: var(--primary);
}

/* 菜单按钮与 SVG 动画 */
.navbar-btn {
  height: 74px;
  width: 40px;
}
.navbar-btn svg {
  margin: 0 -20px;
  height: 74px;
}
.navbar-btn input[type='checkbox'] {
  display: none;
}
.navbar-btn path {
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
    all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
    stroke var(--transition-fast);
}
.navbar-btn label {
  display: block;
  top: 0;
  right: 0;
  cursor: pointer;
}
.navbar-btn input:checked + svg .line-1,
.navbar-btn input:checked + svg .line-3 {
  --length: 12.602325267;
}
.navbar-btn .line-1,
.navbar-btn .line-3 {
  --total-length: 126.38166809082031;
}
.navbar-btn .line-2 {
  --total-length: 80;
}
.navbar-btn label:hover path {
  stroke: var(--primary);
}

/* 横幅区 */
.navbar.big {
  backdrop-filter: var(--header-blur);
  background: var(--header-bg);
}

/* 公告按钮 */
.navbar-announcement {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text);
  text-decoration: none;
  font-size: var(--font-size-sm);
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
  .navbar-logo img {
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
  .navbar-logo.mobile-only,
  a.navbar-logo {
    display: flex !important;
  }
  .navbar-logo img {
    max-height: 32px;
  }
  .navbar-mobile {
    display: block !important;
  }
}
</style>
