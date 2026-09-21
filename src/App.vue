<template>
  <div class="page-container" :class="[themeClass, { 'drawer-open': isMobileOpen }]">
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
import { useSidebarStore } from './stores/sidebar'
import { useThemeStore } from './stores/theme'
import { usePageTitle } from './composables/usePageTitle'

const sidebarStore = useSidebarStore()
const themeStore = useThemeStore()

const { isMobileOpen, initInteraction } = sidebarStore
const { themeClass } = themeStore

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
/* 移动端抽屉打开时锁定背景滚动 */
.page-container.drawer-open {
  overflow: hidden;
  height: 100vh;
}
</style>
