<template>
  <div class="page-container">
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
import TheSidebar from './components/layout/TheSidebar.vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import { useSidebar } from './composables/useSidebar'

const { initInteraction } = useSidebar()
initInteraction()
</script>
