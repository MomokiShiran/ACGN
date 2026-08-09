<template>
  <Teleport to="head">
    <meta name="theme-color" :content="themeColor" />
  </Teleport>

  <div v-if="isNested" class="iframe-warning" :class="themeClass">
    <div class="warning-icon">⚠️</div>
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import { useSidebar } from './composables/useSidebar'
import { useTheme } from './composables/useTheme'
import { initIframeProtect } from './composables/useIframeProtect'
import { DEFAULT_TITLE } from './constants/app'

const isNested = initIframeProtect()

const { isMobileOpen } = useSidebar()
const { initInteraction } = useSidebar()

const { themeClass, themeColor } = useTheme()

const route = useRoute()
const pageTitle = computed(() => route.meta?.title || DEFAULT_TITLE)
useHead({ title: pageTitle })

onMounted(() => {
  initInteraction()
})
</script>
