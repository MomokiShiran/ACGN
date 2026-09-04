<template>
  <Teleport to="head">
    <meta name="theme-color" :content="themeColor" />
  </Teleport>

  <div v-if="isNested" class="iframe-warning" :class="themeClass">
    <svg class="warning-icon" viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v5h2v-5h-2zm0 6v2h2v-2h-2z"
      />
    </svg>
    <div class="warning-title">检测到非法嵌套</div>
    <div class="warning-desc">本站禁止被 iframe 嵌套</div>
    <a href="https://github.com/MomokiShiran/ACGN" target="_top" class="warning-link"
      >访问官方网站</a
    >
  </div>
  <div v-else class="page-container" :class="[themeClass, { 'drawer-open': isMobileOpen }]">
    <TheSidebar />
    <div class="main-content flex-fill">
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
import { useSidebar } from './composables/useSidebar'
import { useTheme } from './composables/useTheme'
import { usePageTitle } from './composables/usePageTitle'
import { isNested } from './composables/useIframeProtect'

const { isMobileOpen, initInteraction } = useSidebar()
const { themeClass, themeColor } = useTheme()

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
/* iframe 非法嵌套警告 */
.iframe-warning {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #fff;
  text-align: center;
  background: #1a1a2e;
}
.warning-icon {
  font-size: 64px;
  margin-bottom: 20px;
}
.warning-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.warning-desc {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
}
.warning-link {
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}
.warning-link:hover {
  background: #0056b3;
}

/* 移动端抽屉打开时锁定背景滚动 */
.page-container.drawer-open {
  overflow: hidden;
  height: 100vh;
}
</style>
