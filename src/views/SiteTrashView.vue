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
