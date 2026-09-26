<template>
  <div
    class="page-container"
    :class="[themeStore.themeClass, { 'drawer-open': sidebarStore.isMobileOpen }]"
  >
    <TheSidebar />
    <div class="main-content">
      <TheNavbar />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import { useSidebarStore } from './stores/sidebar'
import { useThemeStore } from './stores/theme'
import { usePageTitle } from './composables/usePageTitle'

const sidebarStore = useSidebarStore()
const themeStore = useThemeStore()

const { initInteraction } = sidebarStore

usePageTitle()

let cleanupInteraction = null

onMounted(() => {
  cleanupInteraction = initInteraction()
})
onUnmounted(() => {
  cleanupInteraction?.()
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: row;
  background: var(--bg);
  color: var(--text);
  font-family:
    'SF Pro Text', 'PingFang SC', 'PingFang TC', 'PingFang HK', 'Hiragino Sans GB', 'Noto Sans SC',
    'Noto Sans TC', 'Microsoft YaHei UI', 'Microsoft YaHei', 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s;
  word-wrap: break-word;
}
.main-content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-container.drawer-open {
  overflow: hidden;
  height: 100vh;
}
</style>

<style>
/* 主题令牌 + 浏览器平台层（原 styles/main.css，随 App 挂载） */
:root {
  color-scheme: light;
  /* 品牌色 */
  --primary: #d75a7f;
  --primary-soft: rgba(215, 90, 127, 0.06);
  /* 文字 */
  --text: #282a2d;
  --text-heading: #1d232b;
  --text-muted: #666;
  /* 表面 */
  --bg: #f9f9f9;
  --bg-surface: #fff;
  --bg-gray: #f0f2f4;
  --card-bg: #fff;
  --input-bg: #f1f3f6;
  --border: #e9ebef;
  /* 顶栏 / 页脚 */
  --header-bg: rgba(255, 255, 255, 0.7);
  --footer-btn-bg: rgba(0, 0, 0, 0.1);
  --footer-btn-text: #666;
  /* 侧栏 */
  --sidebar-bg: #fff;
  --sidebar-text: #515c6b;
  --sidebar-hover: rgba(215, 90, 127, 0.08);
}

.dark {
  color-scheme: dark;
  --text: #c6c9cf;
  --text-heading: #e8eaed;
  --text-muted: #bbb;
  --bg: #1b1d1f;
  --bg-surface: #2c2e2f;
  --bg-gray: #363738;
  --card-bg: #2c2e2f;
  --input-bg: #363738;
  --border: #3a3d40;
  --header-bg: rgba(44, 46, 47, 0.95);
  --footer-btn-bg: #363738;
  --footer-btn-text: #aaa;
  --sidebar-bg: #2c2e2f;
  --sidebar-text: #b2b8be;
  --sidebar-hover: rgba(0, 0, 0, 0.3);
  --primary-soft: rgba(215, 90, 127, 0.15);
}

body {
  margin: 0;
}
</style>
