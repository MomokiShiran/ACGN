<template>
  <nav class="legal-nav">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="legal-nav-item"
      :class="{ active: route.path === item.to }"
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
/* 胶囊导航：关于 / 免责 / 隐私 三页共用 */
.legal-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-4);
}
.legal-nav-item {
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--bg-surface);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: var(--transition-normal);
}
.legal-nav-item:hover {
  color: var(--primary);
}
.legal-nav-item.active {
  color: #fff;
  background: var(--primary);
}
</style>
