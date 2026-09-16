<template>
  <div class="content site-content">
    <h4 class="page-title"><img class="page-title-icon" :src="tagIcon" alt="" />失效归档</h4>
    <CategoryList :categories="store.flatTrashCategories" />
  </div>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import CategoryList from '@/components/CategoryList.vue'
import tagIcon from '@/assets/icons/tag.svg'

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
.page-title img.page-title-icon {
  width: 16px;
  height: 16px;
  margin-right: var(--space-1);
  transform: rotate(135deg);
}
</style>
