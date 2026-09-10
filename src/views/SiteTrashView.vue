<template>
  <div class="content site-content">
    <h4 class="page-title"><i class="iconfont icon-tag icon-lg"></i>失效归档</h4>
    <CategoryList :categories="store.flatTrashCategories" />
  </div>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import CategoryList from '@/components/CategoryList.vue'

const store = useSitesStore()
</script>

<style scoped>
/* 页面标题 */
.page-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}
.page-title > i {
  margin-right: var(--space-1);
}
</style>
