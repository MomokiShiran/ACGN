<template>
  <ContentPage v-if="page" :page="page" />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentPage from '@/components/ContentPage.vue'
import { usePageTitle } from '@/composables/usePageTitle'
import contentPages from '@/data/contentPages.json'

// 三个静态内容页（关于/隐私/免责）共用一个视图，由路由 meta.pageKey 指向对应数据
const route = useRoute()
const router = useRouter()

const page = computed(() => contentPages.pages.find((p) => p.key === route.meta.pageKey))

// 标题以数据为准，避免与路由 meta.title 双源不一致
usePageTitle(computed(() => page.value?.title))

// 无效 pageKey 不再静默回退到第一页，直接转入 404
watch(
  page,
  (current) => {
    if (!current) router.replace({ name: 'NotFound' })
  },
  { immediate: true }
)
</script>
