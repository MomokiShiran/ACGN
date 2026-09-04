<template>
  <CategorySection v-for="category in categories" :key="category.id" :category="category" />
</template>

<script setup>
import CategorySection from './CategorySection.vue'

// 分类分区列表：首页（默认/搜索结果）与失效归档页共用
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})
</script>
