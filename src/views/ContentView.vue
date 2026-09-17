<template>
  <ContentPage :page="page" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ContentPage from '@/components/ContentPage.vue'
import contentPages from '@/data/contentPages.json'

// 三个静态内容页（关于/隐私/免责）共用一个视图，由路由 meta.pageKey 指向对应数据
const route = useRoute()

const page = computed(
  () =>
    contentPages.pages.find((p) => p.key === route.meta.pageKey) || contentPages.pages[0]
)
</script>