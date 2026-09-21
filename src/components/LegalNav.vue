<template>
  <nav class="legal-nav">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="pill legal-nav-item"
      :class="{ 'pill-primary': route.path === item.to }"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const items = [
  { to: '/about', label: '关于本站' },
  { to: '/disclaimer', label: '免责声明' },
  { to: '/privacy', label: '隐私政策' },
]
</script>

<style scoped>
.legal-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
</style>
